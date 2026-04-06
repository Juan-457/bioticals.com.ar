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

  if (config.formEndpoint) {
    var leadForm = document.getElementById('lead-form');
    if (leadForm) {
      leadForm.setAttribute('action', config.formEndpoint);
      var nextField = leadForm.querySelector('input[name="_next"]');
      if (nextField) {
        nextField.value = window.location.origin + window.location.pathname.replace(/index\.html$/, '') + 'thank-you.html';
      }

      leadForm.addEventListener('submit', function () {
        var formData = new FormData(leadForm);
        var hasPhone = !!String(formData.get('telefono') || '').trim();
        var hasEmail = !!String(formData.get('email') || '').trim();

        track('lead_form_submit', {
          event_label: 'main_form',
          has_phone: hasPhone,
          has_email: hasEmail,
          cultivo: String(formData.get('cultivo') || '').trim() || 'unknown',
          zona: String(formData.get('zona') || '').trim() || 'unknown'
        });

        if (config.googleAdsId && config.adsLeadLabel && typeof window.gtag === 'function') {
          window.gtag('event', 'conversion', {
            send_to: config.googleAdsId + '/' + config.adsLeadLabel
          });
        }
      });
    }
  }

  document.querySelectorAll('[data-track-click]').forEach(function (node) {
    node.addEventListener('click', function () {
      var label = node.getAttribute('data-track-click') || 'unknown_cta';
      track('cta_click', {
        event_label: label
      });
    });
  });

  var wa = document.getElementById('whatsapp-direct');
  if (wa && config.whatsappNumber) {
    wa.href = 'https://wa.me/' + config.whatsappNumber + '?text=' + encodeURIComponent('Hola Bioticals, quiero información comercial de BIOTICA N2.');
    wa.addEventListener('click', function () {
      track('whatsapp_click', {
        event_label: 'direct_whatsapp'
      });
    });
  }

  track('page_view_biotica_n2', {
    event_label: 'landing_open'
  });
})();
