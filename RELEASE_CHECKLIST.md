# Release checklist (marketing site)

Before a product release is called done:

1. Open `CLAIMS.md`. For every row the release touches: re-verify it in the running app today and update the date, **or** update the page, **or** soften the claim to "coming soon".
2. Run `bash scripts/check-claims.sh` and `bash scripts/check-prices.sh`. Both must print OK.
3. Any new or retired feature name goes into `llms.txt` and, if a page changed, `sitemap.xml` `<lastmod>` in the same commit.
4. Re-capture any screenshot whose screen changed (`images/UI/` originals → `images/opt/` WebP; scan for PII first).
5. Open a PR; nothing lands on `main` without review.
