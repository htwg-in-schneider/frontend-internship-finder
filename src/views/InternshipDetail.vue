<script setup>
import SpecialBanner from '@/components/SpecialBanner.vue';
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';
import NavButton from '@/components/NavButton.vue';
import Button from '@/components/Button.vue';

import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { internships } from '@/data.js';

const route = useRoute();

const internship = computed(() => {
    return internships.find(i => String(i.id) === String(route.params.id)) || null;
});
</script>

<template>
    <SpecialBanner text="Neu: Premium-Mitgliedschaft für vertiefte Bewerber-Tipps!" />
    <Navbar />

    <section class="container py-5">
        <div v-if="internship" class="row align-items-start g-4">
            <div class="col-md-5">
                <div class="card-logo-area">
                    <img :src="internship.logoUrl" :alt="internship.company + ' Logo'">
                </div>
            </div>
            <div class="col-md-7">
                <h2 class="brand-font fw-bold">{{ internship.title }}</h2>
                <p class="text-accent fw-bold fs-5">{{ internship.company }} · {{ internship.location }}</p>
                <p class="text-secondary">{{ internship.description }}</p>

                <ul class="list-unstyled text-secondary mb-4">
                    <li><strong>Bereich:</strong> {{ internship.category }}</li>
                    <li><strong>Dauer:</strong> {{ internship.duration }} Monate</li>
                    <li><strong>Vergütung:</strong> {{ internship.salary }} €/Monat</li>
                </ul>

                <NavButton variant="secondary" class="me-2" to="/">Zurück</NavButton>
                <Button variant="accent">Jetzt bewerben</Button>
            </div>
        </div>
        <div v-else class="text-center">
            <p>Praktikum wurde nicht gefunden.</p>
            <NavButton variant="secondary" to="/">Zurück</NavButton>
        </div>
    </section>

    <Footer />
</template>

<style scoped></style>