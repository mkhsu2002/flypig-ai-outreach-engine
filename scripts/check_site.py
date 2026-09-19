#!/usr/bin/env python3
"""Check rendered SEO contracts and optionally production HTML, without sending forms."""
import argparse
import json
import urllib.request
from urllib.parse import urlsplit
import xml.etree.ElementTree as ET
from build_site import BASE, FAQ, META, ORG, ROOT, Document, outputs, path_for


def check_pages(pages, sitemap):
    namespace = {"s": "http://www.sitemaps.org/schemas/sitemap/0.9"}
    urls = [n.text for n in ET.fromstring(sitemap).findall("s:url/s:loc", namespace)]
    assert len(urls) == len(set(urls)) == 14, "Sitemap must have exactly 14 unique canonical pages"
    assert set(urls) == set(pages), "Sitemap/page inventory mismatch"
    documents = {url: Document(html).root for url, html in pages.items()}
    titles = set()
    for url, doc in documents.items():
        zh = urlsplit(url).path == "/zh" or urlsplit(url).path.startswith("/zh/")
        lang = "zh" if zh else "en"
        links = doc.find("link")
        canonicals = [n.attrs["href"] for n in links if n.attrs.get("rel") == "canonical"]
        assert canonicals == [url], f"Canonical mismatch: {url}"
        assert doc.find("html")[0].attrs["lang"] == ("zh-Hant" if zh else "en")
        assert len(doc.find("h1")) == 1, f"Expected one H1: {url}"
        assert all(n.attrs.get("data-lang", lang) == lang for n in doc.walk()), f"Mixed hidden translations: {url}"
        title = doc.find("title")[0].text()
        assert title and title not in titles, f"Duplicate/empty title: {url}"
        titles.add(title)
        metas = {n.attrs.get("name", n.attrs.get("property")): n.attrs.get("content") for n in doc.find("meta")}
        assert metas["description"] and metas["og:url"] == url
        assert metas["og:title"] == title == metas["twitter:title"]
        assert "noindex" not in metas["robots"]
        alternates = {n.attrs["hreflang"]: n.attrs["href"] for n in links if "hreflang" in n.attrs}
        assert set(alternates) == {"en", "zh-Hant", "x-default"}
        assert alternates["x-default"] == alternates["en"]
        for alternate in alternates.values():
            assert alternate in documents, f"Broken alternate: {alternate}"
            reciprocal = {n.attrs["hreflang"]: n.attrs["href"] for n in documents[alternate].find("link") if "hreflang" in n.attrs}
            assert reciprocal == alternates, f"Non-reciprocal hreflang: {url}"
        graph = json.loads(next(n.text() for n in doc.find("script") if n.attrs.get("type") == "application/ld+json"))["@graph"]
        types = {n["@type"] for n in graph}
        assert {"Organization", "WebSite"} <= types
        assert next(n for n in graph if n["@type"] == "Organization")["@id"] == ORG
        article = next((n for n in graph if n["@type"] == "TechArticle"), None)
        if "/test-" in url:
            assert article and article["citation"] and "BreadcrumbList" in types
            assert article["headline"] == doc.find("h1")[0].text()
            assert article["dateModified"] in doc.text()
            assert all(c in pages[url] for c in article["citation"])
        faq = next((n for n in graph if n["@type"] == "FAQPage"), None)
        if faq:
            assert len(faq["mainEntity"]) == len(FAQ)
            for q in faq["mainEntity"]:
                assert q["name"] in doc.text() and q["acceptedAnswer"]["text"] in doc.text()
        if url.endswith("/managed-service"):
            original = Document((ROOT / "site/pages/managed-service.html").read_text()).root
            def form_contract(tree):
                return [(n.tag, n.attrs.get("name"), n.attrs.get("type"), n.attrs.get("value"), "required" in n.attrs)
                        for n in tree.walk() if n.tag in ("input", "textarea", "select")]
            assert form_contract(doc) == form_contract(original), "Localized form changed the API input contract"
            assert [n.text() for n in doc.find("option")] == [n.text() for n in original.find("option")]
        for node in doc.walk():
            for attr in ("href", "src"):
                href = node.attrs.get(attr, "")
                if not href or href.startswith(("mailto:", "https:", "http:")):
                    continue
                parsed = urlsplit(href)
                target = BASE + parsed.path if parsed.path else url
                if parsed.path.startswith("/assets/") or parsed.path in ("/site.webmanifest", "/sitemap.xml", "/llms.txt"):
                    assert (ROOT / "docs" / parsed.path.lstrip("/")).is_file(), f"Missing asset: {href}"
                else:
                    assert target in documents, f"Broken internal route: {url} -> {href}"
                    if parsed.fragment:
                        assert any(n.attrs.get("id") == parsed.fragment for n in documents[target].walk()), f"Broken anchor: {href}"


def fetch(url):
    request = urllib.request.Request(url, headers={"User-Agent": "FlyPigSiteAudit/1.0"})
    with urllib.request.urlopen(request, timeout=30) as response:
        assert response.status == 200
        assert response.url == url, f"Canonical redirects: {url} -> {response.url}"
        assert "noindex" not in response.headers.get("X-Robots-Tag", "")
        return response.read().decode()


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--live", action="store_true")
    args = parser.parse_args()
    generated = outputs()
    pages = {}
    for slug in META:
        for lang in ("en", "zh"):
            url = BASE + path_for(slug, lang)
            filename = f"zh/{slug}.html" if lang == "zh" and slug != "index" else "zh.html" if lang == "zh" else f"{slug}.html"
            actual = fetch(url) if args.live else (ROOT / "docs" / filename).read_text()
            assert actual == generated[filename], f"Stale {'production' if args.live else 'generated'} page: {url}"
            pages[url] = actual
    sitemap = fetch(BASE + "/sitemap.xml") if args.live else (ROOT / "docs/sitemap.xml").read_text()
    check_pages(pages, sitemap)
    not_found = (ROOT / "docs/404.html").read_text()
    assert 'content="noindex,follow"' in not_found
    print(f"PASS: 14 {'production' if args.live else 'local'} pages; canonical, reciprocal hreflang, sitemap, metadata, schemas, FAQ, links and assets")
