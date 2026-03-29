

import { useState, useEffect, useRef, useCallback } from "react";

/* ═══════════════════════════════════════════════════════════════════════
   OMEDEV SERVICES — ULTRA PREMIUM WEBSITE
   Stack : React + Tailwind CSS
   Design : Light luxury tech · Unsplash photos · Micro-animations
═══════════════════════════════════════════════════════════════════════ */

// ─── UNSPLASH PHOTO HELPER ────────────────────────────────────────────────────
const photo = (id, w = 800, h = 500) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&h=${h}&q=80`;

const PHOTOS = {
  hero:       photo("1451187580459-43490279c0fa", 1600, 900),
  heroMobile: photo("1518770660439-4636190af475", 800, 600),
  services:   photo("1558494949-ef010cbdcc31", 1200, 700),
  erp:        photo("1460925895917-afdab827c52f", 900, 600),
  security:   photo("1563986768494-4dee2763ff3f", 900, 600),
  mobile:     photo("1512941937669-90a1b58e7e9c", 900, 600),
  cloud:      photo("1544197150-b99a580bb7a8", 900, 600),
  about:      photo("1522071820081-009f0129c71c", 1200, 700),
  team1:      photo("1507003211169-0a1dd7228f2d", 400, 400),
  team2:      photo("1494790108377-be9c29b29330", 400, 400),
  team3:      photo("1472099645785-5658abf4ff4e", 400, 400),
  team4:      photo("1438761681033-6461ffad8d80", 400, 400),
  project1:   photo("1551288049-bebda4e38f71", 800, 500),
  project2:   photo("1576091160550-2173dba999ef", 800, 500),
  project3:   photo("1563013544-824ae1b704d3", 800, 500),
  project4:   photo("1504868584819-f8e8b4b6d7e3", 800, 500),
  blog1:      photo("1488229297570-58520851e868", 700, 400),
  blog2:      photo("1550751827-4bd374c3f58b", 700, 400),
  blog3:      photo("1519389950473-47ba0277781c", 700, 400),
  blog4:      photo("1573164713714-d95e436ab8d8", 700, 400),
  africa:     photo("1547471080-7cc2caa01a7e", 1200, 700),
  contact:    photo("1497366216548-37526070297c", 900, 600),
};

// ─── GLOBAL STYLES ────────────────────────────────────────────────────────────
const GlobalStyles = () => {
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Clash+Display:wght@400;500;600;700&family=Cabinet+Grotesk:wght@300;400;500;700;800;900&family=Instrument+Serif:ital@0;1&display=swap');

      *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
      html { scroll-behavior: smooth; }
      body { 
        font-family: 'Cabinet Grotesk', system-ui, sans-serif;
        background: #f5f6fa; 
        color: #1a1d2e; 
        overflow-x: hidden;
        cursor: none;
      }

      /* Custom cursor */
      .cursor-dot {
        width: 8px; height: 8px;
        background: #2d5be3;
        border-radius: 50%;
        position: fixed; top: 0; left: 0;
        pointer-events: none; z-index: 9999;
        transition: transform 0.1s ease;
        transform: translate(-50%, -50%);
      }
      .cursor-ring {
        width: 36px; height: 36px;
        border: 1.5px solid rgba(45,91,227,0.4);
        border-radius: 50%;
        position: fixed; top: 0; left: 0;
        pointer-events: none; z-index: 9998;
        transition: transform 0.15s ease, width 0.3s ease, height 0.3s ease, opacity 0.3s ease;
        transform: translate(-50%, -50%);
      }
      .cursor-ring.expanded {
        width: 60px; height: 60px;
        border-color: rgba(45,91,227,0.6);
        background: rgba(45,91,227,0.04);
      }

      /* Scrollbar */
      ::-webkit-scrollbar { width: 4px; }
      ::-webkit-scrollbar-track { background: #f5f6fa; }
      ::-webkit-scrollbar-thumb { background: linear-gradient(180deg, #2d5be3, #1a3ab8); border-radius: 2px; }

      /* Font classes */
      .font-clash { font-family: 'Clash Display', sans-serif; }
      .font-cabinet { font-family: 'Cabinet Grotesk', sans-serif; }
      .font-serif-it { font-family: 'Instrument Serif', serif; font-style: italic; }

      /* Text gradients */
      .grad-blue { background: linear-gradient(135deg, #1a3ab8 0%, #2d5be3 40%, #5b8fff 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
      .grad-warm { background: linear-gradient(135deg, #c45c0a 0%, #e8833a 50%, #f4a742 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
      .grad-cool { background: linear-gradient(135deg, #2d5be3 0%, #5b8fff 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }

      /* Grid background */
      .grid-bg::before {
        content: '';
        position: absolute; inset: 0;
        background-image: 
          linear-gradient(rgba(45,91,227,0.06) 1px, transparent 1px),
          linear-gradient(90deg, rgba(45,91,227,0.06) 1px, transparent 1px);
        background-size: 72px 72px;
        pointer-events: none;
      }

      /* Dot grid */
      .dot-bg::before {
        content: '';
        position: absolute; inset: 0;
        background-image: radial-gradient(rgba(45,91,227,0.1) 1px, transparent 1px);
        background-size: 32px 32px;
        pointer-events: none;
      }

      /* Glass morphism — light version */
      .glass {
        background: rgba(255,255,255,0.7);
        backdrop-filter: blur(20px);
        border: 1px solid rgba(255,255,255,0.9);
        box-shadow: 0 2px 16px rgba(45,91,227,0.06);
      }
      .glass-blue {
        background: rgba(45,91,227,0.06);
        backdrop-filter: blur(20px);
        border: 1px solid rgba(45,91,227,0.12);
      }
      .glass-nav {
        background: rgba(245,246,250,0.92);
        backdrop-filter: blur(24px);
        border-bottom: 1px solid rgba(45,91,227,0.08);
        box-shadow: 0 2px 20px rgba(45,91,227,0.06);
      }

      /* Orbs / blobs */
      .orb {
        position: absolute;
        border-radius: 50%;
        filter: blur(100px);
        pointer-events: none;
        z-index: 0;
        animation: orbFloat 12s ease-in-out infinite;
      }
      @keyframes orbFloat {
        0%, 100% { transform: translateY(0) scale(1); }
        50% { transform: translateY(-30px) scale(1.05); }
      }

      /* Noise overlay */
      .noise-overlay::after {
        content: '';
        position: absolute; inset: 0;
        background: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='512' height='512' filter='url(%23n)' opacity='0.025'/%3E%3C/svg%3E");
        pointer-events: none; z-index: 1;
      }

      /* Button glow */
      .btn-glow {
        background: linear-gradient(135deg, #2d5be3 0%, #1a3ab8 100%);
        position: relative; overflow: hidden;
        transition: transform 0.3s cubic-bezier(.34,1.56,.64,1), box-shadow 0.3s ease;
        color: #fff;
      }
      .btn-glow::before {
        content: '';
        position: absolute; inset: -2px;
        background: linear-gradient(135deg, #5b8fff, #2d5be3, #1a3ab8);
        border-radius: inherit;
        z-index: -1;
        opacity: 0;
        transition: opacity 0.3s ease;
        filter: blur(8px);
      }
      .btn-glow:hover { transform: translateY(-3px); box-shadow: 0 20px 60px rgba(45,91,227,0.35); }
      .btn-glow:hover::before { opacity: 1; }

      .btn-ghost {
        background: rgba(255,255,255,0.8);
        border: 1px solid rgba(45,91,227,0.2);
        transition: all 0.3s ease;
      }
      .btn-ghost:hover {
        background: rgba(255,255,255,1);
        border-color: rgba(45,91,227,0.4);
        transform: translateY(-2px);
        box-shadow: 0 8px 30px rgba(45,91,227,0.12);
      }

      /* Card hover lift */
      .card-lift {
        transition: transform 0.4s cubic-bezier(.34,1.56,.64,1), box-shadow 0.4s ease, border-color 0.3s ease;
      }
      .card-lift:hover {
        transform: translateY(-10px) scale(1.01);
        box-shadow: 0 32px 80px rgba(45,91,227,0.12);
        border-color: rgba(45,91,227,0.25) !important;
      }

      /* Image zoom on hover */
      .img-zoom { overflow: hidden; }
      .img-zoom img { transition: transform 0.6s cubic-bezier(.34,1.2,.64,1); }
      .img-zoom:hover img { transform: scale(1.08); }

      /* Reveal animation */
      .reveal { opacity: 0; transform: translateY(40px); transition: opacity 0.8s ease, transform 0.8s cubic-bezier(.34,1.2,.64,1); }
      .reveal.in { opacity: 1; transform: translateY(0); }
      .reveal-left { opacity: 0; transform: translateX(-40px); transition: opacity 0.8s ease, transform 0.8s cubic-bezier(.34,1.2,.64,1); }
      .reveal-left.in { opacity: 1; transform: translateX(0); }
      .reveal-right { opacity: 0; transform: translateX(40px); transition: opacity 0.8s ease, transform 0.8s cubic-bezier(.34,1.2,.64,1); }
      .reveal-right.in { opacity: 1; transform: translateX(0); }

      /* Stagger delays */
      .delay-100 { transition-delay: 0.1s; }
      .delay-200 { transition-delay: 0.2s; }
      .delay-300 { transition-delay: 0.3s; }
      .delay-400 { transition-delay: 0.4s; }
      .delay-500 { transition-delay: 0.5s; }
      .delay-600 { transition-delay: 0.6s; }

      /* Floating badge */
      @keyframes floatBadge { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
      .float-badge { animation: floatBadge 3s ease-in-out infinite; }

      /* Shine sweep */
      @keyframes shine { 0%{left:-100%} 100%{left:200%} }
      .shine-btn::after {
        content: '';
        position: absolute;
        top: 0; left: -100%;
        width: 60%; height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
        animation: shine 2.5s infinite;
      }

      /* Tag pill */
      .tag-pill {
        font-family: 'Clash Display', sans-serif;
        font-size: 0.65rem;
        font-weight: 600;
        letter-spacing: 0.12em;
        text-transform: uppercase;
      }

      /* Gradient border */
      .grad-border {
        position: relative;
        background: #ffffff;
      }
      .grad-border::before {
        content: '';
        position: absolute; inset: 0;
        border-radius: inherit;
        padding: 1px;
        background: linear-gradient(135deg, rgba(45,91,227,0.35), rgba(45,91,227,0.05), rgba(45,91,227,0.18));
        -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
        mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
        -webkit-mask-composite: xor;
        mask-composite: exclude;
        pointer-events: none;
      }

      /* WA float */
      @keyframes waPulse {
        0%,100%{box-shadow:0 0 0 0 rgba(37,211,102,0.4)}
        70%{box-shadow:0 0 0 12px rgba(37,211,102,0)}
      }
      .wa-btn { animation: waPulse 2.5s infinite; }

      /* Horizontal scroll marquee */
      @keyframes marquee { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
      .marquee-track { animation: marquee 20s linear infinite; display:flex; width:max-content; }
      .marquee-track:hover { animation-play-state: paused; }

      /* Section divider */
      .divider { height:1px; background:linear-gradient(90deg,transparent,rgba(45,91,227,0.15),transparent); }

      /* Pricing glow */
      .pricing-featured {
        background: linear-gradient(135deg, #ffffff 0%, #f0f4ff 100%) !important;
        border-color: rgba(45,91,227,0.3) !important;
        box-shadow: 0 0 60px rgba(45,91,227,0.1), inset 0 1px 0 rgba(255,255,255,0.9);
      }

      /* Image overlay gradient */
      .img-overlay {
        position:relative;
      }
      .img-overlay::after {
        content:'';
        position:absolute; inset:0;
        background:linear-gradient(to top, rgba(245,246,250,0.85) 0%, rgba(245,246,250,0.1) 60%, transparent 100%);
        pointer-events:none;
      }

      /* Card base */
      .card-base {
        background: #ffffff;
        border: 1px solid rgba(45,91,227,0.08);
        box-shadow: 0 2px 12px rgba(45,91,227,0.05);
      }

      /* Mobile responsive */
      @media(max-width:768px) {
        body { cursor: auto; }
        .cursor-dot,.cursor-ring { display:none; }
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);
  return null;
};

// ─── CUSTOM CURSOR ────────────────────────────────────────────────────────────
const CustomCursor = () => {
  const dot = useRef(null);
  const ring = useRef(null);

  useEffect(() => {
    const move = (e) => {
      if (dot.current) { dot.current.style.left = e.clientX + "px"; dot.current.style.top = e.clientY + "px"; }
      if (ring.current) { ring.current.style.left = e.clientX + "px"; ring.current.style.top = e.clientY + "px"; }
    };
    const enter = () => ring.current?.classList.add("expanded");
    const leave = () => ring.current?.classList.remove("expanded");
    document.addEventListener("mousemove", move);
    document.querySelectorAll("a,button").forEach(el => { el.addEventListener("mouseenter", enter); el.addEventListener("mouseleave", leave); });
    return () => document.removeEventListener("mousemove", move);
  }, []);

  return (
    <>
      <div ref={dot} className="cursor-dot" />
      <div ref={ring} className="cursor-ring" />
    </>
  );
};

// ─── SCROLL REVEAL HOOK ───────────────────────────────────────────────────────
const useReveal = () => {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal,.reveal-left,.reveal-right");
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); obs.unobserve(e.target); } });
    }, { threshold: 0.12 });
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  });
};

// ─── SVG ICONS ────────────────────────────────────────────────────────────────
const icons = {
  menu: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="15" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>,
  x: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
  arrow: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>,
  arrowUp: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg>,
  check: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M5 13l4 4L19 7"/></svg>,
  star: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>,
  phone: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.27 19.79 19.79 0 01.22 4.67 2 2 0 012.22 2.5h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 10.09a16 16 0 006 6l.66-.66a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 17.72z"/></svg>,
  mail: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
  map: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>,
  shield: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  code: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>,
  cloud: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M18 10h-1.26A8 8 0 109 20h9a5 5 0 000-10z"/></svg>,
  mobile: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>,
  chart: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>,
  globe: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>,
  lightning: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  plus: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  minus: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  users: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>,
  award: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/></svg>,
  linkedin: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>,
  twitter: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/></svg>,
  facebook: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>,
  eye: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>,
  target: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>,
  play: <svg viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>,
  lock: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>,
  zap: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
};

const Icon = ({ name, size = 20 }) => (
  <span style={{ display: "inline-flex", width: size, height: size, flexShrink: 0 }}>
    {icons[name] || <svg viewBox="0 0 24 24"/>}
  </span>
);

// ─── WHATSAPP FLOAT ───────────────────────────────────────────────────────────
const WhatsAppFloat = () => (
  <a href="https://wa.me/213555123456?text=Bonjour%20Omedev!"
    target="_blank" rel="noopener noreferrer"
    className="wa-btn fixed bottom-7 right-7 z-50 flex items-center gap-3 text-white font-clash font-semibold pl-4 pr-5 py-3.5 rounded-full shadow-2xl text-sm"
    style={{ background: "linear-gradient(135deg, #25d366, #128c7e)", boxShadow: "0 8px 32px rgba(37,211,102,0.35)" }}>
    <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
    <span className="hidden sm:block">Discussion rapide</span>
  </a>
);

// ─── NAVBAR ───────────────────────────────────────────────────────────────────
const NAV = [
  { l: "Accueil", p: "home" }, { l: "Services", p: "services" },
  { l: "Solutions ERP", p: "solutions" }, { l: "Réalisations", p: "portfolio" },
  { l: "Tarifs", p: "tarifs" }, { l: "À propos", p: "about" },
  { l: "Blog", p: "blog" }, { l: "Contact", p: "contact" },
];

const Navbar = ({ page, go }) => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  const nav = (p) => { go(p); setOpen(false); window.scrollTo(0, 0); };

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? "glass-nav" : ""}`}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center h-[68px] gap-8">
        <button onClick={() => nav("home")} className="flex items-center gap-3 flex-shrink-0">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center relative"
            style={{ background: "linear-gradient(135deg, #2d5be3, #1a3ab8)" }}>
            <span className="font-clash font-bold text-white text-xl leading-none">O</span>
            <div className="absolute inset-0 rounded-xl" style={{ boxShadow: "0 0 20px rgba(45,91,227,0.4)" }} />
          </div>
          <span className="font-clash font-bold text-slate-900 text-xl">Ome<span className="grad-blue">dev</span></span>
        </button>

        <nav className="hidden xl:flex items-center gap-0.5 flex-1 justify-center">
          {NAV.map(n => (
            <button key={n.p} onClick={() => nav(n.p)}
              className={`px-3.5 py-2 rounded-lg font-cabinet text-sm transition-all duration-200
                ${page === n.p ? "text-blue-700 bg-blue-500/10" : "text-slate-500 hover:text-slate-900 hover:bg-slate-100"}`}>
              {n.l}
            </button>
          ))}
        </nav>

        <div className="hidden xl:flex items-center gap-3 flex-shrink-0">
          <button onClick={() => nav("audit")} className="btn-ghost text-blue-700 font-clash font-semibold text-sm px-4 py-2.5 rounded-xl">
            🎁 Audit Gratuit
          </button>
          <button onClick={() => nav("contact")} className="btn-glow shine-btn font-clash font-bold text-white text-sm px-5 py-2.5 rounded-xl">
            Devis →
          </button>
        </div>

        <button onClick={() => setOpen(!open)} className="xl:hidden ml-auto text-slate-500 hover:text-slate-900 p-2">
          <span style={{ width: 24, height: 24, display: "block" }}>{open ? icons.x : icons.menu}</span>
        </button>
      </div>

      {open && (
        <div className="xl:hidden glass-nav border-t border-blue-100 px-5 pt-4 pb-6">
          {NAV.map(n => (
            <button key={n.p} onClick={() => nav(n.p)}
              className="block w-full text-left px-4 py-3.5 text-slate-600 hover:text-slate-900 hover:bg-blue-50 rounded-xl font-cabinet text-sm mb-0.5 transition-colors">
              {n.l}
            </button>
          ))}
          <div className="mt-4 flex flex-col gap-2">
            <button onClick={() => nav("audit")} className="btn-ghost text-blue-700 font-clash font-semibold py-3 rounded-xl">🎁 Audit Gratuit</button>
            <button onClick={() => nav("contact")} className="btn-glow text-white font-clash font-bold py-3 rounded-xl">Demander un devis</button>
          </div>
        </div>
      )}
    </header>
  );
};

// ─── HERO PAGE ────────────────────────────────────────────────────────────────
const HeroSection = ({ go }) => {
  useReveal();
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden grid-bg noise-overlay" style={{ paddingTop: 68, background: "linear-gradient(135deg, #f0f4ff 0%, #f8faff 50%, #eef2ff 100%)" }}>
      {/* BG photo */}
      <div className="absolute inset-0 z-0">
        <img src={PHOTOS.hero} alt="" className="w-full h-full object-cover opacity-8" style={{ filter: "saturate(0.3) brightness(1.4)" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(240,244,255,0.96) 0%, rgba(248,250,255,0.90) 50%, rgba(238,242,255,0.96) 100%)" }} />
      </div>

      {/* Orbs */}
      <div className="orb w-[600px] h-[600px] -top-20 -left-40 opacity-25" style={{ background: "radial-gradient(circle, rgba(45,91,227,0.18) 0%, transparent 70%)" }} />
      <div className="orb w-[400px] h-[400px] bottom-0 right-10 opacity-15" style={{ background: "radial-gradient(circle, rgba(91,143,255,0.2) 0%, transparent 70%)", animationDelay: "4s" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 w-full py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="reveal float-badge inline-flex items-center gap-2.5 mb-8 px-4 py-2.5 rounded-full"
              style={{ background: "rgba(45,91,227,0.08)", border: "1px solid rgba(45,91,227,0.15)" }}>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse flex-shrink-0" />
              <span className="tag-pill text-blue-700 text-xs">Référence Tech en Afrique</span>
            </div>

            <h1 className="reveal font-clash font-bold text-5xl sm:text-6xl lg:text-7xl text-slate-900 mb-6 leading-[1.02]">
              Votre vision.<br />
              <span className="grad-blue">Notre code.</span><br />
              <span className="font-serif-it text-slate-400 text-5xl sm:text-6xl">Ensemble.</span>
            </h1>

            <p className="reveal delay-100 font-cabinet text-slate-500 text-lg leading-relaxed max-w-xl mb-10">
              Omedev transforme vos défis business en solutions digitales haute performance —
              <strong className="text-slate-800"> ERP, SaaS, Cybersécurité, Mobile & Web</strong> — conçus pour l'Afrique d'aujourd'hui et de demain.
            </p>

            <div className="reveal delay-200 flex flex-wrap gap-4 mb-14">
              <button onClick={() => go("contact")} className="btn-glow shine-btn flex items-center gap-2.5 font-clash font-bold text-white px-8 py-4 rounded-2xl text-base">
                Démarrer mon projet <Icon name="arrow" size={18} />
              </button>
              <button onClick={() => go("demo")} className="btn-ghost flex items-center gap-2.5 font-clash font-semibold text-slate-700 px-8 py-4 rounded-2xl text-base">
                <Icon name="play" size={16} /> Voir la démo ERP
              </button>
            </div>

            <div className="reveal delay-300 flex flex-wrap gap-8">
              {[["150+","Projets livrés"],["98%","Satisfaction"],["50+","Entreprises"],["12","Pays"]].map(([n,l],i) => (
                <div key={i}>
                  <div className="font-clash font-bold text-3xl grad-blue">{n}</div>
                  <div className="font-cabinet text-slate-500 text-sm mt-0.5">{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — stacked cards */}
          <div className="reveal-right hidden lg:block relative h-[500px]">
            <div className="absolute top-0 right-0 w-80 rounded-3xl overflow-hidden card-lift"
              style={{ background: "#fff", border: "1px solid rgba(45,91,227,0.1)", boxShadow: "0 8px 40px rgba(45,91,227,0.1)" }}>
              <img src={PHOTOS.erp} alt="ERP Dashboard" className="w-full h-52 object-cover" />
              <div className="p-5" style={{ background: "#fff" }}>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="tag-pill text-emerald-700 text-xs">Live · ERP Dashboard</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {[["2.4 ","Revenue"],["847","Clients"],["94%","Recouvrement"]].map(([v,l],i) => (
                    <div key={i} className="rounded-xl p-2.5 text-center" style={{ background: "rgba(45,91,227,0.05)", border: "1px solid rgba(45,91,227,0.1)" }}>
                      <div className="font-clash font-bold text-slate-900 text-sm">{v}</div>
                      <div className="text-slate-500 text-xs mt-0.5">{l}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="absolute top-52 left-0 rounded-2xl p-4 flex items-center gap-3"
              style={{ background: "#fff", border: "1px solid rgba(45,91,227,0.1)", boxShadow: "0 4px 20px rgba(45,91,227,0.08)" }}>
              <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center text-green-600">
                <Icon name="shield" size={20} />
              </div>
              <div>
                <div className="font-clash font-semibold text-slate-900 text-sm">Sécurité certifiée</div>
                <div className="text-slate-400 text-xs">ISO 27001 compliant</div>
              </div>
            </div>

            <div className="absolute bottom-10 right-10 rounded-2xl p-4"
              style={{ background: "#fff", border: "1px solid rgba(45,91,227,0.08)", boxShadow: "0 4px 20px rgba(45,91,227,0.08)" }}>
              <div className="flex items-center gap-2 mb-2">
                {[1,2,3,4,5].map(s => <span key={s} className="text-amber-400 text-xs"><Icon name="star" size={12} /></span>)}
              </div>
              <div className="font-cabinet text-slate-600 text-xs italic">"ROI en 3 mois, incroyable"</div>
              <div className="font-clash font-semibold text-slate-800 text-xs mt-1">— Dr. Clinique Meya </div>
            </div>

            <div className="absolute bottom-0 left-4 w-64 rounded-2xl p-4 card-lift"
              style={{ background: "#fff", border: "1px solid rgba(45,91,227,0.08)", boxShadow: "0 4px 20px rgba(45,91,227,0.06)" }}>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600"><Icon name="chart" size={16} /></div>
                <span className="font-clash font-semibold text-slate-900 text-sm">Croissance client</span>
              </div>
              <div className="flex items-end gap-1 h-12">
                {[30,45,35,60,55,75,65,90].map((h,i) => (
                  <div key={i} className="flex-1 rounded-sm transition-all" style={{ height: `${h}%`, background: i===7?"linear-gradient(to top,#2d5be3,#5b8fff)":"rgba(45,91,227,0.15)" }} />
                ))}
              </div>
              <div className="mt-2 flex items-center gap-1.5">
                <span className="text-emerald-600 text-xs font-clash font-semibold">▲ +127%</span>
                <span className="text-slate-400 text-xs">cette année</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 opacity-40">
        <div className="w-px h-12 bg-gradient-to-b from-transparent via-blue-400 to-transparent" />
        <span className="text-slate-400 text-xs font-cabinet">Défiler</span>
      </div>
    </section>
  );
};

// ─── MARQUEE CLIENTS ──────────────────────────────────────────────────────────
const MarqueeClients = () => {
  const brands = ["Microsoft Partner","AWS Partner","MongoDB","Cisco","Stripe","Google Cloud","Oracle","Twilio","Cloudflare","Docker"];
  const doubled = [...brands, ...brands];
  return (
    <div className="py-10 overflow-hidden relative" style={{ background: "#fff", borderTop: "1px solid rgba(45,91,227,0.07)", borderBottom: "1px solid rgba(45,91,227,0.07)" }}>
      <div className="absolute inset-y-0 left-0 w-20 z-10 pointer-events-none" style={{ background: "linear-gradient(to right, #ffffff, transparent)" }} />
      <div className="absolute inset-y-0 right-0 w-20 z-10 pointer-events-none" style={{ background: "linear-gradient(to left, #ffffff, transparent)" }} />
      <div className="marquee-track">
        {doubled.map((b, i) => (
          <div key={i} className="flex items-center gap-3 px-10">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-300" />
            <span className="font-clash font-semibold text-slate-300 text-sm whitespace-nowrap hover:text-slate-500 transition-colors cursor-default">{b}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── PROBLEMS SECTION ─────────────────────────────────────────────────────────
const ProblemsSection = ({ go }) => {
  useReveal();
  const items = [
    { icon: "📉", color: "#dc2626", title: "Perte financière invisible", desc: "Des processus manuels coûtent en moyenne 20–30% de votre chiffre d'affaires annuel sans que vous vous en rendiez compte." },
    { icon: "📋", color: "#d97706", title: "Gestion encore sur Excel", desc: "Fichiers éparpillés, erreurs de saisie, données incohérentes — votre temps vaut bien mieux que ça." },
    { icon: "🔓", color: "#dc2626", title: "Données exposées", desc: "80% des cyberattaques visent les PME. Sans protection adaptée, c'est une question de quand, pas de si." },
    { icon: "🐌", color: "#7c3aed", title: "Croissance limitée", desc: "Sans outils digitaux scalables, chaque nouvelle commande coûte plus cher. La croissance se bloque." },
  ];

  return (
    <section className="py-28 relative overflow-hidden" style={{ background: "#f5f6fa" }}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="text-center mb-16">
          <span className="reveal tag-pill text-red-600 block mb-4">Le diagnostic</span>
          <h2 className="reveal font-clash font-bold text-4xl sm:text-5xl text-slate-900 mb-5">
            Ces problèmes vous <span className="grad-warm">bloquent ?</span>
          </h2>
          <p className="reveal delay-100 font-cabinet text-slate-500 text-lg max-w-2xl mx-auto">
            La plupart des PME africaines perdent des opportunités majeures par manque d'outils digitaux adaptés à leur réalité.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
          {items.map((it, i) => (
            <div key={i} className={`reveal delay-${i*100+100} card-lift rounded-3xl p-7 group card-base`}>
              <div className="text-4xl mb-5">{it.icon}</div>
              <h3 className="font-clash font-bold text-slate-900 text-lg mb-3 leading-snug">{it.title}</h3>
              <p className="font-cabinet text-slate-500 text-sm leading-relaxed">{it.desc}</p>
              <div className="mt-5 w-8 h-0.5 rounded-full group-hover:w-16 transition-all duration-500" style={{ background: it.color }} />
            </div>
          ))}
        </div>

        <div className="reveal text-center">
          <p className="font-cabinet text-slate-500 mb-6 text-lg">Omedev a la réponse exacte pour chacun de ces défis.</p>
          <button onClick={() => go("services")} className="btn-glow font-clash font-bold text-white px-10 py-4 rounded-2xl inline-flex items-center gap-2.5">
            Voir comment on résout ça <Icon name="arrow" size={18} />
          </button>
        </div>
      </div>
    </section>
  );
};

// ─── SERVICES PAGE ────────────────────────────────────────────────────────────
const ServicesPage = ({ go }) => {
  useReveal();
  const services = [
    { img: PHOTOS.project1, icon: "globe", color: "#2d5be3", title: "Développement Web", badge: "Frontend & Backend",
      desc: "Sites vitrine, e-commerce, portails entreprise — optimisés pour convertir, performer et captiver.",
      benefits: ["Design UI/UX premium","Performance Core Web Vitals","SEO technique avancé","Maintenance & hébergement"],
      cases: "Startup · PME · Boutiques en ligne · Institutions" },
    { img: PHOTOS.mobile, icon: "mobile", color: "#7c3aed", title: "Applications Mobiles", badge: "iOS & Android",
      desc: "Apps natives et cross-platform pensées pour l'engagement et la rétention utilisateur.",
      benefits: ["React Native / Flutter","API REST sécurisée","Push notifications","Publication stores"],
      cases: "Livraison · Santé · E-learning · RH" },
    { img: PHOTOS.erp, icon: "chart", color: "#059669", title: "ERP & Gestion", badge: "Sur mesure",
      desc: "Systèmes ERP sectoriels pour centraliser, automatiser et piloter toute votre activité en temps réel.",
      benefits: ["Modules configurables","Dashboard temps réel","Multi-sites & multi-devises","Formation & onboarding"],
      cases: "Santé · Éducation · Logistique · Distribution" },
    { img: PHOTOS.security, icon: "shield", color: "#dc2626", title: "Cybersécurité", badge: "Protection 360°",
      desc: "Audit complet, protection proactive et conformité pour sécuriser vos actifs numériques critiques.",
      benefits: ["Pentest & audit","SOC & monitoring 24/7","Formation équipes","Conformité RGPD"],
      cases: "Finance · Santé · Gouvernement · E-commerce" },
    { img: PHOTOS.cloud, icon: "cloud", color: "#d97706", title: "Cloud & DevOps", badge: "Infrastructure",
      desc: "Migration cloud, orchestration de conteneurs et pipelines CI/CD pour une infrastructure scalable.",
      benefits: ["99.99% uptime SLA","Backup & DR automatique","CDN multi-région","Kubernetes / Docker"],
      cases: "Toute entreprise cherchant à scaler" },
    { img: PHOTOS.project3, icon: "lightning", color: "#0891b2", title: "Produits SaaS", badge: "MVP → Scale",
      desc: "De l'idée au produit SaaS rentable : conception, développement, lancement et croissance.",
      benefits: ["Architecture multi-tenant","Stripe / paiement intégré","Analytics & retention","Roadmap produit"],
      cases: "Founders · Startups tech · ISV" },
  ];

  return (
    <section className="py-28 relative" style={{ background: "#f5f6fa" }}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="text-center mb-16">
          <span className="reveal tag-pill text-blue-700 block mb-4">Expertises</span>
          <h1 className="reveal font-clash font-bold text-5xl sm:text-6xl text-slate-900 mb-5">Nos Services</h1>
          <p className="reveal delay-100 font-cabinet text-slate-500 text-lg max-w-2xl mx-auto">
            Du design UX à l'infrastructure cloud, nous couvrons l'intégralité de votre écosystème digital.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <div key={i} className={`reveal delay-${(i%3)*100+100} card-lift rounded-3xl overflow-hidden flex flex-col card-base`}>
              <div className="img-zoom h-44 relative">
                <img src={s.img} alt={s.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, transparent 40%, ${s.color}15 100%)` }} />
                <div className="absolute top-4 left-4 tag-pill px-3 py-1.5 rounded-full text-xs font-clash"
                  style={{ background: `#fff`, color: s.color, border: `1px solid ${s.color}25`, boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
                  {s.badge}
                </div>
              </div>
              <div className="p-7 flex flex-col flex-1" style={{ background: "#fff" }}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0"
                    style={{ background: `${s.color}10`, color: s.color }}>
                    <Icon name={s.icon} size={22} />
                  </div>
                  <h3 className="font-clash font-bold text-slate-900 text-xl">{s.title}</h3>
                </div>
                <p className="font-cabinet text-slate-500 text-sm leading-relaxed mb-5">{s.desc}</p>
                <ul className="space-y-2 mb-6 flex-1">
                  {s.benefits.map((b, j) => (
                    <li key={j} className="flex items-center gap-2 font-cabinet text-slate-600 text-sm">
                      <span style={{ color: s.color, flexShrink: 0 }}><Icon name="check" size={15} /></span>{b}
                    </li>
                  ))}
                </ul>
                <div className="pt-5 border-t border-slate-100">
                  <p className="font-cabinet text-slate-400 text-xs">{s.cases}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="reveal text-center mt-16">
          <button onClick={() => go("contact")} className="btn-glow shine-btn font-clash font-bold text-white px-12 py-5 rounded-2xl text-lg inline-flex items-center gap-3">
            Obtenir un devis personnalisé <Icon name="arrow" size={20} />
          </button>
        </div>
      </div>
    </section>
  );
};

// ─── SOLUTIONS ERP PAGE ───────────────────────────────────────────────────────
const SolutionsPage = ({ go }) => {
  useReveal();
  const [tab, setTab] = useState(0);
  const erps = [
    { name: "ERP PME", emoji: "🏢", color: "#2d5be3",
      tagline: "Centralisez toute votre gestion en une seule plateforme puissante",
      img: PHOTOS.erp,
      features: ["Comptabilité & Finance","Stocks & Approvisionnement","CRM & Pipeline ventes","RH & Paie","Reporting & KPIs","API & Intégrations"],
      results: ["+40%","productivité"],
      kpis: ["−60% erreurs","ROI < 6 mois","Multi-filiales"] },
    { name: "ERP Santé", emoji: "🏥", color: "#059669",
      tagline: "La solution de gestion hospitalière pensée pour le système de santé africain",
      img: PHOTOS.project2,
      features: ["Dossier patient électronique","Planning & agenda médical","Pharmacie & stocks","Facturation CNAS/CASNOS","Téléconsultation","Statistiques épidémio"],
      results: ["+50%","efficacité"],
      kpis: ["0 perte de dossier","RGPD conforme","Multi-spécialités"] },
    { name: "ERP Éducation", emoji: "🎓", color: "#d97706",
      tagline: "Digitalisez l'administration scolaire et améliorez l'expérience apprenants",
      img: PHOTOS.blog3,
      features: ["Gestion élèves/étudiants","Bulletins & notes en ligne","Emplois du temps","Communication parents","E-learning intégré","Paiement frais scolaires"],
      results: ["+35%","engagement"],
      kpis: ["Zéro papier","App parents","Multi-établissements"] },
  ];
  const e = erps[tab];

  return (
    <section className="py-28 relative overflow-hidden" style={{ background: "#f5f6fa" }}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="text-center mb-16">
          <span className="reveal tag-pill text-blue-700 block mb-4">Nos Produits</span>
          <h1 className="reveal font-clash font-bold text-5xl sm:text-6xl text-slate-900 mb-5">Solutions ERP</h1>
          <p className="reveal delay-100 font-cabinet text-slate-500 text-lg max-w-xl mx-auto">
            Des ERP sectoriels conçus pour les réalités du marché africain — pas des solutions importées mal adaptées.
          </p>
        </div>

        <div className="flex justify-center gap-3 mb-14 flex-wrap">
          {erps.map((e, i) => (
            <button key={i} onClick={() => setTab(i)}
              className={`flex items-center gap-2.5 px-6 py-3 rounded-2xl font-clash font-semibold text-sm transition-all duration-300 ${
                tab === i ? "text-white shadow-lg" : "btn-ghost text-slate-600 hover:text-slate-900"
              }`}
              style={tab === i ? { background: `linear-gradient(135deg, ${e.color}, ${e.color}cc)`, boxShadow: `0 8px 30px ${e.color}30` } : {}}>
              <span>{e.emoji}</span> {e.name}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <div className="reveal-left">
            <div className="tag-pill mb-4 block" style={{ color: e.color }}>{e.emoji} {e.name}</div>
            <h2 className="font-clash font-bold text-4xl text-slate-900 mb-5 leading-tight">{e.tagline}</h2>
            <div className="grid grid-cols-2 gap-3 mb-8">
              {e.features.map((f, j) => (
                <div key={j} className="flex items-center gap-2.5 font-cabinet text-slate-700 text-sm">
                  <span style={{ color: e.color, flexShrink: 0 }}><Icon name="check" size={15} /></span>{f}
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-3 mb-8">
              {e.kpis.map((k, j) => (
                <span key={j} className="tag-pill px-4 py-2 rounded-full text-xs"
                  style={{ background: `${e.color}10`, color: e.color, border: `1px solid ${e.color}20` }}>{k}</span>
              ))}
            </div>
            <div className="flex gap-4">
              <button onClick={() => go("demo")} className="btn-glow shine-btn font-clash font-bold text-white px-7 py-3.5 rounded-2xl"
                style={{ background: `linear-gradient(135deg, ${e.color}, ${e.color}bb)` }}>
                Voir la démo
              </button>
              <button onClick={() => go("contact")} className="btn-ghost font-clash font-semibold text-slate-700 px-7 py-3.5 rounded-2xl">
                Devis gratuit
              </button>
            </div>
          </div>

          <div className="reveal-right">
            <div className="rounded-3xl overflow-hidden" style={{ background: "#fff", border: "1px solid rgba(45,91,227,0.1)", boxShadow: "0 16px 60px rgba(45,91,227,0.1)" }}>
              <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-100" style={{ background: "#fafbff" }}>
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <span className="font-cabinet text-slate-400 text-xs">Omedev {e.name} · v3.0</span>
                <span className="flex items-center gap-1.5 text-emerald-600 text-xs font-cabinet">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />Live
                </span>
              </div>
              <div className="p-6" style={{ background: "#fff" }}>
                <img src={e.img} alt="" className="w-full h-36 object-cover rounded-2xl mb-5 opacity-80" />
                <div className="grid grid-cols-3 gap-3 mb-5">
                  {[["CA Mensuel","2.4M ","+18%"],["Clients","847","+8%"],["Tâches","23","5 urgentes"]].map(([l,v,s],j) => (
                    <div key={j} className="rounded-2xl p-3.5" style={{ background: `${e.color}08`, border: `1px solid ${e.color}15` }}>
                      <p className="text-slate-500 text-xs mb-1 font-cabinet">{l}</p>
                      <p className="font-clash font-bold text-slate-900 text-base">{v}</p>
                      <p className="text-emerald-600 text-xs font-cabinet">{s}</p>
                    </div>
                  ))}
                </div>
                <div className="rounded-2xl p-4" style={{ background: "#f8faff", border: "1px solid rgba(45,91,227,0.06)" }}>
                  <p className="text-slate-500 text-xs mb-3 font-cabinet">Performance mensuelle</p>
                  <div className="flex items-end gap-1.5 h-16">
                    {[40,60,45,80,65,90,55,100,75,110,90,120].map((h,i) => (
                      <div key={i} className="flex-1 rounded-t-sm" style={{
                        height: `${h/1.2}%`,
                        background: i===11 ? `linear-gradient(to top, ${e.color}, ${e.color}88)` : `${e.color}18`
                      }} />
                    ))}
                  </div>
                  <div className="flex justify-between mt-2">
                    {["J","F","M","A","M","J","J","A","S","O","N","D"].map(m => (
                      <span key={m} className="text-slate-300 text-xs font-cabinet">{m}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ─── ABOUT PAGE ───────────────────────────────────────────────────────────────
const AboutPage = () => {
  useReveal();
  const team = [
    { name: "Meya Osee", role: "CEO & Fondateur", exp: "2 ans · Architecte logiciel", img: PHOTOS.team1, li: "#" },
    { name: "Maduga Nathan", role: "CTO", exp: "2 ans · Full Stack & Cloud", img: PHOTOS.team2, li: "#" },
    { name: "Roda Kasway", role: "Resp. Cybersécurité", exp: "4 ans · CISSP certifié", img: PHOTOS.team3, li: "#" },
    { name: "Exaucé mayabu", role: "Dir. Design & UX", exp: "1 ans · UI/UX & Branding", img: PHOTOS.team4, li: "#" },
  ];
  const vals = [
    { e:"🚀", t:"Innovation", d:"Nous n'attendons pas que la technologie vienne à nous — nous la devançons." },
    { e:"🔒", t:"Sécurité", d:"Chaque ligne de code est écrite avec la protection de vos données en priorité absolue." },
    { e:"⚡", t:"Performance", d:"Des solutions mesurables. Votre ROI, pas nos promesses, est notre KPI n°1." },
    { e:"🤝", t:"Partenariat", d:"Nous ne livrons pas des projets — nous construisons des success stories ensemble." },
  ];

  return (
    <section className="py-28 relative overflow-hidden" style={{ background: "#f5f6fa" }}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="text-center mb-16">
          <span className="reveal tag-pill text-blue-700 block mb-4">Notre histoire</span>
          <h1 className="reveal font-clash font-bold text-5xl sm:text-6xl text-slate-900 mb-5">À propos d'Omedev</h1>
          <p className="reveal delay-100 font-cabinet text-slate-500 text-lg max-w-2xl mx-auto">
            Nés d'une conviction : l'Afrique mérite des solutions tech de niveau mondial, conçues pour ses réalités.
          </p>
        </div>

        <div className="reveal rounded-3xl overflow-hidden grid grid-cols-1 lg:grid-cols-2 mb-20" style={{ border: "1px solid rgba(45,91,227,0.08)", boxShadow: "0 4px 30px rgba(45,91,227,0.06)" }}>
          <div className="img-overlay img-zoom">
            <img src={PHOTOS.about} alt="Notre équipe" className="w-full h-full object-cover min-h-64" />
          </div>
          <div className="p-10 lg:p-14 flex flex-col justify-center" style={{ background: "#fff" }}>
            <h2 className="font-clash font-bold text-3xl text-slate-900 mb-5">Notre Vision</h2>
            <p className="font-cabinet text-slate-500 leading-relaxed mb-5">
              Fondé en <strong className="text-slate-900">2024 à Kinshasa</strong>, Omedev est né d'une frustration partagée : les PME africaines méritaient mieux que des logiciels pensés pour l'Europe ou les États-Unis, mal adaptés, coûteux et incompris.
            </p>
            <p className="font-cabinet text-slate-500 leading-relaxed mb-8">
              Notre mission : <strong className="text-slate-900">digitaliser, sécuriser et faire croître</strong> les entreprises africaines avec des outils puissants, abordables et véritablement adaptés au terrain.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {[["2019","Fondation"],["150+","Projets"],["12","Pays"],["50+","Clients actifs"]].map(([v,l],i) => (
                <div key={i} className="rounded-2xl p-5 text-center" style={{ background: "rgba(45,91,227,0.05)", border: "1px solid rgba(45,91,227,0.1)" }}>
                  <div className="font-clash font-extrabold text-3xl grad-blue mb-1">{v}</div>
                  <div className="font-cabinet text-slate-500 text-sm">{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mb-20">
          <h2 className="reveal font-clash font-bold text-4xl text-slate-900 text-center mb-12">Nos Valeurs</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {vals.map((v, i) => (
              <div key={i} className={`reveal delay-${i*100} card-lift rounded-3xl p-7 text-center card-base`}>
                <div className="text-5xl mb-5">{v.e}</div>
                <h3 className="font-clash font-bold text-slate-900 text-xl mb-3">{v.t}</h3>
                <p className="font-cabinet text-slate-500 text-sm leading-relaxed">{v.d}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="reveal rounded-3xl overflow-hidden relative mb-20">
          <img src={PHOTOS.africa} alt="Afrique" className="w-full h-64 object-cover opacity-60" />
          <div className="absolute inset-0 flex items-center justify-center" style={{ background: "linear-gradient(to right, rgba(245,246,250,0.95), rgba(245,246,250,0.7), rgba(245,246,250,0.95))" }}>
            <div className="text-center px-8">
              <p className="font-serif-it text-3xl sm:text-4xl text-slate-800 mb-3">
                "L'Afrique est le continent du futur digital."
              </p>
              <p className="font-cabinet text-slate-500">Omedev en est l'architecte.</p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="reveal font-clash font-bold text-4xl text-slate-900 text-center mb-12">L'Équipe</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((m, i) => (
              <div key={i} className={`reveal delay-${i*100} card-lift rounded-3xl overflow-hidden group card-base`}>
                <div className="img-zoom h-56 relative">
                  <img src={m.img} alt={m.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(245,246,250,0.7) 0%, transparent 60%)" }} />
                </div>
                <div className="p-5 bg-white">
                  <h3 className="font-clash font-bold text-slate-900 text-lg">{m.name}</h3>
                  <p className="text-blue-600 font-cabinet text-sm mb-1">{m.role}</p>
                  <p className="text-slate-400 font-cabinet text-xs">{m.exp}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};


// ─── PORTFOLIO PAGE ───────────────────────────────────────────────────────────
const PortfolioPage = ({ go }) => {
  useReveal();
  const projects = [
    { img: PHOTOS.project1, cat: "ERP Santé", name: "MedCare Pro",
      desc: "Système de gestion hospitalière pour une clinique de 200 lits, 15 médecins, 3 services.",
      before: "4h de saisie/jour", after: "20min automatisé", gain: "+95%", tech: ["React","Node.js","MongoDB","Redis"] },
    { img: PHOTOS.project2, cat: "ERP Éducation", name: "EduTrack",
      desc: "Plateforme scolaire pour 3 000 élèves, 150 enseignants et 2 000 parents connectés.",
      before: "Bulletins papier", after: "Tout digitalisé", gain: "+300%", tech: ["Next.js","PostgreSQL","Stripe"] },
    { img: PHOTOS.project3, cat: "E-commerce", name: "MarketBoost",
      desc: "Boutique en ligne avec +200K visites/mois, 50 fournisseurs, livraison J+1.",
      before: "5 ventes/jour", after: "200+ ventes/jour", gain: "+4000%", tech: ["React","AWS","Stripe","CDN"] },
    { img: PHOTOS.project4, cat: "Cybersécurité", name: "SecureNet",
      desc: "Audit et hardening complet d'une banque régionale — 0 faille critique en 6 mois.",
      before: "12 vulnérabilités", after: "0 faille critique", gain: "100%", tech: ["Pentest","SIEM","WAF","IAM"] },
    { img: PHOTOS.blog1, cat: "SaaS Logistique", name: "FleetOps",
      desc: "Tracking temps réel de 500 véhicules. Réduction de 35% des coûts de flotte.",
      before: "Appels téléphoniques", after: "Dashboard live", gain: "−35% coûts", tech: ["React Native","WebSocket","Maps"] },
    { img: PHOTOS.blog2, cat: "RH & Paie", name: "HRConnect",
      desc: "Automatisation RH & paie pour un groupe multi-filiales de 1 000 salariés.",
      before: "3 jours de paie", after: "2h automatisé", gain: "−93%", tech: ["Vue.js","Python","Docker","CI/CD"] },
  ];

  const testimonials = [
    { q: "Omedev a transformé notre gestion médicale. Gain de temps considérable, zéro erreur, équipe ultra réactive.", n: "Dr. osée mbongo", r: "Directeur · Clinique, DRC", img: PHOTOS.team1 },
    { q: "Notre CA a doublé en 8 mois grâce à la boutique. ROI atteint en 6 semaines. Investissement de ma vie.", n: "1000 voitures", r: "CEO · MaisonDéco ", img: PHOTOS.team2 },
    { q: "L'audit cyber nous a évité une catastrophe. Professionnalisme, expertise et réactivité exemplaires.", n: "Mohamed Kaci", r: "DSI · Banque Régionale", img: PHOTOS.team3 },
  ];

  return (
    <section className="py-28" style={{ background: "#f5f6fa" }}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="text-center mb-16">
          <span className="reveal tag-pill text-blue-700 block mb-4">Réalisations</span>
          <h1 className="reveal font-clash font-bold text-5xl sm:text-6xl text-slate-900 mb-5">Études de cas</h1>
          <p className="reveal delay-100 font-cabinet text-slate-500 text-lg">Des chiffres. Pas des promesses.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {projects.map((p, i) => (
            <div key={i} className={`reveal delay-${(i%3)*100} card-lift rounded-3xl overflow-hidden card-base`}>
              <div className="img-zoom h-44">
                <img src={p.img} alt={p.name} className="w-full h-full object-cover" />
              </div>
              <div className="p-6 bg-white">
                <div className="flex items-center justify-between mb-3">
                  <span className="tag-pill text-xs text-blue-700 px-3 py-1 rounded-full" style={{ background: "rgba(45,91,227,0.08)", border: "1px solid rgba(45,91,227,0.12)" }}>{p.cat}</span>
                  <span className="font-clash font-bold text-emerald-600 text-sm">{p.gain}</span>
                </div>
                <h3 className="font-clash font-bold text-slate-900 text-xl mb-2">{p.name}</h3>
                <p className="font-cabinet text-slate-500 text-sm leading-relaxed mb-5">{p.desc}</p>
                <div className="grid grid-cols-2 gap-3 mb-5">
                  <div className="rounded-2xl p-3 text-center" style={{ background: "rgba(239,68,68,0.04)", border: "1px solid rgba(239,68,68,0.12)" }}>
                    <p className="text-red-500 text-xs font-cabinet mb-0.5">Avant</p>
                    <p className="text-slate-600 text-xs font-clash font-semibold">{p.before}</p>
                  </div>
                  <div className="rounded-2xl p-3 text-center" style={{ background: "rgba(5,150,105,0.04)", border: "1px solid rgba(5,150,105,0.12)" }}>
                    <p className="text-emerald-600 text-xs font-cabinet mb-0.5">Après</p>
                    <p className="text-slate-800 text-xs font-clash font-semibold">{p.after}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {p.tech.map((t, j) => (
                    <span key={j} className="font-cabinet text-xs text-blue-700 px-2.5 py-1 rounded-lg"
                      style={{ background: "rgba(45,91,227,0.06)", border: "1px solid rgba(45,91,227,0.12)" }}>{t}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div>
          <h2 className="reveal font-clash font-bold text-4xl text-slate-900 text-center mb-12">Ils témoignent</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className={`reveal delay-${i*100} card-lift rounded-3xl p-7 card-base`}>
                <div className="flex gap-1 mb-5">
                  {[1,2,3,4,5].map(s => <span key={s} className="text-amber-400"><Icon name="star" size={14} /></span>)}
                </div>
                <p className="font-cabinet text-slate-600 text-base leading-relaxed italic mb-6">"{t.q}"</p>
                <div className="flex items-center gap-3">
                  <img src={t.img} alt={t.n} className="w-11 h-11 rounded-full object-cover" />
                  <div>
                    <p className="font-clash font-semibold text-slate-900 text-sm">{t.n}</p>
                    <p className="font-cabinet text-slate-400 text-xs">{t.r}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// ─── PRICING PAGE  TARIFS─────────────────────────────────────────────────────────────
const PricingPage = ({ go }) => {
  useReveal();
  const plans = [
    { name: "Basic", price: "200", cur: "$", per: "projet", popular: false,
      desc: "Parfait pour les TPE et startups qui veulent se lancer en ligne.",
      features: ["Site vitrine 5 pages","Design responsive mobile-first","SEO technique de base","Formulaire de contact","Hébergement 1 an inclus","Support email 30 jours"],
      cta: "Commencer" },

    { name: "Standard", price: "1000", cur: "$", per: "projet", popular: true,
      desc: "L'outil digital complet pour les PME qui veulent performer.",
      features: ["Application web sur mesure","Dashboard administrateur","Base de données MongoDB","API REST documentée","Module de gestion métier","Support prioritaire","Formation équipe incluse","3 mois de maintenance"],
      cta: "Choisir Standard" },
    { name: "Premium", price: "Sur devis", cur: "", per: "", popular: false,
      desc: "ERP complet et solutions enterprise pour les grandes structures.",
      features: ["ERP sur mesure multi-modules","Intégrations systèmes tierces","Cybersécurité & audit inclus","SLA & uptime garanti","Support 24/7 dédié","Formation & documentation","Roadmap produit dédiée","Hébergement managed cloud"],
      cta: "Nous contacter" },
  ];

  return (
    <section className="py-28 relative overflow-hidden" style={{ background: "#f5f6fa" }}>
      <div className="orb w-[500px] h-[500px] top-20 left-1/2 -translate-x-1/2 opacity-8"
        style={{ background: "radial-gradient(circle, rgba(45,91,227,0.15) 0%, transparent 70%)" }} />
      <div className="max-w-6xl mx-auto px-5 sm:px-8 relative z-10">
        <div className="text-center mb-16">
          <span className="reveal tag-pill text-blue-700 block mb-4">Tarification transparente</span>
          <h1 className="reveal font-clash font-bold text-5xl sm:text-6xl text-slate-900 mb-5">Nos Tarifs</h1>
          <p className="reveal delay-100 font-cabinet text-slate-500 text-lg max-w-xl mx-auto">
            Pas de surprise. Pas de frais cachés. Chaque centime investi génère un retour mesurable.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {plans.map((p, i) => (
            <div key={i}
              className={`reveal delay-${i*100} card-lift rounded-3xl p-8 flex flex-col ${p.popular ? "pricing-featured" : "card-base"}`}
              style={p.popular ? { border: "1px solid rgba(45,91,227,0.25)" } : {}}>
              {p.popular && (
                <div className="text-center mb-5">
                  <span className="tag-pill text-white px-4 py-2 rounded-full text-xs"
                    style={{ background: "linear-gradient(135deg,#2d5be3,#1a3ab8)", boxShadow: "0 4px 20px rgba(45,91,227,0.3)" }}>
                    ⭐ Recommandé
                  </span>
                </div>
              )}
              <h3 className="font-clash font-bold text-slate-900 text-2xl mb-1">{p.name}</h3>
              <p className="font-cabinet text-slate-500 text-sm mb-6">{p.desc}</p>
              <div className="mb-7">
                <span className="font-clash font-extrabold text-4xl text-slate-900">{p.price}</span>
                {p.cur && <span className="font-cabinet text-slate-400 text-sm ml-1.5">{p.cur} / {p.per}</span>}
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                {p.features.map((f, j) => (
                  <li key={j} className="flex items-center gap-2.5 font-cabinet text-slate-600 text-sm">
                    <span className="text-blue-600 flex-shrink-0"><Icon name="check" size={15} /></span>{f}
                  </li>
                ))}
              </ul>
              <button onClick={() => go("contact")}
                className={`w-full py-3.5 rounded-2xl font-clash font-bold text-sm transition-all
                  ${p.popular ? "btn-glow shine-btn text-white" : "btn-ghost text-blue-700"}`}>
                {p.cta}
              </button>
            </div>
          ))}
        </div>

        <p className="reveal text-center font-cabinet text-slate-400 text-sm mt-10">
          💡 Chaque projet commence par un audit gratuit de vos besoins — sans engagement.
        </p>
      </div>
    </section>
  );
};

// ─── AUDIT PAGE ───────────────────────────────────────────────────────────────
const AuditPage = ({ go }) => {
  useReveal();
  const [form, setForm] = useState({ nom: "", email: "", tel: "", entreprise: "", secteur: "", effectif: "", probleme: "" });
  const [sent, setSent] = useState(false);
  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));
  const inputCls = "w-full px-4 py-3.5 rounded-2xl font-cabinet text-slate-900 text-sm placeholder-slate-300 focus:outline-none focus:border-blue-400 transition-all";
  const inputStyle = { background: "#fff", border: "1px solid rgba(45,91,227,0.12)", boxShadow: "0 1px 4px rgba(45,91,227,0.04)" };

  return (
    <section className="py-28" style={{ background: "#f5f6fa" }}>
      <div className="max-w-4xl mx-auto px-5 sm:px-8">
        <div className="text-center mb-14">
          <div className="text-6xl mb-5">🎁</div>
          <span className="reveal tag-pill text-emerald-600 block mb-4">Offre 100% gratuite</span>
          <h1 className="reveal font-clash font-bold text-5xl sm:text-6xl text-slate-900 mb-5">Audit Digital Gratuit</h1>
          <p className="reveal delay-100 font-cabinet text-slate-500 text-lg max-w-2xl mx-auto">
            Nos experts analysent votre situation en <strong className="text-slate-900">48 heures</strong> et vous livrent un plan d'action concret — <strong className="text-slate-900">sans engagement</strong>.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-12">
          {[["🔍","Analyse complète","Audit de votre présence digitale, outils et processus actuels"],["📊","Rapport PDF détaillé","Recommandations priorisées avec ROI estimé"],["🗺️","Roadmap 90 jours","Plan d'action pour démarrer immédiatement et efficacement"]].map(([e,t,d],i) => (
            <div key={i} className={`reveal delay-${i*100} rounded-3xl p-6 text-center card-base`}>
              <div className="text-4xl mb-3">{e}</div>
              <h3 className="font-clash font-semibold text-slate-900 text-base mb-2">{t}</h3>
              <p className="font-cabinet text-slate-400 text-xs leading-relaxed">{d}</p>
            </div>
          ))}
        </div>

        {!sent ? (
          <div className="reveal rounded-3xl p-8 sm:p-10" style={{ background: "#fff", border: "1px solid rgba(45,91,227,0.12)", boxShadow: "0 4px 30px rgba(45,91,227,0.07)" }}>
            <h2 className="font-clash font-bold text-slate-900 text-2xl mb-7 text-center">Demandez votre audit</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              {[["nom","Nom & prénom *","text"],["email","Email professionnel *","email"],["tel","Téléphone","tel"],["entreprise","Entreprise *","text"]].map(([k,ph,tp]) => (
                <input key={k} type={tp} placeholder={ph} value={form[k]} onChange={set(k)} className={inputCls} style={inputStyle} />
              ))}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <select value={form.secteur} onChange={set("secteur")} className={inputCls} style={inputStyle}>
                <option value="">Secteur d'activité</option>
                {["Commerce","Santé","Éducation","Industrie","Finance","Logistique","Services","Autre"].map(s => <option key={s}>{s}</option>)}
              </select>
              <select value={form.effectif} onChange={set("effectif")} className={inputCls} style={inputStyle}>
                <option value="">Effectif</option>
                {["1–10","11–50","51–200","200–500","500+"].map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
            <textarea placeholder="Décrivez votre problématique principale..." value={form.probleme} onChange={set("probleme")}
              rows={4} className={`${inputCls} resize-none mb-6`} style={inputStyle} />
            <button onClick={() => setSent(true)} className="btn-glow shine-btn w-full py-4 font-clash font-bold text-white text-base rounded-2xl">
              🎁 Obtenir mon rapport gratuit
            </button>
            <p className="font-cabinet text-slate-400 text-xs text-center mt-4">Réponse garantie sous 48h · Données 100% sécurisées · Aucun engagement</p>
          </div>
        ) : (
          <div className="reveal rounded-3xl p-14 text-center card-base">
            <div className="text-7xl mb-5">✅</div>
            <h2 className="font-clash font-bold text-slate-900 text-3xl mb-3">Demande reçue !</h2>
            <p className="font-cabinet text-slate-500 text-lg">Notre équipe vous contacte dans les <strong className="text-slate-900">48 heures</strong> avec votre rapport personnalisé.</p>
          </div>
        )}
      </div>
    </section>
  );
};

// ─── DEMO ERP PAGE ────────────────────────────────────────────────────────────
const DemoPage = ({ go }) => {
  useReveal();
  const [tab, setTab] = useState("dashboard");
  const tabs = [{ id: "dashboard", l: "📊 Dashboard" }, { id: "crm", l: "👥 CRM" }, { id: "stock", l: "📦 Stock" }, { id: "finance", l: "💰 Finance" }];

  return (
    <section className="py-28" style={{ background: "#f5f6fa" }}>
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="text-center mb-12">
          <span className="reveal tag-pill text-blue-700 block mb-4">Démonstration interactive</span>
          <h1 className="reveal font-clash font-bold text-5xl sm:text-6xl text-slate-900 mb-5">ERP Omedev · Live</h1>
          <p className="reveal delay-100 font-cabinet text-slate-500 text-lg">Explorez chaque module en conditions réelles. Aucune inscription requise.</p>
        </div>

        <div className="reveal flex gap-2 mb-5 flex-wrap">
          {tabs.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`px-5 py-2.5 rounded-2xl font-clash font-semibold text-sm transition-all ${tab === t.id ? "btn-glow text-white" : "btn-ghost text-slate-600"}`}>
              {t.l}
            </button>
          ))}
        </div>

        <div className="reveal rounded-3xl overflow-hidden" style={{ background: "#fff", border: "1px solid rgba(45,91,227,0.1)", boxShadow: "0 8px 40px rgba(45,91,227,0.08)" }}>
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100" style={{ background: "#fafbff" }}>
            <div className="flex gap-2"><div className="w-3 h-3 rounded-full bg-red-400"/><div className="w-3 h-3 rounded-full bg-amber-400"/><div className="w-3 h-3 rounded-full bg-emerald-400"/></div>
            <div className="flex items-center gap-2 px-4 py-1.5 rounded-xl" style={{ background: "rgba(45,91,227,0.06)", border: "1px solid rgba(45,91,227,0.1)" }}>
              <Icon name="lock" size={12} />
              <span className="font-cabinet text-slate-400 text-xs">omedev services</span>
            </div>
            <span className="flex items-center gap-1.5 text-emerald-600 text-xs font-cabinet">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"/> Connecté
            </span>
          </div>

          <div className="flex">
            <div className="hidden sm:flex flex-col w-48 border-r border-slate-100 p-4 gap-1" style={{ background: "#fafbff" }}>
              {[["chart","Tableau de bord"],["users","Clients"],["mobile","Produits"],["lightning","Finance"],["shield","Sécurité"],["globe","Rapports"]].map(([ic,lb],i) => (
                <div key={i} className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl font-cabinet text-xs cursor-default transition-colors ${i===0?"text-blue-700 bg-blue-50":"text-slate-400 hover:text-slate-600 hover:bg-slate-50"}`}>
                  <Icon name={ic} size={14} />{lb}
                </div>
              ))}
            </div>

            <div className="flex-1 p-6" style={{ background: "#fff" }}>
              {tab === "dashboard" && (
                <div>
                  <p className="font-clash font-bold text-slate-900 text-lg mb-5">Vue d'ensemble · Novembre 2024</p>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    {[["Chiffre d'affaires","2.4M DZD","+18%","emerald"],["Clients actifs","847","+8%","blue"],["Factures en attente","23","−3","red"],["Taux recouvrement","94%","+2%","emerald"]].map(([l,v,s,c],i) => (
                      <div key={i} className="rounded-2xl p-4" style={{ background: "rgba(45,91,227,0.04)", border: "1px solid rgba(45,91,227,0.08)" }}>
                        <p className="font-cabinet text-slate-400 text-xs mb-1">{l}</p>
                        <p className="font-clash font-bold text-slate-900 text-xl">{v}</p>
                        <p className={`font-cabinet text-xs font-semibold text-${c}-600`}>{s}</p>
                      </div>
                    ))}
                  </div>
                  <div className="rounded-2xl p-5 mb-4" style={{ background: "#f8faff", border: "1px solid rgba(45,91,227,0.06)" }}>
                    <p className="font-clash font-semibold text-slate-500 text-sm mb-4">Revenus mensuels (FC)</p>
                    <div className="flex items-end gap-2 h-28">
                      {[50,70,45,85,75,92,60,100,80,108,90,120].map((h,i) => (
                        <div key={i} className="flex-1 rounded-t-md transition-all" style={{
                          height: `${h}%`,
                          background: i===11 ? "linear-gradient(to top,#2d5be3,#5b8fff)" : "rgba(45,91,227,0.12)"
                        }} />
                      ))}
                    </div>
                    <div className="flex justify-between mt-2">
                      {["J","F","M","A","M","J","J","A","S","O","N","D"].map(m=><span key={m} className="font-cabinet text-slate-300 text-xs">{m}</span>)}
                    </div>
                  </div>
                </div>
              )}
              {tab === "crm" && (
                <div>
                  <div className="flex justify-between items-center mb-5">
                    <p className="font-clash font-bold text-slate-900 text-lg">Base clients</p>
                    <span className="tag-pill text-blue-700 text-xs px-3 py-1.5 rounded-full" style={{ background: "rgba(45,91,227,0.08)", border: "1px solid rgba(45,91,227,0.12)" }}>847 contacts</span>
                  </div>
                  {[{n:"Société Alpha SARL",e:"contact@alpha.dz",s:"Client actif",v:"480K DZD"},{n:"Tech Solutions SPA",e:"info@techsol.dz",s:"Prospect chaud",v:"—"},{n:"MediGroup",e:"admin@medigroup.dz",s:"Client actif",v:"1.2M DZD"},{n:"EduCenter",e:"info@educenter.dz",s:"En négociation",v:"—"},{n:"LogiTech",e:"admin@logitech.dz",s:"Client actif",v:"320K DZD"}].map((c,i) => (
                    <div key={i} className="flex items-center justify-between p-4 rounded-2xl mb-2 hover:bg-slate-50 transition-colors border border-slate-100">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl font-clash font-bold text-white text-sm flex items-center justify-center flex-shrink-0"
                          style={{ background: "linear-gradient(135deg,#2d5be3,#1a3ab8)" }}>{c.n[0]}</div>
                        <div><p className="font-clash font-semibold text-slate-900 text-sm">{c.n}</p><p className="font-cabinet text-slate-400 text-xs">{c.e}</p></div>
                      </div>
                      <div className="text-right">
                        <span className={`tag-pill text-xs px-2.5 py-1 rounded-full ${c.s==="Client actif"?"bg-emerald-50 text-emerald-700":c.s==="Prospect chaud"?"bg-amber-50 text-amber-700":"bg-blue-50 text-blue-700"}`}>{c.s}</span>
                        <p className="font-cabinet text-slate-500 text-xs mt-1">{c.v}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {tab === "stock" && (
                <div>
                  <div className="grid grid-cols-3 gap-4 mb-5">
                    {[["Articles","1 247","text-slate-900"],["Alertes","8","text-red-600"],["Valeur","4.8M ","text-blue-700"]].map(([l,v,c],i) => (
                      <div key={i} className="rounded-2xl p-4 text-center" style={{ background: "#f8faff", border: "1px solid rgba(45,91,227,0.06)" }}>
                        <p className="font-cabinet text-slate-400 text-xs mb-1">{l}</p>
                        <p className={`font-clash font-bold text-2xl ${c}`}>{v}</p>
                      </div>
                    ))}
                  </div>
                  {[{n:"Serveur Dell R740",q:12,s:"OK"},{n:"Switch Cisco 48P",q:3,s:"Faible"},{n:"Câbles RJ45 Cat6",q:250,s:"OK"},{n:"Licence Windows Server",q:2,s:"Critique"},{n:"UPS APC 3000VA",q:5,s:"OK"}].map((it,i) => (
                    <div key={i} className="flex items-center justify-between p-3.5 rounded-2xl mb-2 border border-slate-100">
                      <span className="font-cabinet text-slate-700 text-sm">{it.n}</span>
                      <div className="flex items-center gap-5">
                        <span className="font-cabinet text-slate-400 text-sm">×{it.q}</span>
                        <span className={`tag-pill text-xs px-2.5 py-1 rounded-full ${it.s==="OK"?"bg-emerald-50 text-emerald-700":it.s==="Faible"?"bg-amber-50 text-amber-700":"bg-red-50 text-red-700"}`}>{it.s}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {tab === "finance" && (
                <div>
                  <div className="grid grid-cols-2 gap-4 mb-5">
                    {[["Revenus (Mois)","2 400 000 FC","text-emerald-700"],["Dépenses","980 000 FC","text-red-600"],["Bénéfice net","1 420 000 FC","text-blue-700"],["Marge","59.2%","text-blue-700"]].map(([l,v,c],i) => (
                      <div key={i} className="rounded-2xl p-4" style={{ background: "#f8faff", border: "1px solid rgba(45,91,227,0.06)" }}>
                        <p className="font-cabinet text-slate-400 text-xs mb-1">{l}</p>
                        <p className={`font-clash font-bold text-lg ${c}`}>{v}</p>
                      </div>
                    ))}
                  </div>
                  <p className="font-clash font-semibold text-slate-500 text-sm mb-3">Transactions récentes</p>
                  {[{d:"28 Nov",l:"Règlement Société Alpha",m:"+120 000 FC",c:"text-emerald-700"},{d:"27 Nov",l:"Achat serveur Dell",m:"−45 000 FC",c:"text-red-600"},{d:"26 Nov",l:"Abonnement SaaS mensuel",m:"+30 000 FC",c:"text-emerald-700"},{d:"25 Nov",l:"Frais hébergement cloud",m:"−8 200 FC",c:"text-red-600"}].map((t,i) => (
                    <div key={i} className="flex items-center justify-between py-3 border-b border-slate-100 last:border-0">
                      <div><p className="font-cabinet text-slate-900 text-sm">{t.l}</p><p className="font-cabinet text-slate-300 text-xs">{t.d}</p></div>
                      <span className={`font-clash font-semibold text-sm ${t.c}`}>{t.m}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="reveal text-center mt-10">
          <button onClick={() => go("contact")} className="btn-glow shine-btn font-clash font-bold text-white px-12 py-5 rounded-2xl text-lg inline-flex items-center gap-3">
            Obtenir cet ERP pour mon entreprise <Icon name="arrow" size={20} />
          </button>
        </div>
      </div>
    </section>
  );
};



// ─── FAQ PAGE ─────────────────────────────────────────────────────────────────
const FAQPage = () => {
  useReveal();
  const [open, setOpen] = useState(null);
  const faqs = [
    { q: "Combien de temps prend un projet ?", a: "Site vitrine : 0–1 semaines. Application web : 2–8 semaines. ERP complet : 2–4 mois. Nous travaillons en sprints Agile avec des livrables réguliers et une transparence totale." },
    { q: "Proposez-vous une maintenance après livraison ?", a: "Oui, tous nos projets incluent 3 mois de maintenance gratuite. Nous proposons ensuite des contrats de support mensuel (Basic, Pro, Enterprise) selon vos besoins." },
    { q: "Mes données sont-elles sécurisées ?", a: "Absolument. Chiffrement TLS 1.3, sauvegardes automatiques quotidiennes, contrôle d'accès RBAC, conformité RGPD et audits de sécurité réguliers. Vos données ne quittent jamais nos serveurs sans votre autorisation." },
    { q: "Travaillez-vous avec des clients hors le pays ?", a: "Oui ! Nous intervenons dans toute l'Afrique, l'Afrique subsaharienne et la France. 100% de nos projets sont réalisables à distance avec des outils collaboratifs modernes." },
    { q: "Comment fonctionne la collaboration ?", a: "1. Audit gratuit → 2. Proposition technique & devis → 3. Signature contrat → 4. Développement Agile (sprints 2 semaines) → 5. Tests & recette → 6. Livraison & formation → 7. Maintenance." },
    { q: "Quels modes de paiement acceptez-vous ?", a: "Virement bancaire XXXXXXXXX, CCP, paiement par tranche (30% commande, 40% livraison partielle, 30% recette finale). Des solutions de financement sont disponibles pour les projets Enterprise." },
    { q: "Puis-je avoir une démo personnalisée ?", a: "Bien sûr ! En plus de notre démo publique, nous organisons des démos personnalisées sur votre secteur et vos besoins spécifiques. Réservez 30 minutes avec notre équipe — c'est gratuit." },
    { q: "Que se passe-t-il si je ne suis pas satisfait ?", a: "Nous pratiquons une validation étape par étape. Si une livraison ne correspond pas aux specs validées, nous la retravaillons sans frais supplémentaires. Votre satisfaction est notre garantie." },
  ];

  return (
    <section className="py-28" style={{ background: "#f5f6fa" }}>
      <div className="max-w-4xl mx-auto px-5 sm:px-8">
        <div className="text-center mb-14">
          <span className="reveal tag-pill text-blue-700 block mb-4">Questions fréquentes</span>
          <h1 className="reveal font-clash font-bold text-5xl sm:text-6xl text-slate-900 mb-5">FAQ</h1>
          <p className="reveal delay-100 font-cabinet text-slate-500 text-lg">Tout ce que vous devez savoir avant de vous lancer.</p>
        </div>
        <div className="space-y-3">
          {faqs.map((f, i) => (
            <div key={i} className="reveal rounded-3xl overflow-hidden cursor-pointer transition-all duration-300"
              style={{
                border: open===i ? "1px solid rgba(45,91,227,0.2)" : "1px solid rgba(45,91,227,0.08)",
                background: open===i ? "#fff" : "rgba(255,255,255,0.7)",
                boxShadow: open===i ? "0 4px 20px rgba(45,91,227,0.08)" : "none"
              }}
              onClick={() => setOpen(open===i ? null : i)}>
              <div className="flex justify-between items-center p-6">
                <span className="font-clash font-semibold text-slate-900 text-base pr-4">{f.q}</span>
                <span className="text-blue-600 flex-shrink-0">{open===i ? <Icon name="minus" size={20} /> : <Icon name="plus" size={20} />}</span>
              </div>
              {open===i && (
                <div className="px-6 pb-6 pt-0 font-cabinet text-slate-500 text-sm leading-relaxed border-t border-slate-100 pt-4">
                  {f.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};




// ─── BLOG PAGE ────────────────────────────────────────────────────────────────
const BlogPage = () => {
  useReveal();
  const posts = [
    { img: PHOTOS.blog1, cat: "ERP", date: "25 Nov 2024", read: "5 min", color: "#2d5be3",
      title: "Pourquoi les PME africaines adoptent massivement les ERP en 2024",
      excerpt: "La transformation digitale s'accélère. Découvrez pourquoi l'ERP est devenu le pivot de la compétitivité pour les PME du Maghreb et d'Afrique subsaharienne." },
    { img: PHOTOS.blog2, cat: "Cybersécurité", date: "18 Nov 2024", read: "7 min", color: "#dc2626",
      title: "Les 7 erreurs de cybersécurité que font 90% des PME",
      excerpt: "Mots de passe faibles, sauvegardes inexistantes, mises à jour ignorées... Êtes-vous en danger ? Testez votre niveau de risque avec notre checklist." },
    { img: PHOTOS.blog3, cat: "Digitalisation", date: "10 Nov 2024", read: "8 min", color: "#059669",
      title: "Du papier au digital en 30 jours : le guide complet",
      excerpt: "Un guide pratique, étape par étape, pour digitaliser vos processus sans perturber votre activité. Témoignages et templates inclus." },
    { img: PHOTOS.blog4, cat: "SaaS", date: "2 Nov 2024", read: "6 min", color: "#7c3aed",
      title: "SaaS vs logiciel classique : que choisir en 2024 ?",
      excerpt: "Coûts, flexibilité, sécurité, scalabilité... Nous comparons les deux modèles avec des chiffres réels pour vous aider à décider." },
    { img: PHOTOS.project3, cat: "Mobile", date: "28 Oct 2024", read: "5 min", color: "#d97706",
      title: "L'application mobile : votre meilleur commercial 24h/24",
      excerpt: "Une app bien conçue peut multiplier votre base clients par 3. Voici comment maximiser le ROI de votre investissement mobile." },
    { img: PHOTOS.cloud, cat: "Cloud", date: "20 Oct 2024", read: "6 min", color: "#0891b2",
      title: "Migration cloud : les 10 questions à poser avant de signer",
      excerpt: "Avant de migrer, posez ces questions cruciales à votre prestataire. Évitez les pièges et protégez vos données critiques." },
  ];

  const catColors = { ERP:"text-blue-700",Cybersécurité:"text-red-600",Digitalisation:"text-emerald-700",SaaS:"text-purple-700",Mobile:"text-amber-700",Cloud:"text-cyan-700" };

  return (
    <section className="py-28" style={{ background: "#f5f6fa" }}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="text-center mb-16">
          <span className="reveal tag-pill text-blue-700 block mb-4">Ressources</span>
          <h1 className="reveal font-clash font-bold text-5xl sm:text-6xl text-slate-900 mb-5">Blog Omedev</h1>
          <p className="reveal delay-100 font-cabinet text-slate-500 text-lg">Expertise gratuite pour accélérer votre transformation digitale.</p>
        </div>

        <div className="reveal rounded-3xl overflow-hidden grid grid-cols-1 lg:grid-cols-2 mb-8 card-lift card-base">
          <div className="img-zoom h-64 lg:h-full">
            <img src={posts[0].img} alt="" className="w-full h-full object-cover" />
          </div>
          <div className="p-8 lg:p-10 flex flex-col justify-center bg-white">
            <div className="flex items-center gap-3 mb-4">
              <span className={`tag-pill text-xs px-3 py-1.5 rounded-full ${catColors[posts[0].cat]}`}
                style={{ background: `${posts[0].color}10`, border: `1px solid ${posts[0].color}20` }}>{posts[0].cat}</span>
              <span className="font-cabinet text-slate-400 text-xs">{posts[0].date} · {posts[0].read}</span>
            </div>
            <h2 className="font-clash font-bold text-slate-900 text-2xl sm:text-3xl leading-snug mb-4">{posts[0].title}</h2>
            <p className="font-cabinet text-slate-500 leading-relaxed mb-6">{posts[0].excerpt}</p>
            <button className="btn-ghost font-clash font-semibold text-blue-700 px-6 py-3 rounded-2xl self-start inline-flex items-center gap-2">
              Lire l'article <Icon name="arrow" size={16} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.slice(1).map((p, i) => (
            <article key={i} className={`reveal delay-${(i%3)*100} card-lift rounded-3xl overflow-hidden flex flex-col cursor-pointer card-base`}>
              <div className="img-zoom h-44">
                <img src={p.img} alt="" className="w-full h-full object-cover" />
              </div>
              <div className="p-6 flex flex-col flex-1 bg-white">
                <div className="flex items-center gap-3 mb-3">
                  <span className={`tag-pill text-xs px-2.5 py-1 rounded-full ${catColors[p.cat]}`}
                    style={{ background: `${p.color}10`, border: `1px solid ${p.color}15` }}>{p.cat}</span>
                  <span className="font-cabinet text-slate-400 text-xs">{p.date} · {p.read}</span>
                </div>
                <h3 className="font-clash font-bold text-slate-900 text-lg leading-snug mb-3 flex-1">{p.title}</h3>
                <p className="font-cabinet text-slate-500 text-sm leading-relaxed mb-5">{p.excerpt}</p>
                <div className="flex items-center gap-1.5 text-blue-700 text-sm font-clash font-semibold">
                  Lire <Icon name="arrow" size={14} />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── CONTACT PAGE ─────────────────────────────────────────────────────────────
const ContactPage = () => {
  useReveal();
  const [form, setForm] = useState({ nom: "", email: "", tel: "", sujet: "", message: "" });
  const [sent, setSent] = useState(false);
  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));
  const inputCls = "w-full px-4 py-3.5 rounded-2xl font-cabinet text-slate-900 text-sm placeholder-slate-300 focus:outline-none transition-all";
  const inputStyle = { background: "#fff", border: "1px solid rgba(45,91,227,0.12)", boxShadow: "0 1px 4px rgba(45,91,227,0.04)" };

  return (
    <section className="py-28 relative overflow-hidden" style={{ background: "#f5f6fa" }}>
      <div className="orb w-96 h-96 -bottom-20 -right-20 opacity-10" style={{ background: "radial-gradient(circle,rgba(45,91,227,0.2),transparent 70%)" }} />
      <div className="max-w-6xl mx-auto px-5 sm:px-8 relative z-10">
        <div className="text-center mb-14">
          <span className="reveal tag-pill text-blue-700 block mb-4">Parlons de votre projet</span>
          <h1 className="reveal font-clash font-bold text-5xl sm:text-6xl text-slate-900 mb-5">Contactez-nous</h1>
          <p className="reveal delay-100 font-cabinet text-slate-500 text-lg">Réponse garantie sous <strong className="text-slate-900">24h ouvrée</strong>.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="space-y-5">
            {[
              { icon: "phone", l: "Téléphone", v: "+216 (0) 5555 03 59", s: "Lun–Ven · 9h–18h", href: "tel:+21655550359" },
              { icon: "mail", l: "Email", v: "omedevservices@gmail.com", s: "Réponse < 24h", href: "mailto:omedevservices@gmail.com" },
              { icon: "map", l: "Adresse", v: "Kinshasa, DRC", s: "Projets dans toute l'Afrique", href: "#" },
            ].map((c, i) => (
              <a key={i} href={c.href}
                className="reveal flex gap-4 p-5 rounded-3xl hover:shadow-md transition-all group card-base">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 text-blue-600"
                  style={{ background: "rgba(45,91,227,0.08)", border: "1px solid rgba(45,91,227,0.12)" }}>
                  <Icon name={c.icon} size={20} />
                </div>
                <div>
                  <p className="font-cabinet text-slate-400 text-xs mb-0.5">{c.l}</p>
                  <p className="font-clash font-semibold text-slate-900 text-sm group-hover:text-blue-700 transition-colors">{c.v}</p>
                  <p className="font-cabinet text-slate-400 text-xs">{c.s}</p>
                </div>
              </a>
            ))}

            <a href="https://wa.me/21655550359" target="_blank" rel="noopener noreferrer"
              className="reveal flex items-center gap-3.5 p-5 rounded-3xl text-white font-clash font-bold transition-all"
              style={{ background: "linear-gradient(135deg,#25d366,#128c7e)", boxShadow: "0 8px 30px rgba(37,211,102,0.25)" }}>
              <svg width="26" height="26" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WhatsApp · Réponse immédiate
            </a>

            <div className="reveal flex gap-3">
              {["linkedin","twitter","facebook"].map(s => (
                <a key={s} href="#" className="w-11 h-11 rounded-2xl flex items-center justify-center text-slate-400 hover:text-blue-600 transition-colors card-base">
                  <Icon name={s} size={18} />
                </a>
              ))}
            </div>

            <div className="reveal rounded-3xl overflow-hidden">
              <img src={PHOTOS.contact} alt="Bureau Omedev" className="w-full h-36 object-cover" />
            </div>
          </div>

          <div className="lg:col-span-2">
            {!sent ? (
              <div className="reveal rounded-3xl p-8 sm:p-10" style={{ background: "#fff", border: "1px solid rgba(45,91,227,0.1)", boxShadow: "0 4px 30px rgba(45,91,227,0.07)" }}>
                <h2 className="font-clash font-bold text-slate-900 text-xl mb-7">Votre message</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  {[["nom","Nom & prénom *","text"],["email","Email professionnel *","email"],["tel","Téléphone","tel"]].map(([k,ph,tp]) => (
                    <input key={k} type={tp} placeholder={ph} value={form[k]} onChange={set(k)} className={inputCls} style={inputStyle} />
                  ))}
                  <select value={form.sujet} onChange={set("sujet")} className={inputCls} style={inputStyle}>
                    <option value="">Sujet de votre demande</option>
                    {["Devis projet","Démonstration ERP","Audit gratuit","Partenariat","Support technique","Recrutement","Autre"].map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>
                <textarea placeholder="Décrivez votre projet, votre besoin ou votre problématique en détail..." value={form.message} onChange={set("message")}
                  rows={6} className={`${inputCls} resize-none mb-6`} style={inputStyle} />
                <button onClick={() => setSent(true)} className="btn-glow shine-btn w-full py-4 font-clash font-bold text-white text-base rounded-2xl flex items-center justify-center gap-2.5">
                  Envoyer le message <Icon name="arrow" size={18} />
                </button>
                <p className="font-cabinet text-slate-400 text-xs text-center mt-4">Réponse sous 24h · Données sécurisées TLS 1.3 · Aucun spam</p>
              </div>
            ) : (
              <div className="reveal rounded-3xl p-14 text-center h-full flex flex-col items-center justify-center card-base">
                <div className="text-7xl mb-5">✅</div>
                <h2 className="font-clash font-bold text-slate-900 text-3xl mb-3">Message reçu !</h2>
                <p className="font-cabinet text-slate-500 text-lg">Notre équipe vous répond dans les <strong className="text-slate-900">24 heures</strong>.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};




// ─── SIMPLE PAGES ─────────────────────────────────────────────────────────────
const CareersPage = () => {
  useReveal();
  const jobs = [
    { t: "Développeur Full Stack React/Node.js", tp: "CDI", loc: "Alger / Remote", s: "Débutant accepté" },
    { t: "Ingénieur Cybersécurité CISSP", tp: "CDI", loc: "Alger", s: "3 ans exp." },
    { t: "Designer UI/UX Senior", tp: "CDI", loc: "Remote", s: "5 ans exp." },
    { t: "Chef de Projet Digital", tp: "CDI", loc: "Alger", s: "4 ans exp." },
    { t: "Développeur Mobile React Native", tp: "CDI", loc: "Remote", s: "2 ans exp." },
  ];
  return (
    <section className="py-28" style={{ background: "#f5f6fa" }}>
      <div className="max-w-4xl mx-auto px-5 sm:px-8">
        <div className="text-center mb-14">
          <span className="reveal tag-pill text-blue-700 block mb-4">Rejoindre l'équipe</span>
          <h1 className="reveal font-clash font-bold text-5xl text-slate-900 mb-5">Carrières</h1>
          <p className="reveal delay-100 font-cabinet text-slate-500 text-lg">Construisons ensemble l'avenir digital de l'Afrique.</p>
        </div>
        <div className="space-y-4 mb-12">
          {jobs.map((j, i) => (
            <div key={i} className="reveal card-lift flex items-center justify-between p-6 rounded-3xl cursor-pointer card-base">
              <div>
                <h3 className="font-clash font-bold text-slate-900 text-lg mb-1">{j.t}</h3>
                <div className="flex gap-4">
                  <span className="font-cabinet text-blue-700 text-sm">{j.tp}</span>
                  <span className="font-cabinet text-slate-400 text-sm flex items-center gap-1"><Icon name="map" size={12} />{j.loc}</span>
                  <span className="font-cabinet text-slate-400 text-sm">{j.s}</span>
                </div>
              </div>
              <span className="text-blue-600 flex-shrink-0"><Icon name="arrow" size={20} /></span>
            </div>
          ))}
        </div>
        <div className="reveal rounded-3xl p-10 text-center" style={{ background: "rgba(45,91,227,0.04)", border: "1px solid rgba(45,91,227,0.12)" }}>
          <h2 className="font-clash font-bold text-slate-900 text-2xl mb-3">Candidature spontanée</h2>
          <p className="font-cabinet text-slate-500 mb-6">Votre profil ne correspond pas ? Envoyez-nous votre CV — nous gardons les meilleurs talents en mémoire.</p>
          <a href="mailto:recrutement@omedev.dz" className="btn-glow shine-btn inline-flex items-center gap-2.5 font-clash font-bold text-white px-8 py-3.5 rounded-2xl">
            <Icon name="mail" size={18} /> Envoyer mon CV
          </a>
        </div>
      </div>
    </section>
  );
};



const PartnersPage = ({ go }) => {
  useReveal();
  const partners = ["Microsoft","Amazon Web Services","Google Cloud","MongoDB Inc.","Cisco Systems","Oracle","Stripe","Twilio","Cloudflare","Vercel"];
  return (
    <section className="py-28" style={{ background: "#f5f6fa" }}>
      <div className="max-w-5xl mx-auto px-5 sm:px-8 text-center">
        <span className="reveal tag-pill text-blue-700 block mb-4">Écosystème</span>
        <h1 className="reveal font-clash font-bold text-5xl text-slate-900 mb-5">Partenaires Technologiques</h1>
        <p className="reveal delay-100 font-cabinet text-slate-500 text-lg mb-14">Nous collaborons avec les acteurs technologiques mondiaux les plus réputés.</p>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mb-14">
          {partners.map((p, i) => (
            <div key={i} className={`reveal delay-${(i%5)*50} card-lift rounded-2xl p-5 flex items-center justify-center card-base`} style={{ minHeight: 72 }}>
              <span className="font-clash font-bold text-slate-400 text-xs hover:text-slate-700 transition-colors">{p}</span>
            </div>
          ))}
        </div>
        <div className="reveal rounded-3xl p-12" style={{ background: "rgba(45,91,227,0.04)", border: "1px solid rgba(45,91,227,0.12)" }}>
          <h2 className="font-clash font-bold text-slate-900 text-3xl mb-3">Devenez Partenaire Omedev</h2>
          <p className="font-cabinet text-slate-500 mb-6 max-w-xl mx-auto">Intégrateurs, consultants, revendeurs — rejoignez notre réseau et bénéficiez de commissions, formations et support dédié.</p>
          <button onClick={() => go("contact")} className="btn-glow shine-btn inline-flex items-center gap-2.5 font-clash font-bold text-white px-8 py-4 rounded-2xl">
            Devenir partenaire <Icon name="arrow" size={18} />
          </button>
        </div>
      </div>
    </section>
  );
};

const LegalPage = () => (
  <section className="py-28" style={{ background: "#f5f6fa" }}>
    <div className="max-w-3xl mx-auto px-5 sm:px-8">
      <h1 className="font-clash font-bold text-4xl text-slate-900 mb-10">Mentions Légales</h1>
      {[
        { t: "Éditeur", c: "Omedev Services SARL\nCapital social : 1 000 000 FC\nSiège : Kinshasa, DRC : 24B123456 · NIF : 000123456789000\nEmail :omedevservices@gmail.com" },
        { t: "Hébergement", c: "Amazon Web Services (AWS) · Région EU-West-1 (Irlande)" },
        { t: "Propriété intellectuelle", c: "Tout le contenu (textes, visuels, code, marques) est la propriété exclusive d'Omedev Services. Toute reproduction sans autorisation écrite est interdite." },
        { t: "Limitation de responsabilité", c: "Omedev s'efforce de maintenir des informations exactes mais ne garantit pas leur exhaustivité. Omedev ne saurait être responsable des dommages indirects liés à l'utilisation du site." },
      ].map((s, i) => (
        <div key={i} className="mb-8 pb-8 border-b border-slate-200 last:border-0">
          <h2 className="font-clash font-semibold text-slate-900 text-xl mb-3">{s.t}</h2>
          <p className="font-cabinet text-slate-500 text-sm leading-relaxed whitespace-pre-line">{s.c}</p>
        </div>
      ))}
    </div>
  </section>
);

const PrivacyPage = () => (
  <section className="py-28" style={{ background: "#f5f6fa" }}>
    <div className="max-w-3xl mx-auto px-5 sm:px-8">
      <h1 className="font-clash font-bold text-4xl text-slate-900 mb-10">Politique de Confidentialité</h1>
      {[
        { t: "Données collectées", c: "Nous collectons uniquement les données que vous nous fournissez volontairement : nom, email, téléphone et contenu de vos messages. Aucune donnée n'est collectée sans votre consentement explicite." },
        { t: "Finalité du traitement", c: "Vos données servent exclusivement à répondre à vos demandes, vous envoyer des devis et améliorer nos services. Elles ne sont jamais vendues, louées ou cédées à des tiers commerciaux." },
        { t: "Durée de conservation", c: "3 ans après votre dernière interaction, sauf obligation légale contraire. Vous pouvez demander la suppression à tout moment." },
        { t: "Vos droits RGPD", c: "Accès, rectification, effacement, portabilité, opposition. Contactez-nous : privacy@omedev.dz. Réponse garantie sous 30 jours." },
        { t: "Cookies", c: "Uniquement des cookies techniques essentiels au fonctionnement. Aucun cookie publicitaire, aucun tracking tiers." },
        { t: "Sécurité", c: "Chiffrement TLS 1.3, serveurs ISO 27001, accès RBAC, audit de sécurité trimestriel. Vos données sont entre de bonnes mains." },
      ].map((s, i) => (
        <div key={i} className="mb-8 pb-8 border-b border-slate-200 last:border-0">
          <h2 className="font-clash font-semibold text-slate-900 text-xl mb-3">{s.t}</h2>
          <p className="font-cabinet text-slate-500 text-sm leading-relaxed">{s.c}</p>
        </div>
      ))}
    </div>
  </section>
);






// ─── HOMEPAGE ─────────────────────────────────────────────────────────────────
const HomePage = ({ go }) => {
  useReveal();
  return (
    <>
      <HeroSection go={go} />
      <MarqueeClients />
      <ProblemsSection go={go} />

      {/* Services preview */}
      <section className="py-24 relative" style={{ background: "#fff" }}>
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
            <div>
              <span className="reveal tag-pill text-blue-700 block mb-4">Nos Services</span>
              <h2 className="reveal font-clash font-bold text-4xl sm:text-5xl text-slate-900 mb-5">
                Tout ce dont votre <span className="grad-blue">business digital</span> a besoin
              </h2>
              <p className="reveal delay-100 font-cabinet text-slate-500 text-lg leading-relaxed mb-8">
                Du premier wireframe à l'infrastructure cloud en production, nous sommes à vos côtés à chaque étape de votre transformation digitale.
              </p>
              <div className="reveal delay-200 grid grid-cols-2 gap-4 mb-8">
                {[["globe","Développement Web","#2d5be3"],["mobile","Applications Mobile","#7c3aed"],["chart","ERP & Gestion","#059669"],["shield","Cybersécurité","#dc2626"],["cloud","Cloud & DevOps","#d97706"],["lightning","Produits SaaS","#0891b2"]].map(([ic,lb,cl],i) => (
                  <button key={i} onClick={() => go("services")}
                    className="flex items-center gap-2.5 p-3.5 rounded-2xl hover:shadow-md transition-all group text-left card-base">
                    <span style={{ color: cl, flexShrink: 0 }}><Icon name={ic} size={18} /></span>
                    <span className="font-cabinet text-slate-600 text-sm group-hover:text-slate-900 transition-colors">{lb}</span>
                  </button>
                ))}
              </div>
              <button onClick={() => go("services")} className="reveal delay-300 btn-glow shine-btn font-clash font-bold text-white px-8 py-4 rounded-2xl inline-flex items-center gap-2.5">
                Voir tous nos services <Icon name="arrow" size={18} />
              </button>
            </div>
            <div className="reveal-right">
              <div className="rounded-3xl overflow-hidden img-overlay img-zoom card-lift card-base">
                <img src={PHOTOS.services} alt="Services Omedev" className="w-full h-80 object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* Social proof numbers */}
      <div className="divider" />
      <section className="py-20" style={{ background: "#fff" }}>
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[["150+","Projets livrés","dans 12 pays"],["98%","Satisfaction","taux de recommandation"],["50+","Entreprises","clientes actives"],["5 ans","d'Expertise","en Afrique"]].map(([n,l,s],i) => (
              <div key={i} className={`reveal delay-${i*100} rounded-3xl p-7 text-center`}
                style={{ background: "rgba(45,91,227,0.05)", border: "1px solid rgba(45,91,227,0.1)" }}>
                <div className="font-clash font-extrabold text-4xl grad-blue mb-2">{n}</div>
                <div className="font-clash font-semibold text-slate-900 text-base mb-1">{l}</div>
                <div className="font-cabinet text-slate-400 text-sm">{s}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <div className="divider" />


      {/* Testimonials */}
      <section className="py-24" style={{ background: "#f5f6fa" }}>
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="text-center mb-14">
            <span className="reveal tag-pill text-blue-700 block mb-4">Témoignages</span>
            <h2 className="reveal font-clash font-bold text-4xl sm:text-5xl text-slate-900 mb-4">Ils nous font confiance</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { q:"Notre productivité a explosé de 45% en 3 mois. L'équipe Omedev est réactive, experte et humaine.",n:"Amir Belkacem",r:"DG · LogiTech Algérie",img:PHOTOS.team1},
              { q:"Le site e-commerce a multiplié nos ventes par 5. ROI atteint en 6 semaines seulement.",n:"Nadia Messaoud",r:"CEO · Bijouterie Élégance",img:PHOTOS.team2},
              { q:"L'ERP santé a révolutionné notre clinique. Simple à prendre en main, puissant et fiable.",n:"Dr. Rachid Amara",r:"Directeur · PolyclinicMed",img:PHOTOS.team3},
            ].map((t, i) => (
              <div key={i} className={`reveal delay-${i*100} card-lift rounded-3xl p-7 card-base`}>
                <div className="flex gap-1 mb-5">{[1,2,3,4,5].map(s=><span key={s} className="text-amber-400"><Icon name="star" size={14}/></span>)}</div>
                <p className="font-cabinet text-slate-600 text-base leading-relaxed italic mb-6">"{t.q}"</p>
                <div className="flex items-center gap-3">
                  <img src={t.img} alt={t.n} className="w-11 h-11 rounded-full object-cover"/>
                  <div>
                    <p className="font-clash font-semibold text-slate-900 text-sm">{t.n}</p>
                    <p className="font-cabinet text-slate-400 text-xs">{t.r}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* Final CTA */}
      <section className="py-28 relative overflow-hidden" style={{ background: "#fff" }}>
        <div className="orb w-[600px] h-[600px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-12" style={{ background: "radial-gradient(circle,rgba(45,91,227,0.12),transparent 70%)" }} />
        <div className="relative z-10 max-w-4xl mx-auto px-5 sm:px-8 text-center">
          <span className="reveal tag-pill text-blue-700 block mb-5">Prêt à démarrer ?</span>
          <h2 className="reveal font-clash font-extrabold text-5xl sm:text-6xl text-slate-900 mb-6 leading-tight">
            Digitalisons votre<br /><span className="grad-blue">entreprise ensemble</span>
          </h2>
          <p className="reveal delay-100 font-cabinet text-slate-500 text-xl mb-10 max-w-2xl mx-auto">
            Commencez par un audit gratuit. En 48h, vous avez un plan d'action complet, un devis précis, et une équipe dédiée prête à démarrer.
          </p>
          <div className="reveal delay-200 flex flex-wrap gap-4 justify-center">
            <button onClick={() => { go("audit"); window.scrollTo(0,0); }} className="btn-glow shine-btn font-clash font-bold text-white px-12 py-5 rounded-2xl text-lg inline-flex items-center gap-3">
              🎁 Audit gratuit — 48h <Icon name="arrow" size={20} />
            </button>
            <button onClick={() => { go("contact"); window.scrollTo(0,0); }} className="btn-ghost font-clash font-semibold text-slate-700 px-10 py-5 rounded-2xl text-lg">
              Nous appeler
            </button>
          </div>
        </div>
      </section>
    </>
  );
};



// ─── FOOTER ───────────────────────────────────────────────────────────────────
const Footer = ({ go }) => (
  <footer style={{ background: "#1a1d2e", borderTop: "1px solid rgba(255,255,255,0.06)" }} className="py-16">
    <div className="max-w-7xl mx-auto px-5 sm:px-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 mb-14">
        <div className="lg:col-span-2">
          <button onClick={() => { go("home"); window.scrollTo(0,0); }} className="flex items-center gap-3 mb-5">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg,#2d5be3,#1a3ab8)", boxShadow: "0 0 20px rgba(45,91,227,0.4)" }}>
              <span className="font-clash font-bold text-white text-xl">O</span>
            </div>
            <span className="font-clash font-bold text-white text-xl">Ome<span className="grad-blue">dev</span></span>
          </button>
          <p className="font-cabinet text-slate-500 text-sm leading-relaxed max-w-xs mb-6">
            Votre partenaire de transformation digitale en Afrique. ERP · SaaS · Cybersécurité · Développement.
          </p>
          <div className="flex gap-3">
            {["linkedin","twitter","facebook"].map(s => (
              <a key={s} href="#" className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-600 hover:text-blue-400 transition-colors"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <Icon name={s} size={16} />
              </a>
            ))}
          </div>
        </div>
        {[
          { title: "Services", links: [["services","Développement Web"],["services","Applications Mobile"],["services","ERP & Gestion"],["services","Cybersécurité"],["services","Cloud & DevOps"]] },
          { title: "Entreprise", links: [["about","À propos"],["portfolio","Réalisations"],["careers","Carrières"],["partners","Partenaires"],["blog","Blog"]] },
          { title: "Ressources", links: [["tarifs","Tarifs"],["audit","Audit Gratuit"],["demo","Démo ERP"],["faq","FAQ"],["contact","Contact"]] },
        ].map((col, i) => (
          <div key={i}>
            <h4 className="font-clash font-bold text-white text-sm mb-5">{col.title}</h4>
            <ul className="space-y-3">
              {col.links.map(([p,l],j) => (
                <li key={j}>
                  <button onClick={() => { go(p); window.scrollTo(0,0); }} className="font-cabinet text-slate-500 hover:text-slate-300 text-sm transition-colors text-left">
                    {l}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="divider mb-8" />
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="font-cabinet text-slate-600 text-sm">© 2024 Omedev Services SARL. Tous droits réservés.</p>
        <div className="flex gap-6">
          {[["legal","Mentions légales"],["privacy","Confidentialité"],["contact","Contact"]].map(([p,l]) => (
            <button key={p} onClick={() => { go(p); window.scrollTo(0,0); }}
              className="font-cabinet text-slate-600 hover:text-slate-300 text-sm transition-colors">{l}</button>
          ))}
        </div>
      </div>
    </div>
  </footer>
);

// ─── ROOT APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("home");
  const go = useCallback((p) => { setPage(p); window.scrollTo(0, 0); }, []);

  const renderPage = () => {
    switch (page) {
      case "home":      return <HomePage go={go} />;
      case "services":  return <ServicesPage go={go} />;
      case "solutions": return <SolutionsPage go={go} />;
      case "about":     return <AboutPage />;
      case "portfolio": return <PortfolioPage go={go} />;
      case "contact":   return <ContactPage />;
      case "tarifs":    return <PricingPage go={go} />;
      case "audit":     return <AuditPage go={go} />;
      case "demo":      return <DemoPage go={go} />;
      case "faq":       return <FAQPage />;
      case "blog":      return <BlogPage />;
      case "careers":   return <CareersPage />;
      case "partners":  return <PartnersPage go={go} />;
      case "legal":     return <LegalPage />;
      case "privacy":   return <PrivacyPage />;
      default:          return <HomePage go={go} />;
    }
  };

  return (
    <>
      <GlobalStyles />
      <CustomCursor />
      <div style={{ minHeight: "100vh", background: "#f5f6fa" }}>
        <Navbar page={page} go={go} />
        <main style={{ paddingTop: 68 }}>
          {renderPage()}
        </main>
        <Footer go={go} />
        <WhatsAppFloat />
      </div>
    </>
  );
}