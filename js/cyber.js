/* Cyber background: network nodes + falling code. Tweak the numbers below. */
(function () {
  const cv = document.getElementById("cy");
  if (!cv) return;
  if (matchMedia("(prefers-reduced-motion:reduce)").matches) {
    cv.style.display = "none";
    return;
  }
  const x = cv.getContext("2d"),
    dpr = Math.min(devicePixelRatio || 1, 2);
  const CH = "01{}<>/;$#ABCDEF".split(""),
    FS = 15,
    TRAIL = 14,
    LINK = 150; // FS = حجم الحروف | TRAIL = طول الذيل | LINK = مسافة الخطوط
  let W,
    H,
    drops,
    nodes,
    last = 0;
  function size() {
    W = innerWidth;
    H = innerHeight;
    cv.width = W * dpr;
    cv.height = H * dpr;
    x.setTransform(dpr, 0, 0, dpr, 0, 0);
    drops = Array.from({ length: Math.ceil(W / FS) }, () => ({
      y: (-Math.random() * H) / FS,
      v: 0.25 + Math.random() * 0.6,
    }));
    nodes = Array.from({ length: Math.round((W * H) / 22000) }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
    }));
  }
  function frame(t) {
    requestAnimationFrame(frame);
    if (document.hidden || t - last < 33) return;
    last = t;
    x.clearRect(0, 0, W, H);
    x.lineWidth = 1;
    for (const n of nodes) {
      n.x += n.vx;
      n.y += n.vy;
      if (n.x < 0 || n.x > W) n.vx *= -1;
      if (n.y < 0 || n.y > H) n.vy *= -1;
    }
    for (let i = 0; i < nodes.length; i++) {
      const a = nodes[i];
      for (let j = i + 1; j < nodes.length; j++) {
        const b = nodes[j],
          d = Math.hypot(a.x - b.x, a.y - b.y);
        if (d < LINK) {
          x.strokeStyle = `rgba(34,211,238,${(1 - d / LINK) * 0.28})`;
          x.beginPath();
          x.moveTo(a.x, a.y);
          x.lineTo(b.x, b.y);
          x.stroke();
        }
      }
      x.fillStyle = "rgba(0,255,168,.65)";
      x.fillRect(a.x - 1, a.y - 1, 2.5, 2.5);
    }
    x.font = FS + "px Consolas,monospace";
    drops.forEach((d, i) => {
      d.y += d.v;
      if ((d.y - TRAIL) * FS > H) {
        d.y = -Math.random() * 20;
        d.v = 0.25 + Math.random() * 0.6;
      }
      for (let k = 0; k < TRAIL; k++) {
        const row = Math.floor(d.y) - k,
          yy = (d.y - k) * FS;
        if (yy < 0 || yy > H) continue;
        x.fillStyle = k ? `rgba(0,255,168,${0.5 * (1 - k / TRAIL)})` : "rgba(190,255,235,.85)";
        x.fillText(CH[(((i * 131 + row * 31) % CH.length) + CH.length) % CH.length], i * FS, yy);
      }
    });
  }
  size();
  addEventListener("resize", size);
  requestAnimationFrame(frame);
})();
