// ==========================================================================
// Baby Amy — interactions
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Loader ---------- */
  const loader = document.getElementById('loader');
  window.addEventListener('load', () => {
    setTimeout(() => loader.classList.add('hidden'), 1400);
  });
  // fallback in case 'load' already fired
  setTimeout(() => loader.classList.add('hidden'), 3000);

  /* ---------- Nav scroll state + mobile toggle ---------- */
  const nav = document.querySelector('nav');
  const navList = nav.querySelector('ul');

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });

  if (window.innerWidth <= 780 && !nav.querySelector('.nav-toggle')) {
    const toggle = document.createElement('button');
    toggle.className = 'nav-toggle';
    toggle.setAttribute('aria-label', 'Toggle menu');
    toggle.innerHTML = '<span></span><span></span><span></span>';
    nav.insertBefore(toggle, navList);
    toggle.addEventListener('click', () => navList.classList.toggle('open'));
    navList.querySelectorAll('a').forEach(a =>
      a.addEventListener('click', () => navList.classList.remove('open'))
    );
  }

  /* ---------- Floating gold stars ---------- */
  const starsContainer = document.getElementById('stars');
  const STAR_COUNT = 40;
  for (let i = 0; i < STAR_COUNT; i++) {
    const s = document.createElement('span');
    s.style.left = Math.random() * 100 + 'vw';
    s.style.top = Math.random() * 100 + 'vh';
    s.style.animationDelay = (Math.random() * 4).toFixed(2) + 's';
    starsContainer.appendChild(s);
  }

  /* ---------- Cursor glow ---------- */
  const glow = document.getElementById('cursor-glow');
  window.addEventListener('mousemove', (e) => {
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
  });

  /* ---------- Scroll reveal ---------- */
  const revealTargets = document.querySelectorAll(
    'section > h2, .glass, .love-card, .stamp, .cassette, #ball, #answer, .postcard, .photo'
  );
  revealTargets.forEach(el => el.classList.add('reveal'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealTargets.forEach(el => observer.observe(el));

  /* ---------- Magic 8 Ball ---------- */
  const ball = document.getElementById('ball');
  const answer = document.getElementById('answer');
  const answers = [
    'It is certain.',
    'Without a doubt.',
    'Yes, definitely.',
    'You may rely on it.',
    'As I see it, yes.',
    'Most likely.',
    'Outlook good.',
    'Signs point to yes.',
    'Reply hazy, try again.',
    'Ask again later.',
    'Better not tell you now.',
    'Cannot predict now.',
    'Concentrate and ask again.',
    "Don't count on it.",
    'My reply is no.',
    'My sources say no.',
    'Outlook not so good.',
    'Very doubtful.'
  ];

  if (ball && answer) {
    ball.addEventListener('click', () => {
      ball.classList.remove('shake');
      void ball.offsetWidth; // restart animation
      ball.classList.add('shake');
      answer.classList.remove('show');

      setTimeout(() => {
        answer.textContent = answers[Math.floor(Math.random() * answers.length)];
        answer.classList.add('show');
      }, 250);
    });
  }

});
