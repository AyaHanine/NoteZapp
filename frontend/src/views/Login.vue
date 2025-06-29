<template>
  <div class="login-container">
    <h2>Connexion</h2>
    <form @submit.prevent="handleLogin">
      <label for="email">Email :</label>
      <input type="email" id="email" v-model="email" required />

      <label for="password">Mot de passe :</label>
      <input type="password" id="password" v-model="password" required />

      <button type="submit">Se connecter</button>
    </form>

    <p v-if="errorMessage" class="error-message">
      {{ errorMessage }}
    </p>

    <p class="switch-link">
      Pas encore de compte ?
      <router-link to="/register">Créer un compte</router-link>
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'

const email = ref('')
const password = ref('')
const errorMessage = ref('')
const router = useRouter()
const userStore = useUserStore()

const handleLogin = async () => {
  errorMessage.value = ''
  try {
    await userStore.login({
      email: email.value,
      password: password.value,
    })
    router.push('/user-home')
  } catch (error) {
    errorMessage.value = error.message
  }
}
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 50px auto;
  padding: 2rem;
  border-radius: 10px;
  background-color: #f8f5ee;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
  color: #321c16;
}

h2 {
  color: #58362b;
  margin-bottom: 1.5rem;
  text-align: center;
}

label {
  font-weight: bold;
  color: #663e2d;
}

input {
  display: block;
  width: 100%;
  margin-bottom: 1rem;
  padding: 0.6rem;
  border: 1px solid #cdab77;
  border-radius: 5px;
  background-color: #fff;
}

button {
  width: 100%;
  padding: 0.8rem;
  background-color: #aa7942;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

button:hover {
  background-color: #966338;
}

.switch-link {
  margin-top: 1rem;
  text-align: center;
  font-size: 0.9rem;
}

.error-message {
  color: red;
  text-align: center;
  margin-top: 1rem;
}
</style>
