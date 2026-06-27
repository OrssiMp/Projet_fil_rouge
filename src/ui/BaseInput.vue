<template>
  <div class="form-control w-full">
    <label v-if="label" class="label pl-0 pt-0">
      <span class="label-text text-xs font-bold text-base-content/60 uppercase tracking-wider">{{ label }}</span>
    </label>

    <div class="relative flex items-center">
      <BaseIcon 
        v-if="icon" 
        :name="icon" 
        class="absolute left-4 text-base-content/40 text-sm pointer-events-none" 
      />
      
      <input
        :type="type"
        :placeholder="placeholder"
        v-model="model"
        class="input w-full bg-base-200/40 rounded-xl text-sm focus:outline-accent border border-base-200/60 focus:border-transparent h-11 transition-all duration-150 "
        :class="[
          icon ? 'pl-11' : 'pl-4',
          error ? 'border-error focus:outline-error ' : ''
        ]"
      />
    </div>

    <label v-if="error" class="label pl-0 pb-0">
      <span class="label-text-alt text-xs font-semibold text-error animate-fade-in">{{ error }}</span>
    </label>
  </div>
</template>

<script setup>
import BaseIcon from './BaseIcon.vue';

// Déclaration automatique du v-model réactif
const model = defineModel({ type: String, default: '' });

defineProps({
  label: { type: String, default: '' },
  type: { type: String, default: 'text' },
  placeholder: { type: String, default: '' },
  icon: { type: String, default: '' },
  error: { type: String, default: '' }
});
</script>