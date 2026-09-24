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
  'three core apps'
  'Three kinds of owner'
  'for pros &amp; agents'
  'three worlds, subordinate'
  'prep digest'
  'seasonal digest'
  'Intelligent Upkeep Score'
  'sharpened by your home'
  'two-way sync'
  'Two-way sync'
)
fail=0
for p in "${PATTERNS[@]}"; do
  hits=$(grep -rln --include='*.html' -e "$p" . 2>/dev/null | grep -v '\.claude/'; grep -l -e "$p" llms.txt 2>/dev/null)
  if [ -n "$hits" ]; then
    echo "RETIRED CLAIM '$p' still present in:"; echo "$hits"; fail=1
  fi
done
# Buyers no-say list (BRD §9 W5). Case-insensitive; these are phrasings, not prices.
NOSAY=(
  'off zillow'
  'off of zillow'
  'get your buyers off'
  'on zillow'
  'ai-verified'
  'ai verified'
  'ai-confirmed'
  'guaranteed accurate'
  'browse the mls'
  'search the mls'
  'search every listing'
  'mls data'
  'listing feed'
  'pulls listings'
  'great schools'
  'good schools'
  'safe neighbo'
  'up-and-coming'
  'family-friendly neighbo'
)
for p in "${NOSAY[@]}"; do
  hits=$(grep -rlin --include='*.html' -e "$p" . 2>/dev/null | grep -v '\.claude/'; grep -li -e "$p" llms.txt 2>/dev/null)
  if [ -n "$hits" ]; then
    echo "BANNED PHRASE '$p' found in:"; echo "$hits"; fail=1
  fi
done

# Escrow Desk copy is ministerial (eave spec AD-10). Checked only between
# <!-- ESCROW-DESK:START --> and <!-- ESCROW-DESK:END --> markers.
ministerial=$(python3 - <<'PY'
import glob, re
bad = re.compile(r"\b(default(s|ed)?|breach|in danger of|you should|recommend\w*|waiv(e|ing)|protects you|must be corrected|credited in full|verified|risk score)\b", re.I)
out = []
for f in glob.glob('**/*.html', recursive=True):
    if '.claude' in f: continue
    s = open(f, encoding='utf-8').read()
    for m in re.finditer(r'<!-- ESCROW-DESK:START -->(.*?)<!-- ESCROW-DESK:END -->', s, re.S):
        text = re.sub(r'<[^>]+>', ' ', m.group(1))
        for h in bad.finditer(text):
            out.append(f"{f}: '{h.group(0)}'")
print('\n'.join(out))
PY
)
if [ -n "$ministerial" ]; then
  echo "MINISTERIAL: banned word in Escrow Desk copy:"; echo "$ministerial"; fail=1
fi

[ $fail -eq 0 ] && echo "OK: no retired claims found."
exit $fail
