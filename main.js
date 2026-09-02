document.getElementById('year').textContent = new Date().getFullYear();

// Mobile menu + overlay
const menuToggle = document.getElementById('menuToggle');
const mobilePanel = document.getElementById('mobilePanel');
const mobileOverlay = document.getElementById('mobileOverlay');
function closeMenu() {
  if (!mobilePanel.classList.contains('open')) return;
  mobilePanel.classList.remove('open');
  mobileOverlay.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Buka menu');
  setBurgerIcon(false);
  document.body.style.overflow = '';
}
function setBurgerIcon(open) {
  const burger = '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';
  const close = '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';
  menuToggle.innerHTML = open ? close : burger;
}
menuToggle.addEventListener('click', () => {
  const open = mobilePanel.classList.toggle('open');
  mobileOverlay.classList.toggle('open', open);
  menuToggle.setAttribute('aria-expanded', open);
  menuToggle.setAttribute('aria-label', open ? 'Tutup menu' : 'Buka menu');
  setBurgerIcon(open);
  document.body.style.overflow = open ? 'hidden' : '';
});
mobileOverlay.addEventListener('click', closeMenu);
mobilePanel.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));

// Reveal on scroll
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
}, { threshold: 0.12 });
revealEls.forEach(el => io.observe(el));

// Counter animation
const countEl = document.querySelector('[data-count]');
if (countEl) {
  const target = parseInt(countEl.getAttribute('data-count'), 10);
  let started = false;
  const countIO = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting && !started) {
        started = true;
        let cur = 0;
        const step = Math.max(1, Math.round(target / 60));
        const tick = () => {
          cur += step;
          if (cur >= target) cur = target;
          countEl.childNodes[0].nodeValue = cur.toLocaleString('id-ID');
          if (cur < target) requestAnimationFrame(tick);
        };
        tick();
      }
    });
  }, { threshold: 0.5 });
  countIO.observe(countEl);
}

// Form submit
const cekForm = document.getElementById('cekgratisForm');
if (cekForm) {
  cekForm.addEventListener('submit', function(e) {
    e.preventDefault();
    var nama = document.getElementById('sf-nama').value.trim();
    var wa = document.getElementById('sf-wa').value.trim();
    var merek = document.getElementById('sf-merek').value;
    var tipe = document.getElementById('sf-tipe').value.trim();
    var keluhan = document.getElementById('sf-keluhan').value.trim();
    var msg = "Halo Doxter Ponsel, saya mau cek gratis. Berikut info HP saya:\n\n"
      + "Nama: " + nama + "\nNo. HP: " + wa + "\nMerek: " + merek
      + "\nTipe: " + tipe + "\nKeluhan: " + keluhan;
    window.open("https://wa.me/62816693480?text=" + encodeURIComponent(msg), "_blank");
  });
}

// Booking form (kontak page)
const bookingForm = document.getElementById('bookingForm');
if (bookingForm) {
  bookingForm.addEventListener('submit', function(e) {
    e.preventDefault();
    var device = document.getElementById('bk-device').value;
    var kerusakan = document.getElementById('bk-kerusakan').value;
    var branch = document.getElementById('bk-branch').value;
    var nama = document.getElementById('bk-nama').value.trim();
    var tipe = document.getElementById('bk-tipe').value.trim();
    var keterangan = document.getElementById('bk-keterangan').value.trim();
    var msg = "Halo Doxter Ponsel, saya ingin cek harga & booking servis.\n\n"
      + "Nama: " + nama + "\nPerangkat: " + device
      + (tipe ? "\nTipe/Model: " + tipe : "")
      + "\nKerusakan: " + kerusakan
      + "\nCabang: " + branch
      + (keterangan ? "\nKeterangan: " + keterangan : "");
    window.open("https://wa.me/62816693480?text=" + encodeURIComponent(msg), "_blank");
  });
}
