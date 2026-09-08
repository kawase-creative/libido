'use strict';
const form = document.getElementById('registration-form');
const result = document.getElementById('form-result');
form.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  // Proposal preview: no network request, analytics, or browser storage.
  result.hidden = false;
  document.getElementById('email').value = '';
  result.focus();
});
const mobileAction = document.querySelector('.mobile-action');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    mobileAction.classList.toggle('is-hidden', entries[0].isIntersecting);
  }, {threshold: 0});
  observer.observe(document.getElementById('register'));
}
