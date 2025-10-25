// basic interactions: mobile nav, language toggle, ticker, subscribe demo
document.addEventListener('DOMContentLoaded', function(){
  // fill year
  var yearEls = document.querySelectorAll('#year');
  yearEls.forEach(e => e && (e.textContent = new Date().getFullYear()));

  // mobile menu toggle (simple)
  var menuBtn = document.getElementById('menuToggle');
  var mainNav = document.getElementById('mainNav');
  if(menuBtn && mainNav){
    menuBtn.addEventListener('click', function(){
      mainNav.classList.toggle('open');
      if(mainNav.style.display === 'block') mainNav.style.display = '';
      else mainNav.style.display = 'block';
    });
  }

  // headlines ticker (simple automatic scroll)
  (function tickerInit(){
    var wrap = document.getElementById('tickerInner');
    if(!wrap) return;
    var distance = 0;
    function step(){
      distance += 1;
      if(distance > wrap.scrollWidth/2) distance = 0;
      wrap.style.transform = 'translateX(' + (-distance) + 'px)';
      requestAnimationFrame(step);
    }
    // clone items to create seamless loop
    wrap.innerHTML += wrap.innerHTML;
    wrap.style.display = 'inline-block';
    wrap.style.willChange = 'transform';
    requestAnimationFrame(step);
  })();

  // language toggle (EN/UR) — toggles elements with data-lang attributes
  var btnEn = document.getElementById('langEn');
  var btnUr = document.getElementById('langUr');

  function setLang(lang){
    // toggle buttons
    if(btnEn) btnEn.classList.toggle('active', lang === 'en');
    if(btnUr) btnUr.classList.toggle('active', lang === 'ur');

    // text nodes with data-lang-en / data-lang-ur
    document.querySelectorAll('[data-lang-en]').forEach(function(el){
      if(lang === 'en'){
        el.textContent = el.getAttribute('data-lang-en');
      } else {
        el.textContent = el.getAttribute('data-lang-ur') || el.getAttribute('data-lang-en');
      }
    });
    // toggle brand Urdu
    document.querySelectorAll('.brand-en').forEach(e => e.style.display = lang === 'en' ? '' : 'none');
    document.querySelectorAll('.brand-ur').forEach(e => e.style.display = lang === 'ur' ? '' : 'none');

    // direction
    document.documentElement.dir = (lang === 'ur') ? 'rtl' : 'ltr';
    // apply Urdu font if available
    if(lang === 'ur') document.body.style.fontFamily = "'Noto Nastaliq Urdu', 'Noto Nastaliq Urdu Web', serif";
    else document.body.style.fontFamily = "'Roboto', system-ui, -apple-system, 'Segoe UI', Arial";
  }

  if(btnEn) btnEn.addEventListener('click', function(){ setLang('en'); });
  if(btnUr) btnUr.addEventListener('click', function(){ setLang('ur'); });

  // default language
  setLang('en');

  // subscribe form demo
  var sub = document.getElementById('subscribeForm');
  if(sub){
    sub.addEventListener('submit', function(e){
      e.preventDefault();
      alert('Thanks for subscribing (demo).');
      sub.reset();
    });
  }

  // contact form demo
  var contactForm = document.getElementById('contactForm');
  if(contactForm){
    contactForm.addEventListener('submit', function(ev){
      ev.preventDefault();
      var formMsg = document.getElementById('formMsg');
      formMsg.style.color = 'green';
      formMsg.textContent = 'Thank you — message recorded (demo).';
      contactForm.reset();
    });
  }

  // inject header/footer into pages that use placeholders
  (function injectHeaderFooter(){
    var headerHtml = document.querySelector('.site-header') ? null : null;
    // If current document does not have full header, try to fetch header from index.html via fetch (works if served)
    if(document.getElementById('header-placeholder')){
      // simple static header markup (same as index) to inject
      var headerMarkup = `<!-- header injected -->` + document.querySelector ? '' : '';
      // For simplicity, replicate minimal header (you can copy full header manually)
      // (In local file mode, fetch may be blocked. Best practice: copy header block from index.html into other pages.)
    }
  })();
});
