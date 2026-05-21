<script setup>
import { ref, onMounted } from 'vue';
import Button from '@/components/Button.vue';

const props = defineProps({
  internshipId: {
    type: [String, Number],
    required: true,
  }
});

const reviewUrl = 'http://localhost:8081/api/review';

const reviews = ref([]);
const newReview = ref({
  userName: '',
  stars: 5,
  text: '',
});

onMounted(async () => fetchReviews());

async function fetchReviews() {
  try {
    const response = await fetch(`${reviewUrl}/internship/${props.internshipId}`);
    if (response.ok) {
      reviews.value = await response.json();
    }
  } catch (error) {
    console.error('Error fetching reviews:', error);
  }
}

async function addReview() {
  if (!newReview.value.userName || !newReview.value.text) {
    alert('Bitte Name und Text ausfüllen.');
    return;
  }
  try {
    const payload = {
      userName: newReview.value.userName,
      stars: Number(newReview.value.stars),
      text: newReview.value.text,
      internship: { id: Number(props.internshipId) },
    };
    console.log('Sende Review:', payload);

    const response = await fetch(reviewUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!response.ok) {
      throw new Error(`Fehler beim Erstellen: ${response.status}`);
    }
    // Felder zurücksetzen + Liste neu laden
    newReview.value = { userName: '', stars: 5, text: '' };
    await fetchReviews();
  } catch (error) {
    console.error('Fehler beim Erstellen der Review:', error);
    alert('Bewertung konnte nicht gespeichert werden.');
  }
}


async function deleteReview(id) {
  if (!confirm('Bewertung wirklich löschen?')) return;
  try {
    const response = await fetch(`${reviewUrl}/${id}`, { method: 'DELETE' });
    if (!response.ok) {
      throw new Error(`Fehler beim Löschen: ${response.status}`);
    }
    await fetchReviews();
  } catch (error) {
    console.error('Fehler beim Löschen der Review:', error);
    alert('Bewertung konnte nicht gelöscht werden.');
  }
}

function starString(stars) {
  return '★'.repeat(stars) + '☆'.repeat(5 - stars);
}
</script>

<template>
  <div class="mt-5">
    <h4 class="fw-bold mb-3">Bewertungen</h4>

    <!-- Liste der Reviews -->
    <div v-if="reviews.length === 0" class="text-secondary mb-4">
      Noch keine Bewertungen. Sei der Erste!
    </div>
    <div v-for="review in reviews" :key="review.id" class="card mb-3 p-3 review-card">
      <div class="d-flex justify-content-between align-items-start">
        <div>
          <span class="stars">{{ starString(review.stars) }}</span>
          <strong class="ms-2">{{ review.userName }}</strong>
          <p class="mb-0 mt-1 text-secondary">{{ review.text }}</p>
        </div>
        <button class="btn btn-sm btn-outline-danger" @click="deleteReview(review.id)">
          <i class="bi bi-trash"></i>
        </button>
      </div>
    </div>

    <!-- Formular für neue Review -->
    <div class="card p-3 mt-4 review-form">
      <h5 class="fw-bold mb-3">Bewertung abgeben</h5>
      <div class="mb-2">
        <label class="form-label">Name</label>
        <input type="text" class="form-control" v-model="newReview.userName" placeholder="Dein Name" />
      </div>
      <div class="mb-2">
        <label class="form-label">Sterne</label>
        <select class="form-select" v-model.number="newReview.stars">
          <option :value="5">★★★★★ (5)</option>
          <option :value="4">★★★★☆ (4)</option>
          <option :value="3">★★★☆☆ (3)</option>
          <option :value="2">★★☆☆☆ (2)</option>
          <option :value="1">★☆☆☆☆ (1)</option>
        </select>
      </div>
      <div class="mb-3">
        <label class="form-label">Kommentar</label>
        <textarea class="form-control" v-model="newReview.text" placeholder="Deine Erfahrung..."></textarea>
      </div>
      <Button variant="accent" :onClick="addReview">Bewertung abgeben</Button>
    </div>
  </div>
</template>

<style scoped>
.stars {
  color: #f5a623;
  font-size: 1.1rem;
}

.review-card {
  background-color: rgba(255, 255, 255, 0.7);
  border: 1px solid rgba(45, 81, 118, 0.18);
}

.review-form {
  background-color: rgba(255, 255, 255, 0.6);
  border: 1px solid rgba(45, 81, 118, 0.18);
  max-width: 600px;
}
</style>