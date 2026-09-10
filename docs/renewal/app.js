'use strict';
const form = document.getElementById('registration-form');
const button = form.querySelector('button[type="submit"]');
const error = document.getElementById('form-error');
let sending = false;
form.addEventListener('submit', async (event) => {
  event.preventDefault();
  if (sending || !form.reportValidity()) return;
  if (form.elements.website.value) return;
  sending = true;
  error.hidden = true;
  const label = button.innerHTML;
  button.disabled = true;
  button.textContent = '送信しています…';
  document.dispatchEvent(new Event('libido:submit'));
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 20000);
  try {
    const email = document.getElementById('email').value.trim();
    const response = await fetch('https://formsubmit.co/ajax/1641494papa@gmail.com', {
      method: 'POST', headers: {'Content-Type':'application/json','Accept':'application/json'},
      body: JSON.stringify({email, _replyto:email, _subject:'【リビドーLP】メールアドレスの申込み通知', _template:'table', message:'リニューアルLPから無料動画の申込みがありました。下記メールアドレスをご確認ください。'}),
      signal:controller.signal
    });
    const data = await response.json();
    if (!response.ok || (data.success !== true && data.success !== 'true')) throw new Error('not accepted');
    document.dispatchEvent(new Event('libido:accepted'));
    window.location.assign('https://genetics-code.net/lp/thanks.html');
  } catch (_) {
    error.hidden = false;
    error.focus();
    button.disabled = false;
    button.innerHTML = label;
    sending = false;
  } finally {clearTimeout(timeout);}
});
const mobileAction = document.querySelector('.mobile-action');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    mobileAction.classList.toggle('is-hidden', entries[0].isIntersecting);
  }, {threshold: 0});
  observer.observe(document.getElementById('register'));
}
