<script setup>
import NavButton from '@/components/NavButton.vue';

defineProps({
    internship: {
        type: Object,
        required: true,
    }
});

function onImgError(e) {
    e.target.src = 'https://placehold.co/300x150?text=Logo';
}
</script>

<template>
    <div class="card card-internship h-100 p-3">
        <h5 class="card-title fw-bold mb-1">{{ internship.title }}</h5>
        <p class="text-secondary mb-3 small">{{ internship.company }} · {{ internship.location }}</p>
        <div class="card-logo-area mb-3">
            <img :src="internship.logoUrl" :alt="internship.company + ' Logo'" @error="onImgError">
        </div>
        <p class="card-text text-secondary">{{ internship.description }}</p>
        <div class="mt-auto d-flex gap-2">
            <NavButton variant="accent" :to="`/internship/view/${internship.id}`">
                Details
            </NavButton>
            <NavButton variant="secondary" :to="`/internship/edit/${internship.id}`">
                Bearbeiten
            </NavButton>
        </div>
    </div>
</template>

<style scoped></style>