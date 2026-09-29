// Mobile menu
const burger = document.querySelector('.burger');
const menu = document.getElementById('menu');
burger.addEventListener('click', () => {
  const open = menu.classList.toggle('open');
  burger.setAttribute('aria-expanded', open);
});
menu.addEventListener('click', e => { if (e.target.tagName === 'A') { menu.classList.remove('open'); burger.setAttribute('aria-expanded', false); } });

// Gallery + lightbox
const grid = document.getElementById('galleryGrid');
const lb = document.getElementById('lb');
const lbImg = lb.querySelector('img');
GALLERY.forEach(g => {
  const f = document.createElement('figure');
  f.className = 'ph';
  const img = document.createElement('img');
  img.src = g.src; img.alt = g.alt; img.loading = 'lazy';
  img.onerror = () => img.remove();
  f.appendChild(img);
  f.addEventListener('click', () => { if (img.isConnected) { lbImg.src = g.src; lbImg.alt = g.alt; lb.hidden = false; } });
  grid.appendChild(f);
});
lb.addEventListener('click', () => { lb.hidden = true; });
document.addEventListener('keydown', e => { if (e.key === 'Escape') lb.hidden = true; });

// Payment lookup
const form = document.getElementById('payForm');
const input = document.getElementById('appNo');
const err = document.getElementById('err');
const result = document.getElementById('result');
const inr = n => '\u20B9' + Number(n).toLocaleString('en-IN');
const fmtDate = s => new Date(s + 'T00:00:00').toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

form.addEventListener('submit', e => {
  e.preventDefault();
  const key = input.value.trim().toUpperCase();
  err.hidden = true; result.hidden = true;
  if (!key) { err.textContent = 'Please enter your application number.'; err.hidden = false; return; }
  const a = APPLICANTS[key];
  if (!a) { err.textContent = 'Application number not found. Check it and try again, or ask the caretaker.'; err.hidden = false; return; }
  document.getElementById('rName').textContent = a.name;
  document.getElementById('rDob').textContent = fmtDate(a.dob);
  document.getElementById('rRent').textContent = inr(a.rentPending);
  document.getElementById('qrAmt').textContent = inr(a.rentPending);
  const due = a.rentPending > 0;
  document.getElementById('qrBox').hidden = !due;
  document.getElementById('noDue').hidden = due;
  result.hidden = false;
  result.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
});
