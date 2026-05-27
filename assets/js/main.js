
(function() {
  "use strict";

  

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  mobileNavToggleBtn.addEventListener('click', mobileNavToogle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    // Remove on load OR after 1.2s max — whichever comes first
    const removePreloader = () => preloader.remove();
    window.addEventListener('load', removePreloader);
    setTimeout(removePreloader, 1200);
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  // heromenu
  /**
 * Init typed.js - New
 */
  const selectTyped = document.querySelector('.typed');
  if (selectTyped) {
    let typed_strings = selectTyped.getAttribute('data-typed-items');
    typed_strings = typed_strings.split(',');
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 50,
      backSpeed: 30,
      backDelay: 1000
    });
  }
 

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);


// form
// Simulate success or error condition
const isSuccess = true; // Change this to false to simulate an error

// setTimeout(() => {
//   loading.style.display = 'none'; // Hide loading

//   if (isSuccess) {
//     successMessage.style.display = 'block'; // Show success message
//   } else {
//     errorMessage.style.display = 'block'; // Show error message
//   }
//   form.reset(); // Reset the form fields
// }, 2000);


})();


// cursor glow tracker
(function() {
  const glow = document.getElementById('cursor-glow');
  if (!glow) return;
  document.addEventListener('mousemove', function(e) {
    glow.style.left = e.clientX + 'px';
    glow.style.top  = e.clientY + 'px';
  });
  document.addEventListener('mouseleave', function() {
    glow.style.left = '-999px';
    glow.style.top  = '-999px';
  });
})();

//down:
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var targetId = link.getAttribute('href');
      var targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
});

//journey:
window.addEventListener('scroll', function() {
    if (window.innerWidth < 992) return;

    const section = document.querySelector('#journey');
    const path = document.querySelector('#freedom-path');
    
    if (!section || !path) return;

    const pathLength = path.getTotalLength();
    const rect = section.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // Trigger animation as you scroll through the photos
    let totalProgress = (windowHeight - rect.top) / (windowHeight + rect.height);
    
    // Triple Speed Multiplier
    let drawProgress = totalProgress * 3.0; 
    drawProgress = Math.min(Math.max(drawProgress, 0), 1);

    path.style.strokeDasharray = pathLength;
    path.style.strokeDashoffset = pathLength - (pathLength * drawProgress);
});


// form
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevents the Basin redirect page

    const form = this;
    const btn = document.getElementById('submit-btn');
    const statusMsg = document.querySelector('.sent-message');
    
    // UI Feedback
    btn.innerHTML = "Sending...";
    btn.disabled = true;

    fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
    })
    .then(response => {
        if (response.ok) {
            // Success: Reset and show message
            if (statusMsg) {
                statusMsg.style.display = 'block';
                statusMsg.innerHTML = "Success! I'll get back to you shortly.";
            }
            form.reset();
            // Optional: Hide success message after 5 seconds
            setTimeout(() => { if(statusMsg) statusMsg.style.display = 'none'; }, 5000);
        } else {
            alert("Submission failed. Please try again.");
        }
    })
    .catch(error => {
        console.error("Submission error:", error);
        alert("An error occurred. Check your connection.");
    })
    .finally(() => {
        btn.innerHTML = 'Send Message <i class="bi bi-send-fill ms-2"></i>';
        btn.disabled = false;
    });

});

/*==============================================================
  ANIMATED COUNTERS — supports decimals + comma formatting
==============================================================*/
(function() {
  function formatNumber(val, decimals, useComma) {
    if (decimals > 0) {
      var s = val.toFixed(decimals);
      return useComma ? s.replace(/\B(?=(\d{3})+(?!\d))/g, ',') : s;
    }
    var n = Math.round(val);
    return useComma ? n.toLocaleString('en-US') : '' + n;
  }

  function runCounter(el) {
    var target = parseFloat(el.dataset.target);
    var decimals = parseInt(el.dataset.decimals) || 0;
    var useComma = el.dataset.format === 'comma';
    var duration = 2000;
    var startTime = null;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);
      // Ease-out cubic for satisfying deceleration
      var eased = 1 - Math.pow(1 - progress, 3);
      var current = eased * target;
      el.textContent = formatNumber(current, decimals, useComma);
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = formatNumber(target, decimals, useComma);
      }
    }
    requestAnimationFrame(step);
  }

  function checkCounters() {
    document.querySelectorAll('.counter').forEach(function(el) {
      if (el.dataset.started) return;
      var rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.92) {
        el.dataset.started = '1';
        runCounter(el);
      }
    });
  }

  window.addEventListener('scroll', checkCounters, { passive: true });
  window.addEventListener('load', function() {
    [300, 800, 1500].forEach(function(ms) { setTimeout(checkCounters, ms); });
  });
})();

/*==============================================================
  FULL-PAGE PARTICLE NETWORK ANIMATION
==============================================================*/
(function() {
  var canvas = document.getElementById('particles-bg');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');

  var particles = [];
  var mouse = { x: -9999, y: -9999 };
  var CONNECT_DIST = 180;
  var MOUSE_DIST = 220;
  var BASE_COUNT = 120;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  document.addEventListener('mousemove', function(e) {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });
  document.addEventListener('mouseleave', function() {
    mouse.x = -9999;
    mouse.y = -9999;
  });

  // Particle count scales with screen area
  function getCount() {
    var area = window.innerWidth * window.innerHeight;
    return Math.min(Math.max(Math.round(area / 8000), 60), 200);
  }

  function createParticle() {
    // 70% blue-ish, 20% amber, 10% white
    var roll = Math.random();
    var r, g, b;
    if (roll < 0.5) {
      // indigo/blue — matches new accent
      r = 80 + Math.random() * 40;
      g = 90 + Math.random() * 40;
      b = 220 + Math.random() * 35;
    } else if (roll < 0.75) {
      // violet/purple
      r = 130 + Math.random() * 30;
      g = 80 + Math.random() * 30;
      b = 230 + Math.random() * 25;
    } else if (roll < 0.9) {
      // amber
      r = 230 + Math.random() * 25;
      g = 160 + Math.random() * 40;
      b = 20 + Math.random() * 30;
    } else {
      // white
      r = g = b = 210 + Math.random() * 45;
    }
    return {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      radius: 1.5 + Math.random() * 2,
      color: 'rgba(' + Math.round(r) + ',' + Math.round(g) + ',' + Math.round(b) + ',',
      baseAlpha: 0.5 + Math.random() * 0.4
    };
  }

  function init() {
    particles = [];
    var count = getCount();
    for (var i = 0; i < count; i++) {
      particles.push(createParticle());
    }
  }
  init();
  window.addEventListener('resize', function() {
    var target = getCount();
    while (particles.length < target) particles.push(createParticle());
    while (particles.length > target) particles.pop();
  });

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var w = canvas.width, h = canvas.height;
    var len = particles.length;

    // Update positions
    for (var i = 0; i < len; i++) {
      var p = particles[i];
      p.x += p.vx;
      p.y += p.vy;

      // Wrap around edges
      if (p.x < -10) p.x = w + 10;
      if (p.x > w + 10) p.x = -10;
      if (p.y < -10) p.y = h + 10;
      if (p.y > h + 10) p.y = -10;
    }

    // Draw connections between nearby particles
    ctx.lineWidth = 0.8;
    for (var i = 0; i < len; i++) {
      var a = particles[i];
      for (var j = i + 1; j < len; j++) {
        var b = particles[j];
        var dx = a.x - b.x;
        var dy = a.y - b.y;
        var dist = dx * dx + dy * dy;
        if (dist < CONNECT_DIST * CONNECT_DIST) {
          var alpha = (1 - Math.sqrt(dist) / CONNECT_DIST) * 0.3;
          ctx.strokeStyle = 'rgba(99,102,241,' + alpha + ')';
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      // Mouse connection — glow lines to nearby particles
      var mdx = a.x - mouse.x;
      var mdy = a.y - mouse.y;
      var mDist = mdx * mdx + mdy * mdy;
      if (mDist < MOUSE_DIST * MOUSE_DIST) {
        var mAlpha = (1 - Math.sqrt(mDist) / MOUSE_DIST) * 0.6;
        ctx.strokeStyle = 'rgba(139,92,246,' + mAlpha + ')';
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.stroke();
        ctx.lineWidth = 0.8;
      }
    }

    // Draw particles
    for (var i = 0; i < len; i++) {
      var p = particles[i];
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.color + p.baseAlpha + ')';
      ctx.fill();
    }

    requestAnimationFrame(animate);
  }

  // Start after a short delay so hero loads first
  setTimeout(animate, 300);
})();

/*==============================================================
  HERO CANVAS — Dense Interactive Network
==============================================================*/
(function() {
  var canvas = document.getElementById('hero-canvas');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');
  var hero = canvas.parentElement;
  var pts = [];
  var mouse = { x: -9999, y: -9999 };
  var LINK = 160, MOUSE_R = 250;

  function resize() {
    canvas.width = hero.offsetWidth;
    canvas.height = hero.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  hero.addEventListener('mousemove', function(e) {
    var r = hero.getBoundingClientRect();
    mouse.x = e.clientX - r.left;
    mouse.y = e.clientY - r.top;
  });
  hero.addEventListener('mouseleave', function() {
    mouse.x = -9999; mouse.y = -9999;
  });

  function count() {
    var a = canvas.width * canvas.height;
    return Math.min(Math.max(Math.round(a / 5500), 80), 260);
  }

  function make() {
    var roll = Math.random();
    var r, g, b;
    if (roll < 0.45) { r=99; g=102; b=241; }         // indigo
    else if (roll < 0.7) { r=139; g=92; b=246; }      // violet
    else if (roll < 0.85) { r=59; g=130; b=246; }     // blue
    else if (roll < 0.93) { r=245; g=158; b=11; }     // amber
    else { r=g=b= 220 + Math.random()*35|0; }         // white
    return {
      x: Math.random()*canvas.width,
      y: Math.random()*canvas.height,
      vx: (Math.random()-0.5)*0.6,
      vy: (Math.random()-0.5)*0.6,
      rad: 1.2 + Math.random()*2.2,
      r:r, g:g, b:b,
      a: 0.4 + Math.random()*0.5
    };
  }

  function init() {
    pts = [];
    var n = count();
    for (var i = 0; i < n; i++) pts.push(make());
  }
  init();
  window.addEventListener('resize', function() {
    var n = count();
    while (pts.length < n) pts.push(make());
    while (pts.length > n) pts.pop();
  });

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var w = canvas.width, h = canvas.height, n = pts.length;

    for (var i = 0; i < n; i++) {
      var p = pts[i];
      p.x += p.vx; p.y += p.vy;
      if (p.x < -10) p.x = w+10;
      if (p.x > w+10) p.x = -10;
      if (p.y < -10) p.y = h+10;
      if (p.y > h+10) p.y = -10;
    }

    // Connections
    for (var i = 0; i < n; i++) {
      var a = pts[i];
      for (var j = i+1; j < n; j++) {
        var b = pts[j];
        var dx = a.x-b.x, dy = a.y-b.y;
        var d2 = dx*dx + dy*dy;
        if (d2 < LINK*LINK) {
          var alpha = (1 - Math.sqrt(d2)/LINK) * 0.25;
          ctx.strokeStyle = 'rgba(99,102,241,' + alpha + ')';
          ctx.lineWidth = 0.7;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      // Mouse attraction lines
      var mx = a.x-mouse.x, my = a.y-mouse.y;
      var md = mx*mx + my*my;
      if (md < MOUSE_R*MOUSE_R) {
        var ma = (1 - Math.sqrt(md)/MOUSE_R) * 0.55;
        ctx.strokeStyle = 'rgba(139,92,246,' + ma + ')';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.stroke();

        // Glow dot at mouse intersection
        if (md < 80*80) {
          ctx.beginPath();
          ctx.arc(a.x, a.y, a.rad*1.8, 0, Math.PI*2);
          ctx.fillStyle = 'rgba(139,92,246,' + ma*0.6 + ')';
          ctx.fill();
        }
      }
    }

    // Draw particles with glow
    for (var i = 0; i < n; i++) {
      var p = pts[i];
      // Outer glow
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.rad*3, 0, Math.PI*2);
      ctx.fillStyle = 'rgba('+p.r+','+p.g+','+p.b+','+(p.a*0.1)+')';
      ctx.fill();
      // Core
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.rad, 0, Math.PI*2);
      ctx.fillStyle = 'rgba('+p.r+','+p.g+','+p.b+','+p.a+')';
      ctx.fill();
    }

    requestAnimationFrame(draw);
  }
  setTimeout(draw, 200);
})();

/*==============================================================
  ANIMATION SYSTEM JS
==============================================================*/

/* 6. Scroll Reveal Observer */
(function() {
  var els = document.querySelectorAll('.reveal-up,.reveal-left,.reveal-right,.reveal-scale');
  if (!els.length) return;
  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  els.forEach(function(el) { observer.observe(el); });
})();

/* 8. Scroll Progress Bar */
(function() {
  var bar = document.getElementById('scroll-progress');
  if (!bar) return;
  window.addEventListener('scroll', function() {
    var h = document.documentElement;
    var pct = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
    bar.style.width = pct + '%';
  }, { passive: true });
})();

/* 5. 3D Tilt on Cards (mouse proximity) */
(function() {
  if (window.matchMedia('(hover: none)').matches) return;
  document.querySelectorAll('.skill-card, .project-card, .stat-card').forEach(function(card) {
    card.addEventListener('mousemove', function(e) {
      var rect = card.getBoundingClientRect();
      var x = e.clientX - rect.left;
      var y = e.clientY - rect.top;
      var cx = rect.width / 2;
      var cy = rect.height / 2;
      var rX = ((y - cy) / cy) * -6;
      var rY = ((x - cx) / cx) * 6;
      card.style.transform = 'perspective(800px) rotateX(' + rX + 'deg) rotateY(' + rY + 'deg) translateY(-8px)';
    });
    card.addEventListener('mouseleave', function() {
      card.style.transform = '';
      card.style.transition = 'transform 0.5s ease';
      setTimeout(function() { card.style.transition = ''; }, 500);
    });
  });
})();

/* 8b. Smooth section fade on nav click */
(function() {
  document.querySelectorAll('.navmenu a[href^="#"]').forEach(function(link) {
    link.addEventListener('click', function() {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.style.opacity = '0';
        target.style.transition = 'opacity 0.4s ease';
        setTimeout(function() {
          target.style.opacity = '1';
        }, 100);
      }
    });
  });
})();