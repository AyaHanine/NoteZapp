<template>
  <div class="min-h-screen bg-copper-50 flex flex-col">
    <!-- HERO -->
    <section
      class="flex-1 flex flex-col md:flex-row items-center justify-between px-8 sm:px-20 py-14 max-w-7xl mx-auto w-full"
    >
      <div class="flex-1 flex flex-col items-start max-w-xl">
        <h1 class="text-4xl sm:text-5xl font-extrabold mb-5 text-copper-900 tracking-tight">
          Prendre des notes n’a jamais été aussi <span class="text-copper-400">simple</span>.
        </h1>
        <p class="text-lg text-copper-800 mb-8">
          NoteZapp vous aide à planifier, organiser et retrouver toutes vos idées en un clin
          d’œil.<br />
          Professionnel, moderne, efficace.
        </p>

        <!-- 🔁 Bouton redirige en fonction de la connexion -->
        <button
          @click="goToStart"
          class="bg-copper-500 hover:bg-copper-600 text-white px-8 py-3 rounded shadow font-bold text-base transition mb-6"
        >
          Commencer gratuitement
        </button>

        <div class="flex gap-4">
          <span
            v-for="cat in categories"
            :key="cat"
            class="bg-copper-100 text-copper-700 font-semibold px-3 py-1 rounded text-xs uppercase tracking-wider shadow"
          >
            {{ cat }}
          </span>
        </div>
      </div>
    </section>

    <!-- VALEURS CLÉS -->
    <section id="features" class="bg-white py-16 px-4">
      <div class="max-w-6xl mx-auto">
        <h2 class="text-3xl font-black text-copper-900 text-center mb-12">
          Pourquoi choisir NoteZapp ?
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div
            class="bg-copper-900 rounded-lg p-7 shadow flex flex-col items-center text-center text-white"
          >
            <svg
              class="w-10 h-10 mb-4 text-copper-400"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M9 9h.01M15 9h.01M8 13c1.5 2 6.5 2 8 0" />
            </svg>
            <h3 class="text-xl font-bold mb-3">Simplicité</h3>
            <p>
              Une interface limpide pour une prise de notes immédiate et naturelle, accessible à
              tous.
            </p>
          </div>
          <div
            class="bg-copper-900 rounded-lg p-7 shadow flex flex-col items-center text-center text-white"
          >
            <svg
              class="w-10 h-10 mb-4 text-copper-400"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              viewBox="0 0 24 24"
            >
              <rect x="3" y="4" width="18" height="16" rx="3" />
              <path d="M16 2v4" />
            </svg>
            <h3 class="text-xl font-bold mb-3">Fiabilité</h3>
            <p>
              Vos notes sont sauvegardées et retrouvables facilement, grâce à la recherche
              intelligente et la synchronisation.
            </p>
          </div>
          <div
            class="bg-copper-900 rounded-lg p-7 shadow flex flex-col items-center text-center text-white"
          >
            <svg
              class="w-10 h-10 mb-4 text-copper-400"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              viewBox="0 0 24 24"
            >
              <rect x="5" y="5" width="14" height="14" rx="3" />
              <path d="M9 9h6M9 13h6" />
              <path d="M9 17h6" />
            </svg>
            <h3 class="text-xl font-bold mb-3">Personnalisation</h3>
            <p>Catégories, favoris, planification : adaptez NoteZapp à votre mode de travail.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- SERVICES / CATÉGORIES -->
    <section class="bg-copper-50 py-14 px-4">
      <div class="max-w-6xl mx-auto">
        <h2 class="text-2xl font-bold text-copper-900 mb-8">Les catégories à votre service</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-7">
          <div
            v-for="cat in details"
            :key="cat.title"
            class="bg-white border border-copper-100 rounded-lg p-6 flex flex-col gap-3 shadow"
          >
            <div class="flex items-center gap-2 mb-2">
              <span class="text-copper-500 text-2xl">{{ cat.icon }}</span>
              <span class="font-bold text-copper-800 text-base">{{ cat.title }}</span>
            </div>
            <span class="text-copper-700/90 text-sm">{{ cat.desc }}</span>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'

const router = useRouter()
const userStore = useUserStore()

// Redirige vers /user-home si connecté, sinon /login
const goToStart = () => {
  if (userStore.user) {
    router.push('/user-home')
  } else {
    router.push('/login')
  }
}

const categories = ['Planner', 'TaskList', 'Thoughts', 'Journal', 'ClassNotes', 'Documents']

const details = [
  {
    icon: '📅',
    title: 'Planner',
    desc: 'Organisez toutes vos journées et vos deadlines, visuellement.',
  },
  {
    icon: '✅',
    title: 'TaskList',
    desc: 'Gérez vos tâches, cochez et triez, gardez tout sous contrôle.',
  },
  {
    icon: '💡',
    title: 'Thoughts',
    desc: 'Notez vos idées et inspirations à la volée, pour ne rien oublier.',
  },
  {
    icon: '📔',
    title: 'Journal',
    desc: 'Rédigez un journal quotidien pour suivre votre évolution.',
  },
  {
    icon: '📝',
    title: 'ClassNotes',
    desc: 'Prenez des notes structurées pendant vos cours ou réunions.',
  },
  {
    icon: '📄',
    title: 'Documents',
    desc: 'Stockez et retrouvez tous vos documents essentiels en un clic.',
  },
]
</script>
