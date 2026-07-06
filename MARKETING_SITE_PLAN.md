# eavehome.app — Marketing Site Plan v2

**Date:** July 3, 2026 (supersedes the July 2 plan)
**Context:** The knowledge-graph launch audit produced a 4-phase plan on July 2. Phases 1 (truth pass) and the original narrow Phase 4 (on-page SEO) are largely shipped. This v2 re-baselines what's left, folds in the audit findings from the July 3 review, and expands Phase 4 into a full SEO/AI-GEO site-architecture build-out (multi-page support, guides hub, topic landing pages) agreed in planning session.

---

## 1. Status of the original plan (July 2 → now)

### Shipped ✅ (commits `bfd8b85` → `963d898`)

- Primary CTAs → "Start free in your browser →" + "No credit card" microcopy
- Connected Sources claim corrected ("Gmail & calendar today; store & smart-home rolling out")
- Systems & Appliances bullet upgraded (specs auto-researched, warranty alerts, service history)
- Dead `href="#"` links removed
- Pricing copy reworked, Intelligence-led headline, Eave Commercial contact row
- Semantic `<h1>`/`<h2>` on every section
- `SoftwareApplication` + `Offer` schema on homepage
- Meta description rewritten to the "memory" pitch
- Sitemap covers `/`, `/support`, `/privacy`, `/terms` with lastmod
- Images optimized (webp, dimensions, lazy-loading)
- Footer tagline fixed → "Home Upkeep Without the Overwhelm."
- Interactive season timeline (story-extension adjacent)
- Furnace *content* landed inside the Memory section (Carrier card: filter size, warranty, forecast) — but not as the standalone story module

### Still open from v1 ❌

| Item | Original phase | Notes |
|---|---|---|
| "GET EARLY ACCESS →" button on Free tier (`index.html` ~line 1676) | 1 | Last surviving instance of the string Phase 1 was meant to kill |
| iOS TestFlight decision ("coming soon" vs "beta is live — join TestFlight") | 1/6 | **Garrett's call.** Currently defaulted to "coming soon" in 3+ places |
| Furnace/SYSTEMS story module | 2 | The flagship item. Not built |
| Two-notification mock (🛒 buy vs ✓ already-have) | 2/5 | Most shareable artifact; also wanted as an OG-image variant |
| Hero headline sharpening ("memory that acts") | 4 (§4 v1) | Hero still "The easy way to keep up with your home"; sub was upgraded but headline is generic |
| "Your first week with Eave" 5-beat timeline | 3 | Not started |
| Before/after "notes graveyard → ranked queue" strip | 3 | Not started |
| Founder note | 3/6 | Not started |
| CTA microcopy story-voice pass | 3 | Partially done (hero fine-copy is good); not systematic |
| FAQ section on homepage + `FAQPage` schema | 4 | Superseded — FAQ strategy moves to the new support architecture (§3); homepage gets a slim FAQ that links out |
| `<h3>` on cards | 4 | Cards still `div`s |
| Data-ownership promise near Connected Sources | 6 | One sentence; cheap |
| Testimonials / TestFlight badge | 6 | Blocked on real users / TestFlight decision |

---

## 2. The build phases (v2)

Priorities reordered per July 3 session: **SEO/GEO architecture first**, then the furnace story, then story extensions.

### PHASE A — SEO/AI-GEO architecture (expanded old Phase 4)

The core finding: `/support` is already deep (4 FAQ groups, 16 KB articles, 5 step-by-step guides) but it's a single-URL accordion — invisible to search and AI answer engines, not linked from top nav, and stale in places. Meanwhile GEO rewards exactly what we have but haven't structured: answer-shaped content at individual URLs with `FAQPage`/`HowTo` schema and an llms.txt that itemizes them.

**Decisions locked (July 3):** split into real pages · "Support" added at end of top nav · build both a guides hub and topic landing pages.

#### Target URL architecture

```
/                                    homepage (existing)
/support                             hub/index — links out, no longer holds all content
/support/getting-started             FAQ group page
/support/using-eave                  FAQ group page
/support/data-privacy                FAQ group page
/support/billing                     FAQ group page
/guides                              guides hub
/guides/first-10-minutes-in-eave
/guides/scanning-a-room-with-photos
/guides/documenting-a-furnace-and-appliances
/guides/connecting-gmail-for-receipts
/guides/seasonal-maintenance-setup
/furnace-filter-size                 topic landing page (high-intent query)
/home-maintenance-checklist-by-season  topic landing page
/how-to-track-home-warranties        topic landing page
/when-to-replace-water-heater        topic landing page (forecasting showcase)
/privacy, /terms                     unchanged
```

Rationale: category pages (not one page per question) keep each URL substantial enough to rank; the meaty how-tos get promoted to full guides; the 16 short KB articles become supporting content *within* their category page. Topic pages answer real searches the product literally solves, with an above-the-fold direct answer (AI-citable) then an "Eave already knows this for your home" pivot + CTA. Hold topic pages at 3–4 and expand based on traffic.

#### Schema plan

- `FAQPage` on each `/support/*` category page (generated from the same accordion markup)
- `HowTo` on each `/guides/*` page (existing numbered steps map directly)
- `Article`/`WebPage` on topic landing pages
- `BreadcrumbList` on all subpages

#### Navigation

- Top nav (+ mobile menu): How it works · Features · Pricing · Pro · **Support**
- Guides/topic pages stay out of primary nav (reachable via `/support` hub, footer, organic/AI search) — nav stays conversion-focused
- Footer already links `/support` ✓; add a second footer column for Guides once the hub exists

#### GEO files

- `llms.txt`: add every new URL with a one-line description under "Key pages" (cheapest, highest-leverage GEO fix)
- `sitemap.xml`: all new URLs — 0.6 guides, 0.5 support categories, 0.4 topic pages; keep lastmod current

#### Sub-steps & effort

| Step | Scope | Effort |
|---|---|---|
| **A1** | Nav link (desktop + mobile) + truth-pass stale `/support` copy (multi-property "coming" vs already-sold; "native apps on roadmap" wording; verify pricing lines) + kill the "GET EARLY ACCESS" button on the homepage while in there | ~30 min |
| **A2** | Split FAQ into 4 category pages + `FAQPage` schema; `/support` becomes a hub | ~2–3 hrs |
| **A3** | `/guides` hub + 5 guide pages with `HowTo` schema (reuse existing step content) | ~2–3 hrs |
| **A4** | 3–4 topic landing pages (net-new writing) | ~half day |
| **A5** | `llms.txt` + `sitemap.xml` + cross-links + slim homepage FAQ that links into `/support/*` | ~30 min |

Shared-template note: subpages should reuse the existing design system (same fonts/colors/chamfer, nav, footer). Build one clean subpage template in A2 and every later page (A3, A4, and future Phase C pages) inherits it — this is the "more room for the rest of the phases" payoff.

### PHASE B — The furnace story (old Phase 2, unchanged in substance)

1. **New "SYSTEMS" story section** directly after CAPTURE, mirroring the capture demo's mock-UI pattern:
   - Headline: *"Your furnace has a filter size. You'll never need to know it."*
   - Mock: photo frame → asset card (GAS FURNACE — CARRIER · filter 16×25×1 MERV 11 · suggested upkeep · ADD TO PLAN →)
   - **Two-notification mock**: "🛒 Time to buy: 16×25×1 — you're out of stock [Buy now]" vs "✓ You already have 2 — they're in the garage." Build as reusable art; also export an OG-image variant.
   - Closer: *"From one photo: the specs, the schedule, the reminders, and a one-tap reorder — or the quiet satisfaction of already having the part."*
2. **Hero decision** (Garrett picks one):
   1. "Your home's memory — with a to-do list." *(recommended)*
   2. "The home app that remembers the filter size."
   3. Keep headline, current upgraded sub stands.
   - The "HOME UPKEEP WITHOUT THE OVERWHELM" eyebrow stays either way.
3. Reconcile with the existing Memory-section furnace card so the page doesn't say "furnace" five times — Systems section = *the loop closing* (notification pair, reorder); Memory section = *the record keeping*.

Effort: ~1 day incl. design polish.

### PHASE C — Story extensions & trust (old Phases 3 + 6)

1. "Your first week with Eave" 5-beat horizontal timeline (Day 1 address + photos → Day 2 profile & score → Day 3 first reminder → Day 7 the weekend queue)
2. Before/after strip: faded notes-app graveyard → same items as ranked queue with why-now lines
3. CTA microcopy story-voice pass at every CTA (post-Systems: *"Snap your furnace. See what Eave finds."*)
4. Founder note: 3 sentences + photo/signature
5. Data-ownership promise sentence near Connected Sources
6. TestFlight badge — **if** the iOS-beta decision lands yes
7. When real users exist: testimonial carousel replaces third stat

Effort: ~1 day.

### PHASE D — Homepage polish leftovers

1. `<h3>` on cards (finish semantic-heading work)
2. Homepage slim FAQ section (5–6 questions, `FAQPage` schema, links into `/support/*`) — depends on A2
3. OG-image refresh using the notification-pair art — depends on B
4. Performance re-audit once new pages exist (shared CSS extraction is optional; single-file-per-page is fine at this scale)

Effort: ~half day.

### PHASE E — Product & audience pages (product knowledge base + GEO expansion)

**Decided July 3 (planning session).** Everything indexable so far is support/how-to. This phase adds the *product marketing* layer: deep, screenshot-rich capability pages and persona pages, arranged as a search funnel that feeds Pricing and app signup. Reuses the `/assets/support.css` template — no new structural work.

**Decisions locked:** build both feature and audience pages · single "Product" nav link to a `/features` hub · audiences = new homeowners, landlords/multi-property, DIY homeowners (selling/moving deferred) · value framing lives on a standalone `/why-eave` page.

#### The funnel (why these pages, by search intent)

| Layer | Pages | Intent example |
|---|---|---|
| Informational (top) | `/furnace-filter-size`, `/when-to-replace-water-heater` (Phase A4) | "what size furnace filter" |
| Product category (mid) | `/features/*` | "home inventory app", "home maintenance score" |
| Audience (mid) | `/for/*` | "app for new homeowners", "landlord maintenance app" |
| Value / decision | `/why-eave`, Pricing, `/support` | "why use a home maintenance app", "eave pricing" |

Feature pages link to the audiences they serve + the guides that show them; audience pages recombine 3–4 features into that persona's story. Cross-linking compounds authority.

#### Target URL architecture

```
/features                              product hub (lists all capability pages)
/features/home-knowledge-base          THE roadmap centerpiece — asset registry,
                                       room inventory, appliance registry, contractors
/features/upkeep-score                 live 0–100 score (high-value SEO term)
/features/capture                      speak / snap / type → structured project
/features/intelligence                 seasonal prep + weekly action queue
/features/connected-sources            Gmail / receipts / warranty detection
/for/new-homeowners                    primary persona (79% want a home manual)
/for/landlords                         multi-property + Eave Commercial tie-in
/for/diy-homeowners                    capable owner tracking own work + budgets
/why-eave                              "How Much Would You Pay to Actually Know?"
                                       value manifesto (from Pricing V2 framing)
```

#### Screenshots — PII-critical

Use ONLY the redacted set in `images/UI/redacted/` (address shown as fictional "124 Maple Ridge Dr, Austin, TX"). The raw `images/UI/*.png` show the real address (1282 Woodside Dr, San Luis Obispo) and must NEVER ship. Available redacted assets: `home-mobile`, `maintenance-mobile`, `connected-mobile`, `projects-desktop`, `sources-desktop`, `pro-mobile`, `more-mobile`. Optimize to `.webp` in `images/opt/` with width/height + lazy-loading before use. Re-scan any NEW screenshot for PII (address, name, geolocation) before publishing — see [[screenshot-pii-check]].

#### Schema plan

- `/features/*`: each maps to a real capability — `WebPage` + `BreadcrumbList`, plus a short `FAQPage` where natural (e.g. "How does the Upkeep Score work?").
- `/for/*`: `WebPage` + `BreadcrumbList`; `FAQPage` for persona objections.
- `/why-eave`: `WebPage`; consider `Product`/`Offer` cross-reference to Pricing.
- `/features` hub: `ItemList` of the capability pages (like `/guides`).

#### Navigation

- Top nav gains one item → **How it works · Product · Pricing · Pro · Guides · Support** (6 items; watch mobile wrap). "Product" → `/features` hub. Audience pages + `/why-eave` stay out of primary nav (reached via hub, homepage, footer, cross-links, and organic/AI search).
- Footer: add a "Product" column linking the feature pages; add `/why-eave`.

#### GEO files

- `sitemap.xml`: add each URL **as its page ships** (not before — avoids crawler 404s). Priority 0.7 features hub + home-knowledge-base, 0.6 other features, 0.5 audience pages, 0.6 `/why-eave`.
- `llms.txt`: itemize the feature/audience/why-eave URLs under Key pages once live.

#### Sub-steps & effort

| Step | Scope | Effort |
|---|---|---|
| **E1** | `/features` hub + `/features/home-knowledge-base` (flagship, redacted screenshots) + "Product" nav item on all pages + optimize needed screenshots to webp | ~half day |
| **E2** | Remaining feature pages: `/features/upkeep-score`, `/features/capture`, `/features/intelligence`, `/features/connected-sources` | ~1 day |
| **E3** | Audience pages: `/for/new-homeowners`, `/for/landlords`, `/for/diy-homeowners` | ~1 day |
| **E4** | `/why-eave` value page (adapts the "How Much Would You Pay to Actually Know?" framing) | ~half day |
| **E5** | Cross-link pass (features ↔ audiences ↔ guides ↔ pricing), footer Product column, sitemap + llms.txt for all shipped URLs | ~half day |

Content note: E1–E4 are net-new copy grounded in the marketing brief's feature list (§6–7) and proof points (§2). Draft, then verify each product claim against the shipped app before publishing (same truth-pass discipline as A1).

---

## 3. Open decisions for Garrett

| Decision | Options | Blocking |
|---|---|---|
| iOS TestFlight messaging | Keep "coming soon" until App Store launch · or "iOS beta is live — join the TestFlight" + badge | Phase A1 wording, Phase C item 6 |
| Hero headline | Option 1 "Your home's memory — with a to-do list." (rec) · Option 2 filter-size hook · Option 3 keep current | Phase B |
| Topic-page list | Confirm the 4 proposed, or swap (`/furnace-filter-size`, `/home-maintenance-checklist-by-season`, `/how-to-track-home-warranties`, `/when-to-replace-water-heater`) | Phase A4 |

---

## 4. Sequencing summary

| Order | Phase | Scope | Effort | Status |
|---|---|---|---|---|
| 1 | **A1** | Nav + support truth pass + last CTA fix | ~30 min | ✅ shipped |
| 2 | **A2** | Support split into category pages + FAQPage schema | ~half day | ✅ shipped |
| 3 | **A3** | Guides hub + 5 HowTo guide pages | ~half day | ✅ shipped |
| — | (nav) | Guides in top nav, Features anchor removed | — | ✅ shipped |
| 4 | **A4–A5** | Topic landing pages + GEO files + homepage slim FAQ | ~half day + writing | todo |
| 5 | **E1–E5** | Product feature pages + audience pages + /why-eave | ~3–4 days | todo (this session's plan) |
| 6 | **B** | Furnace story + hero | ~1 day | todo |
| 7 | **C** | Story extensions + trust | ~1 day | todo |
| 8 | **D** | Polish leftovers | ~half day | todo |

Phases A/E (SEO/content infrastructure) and B/C (homepage story) are independent tracks. Everything stays within the static-HTML architecture; the A2 subpage template (`/assets/support.css`) carries every new page in A3, A4, and E. Recommended next: **E1** (features hub + home-knowledge-base) since it's the roadmap centerpiece and unblocks the "Product" nav item, or **A4** if you'd rather finish the informational-search layer first.

---

*Product-side facts referenced (asset registry, templates, inventory-aware reminders, forecasting, TestFlight) are documented in the app repo: `docs/DATA_ARCHITECTURE.md` and `docs/OPERATIONS.md`. The July 2 v1 plan is preserved in git history (`daa3f2d`).*
