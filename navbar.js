/* ═══════════════════════════════════════
   navbar.js — Tek dosyadan navbar inject
   Kullanım: <script src="navbar.js"></script>
   Bu script'i <body>'den hemen sonra ekle.
═══════════════════════════════════════ */
document.currentScript.insertAdjacentHTML('afterend', `
<div class="header">
  <div class="container">
    <nav class="navbar">
      <a href="index.html" class="navbar-brand"><em>T</em>he <em>K</em>apital</a>
      <button class="nav-toggle" id="navToggle" aria-label="Toggle navigation">
        <span></span><span></span><span></span>
      </button>
      <ul class="nav-links" id="navLinks">
        <li><a href="index.html" data-page="index">Home</a></li>
        <li><a href="index.html#about" data-page="index">Mortgage Broking</a></li>
        <li><a href="index.html#portfolio" data-page="index">Financial Services</a></li>
        <li><a href="calculators.html" data-page="calculators">Calculators</a></li>
        <li><a href="index.html#contact-us" data-page="index">Contact Us</a></li>
      </ul>
    </nav>
  </div>
</div>
`);

/* ── Aktif sayfa linkini otomatik işaretle ── */
(function() {
  var page = location.pathname.split('/').pop().replace('.html','') || 'index';
  document.querySelectorAll('.nav-links a[data-page]').forEach(function(a) {
    if (a.getAttribute('data-page') === page) {
      a.classList.add('active');
    }
  });

  /* ── Mobil hamburger menü ── */
  document.getElementById('navToggle').addEventListener('click', function() {
    document.getElementById('navLinks').classList.toggle('open');
  });
})();
