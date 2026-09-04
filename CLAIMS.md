# Claims ledger

One row per product claim on eavehome.app. Status: `verified` · `coming-soon` · `needs-check`.
Before a product release is called done, walk this file: every row the release touched is re-verified with today's date, or the page is updated, or the claim is softened. `scripts/check-claims.sh` fails the build if a retired phrasing returns.

"Backed by" points at the app repo (`../eave`) unless noted.

| Claim | Page · section | Backed by | Status | Verified |
|---|---|---|---|---|
| Typing capture is free on every plan; voice and photo reading are Intelligence | /residential free card · /pricing · /features/capture · /features/connected-sources · / engine step 01 · /support/capturing-your-home · /support/intelligence-vs-free · /support/getting-started | `components/CaptureTab.tsx` HOME-4 free-tier routing | verified | 2026-09-03 |
| Upload limit 100 MB per file | /support/troubleshooting-uploads · /support/inspection-import · /support/manuals-and-insurance-import · /support/getting-started | `lib/documents-limits.ts` (default 100) | verified | 2026-09-03 |
| Document storage: Free 1 GB, Intelligence 10 GB, documents only, per owner | /pricing · /support/troubleshooting-uploads · /support/data-privacy | `lib/storage-tiers.ts` | verified | 2026-09-03 |
| Upkeep Score: maintenance 45 / backlog 30 / preventive 25, consistency informational, 0–100 with no floor | /features/upkeep-score · /support/upkeep-score | `lib/score.ts` calcTotalScore | verified | 2026-09-03 |
| Adding tasks can never lower the score; 90-day new-home grace | same | `lib/score.ts` SCORE-1 · `lib/home-ranker.ts` isInGracePeriod | verified | 2026-09-03 |
| Setup is document-led, eight steps, resumable from Property settings | /support/getting-started | `components/setup/v2/SetupWizard.tsx` | verified | 2026-09-03 |
| Connected sources today: Gmail, Google Calendar, .ics, Amazon order-history file, SmartThings token import, Thumbtack/Angi/Yelp/Houzz profile import; Home Depot and Lowe's via Gmail; Outlook, Google Nest, Alexa coming | /features/connected-sources · /features hub · /features/home-knowledge-base · /residential step 03 · free cards | `components/ConnectedSourcesTab.tsx` status map (WORKS/PARTIAL/SOON) · `app/api/{calendar,gmail,smartthings,vendors,purchases}` | verified | 2026-09-03 |
| Photos and documents private, signed links, delete erases the file | /privacy §1.6 · /support/data-privacy | `lib/privacy-copy.ts` FILES_PRIVACY_STATEMENT · PHOTO wave 5522a1d · DOC-1b e300583 | verified | 2026-09-03 |
| Eave Partners is live | / FAQ · nav | `app/partner/page.tsx` in production | verified | 2026-09-03 |
| Guardian: coming soon, $24.99/mo · $199/yr | nav · / · /residential · /pricing · /features/guardian · /pro · /support/billing | not built; `guardian` not in `user_profiles.plan` enum | coming-soon | 2026-09-03 |
| Multi-Property 2–5 homes purchasable at $7.99/property/mo | /for/landlords · /pricing · /support/intelligence-vs-free · /support/spaces-and-properties | Stripe MULTI_SM prices in `app/api/billing/checkout/route.ts` | verified | 2026-09-03 |
| Move-in/out condition reports and tenant issue link | /for/landlords · /pricing multi card · two support pages | no code; labelled roadmap / Coming | coming-soon | 2026-09-03 |
| Portfolio (6+) is a waitlist | /for/landlords · /residential FAQ · /pricing FAQ · llms.txt | no code; Loops `portfolio-waitlist` capture | coming-soon | 2026-09-03 |
| Household sharing: co-owner, helper, house sitter; seats free | /for/landlords panel · /pricing multi card · llms.txt (full section arrives in W3) | `lib/constants.ts` HOUSEHOLD_ROLES · household wave 8589515 | verified | 2026-09-03 |
| $49 lifetime no longer sold; existing buyers keep Intelligence forever | /pricing FAQ · /support/billing · /support/care-plan · /support/contractors-and-hire-it-out · /support/intelligence-vs-free | `intelligence_lifetime` plan value honored in `lib/entitlement.ts` | verified | 2026-09-03 |
| Export everything as a single file, every plan | / trust · /pricing · /support/data-privacy | `app/api/export` (Phase D exports) | verified | 2026-09-03 |
| Native iOS and Android apps coming soon | footer · / · /residential | no store build carries the September work; Android submit pending | coming-soon | 2026-09-03 |
| Reminders fire nightly for residential maintenance tasks | /support/reminders-and-buy-links | not verifiable from code alone | needs-check | — |
| Weekly queue shows "up to five things" | /features/intelligence · /features | new Home ranker; count unconfirmed | needs-check | — |
| Capture results note permits "where it matters" | /features/capture | softened pending a screenshot of the field | needs-check | — |
| Seasonal prep digest 14 days before the season turns | /residential · /features/intelligence · /pricing | `docs/` care-plan digest cadence; not re-verified this pass | needs-check | — |
| Eave Leads: flat monthly subscription, homeowner-initiated | /partners/real-estate-agents | gated to `LEADS_TESTER_EMAILS`; held pending attorney | needs-check (held) | — |
| Intelligent Home Setup: eight resumable steps (your home, documents, spaces, structure, systems, utilities, appliances, plan); entry at Property settings → Update my home | /features/setup · /support/intelligent-home-setup · /features hub · /support/getting-started | `components/setup/v2/SetupWizard.tsx` · `SetupShell.tsx` | verified | 2026-09-03 |
| Confident finds file themselves with undo; uncertain ones wait for review; inspection findings review (keep / uncheck with reason) | /features/setup · /support/intelligent-home-setup · /for/home-buyers | ONB-14 provisional accepts f17d2ed · ONB-6/7/8 4a20163 | verified | 2026-09-03 |
| Setup and document reading are free on every plan | /features/setup FAQ · /support/intelligent-home-setup | `/api/setup/ingest` gates on `checkAiLimit` only | verified | 2026-09-03 |
| Structure page and Systems page are separate under Property; type lists as published | /features/home-knowledge-base · /support/structure-systems-and-appliances | `lib/asset-taxonomy.ts` STRUCTURE_TYPES / SYSTEM_TYPES · STR-1 11f081f | verified | 2026-09-03 |
| Utilities found from address or read from a bill; Services in four groups (Transaction · Protection · Recurring care · Governance) each with one next date; documents suggest providers; providers link to what they serve | /features/home-knowledge-base · /support/utilities-and-providers | `lib/providers-vocab.ts` · PRV-1..9 · SVC-1..3 | verified | 2026-09-03 |
| Documents page under Memory with storage meter; delete erases; document→item links; long reads run in the background | /features/home-knowledge-base · /support/documents | DOC-2 4a156d1/43e6227 · DOC-1b e300583 · READ-1 50f2cb3 | verified | 2026-09-03 |
| Household: Co-owner (shares the plan; home keeps ≥1), Helper, House sitter (time-boxed 1w/2w/1m/custom); seats free; invite from Property settings → People with access | /features/home-knowledge-base · /support/household-sharing | `lib/constants.ts` · `components/settings/PeopleWithAccess.tsx` · plan inheritance 0660138 | verified | 2026-09-03 |
| Capture bar (talk / snap / type) on every Structure / Systems / Appliances add form | /support/structure-systems-and-appliances | FormCaptureBar 6c58fe5 | verified | 2026-09-03 |
| Partner client book: five agent-arranged columns (Leads · Selling · Looking · Just bought · Forever client), NEEDS YOU card, works in a phone browser | /partners/real-estate-agents #client-book | R8-3 3fd463e · PART-1 c9f996e · `app/partner/page.tsx` | verified | 2026-09-03 |
| 30-day graceful handover when partner funding ends; client chooses self-pay or free with data intact | /partners/real-estate-agents #how-it-works · FAQ | R8-4 1f8a9c0 · seat release 521a64f | verified | 2026-09-03 |
| Agent attribution: "From your agent" on the client's Home; People → Agents page | /partners/real-estate-agents #after | PART-4 a7a07ef | verified | 2026-09-03 |
| Client can disconnect ("Remove me"); seat returns to the pool; agent notified | /partners/real-estate-agents FAQ | R8-4 remove-me `/api/account/unlink` | verified | 2026-09-03 |
| Agent seat pricing ($2.99 per client per month, 1 or 5-pack) | not published (D15 pending legal review) | partner allotments 1-or-5 preset | needs-check (held) | — |
| Accessibility: site targets WCAG 2.2 AA, reports 2.1 AA; response within 3 business days to support@eavehome.app; no overlay widgets; VPAT on request | /accessibility · footer sitewide | W5 pass 2026-09-03: text tokens ≥4.5:1 (jade-text #2B6A8E, amber-text #7F5E10, muted #5A6770, dim #696461), 12px floor, focus-visible ring, reduced-motion, skip link; live scan 0 contrast failures on /, /residential, /pricing, /features/setup, /accessibility | verified | 2026-09-03 |
| Document kind detected on upload; duplicate uploads reuse the copy on file; HEIC converted; closing-packet and hazard-disclosure readers | /features/home-knowledge-base · /features/setup FAQ · /support/documents | 93cd424 doc-classify · DOC-7..11 4bdaa38 · `lib/vision/prompts/{closing-packet,hazard-disclosure,doc-classify}.ts` · `DOC_COPY.duplicate` | verified | 2026-09-03 |
| Life events re-rank the queue (listing, renovation) | /residential memory node 04 · /features/intelligence | `components/LifeEventsTab.tsx` · `app/api/life-events` | verified | 2026-09-03 |
| Badges shown as earned; streak shown on the score card, weight 0 | /features/upkeep-score | `components/score/BadgeGallery.tsx` · d976135 earned-only | verified | 2026-09-03 |
| Recent activity on the Tasks page (completion history) | /residential step 04 | QA-2b 9fe8185 · `/api/tasks/history` | verified | 2026-09-03 |
| Utilities and services shown as a memory node on /residential (electric account, support line, serves, renewal) | /residential #memory | PRV-5/7 · SVC-2 | verified | 2026-09-03 |
