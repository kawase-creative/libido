'use strict';
const form = document.getElementById('registration-form');
form.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  // Preview navigation only; email is not submitted or stored.
  window.location.assign('https://genetics-code.net/lp/thanks.html');
});
const mobileAction = document.querySelector('.mobile-action');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    mobileAction.classList.toggle('is-hidden', entries[0].isIntersecting);
  }, {threshold: 0});
  observer.observe(document.getElementById('register'));
}
