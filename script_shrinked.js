var h = document.getElementById("messbtn"),
  ca, da, k, m, ea, n, p = -1,
  q, r, t, u, v, w = 0, y = 0, ia = 0,
  z = "allies", A = 0, B, ja, ka, D, E = 5,
  F = 0,
  ma = 0,
  G = -1,
  I,
  K,
  na,
  L,
  oa;
window.addEventListener("load", pa, !1);
window.addEventListener("resize", qa, !1);
var ra,
  ua =
    "421005.155.01.105.140502.3202 321.b50050104050202005.02 432.65002.42120505.2405.45055 542.82.2505512.24002.2505 442.91.350202.15.02.1405.55.75 542.450022.1505.350405012.0505.55 642.250504.35.450050501.15050202.150502 642.6502.15050050105040502.1505.75.02 6425.82.355.4405012.52.35 642.d050505202050055.110450050200505.5505 632.65.45.4455212.15002 752.95002.0405.051.150505.45.02.92 e425.35.550055.15005005.01040552.050050202.05005 642".split(
      " "
    ),
  M = [],
  N = [],
  va = [],
  wa = [],
  O,
  P,
  xa = 4;
function ya(b) {
  for (var c = [], a = [], d, e, g = 3; g < b.length; g++)
    if ("." == b.charAt(g)) {
      for (var l = 0; l < parseInt(b.charAt(g + 1), 16) + 3; l++) a.push(0);
      g++;
    } else a.push(parseInt(b.charAt(g)));
  d = parseInt(b.charAt(2), 16);
  8 <= d && (d -= 8);
  d += 4;
  for (g = 0; g < d; g++)
    for (c.push([]), e = parseInt(b.charAt(1), 16), e += 6, l = 0; l < e; l++)
      c[g].push(a[g * e + l] || 0);
  return c;
}
function za() {
  var b = -1,
    c = !1;
  location.search.substring(1).replace(/([^=&]+)=([^&]*)/g, function (a, d, e) {
    a = decodeURIComponent(d);
    e = decodeURIComponent(e);
    e = e.split("O")[0];
    ra[a] = e;
    if (e.length)
      switch (a.charAt(0)) {
        case "l":
          d = parseInt(e);
          1 < a.length
            ? ((a = parseInt(a.substring(1))),
              0 < d &&
              (a > b && (b = a),
                (O[a] = e),
                (B[a] = parseInt(e.substr(2, 2), 16)),
                (ja[a] = parseInt(e.substr(4), 16)),
                -1 == O[a + 1] && parseInt(O[a]) && (O[a + 1] = 0)))
            : (Number(e) > d &&
              ((ea = 6 == Math.round(10 * (Number(e) - d))),
                (c = !0),
                Q("l", d)),
              d && (b = d));
          break;
        case "s":
          1 < a.length &&
            ((a = parseInt(a.substring(1))),
              (M[a] = ya(e)),
              (N[a] = Aa(e, N[a - 1])),
              (O[a] = -1));
          break;
        case "a":
          E = parseInt(e);
          break;
        case "m":
          p = parseInt(e);
      }
  });
  G = b;
  G = G >= M.length ? M.length - 1 : G;
  return c;
}
function Ba(b) {
  for (i = ia = A = 0; i <= b; i++)
    0 < ja[i] && (ia += ja[i]), 0 < B[i] && (A = B[i]);
  A *= 2;
}
function XX() {
  (D &&
    ((Number(mess.style.opacity) && 400 > parseInt(mess.style.width)) ||
      !Number(mess.style.opacity))) ||
    (U.x(), n ? window.location.reload() : Da(0));
}
function R(b) {
  return (1 + E) * (b || 0.5) * 16;
}
function Aa(b, c) {
  var a = parseInt(b.charAt(0), 16);
  8 <= parseInt(b.charAt(2), 16) && (a += 16);
  return a + c;
}
function pa() {
  n = "http" == window.location.protocol.substring(0, 4);
  -1 == p && (p = /chrome/i.test(navigator.userAgent) ? 2 : 0);
  ra = {};
  for (var b = 0, c = !1, a = 0; a < ua.length; a++)
    (M[a] = ya(ua[a])), (b += Aa(ua[a], 2)), N.push(b);
  for (a = 0; a < N.length; a++) va.push(-1), wa.push(0);
  Ca();
  if (n)
    for (c = za(), Ba(G), i = 0; i < O.length; i++)
      0 < parseInt(O[i]) && G < i && (G = i);
  c ? Da(1) : Ga();
  S.c(closebtn, " {", 6);
  T.b(container, E, { alpha: 1 }, function () {
    T.b(bgr0, E / 2, { alpha: 0.05 });
  });
  qa();
  f.addEventListener("click", Ha);
  document.addEventListener("keydown", Ia);
  aa.addEventListener("dblclick", FS);
}
function Ia(b) {
  var c = { id: "" },
    a = "visible" == h.parentNode.style.visibility && "0" != mess.style.opacity;
  if (
    "auto" != f.style.pointerEvents &&
    ((!a && F) || 13 == b.keyCode || 70 == b.keyCode)
  ) {
    switch (b.keyCode) {
      case 27:
        XX();
        break;
      case 37:
      case 65:
        c = q[K][I - 1].a;
        break;
      case 38:
      case 87:
        c = q[K - 1][I].a;
        break;
      case 39:
      case 68:
        c = q[K][I + 1].a;
        break;
      case 40:
      case 83:
        c = q[K + 1][I].a;
        break;
      case 32:
        if (3 > F) return;
        (("none" != q[K][I].a.style.pointerEvents && G && !a) ||
          (!G && 9 == A)) &&
          Ja({ target: c });
        break;
      case 70:
        FS();
        break;
      case 13:
        "hidden" == closediv.style.visibility && Da(1);
        a && Ka();
        break;
      case 17:
        La();
    }
    0 < c.id.length && "none" != c.style.pointerEvents && Ja({ target: c });
  }
}
function FS() {
  var a = document.documentElement;
  document.fullscreenElement ||
    document.webkitFullscreenElement ||
    document.mozFullScreenElement ||
    document.msFullscreenElement
    ? document.exitFullscreen
      ? document.exitFullscreen()
      : document.mozCancelFullScreen
        ? document.mozCancelFullScreen()
        : document.webkitCancelFullScreen
          ? document.webkitCancelFullScreen()
          : document.msExitFullscreen && document.msExitFullscreen()
    : (
      a.requestFullscreen ||
      a.mozRequestFullScreen ||
      a.webkitRequestFullScreen ||
      a.msRequestFullscreen
    ).call(a);
}
function qa(b) {
  ca = container.offsetWidth;
  da = container.offsetHeight;
  v = window.innerWidth / 960;
  u = window.innerHeight / 540;
  r = window.innerWidth / k / (1 > v ? v : 1);
  t =
    ((window.innerHeight / m) * 0.9) /
    (v < u ? (1 > v ? v : 1 > u ? u : 1) : 1 > u ? u : 1);
  var c = 0.5 * -(960 - 960 * v);
  v < u
    ? 1 > v
      ? 1 > u
        ? (V(frame, v),
          T.b(frame, 0, {
            x: c,
            y: 0,
            width: window.innerWidth,
            height:
              540 / v / v < window.innerHeight / v
                ? 540 / v / v
                : window.innerHeight / v,
          }))
        : (V(frame, v),
          T.b(frame, 0, {
            x: c,
            y: 0,
            width: window.innerWidth,
            height:
              (540 * u) / v < (window.innerHeight * u) / v
                ? (540 * u) / v
                : (window.innerHeight * u) / v,
          }))
      : (V(frame, 1),
        T.b(frame, 0, {
          x: 0,
          y: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        }))
    : 1 > u
      ? 1 > v
        ? (V(frame, v < u ? u : v, "", u),
          T.b(frame, 0, { x: c, y: 0, height: window.innerHeight * u }))
        : (V(frame, 1, "", u),
          T.b(frame, 0, {
            x: 0,
            y: 0,
            width: window.innerWidth,
            height: window.innerHeight * u,
          }))
      : (V(frame, 1),
        T.b(frame, 0, {
          x: 0,
          y: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        }));
  u = u > v ? (2 + (1.5 < u ? 1.5 : u) / v) / 3 : 1;
  1 > u && (u = 1);
  ba && V(ba, 1.25 > v ? (1 > v ? 0.8 + (1 - v) / 3 : 0.8 * v) : 1);
  V(f, 1 < v ? v : 1, "X");
  if (q)
    for (c = 0; c < m; c++)
      for (var a = 0; a < k; a++)
        T.b(q[c][a].g, b ? 1 : 0, {
          width: r,
          height: t,
          x: r * a - 10,
          y: t / 5 + t * c,
        }),
          T.b(q[c][a].l, 0, { width: 0.75 * r, height: 0.75 * t }),
          T.b(q[c][a].canvas, 0, { width: 0.75 * r, height: 0.75 * t }),
          T.b(q[c][a].u, 0, { width: 0.76 * r, height: 0.76 * t }),
          FB(q[c][a].g, parseInt(ca / (2 * k)), [
            "borderTopLeftRadius",
            "borderTopRightRadius",
            "borderBottomLeftRadius",
            "borderBottomRightRadius",
          ]);
}
function FB(_d, _w, _a) {
  for (var i = 0; i < _a.length; i++) {
    if (parseInt(_d.style[_a[i]]) != _w && parseInt(_d.style[_a[i]]))
      _d.style[_a[i]] = _w + "px";
  }
}
function V(b, c, a, d) {
  b.style.transform =
    "scale" +
    (d ? "(" + c + "," + d + ")" : (null != a ? a : "") + "(" + c + ")");
}
function W(b, c) {
  b.style.pointerEvents = c ? "auto" : "none";
}
function Ma() {
  X(practicebtn);
  X(versusbtn);
  X(multibtn);
  X(soundbtn);
  X(copy);
  X(author);
  X(aa);
  D = !0;
  S.c(
    copy,
    "@ 2017 by Foumart|Games for||JS13K = 13.312|k zip, " +
    (n ? location.search.length / 1e3 + "|k ram" : ""),
    2,
    0,
    "#8c8"
  );
  S.c(author, "Developed by Noncho Savov", 2, 0, "#8c8");
  closediv.style.visibility = "hidden";
  S.c(
    practicebtn,
    1 > G
      ? "Tutorial       "
      : (w ? "Replay (" + (G + 1) + ")" : "Continue") + "       ",
    4
  );
  S.c(versusbtn, "Resume Game       ", 4);
  versusbtn.parentNode.style.opacity = !P || ma || 0 >= G ? "0.25" : "1";
  W(versusbtn.parentNode, P && !ma && 0 < G);
  S.c(multibtn, "Clear||Progress||   ", 4);
  multibtn.parentNode.style.opacity = 0 >= G ? "0.25" : "1";
  W(multibtn.parentNode, 0 < G);
  S.c(soundbtn, p ? (1 == p ? "  $|} " : "  $})") : "  $|{ ", 4);
  for (i = 0; 14 > i; i++) {
    var b = document.createElement("button");
    b.id = "btn_" + i;
    b.style.position = "absolute";
    b.className = (12 == i ? "r" : "y") + " bb i";
    b.addEventListener("click", 12 >= i ? Na : Oa);
    W(b, 13 == i || !(-1 == O[i] && n));
    12 <= i
      ? (S.c(b, 12 == i ? "  Stage 13   " : "  Custom|   ", 4),
        (b.style.bottom = "7%"),
        (b.style.height = "60px"),
        (b.style.left = -90 + 232 * (i - 11) + "px"),
        (b.style.opacity = 0 < parseInt(O[i]) || (13 == i && n) ? 1 : 0.25))
      : (T.b(b, 0, {
        x:
          (10 > i ? 128 : 143) *
          (8 > i
            ? 4 > i
              ? 2 == i
                ? 1
                : 0
              : i - 3
            : (12 > i ? i - 8 : 14 < i ? i - 16.1 : i - 12.9) +
            (9 < i ? (11 >= i ? 0.25 : 1.9) : 0.4)),
        width: 9 > i && 0 < i ? 120 : !i && 0 < parseInt(O[0]) ? 102 : 134,
        height: 48,
        alpha: 0 < parseInt(O[i]) ? 0.75 : -1 < O[i] ? 0.4 : n ? 0.1 : 0.2,
      }),
        (b.style.bottom =
          34 -
          8 *
          (7 < i
            ? 11 < i
              ? 15 > i
                ? 3
                : 4
              : 2
            : 3 > i
              ? i
                ? 0
                : -1
              : 1) +
          "%"),
        B[i] <= N[i] && B[i] && (b.className += " g"),
        parseInt(O[i]) == 1 && (b.className += " r"),
        S.c(
          b,
          [i ? "|stage" : "||tutorial", "| | | *  ", " | |*|* ", " ||***|"][
          1 > O[i] ? 0 : parseInt(O[i])
          ] +
          "|" +
          ((i || O[0]) && ((n && i) || i) ? i + 1 : "") +
          " ",
          3,
          0,
          B[i] ? (B[i] <= N[i] ? "yellow" : "white") : "white"
        ));
    aa.appendChild(b);
  }
}
function Na(b) {
  G = b = parseInt(b.currentTarget.id.substring(4));
  y = A = ia = 0;
  b ? ((F = b + 5), Ba(G - 1)) : (F = 1);
  Q("l", G);
  Pa(G);
}
function Oa() {
  Qa();
  Pa(-1);
  U.i();
}
function Ga() {
  U.A();
  X(ba);
  var b = [
    [
      [4, 21, , -4, 3, , 3],
      [4.5, 4, 3, 5, 1, , 3, 1, , , , 1],
      [3, 4, -2, 5, 3, 1, 1.5, , , 1],
      [7, 4, 3, -4, 1, , 2.5, , , , , 1],
    ],
    [
      [9, 4, -3, 3, 3, 3],
      [9, 4, -3, 9, , , 3, 3],
      [4, 4, -3, 6, , 1, 1, , 1, , 1],
      [4, 4, 2, 6, 1, , , 1, 1, , 1],
    ],
    [
      [4, 10, , 3, 3, , 3],
      [4, 4, 3, 3, 1, , 3, 2, , , , 1],
    ],
    [
      [4, 10, -0.5, 3, 3],
      [4, 11, 9.5, 3, , 3, , 3],
      [3, 4.5, 2.5, 3, , 3, 2, 2, , 1, , 1],
      [4, 4.5, 4.5, 3, 3, 3, , , , 1, , 1],
      [3, 4.5, 7.5, 3, 3, , 2, 2, , 1, , 1],
      [4, 5.5, 4.5, 6.5, 1, 1, 2, 2, 1],
    ],
    [
      [9, 4, , 3, 3, 3],
      [4, 4, 5, 9, , , , 3],
      [6.6, 4, , 9, , , 2, 3, , 1],
      [4, 4, , 6, , 1, 1, , 1, , 1],
      [4, 4, 5, 6, 1, , , 1, 1, , 1],
    ],
    [
      [4, 16, , -2, , 3, 1, 3],
      [3, 4, 3, 3, 1, , 3, , , , , 1],
      [3, 4, 3, 10, 1, , 2.5, , , , , 1],
    ],
    [
      [4, 10, , 3, 3, , 3],
      [4, 4, , -2, 3, 3, 3, 3],
    ],
    [
      [9, 4, , 3, 3, 3],
      [9, 4, , 9, , , 3, 3],
      [4, 4, , 6, , 1, 1, , 1, , 1],
      [4, 4, 5, 6, 1, , , 1, 1, , 1],
    ],
    [
      [4, 10.5, , 2.5, , 3],
      [6, 4, 3, 3, 2, 3, , 1, , , , 1],
      [4, 8, 5, 6, 1, , , 3, 1],
    ],
  ];
  Ra(b, -180, 20, "b");
  b = [
    [
      [4, 9, -0.5, 5, 2.5, , 3],
      [2.5, 4, -2, 10, 4, 1, , , , 1],
      [4, 23, 7, -7, 3, , , 3],
      [5.5, 4, 2.5, 5, 1, 1, 1, 1, , 1, , 1],
      [4, 8.75, 1, -2.75, 4, , 1, 1, , , 1],
      [4, 4, 4, -4, 2, 1, 1, 1, , 1, , 1],
    ],
    [
      [4, 19, , -6, , 3, 1, 3],
      [7, 4, 3, , 1, 3, , 1, , , , 1],
      [7, 4, 3, 9, 1, , 2.5, , , , , 1],
      [4, 7, 6, 3, 1, , , 1, 1, , 1],
    ],
    [
      [10, 4, , , 3, , 3],
      [10, 4, , 4.5, , 3, , 3],
      [10, 4, , 9, 3, , 3],
      [4, 2.5, , 3, , 1, 1, , 1, , 1],
      [4, 2.5, 6, 7.5, 1, , , 1, 1, , 1],
    ],
    [
      [10, 4, , 9, , 3, , 3],
      [10, 4, , , 3, 3],
      [4, 7, , 3, , 1, 1, , 1, , 1],
      [7, 4, 3, 4.5, 1, , 3, 1, , , , 1],
      [4, 2.5, 6, 3, 1, 1, 1, 1, 1, , 1],
    ],
    [
      [4, 14, , -1, , 3],
      [7, 4, 3, , 2, 3, , 1, , , , 1],
      [4, 11, 6, 3, 1, , , 3, 1],
    ],
    [
      [4, 20, , -5.5, , 3, 1, 3],
      [4, 4, 3, , 1, , 3, 1, , , , 1],
      [5, 4, 3, 10.5, 1, , 2.5, , , , , 1],
    ],
  ];
  Ra(b, -95, 185, "g");
  Ma();
  W(f, !1);
}
function Ra(b, c, a, d) {
  var e;
  for (i = 0; i < b.length; i++) {
    for (j = e = 0; j < b[i].length; j++) {
      var g = b[i][j];
      e < (g[0] || 0) + (g[2] || 0) && (e = (g[0] || 0) + (g[2] || 0));
      var l = document.createElement("div");
      ba.appendChild(l).className = d;
      l.style.width = (10 * g[0] || 0) + "px";
      l.style.height = (10 * g[1] || 0) + "px";
      l.style.left = c + (10 * g[2] || 0) + "px";
      l.style.top = a + (10 * g[3] || 0) + "px";
      W(l);
      l.style.borderRadius =
        (10 * g[4] || 0) +
        "px " +
        (10 * g[5] || 0) +
        "px " +
        (10 * g[6] || 0) +
        "px " +
        (10 * g[7] || 0) +
        "px";
      g[8] && (l.style.borderTop = "none");
      g[9] && (l.style.borderRight = "none");
      g[10] && (l.style.borderBottom = "none");
      g[11] && (l.style.borderLeft = "none");
    }
    c += 10 * e + 10;
  }
}
var Sa = " []_:;=   ".split(""),
  Ta = [, , , 0.6, " g"],
  Ua = [, , , 0.74, " r"],
  Va = [
    null,
    ["#1a1", "#2c2", "#080", 0.75, " g"],
    Ta,
    Ta,
    ["#c22", "#f55", "#a11", 0.75, " r"],
    Ua,
    Ua,
    Ua,
    ,
    ,
  ];
function Wa(b, c, a) {
  var d = area,
    e;
  this.x = b;
  this.y = c;
  this.height = this.width = 100;
  this.z = a;
  this.state = 0;
  this.g = e = document.createElement("div");
  d.appendChild(e);
  e.style.width = r + "px";
  e.style.height = t + "px";
  e.style.top = t / 5 + t * c + "px";
  e.style.left = r * b - 10 + "px";
  this.a = d = document.createElement("div");
  e.appendChild(d).className = "df";
  d.style.opacity = " " == a ? "0.05" : "[" == a ? "1" : "0.6";
  var g = Va[P[c][b]];
  if (g) {
    if (
      ("allies" == z && "]" == a && 0 != A % 2) ||
      ("opp" == z && ":" == a) ||
      ("foes" == z && ";" == a)
    )
      T.b(d, E, { alpha: g[3] }), V(d, 1);
    d.className += g[4];
    "[" != a &&
      (g[0] && (d.style.borderColor = g[0]),
        g[1] && (d.style.borderTopColor = g[1]),
        g[2] && (d.style.borderBottomColor = g[2]));
  }
  d.style.borderRadius = ca / (2 * k) + "px";
  if (2 == P[c][b] || 6 == P[c][b]) d.style.borderBottomLeftRadius = "0";
  if (2 == P[c][b] || 5 == P[c][b]) d.style.borderBottomRightRadius = "0";
  if (3 == P[c][b] || 6 == P[c][b]) d.style.borderTopLeftRadius = "0";
  if (3 == P[c][b] || 5 == P[c][b]) d.style.borderTopRightRadius = "0";
  this.l = b = document.createElement("div");
  e.appendChild(b).className = "d";
  this.u = e = S.f(
    b,
    a + 48,
    10,
    "[" != a && "]" != a ? "#622" : "]" != a ? "#543" : "#242"
  );
  e.style.position = "absolute";
  V(e, 0.76);
  e.style.marginTop = "2px";
  Xa(e);
  this.canvas = a = S.f(
    b,
    a + 48,
    10,
    "[" == a
      ? "#fff"
      : "]" == a
        ? "#fe9"
        : ":" == a
          ? "#fcd"
          : ";" == a
            ? "#fd6"
            : "#fff"
  );
  V(a, 0.75);
  Xa(a);
  a.style.marginLeft = "-2px";
  b.style.width = a.style.width = e.style.width = 0.75 * r + "px";
  b.style.height = a.style.height = 0.75 * t + "px";
  e.style.height = 0.76 * t + "px";
}
function Xa(b) {
  b.style.M = "none";
  b.style.webkitUserSelect = "none";
  b.style.H = "none";
}
function Qa() {
  T.b(mess, E, { alpha: 0 });
  T.b(fade, E, { alpha: 0 });
  W(mess);
}
function Da(b) {
  0 <= b && (F = b);
  X(messtxt);
  X(copy);
  X(author);
  switch (b) {
    case 103:
      La();
      break;
    case 102:
      Ca();
      ma = G = 0;
      n &&
        (window.history.pushState("", "", location.pathname),
          window.location.reload());
      Ga();
      break;
    case 101:
      Y(Ya, R());
      Qa();
      Pa(b, !0);
      U.i();
      break;
    case 0:
      z = null;
      X(area);
      X(f);
      T.b(titlediv, E, { alpha: 1 });
      Qa();
      Ga();
      U.i();
      break;
    case 1:
      Y(Ya, R());
      Za(0, !0);
      0 >= G ? ((G = y = ia = A = 0), Pa(0)) : ((y = 0), Ba(G - 1), Pa(G));
      break;
    case 2:
      $a(
        "But what if you're trapped in an\rendless maze of nightmares?\r...where crawlers march against you,   \rwhen you are lost in the battlefield\rand formation is absent.",
        " |Prepare|!|"
      );
      Za(0, !0);
      break;
    case 3:
      Za();
      U.x();
      Qa();
      Y(function () {
        Y(function () {
          U.v();
          $a(
            "In a battle round you |Pause, |or |Move|\r|   Up^|Down`|Left<|or Right>\r\rAll other units are moving in only one\rdirection - enemies move horizontally\rright to left.",
            " To Battle !|"
          );
          bb();
        }, R(18));
        X(area);
        z = "opp";
        y = 0;
        Z(P, cb);
      }, R(5));
      break;
    default:
      U.x(), U.h(22), (P = M[G]), Qa(), X(area), (z = "opp"), Z(P, cb);
  }
}
function Pa(b, c) {
  z = c ? "plr" : "opp";
  X(area);
  X(messtxt);
  X(copy);
  X(author);
  Ya();
  aa && X(aa);
  T.b(titlediv, E, { alpha: 0 });
  T.b(f, E, { alpha: 1 });
  y = 0;
  U.x();
  U.h(22);
  c
    ? Z(P, cb)
    : -1 == b
      ? Z(P || db(M[13]))
      : Y(function () {
        -1 < b && Z(M[b - (b >= M.length ? 1 : 0)], b ? cb : eb);
      }, R());
}
function eb() {
  fb(I, K);
  Y(function () {
    $a(
      "\rYou are Lost Warrior. You'|ve fought\rcountless of battles and achieved\rgreatest victories !\r",
      " |Proceed |"
    );
  }, R(5));
}
function gb() {
  for (var b = [], c = 0; c < arguments.length; c++) b.push(arguments[c]);
  c = b.shift();
  var a = b.shift();
  b[2] = "width=" + c + ",height=" + a + "," + b[2];
  try {
    var d = window.open.apply(this, b);
    d.addEventListener("load", d.focus, !1);
  } catch (e) { }
}
function Ka() {
  Qa();
  W(mess);
  -1 < h.id.indexOf("tw")
    ? (gb(
      ca / 2,
      da / 2,
      "http://twitter.com/home?status=" +
      encodeURIComponent(
        ("tweet" == h.id
          ? "Hey folks, try this unique stage in"
          : "Cleared all " +
          (14 < M.length ? M.length + " " : "") +
          "stages in") +
        " #FormationAbsent" +
        ("tweet" != h.id
          ? " (turns:" + parseInt(A / 2) + ", score:" + w + ")"
          : "") +
        "! A 13kb #puzzle for #js13k #js13kgames Play: " +
        window.location.protocol +
        "//" +
        window.location.hostname +
        window.location.pathname +
        ("tweet" == h.id ? "?s13=" + ra.s13 + "&l=13.5" : "")
      ),
      "html",
      "resizable=yes,scrollbars=no,left=0,top=0,screenX=0,screenY=0"
    ),
      Q("l" + G, O[G]),
      Q("l", G + 1),
      Da(0))
    : "restart" == h.id
      ? ((y = ma = 0), (A = G ? N[G - 1] * 2 : A), Da(G + 5))
      : "nextstage" == h.id
        ? ((y = 0), n && hb(), Da(G + 5))
        : "tobattle" == h.id && 2 < F
          ? (U.x(),
            T.b(mess, 2 * E, { alpha: 0 }, function () {
              $a("\rAdvice`move down\rAllies may need help.\r", null, 3);
              T.b(mess, 2 * E, { alpha: 0.95 }, function () {
                bb();
                W(q[K + 1][I].a, !0);
                q[K + 1][I].g.style.opacity = q[K + 1][I].canvas.style.opacity = "1";
                q[K + 1][I].a.style.backgroundColor = "#3b3";
              });
            }))
          : Da(F + (100 > F && 3 != F ? 1 : 0));
}
function bb(b) {
  (b &&
    (D ||
      "plr" != z ||
      "pointer" == b.target.parentNode.firstChild.style.cursor ||
      (Number(mess.style.opacity) && 400 > parseInt(mess.style.width)) ||
      "auto" == f.style.pointerEvents)) ||
    ((ka = !ka),
      X(area),
      Z(P, function () {
        ka && (fb(I, K, 1), q[K][I].g.addEventListener("click", bb));
      }));
}
function Ya() {
  T.b(closebtn, 0, { x: -7, y: -7 });
  T.b(closediv, E, { alpha: 1, width: 60, height: 60 });
}
function ib(b) {
  var c = [
    [0, -1],
    [1, 0],
    [0, 1],
    [-1, 0],
    [0, 0],
  ];
  c.splice(b, 1);
  for (b = 0; b < c.length; b++) {
    var a = I + c[b][0],
      d = K + c[b][1];
    W(q[d][a].a);
    4 != P[d][a] && 5 != P[d][a]
      ? a != I || d != K
        ? ((q[d][a].g.style.opacity = q[d][a].canvas.style.opacity = 0.6),
          fb(a, d, 2))
        : fb(a, d)
      : (q[d][a].a.style.opacity = "0.5");
  }
}
function fb(b, c, a) {
  a || (a = 0);
  _clr = ["2b2", "1a1", "282"];
  q[c][b].a.style.backgroundColor = "#" + _clr[a];
}
function db(b) {
  var c = P;
  c || (c = []);
  for (var a = 0; a < b.length; a++) c.push(b[a].slice());
  return c;
}
function jb(b) {
  b = b.target.id.split("_")[1].split("x");
  var c = parseInt(b[0]),
    a = parseInt(b[1]);
  b = P[a][c];
  if (b == 5) U.i();
  else if (!b && I < 0) U.e();
  else U.x();
  P[a][c] =
    5 <= b
      ? 0
      : b + 1 + (2 == b || (!b && -1 < I) || (4 == b && -1 == na) ? 1 : 0);
  X(area);
  Z(P);
}
function Ha(b) {
  U.i();
  b = b.pageX / v;
  if (260 < b && 380 > b)
    for (_y = 0; _y < m; _y++)
      if (12 > k) P[_y].push(0);
      else for (_x = 0; 5 > _x; _x++) P[_y].pop();
  else if (410 < b && 540 > b)
    if (8 > m) P.push(P[m - 1]);
    else for (_x = 0; 3 > _x; _x++) P.pop();
  else if (580 < b && 690 > b) xa++, 16 < xa && (xa = 2), kb();
  else if (735 < b && 765 > b)
    for (_y = 0; _y < m; _y++) for (_x = 0; _x < k; _x++) P[_y][_x] = 0;
  else if (800 < b) {
    b = (xa - 2).toString(16) + (k - 6).toString(16) + (m - 4).toString(16);
    var c = 0;
    for (_y = 0; _y < m; _y++)
      for (_x = 0; _x < k; _x++)
        P[_y][_x]
          ? (c &&
            ((b =
              3 < c
                ? b + ("." + (c - 3).toString(16))
                : b + (3 == c ? "000" : 2 == c ? "00" : "0")),
              (c = 0)),
            (b += P[_y][_x]))
          : (c++, 17 < c && ((b += ".f"), (c = 0)));
    Q("s" + (M.length - 1), b);
    Q("l", M.length - 0.4);
    window.location.reload();
  } else return;
  X(area);
  Z(P);
}
function kb() {
  X(f);
  S.c(
    f,
    "    (|generator|)     Width||" +
    (10 > k ? "0" : "") +
    k +
    "     Height||0" +
    m +
    "     Best||" +
    (10 > xa ? "0" : "") +
    xa +
    "     CL    Test Level",
    3
  );
}
function Z(b, c) {
  P = [];
  P = db(b);
  q = [];
  k = P[0].length;
  m = P.length;
  I = K = na = -1;
  for (var a = (L = oa = 0); a < m; a++) {
    q.push([]);
    for (var d = 0; d < k; d++) {
      var e = new Wa(d, a, Sa[P[a][d]]);
      1 == P[a][d]
        ? ((I = d), (K = a))
        : (4 == P[a][d]
          ? ((na = d), oa++)
          : 2 == P[a][d]
            ? L++
            : (5 == P[a][d] || 6 == P[a][d]) && oa++,
          (3 < F || 9 < A || G) && e.g.addEventListener("click", bb));
      q[a].push(e);
    }
  }
  if (null == c) {
    lb();
    D = !1;
    for (a = 0; a < m; a++)
      for (d = 0; d < k; d++)
        q[a][d].a.addEventListener("click", jb),
          (q[a][d].a.style.cursor = "pointer"),
          (q[a][d].a.id = "btn_" + d + "x" + a);
    kb();
    qa();
    W(f, !0);
  } else {
    if (1 > G && ("plr" == z || 2 == A))
      switch (A) {
        case 1:
          ib(5);
          break;
        case 2:
        case 5:
        case 7:
        case 9:
        case 11:
          var g = parseInt(A / 2) - 1;
          (!ka || 8 < A) &&
            T.b(mess, E, { alpha: 0 }, function () {
              if (400 > T.j(mess, "height")) {
                var a = [
                  "Exchange positions\rwith Allies to dodge\rupcoming Foes |=",
                  "Once enemies are\ravoided, they'|re\rbecoming||the||pray.",
                  "When allies reach\rthe battle horizon\rthey're respawned.",
                  "Skip any move by\rclicking the main\rsquared button.",
                  "You can also toggle\rcontrols||by||clicking\ron an empty area.",
                ][g];
                Y(
                  function () {
                    $a("\r" + a + "\r", null, 3);
                    T.b(mess, E, { alpha: 0.9 });
                    ib([2, 0, 0, 4, 0][g]);
                  },
                  g ? 0 : R(6)
                );
              }
            });
      }
    if (-1 == I)
      F &&
        !ma &&
        (L || oa
          ? ((ma = A),
            Y(function () {
              $a("\r\rYou were lost on the battlefield...\r\r", " Restart ");
            }, R()),
            U.o())
          : Z(P));
    else if (L)
      if (oa) {
        qa();
        if ("plr" == z && !ka) {
          for (a = 0; a < m; a++)
            for (d = 0; d < k; d++)
              try {
                a &&
                  2 == P[a][d] &&
                  !P[a - 1][d] &&
                  ((d < k && 1 != P[a - 1][d + 1]) || d >= k) &&
                  ((a && d && 1 != P[a - 1][d - 1]) || !d) &&
                  ((1 < a && 1 != P[a - 2][d]) || 2 > a) &&
                  ((q[a - 1][d].a.className += " g"),
                    (q[a - 1][d].a.style.opacity = "0.2"),
                    !P[a - 1][d] &&
                    a &&
                    (S.f(q[a - 1][d].canvas, "^", 10),
                      (q[a - 1][d].l.style.opacity = "0.2"))),
                  (4 != P[a][d] && 5 != P[a][d]) ||
                  !d ||
                  (!P[a][d - 1] &&
                    ((((1 != P[a][d - 2] && 1 < d) || 2 > d) &&
                      ((1 != P[a - 1][d - 1] && d && a) || 1 > d || 1 > a) &&
                      2 != P[a + 1][d] &&
                      a) ||
                      1 > a) &&
                    ((q[a][d - 1].a.style.opacity = "0.2"),
                      S.f(q[a][d - 1].canvas, "<", 10),
                      (q[a][d - 1].l.style.opacity = "0.2")),
                    2 != P[a][d - 1] &&
                    d &&
                    -1 == q[a][d - 1].a.className.indexOf("green") &&
                    (q[a][d - 1].a.className += " r"));
              } catch (l) { }
          q[K][I].a.style.borderRadius = "0";
          q[K][I].a.addEventListener("click", Ja);
          q[K][I].a.style.cursor = "pointer";
          0 < K &&
            mb(
              q[K - 1][I],
              P[K - 1][I]
                ? 2 == P[K - 1][I]
                  ? ["i", "="]
                  : ["w", "_"]
                : ["t", "^"],
              "borderBottomLeftRadius",
              "borderBottomRightRadius"
            );
          K < m - 1 &&
            mb(
              q[K + 1][I],
              P[K + 1][I]
                ? 2 == P[K + 1][I]
                  ? ["m", "="]
                  : ["z", "_"]
                : ["b", "`"],
              "borderTopLeftRadius",
              "borderTopRightRadius"
            );
          0 < I &&
            mb(
              q[K][I - 1],
              P[K][I - 1]
                ? 2 == P[K][I - 1]
                  ? ["j", "="]
                  : ["a", "_"]
                : ["l", "<"],
              "borderBottomRightRadius",
              "borderTopRightRadius"
            );
          I < k - 1 &&
            4 > P[K][I + 1] &&
            mb(
              q[K][I + 1],
              P[K][I + 1]
                ? 2 == P[K][I + 1]
                  ? ["k", "="]
                  : ["s", "_"]
                : ["r", ">"],
              "borderBottomLeftRadius",
              "borderTopLeftRadius"
            );
        }
        lb(c);
      } else
        Y(function () {
          5 > F && F++;
          B[G] = parseInt(A / 2);
          ja[G] = y;
          ia += y;
          var a = " Next Stage||";
          if (12 == G || ea)
            if (ea) {
              ea = !1;
              var b =
                "Well Done !\r\rCustom stage confirmed and ready for\ra challenge !\r";
              $a(b, " Tweet ");
            }
          M.length <= G + (ra.s13 ? 1 : 2) && (a = " Share on Twitter ");
          b ||
            ((b =
              (G
                ? (G >= M.length - 1 ? "Game complete !\r" : "Victory !\r") +
                "\rStage " +
                (G + 1) +
                " cleared !  " +
                (3 == L
                  ? B[G] <= N[G]
                    ? "Incredible !"
                    : "Impressive !"
                  : 2 == L
                    ? "Excellent !"
                    : "Good Job.") +
                "\r" +
                (A / 2 > (G ? N[G - 1] : 0)
                  ? "Turns " +
                  parseInt(A / 2 - (G ? N[G - 1] : 0)) +
                  " (|minimum " +
                  (G ? N[G] - N[G - 1] : N[0]) +
                  "|)"
                  : "") +
                "\rFrags " +
                y +
                " (|" +
                L +
                " unit" +
                (1 < L ? "s" : "") +
                " alive, casualt" +
                (1 == L ? "ies " : "y ") +
                (3 - L) +
                "|)   "
                : "Tutorial complete|!\r\rTo get bonus, clear every stage\rperfectly with minimum moves possible.\rGood Luck!") +
              "\r\r" +
              (1 < L
                ? " +|" +
                ((B[G] <= N[G] ? 50 : 0) + (3 <= L ? 50 : 2 == L ? 25 : 0)) +
                " pts.||bonus !"
                : "no bonus.")),
              $a(b, a));
          if (!O[G]) O[G] = 0;
          if (
            parseInt(O[G]) < L ||
            parseInt(O[G].substr(2, 2), 16) > parseInt(A / 2)
          )
            (b = parseInt(A / 2).toString(16)),
              (a = (16 < y ? 16 : y).toString(16)),
              1 == b.length && (b = "0" + b),
              (O[G] = L + "." + b + a),
              n || (Ba(G), G++, -1 == O[G] && (O[G] = 0));
          y = 0;
          Za(1);
        }, R(5));
    else
      (ma = A),
        U.o(),
        Y(function () {
          $a(
            "\rYou need at least one Ally to claim\rany newly conquered territories|!\r\r",
            " Restart "
          );
        }, R(5));
  }
}
function lb(b) {
  T.b(area, 2 * E, { alpha: 1 }, b);
  V(area, 1);
}
function mb(b, c, a, d) {
  b.a.id = c[0];
  b.a.style.cursor = "pointer";
  b.a.className += " g";
  T.b(b.a, 0, { alpha: 1 });
  b.a.style[a] = "0";
  b.a.style[d] = "0";
  S.f(b.canvas, c[1], 10);
  S.f(b.u, c[1], 10, -1 < b.a.className.indexOf("red") ? "#611" : "#242");
  W(b.a.parentNode, !0);
  b.a.addEventListener("click", Ja);
}
function Ja(b) {
  D = !0;
  X(area);
  z = "allies";
  Z(P, Za);
  P[K][I] = 0;
  b = b.target.id;
  var c = I,
    a = K,
    d = "left",
    e = "right";
  -1 < "jla".indexOf(b)
    ? (c += -1)
    : -1 < "krs".indexOf(b)
      ? ((c += 1), (d = "right"), (e = "left"))
      : -1 < "itw".indexOf(b)
        ? ((a += -1), (d = "top"), (e = "bottom"))
        : ((a += 1), (d = "bottom"), (e = "top"));
  switch (b) {
    case "j":
    case "k":
    case "i":
    case "m":
      U.m(), (P[K][I] = P[a][c]), nb(q[a][c], e);
    case "l":
    case "r":
    case "t":
    case "b":
      U.e();
    case "a":
    case "s":
    case "w":
    case "z":
      3 < P[a][c] && 8 > P[a][c] && (U.h(36), y++, nb(q[a][c], "center"));
      P[a][c] = 1;
      nb(q[K][I], d);
      break;
    default:
      U.x(), (P[K][I] = 1);
  }
  T.b(q[K][I].g, E, { alpha: 1 });
  Y(function () {
    X(area);
    Z(P, cb);
  }, R(2.25));
  D &&
    Y(function () {
      D = !1;
    }, R(15));
}
function nb(b, c) {
  var a = E * ("0.74" == b.a.style.opacity ? 0.75 : 2);
  dirs = {
    top: [{ y: -t }, { y: 2 * -t }],
    left: [{ x: -r }, { x: 2 * -r }],
    right: [{ x: r }, { x: r }],
    bottom: [{ y: t }, { y: 2 * t }],
    center: [{ alpha: 0 }, { alpha: 0 }],
  };
  window.requestAnimationFrame(function () {
    T.b(b.a, a, dirs[c][0]);
    T.b(b.l, a, dirs[c][1]);
  });
}
function cb() {
  ka = !1;
  D = !0;
  for (var b = [], c = 0; c < m; c++) {
    b.push([]);
    for (var a = 0; a < k; a++) b[c].push(0);
  }
  for (c = 0; c < m; c++)
    for (a = 0; a < k; a++) {
      if (2 == P[c][a] && "allies" == z)
        if (((P[c][a] = 0), nb(q[c][a], "top"), 0 < c))
          1 == P[c - 1][a] && ((P[c][a] = 1), U.m(), nb(q[c - 1][a], "bottom")),
            3 < P[c - 1][a] &&
            8 > P[c - 1][a] &&
            (U.h(36), U.e(), y++, nb(q[c - 1][a], "center")),
            (P[c - 1][a] = 2);
        else {
          if (1 == P[m - 1][a]) P[0][a] = 1;
          else if (2 == P[m - 1][a] || 3 == P[m - 1][a])
            1 == P[m - 2][a]
              ? ((P[0][a] = 1), (b[m - 2][a] = 2))
              : 2 == P[m - 2][a] &&
              1 >= P[m - 3][a] &&
              ((P[0][a] = 1), (b[m - 3][a] = 2));
          b[m - 1][a] = 3;
        }
      if ((4 == P[c][a] && "opp" == z) || (5 == P[c][a] && "foes" == z)) {
        var d = P[c][a],
          e = 5 == d ? 4 : 5;
        P[c][a] = 0;
        nb(q[c][a], "left");
        if (0 < a)
          P[c][a - 1] == e && ((P[c][a] = e), U.m(), nb(q[c][a - 1], "right")),
            0 < P[c][a - 1] &&
            4 > P[c][a - 1] &&
            (U.w(), U.e(), nb(q[c][a - 1], "center")),
            (P[c][a - 1] = d);
        else if (5 == d) b[c][k - 1] = 6;
        else {
          ma = A;
          U.o();
          Y(function () {
            $a(
              "\rYou must prevent the enemy captain\rfrom reaching the battle horizon.\r\r",
              " Restart "
            );
          }, R(5));
          return;
        }
      } else 6 == P[c][a] && "foes" == z && U.i();
    }
  for (c = 0; c < m; c++)
    for (a = 0; a < k; a++)
      3 == b[c][a] && "allies" == z
        ? (P[c][a] = 2)
        : 6 == b[c][a] && "foes" == z && (P[c][a] = 5);
  "allies" == z && U.h(8);
  (("opp" == z && -1 < na) || "foes" == z) && U.e();
  Y(function () {
    X(area);
    (("opp" == z && -1 < na) || "foes" == z) && U.h(-8);
    ("foes" != z && "allies" != z) || A++;
    z =
      "allies" == z ? (-1 < na ? "opp" : "foes") : "opp" == z ? "foes" : "plr";
    "foes" == z || ("opp" == z && -1 < na) ? (Za(), Z(P, cb)) : Z(P, Za);
  }, R(2.25));
  D &&
    Y(function () {
      D = !1;
    }, R(10));
}
function $a(b, c, a, d) {
  X(h);
  X(messtxt);
  mess.removeEventListener("click", ob);
  T.b(messtxt, E, { alpha: 1, x: 8 });
  V(messtxt, 1);
  S.c(messtxt, b, a || 5, d || 12);
  W(mess, !0);
  mess.className = "c mess " + (c ? "l" : "t");
  h.parentNode.style.visibility = c ? "visible" : "hidden";
  mess.style.width = (c ? 920 : T.j(messtxt, "width") + 60) + "px";
  mess.style.top = c ? "0" : "26px";
  mess.style.cursor = c ? "default" : "pointer";
  mess.style.height = T.j(messtxt, "height") + (c ? 60 : -40) + "px";
  c
    ? ((h.id = c
      .split("|")
      .join("")
      .split("!")
      .join("")
      .replace(/\s/g, "")
      .toLowerCase()),
      "nextstage" == h.id ? U.C() : "prepare" == h.id ? U.i() : U.v(),
      S.c(h, c, 5),
      T.b(fade, E, { alpha: 0.75 }))
    : mess.addEventListener("click", ob);
  T.b(mess, 2 * E, { alpha: c ? 0.95 : 0.75 });
}
function ob() {
  var b = parseInt(mess.style.width);
  T.b(mess, 2 * E, {
    height: 100 > b ? T.j(messtxt, "height") : 60,
    width: 100 > b ? T.j(messtxt, "width") + 40 : 80,
  });
  T.b(messtxt, 2 * E, { alpha: 100 > b ? 1 : 0, x: 100 > b ? 8 : -120 });
  V(messtxt, 100 > b ? 1 : 0.1);
}
function Za(b, c) {
  b || (b = 0);
  var a = ["plr", "allies", "opp", "foes"],
    d = [
      "Plr >",
      "Ally >",
      -1 < na ? "Opp >" : "-|-|-|>",
      0 < oa ? (1 < oa ? "Foes >" : "||Foe |> ") : " -|-|-||>||",
    ];
  d.push(d[0]);
  d.push(d[1]);
  d.push(d[2]);
  d.push(d[3]);
  X(f);
  var e = (w = 0);
  for (i = 0; i < O.length; i++)
    i < G + b && (w += 2 > O[i] ? 0 : 3 > O[i] ? 25 : 50);
  for (i = 0; i < B.length; i++)
    0 < O[i] && ((e += 2 * N[i]), i < G + b && (w += B[i] <= e ? 50 : 0));
  w += 10 * (ia + y);
  S.c(
    f,
    (
      (1 == L ? "[ |-  - " : 2 == L ? "[|[ |-|" : "[[[") +
      "  stage " +
      ((10 > G + 1 - b ? "0" : "") + (0 < G ? G + 1 : 1)) +
      "   frags " +
      (10 > ia + y ? "0" : "") +
      (ia + y) +
      "  ||turns " +
      (20 > A + b ? "00" : 200 > A + b ? "0" : "") +
      parseInt((A + b) / 2) +
      "   score |" +
      (999 < w ? w : 99 < w ? "0" + w : 9 < w ? "00" + w : "000" + w) +
      "  |=>|" +
      (c
        ? "> >||  get ready !!!  ||< <|<"
        : d[a.indexOf(z)] +
        d[a.indexOf(z) + 1] +
        d[a.indexOf(z) + 2] +
        d[a.indexOf(z) + 3])
    ).toUpperCase() + "=",
    2
  );
}
function hb() {
  var b = G,
    c = O[G];
  n &&
    (2 != p && Q("m", p),
      5 != E && Q("a", E),
      Q("l" + b, c),
      Q("l", -1 == G ? 0 : b + 1.5),
      window.location.reload());
}
function Q(b, c) {
  n && window.history.replaceState("", "", pb(b, c));
}
function Ca() {
  B = wa.slice();
  ja = wa.slice();
  O = va.slice();
  O[0] = 0;
  P = null;
  G = -1;
  A = y = ia = 0;
}
function pb(b, c) {
  var a = "";
  var d = window.location.href.split("?");
  var e = d[0],
    g = d[1],
    l = "";
  if (g) {
    var C = g.split("#");
    d = C[0];
    (C = C[1]) && (g = d);
    d = g.split("&");
    for (i = 0; i < d.length; i++)
      d[i].split("=")[0] != b && ((a += l + d[i]), (l = "&"));
  } else (C = e.split("#")), (d = C[0]), (C = C[1]), d && (e = d);
  C && (c += "#" + C);
  return e + "?" + a + (l + "" + b + "=" + c);
}
function La() {
  p += 1;
  2 < p && (p = 0);
  Q("m", p);
  Ma();
  U.i();
}
function Y(b, c) {
  function a() {
    F &&
      ((e = parseInt(performance.now())),
        e - d < c ? window.requestAnimationFrame(a) : b());
  }
  var d = parseInt(performance.now()),
    e;
  a();
}
var qb = (function (b) {
  return function () {
    for (i = 0; i < arguments.length; i++) arguments[i] && b(arguments[i], i);
  };
})(function (b) {
  b.parentNode && b.parentNode.removeChild(b);
});
function X(b) {
  for (; b.firstChild;) qb(b.firstChild);
}
var U = (function () {
  function b(b, g, l, C, fa, sa) {
    function e() {
      ha.stop();
    }
    var ha = c.createOscillator();
    ha.frequency.value = b;
    ha.type = a[sa || 0];
    var Ea = c.createGain();
    Ea.gain.value = 0;
    ha.connect(Ea);
    Ea.connect(c.destination);
    ha.start();
    var Fa = 0,
      x = setInterval(function () {
        ha.frequency.value = b + g * Fa;
        Ea.gain.value = (1 - Fa / C) * fa * d;
        Fa++;
        Fa > C && (clearInterval(x), setTimeout(e, 2 * (l + C)));
      }, l);
  }
  var c = new (window.AudioContext || window.webkitAudioContext)(),
    a = ["square", "sawtooth", "triangle", "sine"],
    d = 1;
  return {
    I: b,
    G: function () {
      return _volume;
    },
    J: function (a) {
      d = a;
    },
    A: function () {
      b(-120, 25, 25, 30, 0.01 * p, 1);
      b(240, -45, 35, 20, 0.02 * p, 2);
      setTimeout(function () {
        b(45, 50, 25, 25, 0.02 * p, 2);
      }, 150);
      setTimeout(function () {
        b(25, 40, 35, 18, 0.01 * p, 2);
      }, 260);
    },
    i: function () {
      b(420, 6, 15, 10, 0.01 * p, 3);
    },
    x: function () {
      b(100, -2, 5, 15, 0.01 * p, 1);
      b(100, -15, 15, 15, 0.05 * p, 2);
    },
    e: function () {
      b(100, -5, 20, 15, 0.01 * p, 1);
      b(100, -5, 25, 25, 0.1 * p, 3);
    },
    v: function () {
      function a(a) {
        setTimeout(function () {
          b(150 - 0.75 * a, -15, 15, 10, (0.03 - a / 1e4) * p, 2);
          b(320, 5, 15, 5, (0.04 - a / 8e3) * p, 3);
        }, a);
      }
      a(10);
      a(140);
      a(280);
    },
    C: function () {
      function c(c, d, e, g) {
        setTimeout(function () {
          b(d, 0, e, g, 0.02 * p, 2);
          b(d, 0, e, g, 0.02 * p, 3);
          b(2 * d, 0, e, g / 2, 0.003 * p);
          b(2 * d, 0, e, g / 2, 0.005 * p, 1);
        }, c);
      }
      c(5, 150, 20, 12);
      c(140, 150, 20, 12);
      c(280, 150, 20, 12);
      c(400, 198, 20, 15);
      c(675, 178, 25, 12);
      c(780, 198, 50, 20);
    },
    h: function (a) {
      function c(c) {
        setTimeout(function () {
          b(100, a, 15, 15, (0.06 - c / 8e3) * p, 3);
        }, c);
      }
      b(125, a, 15, 25, 0.01 * p, 1);
      c(50);
      c(140);
      c(230);
      c(320);
      c(400);
    },
    o: function () {
      function a() {
        b(100, -2, 10, 25, 0.2 * p, 2);
      }
      a();
      setTimeout(a, 120);
      setTimeout(a, 220);
      setTimeout(function () {
        b(92, -2, 15, 25, 0.2 * p, 2);
      }, 340);
    },
    w: function () {
      setTimeout(function () {
        b(100, -2, 10, 25, 0.1 * p, 2);
      }, 180);
      setTimeout(function () {
        b(120, -5, 15, 25, 0.1 * p, 2);
      }, 60);
      b(110, -10, 20, 15, 0.01 * p);
    },
    m: function () {
      b(160, 20, 25, 25, 0.01 * p, 3);
      b(200, 40, 25, 15, 0.01 * p, 2);
      b(160, 40, 20, 20, 0.01 * p, 1);
    },
  };
})(),
  S = (function () {
    function b(a, b, e, g) {
      parseInt(b) || (b = b.charCodeAt(0));
      g || (g = "white");
      e || (e = 1);
      var l = a.nodeName.toLowerCase();
      l = "canvas" == l ? a : document.createElement("canvas");
      l.width = e * d[b];
      l.height = 10 * e;
      c(l, b, e, g);
      l != a && a.appendChild(l);
      return l;
    }
    function c(b, c, d, g) {
      b = b.getContext("2d");
      b.fillStyle = g;
      if (a[c])
        for (e = 0; e < a[c].length; e++)
          4 == a[c][e].length
            ? ((C = a[c][e][3]), (fa = 1))
            : ((fa = 3 == a[c][e].length ? a[c][e][2] : 1), (C = 1)),
            b.beginPath(),
            b.rect(
              a[c][e][0] * d || 0,
              ((a[c][e][1] || 0) + 1) * d,
              fa * d,
              C * d
            ),
            b.fill();
    }
    var a = [
      [
        [, , , 5],
        [, 6],
      ],
      [],
      [],
      [[, 2, 2], [2, 1], [3], [4, , , 7], [3, 6], [2, 5], [, 4, 2], [, 3]],
      [],
      [],
      [[, , , 2]],
      [[, 2, , 3], [1, 1], [1, 5], [2], [2, 6]],
      [[2, 2, , 3], [1, 1], [1, 5], [], [, 6]],
      [
        [, 2],
        [, 4],
        [1, 3, 3],
        [2, 1, , 5],
        [4, 2],
        [4, 4],
      ],
      [
        [, 3, 5],
        [2, 1, , 5],
      ],
      [
        [1, 6, , 2],
        [, 8],
      ],
      [[, 3, 5]],
      [[, 6]],
      [],
      [
        [1, , 3],
        [, 1, , 5],
        [1, 6, 3],
        [4, 1, , 5],
        [1, 4],
        [2, 3],
        [3, 2],
      ],
      [
        [1, 1],
        [2, , , 6],
        [1, 6, 3],
      ],
      [
        [, 1],
        [1, , 3],
        [4, 1, , 2],
        [3, 3],
        [2, 4],
        [1, 5],
        [, 6, 5],
      ],
      [
        [, 1],
        [1, , 3],
        [4, 1, , 2],
        [4, 4, , 2],
        [, 5],
        [1, 6, 3],
        [2, 3, 2],
      ],
      [
        [, 3],
        [1, 2],
        [2, 1],
        [, 4, 5],
        [3, , , 7],
      ],
      [
        [, , 5],
        [, 1],
        [, 2, 4],
        [4, 3, , 3],
        [, 5],
        [1, 6, 3],
      ],
      [
        [1, , 3],
        [4, 1],
        [, 1, , 5],
        [1, 6, 3],
        [1, 3, 3],
        [4, 4, , 2],
      ],
      [
        [, , 5],
        [4, 1, , 2],
        [3, 3, , 2],
        [2, 5, , 2],
      ],
      [
        [1, , 3],
        [, 1, , 2],
        [4, 1, , 2],
        [, 4, , 2],
        [4, 4, , 2],
        [1, 3, 3],
        [1, 6, 3],
      ],
      [
        [1, , 3],
        [, 1, , 2],
        [1, 3, 3],
        [4, 1, , 5],
        [1, 6, 3],
        [, 5],
      ],
      [
        [, 1],
        [1, 2],
        [2, 3],
        [3, 5],
        [3, 4, 2],
        [5, , 3],
        [5, 1, 3],
        [5, -1],
        [9, 5],
        [5, 3, 5],
        [6, 4, 3],
        [6, 5, 3],
        [5, 6],
        [7, 6, 2],
        [4, 7, 2],
        [8, 7, 3],
      ],
      [],
      [
        [4, 3],
        [5, 2],
        [5, 4],
        [6, 1],
        [6, 5],
      ],
      [
        [1, -1, 3],
        [],
        [4, , 2],
        [6, 1, 2],
        [7, 2, 2],
        [10, 2, , 2],
        [8, 4, 3],
        [11, 5],
        [11, 7],
        [1, 3, , 2],
        [, 2],
        [2, 3],
        [3, 5],
        [4, 6, 2],
        [6, 7, 2],
        [8, 8, 3],
      ],
      [
        [6, 3],
        [5, 2],
        [5, 4],
        [4, 1],
        [4, 5],
      ],
      [
        [, 1],
        [1, , 3],
        [4, 1, , 2],
        [3, 3],
        [2, 4],
        [2, 6],
      ],
      [
        [2, , 4],
        [, 2, , 4],
        [7, 2, , 4],
        [2, 7, 4],
        [3, 2, 2],
        [2, 3, , 2],
        [3, 5, 2],
        [1, 1],
        [6, 1],
        [1, 6],
        [6, 6],
      ],
      [
        [, 1, , 6],
        [4, 1, , 6],
        [1, , 3],
        [, 3, 4],
      ],
      [
        [, , 4],
        [, , , 7],
        [, 3, 4],
        [, 6, 4],
        [4, 1, , 2],
        [4, 4, , 2],
      ],
      [
        [1, , 3],
        [, 1, , 5],
        [1, 6, 3],
        [4, 5],
        [4, 1],
      ],
      [
        [, , , 7],
        [, , 4],
        [, 6, 4],
        [4, 1, , 5],
      ],
      [
        [, , 5],
        [, 3, 4],
        [, 6, 5],
        [, , , 7],
      ],
      [
        [, , 5],
        [, 3, 4],
        [, , , 7],
      ],
      [
        [1, , 3],
        [, 1, , 5],
        [1, 6, 3],
        [4, 5],
        [3, 4, 2],
        [4, 1],
      ],
      [
        [, , , 7],
        [4, , , 7],
        [1, 3, 3],
      ],
      [
        [, , 3],
        [, 6, 3],
        [1, 1, , 5],
      ],
      [
        [4, , , 6],
        [1, 6, 3],
        [, 5],
      ],
      [[, , , 7], [1, 3], [2, 2], [2, 4], [3, 1], [4], [3, 5], [4, 6]],
      [
        [, , , 7],
        [1, 6, 4],
      ],
      [
        [, , , 7],
        [1, 2],
        [3, 2],
        [2, 3],
        [4, , , 7],
      ],
      [
        [, , , 7],
        [1, 2],
        [2, 3],
        [3, 4],
        [4, , , 7],
      ],
      [
        [1, , 3],
        [, 1, , 5],
        [1, 6, 3],
        [4, 1, , 5],
      ],
      [
        [, , , 7],
        [, , 4],
        [, 3, 4],
        [4, 1, , 2],
      ],
      [
        [1, , 3],
        [, 1, , 5],
        [1, 6, 3],
        [4, 1, , 5],
        [4, 7],
      ],
      [
        [, , , 7],
        [, , 4],
        [, 3, 4],
        [4, 1, , 2],
        [4, 4, , 3],
      ],
      [
        [1, , 4],
        [, 1, , 2],
        [1, 3, 3],
        [4, 4, , 2],
        [, 6, 4],
      ],
      [
        [, , 5],
        [2, , , 7],
      ],
      [
        [, , , 6],
        [1, 6, 3],
        [4, , , 6],
      ],
      [
        [, , , 3],
        [4, , , 3],
        [1, 3, , 2],
        [3, 3, , 2],
        [2, 5, , 2],
      ],
      [
        [, , , 7],
        [1, 5],
        [2, 4],
        [3, 5],
        [4, , , 7],
      ],
      [
        [, , , 2],
        [4, , , 2],
        [, 5, , 2],
        [4, 5, , 2],
        [1, 2],
        [3, 2],
        [2, 3],
        [1, 4],
        [3, 4],
      ],
      [
        [, , , 2],
        [4, , , 2],
        [1, 2],
        [3, 2],
        [2, 3, , 4],
      ],
      [
        [, , 5],
        [, 6, 5],
        [, 5],
        [1, 4],
        [2, 3],
        [3, 2],
        [4, 1],
      ],
      [
        [4, , 3],
        [4, 1, 3],
        [5, -1],
        [8, 2, 3],
        [0, 2],
        [1, 3],
        [8, 4, 3],
        [9, 5],
        [2, 4],
        [3, 3, 8],
        [4, 4, 3],
        [4, 5, 3],
        [3, 6],
        [7, 6],
        [2, 7, 2],
        [7, 7, 2],
      ],
      [],
      [],
      [
        [3, 4],
        [4, 3],
        [5, 2],
        [6, 3],
        [7, 4],
      ],
      [
        [5, 7, 2],
        [6, 6],
        [9, 3, 2],
        [8, 4, 2],
        [7, 5, 4],
        [8, 6, 2],
        [9, 7, 2],
        [1, 7, 2],
        [3, 6, 2],
        [5, 5],
        [6, 4],
        [7, 2, , 2],
        [8, , , 3],
        [10, 2],
        [, 4, 3],
        [1, 3, 2],
        [1, 2, 2],
        [5, -1],
        [7, -1, , 2],
        [3],
      ],
      [
        [3, 2],
        [4, 3],
        [5, 4],
        [6, 3],
        [7, 2],
      ],
      [
        [1, 2, 2],
        [1, 4, 2],
        [1, 6, 2],
        [, 5],
        [3, 3, , 4],
      ],
      [
        [, , , 7],
        [, 2, 3],
        [, 6, 3],
        [3, 3, , 3],
      ],
      [
        [, 3, , 3],
        [1, 2, 2],
        [1, 6, 2],
        [3, 3],
        [3, 5],
      ],
      [
        [3, , , 7],
        [1, 2, 2],
        [1, 6, 2],
        [, 3, , 3],
      ],
      [
        [1, 2, 2],
        [, 3, , 3],
        [1, 6, 2],
        [3, 3],
        [, 4, 4],
      ],
      [[1, 1, , 6], [, 3, 3], [2]],
      [
        [1, 2, 2],
        [, 3, , 3],
        [1, 6, 2],
        [3, 2, , 6],
        [1, 8, 2],
      ],
      [
        [, , , 7],
        [, 2, 3],
        [3, 3, , 4],
      ],
      [[1, 2, , 5], [1], [, 2]],
      [[1, 2, , 5], [1], [, 2], [, 7]],
      [
        [, , , 7],
        [1, 4],
        [2, 3],
        [2, 5],
        [3, 2],
        [3, 6],
      ],
      [
        [, , , 6],
        [1, 6],
      ],
      [
        [, 2, , 5],
        [2, 3, , 4],
        [4, 3, , 4],
        [, 2, 4],
      ],
      [
        [, 2, , 5],
        [3, 3, , 4],
        [, 2, 3],
      ],
      [
        [1, 2, 2],
        [, 3, , 3],
        [1, 6, 2],
        [3, 3, , 3],
      ],
      [
        [, 2, 3],
        [, 2, , 7],
        [, 6, 3],
        [3, 3, , 3],
      ],
      [
        [1, 2, 2],
        [3, 2, , 7],
        [1, 6, 2],
        [, 3, , 3],
      ],
      [
        [, 2, , 5],
        [1, 3],
        [2, 2, 2],
      ],
      [
        [1, 2, 3],
        [1, 4, 2],
        [, 6, 3],
        [, 3],
        [3, 5],
      ],
      [
        [1, , , 6],
        [, 2, 3],
        [2, 6],
      ],
      [
        [, 2, , 4],
        [1, 6, 2],
        [3, 2, , 4],
      ],
      [
        [, 2, , 5],
        [3, 2, , 3],
        [1, 6],
        [2, 5],
      ],
      [
        [, 2, , 4],
        [2, 2, , 4],
        [4, 2, , 4],
        [1, 6],
        [3, 6],
      ],
      [
        [, 2, , 2],
        [1, 4, 2],
        [3, 2, , 2],
        [, 5, , 2],
        [3, 5, , 2],
      ],
      [
        [, 2, , 4],
        [1, 6, 2],
        [3, 2, , 6],
        [1, 8, 2],
      ],
      [
        [, 2, 4],
        [3, 3],
        [1, 4, 2],
        [, 5],
        [, 6, 4],
      ],
      [
        [, 2],
        [1, 3],
        [2, 4],
        [, 4],
        [2, 2],
      ],
      [],
      [
        [2, 2, , 3],
        [1, 1],
        [1, 5],
      ],
    ],
      d = [],
      e,
      g,
      l,
      C,
      fa;
    for (e = 0; 33 > e; e++) a.unshift([]);
    a[59] = a[58].slice();
    a[93] = a[91].slice();
    for (e = 0; e < a.length; e++)
      124 == e
        ? d.push(0)
        : 33 == e || 39 == e || 46 == e
          ? d.push(1)
          : -1 < [32, 44, 105, 106, 108].indexOf(e)
            ? d.push(2)
            : -1 < [40, 41, 73, 102, 116, 123, 125, 92].indexOf(e)
              ? d.push(3)
              : 96 < e && 109 != e && 119 != e
                ? d.push(4)
                : (90 < e && 97 > e && 92 != e) || (57 < e && 63 > e) || 38 == e
                  ? d.push(12)
                  : 64 == e
                    ? d.push(8)
                    : d.push(5);
    return {
      K: a,
      f: b,
      F: c,
      c: function (a, c, d, e, C) {
        var x = c.split("\r"),
          J = [];
        for (l = 0; l < x.length; l++)
          for (J.push(0), g = 0; g < x[l].length; g++)
            (c = b(a, x[l].charCodeAt(g), d, C)),
              (c.style.position = "absolute"),
              (c.style.left = J[l] + "px"),
              (c.style.top = l ? l * d * 10 + (l * e || 0) + "px" : 0),
              Xa(c),
              (J[l] += c.width + d);
        a.style.width = Math.max.apply(this, J) + "px";
        a.style.height = x.length * d * 10 + (x.length * e || 0) + "px";
      },
    };
  })(),
  T = (function () {
    function b(b, d, sa, ab, ha) {
      function C() {
        if (!a) {
          ta += 1;
          for (x = 0; x < H.length; x++)
            H[x].start == H[x].end
              ? (la = H[x].end)
              : ((J =
                H[x].start > H[x].end
                  ? H[x].end + ((H[x].start - H[x].end) / d) * (d - ta)
                  : H[x].start - ((H[x].start - H[x].end) / d) * ta),
                (la = ta >= d ? H[x].end : J)),
              H[x].s != e[1] && (la += "px"),
              -1 < e.indexOf(H[x].s) && (b.style[H[x].s] = la);
          if (ta >= d)
            return (
              "0" == b.style.opacity && (b.style.visibility = "hidden"),
              fa(b),
              void (ab && ab.apply(this, ha))
            );
        }
        -1 < (x = g.indexOf(b)) && (l[x] = requestAnimationFrame(C));
      }
      function fa(a) {
        var b;
        a && (b = a ? g.indexOf(a) : g.length);
        -1 < b && (cancelAnimationFrame(l.splice(b, 1)), g.splice(b, 1));
      }
      var x,
        J,
        la,
        ta = 0,
        H = [];
      for (J in sa)
        -1 < e.indexOf(J) &&
          ((la = "x" == J ? e[2] : "y" == J ? e[3] : J == e[0] ? e[1] : J) ==
            e[1] &&
            0 < sa[J] &&
            ("hidden" == b.style.visibility && (b.style.opacity = "0"),
              (b.style.visibility = "visible")),
            H.push({ s: la, start: c(b, la), end: sa[J] }));
      fa(b);
      H.length && (l.push(requestAnimationFrame(C)), g.push(b));
    }
    function c(a, b) {
      return (
        1 *
        (
          window.getComputedStyle(a, null).getPropertyValue(b).match(d) || [0]
        ).map(function (a) {
          return 1 * a;
        })
      );
    }
    var a,
      d = /[+-]?\d+(\.\d+)?/g,
      e = "alpha opacity left top right bottom width height x y".split(" "),
      g = [],
      l = [];
    return {
      b: function (a, c, d, e) {
        b(a, c, d, e, Array.apply(null, arguments).slice(4));
      },
      L: g,
      j: c,
    };
  })();
