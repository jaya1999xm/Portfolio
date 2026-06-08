/* ============================================================
   Whimsy layer — blooming flowers · detailed butterflies · vines
   pastel, pointer-events:none, reduced-motion friendly
   ============================================================ */
(function () {
  "use strict";

  var P = {
    rose:  "#e89aae",
    rosed: "#d76b89",
    mauve: "#c69ad1",
    gold:  "#f0c96b",
    golddk:"#d9a93f",
    cream: "#fff7fb",
    blush: "#f3a9bd",
    leaf:  "#a9c98f",
    leafdk:"#8bb56f",
    stem:  "#8fae73",
    ink:   "#6b4a4a"
  };

  function rand(a, b) { return a + Math.random() * (b - a); }

  /* ---------- flowers ---------- */
  function flowerSVG(petal, center) {
    var p = "";
    for (var i = 0; i < 5; i++) {
      p += '<ellipse cx="50" cy="25" rx="13" ry="22" fill="' + petal + '" transform="rotate(' + (i * 72) + ' 50 50)"/>';
    }
    return '<svg viewBox="0 0 100 100" aria-hidden="true">' + p +
           '<circle cx="50" cy="50" r="11.5" fill="' + center + '"/>' +
           '<circle cx="50" cy="50" r="11.5" fill="none" stroke="#fff" stroke-opacity=".5" stroke-width="2"/></svg>';
  }

  /* ---------- detailed butterfly ----------
     id : unique gradient id  · base/edge/accent/spot colours */
  function butterflySVG(id, base, edge, accent, spot) {
    var g = 'g' + id;
    return '<svg viewBox="0 0 130 116" aria-hidden="true">' +
      '<defs>' +
        '<linearGradient id="' + g + 'f" x1="0" y1="0" x2="0" y2="1">' +
          '<stop offset="0" stop-color="' + accent + '"/>' +
          '<stop offset="0.55" stop-color="' + base + '"/>' +
          '<stop offset="1" stop-color="' + edge + '"/>' +
        '</linearGradient>' +
        '<linearGradient id="' + g + 'h" x1="0" y1="0" x2="0" y2="1">' +
          '<stop offset="0" stop-color="' + base + '"/>' +
          '<stop offset="1" stop-color="' + edge + '"/>' +
        '</linearGradient>' +
      '</defs>' +

      /* ---- LEFT wings ---- */
      '<g class="wing wing-l">' +
        /* forewing */
        '<path d="M65 50 C44 16 16 8 7 24 C0 37 10 53 38 56 C50 57 60 56 65 50 Z" fill="url(#' + g + 'f)" stroke="' + edge + '" stroke-width="2.2"/>' +
        /* hindwing */
        '<path d="M65 56 C46 60 24 64 22 84 C20 100 42 100 56 78 C62 69 65 62 65 56 Z" fill="url(#' + g + 'h)" stroke="' + edge + '" stroke-width="2.2"/>' +
        /* veins */
        '<path d="M63 52 L18 26 M63 53 L14 40 M62 54 L33 54" stroke="' + edge + '" stroke-width="1" fill="none" opacity=".5"/>' +
        '<path d="M62 58 L30 74 M62 60 L40 88 M62 62 L51 84" stroke="' + edge + '" stroke-width="1" fill="none" opacity=".5"/>' +
        /* spots */
        '<circle cx="20" cy="30" r="5.5" fill="' + spot + '"/>' +
        '<circle cx="16" cy="42" r="3.4" fill="' + spot + '"/>' +
        '<circle cx="34" cy="84" r="4.6" fill="' + spot + '"/>' +
        '<circle cx="30" cy="48" r="2.6" fill="#fff" opacity=".7"/>' +
        /* edge dots */
        '<path d="M9 24 q-2 4 1 7 M22 84 q-3 3 -1 7" stroke="' + edge + '" stroke-width="2" fill="none" stroke-linecap="round"/>' +
      '</g>' +

      /* ---- RIGHT wings ---- */
      '<g class="wing wing-r">' +
        '<path d="M65 50 C86 16 114 8 123 24 C130 37 120 53 92 56 C80 57 70 56 65 50 Z" fill="url(#' + g + 'f)" stroke="' + edge + '" stroke-width="2.2"/>' +
        '<path d="M65 56 C84 60 106 64 108 84 C110 100 88 100 74 78 C68 69 65 62 65 56 Z" fill="url(#' + g + 'h)" stroke="' + edge + '" stroke-width="2.2"/>' +
        '<path d="M67 52 L112 26 M67 53 L116 40 M68 54 L97 54" stroke="' + edge + '" stroke-width="1" fill="none" opacity=".5"/>' +
        '<path d="M68 58 L100 74 M68 60 L90 88 M68 62 L79 84" stroke="' + edge + '" stroke-width="1" fill="none" opacity=".5"/>' +
        '<circle cx="110" cy="30" r="5.5" fill="' + spot + '"/>' +
        '<circle cx="114" cy="42" r="3.4" fill="' + spot + '"/>' +
        '<circle cx="96" cy="84" r="4.6" fill="' + spot + '"/>' +
        '<circle cx="100" cy="48" r="2.6" fill="#fff" opacity=".7"/>' +
        '<path d="M121 24 q2 4 -1 7 M108 84 q3 3 1 7" stroke="' + edge + '" stroke-width="2" fill="none" stroke-linecap="round"/>' +
      '</g>' +

      /* ---- body + antennae ---- */
      '<ellipse cx="65" cy="58" rx="4.2" ry="22" fill="' + P.ink + '"/>' +
      '<ellipse cx="65" cy="40" rx="4.6" ry="7" fill="' + P.ink + '"/>' +
      '<path d="M65 36 q-3 1 -5 3 M65 56 q0 6 -1 12 M65 56 q0 6 1 12" stroke="#4a3232" stroke-width="1" fill="none" opacity=".5"/>' +
      '<path d="M64 36 C58 24 50 20 46 14" stroke="' + P.ink + '" stroke-width="1.8" fill="none" stroke-linecap="round"/>' +
      '<path d="M66 36 C72 24 80 20 84 14" stroke="' + P.ink + '" stroke-width="1.8" fill="none" stroke-linecap="round"/>' +
      '<circle cx="45" cy="13" r="2.6" fill="' + P.ink + '"/>' +
      '<circle cx="85" cy="13" r="2.6" fill="' + P.ink + '"/>' +
      '</svg>';
  }

  /* ---------- vines ---------- */
  function vineSVG() {
    var leaves = [
      [52, 300, -18], [44, 252, 165], [54, 206, -26],
      [42, 158, 168], [53, 112, -30], [41, 66, 172], [49, 26, -8]
    ];
    var lv = "";
    leaves.forEach(function (l) {
      lv += '<g transform="translate(' + l[0] + ',' + l[1] + ') rotate(' + l[2] + ')">' +
              '<g class="leaf">' +
                '<path d="M0 0 C9 -10 24 -9 30 3 C22 13 6 12 0 0 Z" fill="' + P.leaf + '" stroke="' + P.leafdk + '" stroke-width="1.2"/>' +
                '<path d="M1 1 C10 0 20 1 28 3" stroke="' + P.leafdk + '" stroke-width="1" fill="none" opacity=".7"/>' +
              '</g>' +
            '</g>';
    });
    // little buds along the vine
    var buds = [[40, 18], [55, 256], [40, 150]];
    var bd = "";
    buds.forEach(function (b, i) {
      var col = [P.rose, P.gold, P.mauve][i % 3];
      bd += '<g transform="translate(' + b[0] + ',' + b[1] + ')"><g class="leaf">' +
            '<circle cx="0" cy="0" r="7" fill="' + col + '"/>' +
            '<circle cx="0" cy="0" r="3" fill="' + P.cream + '"/></g></g>';
    });
    return '<svg viewBox="0 0 90 360" preserveAspectRatio="xMidYMax meet" aria-hidden="true">' +
      '<path class="stem" d="M50 360 C30 322 70 300 50 262 C30 224 72 202 48 162 C28 126 66 106 46 66 C36 42 46 20 42 0" ' +
        'fill="none" stroke="' + P.stem + '" stroke-width="5" stroke-linecap="round"/>' +
      lv + bd + '</svg>';
  }

  /* ---------- build flowers across sections ---------- */
  var flowerPalette = [
    [P.rose, P.gold], [P.mauve, P.gold], [P.blush, P.rosed],
    [P.gold, P.rose], [P.rose, P.cream], [P.mauve, P.rose]
  ];
  var fIdx = 0;
  function nextFlower() { var c = flowerPalette[fIdx % flowerPalette.length]; fIdx++; return c; }

  function addFlower(host, leftPct, topPct, size, alt) {
    var f = document.createElement("div");
    f.className = "deco-flower" + (alt ? " alt" : "");
    f.setAttribute("aria-hidden", "true");
    f.style.left = leftPct + "%";
    f.style.top = topPct + "%";
    f.style.width = size + "px";
    f.style.height = size + "px";
    var c = nextFlower();
    f.innerHTML = flowerSVG(c[0], c[1]);
    f.style.transitionDelay = rand(0, 0.25).toFixed(2) + "s";
    host.appendChild(f);
  }

  function addVine(host, side) {
    var v = document.createElement("div");
    v.className = "deco-vine deco-vine-" + side;
    v.setAttribute("aria-hidden", "true");
    v.innerHTML = vineSVG();
    host.appendChild(v);
    // prep stem dash for the grow effect
    var stem = v.querySelector(".stem");
    var len = stem.getTotalLength();
    stem.style.strokeDasharray = len;
    stem.style.strokeDashoffset = len;
    return v;
  }

  var hosts = document.querySelectorAll('header.hero, section');
  hosts.forEach(function (sec, idx) {
    if (getComputedStyle(sec).position === "static") sec.style.position = "relative";
    // a few flowers
    var count = idx === 0 ? 3 : 2;
    for (var i = 0; i < count; i++) {
      var left = i % 2 === 0;
      var leftPct = left ? rand(2, 8) : rand(90, 97);
      var topPct = rand(8, 86);
      addFlower(sec, leftPct, topPct, rand(24, 44), i % 2 === 0);
    }
    // vines — alternate the side they climb, both sides on the tall hero
    if (idx === 0) { addVine(sec, "left"); addVine(sec, "right"); }
    else { addVine(sec, idx % 2 === 0 ? "left" : "right"); }
  });

  /* ---------- bloom / grow on scroll ---------- */
  var animEls = Array.prototype.slice.call(document.querySelectorAll(".deco-flower, .deco-vine"));
  function checkBloom() {
    var vh = innerHeight || document.documentElement.clientHeight;
    for (var i = animEls.length - 1; i >= 0; i--) {
      var el = animEls[i];
      var r = el.getBoundingClientRect();
      if (r.top < vh * 0.92 && r.bottom > vh * 0.02) {
        el.classList.add("bloomed");
        animEls.splice(i, 1);
      }
    }
  }
  checkBloom();
  addEventListener("scroll", checkBloom, { passive: true });
  addEventListener("resize", checkBloom);
  setTimeout(checkBloom, 400);

  /* ---------- butterflies (2, detailed) ---------- */
  var reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!reduce) {
    var layer = document.createElement("div");
    layer.className = "butterfly-layer";
    layer.setAttribute("aria-hidden", "true");

    var bf1 = document.createElement("div");
    bf1.className = "butterfly fly1";
    bf1.innerHTML = butterflySVG("a", P.rose, P.rosed, "#f6c0cf", P.gold);
    layer.appendChild(bf1);

    var bf2 = document.createElement("div");
    bf2.className = "butterfly fly2";
    bf2.innerHTML = butterflySVG("b", P.mauve, "#9d6fb0", "#e3c6ec", P.gold);
    layer.appendChild(bf2);

    document.body.appendChild(layer);
  }
})();
