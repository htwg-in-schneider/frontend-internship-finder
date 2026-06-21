<script setup>
import FooterLink from './FooterLink.vue';
</script>

<template>
    <footer class="text-center py-4 mt-4">
        <nav class="mb-2">
            <FooterLink text="Kontakt" label="Kontakt" href="/kontakt" />
            <span aria-hidden="true">|</span>
            <FooterLink text="Datenschutz" label="Datenschutz" href="/datenschutz" />
            <span aria-hidden="true">|</span>
            <FooterLink text="Impressum" label="Impressum" href="/impressum" />
        </nav>
        <p class="text-secondary mb-0">&copy; 2025 Internship Finder</p>
    </footer>
</template>

<style scoped></style>