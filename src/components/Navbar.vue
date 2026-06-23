<script setup>
import UserMenu from './UserMenu.vue'

const baseUrl = import.meta.env.BASE_URL
</script>

<template>
    <nav class="navbar navbar-expand-lg navbar-light navbar-custom sticky-top py-1">
        <div class="container">
            <router-link class="navbar-brand" to="/">
                <img :src="`${baseUrl}internship-finder-logo.png`" alt="Internship Finder Logo" height="64">
            </router-link>

            <div class="d-flex align-items-center order-lg-last">
                <UserMenu class="me-2 me-lg-0" />
                <button class="navbar-toggler ms-2" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span class="navbar-toggler-icon"></span>
                </button>
            </div>

            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-4">
                    <li class="nav-item">
                        <router-link class="nav-link" to="/">Praktika</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/meine-praktika">Meine Praktika</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/bewerbungen">Bewerbungen</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/nutzer">Nutzerverwaltung</router-link>
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
                </ul>
            </div>
        </div>
    </nav>
</template>

<style scoped>
</style>
