#!/usr/bin/env python3
"""Render the bilingual documentation site using only Python's standard library."""
import argparse
import copy
import hashlib
import json
from html import escape
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit, urlunsplit
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parents[1]
BASE = "https://outreach-engine.flypigai.ca"
REPO = "https://github.com/mkhsu2002/flypig-ai-outreach-engine"
ORG = "https://flypigai.ca/#organization"
IMAGE = BASE + "/assets/og-flypig-outreach.jpg"
VOID = set("area base br col embed hr img input link meta param source track wbr".split())
META = json.loads((ROOT / "site/metadata.json").read_text())
FAQ = json.loads((ROOT / "site/faq.json").read_text())


class Element:
    def __init__(self, tag="", attrs=()):
        self.tag, self.attrs, self.children = tag, dict(attrs), []

    def find(self, tag):
        return [node for node in self.walk() if node.tag == tag]

    def walk(self):
        yield self
        for child in self.children:
            if isinstance(child, Element):
                yield from child.walk()

    def text(self):
        return "".join(c.text() if isinstance(c, Element) else c for c in self.children)

    def html(self):
        content = "".join(c.html() if isinstance(c, Element) else
                          c if self.tag in ("script", "style") else escape(c, quote=False)
                          for c in self.children)
        if not self.tag:
            return content
        attrs = "".join(" " + k + ("" if v is None else '="' + escape(v, quote=True) + '"')
                        for k, v in self.attrs.items())
        return f"<{self.tag}{attrs}>" + ("" if self.tag in VOID else content + f"</{self.tag}>")


class Document(HTMLParser):
    def __init__(self, source):
        super().__init__(convert_charrefs=True)
        self.root = Element()
        self.stack = [self.root]
        self.feed(source)
        if len(self.stack) != 1:
            raise ValueError("Unclosed HTML element: " + self.stack[-1].tag)

    def handle_starttag(self, tag, attrs):
        node = Element(tag, attrs)
        self.stack[-1].children.append(node)
        if tag not in VOID:
            self.stack.append(node)

    def handle_startendtag(self, tag, attrs):
        self.handle_starttag(tag, attrs)
        if tag not in VOID:
            self.handle_endtag(tag)

    def handle_endtag(self, tag):
        if tag in VOID:
            return
        if self.stack[-1].tag != tag:
            raise ValueError(f"Mismatched HTML: {tag} closes {self.stack[-1].tag}")
        self.stack.pop()

    def handle_data(self, data):
        self.stack[-1].children.append(data)


def path_for(slug, lang):
    path = "/" if slug == "index" else "/" + slug
    return ("/zh" if path == "/" else "/zh" + path) if lang == "zh" else path


def localized_href(href, lang):
    url = urlsplit(href)
    if url.scheme or url.netloc or not url.path:
        return href
    slug = url.path.strip("/").removesuffix(".html") or "index"
    if slug in META:
        return urlunsplit(("", "", path_for(slug, lang), url.query, url.fragment))
    if url.path.startswith("assets/"):
        return "/" + href
    return href


def localize(node, lang, slug):
    node.children = [c for c in node.children if not isinstance(c, Element) or
                     (c.attrs.get("data-lang", lang) == lang and
                      "breadcrumbs" not in c.attrs.get("class", "").split())]
    for child in node.children:
        if isinstance(child, Element):
            localize(child, lang, slug)
    for attr in ("href", "src"):
        if attr in node.attrs:
            node.attrs[attr] = localized_href(node.attrs[attr], lang)
    if "data-set-lang" in node.attrs:
        target = node.attrs.pop("data-set-lang")
        node.tag = "a"
        node.attrs.pop("type", None)
        node.attrs.update(href=path_for(slug, target), hreflang="zh-Hant" if target == "zh" else "en",
                          lang="zh-Hant" if target == "zh" else "en")
        if target == lang:
            node.attrs.update({"class": "active", "aria-current": "page"})


def fragment(markup):
    return Document(markup).root.children


def asset(name):
    version = hashlib.sha256((ROOT / "docs/assets" / name).read_bytes()).hexdigest()[:12]
    return f"/assets/{name}?v={version}"


def render(slug, lang):
    source = Document((ROOT / f"site/pages/{slug}.html").read_text()).root
    title = META[slug]["zhTitle"] if lang == "zh" else source.find("title")[0].text()
    description = META[slug]["zhDescription"] if lang == "zh" else next(
        n.attrs["content"] for n in source.find("meta") if n.attrs.get("name") == "description")
    body = copy.deepcopy(source.find("body")[0])
    localize(body, lang, slug)
    main = body.find("main")[0]
    main.attrs["id"] = "main-content"
    body.children[0:0] = fragment('<a class="skip-link" href="#main-content">' + ("跳至主要內容" if lang == "zh" else "Skip to content") + '</a>')
    if slug == "managed-service":
        main.children.extend(fragment('<noscript><p class="wrap">' + ("請透過電子郵件提交研究需求：" if lang == "zh" else "Send your research brief by email: ") + '<a href="mailto:info@flypigai.ca">info@flypigai.ca</a></p></noscript>'))
    canonical = BASE + path_for(slug, lang)
    language = "zh-Hant" if lang == "zh" else "en"
    modified = META[slug]["modified"]
    label = "總覽" if lang == "zh" else "Overview"
    crumbs = [{"@type": "ListItem", "position": 1, "name": "FlyPig AI Outreach Engine", "item": BASE + path_for("index", lang)}]
    if slug != "index":
        links = f'<a href="{path_for("index", lang)}">{label}</a>'
        if slug.startswith("test-"):
            experiment_label = "實驗" if lang == "zh" else "Experiments"
            crumbs.append({"@type": "ListItem", "position": 2, "name": experiment_label, "item": BASE + path_for("experiments", lang)})
            links += f' / <a href="{path_for("experiments", lang)}">{experiment_label}</a>'
        crumbs.append({"@type": "ListItem", "position": len(crumbs) + 1, "name": title, "item": canonical})
        main.children[0:0] = fragment(f'<nav class="wrap breadcrumbs" aria-label="Breadcrumb">{links} / <span aria-current="page">{escape(title)}</span></nav>')

    organization = {"@type": "Organization", "@id": ORG, "name": "FlyPig AI", "url": "https://flypigai.ca/",
                    "legalName": "ICareU Global Trading Ltd.", "email": "info@flypigai.ca",
                    "address": {"@type": "PostalAddress", "streetAddress": "11936 Woodridge Cres.", "addressLocality": "Delta",
                                "addressRegion": "BC", "postalCode": "V4E 3H5", "addressCountry": "CA"}}
    website = {"@type": "WebSite", "@id": BASE + "/#website", "url": BASE + "/", "name": "FlyPig AI Outreach Engine",
               "inLanguage": ["en", "zh-Hant"], "publisher": {"@id": ORG}}
    webpage = {"@type": "CollectionPage" if slug == "experiments" else "WebPage", "@id": canonical + "#webpage",
               "url": canonical, "name": title, "description": description, "inLanguage": language,
               "dateModified": modified, "isPartOf": {"@id": BASE + "/#website"}, "publisher": {"@id": ORG}}
    graph = [organization, website, webpage]
    if slug != "index":
        graph.append({"@type": "BreadcrumbList", "@id": canonical + "#breadcrumbs", "itemListElement": crumbs})
        webpage["breadcrumb"] = {"@id": canonical + "#breadcrumbs"}
    if slug.startswith("test-"):
        citations = list(dict.fromkeys(n.attrs["href"] for n in body.find("a") if "/validation/" in n.attrs.get("href", "")))
        graph.append({"@type": "TechArticle", "@id": canonical + "#article", "headline": body.find("h1")[0].text(),
                      "description": description, "url": canonical, "inLanguage": language, "dateModified": modified,
                      "author": {"@id": ORG}, "publisher": {"@id": ORG}, "mainEntityOfPage": {"@id": canonical + "#webpage"},
                      "image": IMAGE, "citation": citations})
        webpage["mainEntity"] = {"@id": canonical + "#article"}
    if slug == "experiments":
        graph.append({"@type": "ItemList", "@id": canonical + "#experiments", "numberOfItems": 3, "itemListElement": [
            {"@type": "ListItem", "position": n, "url": BASE + path_for(f"test-0{n}", lang)} for n in range(1, 4)]})
        webpage["mainEntity"] = {"@id": canonical + "#experiments"}
    if slug in ("index", "managed-service"):
        graph.append({"@type": "Service", "@id": BASE + "/managed-service#service", "name": "FlyPig Managed Prospect Research",
                      "serviceType": "Prospect research and qualification", "provider": {"@id": ORG},
                      "url": BASE + "/managed-service", "areaServed": "International"})
    if slug == "index":
        graph.append({"@type": "SoftwareSourceCode", "@id": BASE + "/#open-core", "name": "FlyPig AI Outreach Engine Open Core",
                      "version": "0.1.0", "codeRepository": REPO, "license": "https://www.apache.org/licenses/LICENSE-2.0",
                      "creator": {"@id": ORG}, "description": FAQ[0][lang]["answer"]})
        questions = [entry[lang] for entry in FAQ]
        faq_markup = '<section id="faq"><div class="wrap"><h2>' + ("常見問題" if lang == "zh" else "Frequently asked questions") + '</h2><div class="faq-list">'
        faq_markup += "".join(f'<details><summary>{escape(q["question"])}</summary><p>{escape(q["answer"])}</p></details>' for q in questions)
        main.children.extend(fragment(faq_markup + "</div></div></section>"))
        graph.append({"@type": "FAQPage", "@id": canonical + "#faq", "isPartOf": {"@id": canonical + "#webpage"},
                      "inLanguage": language, "mainEntity": [{"@type": "Question", "name": q["question"],
                      "acceptedAnswer": {"@type": "Answer", "text": q["answer"]}} for q in questions]})
    updated = "頁面更新" if lang == "zh" else "Page updated"
    byline = f'<p class="wrap page-byline"><a href="https://flypigai.ca/about">FlyPig AI</a> · {updated}: <time datetime="{modified}">{modified}</time></p>'
    main.children.extend(fragment(byline))
    footer = body.find("footer")[0]
    footer.children.extend(fragment('<div class="wrap site-identity"><p>FlyPig AI · ICareU Global Trading Ltd.<br>11936 Woodridge Cres., Delta, BC V4E 3H5, Canada</p><p><a href="https://flypigai.ca/">FlyPig AI</a> · <a href="https://flypigai.ca/about">' + ("關於我們" if lang == "zh" else "About") + '</a> · <a href="mailto:info@flypigai.ca">info@flypigai.ca</a></p></div>'))
    alternates = "\n".join(f'<link rel="alternate" hreflang="{code}" href="{BASE + path_for(slug, target)}">' for code, target in [("en", "en"), ("zh-Hant", "zh"), ("x-default", "en")])
    data = json.dumps({"@context": "https://schema.org", "@graph": graph}, ensure_ascii=False).replace("<", "\\u003c")
    safe_title, safe_description = escape(title, quote=True), escape(description, quote=True)
    og_type = "article" if slug.startswith("test-") else "website"
    scripts = (f'<script defer src="{asset("config.js")}"></script>' if slug == "managed-service" else "") + f'<script defer src="{asset("site.js")}"></script>'
    rendered = f'''<!doctype html>
<html lang="{language}" data-language="{lang}"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>{safe_title}</title>
<meta name="description" content="{safe_description}">
<meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1">
<meta name="author" content="FlyPig AI">
<link rel="canonical" href="{canonical}">
{alternates}
<link rel="icon" href="/assets/favicon.svg" type="image/svg+xml">
<link rel="manifest" href="/site.webmanifest"><link rel="sitemap" type="application/xml" href="/sitemap.xml">
<link rel="alternate" type="text/plain" href="/llms.txt" title="LLM Context">
<meta name="theme-color" content="#111111">
<meta property="og:type" content="{og_type}"><meta property="og:site_name" content="FlyPig AI Outreach Engine">
<meta property="og:title" content="{safe_title}"><meta property="og:description" content="{safe_description}">
<meta property="og:url" content="{canonical}"><meta property="og:locale" content="{"zh_TW" if lang == "zh" else "en_CA"}">
<meta property="og:locale:alternate" content="{"en_CA" if lang == "zh" else "zh_TW"}">
<meta property="og:image" content="{IMAGE}"><meta property="og:image:width" content="320"><meta property="og:image:height" content="168">
<meta property="og:image:type" content="image/jpeg"><meta property="og:image:alt" content="FlyPig AI Outreach Engine">
<meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="{safe_title}">
<meta name="twitter:description" content="{safe_description}"><meta name="twitter:image" content="{IMAGE}">
<meta name="twitter:image:alt" content="FlyPig AI Outreach Engine">
<script type="application/ld+json">{data}</script>
<link rel="stylesheet" href="{asset("site.css")}">{scripts}
</head>{body.html()}</html>
'''
    return "\n".join(line.rstrip() for line in rendered.splitlines()) + "\n"


def outputs():
    files = {}
    ns = "http://www.sitemaps.org/schemas/sitemap/0.9"
    xhtml = "http://www.w3.org/1999/xhtml"
    ET.register_namespace("", ns)
    ET.register_namespace("xhtml", xhtml)
    sitemap = ET.Element(f"{{{ns}}}urlset")
    for slug in META:
        for lang in ("en", "zh"):
            name = f"zh/{slug}.html" if lang == "zh" and slug != "index" else "zh.html" if lang == "zh" else f"{slug}.html"
            files[name] = render(slug, lang)
            entry = ET.SubElement(sitemap, f"{{{ns}}}url")
            ET.SubElement(entry, f"{{{ns}}}loc").text = BASE + path_for(slug, lang)
            ET.SubElement(entry, f"{{{ns}}}lastmod").text = META[slug]["modified"]
            for code, target in [("en", "en"), ("zh-Hant", "zh"), ("x-default", "en")]:
                ET.SubElement(entry, f"{{{xhtml}}}link", rel="alternate", hreflang=code, href=BASE + path_for(slug, target))
    ET.indent(sitemap)
    files["sitemap.xml"] = '<?xml version="1.0" encoding="UTF-8"?>\n' + ET.tostring(sitemap, encoding="unicode") + "\n"
    return files


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--check", action="store_true", help="Fail when checked-in output differs from source")
    args = parser.parse_args()
    stale = []
    generated = outputs()
    for name, content in generated.items():
        dest = ROOT / "docs" / name
        if args.check:
            if not dest.exists() or dest.read_text() != content:
                stale.append(name)
        else:
            dest.parent.mkdir(parents=True, exist_ok=True)
            dest.write_text(content)
    if stale:
        raise SystemExit("Regenerate with python3 scripts/build_site.py: " + ", ".join(stale))
    print(f'{"Verified" if args.check else "Generated"} {len(generated) - 1} pages and sitemap.xml')
