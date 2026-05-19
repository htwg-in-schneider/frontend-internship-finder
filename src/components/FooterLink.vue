<script setup>
const props = defineProps({
  text: {
    type: String,
    required: true
  },
  label: {
    type: String,
    required: false,
    default: ''
  },
  href: {
    type: String,
    required: false,
    default: '#'
  },
});
</script>

<template>
  <a :href="href" class="footer-link" :aria-label="label">
    {{ text }}
  </a>
</template>

<style scoped>
.footer-link {
  color: #555;
  text-decoration: none;
  margin: 0 0.5rem;
}

.footer-link:hover {
  color: #1eb8cc;
}
</style>