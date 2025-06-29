<template>
  <div class="min-h-screen flex items-center justify-center bg-copper-50 px-4">
    <div class="w-full max-w-md bg-white p-8 rounded shadow">
      <h1 class="text-2xl font-bold text-copper-800 mb-6 text-center">Créer un compte</h1>

      <form @submit.prevent="handleRegister" class="space-y-4">
        <!-- Nom et prénom -->
        <div class="flex gap-3">
          <input
            v-model="lastName"
            type="text"
            placeholder="Nom"
            class="w-1/2 border border-copper-200 rounded px-4 py-2"
            required
          />
          <input
            v-model="firstName"
            type="text"
            placeholder="Prénom"
            class="w-1/2 border border-copper-200 rounded px-4 py-2"
            required
          />
        </div>

        <!-- Email -->
        <input
          v-model="email"
          type="email"
          placeholder="Adresse email"
          class="w-full border border-copper-200 rounded px-4 py-2"
          required
        />

        <!-- Mot de passe -->
        <input
          v-model="password"
          type="password"
          placeholder="Mot de passe"
          class="w-full border border-copper-200 rounded px-4 py-2"
          required
        />

        <!-- Confirmation -->
        <input
          v-model="confirmPassword"
          type="password"
          placeholder="Confirmer le mot de passe"
          class="w-full border border-copper-200 rounded px-4 py-2"
          required
        />

        <!-- Aide visuelle -->
        <p v-if="!isValidForm" class="text-sm text-red-500 text-center">
          Vérifie que tous les champs sont valides (mot de passe ≥ 6 caractères, emails valides,
          etc).
        </p>

        <!-- Bouton -->
        <button
          type="submit"
          :disabled="!isValidForm"
          class="w-full bg-copper-400 text-white font-bold py-2 rounded disabled:opacity-50"
        >
          Créer mon compte
        </button>

        <!-- Message d'erreur -->
        <p v-if="errorMessage" class="text-red-500 text-sm text-center mt-2">
          {{ errorMessage }}
        </p>

        <!-- Lien vers login -->
        <p class="text-center text-sm text-copper-600">
          Déjà un compte ?
          <router-link to="/login" class="text-copper-500 hover:underline"
            >Se connecter</router-link
          >
        </p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'

const router = useRouter()
const store = useUserStore()

const lastName = ref('')
const firstName = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const errorMessage = ref('')

const isValidForm = computed(() => {
  return (
    lastName.value.trim() !== '' &&
    firstName.value.trim() !== '' &&
    email.value.includes('@') &&
    password.value.length >= 6 &&
    password.value === confirmPassword.value
  )
})

const handleRegister = async () => {
  errorMessage.value = ''
  try {
    await store.register({
      username: `${firstName.value} ${lastName.value}`,
      email: email.value,
      password: password.value,
    })
    router.push('/user-home')
  } catch (error) {
    errorMessage.value = error.message
  }
}
</script>
