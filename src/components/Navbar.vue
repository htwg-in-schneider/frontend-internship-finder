<script setup>
import { ref, watch } from 'vue'
import { useAuth0 } from '@auth0/auth0-vue'
import UserMenu from './UserMenu.vue'

const { isAuthenticated, getAccessTokenSilently, loginWithRedirect, logout } = useAuth0()
const baseUrl = import.meta.env.BASE_URL
const apiUrl = import.meta.env.VITE_API_BASE_URL

const isAdmin = ref(false)
const isCompany = ref(false)
const canViewApplications = ref(false)

async function checkRole() {
  if (!isAuthenticated.value) {
    isAdmin.value = false
    isCompany.value = false
    canViewApplications.value = false
    return
  }
  try {
    const token = await getAccessTokenSilently()
    const response = await fetch(`${apiUrl}/api/profile`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    if (response.ok) {
      const data = await response.json()
      isAdmin.value = data.role === 'ADMIN'
      isCompany.value = data.role === 'COMPANY'
      canViewApplications.value = data.role === 'ADMIN' || data.role === 'COMPANY' || data.role === 'PREMIUM'
    }
  } catch (error) {
    console.error('Error checking role:', error)
  }
}

watch(isAuthenticated, checkRole, { immediate: true })

const handleLogin = () => {
  loginWithRedirect()
}

const handleLogout = () => {
  logout({
    logoutParams: {
      returnTo: window.location.origin + import.meta.env.BASE_URL
    }
  })
}
</script>

<template>
    <nav class="navbar navbar-expand-lg navbar-light navbar-custom sticky-top py-1">
        <div class="container">
            <router-link class="navbar-brand" to="/">
                <img :src="`${baseUrl}internship-finder-logo.png`" alt="Internship Finder Logo" height="64">
            </router-link>

            <div class="d-flex align-items-center order-lg-last">
                <button class="navbar-toggler me-2" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <UserMenu />
            </div>

            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-4">
                    <li class="nav-item">
                        <router-link class="nav-link" to="/">Home</router-link>
                    </li>
                    <li class="nav-item" v-if="isCompany">
                        <router-link class="nav-link" to="/meine-praktika">Stellen</router-link>
                    </li>
                    <li class="nav-item" v-if="canViewApplications">
                        <router-link class="nav-link" to="/bewerbungen">Bewerbungen</router-link>
                    </li>
                    <li class="nav-item" v-if="isAdmin">
                        <router-link class="nav-link" to="/nutzer">Nutzerverwaltung</router-link>
                    </li>
                    <li class="nav-item" v-if="isAuthenticated">
                        <router-link class="nav-link" to="/profile">Profil</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/datenschutz">Datenschutz</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/impressum">Impressum</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/kontakt">Kontakt</router-link>
                    </li>
                    <li class="nav-item" v-if="!isAuthenticated">
                        <button class="nav-link bg-transparent border-0" type="button" @click="handleLogin">Anmelden</button>
                    </li>
                    <li class="nav-item" v-if="isAuthenticated">
                        <button class="nav-link bg-transparent border-0" type="button" @click="handleLogout">Abmelden</button>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<style scoped>
</style>
