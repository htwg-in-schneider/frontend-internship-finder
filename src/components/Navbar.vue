<script setup>
import UserMenu from './UserMenu.vue'

const baseUrl = import.meta.env.BASE_URL
</script>

<template>
    <nav class="navbar navbar-custom sticky-top py-1">
        <div class="container">
            <router-link class="navbar-brand" to="/">
                <img :src="`${baseUrl}internship-finder-logo.png`" alt="Internship Finder Logo" height="64">
            </router-link>

            <!-- Profil-Dropdown - immer sichtbar -->
            <div class="ms-auto">
                <UserMenu />
            </div>
        </div>
    </nav>
</template>

<style scoped>
</style>