<template>
  <i :class="[iconClass, 'inline-block select-none']" aria-hidden="true"></i>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  name: {
    type: String,
    required: true,
    default: 'info'
  }
});

// Le dictionnaire d'alias Font Awesome (Version 6 Free Solid)
const iconMapping = {
  // --- FORMULAIRES & UTILISATEURS ---
  'user': 'fa-solid fa-user',
  'utilisateur': 'fa-solid fa-user',
  'candidat': 'fa-solid fa-user-tie',
  'mail': 'fa-solid fa-envelope',
  'email': 'fa-solid fa-envelope',
  'lock': 'fa-solid fa-lock',
  'cadenas': 'fa-solid fa-lock',
  'office': 'fa-solid fa-building',
  'entreprise': 'fa-solid fa-building',
  'batiment': 'fa-solid fa-building',

  // --- ACTIONS & RECHERCHE ---
  'search': 'fa-solid fa-magnifying-glass',
  'recherche': 'fa-solid fa-magnifying-glass',
  'loupe': 'fa-solid fa-magnifying-glass',
  'validation': 'fa-solid fa-circle-check',
  'check': 'fa-solid fa-check',
  'succes': 'fa-solid fa-circle-check',
  'plus': 'fa-solid fa-plus',
  'modifier': 'fa-solid fa-pen-to-square',
  'poubelle': 'fa-solid fa-trash',
  'reglage': 'fa-solid fa-gear',
  'parametres': 'fa-solid fa-gear',
  'logout': 'fa-solid fa-right-from-bracket',

  // --- LANDING PAGES & COCHETS ---
  'zap': 'fa-solid fa-bolt',
  'rapide': 'fa-solid fa-bolt',
  'clock': 'fa-solid fa-clock',
  'gain-temps': 'fa-solid fa-clock',
  'malette': 'fa-solid fa-briefcase',
  'job': 'fa-solid fa-briefcase',
  'offre': 'fa-solid fa-file-invoice',
  'publier': 'fa-solid fa-upload',
  'localisation': 'fa-solid fa-location-dot',
  'pin': 'fa-solid fa-location-dot',
  'statistiques': 'fa-solid fa-chart-simple',
  'dashboard': 'fa-solid fa-gauge',

  // --- NAVIGATION ET CONTROLES ---
  'menu': 'fa-solid fa-bars',
  'hamburger': 'fa-solid fa-bars',
  'chevron-bas': 'fa-solid fa-chevron-down',
  'chevron-droite': 'fa-solid fa-chevron-right',
  'chevron-gauche': 'fa-solid fa-chevron-left',
  'close': 'fa-solid fa-xmark',
  'fermer': 'fa-solid fa-xmark',
  'about': 'fa-solid fa-info-circle',

  // --- ENTREPRISE / DOCUMENTS ---
  'document': 'fa-solid fa-file-alt',
  'invoice': 'fa-solid fa-file-invoice',
  'file-invoice': 'fa-solid fa-file-invoice',
  'download': 'fa-solid fa-download',
  'file-lines': 'fa-solid fa-file-lines',
  'cloud-arrow-up': 'fa-solid fa-cloud-arrow-up',
  'users-gear': 'fa-solid fa-users-gear',
  'file-invoice-dollar': 'fa-solid fa-file-invoice-dollar',
  'rocket': 'fa-solid fa-rocket',
  'shield-halved': 'fa-solid fa-shield-halved',
  'eye': 'fa-regular fa-eye',
  'comments': 'fa-regular fa-comments',
  'arrow-trend-up': 'fa-solid fa-arrow-trend-up',
  'arrow-trend-down': 'fa-solid fa-arrow-trend-down',
  'magnifying-glass-minus': 'fa-solid fa-magnifying-glass-minus',
  'profile': 'fa-solid fa-id-badge',
  'profil': 'fa-solid fa-id-badge',
  'location': 'fa-solid fa-location-dot',
  'schedule': 'fa-solid fa-calendar-days',
  'cloche': 'fa-solid fa-bell',
  'erreur': 'fa-solid fa-triangle-exclamation',
  'info': 'fa-solid fa-circle-info',
  'success': 'fa-solid fa-circle-check',
  'warning': 'fa-solid fa-triangle-exclamation',
};

const iconClass = computed(() => {
  const cleanedName = props.name.toLowerCase().trim();
  // On retourne la classe mappée, ou si tu tapes une classe FA brute (ex: "fa-user"), on la laisse passer
  return iconMapping[cleanedName] || (cleanedName.startsWith('fa-') ? cleanedName : 'fa-solid fa-circle-info');
});
</script>