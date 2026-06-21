<script setup>
import { ref, onMounted } from 'vue';
import { useAuth0 } from '@auth0/auth0-vue';
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';
import { useToastStore } from '@/stores/toast';

const { getAccessTokenSilently } = useAuth0();
const toast = useToastStore();
const baseUrl = import.meta.env.VITE_API_BASE_URL;
const applications = ref([]);
const error = ref('');
const isAdmin = ref(false);
const isCompany = ref(false);
const isPremium = ref(false);
const userName = ref('');
const messageTexts = ref({});

onMounted(async () => {
  await checkRole();
  fetchApplications();
});

async function checkRole() {
  try {
    const token = await getAccessTokenSilently();
    const response = await fetch(`${baseUrl}/api/profile`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (response.ok) {
      const data = await response.json();
      isAdmin.value = data.role === 'ADMIN';
      isCompany.value = data.role === 'COMPANY';
      isPremium.value = data.role === 'PREMIUM';
      userName.value = data.name || '';
    }
  } catch (e) {
    console.error('Error checking role:', e);
  }
}

function senderLabel(m) {
  if (userName.value && m.sender === userName.value) {
    return 'Ich';
  }
  return m.sender;
}

async function fetchApplications() {
  try {
    const token = await getAccessTokenSilently();
    const response = await fetch(`${baseUrl}/api/application`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    applications.value = await response.json();
    const texts = {};
    applications.value.forEach(app => {
      texts[app.id] = '';
    });
    messageTexts.value = texts;
  } catch (e) {
    console.error('Error fetching applications:', e);
    error.value = 'Bewerbungen konnten nicht geladen werden.';
  }
}

async function sendMessage(id) {
  const text = messageTexts.value[id];
  if (!text || !text.trim()) return;
  try {
    const token = await getAccessTokenSilently();
    const response = await fetch(`${baseUrl}/api/application/${id}/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ text })
    });
    if (!response.ok) {
      throw new Error(`Status ${response.status}`);
    }
    toast.success('Nachricht gesendet.');
    fetchApplications();
  } catch (e) {
    console.error('Error sending message:', e);
    toast.error(`Nachricht konnte nicht gesendet werden (${e.message}).`);
  }
}

async function deleteApplication(id) {
  if (!confirm('Möchten Sie diese Bewerbung wirklich löschen?')) return;
  try {
    const token = await getAccessTokenSilently();
    const response = await fetch(`${baseUrl}/api/application/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    });
    if (!response.ok) {
      throw new Error(`Status ${response.status}`);
    }
    toast.success('Bewerbung gelöscht.');
    fetchApplications();
  } catch (e) {
    console.error('Error deleting application:', e);
    toast.error(`Bewerbung konnte nicht gelöscht werden (${e.message}).`);
  }
}

function formatDate(value) {
  if (!value) return '';
  let d;
  if (Array.isArray(value)) {
    const [y, mo, day, h = 0, mi = 0, s = 0] = value;
    d = new Date(y, mo - 1, day, h, mi, s);
  } else {
    d = new Date(value);
  }
  if (isNaN(d)) return value;
  return d.toLocaleString('de-DE', {
    day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit'
  });
}

function formatAddress(app) {
  const parts = [];
  if (app.street) parts.push(app.street);
  const cityLine = [app.zipCode, app.city].filter(Boolean).join(' ');
  if (cityLine) parts.push(cityLine);
  return parts.join(', ');
}

function formatDateOnly(value) {
  if (!value) return '';
  const d = new Date(value);
  if (isNaN(d)) return value;
  return d.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' });
}
</script>

<template>
  <Navbar />
  <div class="container py-5">
    <h2 class="fw-bold mb-4">{{ isPremium ? 'Meine Bewerbungen' : 'Eingegangene Bewerbungen' }}</h2>

    <div v-if="error" class="alert alert-warning">{{ error }}</div>

    <div v-else-if="applications.length === 0" class="text-secondary">
      {{ isPremium ? 'Sie haben noch keine Bewerbungen abgeschickt.' : 'Es liegen noch keine Bewerbungen vor.' }}
    </div>

    <div v-else class="d-flex flex-column gap-3">
      <div v-for="app in applications" :key="app.id" class="card shadow-sm">
        <div class="card-body">
          <div class="d-flex justify-content-between align-items-start mb-2">
            <h5 class="fw-bold mb-0">{{ app.applicantName }}</h5>
            <small class="text-secondary">{{ formatDate(app.createdAt) }}</small>
          </div>
          <p class="text-secondary mb-2">
            Bewerbung auf
            <strong>{{ app.internship ? app.internship.title : 'Unbekanntes Praktikum' }}</strong>
            <template v-if="app.internship"> bei {{ app.internship.company }}</template>
          </p>
          <ul class="list-unstyled small text-secondary mb-2">
            <li><strong>E-Mail:</strong> {{ app.email }}</li>
            <li v-if="app.street || app.city"><strong>Adresse:</strong> {{ formatAddress(app) }}</li>
            <li v-if="app.phone"><strong>Telefon:</strong> {{ app.phone }}</li>
            <li v-if="app.studyProgram"><strong>Studiengang:</strong> {{ app.studyProgram }}</li>
            <li v-if="app.availableFrom"><strong>Verfügbar ab:</strong> {{ formatDateOnly(app.availableFrom) }}</li>
          </ul>
          <p class="mb-0">{{ app.coverLetter }}</p>

          <!-- Nachrichten-Verlauf -->
          <div v-if="app.messages && app.messages.length" class="mt-3 d-flex flex-column gap-2">
            <div v-for="m in app.messages" :key="m.id" class="p-2 rounded message-box">
              <div class="small text-secondary mb-1"><strong>{{ senderLabel(m) }}</strong> · {{ formatDate(m.createdAt) }}</div>
              <div>{{ m.text }}</div>
            </div>
          </div>

          <!-- Nachricht schreiben (Unternehmen und Bewerber) -->
          <div v-if="isCompany || isPremium" class="mt-3">
            <textarea class="form-control mb-2" rows="2" v-model="messageTexts[app.id]"
              placeholder="Nachricht schreiben"></textarea>
            <button class="btn btn-sm btn-accent" @click="sendMessage(app.id)">Senden</button>
          </div>

          <!-- Löschen (nur Admin) -->
          <div v-if="isAdmin" class="mt-3">
            <button class="btn btn-sm btn-danger" @click="deleteApplication(app.id)">
              <i class="bi bi-trash me-1"></i>Löschen
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Footer />
</template>

<style scoped>
.message-box {
  background-color: rgba(30, 184, 204, 0.1);
  border: 1px solid rgba(30, 184, 204, 0.3);
}
</style>
