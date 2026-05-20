<script setup>
import { useBannerStore } from '@/stores/banner';
import Button from '@/components/Button.vue';

const bannerStore = useBannerStore();

defineProps({
    text: {
        type: String,
        default: 'Premium-Mitgliedschaft jetzt entdecken!',
    }
});
</script>

<template>
    <div id="specialbanner" class="text-center py-2 text-white" v-if="bannerStore.isVisible">
        {{ text }}&nbsp;&nbsp;
        <Button variant="dark" @click="bannerStore.hideBanner">Verstanden!</Button>
    </div>
</template>

<style scoped>
#specialbanner {
    background-color: #1eb8cc;
    color: white;
}
</style>