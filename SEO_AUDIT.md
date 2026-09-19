# SEO / GEO / AEO Audit

Audit date: 2026-09-19. Scope: public subsite, source templates, Cloudflare Pages settings and parent-site discovery. Search Console, Bing and traffic/conversion data were unavailable; no ranking or traffic improvement is claimed.

## Diagnosis and findings

This is a separate origin, `outreach-engine.flypigai.ca`, not a parent-site folder. The original seven English canonical URLs, HTTPS redirect, extension normalization, robots and real 404 behavior were healthy. Main gaps: language discovery, lost experiment schema, inconsistent entity identity and missing parent-site links.

| Priority | Verified finding | Treatment |
| --- | --- | --- |
| P1 | Chinese relied on JS/browser preferences and shared English URLs/metadata | Generate seven substantive Chinese pages plus seven English pages; one language/H1 per output; reciprocal hreflang and self-canonicals |
| P1 | Three experiments lacked JSON-LD despite documentation claiming TechArticle | Shared article/author/publisher/update-date/citation schema and matching visible breadcrumbs |
| P1 | Separate brand Organization ID; no parent-site discovery link | Reuse parent Organization ID, visible operator/address/contact, localized parent footer and llms links |
| P1 | Open Core and commissioned service could be confused | Visible direct questions defining scope, outputs, service differences and experiment limitations |
| P2 | Duplicate production pages.dev HTML; raw Markdown indexable | Production-alias/preview/Markdown noindex headers and canonical links without hiding them from crawlers |
| P2 | Incomplete privacy/hub social metadata | Consistent localized title/description/OG/Twitter output |
| P2 | Long experiment labels risk narrow-screen overflow | Bounded type sizes and word wrapping; crawlable language links |
| P2 | Cached JS could preserve obsolete automatic locale changes | Content-derived CSS/JS asset versions |
| P2 | No generation/search-contract gate | Deterministic rendering, stale-output check, 14-page checks and legacy-language tests |
| P2 | All repository edits triggered deployment | Restrict hosting watch paths; lightweight path-filtered CI without cron |
| P2 | Operations documentation listed obsolete canonical/schema behavior | Replace with actual inventory and current maintenance instructions |
| P2 | Live Cloudflare Web Analytics injection was blocked by the site's CSP | Allow only the documented Cloudflare analytics script/connect hosts; no new tracker added |

## Page-pattern decisions

- Keep/improve overview, experiment hub, three distinct cases, managed research and privacy in both substantive languages.
- Canonicalize tracking parameters to the same language's clean URL. Legacy explicit language parameters are compatibility links, not sitemap entries.
- Permanently redirect extensions and trailing slashes.
- Noindex/follow raw Markdown, production pages.dev and previews. Keep crawl access so the noindex is readable. Alias HTML uses the production custom-domain canonical.
- Return real 404/noindex for nonexistent pages. No catch-all homepage rewrite.
- No thin taxonomy, search/filter, programmatic local pages or speculative articles were added.

## Intent, evidence and trust

The subsite owns prospect-research workflow and qualification intent. The parent retains Canada-Taiwan Edge AI / Physical AI intelligence. Each experiment owns a distinct question, connects through the experiment hub and links to commissioned research. The public Core ends at the Tracker; it does not send email or automate LinkedIn.

The visible organization byline does not invent a human reviewer. Page revision dates are not experiment dates or fresh external-source verification. Citations refer to existing public validation records. FAQs explicitly limit claims about model superiority and commercial outcomes. No ratings, fake offers, unsupported partnerships or invented performance metrics were added.

## Verification record

Initial public HTTP readback verified seven canonical pages, HTTPS, extension/slash redirects and real 404. It confirmed the three missing experiment schemas, duplicate production pages.dev host and indexable Markdown. Cloudflare API confirmed `main`, `docs`, blank build command, broad watch paths, production mail-secret names and no preview mail secrets/persistence bindings.

The local 14-page metadata/schema/link check passed during implementation. Final release results and public readback will be recorded here after execution.

Browser limitation: the canonical lane launcher reported startup, but its MCP returned `connect ECONNREFUSED 127.0.0.1:9241`. Browser work stopped without fallback. Desktop/mobile screenshots, console checks, interactive form behavior and field Core Web Vitals remain unverified.

## Remaining work

1. Search monitoring: verify Search Console/Bing access, submit the subdomain sitemap, inspect indexing and collect field performance data. Crawler access is not proof of indexing.
2. Contact reliability, separate backend work: production sends directly without durable request/audit/idempotency records; preview lacks mail configuration. Apply the global event-driven standard in both environments before a new contract goes live. The existing backend was not modified or certified.
3. Social image: replace the real but small 320x168 asset with an original/approved 1200x630 image. Do not merely upscale and claim better source quality.
4. Repeat desktop/mobile and language-navigation visual checks once the dedicated browser lane is available.
5. Optional production-alias 301: account Rules Lists and Rulesets APIs returned HTTP 403 / code 10000 with the current Pages-capable OAuth authorization. Cloudflare Bulk Redirects require suitable Rules authorization. The supported noindex plus canonical treatment is used now; no request-intercepting backend was added for this alias.

## References

- Google multilingual URLs: https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites
- Google AI features: https://developers.google.com/search/docs/appearance/ai-features
- Cloudflare clean URLs: https://developers.cloudflare.com/pages/configuration/serving-pages/
- Cloudflare redirects: https://developers.cloudflare.com/pages/configuration/redirects/
- Cloudflare build watch paths: https://developers.cloudflare.com/pages/configuration/build-watch-paths/
- Cloudflare CSP requirements: https://developers.cloudflare.com/fundamentals/reference/policies-compliances/content-security-policies/

Google does not require a special AI schema or AI text file for its AI features. `llms.txt` remains supplementary. No ranking, citation or FAQ rich-result guarantee is made.
