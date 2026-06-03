<script setup>
import UserMenu from './UserMenu.vue'
</script>

<template>
    <nav class="navbar navbar-custom sticky-top py-1">
        <div class="container">
            <router-link class="navbar-brand" to="/">
                <img src="/internship-finder-logo.png" alt="Internship Finder Logo" height="48">
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