<script setup>
const props = defineProps({
  type: { type: String, default: 'button' },
  variant: { type: String, default: 'accent' },
  onClick: { type: Function, default: null }
});

const buttonClass = `btn btn-${props.variant}`;
</script>

<template>
  <button :type="type" :class="buttonClass" @click="onClick">
    <slot />
  </button>
</template>

<style scoped>
.btn {
  border-radius: 30px;
}

.btn-accent {
  background-color: #1eb8cc;
  color: white;
  border-radius: 30px;
  padding: 0.5rem 1.5rem;
  transition: 0.3s;
}

.btn-accent:hover {
  background-color: #1aa0b3;
  color: #fff;
}
</style>