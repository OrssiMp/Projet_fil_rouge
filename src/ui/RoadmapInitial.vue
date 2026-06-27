<template>
  <ul :class="['steps w-full', directionClasses, roadmapClasses]">
    <slot></slot>
  </ul>
</template>

<script setup>
import { computed, provide, ref } from 'vue';

const props = defineProps({
  // 'default' = ronds avec numéros, 'progress' = barres continues
  type: {
    type: String,
    required: false,
    default: 'default'
  },
  // La couleur : primary, success, info, warning, error, neutral
  theme: {
    type: String,
    required: false,
    default: 'primary'
  },
  // L'étape active (commence à 1)
  currentStep: {
    type: Number,
    required: false,
    default: 1
  },
  // L'orientation : 'horizontal', 'vertical', ou 'responsive' (vertical sur mobile, horizontal sur PC)
  direction: {
    type: String,
    required: false,
    default: 'responsive'
  }
});

// Partage des props avec les enfants (RoadmapStep)
provide('roadmapProps', computed(() => ({
  type: props.type,
  theme: props.theme,
  currentStep: props.currentStep
})));

// Gestion intelligente des classes d'orientation
const directionClasses = computed(() => {
  const mapping = {
    horizontal: 'steps-horizontal',
    vertical: 'steps-vertical',
    // Le mode magique : vertical par défaut, horizontal dès le breakpoint 'md' (768px)
    responsive: 'steps-vertical md:steps-horizontal'
  };

  return mapping[props.direction] || mapping.responsive;
});

const roadmapClasses = computed(() => {
  return props.type === 'progress' ? 'steps-progress' : '';
});
</script>