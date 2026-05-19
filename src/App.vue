<script setup>
// Iteration 1: Statischer Content
</script>

<template>
  <a class="skip-link" href="#content">Zum Inhalt springen</a>

  <header class="site-header" id="top">
    <div class="container header-inner">
      <a class="brand" href="#top" aria-label="Zur Startseite">
        <img class="brand-logo" src="/internship-finder-logo.png" alt="Internship Finder" />
      </a>

      <form class="header-search" role="search" aria-label="Suche">
        <label class="sr-only" for="q">Suche</label>
        <input id="q" name="q" type="search" placeholder="search" autocomplete="off" />
      </form>

      <div class="header-actions" aria-label="Account">
        <a class="btn btn-soft" href="#signup">Sign up</a>
        <a class="btn btn-soft" href="#login">Login</a>
      </div>

      <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="mobile-nav">
        <span class="nav-toggle-lines" aria-hidden="true"></span>
        <span class="sr-only">Menü öffnen</span>
      </button>
    </div>

    <nav id="mobile-nav" class="mobile-nav" aria-label="Mobile Navigation">
      <a href="#top">Home</a>
      <a href="#unternehmen">Unternehmen</a>
      <a href="#kontakt">Kontakt</a>
      <a href="#datenschutz">Datenschutz</a>
      <a href="#impressum">Impressum</a>
    </nav>
  </header>

  <main id="content">
    <section class="hero">
      <div class="container hero-grid">
        <div class="hero-copy">
          <h1 class="hero-title">Finde dein perfektes Praktikum</h1>
          <p class="hero-subtitle">Teile und entdecke Praktika von Studierenden für Studierende.</p>

          <form class="filters" aria-label="Filter">
            <label class="field">
              <span class="sr-only">Ort eingeben</span>
              <input type="text" placeholder="Ort eingeben" />
            </label>
            <label class="field field-select">
              <span class="sr-only">Bereich wählen</span>
              <select>
                <option selected disabled>Bereich Wählen</option>
                <option>Softwareentwicklung</option>
                <option>Systemengineering</option>
                <option>Enterprise Architect</option>
                <option>Data Analyst</option>
              </select>
            </label>
          </form>

          <a class="btn btn-home" href="#top" aria-label="Home">
            <span aria-hidden="true">⌂</span>
            Home
          </a>
        </div>

        <div class="hero-media" aria-label="Hero Bild">
          <img class="hero-image" src="/hero.jpg" alt="Person mit rotem Rucksack blickt in den Himmel." />
        </div>
      </div>
    </section>

    <section id="unternehmen" class="section">
      <div class="container">
        <div class="cards-grid" aria-label="Unternehmen">
          <article class="company-card">
            <h2 class="company-title">Konzept Informationssysteme GmbH</h2>
            <div class="company-media">
              <img src="/konzept.png" alt="Konzept Logo" loading="lazy" />
            </div>
            <p class="company-text">
              IT-Dienstleister für individuelle Software, Prozessdigitalisierung und IT-Beratung.
            </p>
            <a class="btn btn-primary" href="#signup">Registriere für mehr</a>
          </article>

          <article class="company-card">
            <h2 class="company-title">Advantest Europe GmbH</h2>
            <div class="company-media">
              <img src="/advantest.png" alt="Advantest Logo" loading="lazy" />
            </div>
            <p class="company-text">
              Anbieter von Testsystemen für Halbleiter, Fokus auf Qualität, Automatisierung und Innovation.
            </p>
            <a class="btn btn-primary" href="#signup">Registriere für mehr</a>
          </article>
        </div>
      </div>
    </section>
  </main>

  <footer class="site-footer">
    <div class="container footer-inner">
      <nav class="footer-links" aria-label="Footer">
        <a id="kontakt" href="#kontakt">Kontakt</a>
        <a id="datenschutz" href="#datenschutz">Datenschutz</a>
        <a id="impressum" href="#impressum">Impressum</a>
      </nav>
      <p class="footer-copy">© 2025 Internship Finder</p>
    </div>
  </footer>
</template>