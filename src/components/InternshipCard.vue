<script setup>
import { useAuth0 } from '@auth0/auth0-vue';
import NavButton from '@/components/NavButton.vue';

const { loginWithRedirect } = useAuth0();

function handleLogin() {
    loginWithRedirect();
}

defineProps({
    internship: {
        type: Object,
        required: true,
    },
    showEditButton: {
        type: Boolean,
        default: false,
    },
    showDetailsButton: {
        type: Boolean,
        default: false,
    },
});

function onImgError(e) {
    e.target.src = 'https://placehold.co/300x150?text=Logo';
}

function resolveLogo(url) {
    if (!url) return '';
    if (/^https?:\/\//.test(url)) return url;
    return import.meta.env.BASE_URL + url.replace(/^\//, '');
}
</script>

<template>
    <div class="card card-internship h-100 p-3">
        <h5 class="card-title fw-bold mb-1">{{ internship.title }}</h5>
        <p class="text-secondary mb-3 small">{{ internship.company }} · {{ internship.location }}</p>
        <div class="card-logo-area mb-3">
            <img :src="resolveLogo(internship.logoUrl)" :alt="internship.company + ' Logo'" @error="onImgError">
        </div>
        <p class="card-text text-secondary">{{ internship.description }}</p>
        <div class="mt-auto d-flex gap-2">
            <NavButton v-if="showDetailsButton" variant="accent" :to="`/internship/view/${internship.id}`">
                Details
            </NavButton>
            <button v-if="!showDetailsButton" class="btn btn-accent" type="button" @click="handleLogin">
                Für Details anmelden
            </button>
            <NavButton v-if="showEditButton" variant="secondary" :to="`/internship/edit/${internship.id}`">
                Bearbeiten
            </NavButton>
        </div>
    </div>
</template>

<style scoped></style>