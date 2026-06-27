<template>
  <!-- On applique dynamiquement l'objet de classes calculé -->
  <button :class="['btn', buttonClasses]" :type="props.htmlType">
    <base-icon v-if="props.icon" :name="props.icon" class="mr-2" />
    <slot></slot>
    <base-icon v-if="props.icon && props.iconPosition === 'right'" :name="props.icon" class="ml-2" />
  </button>
</template>

<script setup>
import { computed } from 'vue';
import BaseIcon from './BaseIcon.vue';

const props = defineProps({
  type: {
    type: String,
    required: false,
    default: 'ghost'
  },
  icon: {
    type: String,
    required: false,
    default: ''
  },
  iconPosition: {
    type: String,
    required: false,
    default: 'left'
  },
  htmlType: {
    type: String,
    required: false,
    default: 'button'
  },
});

const buttonClasses = computed(() => {
  // Ici, on mappe ton type personnalisé vers la VRAIE classe utilitaire daisyUI.
  // Comme tu voulais que 'primary' et 'success' utilisent la couleur 'accent', 
  // on leur donne directement la classe 'btn-accent'.
  const mapping = {
    primary: 'bg-green-400 text-white', 
    success: 'btn-accent',
    info:    'btn-info',
    danger:  'btn-error',   // Note : daisyUI utilise 'btn-error' au lieu de 'btn-danger'
    warning: 'btn-warning',
    ghost:   'btn-ghost'
  };

  // Sécurité : si tu passes un type qui n'est pas dans le dictionnaire (ex: 'outline'),
  // on génère 'btn-outline' à la volée.
  return mapping[props.type] || `btn-${props.type}`;
});
</script>