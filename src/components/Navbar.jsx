import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-[#0F172A] text-white sticky top-0 z-50 shadow-2xl">
      <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-orange-500 rounded-3xl flex items-center justify-center text-4xl">🧬</div>
          <div className="text-3xl font-bold tracking-tighter">Omedev <span className="text-orange-500">Services</span></div>
        </Link>

        <div className="hidden md:flex gap-8 text-lg font-medium">
          <Link to="/" className="hover:text-orange-400 transition">Accueil</Link>
          <Link to="/services" className="hover:text-orange-400 transition">Services</Link>
          <Link to="/solutions" className="hover:text-orange-400 transition">Solutions</Link>
          <Link to="/realisations" className="hover:text-orange-400 transition">Réalisations</Link>
          <Link to="/apropos" className="hover:text-orange-400 transition">À propos</Link>
          <Link to="/contact" className="hover:text-orange-400 transition">Contact</Link>
        </div>

        <a href="https://wa.me/243971234567" target="_blank" className="hidden md:flex items-center gap-3 bg-orange-500 hover:bg-orange-600 px-7 py-3.5 rounded-3xl font-semibold transition">
          <Phone size={20} /> WhatsApp
        </a>

        <button onClick={() => setOpen(!open)} className="md:hidden text-4xl">
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-[#0F172A] px-6 py-8 flex flex-col gap-6 text-lg border-t border-white/10">
          <Link to="/" onClick={() => setOpen(false)}>Accueil</Link>
          <Link to="/services" onClick={() => setOpen(false)}>Services</Link>
          <Link to="/solutions" onClick={() => setOpen(false)}>Solutions</Link>
          <Link to="/realisations" onClick={() => setOpen(false)}>Réalisations</Link>
          <Link to="/apropos" onClick={() => setOpen(false)}>À propos</Link>
          <Link to="/contact" onClick={() => setOpen(false)}>Contact</Link>
        </div>
      )}
    </nav>
  );
}