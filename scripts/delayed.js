// eslint-disable-next-line import/no-cycle
import { sampleRUM } from './aem.js';

// Core Web Vitals RUM collection
sampleRUM('cwv');

// google tag manager -start
function loadGTM() {
  const scriptTag = document.createElement('script');
  const gtmId = (window.location.host === 'www.abcam.com') ? 'GTM-5J97L4S' : 'GTM-PDRV95V';
  scriptTag.innerHTML = `
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
          })(window, document, 'script', 'dataLayer', gtmId);
          `;
  document.head.prepend(scriptTag);
  const noScriptTag = document.createElement('noscript');
  noScriptTag.innerHTML = `
    <iframe src="https://www.googletagmanager.com/ns.html?id="+gtmId
    height="0" width="0" style="display:none;visibility:hidden"></iframe>
    `;
  document.body.prepend(noScriptTag);
}
// google tag manager -end

if (
  !window.location.hostname.includes('localhost')
      && !window.location.hostname.includes('.hlx')
) {
  loadGTM();
}
