/* ============================================================
   Jaya Meena — Portfolio interactions
   custom cursor + sparkle trail · scroll reveal · nav
   ============================================================ */
(function () {
  "use strict";

  var fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- magic wand cursor + sparkle trail ---------- */
  if (fine) {
    var wand = document.querySelector(".cursor-wand");
    var mx = innerWidth / 2, my = innerHeight / 2;
    var lastSpark = 0, lastX = mx, lastY = my, rot = 0;

    var COLORS = ["oklch(0.71 0.11 12)", "oklch(0.62 0.075 330)", "oklch(0.80 0.10 82)", "oklch(0.585 0.135 8)"];

    function makeSparkle(x, y, big) {
      var s = document.createElement("div");
      s.className = "sparkle";
      var size = (big ? 10 : 6) + Math.random() * (big ? 14 : 9);
      var col = COLORS[(Math.random() * COLORS.length) | 0];
      s.innerHTML = '<svg width="' + size + '" height="' + size + '" viewBox="0 0 24 24" fill="' + col + '">' +
        '<path d="M12 0c1 6 5 10 12 12-7 2-11 6-12 12-1-6-5-10-12-12 7-2 11-6 12-12z"/></svg>';
      s.style.left = x + "px";
      s.style.top = y + "px";
      document.body.appendChild(s);
      var spread = big ? 70 : 36;
      var dx = (Math.random() - 0.5) * spread;
      var dy = (big ? (Math.random() - 0.3) * spread : 22 + Math.random() * 30);
      var spin = (Math.random() - 0.5) * 260;
      var t0 = performance.now();
      var dur = 650 + Math.random() * 400;
      (function anim(now) {
        var p = (now - t0) / dur;
        if (p >= 1) { s.remove(); return; }
        var e = 1 - Math.pow(1 - p, 2);
        s.style.transform = "translate(-50%,-50%) translate(" + dx * e + "px," + dy * e + "px) rotate(" + spin * e + "deg) scale(" + (1 - p) + ")";
        s.style.opacity = String(1 - p);
        requestAnimationFrame(anim);
      })(t0);
    }

    addEventListener("pointermove", function (e) {
      mx = e.clientX; my = e.clientY;
      // tilt the wand subtly toward movement direction
      var vx = mx - lastX;
      rot += (Math.max(-14, Math.min(14, vx * 0.6)) - rot) * 0.2;
      lastX = mx; lastY = my;
      // star tip (~14,14 in the 64 box) sits at the pointer
      wand.style.transform = "translate(" + (mx - 14) + "px," + (my - 13) + "px) rotate(" + rot + "deg)";
      var now = performance.now();
      if (!reduce && now - lastSpark > 38) {
        lastSpark = now;
        makeSparkle(mx + (Math.random() - 0.5) * 8, my + (Math.random() - 0.5) * 8);
      }
    }, { passive: true });

    // grow + glow over interactive elements
    var hotSel = "a, button, .btn, .tag, .clink, .frame, .tl-card, .edu-card, image-slot";
    document.addEventListener("pointerover", function (e) {
      if (e.target.closest(hotSel)) wand.classList.add("glow");
    });
    document.addEventListener("pointerout", function (e) {
      if (e.target.closest(hotSel) && !(e.relatedTarget && e.relatedTarget.closest && e.relatedTarget.closest(hotSel))) {
        wand.classList.remove("glow");
      }
    });
    addEventListener("pointerdown", function () {
      wand.classList.add("zap");
      if (!reduce) for (var i = 0; i < 9; i++) makeSparkle(mx, my, true); // burst on click
    });
    addEventListener("pointerup", function () { wand.classList.remove("zap"); });
    document.addEventListener("mouseleave", function () { wand.style.opacity = "0"; });
    document.addEventListener("mouseenter", function () { wand.style.opacity = "1"; });
  }

  /* ---------- scroll reveal (rAF-based; robust in nested iframes) ---------- */
  var revealEls = Array.prototype.slice.call(document.querySelectorAll(".reveal"));
  function checkReveal() {
    var vh = innerHeight || document.documentElement.clientHeight;
    for (var i = revealEls.length - 1; i >= 0; i--) {
      var el = revealEls[i];
      var r = el.getBoundingClientRect();
      if (r.top < vh * 0.92 && r.bottom > 0) {
        el.classList.add("in");
        revealEls.splice(i, 1);
      }
    }
  }
  checkReveal();
  addEventListener("scroll", checkReveal, { passive: true });
  addEventListener("resize", checkReveal);
  // safety net: ensure nothing stays hidden
  setTimeout(function () { document.querySelectorAll(".reveal:not(.in)").forEach(function (el) {
    if (el.getBoundingClientRect().top < (innerHeight || 800)) el.classList.add("in");
  }); }, 600);

  /* ---------- nav: active link + mobile toggle ---------- */
  var burger = document.querySelector(".nav-burger");
  var links = document.querySelector(".nav-links");
  if (burger && links) {
    burger.addEventListener("click", function () { links.classList.toggle("open"); });
    links.addEventListener("click", function (e) { if (e.target.tagName === "A") links.classList.remove("open"); });
  }

  var navLinks = Array.prototype.slice.call(document.querySelectorAll('.nav-links a[href^="#"]'));
  var sections = navLinks.map(function (a) { return document.querySelector(a.getAttribute("href")); });
  function spyScroll() {
    var mid = (innerHeight || 800) * 0.35;
    var active = -1;
    for (var i = 0; i < sections.length; i++) {
      var s = sections[i];
      if (!s) continue;
      var r = s.getBoundingClientRect();
      if (r.top <= mid) active = i;
    }
    navLinks.forEach(function (a, j) { a.style.color = j === active ? "var(--rose-deep)" : ""; });
  }
  spyScroll();
  addEventListener("scroll", spyScroll, { passive: true });
})();
