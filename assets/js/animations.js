/*==============================================================
  ANIMATION INTEGRATIONS
  Floating Keywords · GSAP · Three.js · Lottie · Anime.js
==============================================================*/

/*--------------------------------------------------------------
  0. FLOATING KEYWORDS — Drifting skill tags across the page
--------------------------------------------------------------*/
(function() {
  var container = document.getElementById('floating-keywords');
  if (!container) return;

  var keywords = [
    // Programming & Automation
    { t: 'Python', c: 'lang' }, { t: 'pandas', c: 'lang' }, { t: 'NumPy', c: 'lang' },
    { t: 'scikit-learn', c: 'lang' }, { t: 'Automation', c: 'lang' }, { t: 'Log Parsing', c: 'lang' },
    { t: 'Health Checks', c: 'lang' }, { t: 'Bash', c: 'lang' }, { t: 'Shell Scripting', c: 'lang' },
    { t: 'CRON', c: 'lang' }, { t: 'REST API', c: 'lang' }, { t: 'R', c: 'lang' },
    { t: 'ggplot2', c: 'lang' }, { t: 'Shiny', c: 'lang' },
    // Tools & Platforms
    { t: 'ServiceNow', c: 'tool' }, { t: 'Remedy', c: 'tool' }, { t: 'Siebel', c: 'tool' },
    { t: 'Active Directory', c: 'tool' }, { t: 'Confluence', c: 'tool' }, { t: 'SharePoint', c: 'tool' },
    { t: 'Microsoft Teams', c: 'tool' },
    // Databases & Reporting
    { t: 'SQL Server', c: 'db' }, { t: 'PostgreSQL', c: 'db' }, { t: 'Oracle', c: 'db' },
    { t: 'MySQL', c: 'db' }, { t: 'Snowflake', c: 'db' }, { t: 'Excel', c: 'db' },
    { t: 'Power BI', c: 'db' }, { t: 'Tableau', c: 'db' },
    // OS & Version Control
    { t: 'Linux', c: 'sys' }, { t: 'Windows', c: 'sys' }, { t: 'Git', c: 'sys' },
    // Web Development
    { t: 'HTML', c: 'web' }, { t: 'CSS', c: 'web' }, { t: 'JavaScript', c: 'web' },
    { t: 'Responsive Design', c: 'web' }, { t: 'React', c: 'web' }, { t: 'Bootstrap', c: 'web' },
    // Support & Systems
    { t: 'L2 Support', c: 'ops' }, { t: 'L3 Support', c: 'ops' },
    { t: 'Incident Management', c: 'ops' }, { t: 'Problem Management', c: 'ops' },
    { t: 'Change Management', c: 'ops' }, { t: 'Release Support', c: 'ops' },
    { t: 'SLA Management', c: 'ops' }, { t: 'MTTR Reduction', c: 'ops' },
    { t: 'RCA', c: 'ops' }, { t: 'Knowledge Base', c: 'ops' },
    { t: 'Monitoring', c: 'ops' }, { t: 'Production Support', c: 'ops' },
    { t: 'On-Call Support', c: 'ops' }, { t: 'Escalation Handling', c: 'ops' },
    { t: '24x7 Operations', c: 'ops' }, { t: 'ITIL', c: 'ops' },
    // Extra
    { t: 'Docker', c: 'sys' }, { t: 'Kubernetes', c: 'sys' },
    { t: 'AWS', c: 'sys' }, { t: 'Azure', c: 'sys' },
    { t: 'PySpark', c: 'lang' }, { t: 'Matplotlib', c: 'lang' },
    { t: 'VBA', c: 'lang' }, { t: 'Apache Tomcat', c: 'sys' },
    { t: 'Data Pipelines', c: 'db' }, { t: 'ETL', c: 'db' },
    { t: 'GDPR', c: 'ops' }, { t: 'BizTalk', c: 'tool' }
  ];

  // How many to show at once (scales with screen)
  var pageH = document.documentElement.scrollHeight;
  var screenH = window.innerHeight;
  var totalSlots = Math.min(Math.round((pageH / screenH) * 12), 80);

  var els = [];
  var mouse = { x: -9999, y: -9999 };

  // Track mouse position (viewport coords)
  document.addEventListener('mousemove', function(e) {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  function randomBetween(a, b) { return a + Math.random() * (b - a); }

  function createFloater(index) {
    var kw = keywords[index % keywords.length];
    var el = document.createElement('span');
    el.className = 'float-keyword';
    el.setAttribute('data-cat', kw.c);
    el.textContent = kw.t;
    container.appendChild(el);

    // Distribute across full page height
    var startY = randomBetween(0, pageH);
    var startX = randomBetween(2, 96); // % from left

    // Movement params
    var speedX = randomBetween(-0.15, 0.15);
    var speedY = randomBetween(-0.08, -0.25); // drift upward
    var wobbleAmp = randomBetween(15, 40);
    var wobbleSpeed = randomBetween(0.0008, 0.002);
    var phase = Math.random() * Math.PI * 2;
    var size = randomBetween(10, 14);

    el.style.fontSize = size + 'px';
    el.style.opacity = '0';

    return {
      el: el,
      x: startX,
      y: startY,
      baseX: startX,
      speedX: speedX,
      speedY: speedY,
      wobbleAmp: wobbleAmp,
      wobbleSpeed: wobbleSpeed,
      phase: phase,
      born: Date.now() + Math.random() * 3000 // stagger start
    };
  }

  // Create all floaters
  for (var i = 0; i < totalSlots; i++) {
    els.push(createFloater(Math.floor(Math.random() * keywords.length)));
  }

  // Shuffle keyword order so no grouping
  els.sort(function() { return Math.random() - 0.5; });

  var GLOW_DIST = 200; // px from mouse to glow

  function animate() {
    var now = Date.now();
    var scrollY = window.scrollY || window.pageYOffset;
    var vpTop = scrollY;
    var vpBottom = scrollY + window.innerHeight;

    for (var i = 0; i < els.length; i++) {
      var f = els[i];
      if (now < f.born) continue;

      var elapsed = (now - f.born) * 0.001;

      // Update position
      f.y += f.speedY;
      var wobble = Math.sin(elapsed * f.wobbleSpeed * 1000 + f.phase) * f.wobbleAmp;
      var currentX = f.baseX + wobble * 0.1; // subtle horizontal wobble

      // Wrap vertically — if drifted off top, reset to bottom
      if (f.y < -50) {
        f.y = pageH + 50;
        f.baseX = randomBetween(2, 96);
      }

      // Only render if near viewport (performance)
      var inView = f.y > vpTop - 200 && f.y < vpBottom + 200;

      if (inView) {
        f.el.style.left = currentX + '%';
        f.el.style.top = f.y + 'px';
        f.el.style.opacity = '1';
        f.el.style.transform = 'translateY(' + (Math.sin(elapsed * 0.5 + f.phase) * 8) + 'px) rotate(' + (Math.sin(elapsed * 0.3 + f.phase) * 3) + 'deg)';

        // Mouse glow proximity (viewport coords)
        var rect = f.el.getBoundingClientRect();
        var cx = rect.left + rect.width / 2;
        var cy = rect.top + rect.height / 2;
        var dx = mouse.x - cx;
        var dy = mouse.y - cy;
        var dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < GLOW_DIST) {
          f.el.classList.add('glow');
        } else {
          f.el.classList.remove('glow');
        }
      } else {
        f.el.style.opacity = '0';
      }
    }

    requestAnimationFrame(animate);
  }

  // Start after page settles
  setTimeout(animate, 500);

  // Recalculate on resize
  window.addEventListener('resize', function() {
    pageH = document.documentElement.scrollHeight;
  });
})();

/*--------------------------------------------------------------
  1. GSAP + ScrollTrigger — Scroll-driven animations
--------------------------------------------------------------*/
(function() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger);

  // ── Section titles slide in ──
  gsap.utils.toArray('.section-title h2').forEach(function(el) {
    gsap.from(el, {
      scrollTrigger: { trigger: el, start: 'top 85%', once: true },
      y: 40, opacity: 0, duration: 0.8, ease: 'power3.out'
    });
  });

  gsap.utils.toArray('.section-title p').forEach(function(el) {
    gsap.from(el, {
      scrollTrigger: { trigger: el, start: 'top 85%', once: true },
      y: 30, opacity: 0, duration: 0.7, delay: 0.15, ease: 'power3.out'
    });
  });

  // ── Skill cards stagger in ──
  ScrollTrigger.batch('.skill-card', {
    onEnter: function(batch) {
      gsap.from(batch, {
        y: 60, opacity: 0, duration: 0.7, stagger: 0.12,
        ease: 'power3.out', clearProps: 'all'
      });
    },
    start: 'top 88%',
    once: true
  });

  // ── Stat cards scale up ──
  ScrollTrigger.batch('.stat-card', {
    onEnter: function(batch) {
      gsap.from(batch, {
        scale: 0.8, opacity: 0, duration: 0.6, stagger: 0.1,
        ease: 'back.out(1.4)', clearProps: 'all'
      });
    },
    start: 'top 88%',
    once: true
  });

  // ── Project cards slide up ──
  ScrollTrigger.batch('.project-card', {
    onEnter: function(batch) {
      gsap.from(batch, {
        y: 80, opacity: 0, duration: 0.8, stagger: 0.15,
        ease: 'power3.out', clearProps: 'all'
      });
    },
    start: 'top 90%',
    once: true
  });

  // ── Resume items slide from left ──
  ScrollTrigger.batch('.resume-item', {
    onEnter: function(batch) {
      gsap.from(batch, {
        x: -40, opacity: 0, duration: 0.6, stagger: 0.08,
        ease: 'power2.out', clearProps: 'all'
      });
    },
    start: 'top 90%',
    once: true
  });

  // ── Contact cards pop in ──
  ScrollTrigger.batch('.contact-card', {
    onEnter: function(batch) {
      gsap.from(batch, {
        y: 40, scale: 0.9, opacity: 0, duration: 0.6, stagger: 0.1,
        ease: 'back.out(1.2)', clearProps: 'all'
      });
    },
    start: 'top 88%',
    once: true
  });

  // ── Journey images parallax float ──
  gsap.utils.toArray('.journey-item img').forEach(function(img) {
    gsap.to(img, {
      scrollTrigger: {
        trigger: img,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1
      },
      y: -30,
      ease: 'none'
    });
  });

  // ── About profile image entrance ──
  gsap.from('.about-profile-img', {
    scrollTrigger: { trigger: '.about-profile-img', start: 'top 80%', once: true },
    scale: 0.6, opacity: 0, rotation: -10, duration: 1,
    ease: 'elastic.out(1, 0.5)'
  });

  // ── Smooth parallax on scroll progress bar ──
  gsap.to('#scroll-progress', {
    width: '100%',
    ease: 'none',
    scrollTrigger: {
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.3
    }
  });

  // ── Magnetic hover on CTA buttons ──
  if (!window.matchMedia('(hover: none)').matches) {
    document.querySelectorAll('.cta-pill').forEach(function(btn) {
      btn.addEventListener('mousemove', function(e) {
        var rect = btn.getBoundingClientRect();
        var x = e.clientX - rect.left - rect.width / 2;
        var y = e.clientY - rect.top - rect.height / 2;
        gsap.to(btn, { x: x * 0.15, y: y * 0.15, duration: 0.3, ease: 'power2.out' });
      });
      btn.addEventListener('mouseleave', function() {
        gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.4)' });
      });
    });
  }
})();


/*--------------------------------------------------------------
  2. THREE.JS — Wireframe Globe in Hero
--------------------------------------------------------------*/
(function() {
  if (typeof THREE === 'undefined') return;
  var container = document.getElementById('three-globe');
  if (!container) return;

  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
  camera.position.z = 3.5;

  var renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(container.offsetWidth, container.offsetHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(renderer.domElement);

  // Wireframe sphere
  var geometry = new THREE.IcosahedronGeometry(1.3, 3);
  var material = new THREE.MeshBasicMaterial({
    color: 0x6366f1,
    wireframe: true,
    transparent: true,
    opacity: 0.35
  });
  var globe = new THREE.Mesh(geometry, material);
  scene.add(globe);

  // Outer ring
  var ringGeo = new THREE.TorusGeometry(1.7, 0.008, 16, 100);
  var ringMat = new THREE.MeshBasicMaterial({
    color: 0x8b5cf6,
    transparent: true,
    opacity: 0.3
  });
  var ring = new THREE.Mesh(ringGeo, ringMat);
  ring.rotation.x = Math.PI / 2.2;
  scene.add(ring);

  // Dots on sphere surface
  var dotGeo = new THREE.BufferGeometry();
  var dotPositions = [];
  for (var i = 0; i < 200; i++) {
    var phi = Math.acos(2 * Math.random() - 1);
    var theta = 2 * Math.PI * Math.random();
    var r = 1.32;
    dotPositions.push(
      r * Math.sin(phi) * Math.cos(theta),
      r * Math.sin(phi) * Math.sin(theta),
      r * Math.cos(phi)
    );
  }
  dotGeo.setAttribute('position', new THREE.Float32BufferAttribute(dotPositions, 3));
  var dotMat = new THREE.PointsMaterial({ color: 0xf59e0b, size: 0.025, transparent: true, opacity: 0.6 });
  var dots = new THREE.Points(dotGeo, dotMat);
  scene.add(dots);

  // Mouse tilt
  var mouseX = 0, mouseY = 0;
  document.addEventListener('mousemove', function(e) {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
  });

  function animate() {
    requestAnimationFrame(animate);
    globe.rotation.y += 0.003;
    globe.rotation.x += 0.001;
    dots.rotation.y += 0.003;
    dots.rotation.x += 0.001;
    ring.rotation.z += 0.002;

    // Gentle mouse tilt
    globe.rotation.x += (mouseY * 0.3 - globe.rotation.x) * 0.02;
    globe.rotation.y += (mouseX * 0.3 - globe.rotation.y) * 0.02;

    renderer.render(scene, camera);
  }
  animate();

  window.addEventListener('resize', function() {
    renderer.setSize(container.offsetWidth, container.offsetHeight);
  });
})();


/*--------------------------------------------------------------
  3. ANIME.JS — Staggered tag animations + SVG path drawing
--------------------------------------------------------------*/
(function() {
  if (typeof anime === 'undefined') return;

  // ── Skill tags wave animation on hover ──
  document.querySelectorAll('.skill-card').forEach(function(card) {
    card.addEventListener('mouseenter', function() {
      var tags = card.querySelectorAll('.tag');
      if (!tags.length) return;
      anime({
        targets: tags,
        scale: [1, 1.08, 1],
        duration: 400,
        delay: anime.stagger(50),
        easing: 'easeOutElastic(1, 0.6)'
      });
    });
  });

  // ── Social icons bounce on hover ──
  document.querySelectorAll('.social-link').forEach(function(link) {
    link.addEventListener('mouseenter', function() {
      anime({
        targets: link,
        scale: [1, 1.2, 1],
        rotate: [0, 8, -8, 0],
        duration: 500,
        easing: 'spring(1, 80, 10, 0)'
      });
    });
  });

  // ── Nav links stagger entrance ──
  anime({
    targets: '.navmenu li',
    opacity: [0, 1],
    translateY: [-10, 0],
    delay: anime.stagger(60, { start: 300 }),
    duration: 500,
    easing: 'easeOutCubic'
  });

  // ── Hero chips spring animation (on top of CSS animation) ──
  setTimeout(function() {
    anime({
      targets: '.hero-chip',
      scale: [0.8, 1],
      opacity: [0, 1],
      delay: anime.stagger(80, { start: 0 }),
      duration: 600,
      easing: 'spring(1, 80, 12, 0)'
    });
  }, 2000);

  // ── Journey arrow SVG draw ──
  var freedomPath = document.getElementById('freedom-path');
  if (freedomPath) {
    var pathLength = freedomPath.getTotalLength();
    freedomPath.style.strokeDasharray = pathLength;
    freedomPath.style.strokeDashoffset = pathLength;

    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          anime({
            targets: freedomPath,
            strokeDashoffset: [pathLength, 0],
            duration: 2000,
            easing: 'easeInOutQuart'
          });
          observer.unobserve(freedomPath);
        }
      });
    }, { threshold: 0.3 });
    observer.observe(freedomPath);
  }
})();


/*--------------------------------------------------------------
  4. LOTTIE — Animated icons (ready to use)
--------------------------------------------------------------*/
(function() {
  if (typeof lottie === 'undefined') return;

  // Lottie is loaded and ready. To add animated icons, use:
  //
  // HTML: <div class="lottie-icon" data-lottie="URL_TO_JSON"></div>
  //
  // This auto-initializer will load any lottie-icon elements:
  document.querySelectorAll('.lottie-icon').forEach(function(el) {
    var url = el.dataset.lottie;
    if (!url) return;
    var anim = lottie.loadAnimation({
      container: el,
      renderer: 'svg',
      loop: true,
      autoplay: false,
      path: url
    });

    // Play on scroll into view
    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          anim.play();
        } else {
          anim.pause();
        }
      });
    }, { threshold: 0.2 });
    observer.observe(el);

    // Play on hover
    el.addEventListener('mouseenter', function() { anim.play(); });
    el.addEventListener('mouseleave', function() { anim.pause(); });
  });
})();
