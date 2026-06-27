<template>
  <div 
    class="card bg-base-100 border border-base-200 transition-all duration-200"
    :class="[
      hoverable ? 'hover:border-base-300 hover:shadow-sm' : 'shadow-sm',
      paddingClass
    ]"
  >
    <div v-if="$slots.header || title" class="flex items-center justify-between border-b border-base-200 pb-4 mb-4">
      <slot name="header">
        <h3 class="font-black text-base-content tracking-tight">{{ title }}</h3>
      </slot>
    </div>

    <div class="flex-1">
      <slot />
    </div>

    <div v-if="$slots.footer" class="border-t border-base-200 pt-4 mt-4 flex justify-end gap-2">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  hoverable: {
    type: Boolean,
    default: false
  },
  density: {
    type: String,
    default: 'normal' // 'compact', 'normal', 'spacious'
  }
});

const paddingClass = computed(() => {
  if (props.density === 'compact') return 'p-4';
  if (props.density === 'spacious') return 'p-8';
  return 'p-5 md:p-6'; // Normal par défaut
});
</script>