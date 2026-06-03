<script setup>
import { useAuth0 } from '@auth0/auth0-vue'

const { loginWithRedirect, logout, isAuthenticated, isLoading } = useAuth0()

const handleLogin = () => {
  loginWithRedirect()
}

const handleLogout = () => {
  logout({
    logoutParams: {
      returnTo: window.location.origin
    }
  })
}
</script>

<template>
  <div v-if="!isLoading" class="dropdown">
    <a class="d-flex align-items-center text-decoration-none" href="#" id="profileDropdown"
      role="button" data-bs-toggle="dropdown" aria-expanded="false">
      <span class="profile-avatar">
        <i class="bi bi-person-fill"></i>
      </span>
    </a>
    <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="profileDropdown">
      <template v-if="!isAuthenticated">
        <li><button class="dropdown-item" @click="handleLogin">Anmelden</button></li>
      </template>
      <template v-else>
        <li><router-link class="dropdown-item" to="/profile">Mein Profil</router-link></li>
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
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgba(46, 105, 163, 0.25);
  border: 1px solid rgba(45, 81, 118, 0.3);
  color: #0c2744;
  font-size: 1.2rem;
  transition: 0.2s;
}

.profile-avatar:hover {
  background-color: rgba(30, 184, 204, 0.35);
}
</style>
