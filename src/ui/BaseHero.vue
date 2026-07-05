<template>
  <section class="hero relative overflow-visible rounded-3xl transition-all duration-300"
    :class="[variantClass, paddingClass]">
    <div class="absolute inset-0 opacity-[0.03] pointer-events-none select-none">
      <svg class="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="dots" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.5" fill="currentColor" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dots)" />
      </svg>
    </div>

    <div class="hero-content w-full max-w-7xl flex-col lg:flex-row gap-12 z-10"
      :class="centered ? 'text-center' : 'items-start lg:items-center text-left'">

      <div class="max-w-2xl" :class="centered ? 'mx-auto' : ''">
        <slot name="badge" />

        <h1 class="text-3xl md:text-5xl font-black text-base-content tracking-tight leading-[1.1] mb-4">
          <slot name="title">{{ title }}</slot>
        </h1>

        <p class="text-sm md:text-lg text-base-content/60 font-medium leading-relaxed mb-8">
          <slot name="subtitle">{{ subtitle }}</slot>
        </p>

        <div class="flex flex-wrap gap-3" :class="centered ? 'justify-center' : ''">
          <slot name="actions" />
        </div>
      </div>

      <div v-if="$slots.visual" class="flex-1 w-full flex justify-center lg:justify-end animate-fade-in">
        <slot name="visual" />
      </div>

    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  title: { type: String, default: '' },
  subtitle: { type: String, default: '' },
  centered: { type: Boolean, default: false },
  variant: { type: String, default: 'default' }, // 'default', 'soft', 'accent', 'ghost'
  size: { type: String, default: 'md' }          // 'sm', 'md', 'lg'
});

const variantClass = computed(() => {
  switch (props.variant) {
    case 'soft': return 'bg-base-200/50 border border-base-200';
    case 'accent': return 'bg-accent/5 border border-accent/10 text-accent-content';
    case 'ghost': return 'bg-transparent border-none';
    default: return 'bg-base-100 border border-base-200 shadow-sm';
  }
});

const paddingClass = computed(() => {
  if (props.size === 'sm') return 'py-10 px-6';
  if (props.size === 'lg') return 'py-20 md:py-32 px-6';
  return 'py-12 md:py-16 px-6'; // 'md'
});
</script>