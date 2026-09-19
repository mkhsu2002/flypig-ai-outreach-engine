#!/usr/bin/env python3
"""Interactive deployment setup. Secrets stay in memory and platform secret storage."""
import getpass
import hashlib
import json
from pathlib import Path
import secrets
import sys
import tomllib
import urllib.error
import urllib.request

ROOT = Path(__file__).resolve().parents[1]
ACCOUNT = "82af99e90d342a30d2386efaa8ef4966"
PROJECT = "flypig-ai-outreach-engine"
WORKER = "flypig-outreach-contact-recovery"
HOSTS = {"production": "https://outreach-engine.flypigai.ca", "preview": "https://contact-delivery-preview.flypig-ai-outreach-engine.pages.dev"}
token = tomllib.loads((Path.home() / ".wrangler/config/default.toml").read_text())["oauth_token"]


def http(url, method="GET", body=None, headers=None):
    request = urllib.request.Request(url, method=method, headers={"User-Agent": "FlyPig-Contact-Verification/1.0", **(headers or {})}, data=json.dumps(body).encode() if body is not None else None)
    try:
        with urllib.request.urlopen(request, timeout=40) as response:
            return response.status, json.loads(response.read())
    except urllib.error.HTTPError as error:
        return error.code, json.loads(error.read())


def cf(path, method="GET", body=None):
    status, result = http("https://api.cloudflare.com/client/v4/accounts/" + ACCOUNT + "/" + path, method, body,
                          {"Authorization": "Bearer " + token, "Content-Type": "application/json"})
    if not result.get("success"):
        raise RuntimeError(f"Cloudflare HTTP {status}: " + json.dumps(result.get("errors")))
    return result.get("result")


def query(database, sql, params=None):
    return cf(f"d1/database/{database}/query", "POST", {"sql": sql, "params": params or []})


def setup():
    key = "".join(getpass.getpass("Resend secret (not echoed): ").replace("\\_", "_").split())
    recipient = input("Owner notification email: ").strip()
    trigger = secrets.token_urlsafe(48)
    databases = {item["name"]: item["uuid"] for item in cf("d1/database")}
    configs = {}
    ids = {}
    migration = (ROOT / "migrations/0001_contact.sql").read_text()
    for env in HOSTS:
        name = f"flypig-outreach-contact-{env}"
        database = databases.get(name) or cf("d1/database", "POST", {"name": name})["uuid"]
        query(database, migration)
        query(database, "CREATE TABLE IF NOT EXISTS contact_migrations (name TEXT PRIMARY KEY, applied_at TEXT NOT NULL); INSERT OR IGNORE INTO contact_migrations VALUES ('0001_contact.sql', datetime('now'));")
        ids[env] = database
        configs[env] = {"d1_databases": {"CONTACT_DB": {"id": database}}, "env_vars": {
            "RESEND_API_KEY": {"type": "secret_text", "value": key},
            "RESEND_TO_EMAIL": {"type": "secret_text", "value": recipient},
            "RESEND_FROM_EMAIL": {"type": "plain_text", "value": "info@flypigai.ca"},
            "CONTACT_RECOVERY_TOKEN": {"type": "secret_text", "value": trigger},
            "NODE_VERSION": {"type": "plain_text", "value": "24"},
        }}
    project = cf(f"pages/projects/{PROJECT}")
    config = project["source"]["config"]
    config["path_includes"] = list(dict.fromkeys(config["path_includes"] + ["server/*", "migrations/*", "tests/*"]))
    cf(f"pages/projects/{PROJECT}", "PATCH", {"deployment_configs": configs,
       "source": {"type": project["source"]["type"], "config": config},
       "build_config": {**project["build_config"], "build_command": "python3 scripts/build_site.py --check && python3 scripts/check_site.py && node --test scripts/site.test.mjs tests/*.test.mjs"}})
    cf(f"workers/scripts/{WORKER}/secrets", "PUT", {"name": "CONTACT_RECOVERY_TOKEN", "type": "secret_text", "text": trigger})
    key = None
    readback = cf(f"pages/projects/{PROJECT}")
    for env, database in ids.items():
        actual = readback["deployment_configs"][env]
        assert actual["d1_databases"]["CONTACT_DB"]["id"] == database
        assert set(configs[env]["env_vars"]) <= set(actual["env_vars"])
        print(json.dumps({"environment": env, "database": database, "bindings_verified": True,
                          "migrations": query(database, "SELECT name FROM contact_migrations")[0]["results"]}))
    return recipient, trigger, ids


if __name__ == "__main__":
    recipient, trigger, ids = setup()
    print("Setup complete. Commands: smoke preview | smoke production | status preview | status production | recover preview | recover production | quit", flush=True)
    tests = {}
    while True:
        command = input("contact-admin> ").strip().split()
        if not command or command[0] == "quit":
            break
        try:
            action, env = command
            base = HOSTS[env]
            if action == "smoke":
                # At most one intended owner email per environment; exact request is replayed.
                if env not in tests:
                    tests[env] = "verification-" + secrets.token_hex(16)
                identifier = tests[env]
                fields = {"name": "FlyPig deployment verification", "email": recipient,
                          "company": "TEST - " + env, "target_market": "Canada", "objective": "Notification delivery verification",
                          "offer": "Controlled test of the Outreach Engine inquiry form. No customer request; no action needed.", "consent": "yes"}
                headers = {"Origin": base, "Content-Type": "application/json", "Idempotency-Key": identifier}
                for attempt in (1, 2):
                    status, result = http(base + "/api/contact", "POST", fields, headers)
                    print(json.dumps({"environment": env, "attempt": attempt, "status": status, "result": result}), flush=True)
            elif action == "status":
                identifier = hashlib.sha256(tests[env].encode()).hexdigest()
                status, result = http(base + "/api/contact-recovery?id=" + identifier, headers={"Authorization": "Bearer " + trigger})
                print(json.dumps({"environment": env, "status": status, "result": result}), flush=True)
                audit = query(ids[env], "SELECT stage,attempt,provider_code FROM contact_audit WHERE request_id=? ORDER BY recorded_at", [identifier])
                print(json.dumps({"environment": env, "audit": audit[0]["results"]}), flush=True)
            elif action == "recover":
                status, result = http(base + "/api/contact-recovery", "POST", {}, {"Authorization": "Bearer " + trigger, "Content-Type": "application/json"})
                print(json.dumps({"environment": env, "status": status, "result": result}), flush=True)
            else:
                print("Unknown command")
        except Exception as error:
            print(type(error).__name__, str(error), flush=True)
