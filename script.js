/* ==========================
   Count Up Timer
   (From Heartzday: Aug 21, 2025, 8:00 PM)
========================== */
const startDate = new Date("Aug 21, 2025 20:00:00").getTime();

function updateCountUp() {
  const now = Date.now();
  const elapsed = now - startDate;

  const days = Math.floor(elapsed / (1000 * 60 * 60 * 24));
  const hours = Math.floor((elapsed % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((elapsed % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((elapsed % (1000 * 60)) / 1000);

  document.getElementById("days").textContent = days;
  document.getElementById("hours").textContent = hours;
  document.getElementById("minutes").textContent = minutes;
  document.getElementById("seconds").textContent = seconds;
}

// Update every second
setInterval(updateCountUp, 1000);
updateCountUp();


/* ==========================
   Countdown Timer
   (To Birthday: Oct 10, 2025, 00:00 IST)
========================== */
function startCountdown(targetISO) {
  const dd = document.getElementById("dd");
  const hh = document.getElementById("hh");
  const mm = document.getElementById("mm");
  const ss = document.getElementById("ss");
  const target = new Date(targetISO).getTime();

  function tick() {
    const now = Date.now();
    const diff = Math.max(0, target - now);

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const m = Math.floor((diff / (1000 * 60)) % 60);
    const s = Math.floor((diff / 1000) % 60);

    dd.textContent = String(d).padStart(2, "0");
    hh.textContent = String(h).padStart(2, "0");
    mm.textContent = String(m).padStart(2, "0");
    ss.textContent = String(s).padStart(2, "0");
  }

  tick();
  setInterval(tick, 1000);
}

// Start countdown (IST time zone)
startCountdown("2025-10-10T00:00:00+05:30");
