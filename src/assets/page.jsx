import { useState } from "react";
import { Routes, Route, Link, useParams } from "react-router-dom";
import { Menu, X, ArrowRight, Phone, CheckCircle } from "lucide-react";

// ==================== DONNÉES SERVICES (résumé) ====================
const servicesData = [ /* ... garde tes 15 services ici (je les ai enlevés pour raccourcir le message) */ ];

function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-[#0F172A] text-white sticky top-0 z-50 shadow-xl py-5">
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-11 h-11 bg-blue-600 rounded-2xl flex items-center justify-center text-3xl">🧬</div>
          <span className="text-3xl font-bold">Omedev <span className="text-orange-500">Services</span></span>
        </Link>

        <div className="hidden md:flex gap-8 text-lg">
          <Link to="/" className="hover:text-orange-400">Accueil</Link>
          <Link to="/services" className="hover:text-orange-400">Services</Link>
          <Link to="/apropos" className="hover:text-orange-400">À propos</Link>
          <Link to="/contact" className="hover:text-orange-400">Contact</Link>
        </div>

        <a href="https://wa.me/243971234567" target="_blank" className="bg-orange-500 hover:bg-orange-600 px-6 py-3 rounded-3xl font-semibold flex items-center gap-2">
          <Phone size={20} /> WhatsApp
        </a>

        <button onClick={() => setOpen(!open)} className="md:hidden">
          {open ? <X size={32} /> : <Menu size={32} />}
        </button>
      </div>
    </nav>
  );
}

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        {/* Page Accueil - CORRIGÉE */}
        <Route path="/" element={
          <div className="min-h-screen bg-[#0F172A] text-white pt-20">
            <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center min-h-[80vh]">
              
              {/* Texte à gauche */}
              <div className="space-y-10">
                <div className="inline-flex items-center gap-3 bg-white/10 px-6 py-3 rounded-full text-lg">
                  🚀 Transformation digitale en Afrique
                </div>

                <h1 className="text-6xl md:text-7xl font-bold leading-none">
                  Digitalisez votre entreprise<br />
                  avec <span className="text-orange-500">Omedev Services</span>
                </h1>

                <p className="text-2xl text-gray-300">
                  15 services officiels • Installation en 7 jours • Résultats mesurables
                </p>

                <div className="flex flex-wrap gap-6">
                  <Link 
                    to="/services" 
                    className="bg-orange-500 hover:bg-orange-600 px-10 py-6 rounded-3xl text-xl font-bold flex items-center gap-3 transition"
                  >
                    Voir nos services <ArrowRight />
                  </Link>
                  <a 
                    href="https://wa.me/243971234567" 
                    className="border-2 border-white px-10 py-6 rounded-3xl text-xl font-bold hover:bg-white hover:text-[#0F172A] transition"
                  >
                    Nous contacter
                  </a>
                </div>
              </div>

              {/* Image à droite */}
              <div className="relative">
                <img 
                  src="https://picsum.photos/id/1015/800/650" 
                  alt="Omedev" 
                  className="rounded-3xl shadow-2xl w-full" 
                />
              </div>
            </div>
          </div>
        } />

        {/* Autres pages (fond clair pour que le texte soit visible) */}
        <Route path="/services" element={<div className="min-h-screen bg-gray-50 py-20"><h1 className="text-5xl text-center text-black">Page Services</h1></div>} />
        <Route path="/apropos" element={<div className="min-h-screen bg-gray-50 py-20"><h1 className="text-5xl text-center text-black">À propos</h1></div>} />
        <Route path="/contact" element={<div className="min-h-screen bg-gray-50 py-20"><h1 className="text-5xl text-center text-black">Contact</h1></div>} />
      </Routes>

      <footer className="bg-[#0F172A] text-white py-12 text-center">
        © 2026 Omedev Services - RDC
      </footer>
    </>
  );
}

export default App;