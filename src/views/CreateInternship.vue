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
const url = `${import.meta.env.VITE_API_BASE_URL}/api/internship`;
const categoryUrl = `${import.meta.env.VITE_API_BASE_URL}/api/category`;

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
const companyLocked = ref(false);
const errors = ref({ title: '', company: '', location: '', category: '', salary: '', duration: '' });

function validate() {
  errors.value.title = (internship.value.title || '').trim() ? '' : 'Bitte geben Sie einen Titel an.';
  errors.value.company = (internship.value.company || '').trim() ? '' : 'Bitte geben Sie das Unternehmen an.';
  errors.value.location = (internship.value.location || '').trim() ? '' : 'Bitte geben Sie einen Standort an.';
  errors.value.category = internship.value.category ? '' : 'Bitte wählen Sie einen Bereich.';
  errors.value.salary = Number(internship.value.salary) >= 0 ? '' : 'Bitte geben Sie eine gültige Vergütung an.';
  errors.value.duration = Number(internship.value.duration) > 0 ? '' : 'Bitte geben Sie eine gültige Dauer an.';
  return !errors.value.title && !errors.value.company && !errors.value.location
    && !errors.value.category && !errors.value.salary && !errors.value.duration;
}

async function createInternship() {
  if (!validate()) return;
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
  await Promise.all([fetchCategories(), fetchTranslations(), prefillCompany()]);
});

async function prefillCompany() {
  try {
    const token = await getAccessTokenSilently();
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/profile`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (response.ok) {
      const data = await response.json();
      if (data.role === 'COMPANY' && data.company) {
        internship.value.company = data.company;
        companyLocked.value = true;
      }
    }
  } catch (error) {
    console.error('Error loading profile:', error);
  }
}

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
        <input type="text" id="title" class="form-control" :class="{ 'is-invalid': errors.title }"
          v-model="internship.title" @input="errors.title = ''" />
        <div class="invalid-feedback">{{ errors.title }}</div>
      </div>
      <div class="mb-3">
        <label for="company" class="form-label">Unternehmen</label>
        <input type="text" id="company" class="form-control" :class="{ 'is-invalid': errors.company }"
          v-model="internship.company" :readonly="companyLocked" @input="errors.company = ''" />
        <div class="invalid-feedback">{{ errors.company }}</div>
      </div>
      <div class="mb-3">
        <label for="location" class="form-label">Standort</label>
        <input type="text" id="location" class="form-control" :class="{ 'is-invalid': errors.location }"
          v-model="internship.location" @input="errors.location = ''" />
        <div class="invalid-feedback">{{ errors.location }}</div>
      </div>
      <div class="mb-3">
        <label for="category" class="form-label">Bereich</label>
        <select id="category" class="form-select" :class="{ 'is-invalid': errors.category }"
          v-model="internship.category" @change="errors.category = ''">
          <option value="">Bitte wählen</option>
          <option v-for="category in categories" :key="category" :value="category">
            {{ translations[category] || category }}
          </option>
        </select>
        <div class="invalid-feedback">{{ errors.category }}</div>
      </div>
      <div class="mb-3">
        <label for="salary" class="form-label">Vergütung (€/Monat)</label>
        <input type="number" id="salary" class="form-control" :class="{ 'is-invalid': errors.salary }"
          v-model="internship.salary" @input="errors.salary = ''" />
        <div class="invalid-feedback">{{ errors.salary }}</div>
      </div>
      <div class="mb-3">
        <label for="duration" class="form-label">Dauer (Monate)</label>
        <input type="number" id="duration" class="form-control" :class="{ 'is-invalid': errors.duration }"
          v-model="internship.duration" @input="errors.duration = ''" />
        <div class="invalid-feedback">{{ errors.duration }}</div>
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