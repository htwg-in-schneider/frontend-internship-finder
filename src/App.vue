<script setup>
import { ref } from 'vue';

const showBanner = ref(true);

function closeBanner() {
    showBanner.value = false;
}
</script>

<template>
  <!-- Special Banner -->
  <div id="specialbanner" class="text-center py-2 text-white" style="background-color: #1eb8cc;" v-if="showBanner">
    Neu: Premium-Mitgliedschaft für vertiefte Bewerber-Tipps!&nbsp;&nbsp;
    <button type="button" class="btn btn-dark btn-sm" @click="closeBanner">Verstanden!</button>
  </div>

  <!-- Navbar -->
  <nav class="navbar navbar-expand-lg navbar-custom sticky-top">
    <div class="container">
      <a class="navbar-brand" href="#">
        <img src="/internship-finder-logo.png" alt="Internship Finder Logo" height="55">
      </a>

      <!-- Suchfeld in der Mitte (desktop only) -->
      <form class="d-none d-lg-flex mx-auto" style="width: 40%;" role="search">
        <input class="form-control search-pill" type="search" placeholder="search" aria-label="Suche">
      </form>

      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item"><a class="nav-link" href="#">Sign up</a></li>
          <li class="nav-item"><a class="nav-link" href="#">Login</a></li>
        </ul>
      </div>
    </div>
  </nav>

  <!-- Hero -->
  <section class="py-5">
    <div class="container">
      <div class="row align-items-center g-4">
        <!-- Linke Seite: Titel + Filter -->
        <div class="col-lg-6">
          <h1 class="brand-font fw-bold mb-2">Finde dein perfektes Praktikum</h1>
          <p class="mb-4 text-secondary">Teile und entdecke Praktika von Studierenden für Studierende.</p>

          <!-- Filter (Ort + Bereich) -->
          <div class="row g-2 mb-3">
            <div class="col-sm-6">
              <input type="text" class="form-control" placeholder="Ort eingeben">
            </div>
            <div class="col-sm-6">
              <select class="form-select">
                <option selected disabled>Bereich Wählen</option>
                <option>Softwareentwicklung</option>
                <option>Systemengineering</option>
                <option>Data Analyst</option>
                <option>Cyber Security</option>
              </select>
            </div>
          </div>

          <a href="#" class="btn btn-accent">
            <i class="bi bi-house-door me-1"></i>Home
          </a>
        </div>

        <!-- Rechte Seite: Hero-Bild -->
        <div class="col-lg-6">
          <img src="/hero.jpg" alt="Studentin mit Rucksack blickt in den Himmel" class="hero-image">
        </div>
      </div>
    </div>
  </section>

  <!-- Praktikum Grid -->
  <section class="py-4">
    <div class="container">
      <div class="row g-4">
        <!-- Card 1 -->
        <div class="col-md-6">
          <div class="card card-internship h-100 p-3">
            <h5 class="card-title fw-bold mb-3">Konzept Informationssysteme GmbH</h5>
            <div class="card-logo-area mb-3">
              <img src="/konzept.png" alt="Konzept Logo">
            </div>
            <p class="card-text text-secondary">
              IT-Dienstleister für individuelle Software, Prozessdigitalisierung und IT-Beratung.
            </p>
            <a href="#" class="btn btn-accent mt-auto align-self-start">Registriere für mehr</a>
          </div>
        </div>

        <!-- Card 2 -->
        <div class="col-md-6">
          <div class="card card-internship h-100 p-3">
            <h5 class="card-title fw-bold mb-3">Advantest Europe GmbH</h5>
            <div class="card-logo-area mb-3">
              <img src="/advantest.png" alt="Advantest Logo">
            </div>
            <p class="card-text text-secondary">
              Anbieter von Testsystemen für Halbleiter. Fokus auf Qualität, Automatisierung und Innovation.
            </p>
            <a href="#" class="btn btn-accent mt-auto align-self-start">Registriere für mehr</a>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Footer -->
  <footer class="text-center py-4 mt-4">
    <nav class="mb-2">
      <a href="#" class="footer-link mx-2">Kontakt</a>
      <span aria-hidden="true">|</span>
      <a href="#" class="footer-link mx-2">Datenschutz</a>
      <span aria-hidden="true">|</span>
      <a href="#" class="footer-link mx-2">Impressum</a>
    </nav>
    <p class="text-secondary mb-0">&copy; 2025 Internship Finder</p>
  </footer>
</template>

<style scoped></style>