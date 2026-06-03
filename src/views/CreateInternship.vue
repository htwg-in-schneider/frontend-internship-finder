<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuth0 } from '@auth0/auth0-vue';
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';
import Button from '@/components/Button.vue';
import { useToastStore } from '@/stores/toast';

const router = useRouter();
const toast = useToastStore();
const { getAccessTokenSilently } = useAuth0();
const url = 'http://localhost:8081/api/internship';
const categoryUrl = 'http://localhost:8081/api/category';

const internship = ref({
  title: '',
  description: '',
  company: '',
  location: '',
  category: '',
  salary: 0,
  duration: 0,
  logoUrl: '',
});
const categories = ref([]);
const translations = ref({});

async function createInternship() {
  try {
    const token = await getAccessTokenSilently();
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(internship.value),
    });
    if (!response.ok) {
      throw new Error(`Fehler beim Erstellen: ${response.status}`);
    }
    router.push('/');
    toast.success('Praktikum erfolgreich erstellt!');
  } catch (error) {
    console.error('Fehler beim Erstellen des Praktikums:', error);
    toast.error('Praktikum konnte nicht erstellt werden.');
  }
}

onMounted(async () => {
  await Promise.all([fetchCategories(), fetchTranslations()]);
});

async function fetchCategories() {
  try {
    const response = await fetch(categoryUrl);
    if (response.ok) {
      categories.value = await response.json();
    }
  } catch (error) {
    console.error('Error fetching categories:', error);
  }
}

async function fetchTranslations() {
  try {
    const response = await fetch(`${categoryUrl}/translation`);
    if (response.ok) {
      translations.value = await response.json();
    }
  } catch (error) {
    console.error('Error fetching translations:', error);
  }
}
</script>

<template>
  <Navbar />
  <div class="container py-5" style="max-width: 600px;">
    <h2 class="fw-bold mb-4">Neues Praktikum erstellen</h2>
    <form @submit.prevent="createInternship">
      <div class="mb-3">
        <label for="title" class="form-label">Titel</label>
        <input type="text" id="title" class="form-control" v-model="internship.title" />
      </div>
      <div class="mb-3">
        <label for="company" class="form-label">Unternehmen</label>
        <input type="text" id="company" class="form-control" v-model="internship.company" />
      </div>
      <div class="mb-3">
        <label for="location" class="form-label">Standort</label>
        <input type="text" id="location" class="form-control" v-model="internship.location" />
      </div>
      <div class="mb-3">
        <label for="category" class="form-label">Bereich</label>
        <select id="category" class="form-select" v-model="internship.category">
          <option value="">Bitte wählen</option>
          <option v-for="category in categories" :key="category" :value="category">
            {{ translations[category] || category }}
          </option>
        </select>
      </div>
      <div class="mb-3">
        <label for="salary" class="form-label">Vergütung (€/Monat)</label>
        <input type="number" id="salary" class="form-control" v-model="internship.salary" />
      </div>
      <div class="mb-3">
        <label for="duration" class="form-label">Dauer (Monate)</label>
        <input type="number" id="duration" class="form-control" v-model="internship.duration" />
      </div>
      <div class="mb-3">
        <label for="logoUrl" class="form-label">Logo-URL</label>
        <input type="text" id="logoUrl" class="form-control" v-model="internship.logoUrl" />
      </div>
      <div class="mb-3">
        <label for="description" class="form-label">Beschreibung</label>
        <textarea id="description" class="form-control" v-model="internship.description"></textarea>
      </div>
      <Button type="submit" variant="accent">Erstellen</Button>
    </form>
  </div>
  <Footer />
</template>

<style scoped></style>