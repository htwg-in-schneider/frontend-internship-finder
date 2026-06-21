<script setup>
import { useAuth0 } from '@auth0/auth0-vue'
import { onMounted, ref, computed } from 'vue'
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
import Button from '@/components/Button.vue'
import { useToastStore } from '@/stores/toast'

const baseUrl = import.meta.env.VITE_API_BASE_URL;
const { user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0()
const toast = useToastStore()
const profileData = ref(null)
const error = ref('')

const form = ref({
  name: '',
  street: '',
  zipCode: '',
  city: '',
  phone: '',
  studyProgram: '',
  pictureUrl: ''
})

const birthDay = ref('')
const birthMonth = ref('')
const birthYear = ref('')

const months = [
  { value: 1, label: 'Januar' }, { value: 2, label: 'Februar' }, { value: 3, label: 'März' },
  { value: 4, label: 'April' }, { value: 5, label: 'Mai' }, { value: 6, label: 'Juni' },
  { value: 7, label: 'Juli' }, { value: 8, label: 'August' }, { value: 9, label: 'September' },
  { value: 10, label: 'Oktober' }, { value: 11, label: 'November' }, { value: 12, label: 'Dezember' }
]
const days = Array.from({ length: 31 }, (_, i) => i + 1)
const currentYear = new Date().getFullYear()
const years = Array.from({ length: currentYear - 1950 + 1 }, (_, i) => currentYear - i)

const isCompany = computed(() => profileData.value && profileData.value.role === 'COMPANY')
const pictureSrc = computed(() => form.value.pictureUrl || (user.value && user.value.picture) || '')

function getRoleName(constant) {
  switch (constant) {
    case 'ADMIN':
      return 'Administrator'
    case 'COMPANY':
      return 'Unternehmen'
    case 'PREMIUM':
      return 'Premium-Nutzer'
    default:
      return constant
  }
}

function onPictureSelected(event) {
  const file = event.target.files && event.target.files[0]
  if (!file) return
  if (file.size > 2 * 1024 * 1024) {
    toast.error('Bild zu groß (max. 2 MB).')
    return
  }
  const reader = new FileReader()
  reader.onload = () => {
    form.value.pictureUrl = reader.result
  }
  reader.readAsDataURL(file)
}

onMounted(async () => {
  if (isAuthenticated.value) {
    await fetchProfile()
  }
})

async function fetchProfile() {
  try {
    const token = await getAccessTokenSilently()
    const response = await fetch(`${baseUrl}/api/profile`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    if (response.ok) {
      profileData.value = await response.json()
      form.value.name = profileData.value.name || ''
      form.value.street = profileData.value.street || ''
      form.value.zipCode = profileData.value.zipCode || ''
      form.value.city = profileData.value.city || ''
      form.value.phone = profileData.value.phone || ''
      form.value.studyProgram = profileData.value.studyProgram || ''
      form.value.pictureUrl = profileData.value.pictureUrl || ''

      const bd = profileData.value.birthDate
      if (bd && bd.includes('-')) {
        const [y, m, d] = bd.split('-')
        birthYear.value = Number(y)
        birthMonth.value = Number(m)
        birthDay.value = Number(d)
      }
    } else {
      error.value = `Fehler beim Laden des Profils: ${response.status} ${response.statusText}`
    }
  } catch (e) {
    error.value = `Fehler beim Laden des Profils: ${e.message}`
    console.warn('Could not get token:', e)
  }
}

async function saveProfile() {
  let birthDate = ''
  if (birthDay.value && birthMonth.value && birthYear.value) {
    birthDate = `${birthYear.value}-${String(birthMonth.value).padStart(2, '0')}-${String(birthDay.value).padStart(2, '0')}`
  }
  try {
    const token = await getAccessTokenSilently()
    const response = await fetch(`${baseUrl}/api/profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        name: form.value.name,
        birthDate: birthDate,
        street: form.value.street,
        zipCode: form.value.zipCode,
        city: form.value.city,
        phone: form.value.phone,
        studyProgram: form.value.studyProgram,
        pictureUrl: form.value.pictureUrl
      })
    })
    if (!response.ok) {
      throw new Error(`Status ${response.status}`)
    }
    profileData.value = await response.json()
    toast.success('Profil gespeichert.')
  } catch (e) {
    console.error('Fehler beim Speichern des Profils:', e)
    toast.error(`Profil konnte nicht gespeichert werden (${e.message}).`)
  }
}
</script>

<template>
  <Navbar />
  <div class="container py-5" style="max-width: 600px; min-height: 60vh;">
    <h2 class="fw-bold mb-4">Mein Profil</h2>

    <div v-if="isLoading" class="text-center">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>

    <div v-else-if="isAuthenticated && profileData">
      <div class="text-center mb-3">
        <img v-if="pictureSrc" :src="pictureSrc" alt="Profilbild" class="rounded-circle"
          width="120" height="120" style="object-fit: cover;" />
        <i v-else class="bi bi-person-circle text-secondary" style="font-size: 120px;"></i>
      </div>

      <p class="text-secondary text-center mb-4">
        Angemeldet als <strong>{{ profileData.email }}</strong>
        · Rolle: <strong>{{ getRoleName(profileData.role) }}</strong>
      </p>

      <form @submit.prevent="saveProfile">
        <div v-if="isCompany" class="mb-3">
          <label class="form-label">Firma</label>
          <input type="text" class="form-control" :value="profileData.company" readonly />
        </div>

        <div class="mb-3">
          <label for="name" class="form-label">{{ isCompany ? 'Ansprechpartner' : 'Name' }}</label>
          <input type="text" id="name" class="form-control" v-model="form.name" />
        </div>

        <div v-if="!isCompany" class="mb-3">
          <label class="form-label">Geburtsdatum</label>
          <div class="row g-2">
            <div class="col-4">
              <select class="form-select" v-model="birthDay">
                <option value="">Tag</option>
                <option v-for="d in days" :key="d" :value="d">{{ d }}</option>
              </select>
            </div>
            <div class="col-4">
              <select class="form-select" v-model="birthMonth">
                <option value="">Monat</option>
                <option v-for="m in months" :key="m.value" :value="m.value">{{ m.label }}</option>
              </select>
            </div>
            <div class="col-4">
              <select class="form-select" v-model="birthYear">
                <option value="">Jahr</option>
                <option v-for="y in years" :key="y" :value="y">{{ y }}</option>
              </select>
            </div>
          </div>
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
          <label for="phone" class="form-label">Telefon</label>
          <input type="text" id="phone" class="form-control" v-model="form.phone" />
        </div>

        <div v-if="!isCompany" class="mb-3">
          <label for="studyProgram" class="form-label">Studiengang</label>
          <input type="text" id="studyProgram" class="form-control" v-model="form.studyProgram" />
        </div>

        <div class="mb-4">
          <label for="pictureFile" class="form-label">{{ isCompany ? 'Firmenlogo' : 'Profilbild' }}</label>
          <input type="file" id="pictureFile" class="form-control" accept="image/*" @change="onPictureSelected" />
        </div>

        <Button type="submit" variant="accent">Speichern</Button>
      </form>
    </div>

    <div v-else-if="isAuthenticated" class="text-secondary">
      {{ error || 'Lade Profildaten...' }}
    </div>

    <div v-else class="alert alert-warning text-center">
      Sie sind nicht eingeloggt.
    </div>
  </div>
  <Footer />
</template>

<style scoped></style>
