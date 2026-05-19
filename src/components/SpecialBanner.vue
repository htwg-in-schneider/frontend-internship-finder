<script setup>
import { ref } from 'vue';

defineProps({
    text: {
        type: String,
        default: 'Premium-Mitgliedschaft jetzt entdecken!',
    }
});

const showBanner = ref(true);

function closeBanner() {
    showBanner.value = false;
}
</script>

<template>
    <div id="specialbanner" class="text-center py-2 text-white" v-if="showBanner">
        {{ text }}&nbsp;&nbsp;
        <button type="button" class="btn btn-dark btn-sm" @click="closeBanner">Verstanden!</button>
    </div>
</template>

<style scoped>
#specialbanner {
    background-color: #1eb8cc;
    color: white;
}
</style>