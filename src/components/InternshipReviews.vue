<script setup>
import { ref, onMounted, watch } from 'vue';
import { useAuth0 } from '@auth0/auth0-vue';

const props = defineProps({
  internshipId: {
    type: [String, Number],
    required: true,
  },
  showDeleteButton: {
    type: Boolean,
    default: false,
  },
  showAddForm: {
    type: Boolean,
    default: false,
  }
});

const { getAccessTokenSilently } = useAuth0();

const reviews = ref([]);
const reviewUrl = `${import.meta.env.VITE_API_BASE_URL}/api/review/internship`;
const reviewBaseUrl = `${import.meta.env.VITE_API_BASE_URL}/api/review`;

const newReview = ref({
  userName: '',
  stars: 5,
  text: '',
});

async function fetchReviews() {
  try {
    const response = await fetch(`${reviewUrl}/${props.internshipId}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    reviews.value = await response.json();
  } catch (error) {
    console.error('Error fetching reviews:', error);
  }
}

async function deleteReview(id) {
  if (!confirm('Möchten Sie diese Bewertung wirklich löschen?')) return;
  try {
    const token = await getAccessTokenSilently();
    const response = await fetch(`${reviewBaseUrl}/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error(`Fehler beim Löschen: ${response.status}`);
    }
    fetchReviews();
  } catch (error) {
    console.error('Fehler beim Löschen der Bewertung:', error);
  }
}

async function addReview() {
  try {
    const token = await getAccessTokenSilently();
    const response = await fetch(reviewBaseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        userName: newReview.value.userName,
        stars: Number(newReview.value.stars),
        text: newReview.value.text,
        internship: { id: Number(props.internshipId) },
      }),
    });
    if (!response.ok) {
      throw new Error(`Fehler beim Erstellen: ${response.status}`);
    }
    newReview.value = { userName: '', stars: 5, text: '' };
    fetchReviews();
  } catch (error) {
    console.error('Fehler beim Erstellen der Bewertung:', error);
  }
}

onMounted(() => {
  fetchReviews();
});

// Falls die Komponente ohne Unmount für ein anderes Praktikum wiederverwendet wird
watch(() => props.internshipId, () => {
  fetchReviews();
});
</script>

<template>
  <div class="mt-5">
    <h4 class="fw-bold mb-3">Bewertungen</h4>

    <div v-if="reviews.length > 0" class="d-flex flex-column gap-3">
      <div v-for="review in reviews" :key="review.id" class="card review-card border-0 shadow-sm">
        <div class="card-body">
          <div class="d-flex justify-content-between align-items-center mb-2">
            <h5 class="card-title fw-bold mb-0">{{ review.userName }}</h5>
            <div class="stars">
              <i v-for="n in 5" :key="n"
                 :class="n <= review.stars ? 'bi bi-star-fill' : 'bi bi-star'"></i>
            </div>
          </div>
          <p class="card-text text-secondary mb-0">{{ review.text }}</p>
          <div v-if="showDeleteButton" class="text-end mt-2">
            <button class="btn btn-sm btn-danger" @click="deleteReview(review.id)">
              <i class="bi bi-trash me-1"></i>Löschen
            </button>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="text-secondary">
      Noch keine Bewertungen vorhanden.
    </div>

    <!-- Bewertung hinzufügen (nur Premium/Admin) -->
    <div v-if="showAddForm" class="card review-card border-0 shadow-sm mt-4">
      <div class="card-body">
        <h5 class="fw-bold mb-3">Bewertung schreiben</h5>
        <form @submit.prevent="addReview">
          <div class="mb-3">
            <label for="reviewUserName" class="form-label">Name</label>
            <input type="text" id="reviewUserName" class="form-control" v-model="newReview.userName" required />
          </div>
          <div class="mb-3">
            <label for="reviewStars" class="form-label">Sterne</label>
            <select id="reviewStars" class="form-select" v-model="newReview.stars">
              <option v-for="n in 5" :key="n" :value="n">{{ n }}</option>
            </select>
          </div>
          <div class="mb-3">
            <label for="reviewText" class="form-label">Bewertung</label>
            <textarea id="reviewText" class="form-control" v-model="newReview.text" required></textarea>
          </div>
          <button type="submit" class="btn btn-accent">Bewertung absenden</button>
        </form>
      </div>
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
</style>
