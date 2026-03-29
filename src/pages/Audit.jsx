// src/pages/Audit.jsx
export default function Audit() {
  return (
    <div className="min-h-screen bg-gray-50 py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-[#0F172A]">Audit Gratuit de votre Système</h1>
          <p className="text-2xl text-gray-600 mt-4">Nous analysons gratuitement votre infrastructure actuelle</p>
        </div>

        <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl p-12">
          <h2 className="text-3xl font-semibold mb-8">Que contient l’audit gratuit ?</h2>
          
          <div className="space-y-8">
            <div className="flex gap-6">
              <div className="text-green-500 mt-1">✔️</div>
              <div>
                <h3 className="font-semibold text-xl">Analyse de vos processus actuels</h3>
                <p className="text-gray-600">Stock, facturation, gestion clients, etc.</p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="text-green-500 mt-1">✔️</div>
              <div>
                <h3 className="font-semibold text-xl">Identification des pertes</h3>
                <p className="text-gray-600">Erreurs, vols, temps perdu</p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="text-green-500 mt-1">✔️</div>
              <div>
                <h3 className="font-semibold text-xl">Recommandations personnalisées</h3>
                <p className="text-gray-600">Solutions adaptées à votre budget</p>
              </div>
            </div>
          </div>

          <a 
            href="https://wa.me/243971234567?text=Bonjour,%20je%20veux%20mon%20audit%20gratuit"
            className="block mt-12 bg-orange-500 text-white text-center py-7 rounded-3xl text-xl font-bold hover:bg-orange-600 transition"
          >
            Demander mon audit gratuit maintenant
          </a>
        </div>
      </div>
    </div>
  );
}