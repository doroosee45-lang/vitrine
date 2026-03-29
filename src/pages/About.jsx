// src/pages/About.jsx
export default function About() {
  return (
    <div className="min-h-screen bg-gray-50 py-24">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-5xl font-bold text-center mb-12 text-[#0F172A]">
          À propos d’Omedev Services
        </h1>
        
        <div className="max-w-3xl mx-auto text-lg text-gray-700 leading-relaxed space-y-8">
          <p>
            Omedev Services est une entreprise spécialisée dans la digitalisation des PME en RDC et en Afrique.
            Nous accompagnons les boutiques, pharmacies, restaurants, écoles et entreprises dans leur transformation numérique.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div className="bg-white p-8 rounded-3xl shadow">
              <h3 className="font-semibold text-xl mb-3">Notre Vision</h3>
              <p>Être la référence de la digitalisation en Afrique Centrale.</p>
            </div>
            <div className="bg-white p-8 rounded-3xl shadow">
              <h3 className="font-semibold text-xl mb-3">Notre Mission</h3>
              <p>Rendre les technologies accessibles et rentables pour toutes les PME.</p>
            </div>
            <div className="bg-white p-8 rounded-3xl shadow">
              <h3 className="font-semibold text-xl mb-3">Nos Valeurs</h3>
              <p>Innovation • Sécurité • Proximité • Excellence</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}