    <template>
  <div class="relative min-h-screen flex flex-col bg-gradient-to-br from-emerald-50 via-green-50 to-yellow-50 overflow-x-hidden">
   
    <!-- HERO -->
    <section class="flex-1 flex flex-col md:flex-row items-center justify-between px-8 sm:px-16 py-12 sm:py-24 max-w-7xl mx-auto w-full">
      <div class="flex-1 flex flex-col items-start max-w-xl">
        <h1 class="text-4xl sm:text-6xl font-extrabold leading-tight mb-7 text-emerald-800 drop-shadow-xl">
          Organisez votre vie,<br />
          <span class="text-amber-500">sans effort</span>.
        </h1>
        <p class="text-xl text-gray-700 mb-8">
          NoteZapp c’est votre outil tout-en-un pour planifier, gérer vos tâches et classer vos notes selon vos envies.
          Profitez d’une expérience moderne, fluide et entièrement personnalisable.
        </p>
        <button @click="goToHome"
          class="px-8 py-4 bg-emerald-500 hover:bg-emerald-600 transition-colors text-white text-lg font-bold rounded-full shadow-xl flex items-center gap-2">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
          Commencer gratuitement
        </button>
        <!-- Rappel visuel des catégories -->
        <div class="flex flex-wrap gap-3 mt-6 justify-center">
          <span class="bg-emerald-100 text-emerald-700 font-semibold px-4 py-1 rounded-full text-sm">Planner</span>
          <span class="bg-amber-100 text-amber-700 font-semibold px-4 py-1 rounded-full text-sm">TaskList</span>
          <span class="bg-yellow-100 text-yellow-700 font-semibold px-4 py-1 rounded-full text-sm">Thoughts</span>
          <span class="bg-emerald-100 text-emerald-700 font-semibold px-4 py-1 rounded-full text-sm">Journal</span>
          <span class="bg-blue-100 text-blue-700 font-semibold px-4 py-1 rounded-full text-sm">ClassNotes</span>
          <span class="bg-gray-100 text-gray-700 font-semibold px-4 py-1 rounded-full text-sm">Documents</span>
        </div>
      </div>
      <div class="flex-1 flex items-center justify-center mt-10 md:mt-0">
        <!-- Illustration moderne -->
        <svg class="w-[420px] h-[280px] hidden sm:block" viewBox="0 0 420 280" fill="none">
          <rect x="30" y="50" width="360" height="170" rx="36" fill="#ecfdf5"/>
          <rect x="55" y="90" width="150" height="18" rx="7" fill="#bbf7d0"/>
          <rect x="55" y="130" width="240" height="14" rx="7" fill="#a7f3d0"/>
          <rect x="55" y="165" width="80" height="14" rx="7" fill="#fef08a"/>
          <circle cx="340" cy="110" r="16" fill="#fde68a"/>
          <circle cx="360" cy="180" r="12" fill="#fbbf24"/>
          <ellipse cx="200" cy="200" rx="24" ry="10" fill="#d1fae5"/>
        </svg>
      </div>
    </section>

    <!-- FONCTIONNALITÉS -->
    <section id="features" class="max-w-6xl mx-auto w-full py-20 px-4">
      <h2 class="text-3xl sm:text-4xl font-extrabold text-emerald-800 text-center mb-12">
        Bien plus qu’une appli de notes
      </h2>
      <div class="grid md:grid-cols-3 gap-10">
        <!-- Planner -->
        <div class="bg-white rounded-2xl shadow p-8 flex flex-col items-center border-t-4 border-emerald-400 hover:shadow-lg transition">
          <svg class="w-12 h-12 text-amber-400 mb-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <rect x="3" y="4" width="18" height="16" rx="2"/><path d="M16 2v4"/>
          </svg>
          <h3 class="text-xl font-bold mb-3 text-emerald-700">Planner</h3>
          <p class="text-gray-600 text-center">
            Planifiez vos journées, semaines ou projets. Un agenda visuel intégré pour ne rien oublier.
          </p>
        </div>
        <!-- TaskList -->
        <div class="bg-white rounded-2xl shadow p-8 flex flex-col items-center border-t-4 border-amber-400 hover:shadow-lg transition">
          <svg class="w-12 h-12 text-emerald-400 mb-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <rect x="5" y="5" width="14" height="14" rx="3"/>
            <path d="M9 9h6M9 13h6"/>
            <path d="M9 17h6"/>
          </svg>
          <h3 class="text-xl font-bold mb-3 text-emerald-700">TaskList</h3>
          <p class="text-gray-600 text-center">
            Gérez vos tâches et to-do lists dans une interface claire. Cochez, classez, priorisez facilement.
          </p>
        </div>
        <!-- Catégories personnalisées -->
        <div class="bg-white rounded-2xl shadow p-8 flex flex-col items-center border-t-4 border-yellow-400 hover:shadow-lg transition">
          <svg class="w-12 h-12 text-yellow-400 mb-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10"/>
            <path d="M9 9h.01M15 9h.01M8 13c1.5 2 6.5 2 8 0"/>
          </svg>
          <h3 class="text-xl font-bold mb-3 text-emerald-700">Catégories de notes</h3>
          <p class="text-gray-600 text-center">
            Organisez toutes vos notes dans des catégories intelligentes&nbsp;:
            <span class="font-semibold text-emerald-600">Thoughts</span>,
            <span class="font-semibold text-emerald-600">Journal</span>,
            <span class="font-semibold text-emerald-600">ClassNotes</span>,
            <span class="font-semibold text-emerald-600">Documents</span>.
          </p>
        </div>
      </div>
    </section>

    <!-- À PROPOS -->
    <section id="about" class="bg-gradient-to-t from-emerald-50 to-white py-20 px-4 mt-8">
      <div class="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-12">
        <div class="flex-1">
          <h2 class="text-3xl sm:text-4xl font-extrabold text-emerald-800 mb-6">NoteZapp, votre assistant quotidien</h2>
          <p class="text-lg text-gray-700 mb-6">
            NoteZapp réunit le meilleur de la prise de notes, du planning et de la gestion de tâches.<br>
            Que vous ayez besoin d’un planner, d’une tasklist, d’un carnet d’idées (<span class="text-emerald-600 font-bold">Thoughts</span>), d’un <span class="text-emerald-600 font-bold">Journal</span>, de <span class="text-emerald-600 font-bold">ClassNotes</span> ou de <span class="text-emerald-600 font-bold">Documents</span>, tout est pensé pour s’adapter à votre façon de travailler.
          </p>
          <ul class="space-y-3 text-gray-700">
            <li class="flex items-center">
              <span class="inline-block w-2 h-2 rounded-full bg-emerald-400 mr-2"></span>
              Prise de notes et organisation ultra-rapides
            </li>
            <li class="flex items-center">
              <span class="inline-block w-2 h-2 rounded-full bg-amber-400 mr-2"></span>
              Vue planner intégrée pour planifier ses journées/semaine
            </li>
            <li class="flex items-center">
              <span class="inline-block w-2 h-2 rounded-full bg-blue-400 mr-2"></span>
              Catégorisation et recherche intelligente
            </li>
            <li class="flex items-center">
              <span class="inline-block w-2 h-2 rounded-full bg-yellow-400 mr-2"></span>
              100 % responsive, sécurisé, prêt à l’emploi
            </li>
          </ul>
        </div>
        <div class="flex-1 flex justify-center">
          <!-- Illustration moderne (peut être remplacée par une image) -->
          <svg width="260" height="220" viewBox="0 0 320 220" fill="none">
            <ellipse cx="160" cy="110" rx="130" ry="80" fill="#bbf7d0"/>
            <rect x="30" y="50" width="210" height="120" rx="28" fill="#fff"/>
            <rect x="60" y="90" width="130" height="14" rx="7" fill="#10b981"/>
            <rect x="60" y="125" width="170" height="10" rx="7" fill="#a7f3d0"/>
            <rect x="60" y="155" width="80" height="10" rx="7" fill="#fef08a"/>
            <circle cx="220" cy="110" r="16" fill="#fbbf24"/>
          </svg>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
const goToHome = () => {
  router.push('/home')
}
</script>
