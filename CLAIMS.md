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
| Google Calendar live; .ics feed live; Outlook, store accounts, smart home coming | /features/connected-sources · /residential step 03 · free cards | `components/ConnectedSourcesTab.tsx` · `app/api/calendar/{sync,export}` | verified | 2026-09-03 |
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
