<script setup>
import SpecialBanner from '@/components/SpecialBanner.vue';
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';
import InternshipCard from '@/components/InternshipCard.vue';
import { ref, onMounted } from 'vue';

const url = 'http://localhost:8081/api/internship';

const internships = ref([]);
onMounted(async () => fetchInternships());

async function fetchInternships() {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    internships.value = await response.json();
    console.log(internships.value);
  } catch (error) {
    console.error('Error fetching internships:', error);
  }
}
</script>

<template>
  <SpecialBanner text="Neu: Premium-Mitgliedschaft für vertiefte Bewerber-Tipps!" />
  <Navbar />

  <!-- Hero -->
  <section class="py-5">
    <div class="container">
      <div class="row align-items-center g-4">
        <div class="col-lg-6">
          <h1 class="brand-font fw-bold mb-2">Finde dein perfektes Praktikum</h1>
          <p class="mb-4 text-secondary">Teile und entdecke Praktika von Studierenden für Studierende.</p>

          <div class="row g-2 mb-3">
            <div class="col-sm-6">
              <input type="text" class="form-control" placeholder="Ort eingeben">
            </div>
            <div class="col-sm-6">
              <select class="form-select">
                <option selected disabled>Bereich Wählen</option>
                <option>Softwareentwicklung</option>
                <option>Systemengineering</option>
                <option>Data Analyst</option>
                <option>Cyber Security</option>
              </select>
            </div>
          </div>

          <a href="#" class="btn btn-accent">
            <i class="bi bi-house-door me-1"></i>Home
          </a>
        </div>

        <div class="col-lg-6">
          <img src="/hero.jpg" alt="Studentin mit Rucksack blickt in den Himmel" class="hero-image">
        </div>
      </div>
    </div>
  </section>

  <!-- Praktikum Grid -->
  <section class="py-4">
    <div class="container">
      <div class="row g-4">
        <div v-for="internship in internships" :key="internship.id" class="col-md-6">
          <InternshipCard :internship="internship" />
        </div>
      </div>
    </div>
  </section>

  <Footer />
</template>

<style scoped></style>