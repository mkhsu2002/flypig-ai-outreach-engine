# Outreach Engine Site Operations

Updated 2026-09-19. Replaces obsolete September 17 instructions listing `.html` canonical URLs and schema lost during page rewrites.

## Production and source

- Canonical host: https://outreach-engine.flypigai.ca/
- Cloudflare Pages project: `flypig-ai-outreach-engine`; production branch: `main`.
- Root directory: repository root; output: `docs`.
- Website source: `site/pages/*.html` (bilingual body, English title/description), `site/metadata.json` (Chinese metadata and explicit page revision dates), `site/faq.json` (visible answers and matching FAQ schema).
- Renderer: `scripts/build_site.py`, Python 3.9+ standard library. No third-party dependencies or credentials.
- `docs/*.html`, `docs/zh/*.html`, and `docs/sitemap.xml` are generated and committed. Edit the source, not generated pages. `docs/404.html` remains hand-maintained.
- Website publishing tools do not change the Open Core's LLM-native runtime requirements.

Cloudflare build command:

```sh
python3 scripts/build_site.py --check && python3 scripts/check_site.py && node --test scripts/site.test.mjs
```

Build watch includes: `docs/*.html`, `docs/assets/*`, `docs/_headers`, `docs/_redirects`, `docs/robots.txt`, `docs/sitemap.xml`, `docs/llms.txt`, `docs/site.webmanifest`, `docs/.well-known/*`, `site/*`, `scripts/*`, `functions/*`, `wrangler.*`, `package*.json`. Excludes: `*.md`. Cloudflare wildcards match nested paths. README, audit and handoff-only edits do not trigger deployment. GitHub site checks also use path filtering and concurrency cancellation; no cron is added.

## Editing and verification

```sh
python3 scripts/build_site.py
python3 scripts/build_site.py --check
python3 scripts/check_site.py
node --test scripts/site.test.mjs
git diff --check
```

Change `modified` only when that page actually changes. Never derive freshness dates from the build clock. The visible label is **Page updated**, not a claim of fresh external-source research. Original experiment dates and evidence remain in linked validation artifacts.

The renderer filters translated markup before serving, preserves form field names/values, emits one H1 per page, uses absolute asset paths and content-hashed CSS/JS query versions. Language links work without JavaScript. Explicit legacy `?lang=zh-TW` / `?lang=en` links navigate to clean language URLs while preserving other parameters/fragments. Ordinary URLs do not redirect based on browser preferences or storage.

## Canonical inventory

| English | Traditional Chinese | Purpose |
| --- | --- | --- |
| `/` | `/zh` | Product and research-service overview |
| `/experiments` | `/zh/experiments` | Three-experiment collection |
| `/test-01` | `/zh/test-01` | Japan commercial-role research |
| `/test-02` | `/zh/test-02` | Germany mission revision |
| `/test-03` | `/zh/test-03` | Canada early adopters and LLM control |
| `/managed-service` | `/zh/managed-service` | Commissioned prospect research |
| `/privacy` | `/zh/privacy` | Privacy notice |

All 14 pages are indexable and self-canonical, with reciprocal `en`, `zh-Hant`, `x-default` alternates in HTML and sitemap. Parent-site pages are not translations or canonical destinations for this content. Cloudflare supplies permanent `.html`, `/index.html` and trailing-slash normalization; do not add reverse redirects.

- `robots.txt` permits crawling and declares this subdomain's sitemap.
- Unknown URLs return real 404 with `noindex,follow`.
- Raw Markdown remains readable but carries `X-Robots-Tag: noindex, follow`. Do not block it in robots; crawlers need to read the header.
- Production `pages.dev` and preview hosts carry `noindex, follow`; their HTML canonical links point to the custom host. A host-level 301 requires Cloudflare Bulk Redirects, not a Pages `_redirects` entry. The current OAuth authorization can manage Pages but the account Rules Lists/Rulesets API returned HTTP 403 / code 10000 on 2026-09-19. Do not add an ineffective domain-level `_redirects` rule or a per-request Function solely for this alias.
- `llms.txt` describes scope, evidence limitations, languages and operator. It is supplementary, not a ranking or AI-citation guarantee.

## Entity and schema

Both sites identify FlyPig AI as `https://flypigai.ca/#organization`, legally operated by ICareU Global Trading Ltd., 11936 Woodridge Cres., Delta, BC V4E 3H5, Canada. General contact: `info@flypigai.ca`.

- Every page: Organization, WebSite, WebPage (CollectionPage for the experiment hub).
- Non-homepages: visible breadcrumbs and BreadcrumbList.
- Experiments: TechArticle with visible headline, organization author, publisher, page update date, image and actual public validation citations.
- Experiment hub: ItemList of three corresponding language pages.
- Homepage: SoftwareSourceCode for Open Core, Service for the separate engagement, FAQPage matching visible questions.
- Managed page: Service and WebPage; no invented offers, ratings or affiliations.

The owned social image is 320x168; dimensions are accurate. A future original 1200x630 asset would improve previews. FAQ markup does not imply eligibility for Google FAQ rich results.

Cloudflare injects Web Analytics on the live custom hostname even though the Pages-level analytics fields are empty. The CSP permits the verified `static.cloudflareinsights.com` script and `cloudflareinsights.com` connection, following Cloudflare's documented requirements. No additional analytics provider or tracking identifier is embedded in source. Live measurement delivery and field metrics still require dashboard/browser verification.

## Live verification and monitoring

```sh
python3 scripts/check_site.py --live
```

This checks all 14 production HTML pages against generated output after decoding Cloudflare email obfuscation and excluding its recognized edge-injected scripts. It validates metadata, translations, schemas, sitemap, links, assets and unchanged form inputs. Also check HTTP -> HTTPS, extension -> clean URL, production pages.dev noindex/canonical, unknown route 404, Markdown noindex and preview noindex. Verify the actual deployed commit through Cloudflare API/GitHub checks.

Visual checks require the canonical `codex-flypig-ai` browser lane. Record unavailable checks honestly; never fall back to another identity.

Google Search Console requires a verified `flypigai.ca` Domain property or exact subdomain URL-prefix property. Submit `https://outreach-engine.flypigai.ca/sitemap.xml`, inspect both language homepages and representative experiments/service pages. Bing may import a verified Google property. Public HTML checks do not prove ownership, submission, indexing or Core Web Vitals. Keep verification/IndexNow credentials in secure storage, not this repository.

## Contact backend: unresolved existing limitation

`functions/api/contact.js` remains the existing `POST /api/contact` contract. Production has deployment-managed `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, `RESEND_TO_EMAIL`; preview has none as of the 2026-09-19 API readback. No values were exported or copied. This release makes no backend/schema/binding changes.

The current function calls Resend directly without persistent request/audit storage or durable idempotency and accepts arbitrary `.pages.dev` origins. It does not meet the global newsletter-worker standard. Future backend work must use `newsletter-worker-standard`, persist before dispatch, restrict origins, enforce actual body-size limits, add durable audit/idempotency/retry and verify preview plus production before changing the frontend contract. No test inquiry was sent or delivery certified by this SEO audit.
