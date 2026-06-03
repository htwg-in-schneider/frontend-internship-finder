<script setup>
import { ref, onMounted, watch } from 'vue';

const props = defineProps({
  internshipId: {
    type: [String, Number],
    required: true,
  }
});

const reviews = ref([]);
const reviewUrl = 'http://localhost:8081/api/review/internship';

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
        </div>
      </div>
    </div>
    <div v-else class="text-secondary">
      Noch keine Bewertungen vorhanden.
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
