<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    class="btn normal-case font-bold transition-all duration-200 flex items-center justify-center gap-2"
    :class="[
      variantClass,
      sizeClass,
      roundClass,
      loading ? 'pointer-events-none opacity-80' : ''
    ]"
  >
    <span v-if="loading" class="loading loading-spinner loading-xs"></span>
    
    <BaseIcon v-if="icon && !loading" :name="icon" class="text-sm" />
    
    <slot />
  </button>
</template>

<script setup>
import { computed } from 'vue';
import BaseIcon from './BaseIcon.vue';

const props = defineProps({
  type: { type: String, default: 'button' },
  variant: { type: String, default: 'primary' }, // 'primary', 'accent', 'outline', 'ghost'
  size: { type: String, default: 'md' },         // 'sm', 'md', 'lg'
  round: { type: Boolean, default: false },     // true = rounded-full, false = rounded-xl
  disabled: { type: Boolean, default: false },
  loading: { type: Boolean, default: false },
  icon: { type: String, default: '' }            // Nom de l'icône si besoin
});

const variantClass = computed(() => {
  switch (props.variant) {
    case 'accent': return 'btn-accent text-white shadow-md shadow-accent/10 hover:shadow-accent/20';
    case 'outline': return 'btn-outline border-base-300 hover:bg-base-content hover:text-base-100';
    case 'ghost': return 'btn-ghost text-base-content/80';
    case 'danger': return 'btn-error text-white shadow-md shadow-error/10 hover:shadow-error/20';
    default: return 'btn-primary text-white'; // 'primary'
  }
});

const sizeClass = computed(() => {
  if (props.size === 'sm') return 'btn-sm h-9 min-h-0 px-4 text-xs';
  return 'h-11 min-h-0 px-6 text-sm'; // 'md' par défaut
});

const roundClass = computed(() => props.round ? 'rounded-full' : 'rounded-xl');
</script>