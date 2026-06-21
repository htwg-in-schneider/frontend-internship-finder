<script setup>
import { ref } from 'vue';
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';
import Button from '@/components/Button.vue';

const contactEmail = 'kontakt@internshipfinder.de';
const name = ref('');
const email = ref('');
const message = ref('');

function sendMessage() {
  const subject = `Kontaktanfrage von ${name.value}`;
  const body = `Name: ${name.value}\nE-Mail: ${email.value}\n\nNachricht:\n${message.value}`;
  window.location.href = `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
</script>

<template>
  <Navbar />
  <div class="container py-5" style="max-width: 600px;">
    <h2 class="fw-bold mb-2">Schön, dass Sie da sind</h2>
    <p class="text-secondary mb-4">
      Haben Sie Fragen zu einem Praktikum, Feedback oder möchten einfach Hallo sagen? Wir freuen uns
      über Ihre Nachricht und melden uns so schnell wie möglich bei Ihnen zurück.
    </p>

    <form @submit.prevent="sendMessage">
      <div class="mb-3">
        <label for="name" class="form-label">Ihr Name</label>
        <input type="text" id="name" class="form-control" v-model="name" placeholder="Max Mustermann" required />
      </div>
      <div class="mb-3">
        <label for="email" class="form-label">Ihre E-Mail</label>
        <input type="email" id="email" class="form-control" v-model="email" placeholder="max@beispiel.de" required />
      </div>
      <div class="mb-3">
        <label for="message" class="form-label">Ihre Nachricht</label>
        <textarea id="message" class="form-control" rows="5" v-model="message"
          placeholder="Erzählen Sie uns, worum es geht" required></textarea>
      </div>

      <Button type="submit" variant="accent">Nachricht senden</Button>

      <p class="text-secondary small mt-3 mb-0">
        <i class="bi bi-info-circle me-1"></i>
        Beim Klick auf „Nachricht senden" öffnet sich Ihr E-Mail-Programm mit der bereits ausgefüllten
        Nachricht. Sie müssen sie dort nur noch abschicken.
      </p>
    </form>

    <hr class="my-4" />
    <p class="text-secondary mb-0">
      Lieber direkt? Schreiben Sie uns einfach an
      <a :href="`mailto:${contactEmail}`">{{ contactEmail }}</a>.
    </p>
  </div>
  <Footer />
</template>

<style scoped></style>
