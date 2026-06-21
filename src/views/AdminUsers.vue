<script setup>
import { ref, onMounted } from 'vue';
import { useAuth0 } from '@auth0/auth0-vue';
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';

const { getAccessTokenSilently } = useAuth0();
const baseUrl = import.meta.env.VITE_API_BASE_URL;
const users = ref([]);
const error = ref('');

onMounted(() => fetchUsers());

async function fetchUsers() {
  try {
    const token = await getAccessTokenSilently();
    const response = await fetch(`${baseUrl}/api/user`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    users.value = await response.json();
  } catch (e) {
    console.error('Error fetching users:', e);
    error.value = 'Nutzer konnten nicht geladen werden.';
  }
}

async function saveUser(u) {
  try {
    const token = await getAccessTokenSilently();
    const response = await fetch(`${baseUrl}/api/user/${u.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(u)
    });
    if (!response.ok) {
      throw new Error(`Status ${response.status}`);
    }
    u.saved = true;
    setTimeout(() => { u.saved = false }, 2000);
  } catch (e) {
    console.error('Error saving user:', e);
    error.value = `Nutzer konnte nicht gespeichert werden (${e.message}).`;
  }
}
</script>

<template>
  <Navbar />
  <div class="container py-5">
    <h2 class="fw-bold mb-4">Nutzerverwaltung</h2>

    <div v-if="error" class="alert alert-warning">{{ error }}</div>

    <div v-else-if="users.length === 0" class="text-secondary">
      Keine Nutzer vorhanden.
    </div>

    <div v-else class="d-flex flex-column gap-3">
      <div v-for="u in users" :key="u.id" class="card shadow-sm">
        <div class="card-body">
          <p class="text-secondary mb-3"><strong>{{ u.email }}</strong></p>

          <div class="mb-3">
            <label class="form-label">Name</label>
            <input type="text" class="form-control" v-model="u.name" />
          </div>
          <div class="mb-3">
            <label class="form-label">Rolle</label>
            <select class="form-select" v-model="u.role">
              <option value="PREMIUM">Premium-Nutzer</option>
              <option value="COMPANY">Unternehmen</option>
              <option value="ADMIN">Administrator</option>
            </select>
          </div>
          <div class="mb-3">
            <label class="form-label">Firma</label>
            <input type="text" class="form-control" v-model="u.company" />
          </div>
          <div class="mb-3">
            <label class="form-label">Straße und Hausnummer</label>
            <input type="text" class="form-control" v-model="u.street" />
          </div>
          <div class="row mb-3">
            <div class="col-4">
              <label class="form-label">PLZ</label>
              <input type="text" class="form-control" v-model="u.zipCode" />
            </div>
            <div class="col-8">
              <label class="form-label">Stadt</label>
              <input type="text" class="form-control" v-model="u.city" />
            </div>
          </div>
          <div class="mb-3">
            <label class="form-label">Telefon</label>
            <input type="text" class="form-control" v-model="u.phone" />
          </div>

          <button class="btn btn-accent" @click="saveUser(u)">Speichern</button>
          <span v-if="u.saved" class="text-success ms-2">Gespeichert.</span>
        </div>
      </div>
    </div>
  </div>
  <Footer />
</template>

<style scoped></style>
