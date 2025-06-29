import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
    isLoggedIn: false,
  }),

  actions: {
    async register(userData) {
      try {
        // Vérifier si l'utilisateur existe déjà
        const res = await fetch('http://localhost:3001/users?email=' + userData.email)
        if (!res.ok) {
          const text = await res.text()
          throw new Error(`Erreur lors de la vérification de l'email : ${text}`)
        }

        const existingUsers = await res.json()
        if (existingUsers.length > 0) {
          throw new Error('Cet email est déjà utilisé.')
        }

        // Ajouter le nouvel utilisateur
        const response = await fetch('http://localhost:3001/users', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(userData),
        })

        if (!response.ok) {
          const text = await response.text()
          throw new Error(`Erreur lors de l'enregistrement : ${text}`)
        }

        const newUser = await response.json()
        this.user = newUser
        this.isLoggedIn = true
      } catch (error) {
        throw error
      }
    },

    async login(credentials) {
      try {
        const res = await fetch(`http://localhost:3001/users?email=${credentials.email}`)
        if (!res.ok) {
          const text = await res.text()
          throw new Error(`Erreur serveur : ${text}`)
        }

        const users = await res.json()
        if (users.length === 0) {
          throw new Error('Aucun compte avec cet email.')
        }

        const user = users[0]
        if (user.password !== credentials.password) {
          throw new Error('Mot de passe incorrect.')
        }

        this.user = user
        this.isLoggedIn = true
        return true
      } catch (error) {
        throw error
      }
    },

    logout() {
      this.user = null
      this.isLoggedIn = false
    },
  },

  persist: {
    storage: localStorage,
  },
})
