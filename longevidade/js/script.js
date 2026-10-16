/* ============================================================
   Centro de Longevidade Einstein — site v2 (15/10/2026)
   Comportamento mínimo e sereno: revelações discretas por
   IntersectionObserver, nada de scroll-hijack nem libs externas.
   ============================================================ */

(function () {
  "use strict";

  // ===== O PORTAL: a travessia de entrada (1x por sessão) =====
  // Warp de estrelas nas cores dos 3Ms, anéis do portal e as palavras do
  // método atravessando o túnel. Qualquer gesto (clique/tecla/scroll) acelera
  // e desvanece para o site. prefers-reduced-motion pula direto.
  (function () {
    var intro = document.getElementById("portal-intro");
    if (!intro) { document.body.classList.remove("traveling"); return; }
    var reduz = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var jaFez = false;
    try { jaFez = sessionStorage.getItem("travessia") === "1"; } catch (e) {}
    var pula = location.search.indexOf("semportal") >= 0;
    var forca = !pula && location.search.indexOf("portal") >= 0;
    if ((jaFez && !forca) || reduz || pula) {
      intro.remove();
      document.body.classList.remove("traveling");
      return;
    }

    var cv = document.getElementById("portal-warp");
    var ctx = cv.getContext("2d");
    var W, H, CX, CY, speed = 0.011, ligado = true;
    function fit() { W = cv.width = window.innerWidth; H = cv.height = window.innerHeight; CX = W / 2; CY = H / 2; }
    fit();
    window.addEventListener("resize", fit);

    // papel, azul M¹, verde M², bronze M³
    var CORES = ["245,243,236", "245,243,236", "143,194,255", "127,214,189", "235,184,118"];
    function mkEstrela() { return { x: Math.random() * 2 - 1, y: Math.random() * 2 - 1, z: Math.random() * 0.9 + 0.1, c: CORES[Math.floor(Math.random() * CORES.length)] }; }
    var estrelas = [];
    for (var i = 0; i < 240; i++) estrelas.push(mkEstrela());

    // o mantra em ONDAS: vários "M¹ Medir" juntos, depois vários "M² Mapear",
    // depois vários "M³ Modular" — sempre a mesma palavra na onda, sempre na ordem
    var PALAVRAS = ["M¹ Medir", "M² Mapear", "M³ Modular"];
    var CORES_M = ["143,194,255", "127,214,189", "235,184,118"];
    // cada palavra aproxima devagar, PARA nítida por ~1s (momento de leitura) e sai
    var TAM_ONDA = 3, GAP_SPAWN = 620, GAP_ONDA = 750;
    var onda = 0, porSpawnar = TAM_ONDA, ativos = [];
    var proximoSpawn = performance.now() + 1300;
    var ANGULOS = [-Math.PI / 2, Math.PI / 6, Math.PI * 5 / 6]; // espalhadas, sem brigar entre si

    var aneis = [], ringTimer = 0;

    function loop() {
      if (!ligado) return;
      ctx.fillStyle = "rgba(7,26,48,0.34)";
      ctx.fillRect(0, 0, W, H);
      var SC = Math.min(W, H) * 0.5;

      ringTimer++;
      if (ringTimer % (atravessou ? 7 : 44) === 0) aneis.push({ z: 0.98 }); // rajada na travessia
      aneis = aneis.filter(function (r) { return r.z > 0.02; });
      aneis.forEach(function (r) {
        r.z -= speed * r.z * 2.2;
        var rad = (1 / r.z - 1) * SC * 0.22 + 10;
        var alpha = Math.min(atravessou ? 0.34 : 0.18, (1 - r.z) * (atravessou ? 0.4 : 0.22)) * r.z;
        ctx.beginPath();
        ctx.arc(CX, CY, rad, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(23,116,222," + alpha.toFixed(3) + ")";
        ctx.lineWidth = 1.2;
        ctx.stroke();
      });

      estrelas.forEach(function (s) {
        var px = CX + s.x / s.z * SC, py = CY + s.y / s.z * SC;
        s.z -= speed * s.z;
        if (s.z <= 0.015) { var n0 = mkEstrela(); s.x = n0.x; s.y = n0.y; s.c = n0.c; s.z = 1; return; }
        var nx = CX + s.x / s.z * SC, ny = CY + s.y / s.z * SC;
        if (nx < -60 || nx > W + 60 || ny < -60 || ny > H + 60) { var n1 = mkEstrela(); s.x = n1.x; s.y = n1.y; s.c = n1.c; s.z = 1; return; }
        var al = Math.min(1, (1 - s.z) * 1.4);
        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(nx, ny);
        ctx.strokeStyle = "rgba(" + s.c + "," + (al * 0.85).toFixed(3) + ")";
        ctx.lineWidth = Math.max(0.5, (1 - s.z) * 2.1);
        ctx.stroke();
      });

      var agora = performance.now();
      if (porSpawnar > 0 && agora > proximoSpawn) {
        ativos.push({
          t: PALAVRAS[onda], c: CORES_M[onda],
          a: ANGULOS[(TAM_ONDA - porSpawnar) % 3] + (Math.random() - 0.5) * 0.5,
          r: 0.35 + Math.random() * 0.18,
          z: 0.52, fase: 0, pausaAte: 0 // nasce já fora do selo, não atrás dele
        });
        porSpawnar--;
        proximoSpawn = agora + GAP_SPAWN;
      }
      ativos = ativos.filter(function (w) {
        if (w.fase === 0) {                 // aproxima, devagar
          w.z -= speed * w.z * 0.85;
          if (w.z <= 0.3) { w.z = 0.3; w.fase = 1; w.pausaAte = agora + 1000; }
        } else if (w.fase === 1) {          // o momento de leitura: parada, nítida
          if (agora > w.pausaAte || atravessou) w.fase = 2;
        } else {                            // sai
          w.z -= speed * w.z * 3.2;
          if (w.z <= 0.07) return false;
        }
        var d = (1 / w.z - 1) * SC * 0.33 + 30;
        var x = CX + Math.cos(w.a) * d * w.r * 2.4;
        var y = CY + Math.sin(w.a) * d * w.r * 2.4;
        var fs = Math.min(40, 9 / w.z);
        var al2 = w.fase === 1 ? 1 : (w.fase === 0 ? Math.min(1, (1 - w.z) * 1.5) : Math.max(0, (w.z - 0.07) / 0.23));
        ctx.font = "italic " + fs.toFixed(1) + "px Fraunces, Georgia, serif";
        ctx.fillStyle = "rgba(" + w.c + "," + al2.toFixed(3) + ")";
        ctx.textAlign = "center";
        ctx.fillText(w.t, x, y);
        return true;
      });
      if (porSpawnar === 0 && ativos.length === 0) {
        onda = (onda + 1) % 3;        // a onda seguinte, sempre na ordem
        porSpawnar = TAM_ONDA;
        proximoSpawn = agora + GAP_ONDA;
      }

      requestAnimationFrame(loop);
    }
    loop();

    var atravessou = false;
    function atravessa() {
      if (atravessou) return;
      atravessou = true;
      speed = 0.085; // acelera o warp
      intro.classList.add("cross"); // o selo engole a tela pela boca superior
      try { sessionStorage.setItem("travessia", "1"); } catch (e) {}
      setTimeout(function () {
        intro.classList.add("out");
        document.body.classList.remove("traveling");
      }, 1150);
      setTimeout(function () { ligado = false; intro.remove(); }, 2500);
    }
    intro.addEventListener("click", atravessa);
    window.addEventListener("wheel", atravessa, { passive: true, once: true });
    window.addEventListener("touchstart", atravessa, { passive: true, once: true });
    document.addEventListener("keydown", function (e) {
      if (!atravessou && (e.key === "Enter" || e.key === " " || e.key === "ArrowDown")) atravessa();
    });
  })();

  // O fio do percurso: desce costurando as estações conforme se rola a página —
  // ligado ao scroll (passivo), não scroll-hijack; reduced-motion mostra pronto.
  var traj = document.getElementById("fio-traj");
  var trav = document.getElementById("percurso");
  if (traj && trav) {
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      traj.style.strokeDashoffset = 0;
    } else {
      var desenha = function () {
        var r = trav.getBoundingClientRect();
        var prog = (window.innerHeight * 0.85 - r.top) / r.height;
        traj.style.strokeDashoffset = 100 - Math.max(0, Math.min(1, prog)) * 100;
      };
      window.addEventListener("scroll", desenha, { passive: true });
      window.addEventListener("resize", desenha, { passive: true });
      desenha();
    }
  }

  // A passagem no fundo do site inteiro: o diagrama clássico do buraco de minhoca
  // como MALHA DE ARAME — meridianos correndo pela superfície e anéis que são
  // elipses em perspectiva. O objeto ocupa a página toda (boca em cima, garganta
  // no meio, boca embaixo) e desce-se ao longo dele. A MESMA curva dimensiona o
  // conteúdo (zigzag 440→400→380, garganta 460, pares 640→780→920).
  var fundo = document.getElementById("passagem-fundo");
  if (fundo) {
    var NSf = "http://www.w3.org/2000/svg";
    var gap = function (t, tG) {
      t = Math.max(0, Math.min(1, t));
      var d = (t - tG) / 0.18;
      return 47 - 23 * Math.exp(-d * d); // meia-largura, em % da largura da página
    };
    var malha = document.createElementNS(NSf, "g");
    fundo.appendChild(malha);
    var desenhaMalha = function () {
      var w = document.documentElement.clientWidth || window.innerWidth;
      // mede o conteúdo SEM o próprio fundo (senão o svg trava o scrollHeight
      // no maior valor já visto e a página ganha um rabo vazio no fim)
      fundo.style.height = "0px";
      var h = Math.max(document.documentElement.scrollHeight, window.innerHeight);
      fundo.setAttribute("viewBox", "0 0 " + w + " " + h);
      fundo.style.height = h + "px";
      malha.innerHTML = "";
      var cx = w / 2;
      var topo = function (el) { return el.getBoundingClientRect().top + window.scrollY; };
      // a garganta ancora na estação ENTENDER (a parte mais estreita da travessia),
      // onde quer que ela caia — o layout pode mudar, o estreito acompanha
      var ent = document.getElementById("entender");
      var tG = ent ? (topo(ent) + ent.offsetHeight / 2) / h : 0.5;
      var raio = function (t) { return gap(t, tG) / 100 * w; };
      var mk = function (tag, cls) {
        var e = document.createElementNS(NSf, tag);
        e.setAttribute("class", cls);
        malha.appendChild(e);
        return e;
      };
      // o interior do túnel: papel quente; o lado de fora fica com a cor fria do body
      var S0 = 56, kk, tt, esq = "", dir = "";
      for (kk = 0; kk <= S0; kk++) {
        tt = kk / S0;
        esq += (kk ? " L" : "M") + (cx - raio(tt)).toFixed(1) + "," + (tt * h).toFixed(1);
        dir += " L" + (cx + raio(1 - tt)).toFixed(1) + "," + ((1 - tt) * h).toFixed(1);
      }
      mk("path", "pf-interior").setAttribute("d", esq + " L" + (cx + raio(1)).toFixed(1) + "," + h + dir + " Z");
      // paralelos: anéis elípticos em perspectiva, do alto da página ao fim
      var N = 26, i, t;
      for (i = 0; i <= N; i++) {
        t = i / N;
        var rr = raio(t);
        var a = mk("ellipse", "pf-anel");
        a.setAttribute("cx", cx); a.setAttribute("cy", (t * h).toFixed(1));
        a.setAttribute("rx", rr.toFixed(1)); a.setAttribute("ry", (rr * 0.16).toFixed(1));
      }
      // meridianos: a superfície do tubo (espaçamento em seno — adensam nas bordas)
      var M = 15, S = 56, j, k;
      for (j = 0; j < M; j++) {
        var s = Math.sin((-90 + 180 * j / (M - 1)) * Math.PI / 180);
        var d = "";
        for (k = 0; k <= S; k++) {
          t = k / S;
          d += (k ? " L" : "M") + (cx + s * raio(t)).toFixed(1) + "," + (t * h).toFixed(1);
        }
        mk("path", (j === 0 || j === M - 1) ? "pf-borda" : "pf-merid").setAttribute("d", d);
      }

      // o conteúdo RESPEITA a silhueta: cada bloco é medido na sua altura real
      // e tem a largura travada ao vão do túnel ali (dentro = papel, fora = gelo,
      // nada atravessa a parede). Converge via ResizeObserver.
      var clampa = function (sel, lateral) {
        Array.prototype.forEach.call(document.querySelectorAll(sel), function (el) {
          if (w <= 860) { el.style.maxWidth = ""; return; }
          if (!el.dataset.mw) {
            var mw = parseFloat(getComputedStyle(el).maxWidth);
            el.dataset.mw = isFinite(mw) ? mw : 9999;
          }
          var r0 = el.getBoundingClientRect();
          // o vão que vale é o do PONTO MAIS ESTREITO que o bloco atravessa:
          // topo, base — e a própria garganta, se o bloco a cruzar
          var t0 = (r0.top + window.scrollY) / h;
          var t1 = (r0.top + window.scrollY + r0.height) / h;
          var half = Math.min(raio(t0), raio(t1));
          if (t0 < tG && tG < t1) half = Math.min(half, raio(tG));
          var alvo = lateral ? half - 54 : 2 * half - 72;
          el.style.maxWidth = Math.max(240, Math.min(+el.dataset.mw, alvo)) + "px";
        });
      };
      clampa(".portal,.curadoria,.garganta-inner,.sec-head.centrada,.par,.marco,.voz-inner,.faq,.prot.p-3", false);
      clampa(".prot.p-1,.prot.p-2", true);
    };
    desenhaMalha();
    window.addEventListener("resize", desenhaMalha, { passive: true });
    window.addEventListener("load", desenhaMalha);
    if (window.ResizeObserver) new ResizeObserver(desenhaMalha).observe(document.body);
  }

  // Revelação discreta dos blocos .rv ao entrarem na viewport.
  var els = document.querySelectorAll(".rv");

  if (!("IntersectionObserver" in window)) {
    // Navegador sem suporte: mostra tudo, sem efeito.
    els.forEach(function (el) { el.classList.add("in"); });
    return;
  }

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("in");
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

  els.forEach(function (el) { io.observe(el); });
})();
