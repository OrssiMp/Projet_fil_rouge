<template>
  <footer class="footer  items-center p-6 bg-base-100 text-base-content border-t border-base-200">
    <div class="max-w-6xl w-full mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-sm">
      
      <div class="flex flex-col items-center sm:items-start gap-1">
        <span class="font-bold text-lg tracking-tight text-base-content">
          Mosalah
        </span>
        <p class="text-xs text-base-content/50">
          &copy; 2026 Mosalah. Tous droits réservés.
        </p>
      </div>

      <div class="flex gap-6 text-xs text-base-content/70">
        <router-link to="confidentialite" class="hover:text-green-500 hover:underline transition-all">
          Confidentialité
        </router-link>
        <a href="#" class="hover:text-green-500 hover:underline transition-all">
          Conditions
        </a>
        <a href="#" class="hover:text-green-500 hover:underline transition-all">
          Contact
        </a>
      </div>

    </div>
  </footer>
</template>
