<script setup>
import Button from '@/components/Button.vue';

defineProps({
    internship: {
        type: Object,
        required: true,
    }
});

function showAlert(description) {
    alert(description);
}
</script>

<template>
    <div class="card card-internship h-100 p-3">
        <h5 class="card-title fw-bold mb-1">{{ internship.title }}</h5>
        <p class="text-secondary mb-3 small">{{ internship.company }} · {{ internship.location }}</p>
        <div class="card-logo-area mb-3">
            <img :src="internship.logoUrl" :alt="internship.company + ' Logo'">
        </div>
        <p class="card-text text-secondary">{{ internship.description }}</p>
        <Button variant="accent" class="mt-auto align-self-start" :onClick="() => showAlert(internship.description)">
            Details
        </Button>
    </div>
</template>

<style scoped>
</style>