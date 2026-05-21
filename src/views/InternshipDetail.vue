<script setup>
import SpecialBanner from '@/components/SpecialBanner.vue';
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';
import NavButton from '@/components/NavButton.vue';
import Button from '@/components/Button.vue';
import InternshipReviews from '@/components/InternshipReviews.vue';

import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const url = 'http://localhost:8081/api/internship';
const route = useRoute();
const internship = ref(null);
onMounted(async () => fetchInternship());

async function fetchInternship() {
  try {
    const response = await fetch(`${url}/${route.params.id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    internship.value = await response.json();
    console.log(internship.value);
  } catch (error) {
    console.error('Error fetching internship:', error);
  }
}
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

        <!-- Bewertungen (1:n Internship -> Reviews) -->
        <div v-if="internship">
            <InternshipReviews :internshipId="internship.id" />
        </div>
        <div v-else class="text-center">
            <p>Praktikum wurde nicht gefunden.</p>
            <NavButton variant="secondary" to="/">Zurück</NavButton>
        </div>
    </section>

    <Footer />
</template>

<style scoped></style>