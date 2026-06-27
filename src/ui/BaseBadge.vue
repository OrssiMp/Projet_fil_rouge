<template>
  <span :class="['badge', badgeClasses]">
    <slot></slot>
  </span>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  // Le type sémantique (primary, success, danger, etc.)
  type: {
    type: String,
    required: false,
    default: 'neutral' // Classe daisyUI par défaut
  },
  // Variante : pour avoir un badge avec juste les bordures
  outline: {
    type: Boolean,
    required: false,
    default: false
  },
  // Taille du badge : 'xs', 'sm', 'md', 'lg'
  size: {
    type: String,
    required: false,
    default: 'md'
  }
});

const badgeClasses = computed(() => {
  // 1. Mapping des types vers les vraies classes daisyUI
  const typeMapping = {
    primary: 'badge-primary',
    success: 'badge-success',
    info:    'badge-info',
    danger:  'badge-error',   // daisyUI utilise badge-error
    warning: 'badge-warning',
    neutral: 'badge-neutral'
  };

  // Récupération de la classe de type (sécurité si type custom)
  const typeClass = typeMapping[props.type] || `badge-${props.type}`;

  // 2. Gestion de la taille (daisyUI gère badge-xs, badge-sm, badge-lg)
  const sizeClass = props.size !== 'md' ? `badge-${props.size}` : '';

  // 3. Gestion du mode outline
  const outlineClass = props.outline ? 'badge-outline' : '';

  // On retourne toutes les classes sous forme de chaîne ou tableau
  return [typeClass, sizeClass, outlineClass].filter(Boolean).join(' ');
});
</script>