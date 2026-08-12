/* GA4 for the published deck. Localhost stays silent, so the workbench and
   dev runs never pollute the numbers. Every page that matters includes this
   file and reports through track(name, params). */
(function () {
  var ID = 'G-FNS68B2XXH';
  var demo = location.search.indexOf('demo=1') > -1;
  /* The autoplaying film is this same build running itself. It must stay
     completely silent — its scripted taps would forge a funnel out of nobody. */
  if (demo || location.hostname === 'localhost' || location.hostname === '127.0.0.1') {
    window.track = function () {};
    return;
  }
  var s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=' + ID;
  document.head.appendChild(s);
  window.dataLayer = window.dataLayer || [];
  function gtag() { dataLayer.push(arguments); }
  window.gtag = gtag;
  gtag('js', new Date());
  /* The prototype is an iframe on the deck, so it loads this file a second
     time. Its own page_view would double every visit and read as depth that
     isn't there — the flow_* events it reports are the point, not the hit. */
  gtag('config', ID, window.top !== window.self ? { send_page_view: false } : {});
  window.track = function (name, params) { gtag('event', name, params || {}); };
})();
