/* ──────────────────────────────────────────────────────────────────────────
   Eave email capture → Loops custom form endpoint.

   SETUP (one time, ~5 min):
   1. In Loops → Forms → create a form (any style) → "Publish".
   2. Choose the "API" / custom-form option and copy the endpoint URL.
      It looks like: https://app.loops.so/api/newsletter-form/XXXXXXXXXXXX
   3. Paste it into LOOPS_ENDPOINT below and redeploy.
   Docs: https://loops.so/docs/forms/custom-form

   One endpoint powers every capture surface; each surface is tagged via its
   markup (data-source), which is sent to Loops as `source` + `userGroup`
   so you can segment/automate per surface. UTM + landing page are recorded
   in `notes` for channel attribution. Until the endpoint is set, forms show a
   friendly "coming soon" note instead of failing.
   ────────────────────────────────────────────────────────────────────────── */
(function () {
  'use strict';

  var LOOPS_ENDPOINT = 'https://app.loops.so/api/newsletter-form/cmrjqhlwn030f0jxjzlq2cm8m';

  function attribution() {
    try {
      var p = new URLSearchParams(location.search);
      var parts = [];
      ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'].forEach(function (k) {
        var v = p.get(k);
        if (v) parts.push(k + '=' + v);
      });
      parts.push('landing=' + location.pathname);
      if (document.referrer) parts.push('ref=' + document.referrer);
      return parts.join(' | ');
    } catch (e) {
      return 'landing=' + location.pathname;
    }
  }

  function say(form, msg) {
    var el = form.querySelector('[data-capture-status]');
    if (el) el.textContent = msg;
  }

  function bind(form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      // honeypot: real users never fill a hidden field
      var hp = form.querySelector('input[name="website"]');
      if (hp && hp.value) return;

      var emailEl = form.querySelector('input[type="email"]');
      var email = (emailEl && emailEl.value || '').trim();
      if (!email) { say(form, 'Please enter your email.'); return; }

      var source = form.getAttribute('data-source') || 'Website';
      var btn = form.querySelector('button[type="submit"], input[type="submit"]');

      if (LOOPS_ENDPOINT.indexOf('REPLACE_') === 0) {
        say(form, 'Almost there — sign-ups go live shortly. Check back soon!');
        return;
      }

      if (btn) { btn.dataset.label = btn.textContent; btn.textContent = 'Sending…'; btn.disabled = true; }

      var body = new URLSearchParams();
      body.set('email', email);
      body.set('source', source);
      body.set('userGroup', source);
      var note = attribution();
      if (note) body.set('notes', note);

      fetch(LOOPS_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString()
      })
        .then(function (r) {
          return r.json().catch(function () { return {}; }).then(function (j) {
            return { ok: r.ok, status: r.status, body: j };
          });
        })
        .then(function (res) {
          if (res.ok && res.body && res.body.success) {
            form.setAttribute('data-submitted', 'true');
            say(form, form.getAttribute('data-success') || "You're on the list — thanks!");
            if (window.gtag) {
              gtag('event', 'email_signup', { method: 'loops', signup_source: source, page_path: location.pathname });
            }
          } else {
            if (btn) { btn.textContent = btn.dataset.label || 'Try again →'; btn.disabled = false; }
            if (res.status === 429) say(form, 'One moment — too many tries. Give it a minute.');
            else say(form, (res.body && res.body.message) || 'Something went wrong — please try again.');
          }
        })
        .catch(function () {
          if (btn) { btn.textContent = btn.dataset.label || 'Try again →'; btn.disabled = false; }
          say(form, 'Network error — please try again.');
        });
    });
  }

  function init() {
    var forms = document.querySelectorAll('form[data-capture]');
    for (var i = 0; i < forms.length; i++) bind(forms[i]);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
