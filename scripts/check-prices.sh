#!/usr/bin/env bash
# Fails if any retired price/copy string remains in served HTML or llms.txt.
set -u
cd "$(dirname "$0")/.."
PATTERNS=(
  'from \$2\.99'
  '\$49 for a lifetime'
  '\$49 once'
  'Lifetime \$49'
  'lifetime license'
  'intelligence_lifetime'
)
# NOTE: $2.99/mo and $24/yr are CURRENT Intelligence prices (Garrett 2026-07-12)
# and stay on the site — only the "from $2.99" hero framing and the sold
# lifetime option are retired.
fail=0
for p in "${PATTERNS[@]}"; do
  hits=$(grep -rln "$p" --include='*.html' . 2>/dev/null; grep -l "$p" llms.txt 2>/dev/null)
  if [ -n "$hits" ]; then
    echo "RETIRED STRING '$p' still present in:"; echo "$hits"; fail=1
  fi
done
[ $fail -eq 0 ] && echo "OK: no retired pricing strings found."
exit $fail
