<template>
  <RouterLink :to="`/register/${title.toLowerCase()}`" @click="handleSelect" class="block h-full">
    <BaseCard
      hoverable
      density="spacious"
      class="group flex flex-col justify-between h-full min-h-[340px] text-left cursor-pointer border-2 hover:border-emerald-500"
    >
      <div>
        <div class="w-12 h-12 rounded-xl bg-base-200/60 flex items-center justify-center text-xl text-base-content/70 group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-colors duration-300 mb-6">
          <BaseIcon :name="icon" />
        </div>

        <h3 class="text-xl font-black text-base-content tracking-tight mb-4 group-hover:text-emerald-700 transition-colors">
          {{ title }}
        </h3>

        <ul class="space-y-3 font-medium">
          <li 
            v-for="(feature, index) in features" 
            :key="index" 
            class="flex items-center gap-3 text-sm text-base-content/70"
          >
            <BaseIcon name="validation" class="text-emerald-500 shrink-0 text-xs" />
            <span>{{ feature }}</span>
          </li>
        </ul>
      </div>
    </BaseCard>
  </RouterLink>
</template>

<script setup>

const props = defineProps({
  title: { type: String, required: true },
  icon: { type: String, required: true },
  features: { type: Array, required: true }
});

const emit = defineEmits(['select']);

function handleSelect() {
  console.log(`Selected account type: ${props.title}`);
  emit('select', props.title);
}
</script>