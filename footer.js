/* ═══════════════════════════════════════
   footer.js — Tek dosyadan footer inject
   Kullanım: <script src="footer.js"></script>
   Bu script'i sayfanın en altına, </body>'den önce ekle.
═══════════════════════════════════════ */
document.currentScript.insertAdjacentHTML('beforebegin', `
<footer>
  <div class="container">
    <div class="footer-grid">
      <div class="footer-col">
        <a href="index.html" class="footer-logo"><em>T</em>he <em style="color:var(--gold)">K</em>apital</a>
        <p>Sydney's specialist mortgage broking and financial services firm. We help Australians navigate complex lending landscapes to secure the best outcomes.</p>
      </div>
      <div class="footer-col">
        <h4>Services</h4>
        <ul>
          <li><a href="index.html#about">Residential Loans</a></li>
          <li><a href="index.html#about">Investment Property</a></li>
          <li><a href="index.html#about">Refinancing</a></li>
          <li><a href="index.html#about">Commercial Lending</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Calculators</h4>
        <ul>
          <li><a href="calculators.html">Mortgage Repayment</a></li>
          <li><a href="calculators.html">Stamp Duty NSW</a></li>
          <li><a href="calculators.html">Borrowing Capacity</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Location</h4>
        <p>Sydney<br>New South Wales, Australia</p>
        <div class="social-links" style="margin-top:16px;">
          <a href="#" aria-label="Twitter">𝕏</a>
          <a href="#" aria-label="LinkedIn">in</a>
          <a href="#" aria-label="Instagram">◎</a>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <p>Copyright &copy; 2026 The Kapital</p>
      <p style="font-style:italic; font-size:10px; opacity:0.4;">All consultations are strictly confidential.</p>
    </div>
  </div>
</footer>
`);
