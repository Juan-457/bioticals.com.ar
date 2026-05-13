(function () {
  var config = window.BIOTICALS_TRACKING || {};
  var dataLayer = window.dataLayer = window.dataLayer || [];

  function gtag() {
    dataLayer.push(arguments);
  }

  function loadScript(src) {
    var script = document.createElement('script');
    script.async = true;
    script.src = src;
    document.head.appendChild(script);
  }

  function track(eventName, params) {
    var payload = Object.assign({
      event: eventName,
      event_category: 'landing_biotica_n2',
      page_path: window.location.pathname,
      page_title: document.title
    }, params || {});

    dataLayer.push(payload);

    if (typeof window.gtag === 'function') {
      window.gtag('event', eventName, payload);
    }
  }

  if (config.gtmId) {
    (function (w, d, s, l, i) {
      w[l] = w[l] || [];
      w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
      var f = d.getElementsByTagName(s)[0];
      var j = d.createElement(s);
      var dl = l !== 'dataLayer' ? '&l=' + l : '';
      j.async = true;
      j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
      f.parentNode.insertBefore(j, f);
    })(window, document, 'script', 'dataLayer', config.gtmId);
  }

  if (config.ga4Id) {
    loadScript('https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(config.ga4Id));
    window.gtag = function () {
      dataLayer.push(arguments);
    };
    window.gtag('js', new Date());
    window.gtag('config', config.ga4Id);
  }

  if (config.googleAdsId && typeof window.gtag === 'function') {
    window.gtag('config', config.googleAdsId);
  }

  var waNumber = config.whatsappNumber || '5491153358229';
  var waText = encodeURIComponent('Hola Biotica, quiero información comercial de BIOTICA N2.');
  var waUrl = 'https://wa.me/' + waNumber + '?text=' + waText;

  document.querySelectorAll('[data-track-click]').forEach(function (node) {
    node.addEventListener('click', function () {
      var label = node.getAttribute('data-track-click') || 'unknown_cta';

      if (label.indexOf('whatsapp') !== -1 || label.indexOf('wa') !== -1) {
        track('whatsapp_click', { event_label: label });
      } else {
        track('cta_click', { event_label: label });
      }
    });
  });

  track('page_view_biotica_n2', {
    event_label: 'landing_open'
  });

  // Argentina map tooltips
  var mapSvg = document.getElementById('argentina-svg');
  var mapTooltip = document.getElementById('map-tooltip');
  var mapWrap = mapSvg && mapSvg.parentElement;

  if (mapSvg && mapTooltip && mapWrap) {
    function showTooltip(dot, clientX, clientY) {
      var crop = dot.getAttribute('data-crop') || '';
      var campaign = dot.getAttribute('data-campaign') || '';
      var active = dot.getAttribute('data-active') === 'true';
      mapTooltip.innerHTML =
        '<strong>' + crop + '</strong>' +
        'Campaña ' + campaign + (active ? ' · <span style="color:var(--mint)">En curso</span>' : '');
      mapTooltip.hidden = false;
      var rect = mapWrap.getBoundingClientRect();
      var tx = clientX - rect.left;
      var ty = clientY - rect.top;
      mapTooltip.style.left = Math.max(0, Math.min(tx - mapTooltip.offsetWidth / 2, rect.width - mapTooltip.offsetWidth)) + 'px';
      mapTooltip.style.top = (ty - mapTooltip.offsetHeight - 14) + 'px';
    }

    mapSvg.querySelectorAll('.ar-dot').forEach(function (dot) {
      dot.addEventListener('mouseenter', function (e) { showTooltip(dot, e.clientX, e.clientY); });
      dot.addEventListener('mousemove', function (e) {
        if (!mapTooltip.hidden) showTooltip(dot, e.clientX, e.clientY);
      });
      dot.addEventListener('mouseleave', function () { mapTooltip.hidden = true; });
      dot.addEventListener('focus', function () {
        var r = dot.getBoundingClientRect();
        showTooltip(dot, r.left + r.width / 2, r.top);
      });
      dot.addEventListener('blur', function () { mapTooltip.hidden = true; });
    });
  }
})();
