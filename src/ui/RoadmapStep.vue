<template>

  <li

    :class="['step cursor-pointer transition-all duration-300', stepClasses]"

    :data-content="stepIndex"

    @click="emit('select', stepIndex)"

  >

    <div :class="['step-label text-left ml-4 p-3 rounded-xl w-full transition-colors', isActive ? 'bg-white shadow-sm font-bold text-accent' : 'text-base-content/60']">

      <slot></slot>

    </div>

  </li>

</template>



<script setup>

import { computed, inject, getCurrentInstance, onMounted, ref } from 'vue';



const roadmapProps = inject('roadmapProps');

const emit = defineEmits(['select']);

const stepIndex = ref(0);



onMounted(() => {

  const instance = getCurrentInstance();

  if (instance && instance.parent) {

    const siblings = Array.from(instance.parent.vnode.el.children).filter(el => el.tagName === 'LI');

    stepIndex.value = siblings.indexOf(instance.vnode.el) + 1;

  }

});



// Est-ce l'étape sur laquelle l'utilisateur a cliqué ?

const isActive = computed(() => stepIndex.value === roadmapProps.value.currentStep);



// Est-ce une étape déjà complétée ?

const isPast = computed(() => stepIndex.value <= roadmapProps.value.currentStep);



const stepClasses = computed(() => {

  const theme = roadmapProps.value.theme;

  return isPast.value ? `step-${theme}` : '';

});

</script> 

