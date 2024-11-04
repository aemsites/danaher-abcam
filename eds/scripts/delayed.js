// eslint-disable-next-line import/no-cycle
import { sampleRUM, loadScript } from './aem.js';

// Core Web Vitals RUM collection
sampleRUM('cwv');

// OneTrust Cookies Consent Notice start
if (!window.location.host.includes('.page') && !window.location.host.includes('.live') && !window.location.host.includes('localhost')) {
  loadScript('https://cdn.cookielaw.org/scripttemplates/otSDKStub.js', {
    type: 'text/javascript',
    charset: 'UTF-8',
    'data-domain-script': 'b5320615-0900-4f85-996b-7737cc0c62f2',
  });

  window.OptanonWrapper = () => {
  };
}
// OneTrust Cookies Consent Notice end

// Loading fathom script - start
const attrs = JSON.parse('{"data-site": "DGRGXILD"}');
loadScript('https://cdn.usefathom.com/script.js', attrs);
// Loading fathom script - end

// google tag manager -start
function loadGTM() {
  const scriptTag = document.createElement('script');
  scriptTag.innerHTML = `
          let gtmIdScript = (window.location.host === 'www.abcam.com') ? 'GTM-5J97L4S' : 'GTM-PDRV95V';
          // googleTagManager
          (function (w, d, s, l, i) {
              w[l] = w[l] || [];
              w[l].push({
                  'gtm.start':
                      new Date().getTime(), event: 'gtm.js'
              });
              var f = d.getElementsByTagName(s)[0],
                  j = d.createElement(s), dl = l != 'dataLayer' ? '&l=' + l : '';
              j.async = true;
              j.src =
                  'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
              f.parentNode.insertBefore(j, f);
          })(window, document, 'script', 'dataLayer', gtmIdScript);
          `;
  document.head.prepend(scriptTag);
  const noScriptTag = document.createElement('noscript');
  noScriptTag.innerHTML = `
    let gtmIdNiScript = (window.location.host === 'www.abcam.com') ? 'GTM-5J97L4S' : 'GTM-PDRV95V';
    <iframe src="https://www.googletagmanager.com/ns.html?id="+gtmIdNiScript
    height="0" width="0" style="display:none;visibility:hidden"></iframe>
    `;
  document.body.prepend(noScriptTag);
}
// google tag manager -end

// New relic Script -start
function loadrelicScript() {
  const scriptTag = document.createElement('script');
  scriptTag.type = 'text/javascript';
  scriptTag.src = (window.location.host === 'www.abcam.com') ? '/eds/scripts/newrelic.js' : '/eds/scripts/newrelicstage.js';
  document.head.prepend(scriptTag);
}
// New relic Script -end

if (
  !window.location.hostname.includes('localhost')
  && !window.location.hostname.includes('.hlx')
) {
  loadGTM();
  loadrelicScript();
}
