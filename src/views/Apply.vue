<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuth0 } from '@auth0/auth0-vue';
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';
import Button from '@/components/Button.vue';
import NavButton from '@/components/NavButton.vue';
import { useToastStore } from '@/stores/toast';

const route = useRoute();
const router = useRouter();
const toast = useToastStore();
const { getAccessTokenSilently } = useAuth0();

const baseUrl = import.meta.env.VITE_API_BASE_URL;
const internship = ref(null);

const form = ref({
  applicantName: '',
  email: '',
  street: '',
  zipCode: '',
  city: '',
  phone: '',
  studyProgram: '',
  availableFrom: '',
  coverLetter: '',
});
const errors = ref({ applicantName: '', email: '', coverLetter: '' });

onMounted(async () => {
  await Promise.all([fetchInternship(), prefillFromProfile()]);
});

async function fetchInternship() {
  try {
    const response = await fetch(`${baseUrl}/api/internship/${route.params.internshipId}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    internship.value = await response.json();
  } catch (error) {
    console.error('Error fetching internship:', error);
    router.push('/');
  }
}

async function prefillFromProfile() {
  try {
    const token = await getAccessTokenSilently();
    const response = await fetch(`${baseUrl}/api/profile`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (response.ok) {
      const data = await response.json();
      form.value.applicantName = data.name || '';
      form.value.email = data.email || '';
      form.value.street = data.street || '';
      form.value.zipCode = data.zipCode || '';
      form.value.city = data.city || '';
      form.value.phone = data.phone || '';
      form.value.studyProgram = data.studyProgram || '';
    }
  } catch (error) {
    console.error('Error loading profile:', error);
  }
}

function validate() {
  errors.value.applicantName = form.value.applicantName.trim() ? '' : 'Bitte geben Sie Ihren Namen an.';
  errors.value.coverLetter = form.value.coverLetter.trim() ? '' : 'Bitte schreiben Sie ein kurzes Anschreiben.';

  const email = form.value.email.trim();
  if (!email) {
    errors.value.email = 'Bitte geben Sie Ihre E-Mail-Adresse an.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.value.email = 'Bitte geben Sie eine gültige E-Mail-Adresse an.';
  } else {
    errors.value.email = '';
  }

  return !errors.value.applicantName && !errors.value.email && !errors.value.coverLetter;
}

async function submitApplication() {
  if (!validate()) return;
  try {
    const token = await getAccessTokenSilently();
    const response = await fetch(`${baseUrl}/api/application`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        applicantName: form.value.applicantName,
        email: form.value.email,
        street: form.value.street,
        zipCode: form.value.zipCode,
        city: form.value.city,
        phone: form.value.phone,
        studyProgram: form.value.studyProgram,
        availableFrom: form.value.availableFrom,
        coverLetter: form.value.coverLetter,
        internship: { id: Number(route.params.internshipId) },
      }),
    });
    if (!response.ok) {
      throw new Error(`Status ${response.status}`);
    }
    toast.success('Bewerbung erfolgreich abgesendet!');
    router.push('/');
  } catch (error) {
    console.error('Fehler beim Absenden der Bewerbung:', error);
    toast.error(`Bewerbung konnte nicht abgesendet werden (${error.message}).`);
  }
}
</script>

<template>
  <Navbar />
  <div class="container py-5" style="max-width: 700px;">
    <h2 class="fw-bold mb-2">Bewerbung</h2>
    <p v-if="internship" class="text-secondary mb-4">
      Sie bewerben sich auf <strong>{{ internship.title }}</strong> bei {{ internship.company }}
      in {{ internship.location }}.
    </p>

    <form @submit.prevent="submitApplication">
      <div class="mb-3">
        <label for="applicantName" class="form-label">Name</label>
        <input type="text" id="applicantName" class="form-control"
          :class="{ 'is-invalid': errors.applicantName }" v-model="form.applicantName"
          @input="errors.applicantName = ''" />
        <div class="invalid-feedback">{{ errors.applicantName }}</div>
      </div>

      <div class="mb-3">
        <label for="email" class="form-label">E-Mail</label>
        <input type="text" id="email" class="form-control" :class="{ 'is-invalid': errors.email }"
          v-model="form.email" @input="errors.email = ''" />
        <div class="invalid-feedback">{{ errors.email }}</div>
      </div>

      <div class="mb-3">
        <label for="street" class="form-label">Straße und Hausnummer</label>
        <input type="text" id="street" class="form-control" v-model="form.street" />
      </div>

      <div class="row mb-3">
        <div class="col-4">
          <label for="zipCode" class="form-label">PLZ</label>
          <input type="text" id="zipCode" class="form-control" v-model="form.zipCode" />
        </div>
        <div class="col-8">
          <label for="city" class="form-label">Stadt</label>
          <input type="text" id="city" class="form-control" v-model="form.city" />
        </div>
      </div>

      <div class="mb-3">
        <label for="phone" class="form-label">Telefon <span class="text-secondary">(optional)</span></label>
        <input type="text" id="phone" class="form-control" v-model="form.phone" />
      </div>

      <div class="mb-3">
        <label for="studyProgram" class="form-label">Studiengang <span class="text-secondary">(optional)</span></label>
        <input type="text" id="studyProgram" class="form-control" v-model="form.studyProgram"
          placeholder="z. B. Wirtschaftsinformatik" />
      </div>

      <div class="mb-3">
        <label for="availableFrom" class="form-label">Verfügbar ab <span class="text-secondary">(optional)</span></label>
        <input type="date" id="availableFrom" class="form-control" v-model="form.availableFrom" />
      </div>

      <div class="mb-3">
        <label for="resume" class="form-label">Lebenslauf <span class="text-secondary">(optional, PDF)</span></label>
        <input type="file" id="resume" class="form-control" accept=".pdf,.doc,.docx" />
      </div>

      <div class="mb-4">
        <label for="coverLetter" class="form-label">Anschreiben</label>
        <textarea id="coverLetter" class="form-control" rows="6"
          :class="{ 'is-invalid': errors.coverLetter }" v-model="form.coverLetter"
          @input="errors.coverLetter = ''" placeholder="Warum passen Sie zu diesem Praktikum?"></textarea>
        <div class="invalid-feedback">{{ errors.coverLetter }}</div>
      </div>

      <NavButton variant="secondary" class="me-2"
        :to="`/internship/view/${route.params.internshipId}`">Zurück</NavButton>
      <Button type="submit" variant="accent" :disabled="!internship">Bewerbung absenden</Button>
    </form>
  </div>
  <Footer />
</template>

<style scoped></style>
