/* ═══════════════════════════════════════════════════
   AFRICA TRUE SCALE — WOW Animation System (Upraded)
   Magnetic Vector Web · Click Sparkle Burst · CountUp
═══════════════════════════════════════════════════ */

const MouseState = {
  x: -9999,
  y: -9999,
  radius: 150
};

// Track mouse positions
window.addEventListener('mousemove', (e) => {
  MouseState.x = e.clientX;
  MouseState.y = e.clientY;
});

window.addEventListener('mouseleave', () => {
  MouseState.x = -9999;
  MouseState.y = -9999;
});

/* ─── INTERACTIVE CLICK RIPPLES & SPARKLES ─── */
window.addEventListener('click', (e) => {
  const container = document.getElementById('ripple-container');
  if (!container) return;

  // 1. Expand glowing ripple ring
  const ripple = document.createElement('div');
  ripple.className = 'click-ripple';
  ripple.style.left = `${e.clientX}px`;
  ripple.style.top = `${e.clientY}px`;
  container.appendChild(ripple);

  setTimeout(() => ripple.remove(), 1000);

  // 2. Trigger sparkle coordinates burst in canvas
  if (window.triggerSparkleBurst) {
    window.triggerSparkleBurst(e.clientX, e.clientY);
  }
});

/* ─── MAGNETIC PARTICLE BACKGROUND ENGINE ─── */
function initParticles() {
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  let particles = [];
  const count = 110;
  for (let i = 0; i < count; i++) {
    const isGold = Math.random() > 0.70;
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * (isGold ? 2.5 : 1.2) + 0.4,
      speedX: (Math.random() - 0.5) * 0.20,
      speedY: (Math.random() - 0.5) * 0.20,
      opacity: Math.random() * 0.6 + 0.1,
      color: isGold ? '#c9a84c' : '#ffffff',
      twinkleSpeed: Math.random() * 0.03 + 0.01,
      twinkleOffset: Math.random() * Math.PI * 2,
      isGold
    });
  }

  // Inject sparkle burst on click
  window.triggerSparkleBurst = function(clickX, clickY) {
    for (let i = 0; i < 15; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 3 + 1.5;
      particles.push({
        x: clickX,
        y: clickY,
        size: Math.random() * 2 + 1,
        speedX: Math.cos(angle) * speed,
        speedY: Math.sin(angle) * speed,
        opacity: 1.0,
        color: '#c9a84c',
        twinkleSpeed: 0.1,
        twinkleOffset: Math.random(),
        isGold: true,
        life: 60 // lives for 60 frames (1 second)
      });
    }
  };

  let frame = 0;
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    frame++;

    // Filter out dead click sparkles
    particles = particles.filter(p => {
      if (p.life !== undefined) {
        p.life--;
        p.opacity = p.life / 60;
        return p.life > 0;
      }
      return true;
    });

    particles.forEach((p, i) => {
      // Basic coordinates slide
      p.x += p.speedX;
      p.y += p.speedY;

      // Wrap borders (only for ambient stars, not click sparkles)
      if (p.life === undefined) {
        if (p.x < -10) p.x = canvas.width + 10;
        if (p.x > canvas.width + 10) p.x = -10;
        if (p.y < -10) p.y = canvas.height + 10;
        if (p.y > canvas.height + 10) p.y = -10;

        // Magnetism push
        if (MouseState.x !== -9999) {
          const dx = p.x - MouseState.x;
          const dy = p.y - MouseState.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MouseState.radius) {
            const force = (MouseState.radius - dist) / MouseState.radius;
            const angle = Math.atan2(dy, dx);
            p.x += Math.cos(angle) * force * 2.2;
            p.y += Math.sin(angle) * force * 2.2;
          }
        }
      }

      const twinkle = 0.5 + 0.5 * Math.sin(frame * p.twinkleSpeed + p.twinkleOffset);
      const alpha = p.opacity * (0.3 + 0.7 * twinkle);

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.globalAlpha = alpha;
      ctx.fillStyle = p.color;
      ctx.fill();

      // Vector connection web to mouse cursor
      if (MouseState.x !== -9999) {
        const dx = p.x - MouseState.x;
        const dy = p.y - MouseState.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 130) {
          ctx.beginPath();
          ctx.moveTo(MouseState.x, MouseState.y);
          ctx.lineTo(p.x, p.y);
          ctx.globalAlpha = (1 - dist / 130) * (p.isGold ? 0.35 : 0.08);
          ctx.strokeStyle = p.isGold ? '#c9a84c' : '#ffffff';
          ctx.lineWidth = 0.45;
          ctx.stroke();
        }
      }

      // Local connections between nearby gold ambient stars
      if (p.isGold && p.life === undefined) {
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          if (!q.isGold || q.life !== undefined) continue;
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.globalAlpha = (1 - dist / 110) * 0.12;
            ctx.strokeStyle = '#c9a84c';
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
    });

    ctx.globalAlpha = 1;
    requestAnimationFrame(animate);
  }
  animate();
}

/* ─── SMOOTH METRIC COUNT-UP ENGINE ─── */
function animateCountUp(element, targetValue, suffix, duration, decimals) {
  suffix = suffix || '';
  duration = duration || 1800;
  decimals = decimals !== undefined ? decimals : 0;
  const startTime = performance.now();

  function easeOutExpo(t) {
    return t >= 1 ? 1 : 1 - Math.pow(2, -10 * t);
  }

  function update(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = easeOutExpo(progress);
    const value = targetValue * eased;
    
    let formattedValue = '';
    if (decimals > 0) {
      formattedValue = value.toFixed(decimals);
    } else {
      formattedValue = Math.floor(value).toLocaleString('fr-FR');
    }
    
    element.textContent = formattedValue + suffix;

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      element.textContent = targetValue.toLocaleString('fr-FR', { minimumFractionDigits: decimals, maximumFractionDigits: decimals }) + suffix;
      element.classList.add('counting-done');
      setTimeout(() => element.classList.remove('counting-done'), 900);
    }
  }
  requestAnimationFrame(update);
}

function triggerCountUps(container) {
  const els = (container || document).querySelectorAll('.wow-number[data-count]');
  els.forEach(el => {
    if (el.dataset.triggered) return;
    el.dataset.triggered = 'true';
    const target = parseFloat(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    const decimals = el.dataset.decimals ? parseInt(el.dataset.decimals) : 0;
    setTimeout(() => {
      animateCountUp(el, target, suffix, 1800, decimals);
    }, Math.random() * 100);
  });
}

/* ─── SCROLL TRIGGER INTERSECTION OBSERVERS ─── */
function initWowObservers() {
  const headerObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('in-view');
      const sec = entry.target.closest('section') || document;
      triggerCountUps(sec);
      headerObs.unobserve(entry.target);
    });
  }, { threshold: 0.2 });
  document.querySelectorAll('.section-title').forEach(h => headerObs.observe(h));

  const visualizerObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      triggerCountUps(entry.target);
      visualizerObs.unobserve(entry.target);
    });
  }, { threshold: 0.1 });
  const infoPanel = document.getElementById('info-panel');
  if (infoPanel) visualizerObs.observe(infoPanel);

  const puzzleObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      triggerCountUps(entry.target);
      // Trigger staggered cards reveal
      document.querySelectorAll('.territory-card').forEach((card, i) => {
        setTimeout(() => card.classList.add('card-visible'), i * 50);
      });
      puzzleObs.unobserve(entry.target);
    });
  }, { threshold: 0.1 });
  const puzzleLeft = document.querySelector('.puzzle-left');
  if (puzzleLeft) puzzleObs.observe(puzzleLeft);
}

/* ─── INITIALIZE ALL WOW EFFECTS ─── */
function initAllWow() {
  initParticles();
  initWowObservers();
}

window.initAllWow = initAllWow;
