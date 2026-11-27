// =========================================================================
// ÉCRAN RADIO DU MINI-JEU : NOVA EN HOLOGRAMME
// Un petit écran de communication dans le coin du HUD. NOVA y apparaît en
// hologramme (lignes de balayage, scintillement, parasites) et réagit à
// ce qui se passe : coup reçu, bouclier faible, bonus, boss, victoire…
// Ses yeux suivent le vaisseau. Dessiné en 2D, redessiné ~30 fois/s.
// =========================================================================

const CY = '#62f4ff';

export function createHoloNova(canvas) {
  const ctx = canvas.getContext('2d');
  const W = canvas.width;
  const H = canvas.height;
  let base = 'idle'; // humeur de fond (idle, worried, focus)
  let mood = null;
  let moodUntil = 0;
  let talkUntil = 0;
  let glitch = 0; // parasites (coup reçu, apparition)
  let lookX = 0;
  let t = 0;
  let acc = 0;
  let blinkAt = 2;
  let blinkT = 1;

  function setMood(name, seconds = 1.6) {
    mood = name;
    moodUntil = t + seconds;
    if (name === 'hurt' || name === 'surprised') glitch = Math.max(glitch, name === 'hurt' ? 1 : 0.5);
  }

  // ---- Dessin ----
  function line(width, color = CY) {
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
  }
  function eyes(kind, cx, cy, dx) {
    const ex = [cx - 26 + dx, cx + 26 + dx];
    ctx.fillStyle = CY;
    if (kind === 'blink') {
      line(5);
      ex.forEach((x) => {
        ctx.beginPath();
        ctx.moveTo(x - 9, cy);
        ctx.lineTo(x + 9, cy);
        ctx.stroke();
      });
    } else if (kind === 'happy') {
      line(5);
      ex.forEach((x) => {
        ctx.beginPath();
        ctx.arc(x, cy + 6, 10, Math.PI * 1.1, Math.PI * 1.9);
        ctx.stroke();
      });
    } else if (kind === 'angry') {
      line(5);
      [[ex[0], 1], [ex[1], -1]].forEach(([x, d]) => {
        ctx.beginPath();
        ctx.moveTo(x - 8 * d, cy - 9);
        ctx.lineTo(x + 7 * d, cy);
        ctx.lineTo(x - 8 * d, cy + 9);
        ctx.stroke();
      });
    } else if (kind === 'hurt') {
      line(5);
      ex.forEach((x) => {
        ctx.beginPath();
        ctx.moveTo(x - 7, cy - 7);
        ctx.lineTo(x + 7, cy + 7);
        ctx.moveTo(x + 7, cy - 7);
        ctx.lineTo(x - 7, cy + 7);
        ctx.stroke();
      });
    } else if (kind === 'heart') {
      ctx.fillStyle = '#ff8ad8';
      ex.forEach((x) => {
        const y = cy - 3;
        ctx.beginPath();
        ctx.moveTo(x, y + 11);
        ctx.bezierCurveTo(x - 16, y, x - 8, y - 12, x, y - 4);
        ctx.bezierCurveTo(x + 8, y - 12, x + 16, y, x, y + 11);
        ctx.fill();
      });
    } else if (kind === 'star') {
      ctx.fillStyle = '#ffe17a';
      ex.forEach((x) => {
        ctx.beginPath();
        for (let i = 0; i < 10; i++) {
          const a = -Math.PI / 2 + (i * Math.PI) / 5;
          const r = i % 2 ? 5 : 12;
          ctx.lineTo(x + Math.cos(a) * r, cy + Math.sin(a) * r);
        }
        ctx.fill();
      });
    } else if (kind === 'wide') {
      ex.forEach((x) => {
        ctx.beginPath();
        ctx.arc(x, cy, 12, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#04121a';
        ctx.beginPath();
        ctx.arc(x + dx * 0.15, cy, 4.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = CY;
      });
    } else if (kind === 'sad' || kind === 'worried') {
      ex.forEach((x) => {
        ctx.beginPath();
        ctx.ellipse(x, cy + 2, 8, 11, 0, 0, Math.PI * 2);
        ctx.fill();
      });
      line(3.5);
      [[ex[0], 1], [ex[1], -1]].forEach(([x, d]) => {
        ctx.beginPath();
        ctx.moveTo(x - 10 * d, cy - 12);
        ctx.lineTo(x + 9 * d, cy - 18);
        ctx.stroke();
      });
    } else {
      // Yeux ovales, avec reflet
      ex.forEach((x) => {
        ctx.beginPath();
        ctx.ellipse(x, cy, 9, 13, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = 'rgba(255,255,255,0.85)';
        ctx.beginPath();
        ctx.ellipse(x - 3, cy - 5, 3, 4, -0.4, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = CY;
      });
    }
    if (kind === 'focus') {
      // Sourcils froncés : concentrée
      line(3.5);
      [[ex[0], 1], [ex[1], -1]].forEach(([x, d]) => {
        ctx.beginPath();
        ctx.moveTo(x - 10 * d, cy - 19);
        ctx.lineTo(x + 9 * d, cy - 14);
        ctx.stroke();
      });
    }
  }
  function mouth(kind, cx, cy, talking) {
    ctx.fillStyle = CY;
    if (talking && kind !== 'o') {
      const open = 4 + Math.abs(Math.sin(t * 18)) * 7;
      ctx.beginPath();
      ctx.ellipse(cx, cy + 2, 9, open, 0, 0, Math.PI * 2);
      ctx.fill();
      return;
    }
    line(4);
    ctx.beginPath();
    if (kind === 'grin') {
      ctx.moveTo(cx - 13, cy - 2);
      ctx.quadraticCurveTo(cx, cy - 3, cx + 13, cy - 2);
      ctx.quadraticCurveTo(cx + 10, cy + 13, cx, cy + 13);
      ctx.quadraticCurveTo(cx - 10, cy + 13, cx - 13, cy - 2);
      ctx.fill();
      return;
    }
    if (kind === 'o') ctx.ellipse(cx, cy + 3, 5, 7, 0, 0, Math.PI * 2);
    else if (kind === 'flat') {
      ctx.moveTo(cx - 9, cy + 3);
      ctx.lineTo(cx + 9, cy + 3);
    } else if (kind === 'sad') ctx.arc(cx, cy + 12, 10, Math.PI * 1.2, Math.PI * 1.8);
    else if (kind === 'wavy') {
      for (let x = -12; x <= 12; x += 2) ctx.lineTo(cx + x, cy + 3 + Math.sin(x * 0.6 + t * 20) * 2.5);
    } else ctx.arc(cx, cy - 3, 11, Math.PI * 0.2, Math.PI * 0.8);
    ctx.stroke();
  }

  const FACES = {
    idle: ['open', 'smile'],
    focus: ['focus', 'flat'],
    worried: ['worried', 'wavy'],
    happy: ['happy', 'grin'],
    wow: ['star', 'grin'],
    love: ['heart', 'grin'],
    surprised: ['wide', 'o'],
    angry: ['angry', 'flat'],
    sad: ['sad', 'sad'],
    hurt: ['hurt', 'wavy'],
    laugh: ['happy', 'grin']
  };

  function draw() {
    ctx.clearRect(0, 0, W, H);
    // Fond de l'écran : vert-bleu très sombre avec halo du projecteur
    const bg = ctx.createRadialGradient(W / 2, H * 0.62, 4, W / 2, H * 0.62, W * 0.7);
    bg.addColorStop(0, '#0b2a36');
    bg.addColorStop(1, '#03070f');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);

    // Faisceau du projecteur, du bas vers NOVA
    const beam = ctx.createLinearGradient(0, H, 0, H * 0.35);
    beam.addColorStop(0, 'rgba(98, 244, 255, 0.35)');
    beam.addColorStop(1, 'rgba(98, 244, 255, 0)');
    ctx.fillStyle = beam;
    ctx.beginPath();
    ctx.moveTo(W / 2 - 14, H - 6);
    ctx.lineTo(W / 2 + 14, H - 6);
    ctx.lineTo(W / 2 + 70, H * 0.3);
    ctx.lineTo(W / 2 - 70, H * 0.3);
    ctx.fill();
    ctx.fillStyle = 'rgba(98, 244, 255, 0.7)';
    ctx.fillRect(W / 2 - 18, H - 7, 36, 3);

    // NOVA : tête ronde, oreilles, hublot ; elle flotte et sautille selon l'humeur
    const m = mood && t < moodUntil ? mood : base;
    const [eyeKind, mouthKind] = FACES[m] || FACES.idle;
    const bounce = m === 'laugh' || m === 'wow' ? Math.abs(Math.sin(t * 14)) * 5 : 0;
    const shake = m === 'hurt' || m === 'angry' ? Math.sin(t * 60) * 2.5 : 0;
    const cx = W / 2 + shake;
    const cy = H * 0.55 + Math.sin(t * 2.2) * 3 - bounce;
    const R = 44;
    ctx.save();
    // NOVA est bien ronde et dodue : on l'agrandit, un peu plus large que haute
    ctx.translate(cx, cy);
    ctx.scale(1.42, 1.3);
    ctx.translate(-cx, -cy);
    ctx.globalCompositeOperation = 'lighter';
    ctx.shadowColor = CY;
    ctx.shadowBlur = 10;
    // Petites ailes translucides dans le dos (elles battent)
    const flap = Math.sin(t * (m === 'wow' || m === 'laugh' ? 16 : 7)) * 0.12;
    [-1, 1].forEach((s) => {
      ctx.save();
      ctx.translate(cx + s * 16, cy - R + 10);
      ctx.rotate(s * (0.95 + flap) + (m === 'sad' || m === 'worried' ? s * 0.4 : 0));
      ctx.fillStyle = 'rgba(98, 244, 255, 0.12)';
      line(1.5, 'rgba(98, 244, 255, 0.55)');
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.quadraticCurveTo(s * 2, -30, s * 14, -26);
      ctx.quadraticCurveTo(s * 18, -8, 0, 0);
      ctx.fill();
      ctx.stroke();
      ctx.restore();
    });
    // Antenne avec un petit cœur rose au bout
    const sway = Math.sin(t * 2.3) * 3;
    line(2, 'rgba(98, 244, 255, 0.8)');
    ctx.beginPath();
    ctx.moveTo(cx, cy - R);
    ctx.quadraticCurveTo(cx + sway * 0.5, cy - R - 10, cx + sway, cy - R - 17);
    ctx.stroke();
    ctx.fillStyle = '#ff7ad0';
    const hx = cx + sway;
    const hy = cy - R - 21;
    ctx.beginPath();
    ctx.moveTo(hx, hy + 6);
    ctx.bezierCurveTo(hx - 9, hy, hx - 5, hy - 7, hx, hy - 2);
    ctx.bezierCurveTo(hx + 5, hy - 7, hx + 9, hy, hx, hy + 6);
    ctx.fill();
    // Tête : boule toute ronde
    ctx.fillStyle = 'rgba(98, 244, 255, 0.10)';
    ctx.beginPath();
    ctx.arc(cx, cy, R, 0, Math.PI * 2);
    ctx.fill();
    line(3);
    ctx.stroke();
    // Deux bandes de casque par-dessus la tête
    line(1.5, 'rgba(98, 244, 255, 0.45)');
    [-7, 7].forEach((o) => {
      ctx.beginPath();
      ctx.ellipse(cx + o, cy, R * 0.22, R - 1, 0, Math.PI * 1.05, Math.PI * 1.95);
      ctx.stroke();
    });
    // Pastilles rondes sur les côtés (comme un casque audio)
    [-1, 1].forEach((s) => {
      ctx.fillStyle = 'rgba(255, 138, 216, 0.4)';
      ctx.beginPath();
      ctx.ellipse(cx + s * (R + 1), cy + 2, 6, 13, 0, 0, Math.PI * 2);
      ctx.fill();
      line(2, 'rgba(255, 138, 216, 0.8)');
      ctx.stroke();
    });
    // Hublot (écran du visage)
    ctx.fillStyle = 'rgba(2, 10, 18, 0.85)';
    ctx.globalCompositeOperation = 'source-over';
    ctx.beginPath();
    ctx.ellipse(cx, cy + 4, R * 0.8, R * 0.62, 0, 0, Math.PI * 2);
    ctx.fill();
    line(1.5, 'rgba(98, 244, 255, 0.6)');
    ctx.stroke();
    // Visage net : pas de mélange additif (sinon les yeux deviennent blancs).
    // Yeux, bouche et joues restent DANS l'écran noir du visage : on les
    // dessine réduits autour de son centre, et on découpe à son contour.
    ctx.shadowBlur = 6;
    const vy = cy + 4;
    ctx.save();
    ctx.beginPath();
    ctx.ellipse(cx, vy, R * 0.78, R * 0.6, 0, 0, Math.PI * 2);
    ctx.clip();
    ctx.translate(cx, vy);
    ctx.scale(0.66, 0.66);
    ctx.translate(-cx, -vy);
    // Joues roses
    [-1, 1].forEach((s) => {
      ctx.fillStyle = m === 'love' || m === 'happy' || m === 'laugh' ? 'rgba(255, 110, 190, 0.6)' : 'rgba(255, 110, 190, 0.25)';
      ctx.beginPath();
      ctx.ellipse(cx + s * 40, vy + 12, 9, 5, 0, 0, Math.PI * 2);
      ctx.fill();
    });
    // Yeux et bouche
    const blinking = blinkT < 1 && eyeKind === 'open';
    eyes(blinking ? 'blink' : eyeKind, cx, vy - 8, lookX * 7);
    mouth(mouthKind, cx + lookX * 3, vy + 16, t < talkUntil);
    ctx.restore();
    ctx.restore();

    // Lignes de balayage + bande lumineuse qui descend
    ctx.fillStyle = 'rgba(0, 0, 0, 0.28)';
    for (let y = 0; y < H; y += 3) ctx.fillRect(0, y, W, 1);
    const by = ((t * 40) % (H + 30)) - 15;
    ctx.fillStyle = 'rgba(98, 244, 255, 0.07)';
    ctx.fillRect(0, by, W, 10);

    // Parasites : tranches décalées (coup reçu, apparition)
    if (glitch > 0.02) {
      const n = 2 + Math.floor(glitch * 5);
      for (let i = 0; i < n; i++) {
        const y = Math.floor(Math.random() * H);
        const h = 2 + Math.floor(Math.random() * 8);
        const off = (Math.random() - 0.5) * 24 * glitch;
        ctx.drawImage(canvas, 0, y, W, h, off, y, W, h);
      }
      ctx.fillStyle = `rgba(255, 61, 187, ${0.12 * glitch})`;
      ctx.fillRect(0, 0, W, H);
    }
    // Scintillement général de l'hologramme
    const flick = 0.04 + 0.04 * Math.sin(t * 31) * Math.sin(t * 7);
    ctx.fillStyle = `rgba(0, 0, 0, ${Math.max(0, flick)})`;
    ctx.fillRect(0, 0, W, H);
  }

  function update(dt) {
    t += dt;
    glitch = Math.max(0, glitch - dt * 1.8);
    blinkAt -= dt;
    if (blinkAt <= 0) {
      blinkAt = 2 + Math.random() * 3;
      blinkT = 0;
    }
    blinkT = Math.min(1, blinkT + dt * 7);
    // ~30 images par seconde suffisent pour un petit écran
    acc += dt;
    if (acc < 1 / 30) return;
    acc = 0;
    draw();
  }

  return {
    setMood,
    /** humeur de fond : idle, focus, worried */
    setBase(name) {
      base = name;
    },
    /** -1 (gauche) … 1 (droite) : NOVA regarde le vaisseau */
    look(x) {
      lookX += (Math.max(-1, Math.min(1, x)) - lookX) * 0.2;
    },
    talk(seconds) {
      talkUntil = t + Math.min(seconds, 2.2);
    },
    glitch(v = 1) {
      glitch = Math.max(glitch, v);
    },
    update
  };
}
