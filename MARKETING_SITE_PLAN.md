# eavehome.app — Site Audit & Improvement Plan

**Date:** July 2, 2026
**Context:** The product just shipped its biggest capability upgrade — the home knowledge graph (unified asset registry, curated upkeep templates, inventory-aware reminders, warranty/replacement forecasting) is live in production on web, and iOS is in TestFlight. This plan audits the current site against what the product *now actually does* and prioritizes updates, with emphasis on value proposition and story-driven conversion.

---

## 1. Audit summary

| Dimension | Grade | Notes |
|---|---|---|
| Problem framing | **A** | The "mental backlog, notes-app graveyard" narrative + 92%/$5,600/68% stats is genuinely strong. Keep. |
| Show-don't-tell | **A−** | The interactive capture demo (running toilet → scoped plan) is the best thing on the page. But it's the *only* story module. |
| Value proposition | **B−** | Leads with "upkeep without the overwhelm" (a relief promise every competitor makes). The differentiated promise — *your home's memory, and memory that acts* — is buried in section 3. |
| Product accuracy | **B−** | Several claims lag or lead the shipped product (details in §3). The strongest shipped capability isn't mentioned at all. |
| CTA strategy | **B−** | "Get early access →" links to a live, open app — underclaims and adds fake friction. Two dead `href="#"` links. |
| Trust & proof | **B** | Stats and "nothing saves without your say" are good. No social proof, no founder note, no data-ownership promise. |
| Technical SEO | **C** | Only 8 real `<h*>` tags on the entire page — section titles are styled `div`s, invisible to search and screen readers. No structured data. Thin sitemap. |

**The one-sentence verdict:** the site sells a very good to-do app; the product is now a home memory that acts on your behalf — and the single most convincing story it can tell (the furnace flow) isn't on the page.

---

## 2. The headline gap: tell the furnace story

The product's flagship flow is live and no competitor matches it end-to-end:

> Snap a photo of your furnace → Eave identifies it, files it in the right room, and **remembers the filter size forever** → suggests its maintenance schedule (you confirm with one tap) → reminds you a week before each task → checks your inventory and either says **"time to buy a 16×25×1 — here's where"** or **"you already have two in the garage."** When the receipt hits your email, the stock count updates and the next alert quietly suppresses itself.

Reminders apps nag. Eave *knows the filter size, checks the shelf, and closes the loop.* This deserves a full story module with the same treatment as the capture demo.

### Proposed new section: "YOUR SYSTEMS" (place directly after CAPTURE)

Mirror the capture demo's mock-UI pattern:

```
SYSTEMS
Your furnace has a filter size. You'll never need to know it.

Snap the data plate on any appliance or system. Eave identifies it,
looks up the specs, and proposes its real maintenance schedule —
you approve with one tap.

  [mock: photo frame → asset card]
  GAS FURNACE — CARRIER          UTILITY CLOSET
  Filter: 16×25×1 MERV 11        Installed 2015 · serviced Oct
  SUGGESTED UPKEEP
   ▢ Replace filter — every 3 months
   ▢ Annual service — each fall (pro)
  [ ADD TO PLAN → ]

  [mock: two push notifications, side by side]
  🛒 Time to buy: 16×25×1 filter        ✓ You already have 2
  Filter change due in 2 weeks —        Filter change due in 2 weeks —
  you're out of stock. [Buy now]        they're in the garage.

From one photo: the specs, the schedule, the reminders, and a
one-tap reorder — or the quiet satisfaction of already having the part.
```

This section does triple duty: it's the most concrete differentiation on the page, it demonstrates "memory" (the brand) rather than asserting it, and it naturally sells Intelligence (the reminders/plan machinery).

---

## 3. Accuracy fixes (do these regardless of anything else)

| Current claim | Reality | Fix |
|---|---|---|
| "Get early access →" (7 instances) | App is live and open at app.eavehome.app | **"Start free →"** (+ "no card required" microcopy near the primary CTA). Keeps the existing sign-in link for returning users. |
| Free tier bullet: "Connected Sources — Gmail, Home Depot, Lowe's, smart home" | Live today: Gmail, Google Calendar, Apple iCal, service marketplaces. HD/Lowe's/Amazon/smart-home are coming-soon in-app | "Connected Sources — Gmail & calendar today; store and smart-home accounts rolling out." Overstating here creates a day-one disappointment for the exact users who convert on it. |
| "native iOS and Android apps are coming soon" | iOS is in TestFlight now | **Decision for Garrett:** either keep as-is until App Store launch, or upgrade to "iOS beta is live — join the TestFlight" (a working beta is stronger social proof than "coming soon"). |
| Appliances bullet: "track model, warranty, and service history" | Also live now: AI spec enrichment, warranty *alerts*, replacement forecasting, suggested maintenance per asset | Upgrade the bullet: "Systems & Appliances — specs auto-researched, warranty alerts, replacement forecasting." |
| Two `href="#"` dead links | — | Point somewhere real or remove. |
| Pricing figures ($2.99/mo, $24/yr, $49 lifetime; Pro tiers) | Assumed current | **Verify against the live app's Membership page before touching** — the site may already be the source of truth; just confirm they match. |

---

## 4. Value proposition sharpening (hero)

Current hero: *"HOME UPKEEP WITHOUT THE OVERWHELM / The easy way to keep up with your home."* Fine, but generic — every home app promises relief. The brand tagline ("Your home's memory") and the shipped product both point at a sharper claim: **memory that acts.**

Three hero options, in order of recommendation:

1. **"Your home's memory — with a to-do list."**
   Sub: *Eave remembers every detail about your home — the filter sizes, the warranties, the paint colors, who fixed what — and tells you what needs doing next, and why.*
   (Leads with the moat; the sub delivers the relief promise the current hero makes.)

2. **"The home app that remembers the filter size."**
   Sub: *Snap it once. Eave keeps the specs, schedules the upkeep, and reminds you before it matters — with a one-tap reorder when you're out.*
   (Concrete and ownable; pairs perfectly with the new Systems section.)

3. **Keep the current headline, upgrade the sub:**
   *Eave is your home's memory: capture anything in five seconds, and it comes back with specs, schedules, budgets, and what to do next.*

Whichever wins, the kicker line "HOME UPKEEP WITHOUT THE OVERWHELM" can stay — it's the emotional register; the headline should carry the differentiation.

---

## 5. More story-type actions (the conversion engine)

The capture demo works because visitors *watch the product think.* Extend that pattern:

1. **The Systems/furnace module** (§2) — highest priority.
2. **"Your first week with Eave" timeline** — a horizontal 5-beat strip: *Day 1: address + 3 photos → Day 2: your home's profile & upkeep score → Day 3: first reminder lands → Day 7: the queue tells you the one thing to do this weekend, and why.* Converts "how it works" from setup mechanics into a felt experience of the payoff cadence.
3. **Make the reminder itself the proof.** The two-notification mock (buy vs. already-have) is the single most shareable artifact on the future page. Also reuse it as a social/OG image variant.
4. **Before/after strip** — left: screenshot-style "notes app graveyard" (faded `flapper?? call plumber, gutters!!`); right: the same items as a ranked queue with why-now lines. Cheap to build, lands the core transformation.
5. **CTA microcopy in the story voice.** "Start with the one thing that's been nagging you" is excellent — repeat that pattern at every CTA: hero → *"Start free — capture your first fix in 5 seconds"*; post-systems section → *"Snap your furnace. See what Eave finds."*

---

## 6. Trust & proof upgrades

- **Founder note** (3 sentences + photo/signature): why a homeowner built this. Early-stage honesty beats absent testimonials.
- **Data ownership promise** near Connected Sources: *"Your records are yours — review everything before it saves, export everything whenever you want."* (The exportable home history is on the roadmap; the review-before-save behavior is live and already stated — elevate it.)
- **TestFlight badge** (if the iOS-beta decision lands yes) — a live beta is proof of momentum.
- When real users exist: replace the stats row's third stat with a testimonial carousel; until then the stats are doing honest work.

---

## 7. Technical & SEO

1. **Semantic headings.** One `<h1>` (hero), `<h2>` per section, `<h3>` per card. Currently ~8 heading tags total; sections are styled `div`s. This is the biggest SEO lever on the page and costs nothing visually (keep the classes, change the tags).
2. **Structured data:** `SoftwareApplication` + `Offer` (free tier, Intelligence pricing) + `FAQPage` schema.
3. **Add an FAQ section** (SEO long-tail + objection handling): "Is Eave really free?", "What happens to my data?", "Do I need the app or can I use the browser?", "What's the difference between Intelligence and Pro?", "What size furnace filter do I need?" (the last one is a top-of-funnel search Eave *literally answers*).
4. **Meta description:** current one is capture-only. Test: *"Eave is your home's memory — snap anything and it keeps the specs, schedules the upkeep, and reminds you before it matters. Free for one home."*
5. **Sitemap:** add `/support`, `/privacy`, `/terms` if missing; set `lastmod`.
6. **Performance:** single-file page is fine; audit `images/` for dimensions/lazy-loading while touching the page.

---

## 8. Suggested sequencing

| Phase | Scope | Effort |
|---|---|---|
| **1 — Truth pass** | §3 accuracy fixes + CTA rename + dead links | ~1 hr, ship same day |
| **2 — The furnace story** | New SYSTEMS section with mock UI + notification pair; hero decision from §4 | ~1 day incl. design polish |
| **3 — Story extensions** | Week-one timeline, before/after strip, CTA microcopy pass, founder note | ~1 day |
| **4 — SEO pass** | Semantic headings, schema, FAQ, meta/sitemap | ~half day |

Phases 1–2 carry most of the conversion value. Everything here is achievable within the existing single-page static architecture — no framework change needed.

---

*Product-side facts referenced in this plan (asset registry, templates, inventory-aware reminders, forecasting, TestFlight) are documented in the app repo: `docs/DATA_ARCHITECTURE.md` and `docs/OPERATIONS.md`.*
