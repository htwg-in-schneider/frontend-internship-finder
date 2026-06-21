<script setup>
import SpecialBanner from '@/components/SpecialBanner.vue';
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';
import InternshipCard from '@/components/InternshipCard.vue';
import NavButton from '@/components/NavButton.vue';
import InternshipFilter from '@/components/InternshipFilter.vue';
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useAuth0 } from '@auth0/auth0-vue';

const { isAuthenticated, getAccessTokenSilently } = useAuth0();
const isAdmin = ref(false);
const canCreate = ref(false);
const isCompany = ref(false);
const userCompany = ref('');

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const route = useRoute();
const internships = ref([]);

onMounted(async () => {
  fetchInternships({ category: route.query.category });
  checkAdminRole();
});

watch(() => route.query.category, (newCategory) => {
  fetchInternships({ category: newCategory });
  checkAdminRole();
});

watch(isAuthenticated, (newValue) => {
  checkAdminRole();
});

async function checkAdminRole() {
  if (!isAuthenticated.value) {
    return;
  }

  try {
    const token = await getAccessTokenSilently();
    const response = await fetch(`${baseUrl}/api/profile`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (response.ok) {
      const data = await response.json();
      isAdmin.value = data.role === 'ADMIN';
      canCreate.value = data.role === 'ADMIN' || data.role === 'COMPANY';
      isCompany.value = data.role === 'COMPANY';
      userCompany.value = data.company || '';
    }
  } catch (error) {
    console.error('Error checking admin role:', error);
  }
}

async function fetchInternships(filters = {}) {
  try {
    const params = new URLSearchParams();
    if (filters.name) {
      params.append('name', filters.name);
    }
    if (filters.category) {
      params.append('category', filters.category);
    }

    const response = await fetch(`${baseUrl}/api/internship?${params.toString()}`);
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
  <SpecialBanner text="Schließe jetzt die Premium Mitgliedschaft ab 20% reduziert!" />
  <Navbar />

  <!-- Hero (ohne Suchfeld - Suche ist in der Filter-Leiste) -->
  <section class="py-5">
    <div class="container">
      <div class="row align-items-center g-4">
        <div class="col-lg-6">
          <h1 class="brand-font fw-bold mb-2">Finde dein perfektes Praktikum</h1>
          <p class="mb-0 text-secondary">Teile und entdecke Praktika von Studierenden für Studierende.</p>
        </div>
        <div class="col-lg-6">
          <img src="/hero.jpg" alt="Studentin mit Rucksack blickt in den Himmel" class="hero-image">
        </div>
      </div>
    </div>
  </section>

  <!-- Suche + Filter -->
  <section class="py-2">
    <div class="container">
      <InternshipFilter @internship-update="fetchInternships" />
    </div>
  </section>

<!-- Praktikum Grid -->
  <section class="py-4">
    <div class="container">
      <div class="row g-4">
        <div v-for="internship in internships" :key="internship.id" class="col-md-6">
          <InternshipCard :internship="internship"
            :show-edit-button="isAdmin || (isCompany && internship.company === userCompany)"
            :show-details-button="isAuthenticated" />
        </div>
      </div>
      
<!-- Neues Praktikum Button (unter den Praktika, zentriert) -->
      <div class="text-center mt-5" v-if="canCreate">
        <NavButton to="/internship/create" variant="accent">
          <i class="bi bi-plus-lg me-1"></i>Neues Praktikum
        </NavButton>
      </div>
    </div>
  </section>

  <Footer />
</template>

<style scoped></style>