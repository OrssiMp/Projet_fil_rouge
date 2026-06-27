<template>
  <div class="min-h-screen bg-base-200/50 flex flex-col font-body-md select-none">
    
    <header class="p-4 md:p-6 flex justify-between items-center max-w-7xl w-full mx-auto">
      <RouterLink to="/" class="text-2xl font-black tracking-tight text-accent">
        Mosalah
      </RouterLink>
      
      <RouterLink to="/" class="btn btn-ghost shadow btn-sm rounded-xl gap-2 text-xs font-semibold">
        <BaseIcon  name="chevron-gauche" class="text-[10px]" />
        Retour à l'accueil
      </RouterLink>
    </header>

    <main class="flex-1 flex items-center justify-center p-4">
      <slot />
    </main>

    <footer class="p-6 text-center text-xs text-base-content/40 font-medium">
      &copy; 2026 Mosalah. Tous droits réservés.
    </footer>
    
  </div>
</template>

