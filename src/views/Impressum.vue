<script setup>
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';
</script>

<template>
  <Navbar />
  <div class="container py-5" style="max-width: 800px;">
    <h2 class="fw-bold mb-4">Impressum</h2>

    <h4 class="fw-bold mt-4">Angaben gemäß § 5 DDG</h4>
    <p class="text-secondary">
      Till Mühlenberend<br />
      Peterstraße 15<br />
      71069 Sindelfingen
    </p>

    <h4 class="fw-bold mt-4">Kontakt</h4>
    <p class="text-secondary">
      E-Mail: kontakt@internshipfinder.de
    </p>

    <h4 class="fw-bold mt-4">Projekthinweis</h4>
    <p class="text-secondary">
      Diese Website ist ein studentisches Projekt im Rahmen der Veranstaltung „Webtechnologien" an der
      Hochschule Konstanz (HTWG) und dient ausschließlich Lehr- und Demonstrationszwecken.
    </p>

    <h4 class="fw-bold mt-4">Haftung für Inhalte</h4>
    <p class="text-secondary">
      Die Inhalte dieser Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit,
      Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen.
    </p>
  </div>
  <Footer />
</template>

<style scoped></style>
