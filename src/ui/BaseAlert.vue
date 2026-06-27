<template>
  <Transition name="fade-scale">
    <div 
      v-if="visible" 
      class="flex items-start gap-3 p-4 rounded-2xl border text-sm font-medium shadow-sm transition-all duration-300"
      :class="[alertClasses]"
      role="alert"
    >
      <BaseIcon 
        v-slot="default" 
        :name="iconName" 
        class="text-lg shrink-0 mt-0.5" 
      />

      <div class="flex-grow leading-relaxed">
        <slot />
      </div>

      <button
        v-if="dismissible" 
        type="button" 
        @click="dismiss"
        class="p-0.5 rounded-lg transition-colors hover:bg-black/5 dark:hover:bg-white/10 shrink-0 -mt-0.5"
        aria-label="Fermer l'alerte"
      >
        <BaseIcon name="close" class="text-base opacity-70 hover:opacity-100" />
      </button>
    </div>
  </Transition>
</template>

<script setup>
import { ref, computed } from 'vue';
import BaseIcon from './BaseIcon.vue';


const props = defineProps({
  type: { 
    type: String, 
    default: 'info', 
    validator: (value) => ['success', 'error', 'warning', 'info'].includes(value)
  },
  dismissible: { type: Boolean, default: false }
});

const emit = defineEmits(['close']);
const visible = ref(true);

const dismiss = () => {
  visible.value = false;
  emit('close');
};

// Mappage des icônes selon le type d'alerte
const iconName = computed(() => {
  switch (props.type) {
    case 'success': return 'validation'; // ou 'check-circle'
    case 'error': return 'lock';       // ou 'alert-circle'
    case 'warning': return 'attention';
    default: return 'info';
  }
});

// Gestion des styles Tailwind / DaisyUI selon le type
const alertClasses = computed(() => {
  switch (props.type) {
    case 'success': 
      return 'bg-emerald-50 border-emerald-200 text-emerald-800 ';
    case 'error': 
      return 'bg-rose-50 border-rose-200 text-rose-800 ';
    case 'warning': 
      return 'bg-amber-50 border-amber-200 text-amber-800 ';
    default: // info
      return 'bg-blue-50 border-blue-200 text-blue-800';
  }
});
</script>

<style scoped>
.fade-scale-enter-active,
.fade-scale-leave-active {
  transition: all 0.25s ease-out;
}
.fade-scale-enter-from {
  opacity: 0;
  transform: scale(0.95);
}
.fade-scale-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>