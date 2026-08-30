(function(){
  var toggle = document.getElementById('theme-toggle-btn');
  if(toggle){
    toggle.addEventListener('click', function(){
      var isLight = document.documentElement.getAttribute('data-theme') === 'light';
      var next = isLight ? 'dark' : 'light';
      if(next === 'dark'){
        document.documentElement.removeAttribute('data-theme');
      } else {
        document.documentElement.setAttribute('data-theme', 'light');
      }
      localStorage.setItem('cetinet-theme', next);
    });
  }

  var heroSlides = document.querySelectorAll('.hero-bg-slide');
  if(heroSlides.length > 1 && !window.matchMedia('(prefers-reduced-motion: reduce)').matches){
    var heroIndex = 0;
    setInterval(function(){
      heroSlides[heroIndex].classList.remove('is-active');
      heroIndex = (heroIndex + 1) % heroSlides.length;
      heroSlides[heroIndex].classList.add('is-active');
    }, 6000);
  }

  var revealSelectors = '.card, .info-cell, .step, .official-item, .coverage-visual, .pdf-frame-wrap, .form-card, .status-panel, .faq-item, .contact-box';
  var revealEls = document.querySelectorAll(revealSelectors);
  revealEls.forEach(function(el){ el.classList.add('reveal'); });

  if('IntersectionObserver' in window){
    var observer = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function(el){ observer.observe(el); });
  } else {
    revealEls.forEach(function(el){ el.classList.add('is-visible'); });
  }

  var CETINET_WHATSAPP = '573183908297';

  function buildWhatsAppMessage(title, pairs){
    var lines = [title, ''];
    pairs.forEach(function(p){
      if(p[1]) lines.push(p[0] + ': ' + p[1]);
    });
    return lines.join('\n');
  }

  function fieldValue(form, selector){
    var el = form.querySelector(selector);
    return el ? el.value.trim() : '';
  }

  function wireWhatsAppForm(formId, title, fields){
    var form = document.getElementById(formId);
    if(!form) return;
    form.addEventListener('submit', function(e){
      e.preventDefault();
      if(!form.checkValidity()){ form.reportValidity(); return; }
      var pairs = fields.map(function(f){ return [f[0], fieldValue(form, f[1])]; });
      var msg = buildWhatsAppMessage(title, pairs);
      window.open('https://wa.me/' + CETINET_WHATSAPP + '?text=' + encodeURIComponent(msg), '_blank', 'noopener');
      var status = form.querySelector('.form-status');
      if(status){
        status.textContent = 'Te llevamos a WhatsApp para enviar tu mensaje. Si no se abrió, escríbenos directo al +57 318 390 8297.';
        status.style.display = 'block';
      }
      form.reset();
    });
  }

  wireWhatsAppForm('contacto-form', 'Nuevo mensaje desde cetinetsas.com — Contacto', [
    ['Nombre', '#c-nombre'],
    ['Correo', '#c-correo'],
    ['Teléfono', '#c-telefono'],
    ['Dirección/sector', '#c-direccion'],
    ['Mensaje', '#c-mensaje']
  ]);

  wireWhatsAppForm('hero-coverage-form', 'Consulta de cobertura desde cetinetsas.com', [
    ['Dirección/sector', '#hero-address']
  ]);

  wireWhatsAppForm('pqrs-form', 'Nueva PQRS desde cetinetsas.com', [
    ['Nombre', '#nombre'],
    ['Documento', '#documento'],
    ['Correo', '#correo'],
    ['Teléfono', '#telefono'],
    ['Tipo de solicitud', '#tipo'],
    ['Detalle', '#detalle']
  ]);
})();
