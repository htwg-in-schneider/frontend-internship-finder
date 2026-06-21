<script setup>
import { ref, onMounted } from 'vue';
import { useAuth0 } from '@auth0/auth0-vue';
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';
import NavButton from '@/components/NavButton.vue';

const { getAccessTokenSilently } = useAuth0();
const baseUrl = import.meta.env.VITE_API_BASE_URL;
const internships = ref([]);
const reviewsByInternship = ref({});
const error = ref('');

onMounted(() => load());

async function load() {
  try {
    const token = await getAccessTokenSilently();
    const profileResponse = await fetch(`${baseUrl}/api/profile`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (!profileResponse.ok) {
      throw new Error(`HTTP error! status: ${profileResponse.status}`);
    }
    const profile = await profileResponse.json();
    const company = profile.company;

    const response = await fetch(`${baseUrl}/api/internship`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const all = await response.json();
    internships.value = all.filter(i => i.company === company);

    const reviewsMap = {};
    for (const i of internships.value) {
      const reviewResponse = await fetch(`${baseUrl}/api/review/internship/${i.id}`);
      if (reviewResponse.ok) {
        reviewsMap[i.id] = await reviewResponse.json();
      }
    }
    reviewsByInternship.value = reviewsMap;
  } catch (e) {
    console.error('Error loading company internships:', e);
    error.value = 'Praktika konnten nicht geladen werden.';
  }
}
</script>

<template>
  <Navbar />
  <div class="container py-5">
    <h2 class="fw-bold mb-4">Meine Praktika</h2>

    <div v-if="error" class="alert alert-warning">{{ error }}</div>

    <div v-else-if="internships.length === 0" class="text-secondary">
      Sie haben noch keine Praktika.
    </div>

    <div v-else class="d-flex flex-column gap-3">
      <div v-for="i in internships" :key="i.id" class="card shadow-sm">
        <div class="card-body">
          <div class="d-flex justify-content-between align-items-start mb-2">
            <div>
              <h5 class="fw-bold mb-1">{{ i.title }}</h5>
              <p class="text-secondary mb-0">{{ i.location }}</p>
            </div>
            <NavButton variant="secondary" :to="`/internship/edit/${i.id}`">Bearbeiten</NavButton>
          </div>

          <h6 class="fw-bold mt-3">Bewertungen</h6>
          <div v-if="reviewsByInternship[i.id] && reviewsByInternship[i.id].length"
            class="d-flex flex-column gap-2">
            <div v-for="r in reviewsByInternship[i.id]" :key="r.id" class="p-2 rounded review-box">
              <div class="d-flex justify-content-between align-items-center">
                <strong>{{ r.userName }}</strong>
                <span class="stars">
                  <i v-for="n in 5" :key="n" :class="n <= r.stars ? 'bi bi-star-fill' : 'bi bi-star'"></i>
                </span>
              </div>
              <div class="text-secondary">{{ r.text }}</div>
            </div>
          </div>
          <div v-else class="text-secondary">Noch keine Bewertungen.</div>
        </div>
      </div>
    </div>
  </div>
  <Footer />
</template>

<style scoped>
.review-box {
  background-color: rgba(30, 184, 204, 0.08);
  border: 1px solid rgba(30, 184, 204, 0.25);
}

.stars {
  color: #f5a623;
}
</style>
