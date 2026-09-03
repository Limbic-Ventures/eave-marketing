# eave-marketing

The hand-built static site at [eavehome.app](https://eavehome.app): one `index.html` per folder, shared styles in `assets/support.css` and `assets/a11y.css`, deployed by Vercel from `main`. No build step.

- **Truth ledger:** [`CLAIMS.md`](CLAIMS.md) — every product claim on the site, where it lives, what backs it, when it was last verified.
- **Before a release:** [`RELEASE_CHECKLIST.md`](RELEASE_CHECKLIST.md).
- **Checkers:** `bash scripts/check-claims.sh` (retired claims), `bash scripts/check-prices.sh` (retired prices).
- **Plans and specs:** `docs/superpowers/` (not deployed; see `.vercelignore`).
- **Local preview:** `python3 -m http.server 3456` from the repo root.

Voice: sentence case, second person, plain. Keep *record, memory, plan, score, capture*. Never write *vault, evidence, claim packet* outside Guardian. Partners compliance lines are legally load-bearing; do not edit them.
