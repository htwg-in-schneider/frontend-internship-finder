<script setup>
import { useToastStore } from '@/stores/toast'

const toastStore = useToastStore()

function iconClass(type) {
  if (type === 'danger') return 'bi-exclamation-circle-fill'
  return 'bi-check-circle-fill'
}
</script>

<template>
  <div class="toast-stack">
    <div
      v-for="toast in toastStore.toasts"
      :key="toast.id"
      class="toast-item shadow-sm"
      :class="`toast-${toast.type}`"
      role="alert"
    >
      <i class="bi me-2" :class="iconClass(toast.type)"></i>
      <span>{{ toast.message }}</span>
      <button type="button" class="btn-close ms-3" @click="toastStore.remove(toast.id)"></button>
    </div>
  </div>
</template>

<style scoped>
.toast-stack {
  position: fixed;
  top: 1rem;
  right: 1rem;
  z-index: 1100;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  max-width: 90vw;
}

.toast-item {
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  background-color: #fff;
  border: 1px solid rgba(45, 81, 118, 0.18);
  border-left: 4px solid #1eb8cc;
  font-size: 0.95rem;
  animation: toast-in 0.25s ease;
}

.toast-success {
  border-left-color: #1eb8cc;
}

.toast-success .bi {
  color: #1eb8cc;
}

.toast-danger {
  border-left-color: #dc3545;
}

.toast-danger .bi {
  color: #dc3545;
}

@keyframes toast-in {
  from { opacity: 0; transform: translateX(20px); }
  to { opacity: 1; transform: translateX(0); }
}
</style>
