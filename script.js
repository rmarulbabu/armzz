// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
if (navToggle) {
  navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
}

// Countdown timer
function startCountdown(targetISO) {
  const dd = document.getElementById('dd');
  const hh = document.getElementById('hh');
  const mm = document.getElementById('mm');
  const ss = document.getElementById('ss');
  const target = new Date(targetISO).getTime();

  function tick() {
    const now = Date.now();
    const diff = Math.max(0, target - now);
    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const m = Math.floor((diff / (1000 * 60)) % 60);
    const s = Math.floor((diff / 1000) % 60);
    dd.textContent = String(d).padStart(2, '0');
    hh.textContent = String(h).padStart(2, '0');
    mm.textContent = String(m).padStart(2, '0');
    ss.textContent = String(s).padStart(2, '0');
  }
  tick();
  setInterval(tick, 1000);
}

// Set your event date and time (IST) below
startCountdown('2025-08-20T18:00:00+05:30');

// RSVP form submission
function submitRSVP(e) {
  e.preventDefault();
  const form = e.target;
  const data = new FormData(form);
  const name = data.get('name');
  const guests = data.get('guests');
  const phone = data.get('phone');
  const message = data.get('message') || '';

  const subject = encodeURIComponent('RSVP for Puberty Ceremony');
  const body = encodeURIComponent(`Name: ${name}
Guests: ${guests}
Phone: ${phone}
Message: ${message}`);

  window.location.href = `mailto:family@example.com?subject=${subject}&body=${body}`;
  return false;
}