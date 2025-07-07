<template>
  <div class="min-h-screen bg-copper-50 p-8">
    <div class="max-w-2xl mx-auto bg-white shadow-lg rounded-xl p-6">
      <h1 class="text-2xl font-bold mb-6 text-copper-800">Mon Profil</h1>

      <div class="space-y-4">
        <div>
          <label class="block text-sm font-semibold text-gray-600">Nom d'utilisateur</label>
          <input v-model="username" class="w-full mt-1 border rounded px-3 py-2" disabled />
        </div>

        <div>
          <label class="block text-sm font-semibold text-gray-600">Email</label>
          <input v-model="email" class="w-full mt-1 border rounded px-3 py-2" />
        </div>

        <div>
          <label class="block text-sm font-semibold text-gray-600">Mot de passe actuel</label>
          <input v-model="currentPassword" type="password" class="w-full mt-1 border rounded px-3 py-2" />
        </div>

        <div>
          <label class="block text-sm font-semibold text-gray-600">Nouveau mot de passe</label>
          <input v-model="newPassword" type="password" class="w-full mt-1 border rounded px-3 py-2" />
        </div>

        <div class="flex justify-between mt-6">
          <button @click="updateProfile" class="bg-copper-600 hover:bg-copper-700 text-white px-4 py-2 rounded">
            Enregistrer
          </button>
          <button @click="deleteAccount" class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">
            Supprimer mon compte
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'
import axios from 'axios'

const userStore = useUserStore()
const router = useRouter()

const username = ref(userStore.user?.username || '')
const email = ref(userStore.user?.email || '')
const currentPassword = ref('')
const newPassword = ref('')

// 🛠 À implémenter avec l'authentification réelle
const updateProfile = async () => {
  try {
    const response = await axios.put(`http://localhost:3001/users/${userStore.user.id}`, {
      ...userStore.user,
      email: email.value,
      password: newPassword.value || userStore.user.password,
    })
    alert("Profil mis à jour avec succès")
    // Mettre à jour localement aussi
    userStore.user.email = email.value
  } catch (err) {
    console.error(err)
    alert("Erreur lors de la mise à jour")
  }
}

const deleteAccount = async () => {
  if (confirm('Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.')) {
    try {
      await axios.delete(`http://localhost:3001/users/${userStore.user.id}`)
      alert("Compte supprimé")
      userStore.logout()
      router.push('/')
    } catch (err) {
      console.error(err)
      alert("Erreur lors de la suppression")
    }
  }
}
</script>
