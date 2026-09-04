#!/usr/bin/env bash
# Fails if any retired product claim remains in served HTML or llms.txt.
# Companion to check-prices.sh. Extend the list when a claim is retired.
set -u
cd "$(dirname "$0")/.."
PATTERNS=(
  'under about 3 MB'
  '~3 MB'
  'About 3 MB'
  'Partners, launching soon'
  'arrives this fall'
  'is coming this fall'
  'launches this fall'
  'coming this fall'
  'launching this fall'
  'launching fall 2026'
  'Launching fall 2026'
  'Guardian this fall'
  'ALL FIVE CAPABILITIES'
  'data-partners='
  'plus move-in/out condition reports'
  'a tenant issue-intake link'
  'floor of 30'
  'talking to our team'
  'talking to the team'
  'Voice, photo, and text capture are included for free'
  'href="https://app.eavehome.app" class="tier-btn-free"'
  'href="https://app.eavehome.app/" class="btn'
  'Installed</span><span class="mem2-field-v">2019'
  'wn-tl-seg now" data-season="summer"'
  'smart-home accounts are coming'
  'store &amp; smart-home accounts rolling out'
  'Smart-home connections</strong> &mdash; read-only device'
)
fail=0
for p in "${PATTERNS[@]}"; do
  hits=$(grep -rln --include='*.html' -e "$p" . 2>/dev/null | grep -v '\.claude/'; grep -l -e "$p" llms.txt 2>/dev/null)
  if [ -n "$hits" ]; then
    echo "RETIRED CLAIM '$p' still present in:"; echo "$hits"; fail=1
  fi
done
[ $fail -eq 0 ] && echo "OK: no retired claims found."
exit $fail
