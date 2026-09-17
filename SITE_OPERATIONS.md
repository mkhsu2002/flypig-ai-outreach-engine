# Site Operations — Outreach Engine

Canonical production site:

https://outreach-engine.flypigai.ca/

## Cloudflare Pages deployment

Recommended project settings:

```text
Production branch: main
Root directory: (blank / repository root)
Build command: (blank)
Build output directory: docs
```

Cloudflare Pages Functions live at repository root:

```text
/functions/api/contact.js
```

The managed-service form posts to:

```text
POST /api/contact
```

Required Production variables / secrets:

```text
RESEND_API_KEY      Secret
RESEND_FROM_EMAIL   Text
RESEND_TO_EMAIL     Text
```

Do not place the Resend key in `docs/`, browser JavaScript, GitHub files, or HTML.

## Cloudflare settings to enable manually

### Web Analytics

Cloudflare dashboard:

Workers & Pages → flypig-ai-outreach-engine → Metrics → Enable Web Analytics

Cloudflare Pages can automatically inject the Web Analytics beacon on the next deployment.

### Crawler Hints

Cloudflare dashboard:

Configuration → Crawler Hints → Enable

Crawler Hints can notify search engines / IndexNow-compatible services when content changes.

### Abuse protection

The public form already includes:

- server-side field validation;
- payload-size limit;
- same-origin checking;
- honeypot field;
- HTML escaping;
- no browser-visible Resend key.

For stronger production protection, add Cloudflare Turnstile and/or a Cloudflare rate-limiting rule to `/api/contact`.

## Google Search Console

Recommended property:

```text
https://outreach-engine.flypigai.ca/
```

or verify the parent Domain property for `flypigai.ca`.

After verification:

1. Submit `https://outreach-engine.flypigai.ca/sitemap.xml`.
2. Inspect the homepage with URL Inspection.
3. Request indexing for the homepage and the three Research Notes.
4. Monitor Page Indexing and Core Web Vitals.

Google can also discover the sitemap through `robots.txt`, but explicit submission provides monitoring.

## Bing Webmaster Tools

Recommended approach:

1. Import the verified property from Google Search Console, or verify directly.
2. Submit `https://outreach-engine.flypigai.ca/sitemap.xml`.
3. Run Site Scan after first indexing.
4. Monitor IndexNow / URL discovery status.

Cloudflare Crawler Hints can complement this by sending freshness hints.

## Search / AI discovery files

Production files:

```text
/robots.txt
/sitemap.xml
/llms.txt
/.well-known/security.txt
/site.webmanifest
```

`llms.txt` is an emerging LLM-friendly discovery convention, not a universal search-engine standard. The authoritative scope remains the website, GitHub README, and AGENTS.md.

## Structured data

The production pages include JSON-LD:

- homepage: Organization, WebSite, SoftwareSourceCode, FAQPage;
- Research Notes: TechArticle + BreadcrumbList;
- managed service: Service + WebPage.

Do not add claims to structured data that are not visibly supported on the page.

## Canonical pages

```text
https://outreach-engine.flypigai.ca/
https://outreach-engine.flypigai.ca/test-01.html
https://outreach-engine.flypigai.ca/test-02.html
https://outreach-engine.flypigai.ca/test-03.html
https://outreach-engine.flypigai.ca/managed-service.html
https://outreach-engine.flypigai.ca/privacy.html
```

Clean-path redirects also exist for:

```text
/test-01
/test-02
/test-03
/managed-service
```

## Post-deploy smoke test

Check these URLs after every structural release:

```text
/
robots.txt
sitemap.xml
llms.txt
test-01.html
test-02.html
test-03.html
managed-service.html
privacy.html
.well-known/security.txt
```

Test the managed-service form and confirm:

1. Browser receives a success message.
2. Resend dashboard records the send.
3. RESEND_TO_EMAIL receives the inquiry.
4. Reply-To is the submitter's email.
5. No API key appears in browser source or Network response.

## Repository discoverability

GitHub repository metadata should use the canonical website as the homepage URL.

Recommended topics should emphasize:

```text
llm-skills
prospect-research
lead-qualification
market-research
business-development
human-ai-collaboration
agentic-workflow
open-core
llm-workflow
```

Avoid repository topics that imply the public Core is an email sender or multi-channel execution platform.
