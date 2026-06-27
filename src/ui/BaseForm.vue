<template>
  <form @submit.prevent="handleSubmit" class="w-full">
    <div v-if="error" class="alert alert-error mb-6 rounded-xl shadow-sm flex items-start gap-3 p-4 text-sm font-semibold text-error-content animate-fade-in">
      <BaseIcon name="lock" class="text-lg shrink-0 mt-0.5" />
      <span>{{ error }}</span>
    </div>

    <div v-if="success" class="alert alert-success mb-6 rounded-xl shadow-sm flex items-start gap-3 p-4 text-sm font-semibold text-success-content animate-fade-in">
      <BaseIcon name="validation" class="text-lg shrink-0 mt-0.5" />
      <span>{{ success }}</span>
    </div>

    <div 
      class="grid grid-cols-1 gap-y-5 gap-x-4 mb-8"
      :class="colsClass"
    >
      <slot />
    </div>

    <div 
      v-if="$slots.actions" 
      class="flex flex-col sm:flex-row gap-3"
      :class="actionsAlignClass"
    >
      <slot name="actions" />
    </div>
  </form>
</template>

<script setup>
import { computed } from 'vue';
import BaseIcon from './BaseIcon.vue';

const props = defineProps({
  cols: { type: [String, Number], default: 1 },       // Nombre de colonnes sur grand écran (1, 2, 3)
  alignActions: { type: String, default: 'end' },     // 'start', 'center', 'end', 'full'
  error: { type: String, default: '' },               // Message d'erreur global de l'API
  success: { type: String, default: '' }              // Message de succès global
});

const emit = defineEmits(['submit']);

const handleSubmit = () => {
  emit('submit');
};

// Gère dynamiquement la grille responsive
const colsClass = computed(() => {
  const c = Number(props.cols);
  if (c === 2) return 'md:grid-cols-2';
  if (c === 3) return 'md:grid-cols-3';
  return 'grid-cols-1';
});

// Gère l'alignement des boutons d'actions
const actionsAlignClass = computed(() => {
  switch (props.alignActions) {
    case 'start': return 'justify-start';
    case 'center': return 'justify-center';
    case 'full': return 'child-w-full'; // Pour forcer les boutons à prendre 100% de largeur
    default: return 'justify-end'; // 'end' par défaut
  }
});
</script>