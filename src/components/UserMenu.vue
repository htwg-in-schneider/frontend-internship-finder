<script setup>
import { ref, watch, computed } from 'vue'
import { useAuth0 } from '@auth0/auth0-vue'

const { loginWithRedirect, logout, isAuthenticated, isLoading, getAccessTokenSilently, user } = useAuth0()

const canViewApplications = ref(false)
const isAdmin = ref(false)
const isCompany = ref(false)
const pictureUrl = ref('')
const baseUrl = import.meta.env.VITE_API_BASE_URL

const avatarSrc = computed(() => pictureUrl.value || (user.value && user.value.picture) || '')

async function checkRole() {
  if (!isAuthenticated.value) {
    canViewApplications.value = false
    isAdmin.value = false
    isCompany.value = false
    pictureUrl.value = ''
    return
  }
  try {
    const token = await getAccessTokenSilently()
    const response = await fetch(`${baseUrl}/api/profile`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    if (response.ok) {
      const data = await response.json()
      canViewApplications.value = data.role === 'ADMIN' || data.role === 'COMPANY' || data.role === 'PREMIUM'
      isAdmin.value = data.role === 'ADMIN'
      isCompany.value = data.role === 'COMPANY'
      pictureUrl.value = data.pictureUrl || ''
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
  <div v-if="!isLoading" class="dropdown">
    <a class="d-flex align-items-center text-decoration-none" href="#" id="profileDropdown"
      role="button" data-bs-toggle="dropdown" aria-expanded="false">
      <span class="profile-avatar">
        <img v-if="avatarSrc" :src="avatarSrc" alt="Profil" class="avatar-img" />
        <i v-else class="bi bi-person-fill"></i>
      </span>
    </a>
    <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="profileDropdown">
      <template v-if="!isAuthenticated">
        <li><button class="dropdown-item" @click="handleLogin">Anmelden</button></li>
      </template>
      <template v-else>
        <li><router-link class="dropdown-item" to="/profile">Mein Profil</router-link></li>
        <li v-if="isCompany"><router-link class="dropdown-item" to="/meine-praktika">Meine Praktika</router-link></li>
        <li v-if="canViewApplications"><router-link class="dropdown-item" to="/bewerbungen">Bewerbungen</router-link></li>
        <li v-if="isAdmin"><router-link class="dropdown-item" to="/nutzer">Nutzerverwaltung</router-link></li>
        <li><hr class="dropdown-divider"></li>
        <li><button class="dropdown-item" @click="handleLogout">Abmelden</button></li>
      </template>
    </ul>
  </div>
</template>

<style scoped>
.profile-avatar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background-color: rgba(46, 105, 163, 0.25);
  border: 1px solid rgba(45, 81, 118, 0.3);
  color: #0c2744;
  font-size: 1.6rem;
  transition: 0.2s;
  overflow: hidden;
}

.avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.profile-avatar:hover {
  background-color: rgba(30, 184, 204, 0.35);
}
</style>
