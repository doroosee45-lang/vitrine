import { ArrowRight, CheckCircle, Users, Award, Shield } from 'lucide-react';
import Navbar from '../components/Navbar';
// import Footer from '../components/Footer';
// import WhatsAppButton from '../components/WhatsAppButton';

export default function Home() {
  return (
    <>
      <main className="bg-white">
        
        {/* HERO SECTION */}
        <section className="pt-24 pb-16 bg-gradient-to-br from-blue-900 via-blue-800 to-black text-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                  Digitalisez votre entreprise<br />
                  <span className="text-blue-400">avec des solutions modernes</span>
                </h1>
                
                <p className="text-xl text-blue-100 max-w-lg">
                  ERP, Applications web & mobiles, Cybersécurité et Automatisation. 
                  Transformez votre gestion et boostez votre productivité.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <a href="/contact" 
                     className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-2xl font-semibold text-lg flex items-center justify-center gap-3 transition">
                    Demander un devis gratuit
                    <ArrowRight />
                  </a>
                  
                  <a href="https://wa.me/237XXXXXXXX" target="_blank"
                     className="border border-white/50 hover:bg-white/10 px-8 py-4 rounded-2xl font-semibold text-lg flex items-center justify-center gap-3 transition">
                    Parler à un expert
                  </a>
                </div>

                <div className="flex items-center gap-8 text-sm pt-6">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="text-green-400" />
                    <span>Projets livrés en temps record</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="text-green-400" />
                    <span>Sécurité renforcée</span>
                  </div>
                </div>
              </div>

              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800" 
                  alt="Dashboard ERP moderne" 
                  className="rounded-3xl shadow-2xl border border-white/10"
                />
                <div className="absolute -bottom-6 -left-6 bg-white text-black p-6 rounded-2xl shadow-xl">
                  <div className="text-4xl font-bold text-blue-600">+87%</div>
                  <div className="text-sm text-gray-600">d'efficacité moyenne</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PROBLÈMES CLIENTS */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Votre entreprise rencontre-t-elle ces problèmes ?</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Beaucoup d’entreprises en Afrique perdent encore du temps et de l’argent à cause de processus manuels.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                "Gestion manuelle des stocks et des ventes",
                "Perte de données et risques de fraude",
                "Processus lents et manque de visibilité en temps réel",
                "Difficulté à suivre les performances",
                "Problèmes de sécurité des données clients",
                "Coûts élevés de gestion administrative"
              ].map((problem, i) => (
                <div key={i} className="bg-white p-8 rounded-3xl shadow-sm border border-red-100 flex gap-4">
                  <div className="text-red-500 text-4xl">×</div>
                  <p className="text-lg text-gray-700">{problem}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* NOS SOLUTIONS */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Nos Solutions Digitales</h2>
              <p className="text-gray-600">Des outils modernes adaptés aux entreprises africaines</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white border border-gray-200 rounded-3xl p-8 hover:border-blue-500 transition group">
                <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition">
                  📊
                </div>
                <h3 className="text-2xl font-semibold mb-3">ERP & Gestion d’entreprise</h3>
                <p className="text-gray-600 mb-6">Gestion complète : stock, ventes, finances, RH, facturation.</p>
                <a href="/solutions" className="text-blue-600 font-medium flex items-center gap-2">
                  Découvrir → 
                </a>
              </div>

              <div className="bg-white border border-gray-200 rounded-3xl p-8 hover:border-blue-500 transition group">
                <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition">
                  💻
                </div>
                <h3 className="text-2xl font-semibold mb-3">Développement Web & Mobile</h3>
                <p className="text-gray-600 mb-6">Sites vitrines, applications web et mobiles performantes.</p>
                <a href="/services" className="text-blue-600 font-medium flex items-center gap-2">
                  Découvrir → 
                </a>
              </div>

              <div className="bg-white border border-gray-200 rounded-3xl p-8 hover:border-blue-500 transition group">
                <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition">
                  🔐
                </div>
                <h3 className="text-2xl font-semibold mb-3">Cybersécurité</h3>
                <p className="text-gray-600 mb-6">Protection de vos données et de votre système contre les menaces.</p>
                <a href="/services" className="text-blue-600 font-medium flex items-center gap-2">
                  Découvrir → 
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* PREUVE SOCIALE */}
        <section className="py-20 bg-blue-900 text-white">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <div className="flex justify-center gap-12 flex-wrap">
              <div>
                <div className="text-5xl font-bold">15+</div>
                <div className="text-blue-300 mt-2">Entreprises accompagnées</div>
              </div>
              <div>
                <div className="text-5xl font-bold">98%</div>
                <div className="text-blue-300 mt-2">de satisfaction client</div>
              </div>
              <div>
                <div className="text-5xl font-bold">24/7</div>
                <div className="text-blue-300 mt-2">Support technique</div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA FINAL */}
        <section className="py-24 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-center">
          <div className="max-w-3xl mx-auto px-6">
            <h2 className="text-4xl font-bold mb-6">Prêt à transformer votre entreprise ?</h2>
            <p className="text-xl mb-10 text-blue-100">
              Obtenez un audit gratuit de votre système actuel et une proposition adaptée en 48h.
            </p>
            <a href="/contact" 
               className="inline-block bg-white text-blue-700 font-bold text-xl px-12 py-6 rounded-2xl hover:bg-blue-50 transition">
              Commencer ma transformation digitale
            </a>
          </div>
        </section>
      </main>

      {/* <Footer />
      <WhatsAppButton /> */}
    </>
  );
}