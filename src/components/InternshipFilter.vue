<script setup>
import { ref, onMounted } from 'vue';
import Button from '@/components/Button.vue';

const categoryUrl = `${import.meta.env.VITE_API_BASE_URL}/api/category`;

const emit = defineEmits(['internshipUpdate']);

const categories = ref([]);
const translations = ref({});
const searchName = ref('');
const selectedCategory = ref('');

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

function onSearch() {
    emit('internshipUpdate', { name: searchName.value, category: selectedCategory.value });
}

function onReset() {
    searchName.value = '';
    selectedCategory.value = '';
    emit('internshipUpdate');
}
</script>

<template>
    <div class="container mb-2">
        <div class="row g-2 align-items-center">
            <div class="col-md-6">
                <div class="position-relative">
                    <i class="bi bi-search search-icon"></i>
                   <input v-model="searchName" type="text" class="form-control search-input"
    placeholder="Suche nach Titel, Unternehmen oder Ort..." @keyup.enter="onSearch" />
                </div>
            </div>
            <div class="col-md-3">
                <select v-model="selectedCategory" class="form-select" @change="onSearch">
                    <option value="">Alle Bereiche</option>
                    <option v-for="category in categories" :key="category" :value="category">
                        {{ translations[category] || category }}
                    </option>
                </select>
            </div>
            <div class="col-md-3 d-flex gap-2">
                <Button variant="accent" :onClick="onSearch">Suchen</Button>
                <Button variant="secondary" :onClick="onReset">Reset</Button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.search-input {
    border-radius: 30px;
    padding-left: 2.5rem;
}

.search-icon {
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
    color: #888;
    z-index: 2;
}
</style>