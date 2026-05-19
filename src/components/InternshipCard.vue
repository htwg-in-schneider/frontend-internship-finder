<script setup>
import NavButton from '@/components/NavButton.vue';

defineProps({
    internship: {
        type: Object,
        required: true,
    }
});
</script>

<template>
    <div class="card card-internship h-100 p-3">
        <h5 class="card-title fw-bold mb-1">{{ internship.title }}</h5>
        <p class="text-secondary mb-3 small">{{ internship.company }} · {{ internship.location }}</p>
        <div class="card-logo-area mb-3">
            <img :src="internship.logoUrl" :alt="internship.company + ' Logo'">
        </div>
        <p class="card-text text-secondary">{{ internship.description }}</p>
        <NavButton variant="accent" class="mt-auto align-self-start" :to="`/internship/${internship.id}`">
            Details
        </NavButton>
    </div>
</template>

<style scoped></style>