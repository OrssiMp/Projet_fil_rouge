<template>
  <div class="text-center mb-12">
    <h2 class="text-3xl md:text-4xl font-extrabold text-base-content mb-4">
      <slot name="title"></slot>
    </h2>
    <p class="text-base-content/60 max-w-2xl mx-auto text-sm md:text-base">
      <slot name="subtitle"></slot>
    </p>
  </div>
</template>