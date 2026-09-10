/* Anonymous page-view analytics. No email, form values, cookies, full URLs or IPs. */
(() => {
  'use strict';
  const endpoint = 'https://libido-access-dashboard.atsushi-kawase.chatgpt.site/api/collect';
  // Enabled only after the collector's public reception has been verified.
  const enabled = false;
  const params = new URLSearchParams(location.search);
  try {
    if (params.get('analytics') === 'off') localStorage.setItem('libido-analytics-optout', '1');
    if (params.get('analytics') === 'on') localStorage.removeItem('libido-analytics-optout');
    if (localStorage.getItem('libido-analytics-optout') === '1') return;
  } catch (_) { if (params.get('analytics') === 'off') return; }
  if (!enabled || !crypto.randomUUID) return;
  let source = 'direct';
  const utm = (params.get('utm_source') || '').toLowerCase();
  const known = {instagram:'instagram',ig:'instagram',facebook:'facebook',fb:'facebook',meta:'facebook',google:'google',x:'x',twitter:'x'};
  if (utm) source = known[utm] || 'other';
  else if (document.referrer) {
    try {const h = new URL(document.referrer).hostname;source = /(^|\.)instagram\.com$/.test(h)?'instagram':/(^|\.)(facebook|fb)\.com$/.test(h)?'facebook':/(^|\.)google\.[a-z.]+$/.test(h)?'google':/(^|\.)(x|twitter|t)\.co(m)?$/.test(h)?'x':h===location.hostname?'direct':'other';} catch (_) {}
  }
  const state = {id:crypto.randomUUID(),source,device:matchMedia('(max-width: 767px)').matches?'mobile':'desktop',active:0,scroll:0,input:false,submitted:false,accepted:false,submitSeconds:null,clicks:{hero:0,video:0,sticky:0,other:0,privacy:0,company:0}};
  let activeMs = 0, last = performance.now(), visible = !document.hidden;
  function tick(){const now=performance.now();if(visible)activeMs+=Math.max(0,now-last);last=now;state.active=Math.floor(activeMs/1000);}
  function scroll(){const h=document.documentElement.scrollHeight;state.scroll=Math.max(state.scroll,Math.min(100,Math.round((window.scrollY+innerHeight)/h*100)));}
  function send(){tick();scroll();const body=JSON.stringify(state);try{if(navigator.sendBeacon(endpoint,new Blob([body],{type:'text/plain'})))return;}catch(_){}fetch(endpoint,{method:'POST',body,headers:{'Content-Type':'text/plain'},credentials:'omit',keepalive:true}).catch(()=>{});}
  document.getElementById('email')?.addEventListener('input',()=>{if(!state.input){state.input=true;send();}});
  document.addEventListener('libido:submit',()=>{if(!state.submitted){tick();state.submitted=true;state.submitSeconds=state.active;}send();});
  document.addEventListener('libido:accepted',()=>{state.accepted=true;send();});
  document.addEventListener('click',e=>{const a=e.target instanceof Element?e.target.closest('a'):null;if(!a)return;const href=a.getAttribute('href')||'';let key=null;if(href==='#register'){key=a.closest('.mobile-action')?'sticky':a.closest('.hero')?'hero':a.closest('.video-section')?'video':'other';}else if(href.includes('privacy'))key='privacy';else if(/^https:/.test(href))key='company';if(key){state.clicks[key]=Math.min(100,state.clicks[key]+1);send();}});
  document.addEventListener('visibilitychange',()=>{tick();visible=!document.hidden;send();});
  window.addEventListener('pagehide',send);
  window.addEventListener('pageshow',()=>{last=performance.now();visible=!document.hidden;});
  setInterval(()=>{if(!document.hidden)send();},15000);
  send();
})();
