import { useState, useEffect, useRef } from "react";

// ── Icons ─────────────────────────────────────────────────────────────────────
const Ico = ({ d, size = 20, style: s = {} }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" style={s}>
    <path d={d} />
  </svg>
);
const ICONS = {
  menu: "M3 6h18M3 12h18M3 18h18", x: "M18 6L6 18M6 6l12 12",
  arrow: "M5 12h14M12 5l7 7-7 7", check: "M5 13l4 4L19 7",
  star: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
  phone: "M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z",
  mail: "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22 6l-10 7L2 6",
  map: "M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z M12 10m-3 0a3 3 0 106 0 3 3 0 00-6 0",
  plus: "M12 5v14M5 12h14", shield: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
  code: "M16 18l6-6-6-6M8 6L2 12l6 6", cloud: "M18 10h-1.26A8 8 0 109 20h9a5 5 0 000-10z",
  chart: "M18 20V10M12 20V4M6 20v-6", globe: "M12 2a10 10 0 100 20A10 10 0 0012 2z M2 12h20 M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20",
  cpu: "M9 3H5a2 2 0 00-2 2v4m6-6h6m-6 0v18m6-18h4a2 2 0 012 2v4m-6-6v18M3 9h18M3 15h18",
  academic: "M22 10v6M2 10l10-5 10 5-10 5-10-5z M6 12v5c3 3 9 3 12 0v-5",
  lightning: "M13 2L3 14h9l-1 8 10-12h-9l1-8z",
  users: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2 M23 21v-2a4 4 0 00-3-3.87 M16 3.13a4 4 0 010 7.75",
  trending: "M23 6l-9.5 9.5-5-5L1 18", blog: "M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z M14 2v6h6 M16 13H8 M16 17H8 M10 9H8",
  portfolio: "M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z",
  team: "M12 2a5 5 0 110 10A5 5 0 0112 2zM2 20a10 10 0 0120 0",
  saas: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5",
  home: "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z M9 22V12h6v10",
  eye: "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z M12 9a3 3 0 100 6 3 3 0 000-6z",
  clock: "M12 22a10 10 0 100-20 10 10 0 000 20z M12 6v6l4 2",
  tag: "M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z M7 7h.01",
  link: "M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71 M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71",
  award: "M12 15a7 7 0 100-14 7 7 0 000 14z M8.21 13.89L7 23l5-3 5 3-1.21-9.12",
  package: "M16.5 9.4l-9-5.19M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 002 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z M3.27 6.96L12 12.01l8.73-5.05 M12 22.08V12",
  refresh: "M23 4v6h-6 M1 20v-6h6 M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15",
  settings: "M12 2a10 10 0 100 20 10 10 0 000-20z M12 8a4 4 0 100 8 4 4 0 000-8z",
  bell: "M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9 M13.73 21a2 2 0 01-3.46 0",
  dollar: "M12 1v22 M17 5H9.5a3.5 3.5 0 100 7h5a3.5 3.5 0 110 7H6",
  zap: "M13 2L3 14h9l-1 8 10-12h-9l1-8z",
};

// ── Charts ────────────────────────────────────────────────────────────────────
const MiniBar = ({ data }) => {
  const max = Math.max(...data.flatMap(d => [d.avant, d.apres]));
  return (
    <div style={{ width: "100%" }}>
      <div style={{ display: "flex", alignItems: "flex-end", gap: 6, height: 120 }}>
        {data.map((d, i) => (
          <div key={i} style={{ flex: 1, display: "flex", alignItems: "flex-end", gap: 2 }}>
            <div style={{ flex: 1, borderRadius: "3px 3px 0 0", background: "rgba(255,255,255,0.15)", height: `${(d.avant / max) * 100}%` }} />
            <div style={{ flex: 1, borderRadius: "3px 3px 0 0", background: "linear-gradient(to top,#00F5D4,#BAFF29)", height: `${(d.apres / max) * 100}%` }} />
          </div>
        ))}
      </div>
      <div style={{ display: "flex", gap: 6, marginTop: 6 }}>
        {data.map((d, i) => <div key={i} style={{ flex: 1, textAlign: "center", fontSize: 11, color: "rgba(168,168,192,0.6)", fontFamily: "monospace" }}>{d.mois}</div>)}
      </div>
      <div style={{ display: "flex", gap: 16, marginTop: 10, justifyContent: "center", fontSize: 11, color: "rgba(168,168,192,0.5)" }}>
        <span style={{ display: "flex", alignItems: "center", gap: 5 }}><span style={{ width: 10, height: 6, background: "rgba(255,255,255,0.2)", borderRadius: 2, display: "inline-block" }} />Avant</span>
        <span style={{ display: "flex", alignItems: "center", gap: 5 }}><span style={{ width: 10, height: 6, background: "linear-gradient(to right,#00F5D4,#BAFF29)", borderRadius: 2, display: "inline-block" }} />Après</span>
      </div>
    </div>
  );
};

const Donut = ({ slices }) => {
  let offset = 0;
  const r = 40, circ = 2 * Math.PI * r;
  const total = slices.reduce((a, b) => a + b.v, 0);
  return (
    <svg viewBox="0 0 100 100" width={100} height={100}>
      <circle cx={50} cy={50} r={r} fill="none" stroke="#1E1E2E" strokeWidth={18} />
      {slices.map((s, i) => {
        const dash = (s.v / total) * circ, gap = circ - dash;
        const el = <circle key={i} cx={50} cy={50} r={r} fill="none" stroke={s.c} strokeWidth={18}
          strokeDasharray={`${dash} ${gap}`} strokeDashoffset={-offset} transform="rotate(-90 50 50)" />;
        offset += dash; return el;
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
  { name: "Patrick Lumu", role: "Propriétaire, Restaurant Kin", text: "Nos ventes ont augmenté de 40% grâce au suivi digitalisé. Le support Omedev est toujours disponible.", stars: 5 },
];

const PLANS = [
  { name: "Starter", price: "150$", desc: "Petites boutiques", features: ["Gestion stock basique", "Facturation simple", "Support WhatsApp", "Formation 1 jour"], hot: false },
  { name: "Business", price: "450$", desc: "PME en croissance", features: ["Tout Starter inclus", "ERP complet", "Rapports analytiques", "Formation 3 jours", "Support prioritaire"], hot: true },
  { name: "Enterprise", price: "Sur devis", desc: "Grandes structures", features: ["Solution sur-mesure", "Intégrations avancées", "Dashboard multi-sites", "Formation équipe", "Support 24/7"], hot: false },
];

const FAQS = [
  { q: "Combien coûte la mise en place d'un système ?", a: "Nos tarifs commencent à 150$ pour une installation basique. Paiement en 2 fois disponible (50% avant, 50% après installation)." },
  { q: "Faut-il une connexion internet permanente ?", a: "Non ! Nos solutions fonctionnent hors-ligne et se synchronisent automatiquement dès que la connexion est rétablie." },
  { q: "Quelle est la durée d'installation ?", a: "En général 1 à 3 jours selon la complexité. La formation de votre équipe est incluse dans tous les plans." },
  { q: "Proposez-vous un support après installation ?", a: "Oui, support technique par WhatsApp et maintenance régulière. Des contrats de suivi mensuel sont disponibles." },
  { q: "Travaillez-vous hors de Kinshasa ?", a: "Nous intervenons dans tout le Congo et proposons une assistance à distance pour les provinces éloignées." },
];

// ── NEW DATA ──────────────────────────────────────────────────────────────────
const TEAM = [
  { name: "Omer Kabongo", role: "CEO & Fondateur", bio: "Ingénieur logiciel avec 8 ans d'expérience. Visionnaire de la digitalisation des PME africaines.", emoji: "👨🏾‍💻", skills: ["Leadership", "Architecture", "Stratégie"] },
  { name: "Grace Muteba", role: "CTO", bio: "Experte en cybersécurité et systèmes distribués. Diplômée en informatique, ex-Safaricom.", emoji: "👩🏾‍💻", skills: ["Cybersécurité", "Cloud", "DevOps"] },
  { name: "David Kasongo", role: "Lead Dev", bio: "Développeur full-stack passionné. Architecte de nos solutions ERP et applications mobiles.", emoji: "👨🏿‍💻", skills: ["React", "Node.js", "Flutter"] },
  { name: "Amina Ngalula", role: "Responsable Commerciale", bio: "5 ans de terrain en RDC. Elle connait les besoins réels des PME congolaises mieux que personne.", emoji: "👩🏾‍💼", skills: ["Closing", "CRM", "Relations clients"] },
];

const PORTFOLIO = [
  { title: "PharmaTrack Pro", cat: "Santé", desc: "Système de gestion complet pour 12 pharmacies à Kinshasa. Stock en temps réel, ordonnances, caisse intégrée.", result: "+45% efficacité", tags: ["ERP", "Stock", "Santé"], col: "#00F5D4", icon: "package" },
  { title: "EcoleNet RDC", cat: "Éducation", desc: "Plateforme SaaS pour 3 établissements scolaires. Gestion des inscriptions, bulletins, paiements des frais.", result: "500+ élèves gérés", tags: ["SaaS", "Web", "Mobile"], col: "#BAFF29", icon: "academic" },
  { title: "RestaurantOS", cat: "Restauration", desc: "Application de gestion des commandes, tables et inventaire pour 8 restaurants de Kinshasa.", result: "+40% ventes", tags: ["App", "POS", "Stock"], col: "#FF5C5C", icon: "zap" },
  { title: "SecureKin", cat: "Sécurité", desc: "Infrastructure de vidéosurveillance IP + monitoring à distance pour un complexe résidentiel de luxe.", result: "100% couverture", tags: ["CCTV", "IoT", "Réseau"], col: "#00F5D4", icon: "shield" },
  { title: "LogiCongo", cat: "Logistique", desc: "Système de suivi de flotte et livraisons pour une entreprise de transport avec 50+ véhicules.", result: "-30% carburant", tags: ["GPS", "Fleet", "Reporting"], col: "#BAFF29", icon: "trending" },
  { title: "BanqueWEB", cat: "Finance", desc: "Portail web et mobile pour une micro-finance locale. Dépôts, retraits, rapports automatisés.", result: "2000+ clients", tags: ["FinTech", "Web", "Sécurité"], col: "#FF5C5C", icon: "dollar" },
];

const BLOG_POSTS = [
  { title: "5 raisons pour lesquelles votre PME doit se digitaliser maintenant", cat: "Conseil", date: "12 Mars 2025", read: "5 min", excerpt: "La digitalisation n'est plus un luxe pour les PME africaines — c'est une nécessité absolue pour survivre et croître dans un marché de plus en plus compétitif.", img: "#00F5D4" },
  { title: "Comment réduire vos pertes de stock de 30% grâce à l'ERP", cat: "Tech", date: "28 Fév 2025", read: "7 min", excerpt: "Le stock mal géré coûte des milliers de dollars aux PME chaque mois. Découvrez comment un système ERP sur mesure peut transformer votre gestion.", img: "#BAFF29" },
  { title: "Cybersécurité en RDC : les 3 menaces que vous ignorez", cat: "Sécurité", date: "15 Fév 2025", read: "6 min", excerpt: "Les cyberattaques ciblent de plus en plus les PME africaines. Phishing, ransomware, accès non autorisés — comment protéger votre entreprise dès aujourd'hui.", img: "#FF5C5C" },
  { title: "SaaS vs logiciel installé : que choisir pour votre entreprise ?", cat: "Guide", date: "2 Fév 2025", read: "4 min", excerpt: "Deux approches, des avantages différents. Nous décryptons les critères clés pour faire le bon choix selon votre contexte congolais.", img: "#00F5D4" },
  { title: "Témoignage : comment la pharmacie Central a doublé son efficacité", cat: "Cas Client", date: "20 Jan 2025", read: "8 min", excerpt: "Retour d'expérience détaillé sur la transformation digitale de l'une de nos premières pharmacies clientes à Kinshasa.", img: "#BAFF29" },
  { title: "Formation informatique : investir dans les compétences de votre équipe", cat: "Formation", date: "8 Jan 2025", read: "5 min", excerpt: "Vos outils digitaux ne valent rien sans des équipes formées. Découvrez notre approche pédagogique adaptée au contexte africain.", img: "#FF5C5C" },
];

// ── SHARED COMPONENTS ─────────────────────────────────────────────────────────
const Section = ({ id, children, bg = "transparent", style: s = {} }) => (
  <section id={id} style={{ padding: "100px 0", background: bg, position: "relative", overflow: "hidden", ...s }}>
    {children}
  </section>
);
const Container = ({ children, max = 1200 }) => (
  <div style={{ maxWidth: max, margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 2 }}>
    {children}
  </div>
);
const Badge = ({ children, col = "#00F5D4" }) => (
  <div style={{ display: "inline-block", border: `1px solid ${col}40`, borderRadius: 99, padding: "6px 16px", marginBottom: 20, background: `${col}08` }}>
    <span style={{ color: col, fontSize: 11, fontFamily: "monospace", letterSpacing: 2, textTransform: "uppercase" }}>{children}</span>
  </div>
);
const GradText = ({ children, from = "#00F5D4", to = "#BAFF29" }) => (
  <span style={{ background: `linear-gradient(135deg,${from},${to})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>{children}</span>
);
const Orb = ({ w = 400, h = 400, col = "#00F5D4", top, bottom, left, right, opacity = 0.1 }) => (
  <div style={{ position: "absolute", width: w, height: h, borderRadius: "50%", background: col, filter: "blur(80px)", top, bottom, left, right, opacity, pointerEvents: "none" }} />
);

// ── NAVBAR ────────────────────────────────────────────────────────────────────
function Navbar({ page, setPage }) {
  const [scrolled, setScrolled] = useState(false);
  const [mob, setMob] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const pages = [
    { key: "home", label: "Accueil", icon: "home" },
    { key: "portfolio", label: "Réalisations", icon: "portfolio" },
    { key: "team", label: "Équipe", icon: "team" },
    { key: "saas", label: "Demo SaaS", icon: "saas" },
    { key: "blog", label: "Blog", icon: "blog" },
  ];

  return (
    <>
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, background: scrolled ? "rgba(10,10,15,0.95)" : "transparent", backdropFilter: scrolled ? "blur(20px)" : "none", borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none", transition: "all 0.4s ease", padding: "16px 0" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <button onClick={() => setPage("home")} style={{ display: "flex", alignItems: "center", gap: 10, background: "none", border: "none", cursor: "pointer" }}>
            <div style={{ width: 34, height: 34, borderRadius: 10, background: "#00F5D4", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontFamily: "monospace", fontWeight: 700, color: "#0A0A0F", fontSize: 12 }}>OD</span>
            </div>
            <span style={{ fontWeight: 800, fontSize: 19, color: "#F0F0FF", letterSpacing: "-0.5px" }}>Omedev<span style={{ color: "#00F5D4" }}>.</span></span>
          </button>

          <div style={{ display: "flex", gap: 4, alignItems: "center" }} className="hide-mobile">
            {pages.map(p => (
              <button key={p.key} onClick={() => setPage(p.key)}
                style={{ color: page === p.key ? "#00F5D4" : "#A8A8C0", fontSize: 13, background: page === p.key ? "rgba(0,245,212,0.08)" : "none", border: page === p.key ? "1px solid rgba(0,245,212,0.2)" : "1px solid transparent", borderRadius: 8, padding: "7px 14px", cursor: "pointer", transition: "all 0.2s", fontWeight: page === p.key ? 600 : 400 }}>
                {p.label}
              </button>
            ))}
            <button onClick={() => { setPage("home"); setTimeout(() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }), 100); }}
              style={{ background: "linear-gradient(135deg,#00F5D4,#BAFF29)", color: "#0A0A0F", fontWeight: 700, fontSize: 13, padding: "9px 20px", borderRadius: 10, border: "none", cursor: "pointer", marginLeft: 8 }}>
              Démarrer →
            </button>
          </div>

          <button onClick={() => setMob(true)} style={{ background: "none", border: "none", cursor: "pointer", color: "#A8A8C0" }} className="show-mobile">
            <Ico d={ICONS.menu} size={24} />
          </button>
        </div>
      </nav>

      {mob && (
        <div style={{ position: "fixed", inset: 0, zIndex: 200 }}>
          <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.8)" }} onClick={() => setMob(false)} />
          <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: 300, background: "#12121A", borderLeft: "1px solid rgba(255,255,255,0.08)", padding: 28 }}>
            <button onClick={() => setMob(false)} style={{ background: "none", border: "none", color: "#A8A8C0", cursor: "pointer", marginBottom: 24 }}>
              <Ico d={ICONS.x} size={24} />
            </button>
            {pages.map(p => (
              <button key={p.key} onClick={() => { setPage(p.key); setMob(false); }}
                style={{ display: "block", width: "100%", textAlign: "left", padding: "14px 0", borderBottom: "1px solid rgba(255,255,255,0.06)", color: page === p.key ? "#00F5D4" : "#F0F0FF", background: "none", border: "none", borderBottom: "1px solid rgba(255,255,255,0.06)", cursor: "pointer", fontWeight: 600, fontSize: 17 }}>
                {p.label}
              </button>
            ))}
            <button onClick={() => { setPage("home"); setMob(false); }} style={{ display: "block", width: "100%", marginTop: 24, background: "linear-gradient(135deg,#00F5D4,#BAFF29)", color: "#0A0A0F", fontWeight: 700, padding: "14px", borderRadius: 12, border: "none", cursor: "pointer", fontSize: 15 }}>
              Commencer
            </button>
          </div>
        </div>
      )}
    </>
  );
}

// ═══════════════════════════════════════════════════════════════════
// PAGE : ACCUEIL
// ═══════════════════════════════════════════════════════════════════
function PageHome({ setPage }) {
  const [hov, setHov] = useState(null);
  const [faq, setFaq] = useState(null);
  const [form, setForm] = useState({ nom: "", tel: "", email: "", service: "", message: "" });
  const [sent, setSent] = useState(false);
  const inp = { width: "100%", background: "rgba(30,30,46,0.6)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, padding: "13px 16px", color: "#F0F0FF", fontSize: 14, fontFamily: "inherit", outline: "none", boxSizing: "border-box" };

  return (
    <div>
      {/* HERO */}
      <section style={{ minHeight: "100vh", display: "flex", alignItems: "center", position: "relative", overflow: "hidden", paddingTop: 100 }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(0,245,212,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(0,245,212,0.04) 1px,transparent 1px)", backgroundSize: "40px 40px" }} />
        <Orb w={400} h={400} col="#00F5D4" top="10%" left="-10%" opacity={0.12} />
        <Orb w={350} h={350} col="#BAFF29" bottom="10%" right="-5%" opacity={0.08} />

        <Container>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }} className="hero-grid">
            <div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, border: "1px solid rgba(0,245,212,0.3)", borderRadius: 99, padding: "6px 16px", marginBottom: 28, background: "rgba(0,245,212,0.05)" }}>
                <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#00F5D4", animation: "pulse 2s infinite" }} />
                <span style={{ color: "#00F5D4", fontSize: 11, fontFamily: "monospace", letterSpacing: 2, textTransform: "uppercase" }}>Solutions Tech · RDC</span>
              </div>
              <h1 style={{ fontSize: "clamp(40px,6vw,70px)", fontWeight: 900, lineHeight: 0.95, letterSpacing: "-2px", marginBottom: 24, color: "#F0F0FF" }}>
                Digitalisez<br /><GradText>votre PME</GradText><br />au Congo
              </h1>
              <p style={{ color: "#A8A8C0", fontSize: 18, lineHeight: 1.7, marginBottom: 36, maxWidth: 460 }}>
                Gestion de stock, facturation, sécurité et plus — des solutions informatiques conçues pour les entreprises africaines. <strong style={{ color: "#F0F0FF" }}>Résultats garantis.</strong>
              </p>
              <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 48 }}>
                <a href="#contact" style={{ background: "linear-gradient(135deg,#00F5D4,#BAFF29)", color: "#0A0A0F", fontWeight: 700, fontSize: 15, padding: "14px 28px", borderRadius: 12, textDecoration: "none", display: "flex", alignItems: "center", gap: 8, boxShadow: "0 0 30px rgba(0,245,212,0.25)" }}>
                  Commencer maintenant <Ico d={ICONS.arrow} size={16} />
                </a>
                <button onClick={() => setPage("portfolio")} style={{ border: "1px solid rgba(0,245,212,0.4)", color: "#00F5D4", fontWeight: 600, fontSize: 15, padding: "14px 28px", borderRadius: 12, background: "none", cursor: "pointer" }}>
                  Voir nos projets
                </button>
              </div>
              <div style={{ display: "flex", gap: 28, flexWrap: "wrap" }}>
                {STATS.map(([v, l]) => (
                  <div key={v}>
                    <div style={{ fontFamily: "monospace", fontWeight: 700, fontSize: 22, background: "linear-gradient(135deg,#00F5D4,#BAFF29)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>{v}</div>
                    <div style={{ color: "#A8A8C0", fontSize: 12 }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>
            {/* Dashboard mockup */}
            <div style={{ position: "relative" }} className="hero-card-wrap">
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg,rgba(0,245,212,0.2),rgba(186,255,41,0.1))", borderRadius: 28, filter: "blur(40px)" }} />
              <div style={{ position: "relative", border: "1px solid rgba(0,245,212,0.2)", borderRadius: 24, background: "rgba(30,30,46,0.85)", padding: 24 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                  <div>
                    <div style={{ fontSize: 11, color: "#A8A8C0", fontFamily: "monospace", marginBottom: 4 }}>Dashboard Omedev</div>
                    <div style={{ fontWeight: 700, fontSize: 17 }}>Vue d'ensemble</div>
                  </div>
                  <div style={{ width: 34, height: 34, background: "rgba(0,245,212,0.15)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Ico d={ICONS.chart} size={17} style={{ color: "#00F5D4" }} />
                  </div>
                </div>
                <MiniBar data={BARS} />
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginTop: 18 }}>
                  {[["Ventes", "+48%", "#00F5D4"], ["Stock", "↑ 3x", "#BAFF29"], ["Pertes", "-30%", "#FF5C5C"]].map(([l, v, c]) => (
                    <div key={l} style={{ background: "rgba(10,10,15,0.6)", borderRadius: 12, padding: 12, border: "1px solid rgba(255,255,255,0.06)" }}>
                      <div style={{ color: "#A8A8C0", fontSize: 10, marginBottom: 4 }}>{l}</div>
                      <div style={{ fontFamily: "monospace", fontWeight: 700, fontSize: 15, color: c }}>{v}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* TICKER */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)", background: "rgba(30,30,46,0.4)", padding: "13px 0", overflow: "hidden" }}>
        <div style={{ display: "flex", animation: "ticker 22s linear infinite", whiteSpace: "nowrap" }}>
          {[...["Développement Web", "Gestion Stock", "Cybersécurité", "Solutions ERP", "Formation Tech", "Cloud Computing", "Vidéosurveillance", "Conseil Digital"],
            ...["Développement Web", "Gestion Stock", "Cybersécurité", "Solutions ERP", "Formation Tech", "Cloud Computing", "Vidéosurveillance", "Conseil Digital"]].map((item, i) => (
            <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 20, paddingRight: 40 }}>
              <span style={{ color: "rgba(168,168,192,0.6)", fontFamily: "monospace", fontSize: 12, letterSpacing: 2, textTransform: "uppercase" }}>{item}</span>
              <span style={{ color: "#00F5D4", fontSize: 11 }}>◆</span>
            </span>
          ))}
        </div>
      </div>

      {/* SERVICES */}
      <Section id="services">
        <Container>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <Badge col="#BAFF29">Ce que nous faisons</Badge>
            <h2 style={{ fontSize: "clamp(32px,5vw,54px)", fontWeight: 900, letterSpacing: "-1.5px", marginBottom: 14 }}>Nos <GradText>Services</GradText></h2>
            <p style={{ color: "#A8A8C0", fontSize: 17, maxWidth: 500, margin: "0 auto" }}>Des solutions complètes pour digitaliser chaque aspect de votre entreprise.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))", gap: 18 }}>
            {SERVICES.map((s, i) => (
              <div key={i} onMouseEnter={() => setHov(i)} onMouseLeave={() => setHov(null)}
                style={{ border: `1px solid ${hov === i ? s.col + "50" : "rgba(255,255,255,0.08)"}`, borderRadius: 20, background: hov === i ? "rgba(30,30,46,0.9)" : "rgba(30,30,46,0.4)", padding: "26px 22px", cursor: "pointer", transition: "all 0.3s", transform: hov === i ? "translateY(-6px)" : "none" }}>
                <div style={{ width: 44, height: 44, borderRadius: 13, background: hov === i ? `${s.col}20` : "rgba(255,255,255,0.05)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18, transition: "all 0.3s" }}>
                  <Ico d={ICONS[s.icon]} size={21} style={{ color: s.col }} />
                </div>
                <h3 style={{ fontWeight: 700, fontSize: 16, marginBottom: 9, color: "#F0F0FF" }}>{s.label}</h3>
                <p style={{ color: "#A8A8C0", fontSize: 13.5, lineHeight: 1.65 }}>{s.desc}</p>
                <div style={{ marginTop: 16, display: "flex", alignItems: "center", gap: 5, fontSize: 12, fontFamily: "monospace", color: s.col, opacity: hov === i ? 1 : 0.5, transition: "opacity 0.3s" }}>
                  En savoir plus <Ico d={ICONS.arrow} size={11} />
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* RESULTS */}
      <Section id="résultats" bg="rgba(30,30,46,0.2)">
        <Orb w={400} h={400} col="#00F5D4" top={0} right={-100} opacity={0.06} />
        <Container>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "start" }} className="two-col">
            <div>
              <Badge>Résultats Concrets</Badge>
              <h2 style={{ fontSize: "clamp(28px,4vw,46px)", fontWeight: 900, letterSpacing: "-1.5px", marginBottom: 18, lineHeight: 1.05 }}>
                Vos données<br /><GradText>parlent d'elles-mêmes</GradText>
              </h2>
              <p style={{ color: "#A8A8C0", fontSize: 17, lineHeight: 1.7, marginBottom: 32 }}>
                Nos clients voient en moyenne <strong style={{ color: "#F0F0FF" }}>+48% de revenus</strong> et une réduction des pertes de <strong style={{ color: "#F0F0FF" }}>30%</strong> après 3 mois.
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                {STATS.map(([v, l]) => (
                  <div key={v} style={{ border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, background: "rgba(10,10,15,0.5)", padding: "22px" }}>
                    <div style={{ fontWeight: 800, fontSize: 32, letterSpacing: "-1px", background: "linear-gradient(135deg,#00F5D4,#BAFF29)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", marginBottom: 4 }}>{v}</div>
                    <div style={{ color: "#A8A8C0", fontSize: 13 }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={{ border: "1px solid rgba(255,255,255,0.08)", borderRadius: 18, background: "rgba(10,10,15,0.5)", padding: 22 }}>
                <div style={{ fontSize: 12, fontFamily: "monospace", color: "#A8A8C0", marginBottom: 18 }}>Revenus avant/après digitalisation ($/mois)</div>
                <MiniBar data={BARS} />
              </div>
              <div style={{ border: "1px solid rgba(255,255,255,0.08)", borderRadius: 18, background: "rgba(10,10,15,0.5)", padding: 22 }}>
                <div style={{ fontSize: 12, fontFamily: "monospace", color: "#A8A8C0", marginBottom: 14 }}>Répartition de notre clientèle</div>
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  <Donut slices={PIE} />
                  <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 9 }}>
                    {PIE.map(d => (
                      <div key={d.n} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                          <div style={{ width: 7, height: 7, borderRadius: "50%", background: d.c }} />
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
        </Container>
      </Section>

      {/* PROCESS */}
      <Section>
        <Container>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <h2 style={{ fontSize: "clamp(28px,4vw,50px)", fontWeight: 900, letterSpacing: "-1.5px", marginBottom: 10 }}>
              Comment ça <GradText from="#FF5C5C" to="#BAFF29">fonctionne</GradText>
            </h2>
            <p style={{ color: "#A8A8C0", fontSize: 17 }}>Simple, rapide, efficace.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 16 }}>
            {[
              { n: "01", t: "Audit Gratuit", d: "Analyse de vos besoins en 30 minutes.", c: "#00F5D4" },
              { n: "02", t: "Proposition", d: "Solution personnalisée et devis transparent.", c: "#BAFF29" },
              { n: "03", t: "Installation", d: "Mise en place en 1 à 3 jours, formation incluse.", c: "#FF5C5C" },
              { n: "04", t: "Suivi", d: "Support technique continu et mises à jour.", c: "#00F5D4" },
            ].map((s, i) => (
              <div key={i} style={{ border: "1px solid rgba(255,255,255,0.08)", borderRadius: 18, background: "rgba(30,30,46,0.4)", padding: "30px 22px", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: 14, right: 18, fontFamily: "monospace", fontWeight: 800, fontSize: 44, color: s.c, opacity: 0.1, lineHeight: 1 }}>{s.n}</div>
                <div style={{ width: 36, height: 3, background: s.c, borderRadius: 2, marginBottom: 18 }} />
                <h3 style={{ fontWeight: 700, fontSize: 18, marginBottom: 9 }}>{s.t}</h3>
                <p style={{ color: "#A8A8C0", fontSize: 13.5, lineHeight: 1.65 }}>{s.d}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* TESTIMONIALS */}
      <Section id="témoignages" bg="rgba(18,18,26,0.6)">
        <Container>
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <Badge col="#BAFF29">Ils nous font confiance</Badge>
            <h2 style={{ fontSize: "clamp(28px,4vw,50px)", fontWeight: 900, letterSpacing: "-1.5px" }}>Ce que disent nos <GradText>clients</GradText></h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 18 }}>
            {TESTIMONIALS.map((t, i) => (
              <div key={i} style={{ border: "1px solid rgba(255,255,255,0.08)", borderRadius: 20, background: "rgba(30,30,46,0.4)", padding: 26, display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", gap: 3, marginBottom: 16 }}>{Array(t.stars).fill(0).map((_, j) => <span key={j} style={{ color: "#BAFF29", fontSize: 14 }}>★</span>)}</div>
                <p style={{ color: "rgba(240,240,255,0.75)", lineHeight: 1.75, fontSize: 14, flex: 1, marginBottom: 20, fontStyle: "italic" }}>"{t.text}"</p>
                <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
                  <div style={{ width: 38, height: 38, borderRadius: "50%", background: "linear-gradient(135deg,#00F5D4,#BAFF29)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "monospace", fontWeight: 700, color: "#0A0A0F", fontSize: 14 }}>{t.name.charAt(0)}</div>
                  <div><div style={{ fontWeight: 700, fontSize: 13 }}>{t.name}</div><div style={{ color: "#A8A8C0", fontSize: 11 }}>{t.role}</div></div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* PRICING */}
      <Section id="tarifs">
        <Container max={1100}>
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <Badge>Tarifs Transparents</Badge>
            <h2 style={{ fontSize: "clamp(28px,4vw,50px)", fontWeight: 900, letterSpacing: "-1.5px", marginBottom: 10 }}>Plans <GradText>adaptés</GradText></h2>
            <p style={{ color: "#A8A8C0", fontSize: 17 }}>Paiement en 2 fois disponible. Aucun frais caché.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 18 }}>
            {PLANS.map((p, i) => (
              <div key={i} style={{ borderRadius: 22, padding: "34px 26px", border: p.hot ? "1px solid rgba(0,245,212,0.5)" : "1px solid rgba(255,255,255,0.08)", background: p.hot ? "linear-gradient(135deg,rgba(0,245,212,0.07),rgba(186,255,41,0.04))" : "rgba(30,30,46,0.3)", position: "relative", display: "flex", flexDirection: "column", boxShadow: p.hot ? "0 0 50px rgba(0,245,212,0.1)" : "none" }}>
                {p.hot && <div style={{ position: "absolute", top: -13, left: "50%", transform: "translateX(-50%)", background: "#00F5D4", color: "#0A0A0F", fontFamily: "monospace", fontWeight: 700, fontSize: 11, padding: "4px 14px", borderRadius: 99, whiteSpace: "nowrap" }}>RECOMMANDÉ</div>}
                <div style={{ marginBottom: 22 }}>
                  <h3 style={{ fontWeight: 800, fontSize: 21, marginBottom: 4 }}>{p.name}</h3>
                  <p style={{ color: "#A8A8C0", fontSize: 13 }}>{p.desc}</p>
                </div>
                <div style={{ marginBottom: 24 }}>
                  <span style={{ fontFamily: "monospace", fontWeight: 800, fontSize: 36, background: "linear-gradient(135deg,#00F5D4,#BAFF29)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>{p.price}</span>
                  {p.price !== "Sur devis" && <span style={{ color: "#A8A8C0", fontSize: 13, marginLeft: 6 }}>/projet</span>}
                </div>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 11, flex: 1, marginBottom: 24 }}>
                  {p.features.map((f, j) => (
                    <li key={j} style={{ display: "flex", alignItems: "center", gap: 9, fontSize: 13.5 }}>
                      <div style={{ width: 19, height: 19, borderRadius: "50%", background: p.hot ? "rgba(0,245,212,0.2)" : "rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <Ico d={ICONS.check} size={10} />
                      </div>
                      <span style={{ color: p.hot ? "#F0F0FF" : "#A8A8C0" }}>{f}</span>
                    </li>
                  ))}
                </ul>
                <a href="#contact" style={{ display: "block", textAlign: "center", padding: "13px", borderRadius: 13, textDecoration: "none", fontWeight: 700, fontSize: 14, ...(p.hot ? { background: "linear-gradient(135deg,#00F5D4,#BAFF29)", color: "#0A0A0F" } : { border: "1px solid rgba(0,245,212,0.4)", color: "#00F5D4" }) }}>
                  Commencer
                </a>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* FAQ */}
      <Section bg="rgba(18,18,26,0.4)" style={{ padding: "80px 0" }}>
        <Container max={760}>
          <h2 style={{ fontSize: "clamp(26px,4vw,46px)", fontWeight: 900, textAlign: "center", marginBottom: 44, letterSpacing: "-1.5px" }}>Questions <GradText>fréquentes</GradText></h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {FAQS.map((f, i) => (
              <div key={i} style={{ border: `1px solid ${faq === i ? "rgba(0,245,212,0.35)" : "rgba(255,255,255,0.08)"}`, borderRadius: 16, overflow: "hidden", background: faq === i ? "rgba(0,245,212,0.04)" : "rgba(30,30,46,0.3)", transition: "all 0.3s" }}>
                <button onClick={() => setFaq(faq === i ? null : i)} style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "18px 22px", background: "none", border: "none", cursor: "pointer", textAlign: "left", gap: 14 }}>
                  <span style={{ color: "#F0F0FF", fontWeight: 600, fontSize: 14.5 }}>{f.q}</span>
                  <div style={{ width: 26, height: 26, borderRadius: 7, border: `1px solid ${faq === i ? "#00F5D4" : "rgba(255,255,255,0.2)"}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: faq === i ? "#00F5D4" : "#A8A8C0", transform: faq === i ? "rotate(45deg)" : "none", transition: "all 0.3s" }}>
                    <Ico d={ICONS.plus} size={13} />
                  </div>
                </button>
                {faq === i && <div style={{ padding: "0 22px 18px", color: "#A8A8C0", fontSize: 14, lineHeight: 1.7 }}>{f.a}</div>}
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* CONTACT */}
      <Section id="contact">
        <Orb w={400} h={400} col="#00F5D4" top={0} right={0} opacity={0.08} />
        <Container>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "start" }} className="two-col">
            <div>
              <Badge>Parlons de votre projet</Badge>
              <h2 style={{ fontSize: "clamp(30px,4vw,50px)", fontWeight: 900, letterSpacing: "-1.5px", marginBottom: 18, lineHeight: 1.05 }}>
                Prêt à<br /><GradText>digitaliser ?</GradText>
              </h2>
              <p style={{ color: "#A8A8C0", fontSize: 17, lineHeight: 1.7, marginBottom: 36 }}>Audit gratuit, réponse sous 24h.</p>
              {[{ icon: "phone", label: "Téléphone / WhatsApp", val: "+243 XXX XXX XXX" }, { icon: "mail", label: "Email", val: "contact@omedev.cd" }, { icon: "map", label: "Localisation", val: "Kinshasa, RDC" }].map(({ icon, label, val }) => (
                <div key={label} style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
                  <div style={{ width: 42, height: 42, borderRadius: 12, background: "rgba(0,245,212,0.1)", border: "1px solid rgba(0,245,212,0.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Ico d={ICONS[icon]} size={17} style={{ color: "#00F5D4" }} />
                  </div>
                  <div><div style={{ fontSize: 11, color: "#A8A8C0", fontFamily: "monospace", marginBottom: 2 }}>{label}</div><div style={{ fontWeight: 600, fontSize: 14 }}>{val}</div></div>
                </div>
              ))}
              <a href="https://wa.me/243000000000" target="_blank" style={{ display: "inline-flex", alignItems: "center", gap: 9, marginTop: 14, background: "rgba(37,211,102,0.1)", border: "1px solid rgba(37,211,102,0.3)", color: "#25D366", padding: "13px 20px", borderRadius: 13, textDecoration: "none", fontWeight: 700, fontSize: 14 }}>
                <span style={{ fontSize: 18 }}>💬</span> Contacter sur WhatsApp
              </a>
            </div>
            <div style={{ border: "1px solid rgba(0,245,212,0.15)", borderRadius: 24, background: "rgba(30,30,46,0.5)", padding: 30 }}>
              {sent ? (
                <div style={{ textAlign: "center", padding: "44px 0" }}>
                  <div style={{ width: 60, height: 60, borderRadius: "50%", background: "rgba(0,245,212,0.2)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 18px" }}>
                    <Ico d={ICONS.check} size={26} style={{ color: "#00F5D4" }} />
                  </div>
                  <h3 style={{ fontWeight: 800, fontSize: 22, marginBottom: 9, background: "linear-gradient(135deg,#00F5D4,#BAFF29)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Message envoyé !</h3>
                  <p style={{ color: "#A8A8C0", fontSize: 15 }}>On vous contacte dans les 24h.</p>
                </div>
              ) : (
                <>
                  <h3 style={{ fontWeight: 700, fontSize: 19, marginBottom: 22 }}>Demander un audit gratuit</h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: 13 }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 11 }}>
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
                    <textarea style={{ ...inp, resize: "none", minHeight: 110 }} placeholder="Décrivez votre entreprise et vos besoins..." value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} />
                    <button onClick={() => setSent(true)} style={{ background: "linear-gradient(135deg,#00F5D4,#BAFF29)", color: "#0A0A0F", fontWeight: 700, fontSize: 15, padding: "14px", borderRadius: 13, border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 7 }}>
                      Envoyer la demande <Ico d={ICONS.arrow} size={17} />
                    </button>
                    <p style={{ color: "rgba(168,168,192,0.4)", fontSize: 11, textAlign: "center" }}>Audit gratuit · Réponse sous 24h · Sans engagement</p>
                  </div>
                </>
              )}
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// PAGE : PORTFOLIO / RÉALISATIONS
// ═══════════════════════════════════════════════════════════════════
function PagePortfolio() {
  const [filter, setFilter] = useState("Tous");
  const [hov, setHov] = useState(null);
  const cats = ["Tous", "Santé", "Éducation", "Restauration", "Sécurité", "Logistique", "Finance"];
  const filtered = filter === "Tous" ? PORTFOLIO : PORTFOLIO.filter(p => p.cat === filter);

  return (
    <div style={{ paddingTop: 100, minHeight: "100vh" }}>
      <Orb w={500} h={500} col="#00F5D4" top="5%" left="-15%" opacity={0.08} />
      <Container>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 64, paddingTop: 40 }}>
          <Badge>Nos Réalisations</Badge>
          <h1 style={{ fontSize: "clamp(36px,5vw,64px)", fontWeight: 900, letterSpacing: "-2px", marginBottom: 18 }}>
            Projets <GradText>concrets</GradText>,<br />résultats <GradText from="#BAFF29" to="#FF5C5C">mesurables</GradText>
          </h1>
          <p style={{ color: "#A8A8C0", fontSize: 18, maxWidth: 560, margin: "0 auto" }}>
            Plus de 50 projets réalisés en RDC. Chaque projet, une transformation digitale réussie.
          </p>
        </div>

        {/* Filters */}
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center", marginBottom: 52 }}>
          {cats.map(c => (
            <button key={c} onClick={() => setFilter(c)} style={{ padding: "9px 20px", borderRadius: 99, fontSize: 13, fontWeight: 600, cursor: "pointer", transition: "all 0.25s", border: filter === c ? "1px solid #00F5D4" : "1px solid rgba(255,255,255,0.12)", background: filter === c ? "rgba(0,245,212,0.12)" : "rgba(30,30,46,0.4)", color: filter === c ? "#00F5D4" : "#A8A8C0" }}>
              {c}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))", gap: 22, marginBottom: 80 }}>
          {filtered.map((p, i) => (
            <div key={i} onMouseEnter={() => setHov(i)} onMouseLeave={() => setHov(null)}
              style={{ border: `1px solid ${hov === i ? p.col + "50" : "rgba(255,255,255,0.08)"}`, borderRadius: 22, background: "rgba(18,18,26,0.7)", overflow: "hidden", cursor: "pointer", transition: "all 0.3s", transform: hov === i ? "translateY(-6px)" : "none", boxShadow: hov === i ? `0 16px 50px ${p.col}15` : "none" }}>
              {/* Image placeholder */}
              <div style={{ height: 180, background: `linear-gradient(135deg,${p.col}18,${p.col}05)`, display: "flex", alignItems: "center", justifyContent: "center", borderBottom: "1px solid rgba(255,255,255,0.06)", position: "relative" }}>
                <div style={{ width: 64, height: 64, borderRadius: 18, background: `${p.col}20`, border: `1px solid ${p.col}30`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Ico d={ICONS[p.icon] || ICONS.code} size={28} style={{ color: p.col }} />
                </div>
                <div style={{ position: "absolute", top: 16, right: 16, background: `${p.col}20`, border: `1px solid ${p.col}40`, borderRadius: 8, padding: "4px 10px", fontSize: 11, fontFamily: "monospace", color: p.col }}>
                  {p.cat}
                </div>
              </div>
              <div style={{ padding: "22px 24px" }}>
                <h3 style={{ fontWeight: 800, fontSize: 18, marginBottom: 8 }}>{p.title}</h3>
                <p style={{ color: "#A8A8C0", fontSize: 13.5, lineHeight: 1.65, marginBottom: 18 }}>{p.desc}</p>
                {/* Tags */}
                <div style={{ display: "flex", gap: 7, flexWrap: "wrap", marginBottom: 18 }}>
                  {p.tags.map(t => (
                    <span key={t} style={{ fontSize: 11, fontFamily: "monospace", color: "rgba(168,168,192,0.7)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 6, padding: "3px 9px" }}>{t}</span>
                  ))}
                </div>
                {/* Result */}
                <div style={{ display: "flex", alignItems: "center", gap: 8, background: `${p.col}10`, border: `1px solid ${p.col}25`, borderRadius: 10, padding: "10px 14px" }}>
                  <Ico d={ICONS.award} size={15} style={{ color: p.col }} />
                  <span style={{ fontSize: 13, fontWeight: 700, color: p.col }}>{p.result}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ textAlign: "center", padding: "60px 0", border: "1px solid rgba(0,245,212,0.15)", borderRadius: 24, background: "rgba(0,245,212,0.03)", marginBottom: 60 }}>
          <h2 style={{ fontWeight: 800, fontSize: 30, marginBottom: 14 }}>Votre projet sera le prochain ici</h2>
          <p style={{ color: "#A8A8C0", fontSize: 16, marginBottom: 28 }}>Rejoignez nos 50+ clients satisfaits en RDC.</p>
          <a href="#contact" style={{ background: "linear-gradient(135deg,#00F5D4,#BAFF29)", color: "#0A0A0F", fontWeight: 700, fontSize: 15, padding: "14px 32px", borderRadius: 13, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8 }}>
            Démarrer mon projet <Ico d={ICONS.arrow} size={16} />
          </a>
        </div>
      </Container>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// PAGE : ÉQUIPE
// ═══════════════════════════════════════════════════════════════════
function PageTeam() {
  const [sel, setSel] = useState(null);
  const VALUES = [
    { icon: "award", title: "Excellence", desc: "Nous livrons des produits qui dépassent les attentes. Chaque ligne de code, chaque installation." },
    { icon: "users", title: "Proximité", desc: "Nous connaissons le terrain. Nous parlons la même langue que nos clients PME." },
    { icon: "lightning", title: "Innovation", desc: "Des solutions pensées pour le contexte africain, pas copiées de l'Occident." },
    { icon: "refresh", title: "Fiabilité", desc: "Support continu, mises à jour régulières, présence garantie même après installation." },
  ];
  return (
    <div style={{ paddingTop: 100, minHeight: "100vh" }}>
      <Orb w={400} h={400} col="#BAFF29" top="5%" right="-10%" opacity={0.07} />
      <Container>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 70, paddingTop: 40 }}>
          <Badge col="#BAFF29">Notre Équipe</Badge>
          <h1 style={{ fontSize: "clamp(36px,5vw,62px)", fontWeight: 900, letterSpacing: "-2px", marginBottom: 18 }}>
            Les <GradText>humains</GradText> derrière<br />la technologie
          </h1>
          <p style={{ color: "#A8A8C0", fontSize: 18, maxWidth: 520, margin: "0 auto" }}>
            Une équipe congolaise passionnée, formée localement et à l'international, dédiée à transformer le tissu économique de la RDC.
          </p>
        </div>

        {/* Team Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 20, marginBottom: 80 }}>
          {TEAM.map((m, i) => (
            <div key={i} onClick={() => setSel(sel === i ? null : i)}
              style={{ border: `1px solid ${sel === i ? "rgba(0,245,212,0.4)" : "rgba(255,255,255,0.08)"}`, borderRadius: 22, background: sel === i ? "rgba(0,245,212,0.05)" : "rgba(18,18,26,0.6)", padding: 28, cursor: "pointer", transition: "all 0.3s" }}>
              <div style={{ textAlign: "center", marginBottom: 20 }}>
                <div style={{ width: 80, height: 80, borderRadius: "50%", background: "linear-gradient(135deg,rgba(0,245,212,0.15),rgba(186,255,41,0.1))", border: "2px solid rgba(0,245,212,0.2)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px", fontSize: 36 }}>
                  {m.emoji}
                </div>
                <h3 style={{ fontWeight: 800, fontSize: 18, marginBottom: 4 }}>{m.name}</h3>
                <div style={{ fontSize: 13, color: "#00F5D4", fontFamily: "monospace" }}>{m.role}</div>
              </div>
              {sel === i && (
                <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 18 }}>
                  <p style={{ color: "#A8A8C0", fontSize: 13.5, lineHeight: 1.7, marginBottom: 16 }}>{m.bio}</p>
                  <div style={{ display: "flex", gap: 7, flexWrap: "wrap" }}>
                    {m.skills.map(sk => (
                      <span key={sk} style={{ fontSize: 11, fontFamily: "monospace", color: "#00F5D4", border: "1px solid rgba(0,245,212,0.25)", borderRadius: 6, padding: "3px 10px", background: "rgba(0,245,212,0.05)" }}>{sk}</span>
                    ))}
                  </div>
                </div>
              )}
              {sel !== i && <p style={{ color: "rgba(168,168,192,0.6)", fontSize: 12, textAlign: "center", fontFamily: "monospace" }}>Cliquer pour en savoir plus</p>}
            </div>
          ))}
        </div>

        {/* Values */}
        <div style={{ marginBottom: 80 }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <h2 style={{ fontSize: "clamp(28px,4vw,46px)", fontWeight: 900, letterSpacing: "-1.5px" }}>Nos <GradText from="#BAFF29" to="#00F5D4">valeurs</GradText></h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 16 }}>
            {VALUES.map((v, i) => (
              <div key={i} style={{ border: "1px solid rgba(255,255,255,0.08)", borderRadius: 18, background: "rgba(30,30,46,0.4)", padding: "26px 22px" }}>
                <div style={{ width: 42, height: 42, borderRadius: 12, background: "rgba(0,245,212,0.1)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                  <Ico d={ICONS[v.icon]} size={20} style={{ color: "#00F5D4" }} />
                </div>
                <h3 style={{ fontWeight: 700, fontSize: 17, marginBottom: 9 }}>{v.title}</h3>
                <p style={{ color: "#A8A8C0", fontSize: 13.5, lineHeight: 1.65 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* History timeline */}
        <div style={{ marginBottom: 80 }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <h2 style={{ fontSize: "clamp(28px,4vw,46px)", fontWeight: 900, letterSpacing: "-1.5px" }}>Notre <GradText>histoire</GradText></h2>
          </div>
          <div style={{ position: "relative", paddingLeft: 40 }}>
            <div style={{ position: "absolute", left: 16, top: 0, bottom: 0, width: 2, background: "linear-gradient(to bottom,#00F5D4,#BAFF29,rgba(0,0,0,0))" }} />
            {[
              { year: "2019", title: "Fondation à Kinshasa", desc: "Omer Kabongo crée Omedev avec une vision claire : digitaliser les PME congolaises." },
              { year: "2020", title: "Premier grand client", desc: "Installation du système ERP pour un réseau de pharmacies. Premier succès concret." },
              { year: "2021", title: "Extension de l'équipe", desc: "Recrutement des 3 premiers développeurs. Début du développement SaaS." },
              { year: "2022", title: "50 clients franchis", desc: "Cap des 50 clients actifs atteint. Lancement du programme de formation IT." },
              { year: "2024", title: "Expansion nationale", desc: "Interventions dans 6 provinces. Partenariats avec des ONG et institutions publiques." },
            ].map((e, i) => (
              <div key={i} style={{ position: "relative", marginBottom: 36, paddingLeft: 24 }}>
                <div style={{ position: "absolute", left: -32, top: 4, width: 14, height: 14, borderRadius: "50%", background: "#00F5D4", border: "3px solid #0A0A0F" }} />
                <div style={{ fontFamily: "monospace", fontSize: 12, color: "#00F5D4", marginBottom: 6 }}>{e.year}</div>
                <h4 style={{ fontWeight: 700, fontSize: 16, marginBottom: 6 }}>{e.title}</h4>
                <p style={{ color: "#A8A8C0", fontSize: 13.5, lineHeight: 1.6 }}>{e.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// PAGE : DEMO SAAS (interactive)
// ═══════════════════════════════════════════════════════════════════
function PageSaaS() {
  const [tab, setTab] = useState("stock");
  const [stockData, setStockData] = useState([
    { id: 1, name: "Paracétamol 500mg", qty: 450, min: 100, cat: "Médicament", price: 2.5 },
    { id: 2, name: "Amoxicilline 250mg", qty: 80, min: 100, cat: "Médicament", price: 4.0 },
    { id: 3, name: "Gants latex (boîte)", qty: 25, min: 50, cat: "Matériel", price: 8.0 },
    { id: 4, name: "Seringues 5ml", qty: 200, min: 80, cat: "Matériel", price: 0.5 },
    { id: 5, name: "Doliprane 1000mg", qty: 15, min: 120, cat: "Médicament", price: 3.0 },
    { id: 6, name: "Masques chirurgicaux", qty: 300, min: 100, cat: "Matériel", price: 0.3 },
  ]);
  const [ventes, setVentes] = useState([
    { id: 1, item: "Paracétamol 500mg", qty: 10, total: 25, date: "Aujourd'hui 09:15" },
    { id: 2, item: "Amoxicilline 250mg", qty: 3, total: 12, date: "Aujourd'hui 10:32" },
    { id: 3, item: "Gants latex", qty: 2, total: 16, date: "Aujourd'hui 11:00" },
  ]);
  const [newItem, setNewItem] = useState({ name: "", qty: "", cat: "Médicament", price: "" });
  const [alert, setAlert] = useState("");
  const [sellQty, setSellQty] = useState({});

  const totalVal = stockData.reduce((a, s) => a + s.qty * s.price, 0);
  const alerts = stockData.filter(s => s.qty < s.min).length;

  const handleAddItem = () => {
    if (!newItem.name || !newItem.qty) return;
    setStockData([...stockData, { id: Date.now(), name: newItem.name, qty: parseInt(newItem.qty), min: 50, cat: newItem.cat, price: parseFloat(newItem.price) || 1 }]);
    setNewItem({ name: "", qty: "", cat: "Médicament", price: "" });
    setAlert("✅ Produit ajouté avec succès !");
    setTimeout(() => setAlert(""), 3000);
  };

  const handleSell = (item) => {
    const qty = parseInt(sellQty[item.id]) || 1;
    if (qty > item.qty) { setAlert("❌ Stock insuffisant !"); setTimeout(() => setAlert(""), 3000); return; }
    setStockData(stockData.map(s => s.id === item.id ? { ...s, qty: s.qty - qty } : s));
    setVentes([{ id: Date.now(), item: item.name, qty, total: qty * item.price, date: "Maintenant" }, ...ventes.slice(0, 9)]);
    setSellQty({ ...sellQty, [item.id]: "" });
    setAlert(`✅ Vente enregistrée : ${qty} × ${item.name}`);
    setTimeout(() => setAlert(""), 3000);
  };

  const inp2 = { background: "rgba(30,30,46,0.7)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 9, padding: "9px 12px", color: "#F0F0FF", fontSize: 13, fontFamily: "inherit", outline: "none" };

  return (
    <div style={{ paddingTop: 100, minHeight: "100vh" }}>
      <Container>
        <div style={{ paddingTop: 40, marginBottom: 40 }}>
          <Badge col="#BAFF29">Démo Interactive</Badge>
          <h1 style={{ fontSize: "clamp(32px,5vw,56px)", fontWeight: 900, letterSpacing: "-2px", marginBottom: 14 }}>
            OmeSaaS — <GradText>Testez en direct</GradText>
          </h1>
          <p style={{ color: "#A8A8C0", fontSize: 17, maxWidth: 600 }}>
            Voici une démonstration réelle de notre logiciel de gestion pour pharmacies. Ajoutez des produits, enregistrez des ventes, suivez les alertes de stock.
          </p>
        </div>

        {/* Alert banner */}
        {alert && (
          <div style={{ marginBottom: 20, padding: "13px 18px", borderRadius: 12, background: alert.startsWith("✅") ? "rgba(0,245,212,0.1)" : "rgba(255,92,92,0.1)", border: `1px solid ${alert.startsWith("✅") ? "rgba(0,245,212,0.3)" : "rgba(255,92,92,0.3)"}`, color: alert.startsWith("✅") ? "#00F5D4" : "#FF5C5C", fontSize: 14, fontWeight: 600 }}>
            {alert}
          </div>
        )}

        {/* KPI row */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: 14, marginBottom: 28 }}>
          {[
            { label: "Produits en stock", val: stockData.length, col: "#00F5D4", icon: "package" },
            { label: "Alertes stock", val: alerts, col: alerts > 0 ? "#FF5C5C" : "#BAFF29", icon: "bell" },
            { label: "Valeur totale", val: `$${totalVal.toFixed(0)}`, col: "#BAFF29", icon: "dollar" },
            { label: "Ventes aujourd'hui", val: ventes.length, col: "#00F5D4", icon: "trending" },
          ].map((k, i) => (
            <div key={i} style={{ border: `1px solid ${k.col}30`, borderRadius: 16, background: `${k.col}08`, padding: "18px 20px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 8 }}>
                <Ico d={ICONS[k.icon]} size={15} style={{ color: k.col }} />
                <span style={{ fontSize: 12, color: "#A8A8C0", fontFamily: "monospace" }}>{k.label}</span>
              </div>
              <div style={{ fontWeight: 800, fontSize: 28, fontFamily: "monospace", color: k.col }}>{k.val}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 8, marginBottom: 24, borderBottom: "1px solid rgba(255,255,255,0.08)", paddingBottom: 0 }}>
          {[["stock", "📦 Stock"], ["ventes", "💰 Ventes"], ["ajouter", "➕ Ajouter un produit"]].map(([k, l]) => (
            <button key={k} onClick={() => setTab(k)} style={{ padding: "11px 20px", borderRadius: "10px 10px 0 0", fontSize: 13, fontWeight: 600, cursor: "pointer", border: "none", borderBottom: tab === k ? "2px solid #00F5D4" : "2px solid transparent", background: tab === k ? "rgba(0,245,212,0.08)" : "none", color: tab === k ? "#00F5D4" : "#A8A8C0", transition: "all 0.2s" }}>
              {l}
            </button>
          ))}
        </div>

        {/* Tab: Stock */}
        {tab === "stock" && (
          <div style={{ marginBottom: 60 }}>
            <div style={{ border: "1px solid rgba(255,255,255,0.08)", borderRadius: 18, overflow: "hidden" }}>
              <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr 1fr", gap: 0, background: "rgba(30,30,46,0.6)", padding: "12px 20px", fontSize: 11, fontFamily: "monospace", color: "#A8A8C0", textTransform: "uppercase", letterSpacing: 1 }}>
                <span>Produit</span><span>Stock</span><span>Min</span><span>Prix</span><span>Valeur</span><span>Vendre</span>
              </div>
              {stockData.map((s, i) => {
                const low = s.qty < s.min;
                return (
                  <div key={s.id} style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr 1fr", gap: 0, padding: "14px 20px", borderTop: "1px solid rgba(255,255,255,0.06)", alignItems: "center", background: i % 2 === 0 ? "rgba(10,10,15,0.2)" : "transparent" }}>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 2 }}>{s.name}</div>
                      <div style={{ fontSize: 11, color: "#A8A8C0", fontFamily: "monospace" }}>{s.cat}</div>
                    </div>
                    <div style={{ fontFamily: "monospace", fontWeight: 700, fontSize: 15, color: low ? "#FF5C5C" : "#00F5D4" }}>
                      {s.qty} {low && <span style={{ fontSize: 10, background: "rgba(255,92,92,0.15)", border: "1px solid rgba(255,92,92,0.3)", borderRadius: 4, padding: "1px 5px", color: "#FF5C5C", marginLeft: 4 }}>FAIBLE</span>}
                    </div>
                    <div style={{ color: "#A8A8C0", fontSize: 13, fontFamily: "monospace" }}>{s.min}</div>
                    <div style={{ color: "#BAFF29", fontSize: 13, fontFamily: "monospace" }}>${s.price}</div>
                    <div style={{ color: "#A8A8C0", fontSize: 13, fontFamily: "monospace" }}>${(s.qty * s.price).toFixed(0)}</div>
                    <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                      <input type="number" min="1" max={s.qty} value={sellQty[s.id] || ""} onChange={e => setSellQty({ ...sellQty, [s.id]: e.target.value })} placeholder="Qté" style={{ ...inp2, width: 52, padding: "6px 8px" }} />
                      <button onClick={() => handleSell(s)} style={{ background: "linear-gradient(135deg,#00F5D4,#BAFF29)", color: "#0A0A0F", border: "none", borderRadius: 7, padding: "6px 12px", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>Vendre</button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab: Ventes */}
        {tab === "ventes" && (
          <div style={{ marginBottom: 60 }}>
            {ventes.length === 0 ? (
              <div style={{ textAlign: "center", padding: "60px 0", color: "#A8A8C0" }}>Aucune vente enregistrée. Utilisez l'onglet Stock pour vendre.</div>
            ) : (
              <div style={{ border: "1px solid rgba(255,255,255,0.08)", borderRadius: 18, overflow: "hidden" }}>
                <div style={{ background: "rgba(30,30,46,0.6)", padding: "12px 20px", fontSize: 11, fontFamily: "monospace", color: "#A8A8C0", textTransform: "uppercase", display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1.5fr", letterSpacing: 1 }}>
                  <span>Produit</span><span>Qté</span><span>Total</span><span>Heure</span>
                </div>
                {ventes.map((v, i) => (
                  <div key={v.id} style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1.5fr", padding: "14px 20px", borderTop: "1px solid rgba(255,255,255,0.06)", alignItems: "center", background: i % 2 === 0 ? "rgba(10,10,15,0.2)" : "transparent" }}>
                    <div style={{ fontSize: 14, fontWeight: 600 }}>{v.item}</div>
                    <div style={{ fontFamily: "monospace", color: "#A8A8C0" }}>{v.qty}</div>
                    <div style={{ fontFamily: "monospace", fontWeight: 700, color: "#BAFF29" }}>${v.total.toFixed(2)}</div>
                    <div style={{ fontSize: 12, color: "#A8A8C0", fontFamily: "monospace" }}>{v.date}</div>
                  </div>
                ))}
                <div style={{ padding: "14px 20px", borderTop: "1px solid rgba(255,255,255,0.08)", display: "flex", justifyContent: "flex-end", background: "rgba(30,30,46,0.4)" }}>
                  <span style={{ fontFamily: "monospace", fontWeight: 700, fontSize: 16 }}>
                    Total : <span style={{ color: "#BAFF29" }}>${ventes.reduce((a, v) => a + v.total, 0).toFixed(2)}</span>
                  </span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab: Ajouter */}
        {tab === "ajouter" && (
          <div style={{ maxWidth: 540, marginBottom: 60 }}>
            <div style={{ border: "1px solid rgba(0,245,212,0.15)", borderRadius: 20, background: "rgba(30,30,46,0.5)", padding: 28 }}>
              <h3 style={{ fontWeight: 700, fontSize: 18, marginBottom: 22 }}>Ajouter un produit au stock</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <div>
                  <label style={{ fontSize: 12, color: "#A8A8C0", fontFamily: "monospace", display: "block", marginBottom: 6 }}>NOM DU PRODUIT</label>
                  <input style={{ ...inp2, width: "100%", boxSizing: "border-box" }} placeholder="Ex: Ibuprofène 400mg" value={newItem.name} onChange={e => setNewItem({ ...newItem, name: e.target.value })} />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <div>
                    <label style={{ fontSize: 12, color: "#A8A8C0", fontFamily: "monospace", display: "block", marginBottom: 6 }}>QUANTITÉ</label>
                    <input type="number" style={{ ...inp2, width: "100%", boxSizing: "border-box" }} placeholder="100" value={newItem.qty} onChange={e => setNewItem({ ...newItem, qty: e.target.value })} />
                  </div>
                  <div>
                    <label style={{ fontSize: 12, color: "#A8A8C0", fontFamily: "monospace", display: "block", marginBottom: 6 }}>PRIX UNITAIRE ($)</label>
                    <input type="number" style={{ ...inp2, width: "100%", boxSizing: "border-box" }} placeholder="2.50" value={newItem.price} onChange={e => setNewItem({ ...newItem, price: e.target.value })} />
                  </div>
                </div>
                <div>
                  <label style={{ fontSize: 12, color: "#A8A8C0", fontFamily: "monospace", display: "block", marginBottom: 6 }}>CATÉGORIE</label>
                  <select style={{ ...inp2, width: "100%", cursor: "pointer" }} value={newItem.cat} onChange={e => setNewItem({ ...newItem, cat: e.target.value })}>
                    <option>Médicament</option><option>Matériel</option><option>Cosmétique</option><option>Autre</option>
                  </select>
                </div>
                <button onClick={handleAddItem} style={{ background: "linear-gradient(135deg,#00F5D4,#BAFF29)", color: "#0A0A0F", fontWeight: 700, fontSize: 15, padding: "13px", borderRadius: 12, border: "none", cursor: "pointer" }}>
                  Ajouter au stock
                </button>
              </div>
            </div>
            <div style={{ marginTop: 20, padding: "16px 20px", borderRadius: 14, background: "rgba(186,255,41,0.05)", border: "1px solid rgba(186,255,41,0.2)" }}>
              <p style={{ color: "#A8A8C0", fontSize: 13, lineHeight: 1.7 }}>
                💡 <strong style={{ color: "#BAFF29" }}>Ceci est une démo.</strong> Dans la version réelle, vos données sont sauvegardées dans le cloud, synchronisées sur tous vos appareils, et exportables en Excel ou PDF.
              </p>
            </div>
          </div>
        )}

        {/* CTA */}
        <div style={{ textAlign: "center", paddingBottom: 80 }}>
          <p style={{ color: "#A8A8C0", fontSize: 15, marginBottom: 20 }}>Prêt à déployer ce système dans votre entreprise ?</p>
          <a href="#contact" style={{ background: "linear-gradient(135deg,#00F5D4,#BAFF29)", color: "#0A0A0F", fontWeight: 700, fontSize: 15, padding: "14px 32px", borderRadius: 13, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8 }}>
            Obtenir ma version complète <Ico d={ICONS.arrow} size={16} />
          </a>
        </div>
      </Container>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// PAGE : BLOG
// ═══════════════════════════════════════════════════════════════════
function PageBlog() {
  const [sel, setSel] = useState(null);
  const [filterCat, setFilterCat] = useState("Tous");
  const cats = ["Tous", ...new Set(BLOG_POSTS.map(b => b.cat))];
  const filtered = filterCat === "Tous" ? BLOG_POSTS : BLOG_POSTS.filter(b => b.cat === filterCat);

  return (
    <div style={{ paddingTop: 100, minHeight: "100vh" }}>
      <Orb w={400} h={400} col="#FF5C5C" top="10%" right="-10%" opacity={0.07} />
      <Container>
        <div style={{ paddingTop: 40, marginBottom: 60 }}>
          <Badge col="#FF5C5C">Nos Articles</Badge>
          <h1 style={{ fontSize: "clamp(36px,5vw,62px)", fontWeight: 900, letterSpacing: "-2px", marginBottom: 18 }}>
            Blog <GradText from="#FF5C5C" to="#BAFF29">Omedev</GradText>
          </h1>
          <p style={{ color: "#A8A8C0", fontSize: 18, maxWidth: 540 }}>
            Conseils pratiques, guides techniques et retours d'expérience pour digitaliser votre entreprise en Afrique.
          </p>
        </div>

        {/* Filters */}
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 48 }}>
          {cats.map(c => (
            <button key={c} onClick={() => setFilterCat(c)} style={{ padding: "8px 18px", borderRadius: 99, fontSize: 13, fontWeight: 600, cursor: "pointer", transition: "all 0.25s", border: filterCat === c ? "1px solid #FF5C5C" : "1px solid rgba(255,255,255,0.12)", background: filterCat === c ? "rgba(255,92,92,0.1)" : "rgba(30,30,46,0.4)", color: filterCat === c ? "#FF5C5C" : "#A8A8C0" }}>
              {c}
            </button>
          ))}
        </div>

        {/* Featured post */}
        {!sel && filterCat === "Tous" && (
          <div onClick={() => setSel(BLOG_POSTS[0])} style={{ border: "1px solid rgba(0,245,212,0.2)", borderRadius: 24, overflow: "hidden", marginBottom: 32, cursor: "pointer", background: "rgba(18,18,26,0.7)", transition: "all 0.3s" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0 }} className="two-col">
              <div style={{ height: 300, background: `linear-gradient(135deg,${BLOG_POSTS[0].img}25,rgba(0,0,0,0.5))`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Ico d={ICONS.blog} size={64} style={{ color: BLOG_POSTS[0].img, opacity: 0.5 }} />
              </div>
              <div style={{ padding: "36px 32px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 16 }}>
                  <span style={{ fontSize: 11, fontFamily: "monospace", color: "#FF5C5C", border: "1px solid rgba(255,92,92,0.3)", borderRadius: 6, padding: "3px 9px" }}>À LA UNE</span>
                  <span style={{ fontSize: 11, fontFamily: "monospace", color: "#A8A8C0" }}>{BLOG_POSTS[0].date} · {BLOG_POSTS[0].read} de lecture</span>
                </div>
                <h2 style={{ fontWeight: 800, fontSize: "clamp(18px,2.5vw,26px)", marginBottom: 14, lineHeight: 1.25 }}>{BLOG_POSTS[0].title}</h2>
                <p style={{ color: "#A8A8C0", fontSize: 14, lineHeight: 1.7, marginBottom: 24 }}>{BLOG_POSTS[0].excerpt}</p>
                <span style={{ color: "#00F5D4", fontSize: 13, fontFamily: "monospace", display: "flex", alignItems: "center", gap: 6 }}>Lire l'article <Ico d={ICONS.arrow} size={13} /></span>
              </div>
            </div>
          </div>
        )}

        {/* Article reader */}
        {sel ? (
          <div>
            <button onClick={() => setSel(null)} style={{ display: "flex", alignItems: "center", gap: 8, color: "#A8A8C0", background: "none", border: "none", cursor: "pointer", fontSize: 14, marginBottom: 30 }}>
              ← Retour au blog
            </button>
            <div style={{ maxWidth: 720, margin: "0 auto" }}>
              <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 20 }}>
                <span style={{ fontSize: 11, fontFamily: "monospace", color: sel.img, border: `1px solid ${sel.img}40`, borderRadius: 6, padding: "3px 9px" }}>{sel.cat}</span>
                <span style={{ fontSize: 12, color: "#A8A8C0", fontFamily: "monospace" }}>{sel.date} · {sel.read} de lecture</span>
              </div>
              <h1 style={{ fontWeight: 900, fontSize: "clamp(24px,4vw,40px)", letterSpacing: "-1px", marginBottom: 24, lineHeight: 1.15 }}>{sel.title}</h1>
              <div style={{ height: 280, background: `linear-gradient(135deg,${sel.img}20,rgba(0,0,0,0.5))`, borderRadius: 18, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 36 }}>
                <Ico d={ICONS.blog} size={72} style={{ color: sel.img, opacity: 0.4 }} />
              </div>
              <div style={{ color: "#C0C0D8", fontSize: 17, lineHeight: 1.85, marginBottom: 24 }}>
                <p style={{ marginBottom: 20 }}>{sel.excerpt}</p>
                <p style={{ marginBottom: 20 }}>En République Démocratique du Congo, les PME représentent plus de 90% du tissu économique. Pourtant, la grande majorité d'entre elles opère encore avec des méthodes manuelles — registres papier, calculs à la main, gestion intuitive des stocks. Le résultat ? Des pertes silencieuses qui s'accumulent mois après mois.</p>
                <p style={{ marginBottom: 20 }}>Nos interventions sur le terrain l'ont confirmé : une pharmacie qui perd 200$ par mois à cause de médicaments expirés non détectés, un restaurant qui commande trop de matières premières faute de suivi, une école incapable d'éditer ses bulletins rapidement. Ce sont des problèmes réels, avec des solutions numériques concrètes.</p>
                <h3 style={{ color: "#F0F0FF", fontWeight: 700, fontSize: 20, margin: "28px 0 14px" }}>Les bénéfices mesurables</h3>
                <p>Après 5 ans d'interventions, nos données montrent que les entreprises qui adoptent un système de gestion digital voient en moyenne +48% de revenus dans les 6 premiers mois, -30% de pertes de stock, et un gain de 2 à 3 heures par jour sur les tâches administratives.</p>
              </div>
              <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 28, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
                <span style={{ color: "#A8A8C0", fontSize: 13 }}>Publié par l'équipe Omedev Services</span>
                <a href="#contact" style={{ background: "linear-gradient(135deg,#00F5D4,#BAFF29)", color: "#0A0A0F", fontWeight: 700, fontSize: 13, padding: "11px 22px", borderRadius: 10, textDecoration: "none" }}>Contactez-nous</a>
              </div>
            </div>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 20, marginBottom: 80 }}>
            {filtered.map((b, i) => (
              <div key={i} onClick={() => setSel(b)} style={{ border: "1px solid rgba(255,255,255,0.08)", borderRadius: 20, background: "rgba(18,18,26,0.6)", overflow: "hidden", cursor: "pointer", transition: "all 0.3s" }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-5px)"; e.currentTarget.style.borderColor = `${b.img}40`; }}
                onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; }}>
                <div style={{ height: 140, background: `linear-gradient(135deg,${b.img}20,rgba(0,0,0,0.4))`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Ico d={ICONS.blog} size={40} style={{ color: b.img, opacity: 0.5 }} />
                </div>
                <div style={{ padding: "20px 22px" }}>
                  <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 12 }}>
                    <span style={{ fontSize: 10, fontFamily: "monospace", color: b.img, border: `1px solid ${b.img}35`, borderRadius: 5, padding: "2px 7px" }}>{b.cat}</span>
                    <span style={{ fontSize: 11, color: "#A8A8C0", fontFamily: "monospace" }}>{b.read} lecture</span>
                  </div>
                  <h3 style={{ fontWeight: 700, fontSize: 15, marginBottom: 10, lineHeight: 1.35 }}>{b.title}</h3>
                  <p style={{ color: "#A8A8C0", fontSize: 13, lineHeight: 1.65, marginBottom: 16 }}>{b.excerpt.slice(0, 100)}...</p>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: 11, color: "#A8A8C0", fontFamily: "monospace" }}>{b.date}</span>
                    <span style={{ fontSize: 12, color: "#00F5D4", fontFamily: "monospace", display: "flex", alignItems: "center", gap: 4 }}>Lire <Ico d={ICONS.arrow} size={11} /></span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Newsletter */}
        {!sel && (
          <div style={{ textAlign: "center", padding: "60px 40px", border: "1px solid rgba(255,92,92,0.2)", borderRadius: 24, background: "rgba(255,92,92,0.03)", marginBottom: 60 }}>
            <h2 style={{ fontWeight: 800, fontSize: 26, marginBottom: 12 }}>Recevez nos conseils chaque semaine</h2>
            <p style={{ color: "#A8A8C0", fontSize: 15, marginBottom: 24 }}>Newsletter gratuite sur la digitalisation des PME africaines.</p>
            <div style={{ display: "flex", gap: 10, maxWidth: 440, margin: "0 auto", flexWrap: "wrap", justifyContent: "center" }}>
              <input style={{ flex: 1, minWidth: 220, background: "rgba(30,30,46,0.6)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10, padding: "12px 16px", color: "#F0F0FF", fontSize: 14, fontFamily: "inherit", outline: "none" }} placeholder="Votre email" />
              <button style={{ background: "linear-gradient(135deg,#FF5C5C,#BAFF29)", color: "#0A0A0F", fontWeight: 700, fontSize: 14, padding: "12px 24px", borderRadius: 10, border: "none", cursor: "pointer" }}>S'inscrire</button>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}

// ── FOOTER ────────────────────────────────────────────────────────────────────
function Footer({ setPage }) {
  return (
    <footer style={{ borderTop: "1px solid rgba(255,255,255,0.06)", background: "#0A0A0F", padding: "56px 0 28px" }}>
      <Container>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 40, marginBottom: 44 }} className="footer-grid">
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <div style={{ width: 34, height: 34, borderRadius: 10, background: "#00F5D4", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontFamily: "monospace", fontWeight: 700, color: "#0A0A0F", fontSize: 12 }}>OD</span>
              </div>
              <span style={{ fontWeight: 800, fontSize: 18 }}>Omedev<span style={{ color: "#00F5D4" }}>.</span></span>
            </div>
            <p style={{ color: "#A8A8C0", fontSize: 13.5, lineHeight: 1.75, maxWidth: 260 }}>Services informatiques, digitalisation et solutions technologiques pour les PME en RDC.</p>
          </div>
          <div>
            <h4 style={{ fontWeight: 700, fontSize: 12, textTransform: "uppercase", letterSpacing: 2, color: "#A8A8C0", marginBottom: 16 }}>Services</h4>
            {["Développement Logiciels", "Gestion Stock & ERP", "Cybersécurité", "Cloud & Hébergement"].map(s => (
              <div key={s} style={{ color: "rgba(168,168,192,0.55)", fontSize: 13, marginBottom: 9, cursor: "pointer" }}>{s}</div>
            ))}
          </div>
          <div>
            <h4 style={{ fontWeight: 700, fontSize: 12, textTransform: "uppercase", letterSpacing: 2, color: "#A8A8C0", marginBottom: 16 }}>Pages</h4>
            {[["home", "Accueil"], ["portfolio", "Réalisations"], ["team", "Équipe"], ["saas", "Démo SaaS"], ["blog", "Blog"]].map(([k, l]) => (
              <div key={k} onClick={() => setPage(k)} style={{ color: "rgba(168,168,192,0.55)", fontSize: 13, marginBottom: 9, cursor: "pointer" }}>{l}</div>
            ))}
          </div>
          <div>
            <h4 style={{ fontWeight: 700, fontSize: 12, textTransform: "uppercase", letterSpacing: 2, color: "#A8A8C0", marginBottom: 16 }}>Contact</h4>
            <div style={{ color: "rgba(168,168,192,0.55)", fontSize: 13, marginBottom: 9 }}>contact@omedev.cd</div>
            <div style={{ color: "rgba(168,168,192,0.55)", fontSize: 13, marginBottom: 9 }}>+243 XXX XXX XXX</div>
            <div style={{ color: "rgba(168,168,192,0.55)", fontSize: 13 }}>Kinshasa, RDC</div>
          </div>
        </div>
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 22, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10 }}>
          <span style={{ color: "rgba(168,168,192,0.35)", fontSize: 12, fontFamily: "monospace" }}>© 2024 Omedev Services SARL — Kinshasa, RDC</span>
          <span style={{ color: "rgba(168,168,192,0.35)", fontSize: 12, fontFamily: "monospace" }}>Fait au Congo 🇨🇩</span>
        </div>
      </Container>
    </footer>
  );
}

// ══════════════════════════════════════════════════════════════════
// APP ROOT
// ══════════════════════════════════════════════════════════════════
export default function App() {
  const [page, setPage] = useState("home");

  useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, [page]);

  return (
    <div style={{ background: "#0A0A0F", color: "#F0F0FF", minHeight: "100vh", fontFamily: "'Segoe UI', system-ui, sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; scroll-behavior: smooth; }
        h1,h2,h3,h4 { font-family: 'Syne', system-ui, sans-serif; color: #F0F0FF; }
        ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-thumb { background: #00F5D4; border-radius: 2px; }
        @keyframes ticker { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
        select option { background: #1E1E2E; color: #F0F0FF; }
        input::placeholder { color: rgba(168,168,192,0.4); }
        textarea::placeholder { color: rgba(168,168,192,0.4); }
        .hide-mobile {} .show-mobile { display: none; }
        .hero-grid { grid-template-columns: 1fr 1fr; }
        .two-col { grid-template-columns: 1fr 1fr; }
        .footer-grid { grid-template-columns: 2fr 1fr 1fr 1fr; }
        @media (max-width: 768px) {
          .hero-grid,.two-col,.footer-grid { grid-template-columns: 1fr !important; }
          .hide-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
          .hero-card-wrap { display: none; }
        }
      `}</style>

      <Navbar page={page} setPage={setPage} />

      {page === "home" && <PageHome setPage={setPage} />}
      {page === "portfolio" && <PagePortfolio />}
      {page === "team" && <PageTeam />}
      {page === "saas" && <PageSaaS />}
      {page === "blog" && <PageBlog />}

      <Footer setPage={setPage} />
    </div>
  );
}
