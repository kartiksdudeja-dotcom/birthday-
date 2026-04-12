import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Heart, Star, Gift, MessageSquare, History, Save, ArrowDown, IceCream, Cookie, Coffee, Sparkles, Crown, Music } from 'lucide-react';
import axios from 'axios';
import finallyMetImage from './assets/663968787_2104999393401571_6152688826169005121_n.jpg';
import finallyMetMusic from './assets/Finally we Met-Downringtone.com.mp3';
import khatMusic from './assets/Khat Ringtone Download - MobCup.Com.Co.mp3';
import reelAudio from './assets/ReelAudio-62776.mp3';
import peaceMusic from './assets/peace.mp3';
import sheMusic from './assets/she.mp3';
import birthdayMusic from './assets/birthday.mp3';
import milangaMusic from './assets/milanga.mp3';

// ============================================================
// CONFETTI SYSTEM
// ============================================================
const Confetti = ({ active }: { active: boolean }) => {
  const [pieces, setPieces] = useState<Array<{ id: number; left: string; color: string; delay: number; duration: number; rotation: number }>>([]);

  useEffect(() => {
    if (!active) { setPieces([]); return; }
    const colors = ['#ff87be', '#efc900', '#a855f7', '#60a5fa', '#ff68a7', '#34d399', '#fb923c', '#f472b6'];
    const newPieces = Array.from({ length: 80 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      color: colors[Math.floor(Math.random() * colors.length)],
      delay: Math.random() * 2,
      duration: 2 + Math.random() * 3,
      rotation: Math.random() * 720,
    }));
    setPieces(newPieces);
  }, [active]);

  if (!active) return null;
  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 200, overflow: 'hidden' }}>
      {pieces.map(p => (
        <motion.div
          key={p.id}
          initial={{ y: -20, x: 0, rotate: 0, opacity: 1 }}
          animate={{ y: '110vh', x: [0, Math.random() * 100 - 50, Math.random() * 60 - 30], rotate: p.rotation, opacity: [1, 1, 0] }}
          transition={{ duration: p.duration, delay: p.delay, ease: 'linear' }}
          style={{
            position: 'absolute', left: p.left, top: -10,
            width: Math.random() > 0.5 ? 10 : 8,
            height: Math.random() > 0.5 ? 14 : 10,
            backgroundColor: p.color,
            borderRadius: Math.random() > 0.5 ? '50%' : '2px',
          }}
        />
      ))}
    </div>
  );
};

// ============================================================
// FLOATING PARTICLES (ambient effect)
// ============================================================
const FloatingParticles = () => {
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    size: Math.random() * 4 + 2,
    left: `${Math.random() * 100}%`,
    delay: Math.random() * 10,
    duration: 8 + Math.random() * 12,
    opacity: Math.random() * 0.3 + 0.05,
  }));

  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 1, overflow: 'hidden' }}>
      {particles.map(p => (
        <motion.div
          key={p.id}
          animate={{ y: [window.innerHeight + 50, -50], x: [0, Math.sin(p.id) * 60, 0] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'linear' }}
          style={{
            position: 'absolute', left: p.left, bottom: -50,
            width: p.size, height: p.size,
            borderRadius: '50%',
            background: `rgba(255,135,190,${p.opacity})`,
            boxShadow: 'none',
          }}
        />
      ))}
    </div>
  );
};

// ============================================================
// AURORA BACKGROUND
// ============================================================
const Aurora = () => (
  <div className="aurora">
    <div className="aurora-band" />
    <div className="aurora-band" />
    <div className="aurora-band" />
  </div>
);

const Moon = () => (
  <div style={{
    position: 'absolute',
    top: 'clamp(30px, 8%, 80px)',
    right: 'clamp(40px, 10%, 120px)',
    pointerEvents: 'none',
    zIndex: 2,
  }}>
    <div style={{
      position: 'absolute',
      width: 200, height: 200,
      top: -40, left: -40,
      borderRadius: '50%',
      background: 'radial-gradient(circle, rgba(230,220,200,0.06) 0%, rgba(200,190,170,0.02) 40%, transparent 70%)',
      filter: 'blur(30px)',
    }} />
    <motion.div
      animate={{ scale: [1, 1.05, 1], opacity: [0.15, 0.25, 0.15] }}
      transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
      style={{
        position: 'absolute',
        width: 180, height: 180,
        top: -30, left: -30,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,248,220,0.12) 0%, transparent 60%)',
        filter: 'blur(20px)',
      }}
    />
    <div style={{
      width: 120, height: 120,
      borderRadius: '50%',
      background: 'radial-gradient(circle at 35% 35%, #faf5e0 0%, #e8dfc5 30%, #d4c9a8 60%, #bfb48f 100%)',
      position: 'relative',
      boxShadow: '0 0 40px rgba(255,248,220,0.15), inset -8px -6px 15px rgba(0,0,0,0.15)',
    }}>
      <div style={{ position: 'absolute', width: 18, height: 18, borderRadius: '50%', background: 'rgba(180,170,140,0.3)', top: '25%', left: '30%' }} />
      <div style={{ position: 'absolute', width: 12, height: 12, borderRadius: '50%', background: 'rgba(180,170,140,0.25)', top: '55%', left: '55%' }} />
      <div style={{ position: 'absolute', width: 8, height: 8, borderRadius: '50%', background: 'rgba(180,170,140,0.2)', top: '35%', left: '65%' }} />
      <div style={{ position: 'absolute', width: 22, height: 22, borderRadius: '50%', background: 'rgba(180,170,140,0.2)', top: '60%', left: '25%' }} />
    </div>
  </div>
);

// ============================================================
// UNIVERSE BACKGROUND (enhanced)
// ============================================================
const Universe = () => {
  const starsArr = Array.from({ length: 300 });
  return (
    <div className="universe-container">
      <Moon />
      {/* Nebulae */}
      <div className="nebula" style={{ top: '5%', left: '5%', width: 900, height: 900, background: 'radial-gradient(circle, rgba(255, 135, 190, 0.04) 0%, transparent 70%)', filter: 'blur(120px)' }} />
      <div className="nebula" style={{ bottom: '10%', right: '5%', width: 700, height: 700, background: 'radial-gradient(circle, rgba(168, 85, 247, 0.03) 0%, transparent 70%)', filter: 'blur(100px)' }} />
      <div className="nebula" style={{ top: '40%', left: '60%', width: 500, height: 500, background: 'radial-gradient(circle, rgba(96, 165, 250, 0.02) 0%, transparent 70%)', filter: 'blur(80px)' }} />

      {/* Stars */}
      {starsArr.map((_, i) => {
        const size = Math.random() * 2.5 + 0.5;
        const isBright = i < 20;
        return (
          <div
            key={i}
            className="star"
            style={{
              width: isBright ? size + 1 : size,
              height: isBright ? size + 1 : size,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: isBright ? 0.8 : Math.random() * 0.4 + 0.1,
              animation: `${isBright ? 'twinkleBright' : 'twinkle'} ${Math.random() * 3 + 2}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`,
              boxShadow: 'none',
            }}
          />
        );
      })}
    </div>
  );
};

// ============================================================
// TREE CANVAS (unchanged logic, enhanced glow)
// ============================================================
const TreeCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    const handleResize = () => { width = canvas.width = window.innerWidth; height = canvas.height = window.innerHeight; };
    window.addEventListener('resize', handleResize);

    const heartColors = ['#ff4d4d', '#ff87be', '#ff00ff', '#ffa500', '#ffff00', '#ffffff', '#ff68a7', '#ff1493'];

    class HeartParticle {
      x: number; y: number; targetX: number; targetY: number; currentX: number; currentY: number;
      size: number; color: string; alpha: number; born: number; ease: number; floating: number;

      constructor(x: number, y: number) {
        this.x = x; this.y = y;
        const angle = Math.random() * Math.PI * 2;
        const hx = 16 * Math.pow(Math.sin(angle), 3);
        const hy = -(13 * Math.cos(angle) - 5 * Math.cos(2 * angle) - 2 * Math.cos(3 * angle) - Math.cos(4 * angle));
        const centerShift = window.innerWidth > 768 ? window.innerWidth * 0.65 : window.innerWidth * 0.5;
        this.targetX = centerShift + hx * 12;
        this.targetY = window.innerHeight * 0.35 + hy * 12;
        this.size = Math.random() * 6 + 3;
        this.color = heartColors[Math.floor(Math.random() * heartColors.length)];
        this.alpha = 0;
        this.born = Date.now() + Math.random() * 3000;
        this.ease = 0.01 + Math.random() * 0.02;
        this.currentX = x; this.currentY = y;
        this.floating = Math.random() * Math.PI * 2;
      }

      draw(ctx: CanvasRenderingContext2D) {
        if (Date.now() < this.born) return;
        this.alpha = Math.min(1, this.alpha + 0.01);
        const dx = this.targetX - this.currentX;
        const dy = this.targetY - this.currentY;
        if (Math.sqrt(dx * dx + dy * dy) > 5) {
          this.currentX += dx * this.ease;
          this.currentY += dy * this.ease;
        } else {
          this.floating += 0.05;
        }
        const fx = Math.sin(this.floating) * 1.5;
        const fy = Math.cos(this.floating) * 1.5;
        ctx.save();
        ctx.translate(this.currentX + fx, this.currentY + fy);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(-this.size, -this.size, -this.size * 2, this.size / 3, 0, this.size);
        ctx.bezierCurveTo(this.size * 2, this.size / 3, this.size, -this.size, 0, 0);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.alpha;
        ctx.fill();
        ctx.restore();
      }
    }

    let hearts: HeartParticle[] = [];
    let branchesDrawn = false;

    const drawBranch = (x1: number, y1: number, angle: number, length: number, w: number, d: number) => {
      if (d === 0) {
        const bloomCount = 5 + Math.floor(Math.random() * 8);
        for (let i = 0; i < bloomCount; i++) hearts.push(new HeartParticle(x1, y1));
        return;
      }
      const x2 = x1 + Math.cos(angle) * length;
      const y2 = y1 + Math.sin(angle) * length;
      ctx.lineWidth = w; ctx.lineCap = 'round'; ctx.strokeStyle = '#ff87be';
      ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
      const sub = 2 + (Math.random() > 0.8 ? 1 : 0);
      for (let i = 0; i < sub; i++) {
        drawBranch(x2, y2, angle + (Math.random() - 0.5) * 1.0, length * (0.65 + Math.random() * 0.2), w * 0.7, d - 1);
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      const seedX = width > 768 ? width * 0.65 : width * 0.5;
      const seedY = height - 80;
      if (!branchesDrawn) {
        drawBranch(seedX, seedY, -Math.PI / 2, 85, 12, 5);
        branchesDrawn = true;
      } else {
        const redrawBranch = (x1: number, y1: number, angle: number, length: number, w: number, d: number) => {
          if (d === 0) return;
          const x2 = x1 + Math.cos(angle) * length;
          const y2 = y1 + Math.sin(angle) * length;
          ctx.lineWidth = w; ctx.strokeStyle = '#ff87be';
          ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
          for (let i = 0; i < 2; i++) redrawBranch(x2, y2, angle + (i === 0 ? -0.3 : 0.3), length * 0.8, w * 0.7, d - 1);
        };
        redrawBranch(seedX, seedY, -Math.PI / 2, 85, 12, 5);
      }
      hearts.forEach(h => h.draw(ctx));
      requestAnimationFrame(animate);
    };

    animate();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 10 }} />;
};

// ============================================================
// POSTAL LETTER / ENVELOPE COMPONENT
// ============================================================
const postalData = [
  {
    icon: Heart,
    label: 'Letter #1',
    from: 'Kabir',
    to: 'Akriti ✨',
    preview: 'I still remember...',
    text: `I still remember those beautiful days,
The moments we met in countless ways.
Every day, every night with you,
Felt like a dream so pure and true.

Those memories shine, they never fade,
In my heart, forever they are laid.
I will never forget those times we knew,
Because every moment was special with you.

Today I wish you joy and light,
A birthday filled with love so bright.
I still keep you close, in all I do,
Happy Birthday, Akriti… I love you`,
    stamp: '💕',
    color: '#ff87be',
  },
  {
    icon: Star,
    label: 'Letter #2',
    from: 'Kabir',
    to: 'Akriti ✨',
    preview: 'I am sorry...',
    text: `I’m sorry for every fight and every mistake,
For the times I hurt you without knowing the weight.

I always valued you more than I could show,
Every moment with you meant more than you know.

I remember everything, even the days I felt jealous,
But I loved your strength, your calm, your softness.

You always understood me in your own way,
That’s something I can never forget, not even today.

Happy Birthday, Akriti… I still love you. ❤️`,
    stamp: '⭐',
    color: '#a855f7',
  },
  {
    icon: Crown,
    label: 'Letter #3',
    from: 'Kabir',
    to: 'Akriti ✨',
    preview: 'Six years...',
    text: `Six years… and I remember it all,
Every memory, big or small.

Even when you were not around,
Your presence in my heart I found.

You are strong in every way,
Your decisions always clear and right, I must say.

I could never win an argument with you,
Even when you were wrong, it felt right too.

And your eyes… I still remember,
I got lost in them, again and forever.

Those days were truly amazing and true,
Happy Birthday, Akriti… I love you. ❤️`,
    stamp: '👑',
    color: '#efc900',
  },
  {
    icon: MessageSquare,
    label: 'Letter #4',
    from: 'Kabir',
    to: 'Akriti ✨',
    preview: 'I’ll never regret...',
    text: `I’ll never regret loving you,
Or choosing you in everything I do.

You were always the one I dreamed of,
My definition of pure and true love.

Maybe somewhere I wasn’t right for you,
But my feelings were always real and true.

No matter where life takes us now,
A part of me will always stay with you somehow.

Happy Birthday, Akriti… forever in my heart. ❤️`,
    stamp: '✉️',
    color: '#60a5fa',
  },
];

const PostalEnvelope = ({ data, delay, index }: { data: typeof postalData[0]; delay: number; index: number }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedReaction, setSelectedReaction] = useState<string | null>(null);
  const Icon = data.icon;

  const handleOpen = () => {
    setIsOpen(true);
    const mainAudio = document.getElementById('main-bg-music') as HTMLAudioElement;
    
    // Choose audio based on letter index
    let specificAudioId = 'letter-music'; // Default Khat
    if (index === 1) specificAudioId = 'reel-audio'; // Card #2
    if (index === 2) specificAudioId = 'peace-music'; // Card #3
    if (index === 3) specificAudioId = 'she-music'; // Card #4
    
    const cardAudio = document.getElementById(specificAudioId) as HTMLAudioElement;
    
    if (mainAudio) mainAudio.pause();
    if (cardAudio) {
      cardAudio.currentTime = 0;
      cardAudio.play().catch(e => console.log("Card music error:", e));
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    const mainAudio = document.getElementById('main-bg-music') as HTMLAudioElement;
    
    let specificAudioId = 'letter-music';
    if (index === 1) specificAudioId = 'reel-audio';
    if (index === 2) specificAudioId = 'peace-music';
    if (index === 3) specificAudioId = 'she-music';
    
    const cardAudio = document.getElementById(specificAudioId) as HTMLAudioElement;

    if (cardAudio) cardAudio.pause();
    if (mainAudio) {
      mainAudio.play().catch(e => console.log("Main music resume error:", e));
    }
  };

  return (
    <>
      {/* ENVELOPE (closed) */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay, duration: 0.5, type: 'spring', stiffness: 120 }}
        whileHover={{ y: -6, scale: 1.03, rotateZ: -1 }}
        onClick={handleOpen}
        style={{
          width: '100%',
          maxWidth: 320,
          minWidth: 280,
          aspectRatio: '1.5 / 1',
          position: 'relative',
          cursor: 'pointer',
          perspective: 800,
          flexShrink: 0,
          scrollSnapAlign: 'center',
        }}
      >
        {/* Envelope body */}
        <div style={{
          width: '100%', height: '100%',
          background: `linear-gradient(145deg, #1a1225 0%, #0f0a18 100%)`,
          borderRadius: '0.8rem',
          border: `1px solid ${selectedReaction ? '#ff87be' : data.color}25`,
          position: 'relative',
          overflow: 'hidden',
          boxShadow: selectedReaction ? `0 8px 30px rgba(255,135,190,0.2), inset 0 1px 0 rgba(255,255,255,0.06)` : `0 8px 30px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)`,
          transition: 'all 0.5s ease',
        }}>
          {selectedReaction && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              style={{
                position: 'absolute', inset: 0,
                background: 'radial-gradient(circle at 50% 50%, rgba(255,135,190,0.1), transparent 70%)',
                zIndex: 1,
              }}
            />
          )}

          {/* Envelope flap (triangle) */}
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: '45%',
            background: `linear-gradient(180deg, ${data.color}12, transparent)`,
            clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
            borderBottom: `1px dashed ${data.color}30`,
            zIndex: 2,
          }} />

          {/* Wax seal */}
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ repeat: Infinity, duration: 4, delay: index * 0.5 }}
            style={{
              position: 'absolute', top: '30%', left: '50%', transform: 'translateX(-50%)',
              width: 44, height: 44,
              borderRadius: '50%',
              background: `radial-gradient(circle at 40% 35%, ${data.color}, ${data.color}90)`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1.2rem',
              boxShadow: `inset 0 -2px 4px rgba(0,0,0,0.3)`,
              zIndex: 5,
              border: `2px solid ${data.color}60`,
            }}
          >
            <Icon style={{ width: 18, height: 18, color: '#fff' }} />
          </motion.div>

          {/* PERSISTED REACTION EMOJI */}
          <AnimatePresence>
            {selectedReaction && (
              <motion.div
                initial={{ scale: 0, y: 20, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                style={{
                  position: 'absolute', top: '20%', left: '58%',
                  fontSize: '2rem', zIndex: 6,
                  filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))'
                }}
              >
                {selectedReaction}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Stamp */}
          <div style={{
            position: 'absolute', top: 10, right: 12,
            width: 40, height: 48,
            background: `${data.color}15`,
            border: `1px dashed ${data.color}40`,
            borderRadius: 4,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1.4rem', zIndex: 3,
          }}>
            {data.stamp}
          </div>

          {/* Postmark */}
          <div style={{
            position: 'absolute', top: 14, right: 58,
            color: `${data.color}30`, fontSize: '0.55rem',
            fontWeight: 700, textTransform: 'uppercase',
            letterSpacing: '0.1em', textAlign: 'right', zIndex: 3,
          }}>
            <div style={{ borderBottom: `1px solid ${data.color}20`, paddingBottom: 2, marginBottom: 2 }}>APR 2026</div>
            <div style={{ fontStyle: 'italic', opacity: 0.7 }}>✦ NOOR</div>
          </div>

          {/* Bottom section: address lines */}
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0,
            padding: '1rem 1.2rem',
            zIndex: 3,
          }}>
            <p style={{ color: data.color, fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 4, opacity: 0.7 }}>
              {data.label}
            </p>
            <p style={{ color: '#888', fontSize: '0.72rem', fontWeight: 600 }}>
              From: <span style={{ color: '#bbb' }}>{data.from}</span>
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 3, marginTop: 8 }}>
              <div style={{ height: 1, background: `${data.color}15`, borderRadius: 1 }} />
              <div style={{ height: 1, background: `${data.color}10`, borderRadius: 1, width: '70%' }} />
            </div>
            <p style={{ color: '#666', fontSize: '0.7rem', fontStyle: 'italic', marginTop: 6 }}>
              {data.preview}
            </p>
          </div>

          {/* Subtle "Click to open" hint */}
          <motion.div
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ repeat: Infinity, duration: 2 }}
            style={{
              position: 'absolute', bottom: 8, right: 12,
              color: data.color, fontSize: '0.6rem',
              fontWeight: 700, textTransform: 'uppercase',
              letterSpacing: '0.1em', zIndex: 3,
            }}
          >
            ✉ {selectedReaction ? 'Read Again' : 'Open'}
          </motion.div>
        </div>
      </motion.div>

      {/* LETTER MODAL (opened) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={handleClose}
            style={{
              position: 'fixed', inset: 0, zIndex: 150,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: 'rgba(2,4,10,0.85)',
              backdropFilter: 'blur(20px)',
              padding: '1.5rem', cursor: 'pointer',
            }}
          >
            <motion.div
              initial={{ scale: 0.3, rotateY: -90, opacity: 0 }}
              animate={{ scale: 1, rotateY: 0, opacity: 1 }}
              exit={{ scale: 0.3, rotateY: 90, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 22 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                width: '100%', maxWidth: 460,
                position: 'relative', cursor: 'default',
                perspective: 1000,
              }}
            >
              {/* Letter paper */}
              <div style={{
                background: 'linear-gradient(180deg, #faf5ee 0%, #f5eed8 100%)',
                borderRadius: '1rem',
                padding: 'clamp(2rem, 5vw, 3rem)',
                position: 'relative',
                overflow: 'hidden',
                boxShadow: `0 20px 60px rgba(0,0,0,0.6), 0 0 80px ${data.color}15`,
                minHeight: 320,
              }}>
                {/* Paper texture lines */}
                {Array.from({ length: 12 }).map((_, i) => (
                  <div key={i} style={{
                    position: 'absolute', left: 'clamp(2rem, 5vw, 3rem)', right: 'clamp(2rem, 5vw, 3rem)',
                    top: 70 + i * 28, height: 1,
                    background: 'rgba(180,170,155,0.2)',
                  }} />
                ))}

                {/* Left margin line */}
                <div style={{
                  position: 'absolute', left: 'calc(clamp(2rem, 5vw, 3rem) - 8px)', top: 0, bottom: 0,
                  width: 2, background: 'rgba(220,80,80,0.15)',
                }} />

                {/* Header */}
                <div style={{ position: 'relative', zIndex: 2, marginBottom: '1.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <div style={{
                        width: 32, height: 32, borderRadius: '50%',
                        background: data.color,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        boxShadow: `0 2px 10px ${data.color}40`,
                      }}>
                        <Icon style={{ width: 16, height: 16, color: '#fff' }} />
                      </div>
                      <span style={{ color: '#5a4a38', fontWeight: 800, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.12em' }}>
                        {data.label}
                      </span>
                    </div>
                    <span style={{ color: '#a09080', fontSize: '0.7rem', fontWeight: 600 }}>
                      April 2026
                    </span>
                  </div>
                  <p style={{ color: '#8a7a68', fontSize: '0.8rem', fontWeight: 600 }}>
                    From: <span style={{ color: data.color, fontWeight: 700 }}>{data.from}</span>
                  </p>
                  <p style={{ color: '#8a7a68', fontSize: '0.8rem', fontWeight: 600 }}>
                    To: <span style={{ fontWeight: 700, color: '#5a4a38' }}>{data.to}</span>
                  </p>
                </div>

                {/* Divider */}
                <div style={{ height: 2, background: `linear-gradient(90deg, transparent, ${data.color}50, transparent)`, marginBottom: '1.5rem', position: 'relative', zIndex: 2 }} />

                {/* Letter body */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  style={{ position: 'relative', zIndex: 2 }}
                >
                  <p style={{
                    color: '#3d3228',
                    fontSize: 'clamp(0.95rem, 2.2vw, 1.15rem)',
                    lineHeight: 1.6,
                    fontWeight: 500,
                    fontStyle: 'italic',
                    fontFamily: "'Playfair Display', Georgia, serif",
                    whiteSpace: 'pre-line'
                  }}>
                    {data.text}
                  </p>
                </motion.div>

                {/* Signature */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  style={{ position: 'relative', zIndex: 2, marginTop: '2rem', textAlign: 'right' }}
                >
                  <p style={{ color: data.color, fontFamily: "'Playfair Display', Georgia, serif", fontStyle: 'italic', fontSize: '1.1rem', fontWeight: 700 }}>
                    With love,
                  </p>
                  <p style={{ color: '#5a4a38', fontSize: '0.75rem', fontWeight: 600, marginTop: 4 }}>
                    {data.from} {data.stamp}
                  </p>
                </motion.div>

                {/* HEART REACTIONS */}
                <div style={{ position: 'relative', zIndex: 5, marginTop: '1.5rem', borderTop: '1px solid rgba(0,0,0,0.05)', paddingTop: '1rem' }}>
                   <p style={{ color: '#8a7a68', fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.8rem', textAlign: 'center', opacity: 0.6 }}>
                    React with love
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'center', gap: '0.8rem', flexWrap: 'wrap' }}>
                    {['❤️', '💖', '💗', '💓', '💞', '💘', '✨'].map((emoji, i) => (
                      <motion.button
                        key={i}
                        whileHover={{ scale: 1.3, rotate: i % 2 === 0 ? 10 : -10 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedReaction(emoji); // PERSIST REACTION
                          // Save to DB
                          axios.post('http://localhost:8080/api/reactions', { cardIndex: index, emoji })
                            .catch(err => console.error("Failed to save reaction:", err));
                          const x = e.clientX;
                          const y = e.clientY;
                          for (let j = 0; j < 6; j++) {
                            const heart = document.createElement('div');
                            heart.innerHTML = emoji;
                            heart.style.position = 'fixed';
                            heart.style.left = `${x}px`;
                            heart.style.top = `${y}px`;
                            heart.style.fontSize = '1.5rem';
                            heart.style.pointerEvents = 'none';
                            heart.style.zIndex = '1000';
                            heart.style.transition = 'all 1.5s ease-out';
                            document.body.appendChild(heart);
                            setTimeout(() => {
                              heart.style.transform = `translate(${(Math.random() - 0.5) * 400}px, ${-300 - Math.random() * 200}px) scale(${1 + Math.random()})`;
                              heart.style.opacity = '0';
                            }, 10);
                            setTimeout(() => document.body.removeChild(heart), 1500);
                          }
                        }}
                        style={{
                          background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', outline: 'none',
                          filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
                        }}
                      >
                        {emoji}
                      </motion.button>
                    ))}
                  </div>
                  
                  {/* Give All button */}
                  <div style={{ marginTop: '1rem', textAlign: 'center' }}>
                    <motion.button
                      whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(255,135,190,0.4)' }}
                      whileTap={{ scale: 0.95 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedReaction('💖'); // PERSIST 'ALL LOVE'
                        // Save to DB
                        axios.post('http://localhost:8080/api/reactions', { cardIndex: index, emoji: 'GIVE_ALL_LOVE' })
                          .catch(err => console.error("Failed to save multi-reaction:", err));
                        ['❤️', '💖', '💗', '💓', '💞', '💘', '✨'].forEach((emoji, idx) => {
                          setTimeout(() => {
                            for (let j = 0; j < 5; j++) {
                              const heart = document.createElement('div');
                              heart.innerHTML = emoji;
                              heart.style.position = 'fixed';
                              heart.style.left = `${e.clientX}px`;
                              heart.style.top = `${e.clientY}px`;
                              heart.style.fontSize = '1.5rem';
                              heart.style.pointerEvents = 'none';
                              heart.style.zIndex = '1000';
                              heart.style.transition = 'all 2s ease-out';
                              document.body.appendChild(heart);
                              setTimeout(() => {
                                heart.style.transform = `translate(${(Math.random() - 0.5) * 600}px, ${-400 - Math.random() * 300}px) rotate(${Math.random() * 360}deg) scale(${1 + Math.random()})`;
                                heart.style.opacity = '0';
                              }, 10);
                              setTimeout(() => document.body.removeChild(heart), 2000);
                            }
                          }, idx * 50);
                        });
                      }}
                      style={{
                        padding: '0.4rem 1.2rem',
                        background: 'linear-gradient(135deg, #ff87be 0%, #ff6b6b 100%)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '999px',
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em',
                        cursor: 'pointer',
                        boxShadow: '0 4px 10px rgba(255,135,190,0.2)'
                      }}
                    >
                      Give all love 💖✨
                    </motion.button>
                  </div>
                </div>

                {/* Corner decoration */}
                <div style={{
                  position: 'absolute', bottom: 12, left: 14,
                  fontSize: '2rem', opacity: 0.08,
                }}>
                  {data.stamp}
                </div>
              </div>

              {/* Close hint */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                style={{ textAlign: 'center', color: 'rgba(255,255,255,0.3)', fontSize: '0.75rem', fontWeight: 600, marginTop: '1rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}
              >
                Click anywhere to close
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// ============================================================
// SECTION HEADING COMPONENT
// ============================================================
const SectionHeading = ({ label, title, align = 'left' }: { label: string; title: string; align?: 'left' | 'center' }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.7 }}
    style={{ marginBottom: '4rem', textAlign: align }}
  >
    <div className="section-label" style={{ marginBottom: '1rem', display: 'inline-flex' }}>
      <Sparkles style={{ width: 12, height: 12 }} />
      {label}
    </div>
    <h2 className="glow-text-xl" style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', fontWeight: 900, letterSpacing: '-0.02em', lineHeight: 1.2 }}>
      {title}
    </h2>
    <div className="color-bar" style={{ width: 80, marginTop: '1rem', ...(align === 'center' ? { marginLeft: 'auto', marginRight: 'auto' } : {}) }} />
  </motion.div>
);

// ============================================================
// START SCREEN ("Finally We Met")
// ============================================================
const StartScreen = ({ onStart }: { onStart: () => void }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1, filter: 'blur(20px)' }}
      transition={{ duration: 1.2, ease: 'easeInOut' }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 10000,
        background: '#020208',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      <Universe />
      <FloatingParticles />
      
      {/* Background Ambience */}
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 50%, rgba(255,135,190,0.05) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        style={{ textAlign: 'center', position: 'relative', zIndex: 10, padding: '2rem' }}
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
          style={{
            width: 'clamp(180px, 35vw, 280px)',
            aspectRatio: '1',
            borderRadius: '50%',
            padding: '8px',
            background: 'linear-gradient(135deg, rgba(255,135,190,0.3), rgba(168,85,247,0.3))',
            boxShadow: '0 0 40px rgba(255,135,190,0.15)',
            marginBottom: '2rem',
            margin: '0 auto 2rem auto',
            position: 'relative'
          }}
        >
          <div style={{ width: '100%', height: '100%', borderRadius: '50%', overflow: 'hidden', border: '2px solid rgba(255,255,255,0.1)' }}>
            <img 
              src={finallyMetImage} 
              alt="Finally We Met" 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
            />
          </div>
          
          {/* Decorative icons around circle */}
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }} style={{ position: 'absolute', inset: -20, pointerEvents: 'none' }}>
            <Heart style={{ position: 'absolute', top: '10%', left: '10%', width: 20, height: 20, color: '#ff87be', opacity: 0.6 }} />
            <Sparkles style={{ position: 'absolute', bottom: '15%', right: '5%', width: 18, height: 18, color: '#efc900', opacity: 0.6 }} />
            <Star style={{ position: 'absolute', top: '50%', right: '-10%', width: 16, height: 16, color: '#a855f7', opacity: 0.4 }} />
          </motion.div>
        </motion.div>

        <motion.h1
          className="glow-text-xl"
          style={{
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: 900,
            fontFamily: "'Playfair Display', serif",
            fontStyle: 'italic',
            marginBottom: '0.5rem',
            color: '#fff',
            textShadow: '0 0 30px rgba(255,135,190,0.3)'
          }}
        >
          Finally We Met
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 1.5, duration: 1 }}
          style={{
            fontSize: '0.8rem',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: '#b8b8d0',
            marginBottom: '3rem',
            fontWeight: 500
          }}
        >
          A story written in the stars
        </motion.p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
          {/* Enter Button starts the journey and the music */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onStart}
            className="btn-primary"
            style={{
              padding: '1rem 3.5rem',
              fontSize: '1rem',
              letterSpacing: '0.1em',
              background: 'linear-gradient(135deg, #ff87be, #a855f7)',
              boxShadow: '0 10px 40px rgba(255,135,190,0.2)',
              marginTop: '1rem'
            }}
          >
            Enter Our Story ✨
          </motion.button>
        </div>
      </motion.div>

      {/* Bottom hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ delay: 3, duration: 1 }}
        style={{ position: 'absolute', bottom: '2rem', left: '0', right: '0', textAlign: 'center' }}
      >
        <p style={{ fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Experience with sound 🎧</p>
      </motion.div>
    </motion.div>
  );
};

// ============================================================
// PASSCODE LOGIN SCREEN
// ============================================================
const CORRECT_PASSCODE = '13062005'; // Her birth date

const PasscodeScreen = ({ onUnlock }: { onUnlock: (mode: 'user' | 'admin' | 'kabir-akriti' | 'birthday-wishes') => void }) => {
  const [code, setCode] = useState<string[]>([]);
  const [shake, setShake] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleDigit = (digit: string) => {
    if (code.length >= 8 || success) return;
    const newCode = [...code, digit];
    setCode(newCode);

    const entered = newCode.join('');
    
    // Check for Admin bypass at 4 digits
    if (entered === '0505') {
      setSuccess(true);
      setTimeout(() => onUnlock('admin'), 1200);
      return;
    }

    // Check for Birthday PIN at 8 digits
    if (newCode.length === 8) {
      if (entered === CORRECT_PASSCODE) {
        setSuccess(true);
        setTimeout(() => onUnlock('user'), 1200);
      } else if (entered === '21012005') {
        setSuccess(true);
        setTimeout(() => onUnlock('kabir-akriti'), 1200);
      } else if (entered === '13042005') {
        setSuccess(true);
        setTimeout(() => onUnlock('birthday-wishes'), 1200);
      } else {
        setShake(true);
        setTimeout(() => { setShake(false); setCode([]); }, 600);
      }
    }
  };

  const handleDelete = () => {
    if (success) return;
    setCode(prev => prev.slice(0, -1));
  };

  const numPadKeys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '✦', '0', '⌫'];

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: 'linear-gradient(180deg, #050510 0%, #08071a 30%, #0a0520 60%, #020208 100%)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Background stars - more of them for a richer sky */}
      {Array.from({ length: 150 }).map((_, i) => {
        const isBright = i < 10;
        return (
          <div key={i} style={{
            position: 'absolute',
            width: isBright ? 3 : Math.random() * 2 + 0.5,
            height: isBright ? 3 : Math.random() * 2 + 0.5,
            left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`,
            background: 'white', borderRadius: '50%',
            opacity: isBright ? 0.8 : Math.random() * 0.3 + 0.05,
            animation: `${isBright ? 'twinkleBright' : 'twinkle'} ${Math.random() * 4 + 2}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 5}s`,
            boxShadow: isBright ? '0 0 6px rgba(255,255,255,0.5), 0 0 12px rgba(200,200,255,0.3)' : 'none',
          }} />
        );
      })}

      {/* Shooting stars */}
      {[1, 2, 3].map(i => (
        <motion.div
          key={`shoot-${i}`}
          initial={{ x: '-10%', y: '-10%', opacity: 0 }}
          animate={{ x: '120%', y: '120%', opacity: [0, 1, 1, 0] }}
          transition={{ duration: 1.5, delay: i * 4 + 2, repeat: Infinity, repeatDelay: 8 + i * 3, ease: 'easeOut' }}
          style={{
            position: 'absolute',
            top: `${10 + i * 15}%`, left: `${20 + i * 20}%`,
            width: 80, height: 1,
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.8), rgba(255,255,255,0))',
            transform: 'rotate(-35deg)',
            borderRadius: 1,
            filter: 'blur(0.5px)',
          }}
        />
      ))}

      {/* ======== MOON ======== */}
      <div style={{
        position: 'absolute',
        top: 'clamp(30px, 8%, 80px)',
        right: 'clamp(40px, 10%, 120px)',
        pointerEvents: 'none',
      }}>
        {/* Moon glow outer */}
        <div style={{
          position: 'absolute',
          width: 200, height: 200,
          top: -40, left: -40,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(230,220,200,0.08) 0%, rgba(200,190,170,0.03) 40%, transparent 70%)',
          filter: 'blur(30px)',
        }} />
        {/* Moon glow halo */}
        <motion.div
          animate={{ scale: [1, 1.05, 1], opacity: [0.15, 0.25, 0.15] }}
          transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            width: 180, height: 180,
            top: -30, left: -30,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,248,220,0.15) 0%, transparent 60%)',
            filter: 'blur(20px)',
          }}
        />
        {/* Moon body */}
        <div style={{
          width: 120, height: 120,
          borderRadius: '50%',
          background: 'radial-gradient(circle at 35% 35%, #faf5e0 0%, #e8dfc5 30%, #d4c9a8 60%, #bfb48f 100%)',
          position: 'relative',
          boxShadow: '0 0 40px rgba(255,248,220,0.2), 0 0 80px rgba(255,248,220,0.1), inset -8px -6px 15px rgba(0,0,0,0.15)',
        }}>
          {/* Moon craters */}
          <div style={{ position: 'absolute', width: 18, height: 18, borderRadius: '50%', background: 'rgba(180,170,140,0.3)', top: '25%', left: '30%', boxShadow: 'inset 1px 1px 3px rgba(0,0,0,0.1)' }} />
          <div style={{ position: 'absolute', width: 12, height: 12, borderRadius: '50%', background: 'rgba(180,170,140,0.25)', top: '55%', left: '55%', boxShadow: 'inset 1px 1px 2px rgba(0,0,0,0.1)' }} />
          <div style={{ position: 'absolute', width: 8, height: 8, borderRadius: '50%', background: 'rgba(180,170,140,0.2)', top: '35%', left: '65%' }} />
          <div style={{ position: 'absolute', width: 22, height: 22, borderRadius: '50%', background: 'rgba(180,170,140,0.2)', top: '60%', left: '25%', boxShadow: 'inset 1px 1px 3px rgba(0,0,0,0.08)' }} />
          <div style={{ position: 'absolute', width: 6, height: 6, borderRadius: '50%', background: 'rgba(180,170,140,0.2)', top: '20%', left: '55%' }} />
        </div>
        {/* Moon label */}
        <motion.p
          animate={{ opacity: [0.3, 0.5, 0.3] }}
          transition={{ repeat: Infinity, duration: 3 }}
          style={{
            textAlign: 'center', marginTop: 10,
            color: 'rgba(230,220,200,0.3)', fontSize: '0.6rem',
            letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 600,
          }}
        >
          🌙 Midnight
        </motion.p>
      </div>

      {/* Subtle nebula glow - very dark */}
      <div style={{ position: 'absolute', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,135,190,0.04), transparent 70%)', top: '30%', left: '5%', filter: 'blur(80px)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(100,80,200,0.03), transparent 70%)', bottom: '5%', right: '10%', filter: 'blur(70px)', pointerEvents: 'none' }} />

      {/* Main card */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{
          display: 'flex', flexDirection: 'row', flexWrap: 'wrap',
          alignItems: 'center', justifyContent: 'center',
          gap: 'clamp(2rem, 5vw, 4rem)',
          padding: '2rem',
          maxWidth: 900,
        }}
      >
        {/* LEFT: Polaroid photo */}
        <motion.div
          initial={{ rotate: -5, scale: 0.9 }}
          animate={{ rotate: -3, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.6, type: 'spring' }}
          style={{ position: 'relative' }}
        >
          {/* Ribbon bow on top */}
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ repeat: Infinity, duration: 4 }}
            style={{
              position: 'absolute', top: -30, left: '50%', transform: 'translateX(-50%)',
              fontSize: '2.5rem', zIndex: 10, filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))',
            }}
          >
            🎀
          </motion.div>

          {/* Polaroid frame - dark themed */}
          <div style={{
            background: 'linear-gradient(145deg, #141018 0%, #0c0a12 100%)',
            padding: '10px 10px 45px 10px',
            borderRadius: 8,
            border: '1px solid rgba(255,135,190,0.15)',
            boxShadow: '0 8px 40px rgba(0,0,0,0.6), 0 0 30px rgba(255,135,190,0.08), 0 2px 8px rgba(0,0,0,0.4)',
            transform: 'rotate(-2deg)',
            width: 'clamp(180px, 30vw, 240px)',
          }}>
            <div style={{
              width: '100%', aspectRatio: '1',
              borderRadius: 6, overflow: 'hidden',
              background: '#0a0a15',
              border: '1px solid rgba(255,255,255,0.05)',
            }}>
              <img
                src={finallyMetImage}
                alt="Us"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                onError={(e) => {
                  // Fallback if image not found
                  (e.target as HTMLImageElement).style.display = 'none';
                  (e.target as HTMLImageElement).parentElement!.innerHTML = '<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,#ff87be15,#a855f715);font-size:3rem;">💕</div>';
                }}
              />
            </div>
            {/* Polaroid caption */}
            <p style={{
              textAlign: 'center', marginTop: 10,
              fontFamily: "'Playfair Display', Georgia, serif",
              fontStyle: 'italic', fontSize: '0.85rem',
              color: 'rgba(255,135,190,0.6)', fontWeight: 700,
            }}>
              Us 💕
            </p>
          </div>

          {/* Teddy bear sticker */}
          <motion.div
            animate={{ y: [0, -5, 0], rotate: [0, 3, -3, 0] }}
            transition={{ repeat: Infinity, duration: 3 }}
            style={{
              position: 'absolute', bottom: -25, left: -20,
              fontSize: '2.5rem', filter: 'drop-shadow(0 3px 6px rgba(0,0,0,0.3))',
              zIndex: 10,
            }}
          >
            🧸
          </motion.div>

          {/* Heart sticker */}
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            style={{
              position: 'absolute', top: 10, right: -15,
              fontSize: '1.5rem', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))',
              zIndex: 10,
            }}
          >
            💖
          </motion.div>
        </motion.div>

        {/* RIGHT: Passcode entry */}
        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          style={{ textAlign: 'center' }}
        >
          {/* Title */}
          <motion.h2
            className="glow-text"
            style={{
              fontSize: 'clamp(1.4rem, 3vw, 1.8rem)',
              fontWeight: 700,
              color: '#ff87be',
              marginBottom: '0.5rem',
              fontFamily: "'Playfair Display', Georgia, serif",
              fontStyle: 'italic',
            }}
          >
            Secured Login
          </motion.h2>
          <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 600, marginBottom: '1.5rem' }}>
            Enter your birthday passcode 🎂
          </p>

          {/* Passcode boxes (8 digits) */}
          <motion.div
            animate={shake ? { x: [-20, 20, -15, 15, -5, 5, 0] } : {}}
            transition={{ duration: 0.5 }}
            style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', marginBottom: '2rem' }}
          >
            {[0, 1, 2, 3, 4, 5, 6, 7].map(i => (
              <motion.div
                key={i}
                animate={code[i] ? { scale: [0.8, 1.15, 1], borderColor: success ? '#34d399' : '#ff87be' } : {}}
                style={{
                  width: 38, height: 50,
                  borderRadius: 10,
                  border: `2px solid ${code[i] ? (success ? '#34d399' : '#ff87be') : 'rgba(255,255,255,0.12)'}`,
                  background: code[i] ? (success ? 'rgba(52,211,153,0.1)' : 'rgba(255,135,190,0.08)') : 'rgba(255,255,255,0.03)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.2rem', fontWeight: 800,
                  color: success ? '#34d399' : '#ff87be',
                  transition: 'all 0.2s ease',
                  boxShadow: code[i] ? `0 4px 15px rgba(0, 0, 0, 0.4)` : 'none',
                }}
              >
                {code[i] ? (success ? '✓' : '●') : ''}
              </motion.div>
            ))}
          </motion.div>

          {/* Number pad */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '0.6rem',
            maxWidth: 240,
            margin: '0 auto',
          }}>
            {numPadKeys.map(key => (
              <motion.button
                key={key}
                whileHover={{ scale: 1.1, background: 'rgba(255,135,190,0.15)' }}
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  if (key === '⌫') handleDelete();
                  else if (key === '✦') {} // decorative
                  else handleDigit(key);
                }}
                style={{
                  width: 60, height: 60,
                  borderRadius: '50%',
                  border: key === '✦' ? '2px solid rgba(255,255,255,0.05)' : '2px solid rgba(255,135,190,0.15)',
                  background: key === '✦' ? 'transparent' : 'rgba(255,255,255,0.04)',
                  color: key === '⌫' ? '#ff6b6b' : key === '✦' ? 'rgba(255,135,190,0.3)' : '#e0d0e8',
                  fontSize: key === '⌫' || key === '✦' ? '1.2rem' : '1.3rem',
                  fontWeight: 700,
                  cursor: key === '✦' ? 'default' : 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: "'Space Grotesk', sans-serif",
                  transition: 'all 0.2s ease',
                  boxShadow: key === '✦' ? 'none' : '0 2px 10px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.05)',
                }}
              >
                {key}
              </motion.button>
            ))}
          </div>

          {/* Success message */}
          <AnimatePresence>
            {success && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ marginTop: '1.5rem', color: '#34d399', fontSize: '1rem', fontWeight: 700 }}
              >
                ✨ Welcome, Noor! ✨
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>

      {/* Bottom decorations */}
      <div style={{ position: 'absolute', bottom: 20, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
        {['💫', '✨', '🌟', '✨', '💫'].map((e, i) => (
          <motion.span
            key={i}
            animate={{ y: [0, -6, 0], opacity: [0.3, 0.7, 0.3] }}
            transition={{ repeat: Infinity, duration: 2, delay: i * 0.3 }}
            style={{ fontSize: '0.9rem' }}
          >
            {e}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
};

// ============================================================
// MUSIC PLAYER BAR
// ============================================================
const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(true); // Should be playing by default after click

  const togglePlay = () => {
    const audio = document.getElementById('main-bg-music') as HTMLAudioElement;
    if (!audio) return;
    if (isPlaying) audio.pause();
    else audio.play();
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    const audio = document.getElementById('main-bg-music') as HTMLAudioElement;
    if (!audio) return;
    
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);

    audio.addEventListener('play', onPlay);
    audio.addEventListener('pause', onPause);
    
    // Initial sync
    setIsPlaying(!audio.paused);

    return () => {
      audio.removeEventListener('play', onPlay);
      audio.removeEventListener('pause', onPause);
    };
  }, []);

  return (
    <motion.div
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 1, duration: 0.8 }}
      style={{
        position: 'fixed', bottom: '2rem', left: '2rem', zIndex: 1000,
        display: 'flex', alignItems: 'center', gap: '1rem',
        padding: '0.6rem 1.2rem',
        background: 'rgba(255,255,255,0.03)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '999px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
      }}
    >
      
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={togglePlay}
        style={{
          width: 44, height: 44,
          borderRadius: '50%',
          background: isPlaying ? 'rgba(255,135,190,0.15)' : 'rgba(255,255,255,0.05)',
          border: `1px solid ${isPlaying ? '#ff87be50' : 'rgba(255,255,255,0.1)'}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', color: isPlaying ? '#ff87be' : '#fff',
        }}
      >
        <Music style={{ width: 20, height: 20, animation: isPlaying ? 'spin 4s linear infinite' : 'none' }} />
      </motion.button>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <p style={{ fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'rgba(255,255,255,0.3)', fontWeight: 700 }}>Now Playing</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <p style={{ fontSize: '0.8rem', fontWeight: 600, color: '#e0e0ff' }}>Finally We Met</p>
          {isPlaying && (
            <div style={{ display: 'flex', gap: '2px', alignItems: 'flex-end', height: 12 }}>
              {[1, 2, 3, 4].map(i => (
                <motion.div
                  key={i}
                  animate={{ height: [2, 12, 4, 10, 2] }}
                  transition={{ repeat: Infinity, duration: 0.8, delay: i * 0.1 }}
                  style={{ width: 2, background: '#ff87be', borderRadius: 1 }}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

// ============================================================
// ADMIN PANEL (View her replies)
// ============================================================
const AdminPanel = ({ onBack }: { onBack: () => void }) => {
  const [replies, setReplies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:8080/api/reflections')
      .then(res => setReplies(res.data)) // Backend already returns newest first
      .catch(err => console.log("Admin Panel connection failed", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{
        position: 'fixed', inset: 0, zIndex: 10000,
        background: '#050510', color: '#fff',
        padding: '4rem 2rem', overflowY: 'auto'
      }}
    >
      <Universe />
      <div style={{ maxWidth: 800, margin: '0 auto', position: 'relative', zIndex: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4rem' }}>
          <div>
            <h1 className="glow-text-xl" style={{ fontSize: '2.5rem', fontWeight: 900 }}>Noor&apos;s Reflections</h1>
            <p style={{ color: 'rgba(255,255,255,0.4)', letterSpacing: '0.2em', textTransform: 'uppercase', fontSize: '0.7rem', marginTop: '0.5rem' }}>Admin Control Center</p>
          </div>
          <button onClick={onBack} className="btn-ghost" style={{ padding: '0.6rem 1.5rem' }}>Back to Start</button>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '10rem 0' }}>
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}>
              <Sparkles style={{ width: 40, height: 40, color: '#ff87be' }} />
            </motion.div>
          </div>
        ) : replies.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '10rem 0', background: 'rgba(255,255,255,0.02)', borderRadius: '2rem', border: '1px dashed rgba(255,255,255,0.1)' }}>
            <p style={{ color: 'rgba(255,255,255,0.3)' }}>No messages found yet...</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {replies.map((reply, i) => (
              <motion.div
                key={reply.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass-card"
                style={{ padding: '2rem', borderRadius: '1.5rem', position: 'relative' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                    <div style={{ padding: '0.5rem', background: 'rgba(255,135,190,0.1)', borderRadius: '0.5rem' }}>
                      <Heart style={{ width: 16, height: 16, color: '#ff87be' }} />
                    </div>
                    <span style={{ fontWeight: 700, fontSize: '0.9rem', color: '#ff87be' }}>Reply #{replies.length - i}</span>
                  </div>
                  <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.2)' }}>{new Date(reply.createdAt).toLocaleString()}</span>
                </div>
                <p style={{ fontSize: '1.1rem', lineHeight: 1.6, color: '#e0e0ff', fontStyle: 'italic', fontFamily: "'Playfair Display', serif" }}>
                  &quot;{reply.content}&quot;
                </p>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

// ============================================================
// MEMORY WALL (Kabir & Akriti)
// ============================================================
const MemoryWall = ({ onBack }: { onBack: () => void }) => {
  const [activeCard, setActiveCard] = useState<'kabir' | 'akriti' | null>(null);
  const [kabirMemory, setKabirMemory] = useState('');
  const [akritiMemory, setAkritiMemory] = useState('');
  const [kabirReaction, setKabirReaction] = useState<string | null>(null);
  const [akritiReaction, setAkritiReaction] = useState<string | null>(null);
  const [allMemories, setAllMemories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMemories = () => {
    setLoading(true);
    axios.get('http://localhost:8080/api/memories')
      .then(res => {
        setAllMemories(res.data);
      })
      .catch(err => console.error("Failed to fetch memories:", err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchMemories();
  }, []);

  const saveToDB = async (type: 'kabir' | 'akriti') => {
    const content = type === 'kabir' ? kabirMemory : akritiMemory;
    const reaction = type === 'kabir' ? kabirReaction : akritiReaction;
    
    if (!content && !reaction) return;

    try {
      await axios.post('http://localhost:8080/api/memories', {
        type,
        content: content || "(Shared a reaction ✨)",
        reaction
      });
      // Refresh list
      fetchMemories();
      // Clear inputs
      if (type === 'kabir') setKabirMemory('');
      else setAkritiMemory('');
    } catch (err) {
      console.error("Save failed:", err);
    }
  };

  useEffect(() => {
    const mainAudio = document.getElementById('main-bg-music') as HTMLAudioElement;
    const memoryAudio = document.getElementById('memory-music') as HTMLAudioElement;

    if (activeCard === 'kabir') {
      if (mainAudio) mainAudio.pause();
      if (memoryAudio) {
        memoryAudio.currentTime = 0;
        memoryAudio.play().catch(e => console.log("Memory music (Kabir) error:", e));
      }
    } else {
      // Pause memory music when not on Kabir card
      if (memoryAudio) memoryAudio.pause();
      // Resume main music if we're just on the wall or on Akriti card
      if (mainAudio) {
        mainAudio.play().catch(e => console.log("Resume main music error:", e));
      }
    }
    
    // Cleanup on unmount
    return () => {
      if (memoryAudio) memoryAudio.pause();
    };
  }, [activeCard]);

  const triggerReactions = (e: React.MouseEvent, emoji: string, type: 'kabir' | 'akriti') => {
    if (type === 'kabir') setKabirReaction(emoji);
    else setAkritiReaction(emoji);

    const x = e.clientX;
    const y = e.clientY;
    for (let j = 0; j < 8; j++) {
      const heart = document.createElement('div');
      heart.innerHTML = emoji;
      heart.style.position = 'fixed';
      heart.style.left = `${x}px`;
      heart.style.top = `${y}px`;
      heart.style.fontSize = '1.8rem';
      heart.style.pointerEvents = 'none';
      heart.style.zIndex = '100000';
      heart.style.transition = 'all 2s cubic-bezier(0.1, 0.8, 0.3, 1)';
      document.body.appendChild(heart);
      setTimeout(() => {
        heart.style.transform = `translate(${(Math.random() - 0.5) * 500}px, ${-400 - Math.random() * 300}px) rotate(${Math.random() * 720}deg) scale(${1.5 + Math.random()})`;
        heart.style.opacity = '0';
      }, 10);
      setTimeout(() => document.body.removeChild(heart), 2000);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.1 }}
      onClick={() => setActiveCard(null)} // Click outside to close
      style={{
        position: 'fixed', inset: 0, zIndex: 10000,
        background: '#020208', color: '#fff',
        padding: '2rem', overflowY: 'auto',
        display: 'flex', flexDirection: 'column', alignItems: 'center'
      }}
    >
      <Universe />
      <div style={{ maxWidth: 1000, width: '100%', margin: '0 auto', position: 'relative', zIndex: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '3rem', marginTop: '2rem' }}>
          <div>
            <h1 className="glow-text-xl" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900 }}>The Memory Wall</h1>
            <p style={{ color: 'rgba(255,135,190,0.6)', letterSpacing: '0.2em', textTransform: 'uppercase', fontSize: '0.7rem' }}>Special Connection ✦ 21012005</p>
          </div>
          <button onClick={onBack} className="btn-ghost" style={{ padding: '0.6rem 2rem' }}>Back</button>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '10rem 0' }}>
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}>
              <Star style={{ width: 40, height: 40, color: '#ff87be' }} />
            </motion.div>
            <p style={{ marginTop: '2rem', color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem', letterSpacing: '0.2em' }}>FETCHING MEMORIES...</p>
          </div>
        ) : (
          <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '2rem' }}>
          {/* Kabir Card */}
          <motion.div
            layout
            whileHover={{ y: activeCard === 'kabir' ? 0 : -8 }}
            onClick={(e) => { e.stopPropagation(); setActiveCard('kabir'); }}
            className="glass-card"
            style={{ 
              padding: '2.5rem', 
              width: activeCard === 'kabir' ? '100%' : 'clamp(280px, 45%, 450px)', 
              cursor: 'pointer', 
              position: 'relative',
              overflow: 'hidden',
              border: activeCard === 'kabir' ? '2px solid rgba(96, 165, 250, 0.4)' : (kabirReaction ? '1px solid rgba(96, 165, 250, 0.3)' : '1px solid rgba(255,255,255,0.05)'),
              transition: 'width 0.5s ease, border 0.3s ease',
              maxWidth: 800
            }}
          >
            {/* PERSISTED REACTION EMOJI */}
            {kabirReaction && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                style={{ position: 'absolute', top: 15, right: 15, fontSize: '2.5rem', filter: 'drop-shadow(0 0 10px rgba(96,165,250,0.4))', zIndex: 5 }}
              >
                {kabirReaction}
              </motion.div>
            )}

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', position: 'relative', zIndex: 2 }}>
              <div style={{ width: 50, height: 50, borderRadius: '50%', background: 'rgba(96, 165, 250, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Star style={{ color: '#60a5fa' }} />
              </div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Kabir&apos;s Memory</h2>
            </div>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem', lineHeight: 1.6, position: 'relative', zIndex: 2 }}>Describe the bond, the laughs, and the moments that stay forever. ✨</p>
            
            <AnimatePresence>
              {activeCard === 'kabir' && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }} 
                  animate={{ opacity: 1, height: 'auto' }} 
                  exit={{ opacity: 0, height: 0 }}
                  style={{ overflow: 'hidden' }}
                >
                  <div style={{ marginTop: '2rem' }}>
                    {/* HISTORY LIST */}
                    <div style={{ 
                      maxHeight: '200px', 
                      overflowY: 'auto', 
                      display: 'flex', 
                      flexDirection: 'column', 
                      gap: '1rem',
                      marginBottom: '2rem',
                      padding: '1rem',
                      background: 'rgba(0,0,0,0.2)',
                      borderRadius: '1rem'
                    }} className="hide-scroll">
                      {allMemories.filter(m => m.type === 'kabir').length === 0 ? (
                        <p style={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.8rem', textAlign: 'center' }}>No history yet. Start writing! ✨</p>
                      ) : (
                        allMemories.filter(m => m.type === 'kabir').map((m, idx) => (
                          <div key={idx} style={{ borderLeft: '2px solid rgba(96, 165, 250, 0.4)', paddingLeft: '1rem' }}>
                            <p style={{ fontSize: '0.9rem', color: '#60a5fa', fontWeight: 700, marginBottom: '0.2rem' }}>
                               {m.reaction} {new Date(m.createdAt).toLocaleDateString()}
                            </p>
                            <p style={{ fontSize: '1rem', color: '#e0e0ff', fontStyle: 'italic' }}>&quot;{m.content}&quot;</p>
                          </div>
                        ))
                      )}
                    </div>

                    <textarea 
                      value={kabirMemory} 
                      onChange={e => setKabirMemory(e.target.value)}
                      className="reflection-input" 
                      placeholder="Add a new memory..." 
                      rows={3}
                      style={{ fontSize: '1.1rem' }}
                    />
                    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1rem', marginTop: '1.5rem' }}>
                      {['❤️', '⚡', '🔥', '💎', '🥂', '🎮'].map(emoji => (
                        <motion.button 
                          key={emoji} 
                          whileHover={{ scale: 1.4 }}
                          whileTap={{ scale: 0.8 }}
                          onClick={(e) => { e.stopPropagation(); triggerReactions(e, emoji, 'kabir'); }} 
                          style={{ fontSize: '2rem', background: 'none', border: 'none', cursor: 'pointer', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))' }}
                        >
                          {emoji}
                        </motion.button>
                      ))}
                    </div>
                    <div style={{ textAlign: 'center', marginTop: '1.5rem', display: 'flex', justifyContent: 'center', gap: '1rem' }}>
                      <button 
                        onClick={(e) => { e.stopPropagation(); saveToDB('kabir'); }} 
                        className="btn-primary" 
                        style={{ padding: '0.6rem 2rem', fontSize: '0.8rem', background: 'linear-gradient(135deg, #60a5fa, #3b82f6)' }}
                      >
                        Pin to Wall 📌
                      </button>
                      <button onClick={(e) => { e.stopPropagation(); setActiveCard(null); }} className="btn-ghost" style={{ fontSize: '0.7rem' }}>Minimize</button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Akriti Card */}
          <motion.div
            layout
            whileHover={{ y: activeCard === 'akriti' ? 0 : -8 }}
            onClick={(e) => { e.stopPropagation(); setActiveCard('akriti'); }}
            className="glass-card"
            style={{ 
              padding: '2.5rem', 
              width: activeCard === 'akriti' ? '100%' : 'clamp(280px, 45%, 450px)', 
              cursor: 'pointer', 
              position: 'relative',
              overflow: 'hidden',
              border: activeCard === 'akriti' ? '2px solid #ff87be' : (akritiReaction ? '1px solid #ff87be60' : '1px solid rgba(255,255,255,0.05)'),
              transition: 'width 0.5s ease, border 0.3s ease',
              maxWidth: 800
            }}
          >
             {/* PERSISTED REACTION EMOJI */}
             {akritiReaction && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                style={{ position: 'absolute', top: 15, right: 15, fontSize: '2.5rem', filter: 'drop-shadow(0 0 10px rgba(255,135,190,0.4))', zIndex: 5 }}
              >
                {akritiReaction}
              </motion.div>
            )}

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', position: 'relative', zIndex: 2 }}>
              <div style={{ width: 50, height: 50, borderRadius: '50%', background: 'rgba(255, 135, 190, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Heart style={{ color: '#ff87be' }} />
              </div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Akriti&apos;s Memory</h2>
            </div>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem', lineHeight: 1.6, position: 'relative', zIndex: 2 }}>The twin flame of friendship and all the secrets shared. 🌸</p>
            
            <AnimatePresence>
              {activeCard === 'akriti' && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }} 
                  animate={{ opacity: 1, height: 'auto' }} 
                  exit={{ opacity: 0, height: 0 }}
                  style={{ overflow: 'hidden' }}
                >
                  <div style={{ marginTop: '2rem' }}>
                    {/* HISTORY LIST */}
                    <div style={{ 
                      maxHeight: '200px', 
                      overflowY: 'auto', 
                      display: 'flex', 
                      flexDirection: 'column', 
                      gap: '1rem',
                      marginBottom: '2rem',
                      padding: '1rem',
                      background: 'rgba(0,0,0,0.2)',
                      borderRadius: '1rem'
                    }} className="hide-scroll">
                      {allMemories.filter(m => m.type === 'akriti').length === 0 ? (
                        <p style={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.8rem', textAlign: 'center' }}>No history yet. Start writing! ✨</p>
                      ) : (
                        allMemories.filter(m => m.type === 'akriti').map((m, idx) => (
                          <div key={idx} style={{ borderLeft: '2px solid #ff87be', paddingLeft: '1rem' }}>
                            <p style={{ fontSize: '0.9rem', color: '#ff87be', fontWeight: 700, marginBottom: '0.2rem' }}>
                               {m.reaction} {new Date(m.createdAt).toLocaleDateString()}
                            </p>
                            <p style={{ fontSize: '1rem', color: '#e0e0ff', fontStyle: 'italic' }}>&quot;{m.content}&quot;</p>
                          </div>
                        ))
                      )}
                    </div>

                    <textarea 
                      value={akritiMemory} 
                      onChange={e => setAkritiMemory(e.target.value)}
                      className="reflection-input" 
                      placeholder="Add a new memory..." 
                      rows={3}
                      style={{ fontSize: '1.1rem' }}
                    />
                    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1rem', marginTop: '1.5rem' }}>
                      {['❤️', '🌸', '✨', '👯‍♀️', '🧸', '💖'].map(emoji => (
                        <motion.button 
                          key={emoji} 
                          whileHover={{ scale: 1.4 }}
                          whileTap={{ scale: 0.8 }}
                          onClick={(e) => { e.stopPropagation(); triggerReactions(e, emoji, 'akriti'); }} 
                          style={{ fontSize: '2rem', background: 'none', border: 'none', cursor: 'pointer', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))' }}
                        >
                          {emoji}
                        </motion.button>
                      ))}
                    </div>
                    <div style={{ textAlign: 'center', marginTop: '1.5rem', display: 'flex', justifyContent: 'center', gap: '1rem' }}>
                      <button 
                        onClick={(e) => { e.stopPropagation(); saveToDB('akriti'); }} 
                        className="btn-primary" 
                        style={{ padding: '0.6rem 2rem', fontSize: '0.8rem', background: 'linear-gradient(135deg, #ff87be, #a855f7)' }}
                      >
                        Pin to Wall 📌
                      </button>
                      <button onClick={(e) => { e.stopPropagation(); setActiveCard(null); }} className="btn-ghost" style={{ fontSize: '0.7rem' }}>Minimize</button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
        )}

        {/* Global End Actions */}
        {(kabirMemory || akritiMemory || kabirReaction || akritiReaction) && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ marginTop: '4rem', textAlign: 'center', background: 'rgba(255,255,255,0.02)', padding: '3rem', borderRadius: '2rem', border: '1px solid rgba(255,255,255,0.05)' }}
          >
            <p style={{ fontSize: '0.8rem', color: 'rgba(255,135,190,0.6)', marginBottom: '1.5rem', textTransform: 'uppercase', letterSpacing: '0.25em', fontWeight: 700 }}>Our story is written</p>
            <RunawayButton 
              label="End This 😊❤️" 
              onClick={async () => {
                try {
                  if (kabirMemory || kabirReaction) {
                    await axios.post('http://localhost:8080/api/memories', {
                      type: 'kabir',
                      content: kabirMemory || "(No text, just love)",
                      reaction: kabirReaction
                    });
                  }
                  if (akritiMemory || akritiReaction) {
                    await axios.post('http://localhost:8080/api/memories', {
                      type: 'akriti',
                      content: akritiMemory || "(No text, just love)",
                      reaction: akritiReaction
                    });
                  }
                  alert("Memories saved in the universe 💖✨");
                } catch (err) {
                  console.error("DB Save failed:", err);
                  alert("Memories saved in our hearts 💖");
                }
                onBack();
              }} 
            />
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

// ============================================================
// BIRTHDAY WISHES PAGE (Akriti)
// ============================================================
const BirthdayWishes = ({ onBack }: { onBack: () => void }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: 'fixed', inset: 0, zIndex: 10000,
        background: 'linear-gradient(180deg, #0a0520 0%, #020208 100%)',
        color: '#fff', padding: '2rem', overflowY: 'auto',
        display: 'flex', flexDirection: 'column', alignItems: 'center'
      }}
    >
      <Universe />
      <FloatingParticles />
      <div style={{ maxWidth: 800, width: '100%', margin: '0 auto', position: 'relative', zIndex: 10, textAlign: 'center', paddingTop: '4rem' }}>
          <motion.div
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', damping: 10 }}
            style={{ fontSize: '6rem', marginBottom: '2rem', filter: 'drop-shadow(0 0 20px rgba(255,135,190,0.4))' }}
          >
            🎂
          </motion.div>
          <h1 className="glow-text-xl" style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 900, marginBottom: '0.5rem' }}>hie akritiii</h1>
          <p style={{ color: '#ff87be', fontSize: '1.2rem', letterSpacing: '0.4em', textTransform: 'uppercase', marginBottom: '3rem', fontWeight: 700 }}>April 13th ✦ 2026</p>
          
          <motion.div 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="glass-card" 
            style={{ padding: 'clamp(2rem, 5vw, 4rem)', borderRadius: '2.5rem', marginBottom: '4rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,135,190,0.2)' }}
          >
             <p style={{ fontSize: 'clamp(1.2rem, 3vw, 1.8rem)', lineHeight: 1.8, fontStyle: 'italic', fontFamily: "'Playfair Display', serif", color: '#e0e0ff' }}>
                "To the person who makes life a celebration, may your day be as extraordinary as your soul. Shine bright, laugh loud, and keep being the amazing human you are. The stars are celebrating YOU today!"
             </p>
             <div style={{ marginTop: '3rem', display: 'flex', justifyContent: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
                {['✨', '💖', '🎈', '🎉', '🍰', '🌸', '🎁'].map((e, i) => (
                  <motion.span 
                    key={i} 
                    animate={{ y: [0, -15, 0], scale: [1, 1.2, 1] }} 
                    transition={{ repeat: Infinity, duration: 2 + Math.random(), delay: i * 0.1 }}
                    style={{ fontSize: '2.5rem', filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))' }}
                  >
                    {e}
                  </motion.span>
                ))}
             </div>
          </motion.div>
          
          <motion.button 
            whileHover={{ scale: 1.1, boxShadow: '0 0 20px rgba(255,135,190,0.4)' }}
            whileTap={{ scale: 0.9 }}
            onClick={onBack} 
            className="btn-primary" 
            style={{ padding: '1.2rem 4rem', fontSize: '1.1rem', background: 'linear-gradient(135deg, #ff87be, #a855f7)' }}
          >
            Back to Start ✨
          </motion.button>
      </div>
    </motion.div>
  );
};

// ============================================================
// MAIN APP
// ============================================================
const App = () => {
  const [isStarted, setIsStarted] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isMemoryWall, setIsMemoryWall] = useState(false);
  const [isBirthdayPage, setIsBirthdayPage] = useState(false);
  const [reflection, setReflection] = useState('');
  const [isGiftOpen, setGiftOpen] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isEnding, setEnding] = useState(false);
  const { scrollYProgress } = useScroll();
  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  useEffect(() => {
    const saved = localStorage.getItem('noor_reflection');
    if (saved) setReflection(saved);
    axios.get('http://localhost:8080/api/reflections/latest')
      .then(res => setReflection(res.data.content || ''))
      .catch(() => console.log("Backend connection failed. Using local storage."));
  }, []);

  const saveReflection = async () => {
    localStorage.setItem('noor_reflection', reflection);
    try {
      await axios.post('http://localhost:8080/api/reflections', { content: reflection });
      alert('Saved to cloud ✨');
      setReflection(''); // Clear input after save
      localStorage.removeItem('noor_reflection');
    } catch (e) {
      alert('Saved locally ✨');
    }
  };

  const openGift = useCallback(() => {
    setGiftOpen(true);
    setShowConfetti(true);
    
    // Toggle music: Pause main, play birthday
    const mainAudio = document.getElementById('main-bg-music') as HTMLAudioElement;
    const bdayAudio = document.getElementById('gift-music') as HTMLAudioElement;
    if (mainAudio) mainAudio.pause();
    if (bdayAudio) {
      bdayAudio.currentTime = 0;
      bdayAudio.play().catch(e => console.log("Birthday music error:", e));
    }
    
    setTimeout(() => setShowConfetti(false), 5000);
  }, []);

  return (
    <div style={{ position: 'relative', minHeight: '100vh', color: '#f8f8ff' }}>
      {/* Background Music (Continuous) */}
      <audio id="main-bg-music" src={finallyMetMusic} loop />
      <audio id="letter-music" src={khatMusic} />
      <audio id="reel-audio" src={reelAudio} />
      <audio id="peace-music" src={peaceMusic} />
      <audio id="she-music" src={sheMusic} />
      <audio id="gift-music" src={birthdayMusic} />
      <audio id="memory-music" src={milangaMusic} loop />

      {/* START SCREEN */}
      <AnimatePresence>
        {!isStarted && (
          <StartScreen onStart={() => {
            setIsStarted(true);
            const audio = document.getElementById('main-bg-music') as HTMLAudioElement;
            if (audio) {
              audio.play().catch(e => console.log("Audio play failed:", e));
            }
          }} />
        )}
      </AnimatePresence>

      {/* PASSCODE GATE */}
      <AnimatePresence>
        {isStarted && !isUnlocked && !isAdmin && !isMemoryWall && !isBirthdayPage && (
          <PasscodeScreen onUnlock={(mode) => {
            if (mode === 'admin') setIsAdmin(true);
            else if (mode === 'kabir-akriti') setIsMemoryWall(true);
            else if (mode === 'birthday-wishes') setIsBirthdayPage(true);
            else setIsUnlocked(true);
          }} />
        )}
      </AnimatePresence>

      {/* ADMIN PANEL */}
      <AnimatePresence>
        {isAdmin && <AdminPanel onBack={() => {
          setIsAdmin(false);
          setIsStarted(false);
        }} />}
      </AnimatePresence>

      {/* MEMORY WALL GATE */}
      <AnimatePresence>
        {isMemoryWall && <MemoryWall onBack={() => {
          setIsMemoryWall(false);
          setIsStarted(false);
          const mainAudio = document.getElementById('main-bg-music') as HTMLAudioElement;
          const memoryAudio = document.getElementById('memory-music') as HTMLAudioElement;
          if (memoryAudio) memoryAudio.pause();
          if (mainAudio) mainAudio.play().catch(e => console.log("Restore main music error:", e));
        }} />}
      </AnimatePresence>

      {/* BIRTHDAY WISHES GATE */}
      <AnimatePresence>
        {isBirthdayPage && <BirthdayWishes onBack={() => {
          setIsBirthdayPage(false);
          setIsStarted(false);
        }} />}
      </AnimatePresence>

      {/* MAIN CONTENT (Only visible after unlock) */}
      {isUnlocked && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <MusicPlayer />

          {/* Scroll Progress Bar */}
          <motion.div
            style={{
              position: 'fixed', top: 0, left: 0, height: 3, zIndex: 999,
              width: progressWidth,
              background: 'linear-gradient(90deg, #ff87be, #a855f7, #60a5fa, #efc900)',
            }}
          />

          <Universe />
          <Aurora />
          <FloatingParticles />
          <Confetti active={showConfetti} />

      {/* ================================= */}
      {/* HERO SECTION */}
      {/* ================================= */}
      <section style={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden', display: 'flex', alignItems: 'center', padding: '0 2rem' }}>
        <TreeCanvas />

        {/* Gradient overlay */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(0,0,0,0.85), rgba(0,0,0,0.3), transparent)', pointerEvents: 'none', zIndex: 20 }} />

        {/* Hero content */}
        <div style={{ position: 'relative', zIndex: 30, maxWidth: 700, paddingLeft: '2rem' }}>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="section-label" style={{ marginBottom: '1.5rem' }}>
              <Crown style={{ width: 12, height: 12 }} />
              A Birthday Celebration
            </div>

            <h1 className="glow-text-xl" style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 1.05, marginBottom: '0.5rem' }}>
              Hey you <motion.span animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 2 }} style={{ display: 'inline-block' }}>💕</motion.span>
            </h1>

            <h2 className="gradient-text" style={{ fontSize: 'clamp(1.8rem, 5vw, 3.5rem)', fontWeight: 700, marginBottom: '2rem' }}>
              Happy Birthday Noor 🎂
            </h2>
          </motion.div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {[
              { text: 'May God bless you 🌿', delay: 1.5 },
              { text: 'And give you all the happiness 🌸', delay: 2.5 },
            ].map((item, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: item.delay, duration: 0.6 }}
                style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)', color: '#b8b8d0', fontWeight: 500 }}
              >
                {item.text}
              </motion.p>
            ))}

            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 3.5, duration: 0.6 }}
              className="gradient-text-gold"
              style={{ fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)', fontWeight: 900 }}
            >
              You truly deserve it all 💖
              <span className="typing-cursor" />
            </motion.p>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 5 }}
          style={{ position: 'absolute', bottom: 40, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, zIndex: 30 }}
        >
          <span style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 700, color: 'rgba(255,135,190,0.5)' }}>Scroll Down</span>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
            <ArrowDown style={{ width: 24, height: 24, color: 'rgba(255,135,190,0.5)' }} />
          </motion.div>
        </motion.div>
      </section>

      {/* ================================= */}
      {/* MESSAGES SECTION (Postal Letters) */}
      {/* ================================= */}
      <section className="section-alt" style={{ padding: '10rem 1.5rem' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <SectionHeading label="Letters" title="Your Mail Has Arrived ✉️" />

          <div className="hide-scroll" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem',
            paddingBottom: '2rem',
          }}>
            {postalData.map((data, i) => (
              <PostalEnvelope key={i} data={data} delay={0.1 + i * 0.15} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ================================= */}
      {/* GIFT SECTION */}
      {/* ================================= */}
      <section style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden', padding: '6rem 1.5rem' }}>
        {/* Background orb */}
        <div style={{ position: 'absolute', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,135,190,0.06), transparent 60%)', filter: 'blur(60px)', pointerEvents: 'none' }} />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: '4rem' }}
        >
          <div className="section-label" style={{ marginBottom: '1rem', display: 'inline-flex' }}>
            <Gift style={{ width: 12, height: 12 }} />
            Surprise
          </div>
          <h2 className="glow-text-xl" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, marginBottom: '0.5rem' }}>
            A Special Something
          </h2>
          <p style={{ color: '#b8b8d0', letterSpacing: '0.15em', textTransform: 'uppercase', fontSize: '0.8rem', fontWeight: 700 }}>
            Tap to unwrap your surprise
          </p>
        </motion.div>

        {/* Gift Box */}
        <motion.div
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          onClick={openGift}
          style={{ position: 'relative', cursor: 'pointer' }}
        >
          {!isGiftOpen && (
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
            >
              {/* Pulsing rings */}
              <div className="pulse-ring" style={{ width: 280, height: 280, top: -28, left: -28 }} />
              <div className="pulse-ring" style={{ width: 280, height: 280, top: -28, left: -28, animationDelay: '0.5s' }} />

              <div className="gift-glow" style={{ width: 224, height: 224, background: 'linear-gradient(135deg, #ff68a7, #e0608a)', position: 'relative', borderRadius: '1.2rem', overflow: 'hidden' }}>
                {/* Lid */}
                <div className="gift-lid-shadow" style={{ position: 'absolute', top: -24, left: -8, width: 'calc(100% + 16px)', height: 56, background: 'linear-gradient(135deg, #ff87be, #f06292)', borderRadius: '12px 12px 0 0', zIndex: 20 }} />
                {/* Ribbons */}
                <div style={{ position: 'absolute', left: '50%', top: 0, width: 40, height: '100%', background: 'rgba(255,255,255,0.9)', transform: 'translateX(-50%)', zIndex: 10 }} />
                <div style={{ position: 'absolute', top: '50%', left: 0, width: '100%', height: 40, background: 'rgba(255,255,255,0.9)', transform: 'translateY(-50%)', zIndex: 10 }} />
                {/* Icon */}
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 15 }}>
                  <Gift style={{ width: 48, height: 48, color: 'rgba(255,255,255,0.4)' }} />
                </div>
                {/* Bow */}
                <div style={{ position: 'absolute', top: -34, left: '50%', transform: 'translateX(-50%)', fontSize: '2.5rem', zIndex: 25 }}>🎀</div>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Gift Modal */}
        <AnimatePresence>
          {isGiftOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="modal-backdrop"
              style={{ position: 'fixed', inset: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem' }}
              onClick={() => setGiftOpen(false)}
            >
              <motion.div
                initial={{ scale: 0.5, opacity: 0, rotateX: 20 }}
                animate={{ scale: 1, opacity: 1, rotateX: 0 }}
                exit={{ scale: 0.5, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                style={{ textAlign: 'center', maxWidth: 700 }}
                onClick={e => e.stopPropagation()}
              >
                {/* Orbiting emojis */}
                <div style={{ position: 'relative', display: 'inline-block' }}>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 8, ease: 'linear' }}
                    style={{ position: 'absolute', width: 300, height: 300, left: '50%', top: '50%', marginLeft: -150, marginTop: -150 }}
                  >
                    {['🌟', '✨', '💫', '⭐', '🎉', '🎊'].map((emoji, i) => (
                      <span key={i} style={{ position: 'absolute', left: '50%', top: '50%', fontSize: '1.5rem', transform: `rotate(${i * 60}deg) translateY(-140px)` }}>{emoji}</span>
                    ))}
                  </motion.div>

                  <motion.h2
                    animate={{ scale: [1, 1.03, 1] }}
                    transition={{ repeat: Infinity, duration: 3 }}
                    className="glow-text-xl gradient-text"
                    style={{ fontSize: 'clamp(2.5rem, 8vw, 5rem)', fontWeight: 900, lineHeight: 1.1, marginBottom: '2rem', position: 'relative' }}
                  >
                    Happy 21st<br />Birthday Noor!
                  </motion.h2>
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', gap: '3rem', marginBottom: '2rem' }}>
                  {[
                    { Icon: IceCream, color: '#fb923c', delay: 0 },
                    { Icon: Cookie, color: '#d97706', delay: 0.2 },
                    { Icon: Coffee, color: '#92400e', delay: 0.4 },
                  ].map(({ Icon: I, color, delay }, idx) => (
                    <motion.div
                      key={idx}
                      animate={{ y: [0, -16, 0] }}
                      transition={{ repeat: Infinity, duration: 2, delay }}
                    >
                      <I style={{ width: 56, height: 56, color }} />
                    </motion.div>
                  ))}
                </div>

                <p style={{ fontSize: '1.5rem', color: '#e0e0ff', fontWeight: 300, marginBottom: '2.5rem' }}>
                  Sweetest wishes for the sweetest person 🍫✨
                </p>

                <button
                  onClick={() => {
                    setGiftOpen(false);
                    // Toggle music: Pause birthday, resume main
                    const mainAudio = document.getElementById('main-bg-music') as HTMLAudioElement;
                    const bdayAudio = document.getElementById('gift-music') as HTMLAudioElement;
                    if (bdayAudio) bdayAudio.pause();
                    if (mainAudio) mainAudio.play().catch(e => console.log("Main music resume error:", e));
                  }}
                  className="btn-primary"
                  style={{ fontSize: '1.1rem', padding: '1rem 3rem' }}
                >
                  Close Surprise ✨
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* ================================= */}
      {/* FINAL SECTION */}
      {/* ================================= */}
      <section className="section-alt" style={{ minHeight: '100vh', padding: '10rem 1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ maxWidth: 900, width: '100%', textAlign: 'center' }}>
          {/* Main message */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={{ marginBottom: '5rem' }}
          >
            <div className="section-label" style={{ marginBottom: '1.5rem', display: 'inline-flex' }}>
              <Music style={{ width: 12, height: 12 }} />
              Final Chapter
            </div>

            <h2 className="glow-text-xl" style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 900, fontStyle: 'italic', letterSpacing: '-0.02em', lineHeight: 1.15, marginBottom: '1.5rem', fontFamily: "'Playfair Display', serif" }}>
              The Final Chapter<br />with You
            </h2>

            <div className="color-bar" style={{ width: 100, margin: '0 auto 3rem' }} />

            <p style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.6rem)', color: '#b8b8d0', fontWeight: 300, lineHeight: 1.8, maxWidth: 700, margin: '0 auto' }}>
              As you step into this new chapter of 21, remember that you are the author of your own beautiful story. Every sunrise is a new page.
              <br /><br />
              <span className="gradient-text" style={{ fontWeight: 700, fontSize: '1.3em' }}>Forever cheering for you.</span>
            </p>
          </motion.div>

          {/* Reflections Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card"
            style={{
              padding: 'clamp(2rem, 4vw, 4rem)',
              borderRadius: '2rem',
              textAlign: 'left',
              position: 'relative',
              overflow: 'hidden',
              marginBottom: '4rem',
            }}
          >
            {/* Background decoration */}
            <History style={{ position: 'absolute', top: 40, right: 40, width: 140, height: 140, color: '#ff87be', opacity: 0.04 }} />

            {/* Top accent line */}
            <div className="color-bar" style={{ position: 'absolute', top: 0, left: '5%', right: '5%', height: 2 }} />

            <div style={{ position: 'relative', zIndex: 10 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                <div style={{ padding: '0.6rem', background: 'rgba(255,135,190,0.1)', borderRadius: '0.8rem' }}>
                  <Save style={{ width: 24, height: 24, color: '#ff87be' }} />
                </div>
                <h3 style={{ fontSize: 'clamp(1.3rem, 3vw, 1.8rem)', fontWeight: 700 }}>Thank You & Reflections</h3>
              </div>

              <p style={{ color: 'rgba(255,135,190,0.5)', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.2em', fontWeight: 800, marginBottom: '1.5rem', paddingLeft: '3.5rem' }}>
                Noor&apos;s Reflections
              </p>

              <textarea
                value={reflection}
                onChange={e => setReflection(e.target.value)}
                className="reflection-input"
                placeholder="Write your goals for 21..."
                rows={4}
                style={{ fontSize: '1.2rem' }}
              />

              <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.06)', marginTop: '1.5rem' }}>
                <button onClick={saveReflection} className="btn-ghost" style={{ padding: '0.7rem 2rem', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <MessageSquare style={{ width: 16, height: 16 }} /> Save to Memory & Send ✨
                  </span>
                </button>
              </div>
            </div>
          </motion.div>

          {/* End This button with Highlight Animation */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            style={{ position: 'relative' }}
          >
            <motion.div
              animate={{ scale: [1, 1.25, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ repeat: Infinity, duration: 2 }}
              style={{
                position: 'absolute', inset: -8, borderRadius: '999px',
                border: '2px solid rgba(255, 135, 190, 0.4)', pointerEvents: 'none',
              }}
            />
            
            <button
              onClick={() => {
                setEnding(true);
                window.scrollTo({ top: 0 });
                // Stop all other sounds
                ['main-bg-music', 'letter-music', 'reel-audio', 'peace-music', 'she-music', 'gift-music', 'memory-music'].forEach(id => {
                  const el = document.getElementById(id) as HTMLAudioElement;
                  if (el) el.pause();
                });
              }}
              className="btn-ghost"
              style={{ fontSize: '1.2rem', padding: '1.2rem 4rem', position: 'relative', zIndex: 10, color: '#ff87be', borderColor: '#ff87be' }}
            >
              <span>End This ✨</span>
            </button>
          </motion.div>
        </div>
      </section>

      {/* ================================= */}
      {/* FOOTER */}
      {/* ================================= */}
      <footer style={{ padding: '3rem 1.5rem', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          style={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.8rem', letterSpacing: '0.1em' }}
        >
          Made with <Heart style={{ width: 12, height: 12, display: 'inline', color: '#ff87be', verticalAlign: 'middle' }} /> for Noor
        </motion.p>
      </footer>
        </motion.div>
      )}

      {/* FINAL CINEMATIC ENDING */}
      <AnimatePresence>
        {isEnding && <EndScene onBack={() => {
          setEnding(false);
          // Stop Bairan
          const bairan = document.getElementById('bairan-music') as HTMLAudioElement;
          if (bairan) bairan.pause();
          // Resume main music
          const main = document.getElementById('main-bg-music') as HTMLAudioElement;
          if (main) main.play().catch(e => console.log("Main music resume failed:", e));
        }} />}
      </AnimatePresence>
    </div>
  );
};

// ============================================================
// FINAL CINEMATIC SCENE
// ============================================================
const EndScene = ({ onBack }: { onBack: () => void }) => {
  const lyrics = [
    "This journey might end here...",
    "But our story is just beginning.",
    "Happy Birthday once again, Noor.",
    "May your 21st year be your best one yet.",
    "Keep shining like the moon above.",
    "Forever in your corner. ❤️"
  ];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < lyrics.length - 1) {
      const timer = setTimeout(() => setIndex(prev => prev + 1), 4000);
      return () => clearTimeout(timer);
    }
  }, [index]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: 'fixed', inset: 0, zIndex: 5000,
        background: '#020208',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        padding: '2rem', textAlign: 'center', overflow: 'hidden'
      }}
    >
      <audio id="bairan-music" autoPlay loop src="/bairan.mp3" />
      <Universe />
      
      <div style={{ position: 'relative', zIndex: 10 }}>
        <AnimatePresence mode="wait">
          <motion.p
            key={index}
            initial={{ y: 20, opacity: 0, filter: 'blur(10px)' }}
            animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
            exit={{ y: -20, opacity: 0, filter: 'blur(10px)' }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            style={{
              fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
              color: '#f8f8ff',
              fontFamily: "'Playfair Display', serif",
              fontStyle: 'italic',
              maxWidth: 800,
              lineHeight: 1.6,
              textShadow: '0 0 20px rgba(255,255,255,0.1)'
            }}
          >
            {lyrics[index]}
          </motion.p>
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: index === lyrics.length - 1 ? 1 : 0 }}
          transition={{ delay: 2, duration: 1 }}
          style={{ marginTop: '4rem' }}
        >
          <RunawayButton onClick={onBack} label="Go Back" />
        </motion.div>
      </div>

      {/* Decorative stars / dust */}
      <FloatingParticles />
    </motion.div>
  );
};

// ============================================================
// RUNAWAY BUTTON COMPONENT
// ============================================================
const RunawayButton = ({ onClick, label }: { onClick: () => void; label: string }) => {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleRunAway = () => {
    // Generate random position within a reasonable range
    const newX = (Math.random() - 0.5) * (window.innerWidth * 0.6);
    const newY = (Math.random() - 0.5) * (window.innerHeight * 0.6);
    setPos({ x: newX, y: newY });
  };

  return (
    <motion.button
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: 'spring', damping: 15, stiffness: 150 }}
      onMouseEnter={handleRunAway}
      onClick={onClick}
      className="btn-ghost"
      style={{ fontSize: '0.9rem', padding: '0.6rem 2rem', position: 'relative' }}
    >
      <span>{label}</span>
    </motion.button>
  );
};

export default App;
