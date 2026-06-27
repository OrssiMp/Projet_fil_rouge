<template>
  <div 
    class="relative overflow-hidden bg-base-200 transition-all duration-300"
    :class="[roundedClass]"
    :style="aspectRatioStyle"
  >
    <div 
      v-if="isLoading && !hasError" 
      class="absolute inset-0 animate-pulse bg-base-300 flex items-center justify-center text-base-content/20"
    >
      <BaseIcon name="dashboard" class="text-xl animate-spin" />
    </div>

    <img
      :src="currentSrc"
      :alt="alt || 'Illustration Mosalah'"
      :loading="priority ? 'eager' : 'lazy'"
      :decoding="priority ? 'sync' : 'async'"
      class="w-full h-full object-cover transition-all duration-500"
      :class="[
        isLoading ? 'opacity-0 scale-95' : 'opacity-100 scale-100',
        hasError ? 'object-contain p-4 opacity-50' : ''
      ]"
      @load="onLoad"
      @error="onError"
    />
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import BaseIcon from './BaseIcon.vue';

const props = defineProps({
  src: { type: String, required: true },
  alt: { type: String, required: true },
  ratio: { type: String, default: '16/9' },      // Ratios communs : '1/1', '4/3', '16/9', 'auto'
  priority: { type: Boolean, default: false },   // true pour les images au-dessus de la flottaison (SEO/LCP)
  rounded: { type: String, default: 'xl' },      // 'none', 'md', 'xl', '2xl', 'full'
  fallbackSrc: { type: String, default: '/images/placeholder-mosalah.svg' } // Image par défaut en cas d'erreur
});

const isLoading = ref(true);
const hasError = ref(false);
const currentSrc = ref(props.src);

// Surveiller les changements de source (ex: si l'image change dynamiquement)
watch(() => props.src, (newSrc) => {
  currentSrc.value = newSrc;
  isLoading.value = true;
  hasError.value = false;
});

const onLoad = () => {
  isLoading.value = false;
};

const onError = () => {
  isLoading.value = false;
  hasError.value = true;
  currentSrc.value = props.fallbackSrc;
};

// Injection du ratio CSS moderne
const aspectRatioStyle = computed(() => ({
  aspectRatio: props.ratio
}));

// Classes d'arrondi
const roundedClass = computed(() => {
  switch (props.rounded) {
    case 'none': return 'rounded-none';
    case 'md': return 'rounded-md';
    case '2xl': return 'rounded-2xl';
    case '3xl': return 'rounded-3xl';
    case 'full': return 'rounded-full';
    default: return 'rounded-xl'; // 'xl' par défaut
  }
});
</script>