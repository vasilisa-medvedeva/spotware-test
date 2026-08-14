/* GA4 for the published deck. Every page that matters includes this file and
   reports through track(name, params).

   ===== the events, and the question each one answers =====

   THE DECK (index.html)
     deck_view            {layout}          desktop or phone — the two read very differently
     film_watched         {seconds}         5 / 15 / 30s of genuine on-screen time
     handoff_click                          the arrow was used, not the scrollbar
     proto_reached        {via}             arrow | scroll — did the hand-off do its job?
     proto_fullscreen_open{source}          tap | instant (phones open it on load)

   THE PROTOTYPE (screens/order.html)
     proto_touch                            the first real touch — closes the funnel
     flow_side            {side}
     flow_volume          {via, lots}       slider | stepper | preset
     flow_pending_peek                      Pending was tried at all
     flow_sheet_open      {sheet}
     flow_sheet_done      {sheet, …}        committed — per-sheet params below
     flow_sheet_cancel    {sheet}           backed out; open minus done minus this = abandoned
     flow_kb_open         {field}
     flow_level_added     {levels}          the take-profit ladder
     flow_level_removed   {levels}
     flow_deposit                           the rescue offered on 'not enough funds'
     flow_share
     flow_margin_detail
     flow_place           {side, lots, sl, tp, levels}
     flow_order_filled                      the fill landed, Positions arrived
     flow_group_toggle    {group, open}
     flow_close_position  {count}
     flow_close_pick      {selected}        rows added or removed in the Close sheet
     flow_neworder_again

   The case turns on one number: how many orders leave with protection. That is
   flow_place's sl / tp / levels, and flow_sheet_done{sheet:'autoclose'} carries
   `accepted` — whether the proposed 20/40 pair was kept as offered. */
(function () {
  /* The 'Spotware test' GA4 property (stream: Spotware test deck). Its own
     tag on purpose — the site-wide 'Portfolio' tag GA offered to reuse would
     have poured this deck's numbers into the portfolio's reports. */
  var ID = 'G-3S1RS6K0K6';

  var demo = location.search.indexOf('demo=1') > -1;
  var local = location.hostname === 'localhost' || location.hostname === '127.0.0.1';
  /* The autoplaying film is this same build running itself. It must stay
     completely silent — its scripted taps would forge a funnel out of nobody.
     Localhost stays silent too, so dev runs never reach the numbers. */
  if (!ID || demo || local) {
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
