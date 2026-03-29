import { useState, useEffect } from "react";

// ── Simple SVG Icons ─────────────────────────────────────────────────────────
const Ico = ({ d, size = 20, cls = "", fill = false }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill ? "currentColor" : "none"}
    stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className={cls}>
    <path d={d} />
  </svg>
);

const ICONS = {
  menu: "M3 6h18M3 12h18M3 18h18",
  x: "M18 6L6 18M6 6l12 12",
  arrow: "M5 12h14M12 5l7 7-7 7",
  check: "M5 13l4 4L19 7",
  star: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
  phone: "M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z",
  mail: "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22 6l-10 7L2 6",
  map: "M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z M12 10m-3 0a3 3 0 106 0 3 3 0 00-6 0",
  plus: "M12 5v14M5 12h14",
  minus: "M5 12h14",
  shield: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
  code: "M16 18l6-6-6-6M8 6L2 12l6 6",
  server: "M2 2h20v8H2zM2 14h20v8H2zM6 6h.01M6 18h.01",
  cloud: "M18 10h-1.26A8 8 0 109 20h9a5 5 0 000-10z",
  monitor: "M23 12H1M23 19H1M17 5H7a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2z",
  users: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2 M23 21v-2a4 4 0 00-3-3.87 M16 3.13a4 4 0 010 7.75",
  trending: "M23 6l-9.5 9.5-5-5L1 18",
  chart: "M18 20V10M12 20V4M6 20v-6",
  globe: "M12 2a10 10 0 100 20A10 10 0 0012 2z M2 12h20 M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20",
  cpu: "M9 3H5a2 2 0 00-2 2v4m6-6h6m-6 0v18m6-18h4a2 2 0 012 2v4m-6-6v18M3 9h18M3 15h18",
  camera: "M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z M12 17a4 4 0 100-8 4 4 0 000 8z",
  academic: "M22 10v6M2 10l10-5 10 5-10 5-10-5z M6 12v5c3 3 9 3 12 0v-5",
  lightning: "M13 2L3 14h9l-1 8 10-12h-9l1-8z",
};

// ── Simple Bar Chart (no lib) ─────────────────────────────────────────────────
const BarChart = ({ data }) => {
  const max = Math.max(...data.flatMap(d => [d.avant, d.apres]));
  return (
    <div className="w-full">
      <div className="flex items-end gap-2 h-32">
        {data.map((d, i) => (
          <div key={i} className="flex-1 flex items-end gap-0.5">
            <div className="flex-1 rounded-t-sm transition-all duration-700 bg-white/20"
              style={{ height: `${(d.avant / max) * 100}%` }} />
            <div className="flex-1 rounded-t-sm transition-all duration-700"
              style={{ height: `${(d.apres / max) * 100}%`, background: "linear-gradient(to top,#00F5D4,#BAFF29)" }} />
          </div>
        ))}
      </div>
      <div className="flex gap-2 mt-2">
        {data.map((d, i) => (
          <div key={i} className="flex-1 text-center text-xs text-white/40 font-mono">{d.mois}</div>
        ))}
      </div>
      <div className="flex gap-4 mt-3 justify-center text-xs text-white/50">
        <span className="flex items-center gap-1"><span className="w-3 h-2 bg-white/20 inline-block rounded-sm"/> Avant</span>
        <span className="flex items-center gap-1"><span className="w-3 h-2 inline-block rounded-sm" style={{background:"linear-gradient(to right,#00F5D4,#BAFF29)"}}/> Après</span>
      </div>
    </div>
  );
};

// ── Simple Donut Chart ────────────────────────────────────────────────────────
const Donut = ({ slices }) => {
  let offset = 0;
  const r = 40, circ = 2 * Math.PI * r;
  const total = slices.reduce((a, b) => a + b.v, 0);
  return (
    <svg viewBox="0 0 100 100" width={110} height={110}>
      <circle cx={50} cy={50} r={r} fill="none" stroke="#1E1E2E" strokeWidth={18} />
      {slices.map((s, i) => {
        const dash = (s.v / total) * circ;
        const gap = circ - dash;
        const el = (
          <circle key={i} cx={50} cy={50} r={r} fill="none" stroke={s.c} strokeWidth={18}
            strokeDasharray={`${dash} ${gap}`} strokeDashoffset={-offset}
            transform="rotate(-90 50 50)" />
        );
        offset += dash;
        return el;
      })}
      <circle cx={50} cy={50} r={28} fill="#0A0A0F" />
    </svg>
  );
};

// ── DATA ─────────────────────────────────────────────────────────────────────
const SERVICES = [
  { icon: "code", label: "Dev Logiciels & Web", desc: "Applications ERP, CRM, sites web et plateformes digitales sur mesure.", col: "#00F5D4" },
  { icon: "chart", label: "Gestion d'Entreprise", desc: "Systèmes de stock, facturation et suivi des ventes en temps réel.", col: "#BAFF29" },
  { icon: "shield", label: "Cybersécurité", desc: "Protection données, audit sécurité et vidéosurveillance électronique.", col: "#FF5C5C" },
  { icon: "globe", label: "Réseaux & Infra", desc: "Installation et maintenance de réseaux informatiques et serveurs.", col: "#00F5D4" },
  { icon: "cloud", label: "Cloud & Hébergement", desc: "Hébergement web, sauvegarde cloud et gestion de serveurs sécurisés.", col: "#BAFF29" },
  { icon: "academic", label: "Formation Tech", desc: "Formations informatique et accompagnement à la transformation digitale.", col: "#FF5C5C" },
  { icon: "cpu", label: "Solutions SaaS", desc: "Logiciels en ligne accessibles par abonnement mensuel.", col: "#00F5D4" },
  { icon: "lightning", label: "Automatisation", desc: "Automatisation de processus métiers et optimisation des systèmes.", col: "#BAFF29" },
];

const STATS = [["50+", "Clients actifs"], ["98%", "Satisfaction"], ["30%", "Réduction pertes"], ["5 ans", "Expérience"]];

const BARS = [
  { mois: "Jan", avant: 55, apres: 82 }, { mois: "Fév", avant: 50, apres: 91 },
  { mois: "Mar", avant: 62, apres: 110 }, { mois: "Avr", avant: 58, apres: 125 },
  { mois: "Mai", avant: 53, apres: 145 }, { mois: "Jun", avant: 66, apres: 160 },
];

const PIE = [
  { v: 40, c: "#00F5D4", n: "PME Commerciales" }, { v: 25, c: "#BAFF29", n: "Santé & Pharma" },
  { v: 20, c: "#FF5C5C", n: "Éducation" }, { v: 15, c: "#6B6B8A", n: "Autres" },
];

const TESTIMONIALS = [
  { name: "Mutombo Jean", role: "Gérant, Pharmacie Central", text: "Omedev a transformé notre gestion. Plus de pertes de stock, tout est suivi en temps réel. Investissement rentabilisé en 2 mois.", stars: 5 },
  { name: "Espérance K.", role: "Directrice, École Excellence", text: "Le système de gestion scolaire est impeccable. Inscriptions, notes, paiements — tout automatisé. Notre équipe adore.", stars: 5 },
  { name: "Patrick Lumu", role: "Propriétaire, Restaurant Kin", text: "Nos ventes ont augmenté de 40% grâce au suivi digitalisé. Le support Omedev est toujours disponible. Très professionnel.", stars: 5 },
];

const PLANS = [
  { name: "Starter", price: "150$", desc: "Petites boutiques", features: ["Gestion stock basique", "Facturation simple", "Support WhatsApp", "Formation 1 jour"], hot: false },
  { name: "Business", price: "450$", desc: "PME en croissance", features: ["Tout le plan Starter", "ERP complet", "Rapports analytiques", "Formation 3 jours", "Support prioritaire"], hot: true },
  { name: "Enterprise", price: "Sur devis", desc: "Grandes structures", features: ["Solution sur-mesure", "Intégrations avancées", "Dashboard multi-sites", "Formation équipe", "Support dédié 24/7"], hot: false },
];

const FAQS = [
  { q: "Combien coûte la mise en place d'un système ?", a: "Nos tarifs commencent à 150$ pour une installation basique. Paiement en 2 fois disponible (50% avant, 50% après installation)." },
  { q: "Faut-il une connexion internet permanente ?", a: "Non ! Nos solutions fonctionnent hors-ligne et se synchronisent automatiquement dès que la connexion est rétablie." },
  { q: "Quelle est la durée d'installation ?", a: "En général 1 à 3 jours selon la complexité du projet. La formation de votre équipe est incluse dans tous les plans." },
  { q: "Proposez-vous un support après installation ?", a: "Oui, support technique par WhatsApp et maintenance régulière. Des contrats de suivi mensuel sont disponibles." },
  { q: "Travaillez-vous hors de Kinshasa ?", a: "Nous intervenons dans tout le Congo et proposons une assistance à distance pour les provinces éloignées." },
];

// ── NAVBAR ────────────────────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mob, setMob] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled ? "rgba(10,10,15,0.95)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
        transition: "all 0.4s ease",
        padding: "18px 0"
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: "#00F5D4", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontFamily: "monospace", fontWeight: 700, color: "#0A0A0F", fontSize: 13 }}>OD</span>
            </div>
            <span style={{ fontWeight: 800, fontSize: 20, letterSpacing: "-0.5px", color: "#F0F0FF" }}>Omedev<span style={{ color: "#00F5D4" }}>.</span></span>
          </div>
          <div style={{ display: "flex", gap: 32, alignItems: "center" }} className="hide-mobile">
            {["Services", "Résultats", "Tarifs", "Contact"].map(l => (
              <a key={l} href={`#${l.toLowerCase()}`} style={{ color: "#A8A8C0", fontSize: 14, textDecoration: "none", transition: "color 0.2s" }}
                onMouseEnter={e => e.target.style.color = "#00F5D4"} onMouseLeave={e => e.target.style.color = "#A8A8C0"}>
                {l}
              </a>
            ))}
            <a href="#contact" style={{ background: "linear-gradient(135deg,#00F5D4,#BAFF29)", color: "#0A0A0F", fontWeight: 700, fontSize: 13, padding: "10px 22px", borderRadius: 10, textDecoration: "none", letterSpacing: "-0.2px" }}>
              Démarrer →
            </a>
          </div>
          <button onClick={() => setMob(true)} style={{ background: "none", border: "none", cursor: "pointer", color: "#A8A8C0" }} className="show-mobile">
            <Ico d={ICONS.menu} size={24} />
          </button>
        </div>
      </nav>
      {/* Mobile overlay */}
      {mob && (
        <div style={{ position: "fixed", inset: 0, zIndex: 200 }}>
          <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.7)" }} onClick={() => setMob(false)} />
          <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: 280, background: "#12121A", borderLeft: "1px solid rgba(255,255,255,0.08)", padding: 28 }}>
            <button onClick={() => setMob(false)} style={{ background: "none", border: "none", color: "#A8A8C0", cursor: "pointer", marginBottom: 28 }}>
              <Ico d={ICONS.x} size={24} />
            </button>
            {["Services", "Résultats", "Tarifs", "Contact"].map(l => (
              <a key={l} href={`#${l.toLowerCase()}`} onClick={() => setMob(false)}
                style={{ display: "block", padding: "16px 0", borderBottom: "1px solid rgba(255,255,255,0.06)", color: "#F0F0FF", textDecoration: "none", fontWeight: 600, fontSize: 18 }}>
                {l}
              </a>
            ))}
            <a href="#contact" onClick={() => setMob(false)} style={{ display: "block", marginTop: 24, background: "linear-gradient(135deg,#00F5D4,#BAFF29)", color: "#0A0A0F", fontWeight: 700, padding: "14px", borderRadius: 12, textAlign: "center", textDecoration: "none" }}>
              Commencer
            </a>
          </div>
        </div>
      )}
    </>
  );
}

// ── HERO ─────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section style={{ minHeight: "100vh", display: "flex", alignItems: "center", position: "relative", overflow: "hidden", paddingTop: 100 }}>
      {/* grid bg */}
      <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(0,245,212,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(0,245,212,0.04) 1px,transparent 1px)", backgroundSize: "40px 40px" }} />
      {/* orbs */}
      <div style={{ position: "absolute", width: 400, height: 400, borderRadius: "50%", background: "rgba(0,245,212,0.12)", filter: "blur(80px)", top: "10%", left: "-10%" }} />
      <div style={{ position: "absolute", width: 350, height: 350, borderRadius: "50%", background: "rgba(186,255,41,0.08)", filter: "blur(80px)", bottom: "10%", right: "-5%" }} />

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "60px 24px", position: "relative", zIndex: 2, width: "100%" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }} className="hero-grid">
          <div>
            {/* Badge */}
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, border: "1px solid rgba(0,245,212,0.3)", borderRadius: 99, padding: "6px 16px", marginBottom: 28, background: "rgba(0,245,212,0.05)" }}>
              <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#00F5D4", animation: "pulse 2s infinite" }} />
              <span style={{ color: "#00F5D4", fontSize: 11, fontFamily: "monospace", letterSpacing: 2, textTransform: "uppercase" }}>Solutions Tech · RDC</span>
            </div>

            <h1 style={{ fontSize: "clamp(42px,6vw,72px)", fontWeight: 900, lineHeight: 0.95, letterSpacing: "-2px", marginBottom: 24, color: "#F0F0FF" }}>
              Digitalisez<br />
              <span style={{ background: "linear-gradient(135deg,#00F5D4,#BAFF29)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>votre PME</span><br />
              au Congo
            </h1>

            <p style={{ color: "#A8A8C0", fontSize: 18, lineHeight: 1.7, marginBottom: 36, maxWidth: 460 }}>
              Gestion de stock, facturation, sécurité et plus — des solutions informatiques conçues pour les entreprises africaines. <strong style={{ color: "#F0F0FF" }}>Résultats garantis.</strong>
            </p>

            <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 48 }}>
              <a href="#contact" style={{ background: "linear-gradient(135deg,#00F5D4,#BAFF29)", color: "#0A0A0F", fontWeight: 700, fontSize: 15, padding: "14px 28px", borderRadius: 12, textDecoration: "none", display: "flex", alignItems: "center", gap: 8, boxShadow: "0 0 30px rgba(0,245,212,0.3)" }}>
                Commencer maintenant <Ico d={ICONS.arrow} size={16} />
              </a>
              <a href="#résultats" style={{ border: "1px solid rgba(0,245,212,0.4)", color: "#00F5D4", fontWeight: 600, fontSize: 15, padding: "14px 28px", borderRadius: 12, textDecoration: "none" }}>
                Voir les résultats
              </a>
            </div>

            <div style={{ display: "flex", gap: 32 }}>
              {STATS.map(([v, l]) => (
                <div key={v}>
                  <div style={{ fontFamily: "monospace", fontWeight: 700, fontSize: 22, background: "linear-gradient(135deg,#00F5D4,#BAFF29)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>{v}</div>
                  <div style={{ color: "#A8A8C0", fontSize: 12 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Dashboard card */}
          <div style={{ position: "relative" }} className="hero-card-wrap">
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg,rgba(0,245,212,0.2),rgba(186,255,41,0.1))", borderRadius: 28, filter: "blur(40px)" }} />
            <div style={{ position: "relative", border: "1px solid rgba(0,245,212,0.2)", borderRadius: 24, background: "rgba(30,30,46,0.8)", backdropFilter: "blur(20px)", padding: 24, boxShadow: "0 0 60px rgba(0,245,212,0.12)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                <div>
                  <div style={{ fontSize: 11, color: "#A8A8C0", fontFamily: "monospace", marginBottom: 4 }}>Dashboard Omedev</div>
                  <div style={{ fontWeight: 700, fontSize: 17 }}>Vue d'ensemble</div>
                </div>
                <div style={{ width: 36, height: 36, background: "rgba(0,245,212,0.15)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Ico d={ICONS.chart} size={18} cls="" style={{ color: "#00F5D4" }} />
                </div>
              </div>
              <BarChart data={BARS} />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginTop: 18 }}>
                {[["Ventes", "+48%", "#00F5D4"], ["Stock", "↑ 3x", "#BAFF29"], ["Pertes", "-30%", "#FF5C5C"]].map(([l, v, c]) => (
                  <div key={l} style={{ background: "rgba(10,10,15,0.6)", borderRadius: 12, padding: "12px", border: "1px solid rgba(255,255,255,0.06)" }}>
                    <div style={{ color: "#A8A8C0", fontSize: 11, marginBottom: 4 }}>{l}</div>
                    <div style={{ fontFamily: "monospace", fontWeight: 700, fontSize: 15, color: c }}>{v}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── TICKER ────────────────────────────────────────────────────────────────────
function Ticker() {
  const items = ["Développement Web", "Gestion Stock", "Cybersécurité", "Solutions ERP", "Formation Tech", "Cloud Computing", "Vidéosurveillance", "Conseil Digital"];
  const all = [...items, ...items];
  return (
    <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)", background: "rgba(30,30,46,0.4)", padding: "14px 0", overflow: "hidden" }}>
      <div style={{ display: "flex", animation: "ticker 22s linear infinite", whiteSpace: "nowrap" }}>
        {all.map((item, i) => (
          <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 20, paddingRight: 40 }}>
            <span style={{ color: "rgba(168,168,192,0.6)", fontFamily: "monospace", fontSize: 12, letterSpacing: 2, textTransform: "uppercase" }}>{item}</span>
            <span style={{ color: "#00F5D4", fontSize: 12 }}>◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}

// ── SERVICES ──────────────────────────────────────────────────────────────────
function Services() {
  const [hov, setHov] = useState(null);
  return (
    <section id="services" style={{ padding: "100px 0" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <div style={{ display: "inline-block", border: "1px solid rgba(186,255,41,0.3)", borderRadius: 99, padding: "6px 16px", marginBottom: 20, background: "rgba(186,255,41,0.05)" }}>
            <span style={{ color: "#BAFF29", fontSize: 11, fontFamily: "monospace", letterSpacing: 2, textTransform: "uppercase" }}>Ce que nous faisons</span>
          </div>
          <h2 style={{ fontSize: "clamp(32px,5vw,56px)", fontWeight: 900, letterSpacing: "-1.5px", marginBottom: 16 }}>
            Nos <span style={{ background: "linear-gradient(135deg,#00F5D4,#BAFF29)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Services</span>
          </h2>
          <p style={{ color: "#A8A8C0", fontSize: 17, maxWidth: 500, margin: "0 auto" }}>Des solutions complètes pour digitaliser chaque aspect de votre entreprise.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 20 }}>
          {SERVICES.map((s, i) => (
            <div key={i} onMouseEnter={() => setHov(i)} onMouseLeave={() => setHov(null)}
              style={{
                border: `1px solid ${hov === i ? s.col + "60" : "rgba(255,255,255,0.08)"}`,
                borderRadius: 20, background: hov === i ? "rgba(30,30,46,0.8)" : "rgba(30,30,46,0.4)",
                padding: "28px 24px", cursor: "pointer", transition: "all 0.3s",
                transform: hov === i ? "translateY(-6px)" : "none",
                boxShadow: hov === i ? `0 12px 40px ${s.col}18` : "none"
              }}>
              <div style={{ width: 46, height: 46, borderRadius: 14, background: hov === i ? `${s.col}20` : "rgba(255,255,255,0.05)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20, transition: "all 0.3s" }}>
                <Ico d={ICONS[s.icon]} size={22} cls="" style={{ color: s.col }} />
              </div>
              <h3 style={{ fontWeight: 700, fontSize: 17, marginBottom: 10, color: hov === i ? "#F0F0FF" : "#D0D0E8" }}>{s.label}</h3>
              <p style={{ color: "#A8A8C0", fontSize: 13.5, lineHeight: 1.65 }}>{s.desc}</p>
              <div style={{ marginTop: 18, display: "flex", alignItems: "center", gap: 6, fontSize: 12, fontFamily: "monospace", color: s.col, opacity: hov === i ? 1 : 0.5, transition: "opacity 0.3s" }}>
                En savoir plus <Ico d={ICONS.arrow} size={12} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── RESULTS ───────────────────────────────────────────────────────────────────
function Results() {
  return (
    <section id="résultats" style={{ padding: "100px 0", background: "rgba(30,30,46,0.2)", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", width: 400, height: 400, borderRadius: "50%", background: "rgba(0,245,212,0.06)", filter: "blur(80px)", right: -100, top: 0 }} />
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", position: "relative" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "start" }} className="two-col">
          {/* Left */}
          <div>
            <div style={{ display: "inline-block", border: "1px solid rgba(0,245,212,0.3)", borderRadius: 99, padding: "6px 16px", marginBottom: 20, background: "rgba(0,245,212,0.05)" }}>
              <span style={{ color: "#00F5D4", fontSize: 11, fontFamily: "monospace", letterSpacing: 2, textTransform: "uppercase" }}>Résultats Concrets</span>
            </div>
            <h2 style={{ fontSize: "clamp(30px,4vw,48px)", fontWeight: 900, letterSpacing: "-1.5px", marginBottom: 20, lineHeight: 1.05 }}>
              Vos données<br />
              <span style={{ background: "linear-gradient(135deg,#00F5D4,#BAFF29)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>parlent d'elles-mêmes</span>
            </h2>
            <p style={{ color: "#A8A8C0", fontSize: 17, lineHeight: 1.7, marginBottom: 36 }}>
              Nos clients voient en moyenne <strong style={{ color: "#F0F0FF" }}>+48% de revenus</strong> et une réduction des pertes de <strong style={{ color: "#F0F0FF" }}>30%</strong> après 3 mois.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              {STATS.map(([v, l]) => (
                <div key={v} style={{ border: "1px solid rgba(255,255,255,0.08)", borderRadius: 18, background: "rgba(10,10,15,0.5)", padding: "24px" }}>
                  <div style={{ fontWeight: 800, fontSize: 34, letterSpacing: "-1px", background: "linear-gradient(135deg,#00F5D4,#BAFF29)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", marginBottom: 4 }}>{v}</div>
                  <div style={{ color: "#A8A8C0", fontSize: 13 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
          {/* Right */}
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <div style={{ border: "1px solid rgba(255,255,255,0.08)", borderRadius: 20, background: "rgba(10,10,15,0.5)", padding: 24 }}>
              <div style={{ fontSize: 12, fontFamily: "monospace", color: "#A8A8C0", marginBottom: 20 }}>Revenus avant/après digitalisation ($/mois)</div>
              <BarChart data={BARS} />
            </div>
            <div style={{ border: "1px solid rgba(255,255,255,0.08)", borderRadius: 20, background: "rgba(10,10,15,0.5)", padding: 24 }}>
              <div style={{ fontSize: 12, fontFamily: "monospace", color: "#A8A8C0", marginBottom: 16 }}>Répartition de notre clientèle</div>
              <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
                <Donut slices={PIE} />
                <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 10 }}>
                  {PIE.map((d) => (
                    <div key={d.n} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <div style={{ width: 8, height: 8, borderRadius: "50%", background: d.c }} />
                        <span style={{ color: "#A8A8C0", fontSize: 12 }}>{d.n}</span>
                      </div>
                      <span style={{ fontFamily: "monospace", fontSize: 13, fontWeight: 700, color: d.c }}>{d.v}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── PROCESS ───────────────────────────────────────────────────────────────────
function Process() {
  const steps = [
    { n: "01", t: "Audit Gratuit", d: "Analyse de vos besoins et points de douleur en 30 minutes.", c: "#00F5D4" },
    { n: "02", t: "Proposition", d: "Solution personnalisée et devis transparent sans surprise.", c: "#BAFF29" },
    { n: "03", t: "Installation", d: "Mise en place rapide en 1 à 3 jours, formation incluse.", c: "#FF5C5C" },
    { n: "04", t: "Suivi", d: "Support technique continu et mises à jour régulières.", c: "#00F5D4" },
  ];
  return (
    <section style={{ padding: "100px 0" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <h2 style={{ fontSize: "clamp(30px,4vw,52px)", fontWeight: 900, letterSpacing: "-1.5px", marginBottom: 12 }}>
            Comment ça <span style={{ background: "linear-gradient(135deg,#FF5C5C,#BAFF29)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>fonctionne</span>
          </h2>
          <p style={{ color: "#A8A8C0", fontSize: 17 }}>Simple, rapide, efficace.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 18 }}>
          {steps.map((s, i) => (
            <div key={i} style={{ border: "1px solid rgba(255,255,255,0.08)", borderRadius: 20, background: "rgba(30,30,46,0.4)", padding: "32px 24px", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: 16, right: 20, fontFamily: "monospace", fontWeight: 800, fontSize: 48, color: s.c, opacity: 0.12, lineHeight: 1 }}>{s.n}</div>
              <div style={{ width: 40, height: 3, background: s.c, borderRadius: 2, marginBottom: 20 }} />
              <h3 style={{ fontWeight: 700, fontSize: 18, marginBottom: 10 }}>{s.t}</h3>
              <p style={{ color: "#A8A8C0", fontSize: 13.5, lineHeight: 1.65 }}>{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── TESTIMONIALS ──────────────────────────────────────────────────────────────
function Testimonials() {
  return (
    <section id="témoignages" style={{ padding: "100px 0", background: "rgba(18,18,26,0.6)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <div style={{ display: "inline-block", border: "1px solid rgba(186,255,41,0.3)", borderRadius: 99, padding: "6px 16px", marginBottom: 20, background: "rgba(186,255,41,0.05)" }}>
            <span style={{ color: "#BAFF29", fontSize: 11, fontFamily: "monospace", letterSpacing: 2, textTransform: "uppercase" }}>Ils nous font confiance</span>
          </div>
          <h2 style={{ fontSize: "clamp(30px,4vw,52px)", fontWeight: 900, letterSpacing: "-1.5px" }}>
            Ce que disent nos <span style={{ background: "linear-gradient(135deg,#00F5D4,#BAFF29)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>clients</span>
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 20 }}>
          {TESTIMONIALS.map((t, i) => (
            <div key={i} style={{ border: "1px solid rgba(255,255,255,0.08)", borderRadius: 22, background: "rgba(30,30,46,0.4)", padding: 28, display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", gap: 4, marginBottom: 18 }}>
                {Array(t.stars).fill(0).map((_, j) => <span key={j} style={{ color: "#BAFF29", fontSize: 15 }}>★</span>)}
              </div>
              <p style={{ color: "rgba(240,240,255,0.75)", lineHeight: 1.75, fontSize: 14.5, flex: 1, marginBottom: 22, fontStyle: "italic" }}>"{t.text}"</p>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 40, height: 40, borderRadius: "50%", background: "linear-gradient(135deg,#00F5D4,#BAFF29)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "monospace", fontWeight: 700, color: "#0A0A0F", fontSize: 15 }}>
                  {t.name.charAt(0)}
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14 }}>{t.name}</div>
                  <div style={{ color: "#A8A8C0", fontSize: 12 }}>{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── PRICING ───────────────────────────────────────────────────────────────────
function Pricing() {
  return (
    <section id="tarifs" style={{ padding: "100px 0" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <div style={{ display: "inline-block", border: "1px solid rgba(0,245,212,0.3)", borderRadius: 99, padding: "6px 16px", marginBottom: 20, background: "rgba(0,245,212,0.05)" }}>
            <span style={{ color: "#00F5D4", fontSize: 11, fontFamily: "monospace", letterSpacing: 2, textTransform: "uppercase" }}>Tarifs Transparents</span>
          </div>
          <h2 style={{ fontSize: "clamp(30px,4vw,52px)", fontWeight: 900, letterSpacing: "-1.5px", marginBottom: 12 }}>
            Plans <span style={{ background: "linear-gradient(135deg,#00F5D4,#BAFF29)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>adaptés</span>
          </h2>
          <p style={{ color: "#A8A8C0", fontSize: 17 }}>Paiement en 2 fois disponible. Aucun frais caché.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 20 }}>
          {PLANS.map((p, i) => (
            <div key={i} style={{
              borderRadius: 24, padding: "36px 28px",
              border: p.hot ? "1px solid rgba(0,245,212,0.5)" : "1px solid rgba(255,255,255,0.08)",
              background: p.hot ? "linear-gradient(135deg,rgba(0,245,212,0.07),rgba(186,255,41,0.04))" : "rgba(30,30,46,0.3)",
              position: "relative", display: "flex", flexDirection: "column",
              boxShadow: p.hot ? "0 0 60px rgba(0,245,212,0.1)" : "none"
            }}>
              {p.hot && (
                <div style={{ position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)", background: "#00F5D4", color: "#0A0A0F", fontFamily: "monospace", fontWeight: 700, fontSize: 11, padding: "5px 16px", borderRadius: 99, letterSpacing: 1, whiteSpace: "nowrap" }}>
                  RECOMMANDÉ
                </div>
              )}
              <div style={{ marginBottom: 24 }}>
                <h3 style={{ fontWeight: 800, fontSize: 22, marginBottom: 4 }}>{p.name}</h3>
                <p style={{ color: "#A8A8C0", fontSize: 13 }}>{p.desc}</p>
              </div>
              <div style={{ marginBottom: 28 }}>
                <span style={{ fontFamily: "monospace", fontWeight: 800, fontSize: 38, background: "linear-gradient(135deg,#00F5D4,#BAFF29)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>{p.price}</span>
                {p.price !== "Sur devis" && <span style={{ color: "#A8A8C0", fontSize: 13, marginLeft: 6 }}>/projet</span>}
              </div>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 12, flex: 1, marginBottom: 28 }}>
                {p.features.map((f, j) => (
                  <li key={j} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13.5 }}>
                    <div style={{ width: 20, height: 20, borderRadius: "50%", background: p.hot ? "rgba(0,245,212,0.2)" : "rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Ico d={ICONS.check} size={11} cls="" />
                    </div>
                    <span style={{ color: p.hot ? "#F0F0FF" : "#A8A8C0" }}>{f}</span>
                  </li>
                ))}
              </ul>
              <a href="#contact" style={{
                display: "block", textAlign: "center", padding: "14px", borderRadius: 14,
                textDecoration: "none", fontWeight: 700, fontSize: 14, transition: "all 0.3s",
                ...(p.hot
                  ? { background: "linear-gradient(135deg,#00F5D4,#BAFF29)", color: "#0A0A0F" }
                  : { border: "1px solid rgba(0,245,212,0.4)", color: "#00F5D4" })
              }}>
                Commencer
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── FAQ ───────────────────────────────────────────────────────────────────────
function FAQ() {
  const [open, setOpen] = useState(null);
  return (
    <section style={{ padding: "80px 0", background: "rgba(18,18,26,0.4)" }}>
      <div style={{ maxWidth: 760, margin: "0 auto", padding: "0 24px" }}>
        <h2 style={{ fontSize: "clamp(28px,4vw,48px)", fontWeight: 900, textAlign: "center", marginBottom: 48, letterSpacing: "-1.5px" }}>
          Questions <span style={{ background: "linear-gradient(135deg,#00F5D4,#BAFF29)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>fréquentes</span>
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {FAQS.map((f, i) => (
            <div key={i} style={{
              border: `1px solid ${open === i ? "rgba(0,245,212,0.35)" : "rgba(255,255,255,0.08)"}`,
              borderRadius: 18, overflow: "hidden", background: open === i ? "rgba(0,245,212,0.04)" : "rgba(30,30,46,0.3)",
              transition: "all 0.3s"
            }}>
              <button onClick={() => setOpen(open === i ? null : i)} style={{
                width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center",
                padding: "20px 24px", background: "none", border: "none", cursor: "pointer", textAlign: "left", gap: 16
              }}>
                <span style={{ color: "#F0F0FF", fontWeight: 600, fontSize: 15 }}>{f.q}</span>
                <div style={{
                  width: 28, height: 28, borderRadius: 8, border: `1px solid ${open === i ? "#00F5D4" : "rgba(255,255,255,0.2)"}`,
                  display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                  color: open === i ? "#00F5D4" : "#A8A8C0", transform: open === i ? "rotate(45deg)" : "none",
                  transition: "all 0.3s", background: open === i ? "rgba(0,245,212,0.15)" : "none"
                }}>
                  <Ico d={ICONS.plus} size={14} />
                </div>
              </button>
              {open === i && (
                <div style={{ padding: "0 24px 20px", color: "#A8A8C0", fontSize: 14, lineHeight: 1.7 }}>{f.a}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── CONTACT ───────────────────────────────────────────────────────────────────
function Contact() {
  const [form, setForm] = useState({ nom: "", tel: "", email: "", service: "", message: "" });
  const [sent, setSent] = useState(false);
  const inp = { width: "100%", background: "rgba(30,30,46,0.6)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, padding: "13px 16px", color: "#F0F0FF", fontSize: 14, fontFamily: "inherit", outline: "none", boxSizing: "border-box" };

  return (
    <section id="contact" style={{ padding: "100px 0", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", width: 400, height: 400, borderRadius: "50%", background: "rgba(0,245,212,0.08)", filter: "blur(80px)", right: 0, top: 0 }} />
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", position: "relative" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "start" }} className="two-col">
          {/* Left */}
          <div>
            <div style={{ display: "inline-block", border: "1px solid rgba(0,245,212,0.3)", borderRadius: 99, padding: "6px 16px", marginBottom: 20, background: "rgba(0,245,212,0.05)" }}>
              <span style={{ color: "#00F5D4", fontSize: 11, fontFamily: "monospace", letterSpacing: 2, textTransform: "uppercase" }}>Parlons de votre projet</span>
            </div>
            <h2 style={{ fontSize: "clamp(32px,4vw,52px)", fontWeight: 900, letterSpacing: "-1.5px", marginBottom: 20, lineHeight: 1.05 }}>
              Prêt à<br />
              <span style={{ background: "linear-gradient(135deg,#00F5D4,#BAFF29)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>digitaliser ?</span>
            </h2>
            <p style={{ color: "#A8A8C0", fontSize: 17, lineHeight: 1.7, marginBottom: 40 }}>
              Audit gratuit, réponse sous 24h. On s'occupe de tout — de l'analyse à l'installation.
            </p>
            {[
              { icon: "phone", label: "Téléphone / WhatsApp", val: "+243 XXX XXX XXX" },
              { icon: "mail", label: "Email", val: "contact@omedev.cd" },
              { icon: "map", label: "Localisation", val: "Kinshasa, RDC" },
            ].map(({ icon, label, val }) => (
              <div key={label} style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 22 }}>
                <div style={{ width: 44, height: 44, borderRadius: 13, background: "rgba(0,245,212,0.1)", border: "1px solid rgba(0,245,212,0.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Ico d={ICONS[icon]} size={18} />
                </div>
                <div>
                  <div style={{ fontSize: 11, color: "#A8A8C0", fontFamily: "monospace", marginBottom: 2 }}>{label}</div>
                  <div style={{ fontWeight: 600, fontSize: 14 }}>{val}</div>
                </div>
              </div>
            ))}
            <a href="https://wa.me/243000000000" target="_blank" style={{
              display: "inline-flex", alignItems: "center", gap: 10, marginTop: 16,
              background: "rgba(37,211,102,0.1)", border: "1px solid rgba(37,211,102,0.3)",
              color: "#25D366", padding: "14px 22px", borderRadius: 14, textDecoration: "none",
              fontWeight: 700, fontSize: 14, transition: "all 0.3s"
            }}>
              <span style={{ fontSize: 20 }}>💬</span> Contacter sur WhatsApp
            </a>
          </div>

          {/* Form */}
          <div style={{ border: "1px solid rgba(0,245,212,0.15)", borderRadius: 26, background: "rgba(30,30,46,0.5)", padding: 32, backdropFilter: "blur(20px)" }}>
            {sent ? (
              <div style={{ textAlign: "center", padding: "48px 0" }}>
                <div style={{ width: 64, height: 64, borderRadius: "50%", background: "rgba(0,245,212,0.2)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
                  <Ico d={ICONS.check} size={28} />
                </div>
                <h3 style={{ fontWeight: 800, fontSize: 24, marginBottom: 10, background: "linear-gradient(135deg,#00F5D4,#BAFF29)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Message envoyé !</h3>
                <p style={{ color: "#A8A8C0", fontSize: 15 }}>On vous contacte dans les 24h. Merci de votre confiance.</p>
              </div>
            ) : (
              <>
                <h3 style={{ fontWeight: 700, fontSize: 20, marginBottom: 24 }}>Demander un audit gratuit</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                    <input style={inp} placeholder="Nom complet" value={form.nom} onChange={e => setForm({ ...form, nom: e.target.value })} />
                    <input style={inp} placeholder="Téléphone" value={form.tel} onChange={e => setForm({ ...form, tel: e.target.value })} />
                  </div>
                  <input style={inp} placeholder="Email (optionnel)" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                  <select style={{ ...inp, cursor: "pointer" }} value={form.service} onChange={e => setForm({ ...form, service: e.target.value })}>
                    <option value="">Quel service vous intéresse ?</option>
                    <option>Gestion de stock & facturation</option>
                    <option>Développement site web</option>
                    <option>Cybersécurité & vidéosurveillance</option>
                    <option>Cloud & hébergement</option>
                    <option>Formation informatique</option>
                    <option>Autre / Conseil</option>
                  </select>
                  <textarea style={{ ...inp, resize: "none", minHeight: 120 }} placeholder="Décrivez votre entreprise et vos besoins..." value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} />
                  <button onClick={() => setSent(true)} style={{ background: "linear-gradient(135deg,#00F5D4,#BAFF29)", color: "#0A0A0F", fontWeight: 700, fontSize: 15, padding: "15px", borderRadius: 14, border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                    Envoyer la demande <Ico d={ICONS.arrow} size={18} />
                  </button>
                  <p style={{ color: "rgba(168,168,192,0.5)", fontSize: 12, textAlign: "center" }}>Audit gratuit · Réponse sous 24h · Sans engagement</p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── FOOTER ────────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{ borderTop: "1px solid rgba(255,255,255,0.06)", background: "#0A0A0F", padding: "60px 0 32px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: 48, marginBottom: 48 }} className="footer-grid">
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: "#00F5D4", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontFamily: "monospace", fontWeight: 700, color: "#0A0A0F", fontSize: 13 }}>OD</span>
              </div>
              <span style={{ fontWeight: 800, fontSize: 19, letterSpacing: "-0.5px" }}>Omedev<span style={{ color: "#00F5D4" }}>.</span></span>
            </div>
            <p style={{ color: "#A8A8C0", fontSize: 13.5, lineHeight: 1.75, maxWidth: 280 }}>
              Services informatiques, digitalisation et solutions technologiques pour les PME en République Démocratique du Congo.
            </p>
          </div>
          <div>
            <h4 style={{ fontWeight: 700, fontSize: 12, textTransform: "uppercase", letterSpacing: 2, color: "#A8A8C0", marginBottom: 18 }}>Services</h4>
            {["Développement Logiciels", "Gestion Stock & ERP", "Cybersécurité", "Cloud & Hébergement", "Formation Tech"].map(s => (
              <div key={s} style={{ color: "rgba(168,168,192,0.6)", fontSize: 13, marginBottom: 10, cursor: "pointer" }}>{s}</div>
            ))}
          </div>
          <div>
            <h4 style={{ fontWeight: 700, fontSize: 12, textTransform: "uppercase", letterSpacing: 2, color: "#A8A8C0", marginBottom: 18 }}>Entreprise</h4>
            {["À propos", "Nos clients", "Tarifs", "Contact"].map(s => (
              <div key={s} style={{ color: "rgba(168,168,192,0.6)", fontSize: 13, marginBottom: 10, cursor: "pointer" }}>{s}</div>
            ))}
          </div>
        </div>
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <span style={{ color: "rgba(168,168,192,0.4)", fontSize: 12, fontFamily: "monospace" }}>© 2024 Omedev Services SARL — Kinshasa, RDC</span>
          <span style={{ color: "rgba(168,168,192,0.4)", fontSize: 12, fontFamily: "monospace" }}>Fait au Congo 🇨🇩</span>
        </div>
      </div>
    </footer>
  );
}

// ── APP ───────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <div style={{ background: "#0A0A0F", color: "#F0F0FF", minHeight: "100vh", fontFamily: "'Segoe UI', system-ui, sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; scroll-behavior: smooth; }
        h1,h2,h3,h4 { font-family: 'Syne', system-ui, sans-serif; color: #F0F0FF; }
        ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-thumb { background: #00F5D4; }
        @keyframes ticker { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
        select option { background: #1E1E2E; color: #F0F0FF; }
        .hide-mobile {} .show-mobile { display: none; }
        .hero-grid { grid-template-columns: 1fr 1fr; }
        .two-col { grid-template-columns: 1fr 1fr; }
        .footer-grid { grid-template-columns: 2fr 1fr 1fr; }
        @media (max-width: 768px) {
          .hero-grid, .two-col, .footer-grid { grid-template-columns: 1fr !important; }
          .hide-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
          .hero-card-wrap { display: none; }
        }
      `}</style>
      <Navbar />
      <Hero />
      <Ticker />
      <Services />
      <Results />
      <Process />
      <Testimonials />
      <Pricing />
      <FAQ />
      <Contact />
      <Footer />
    </div>
  );
}
