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
// Optimisé pour les plateformes SaaS, le recrutement (ATS) et la gestion d'entreprise.
const iconMapping = {
  // ==========================================
  // --- CORE RECRUTEMENT & TALENTS (ATS) ---
  // ==========================================
  'candidat': 'fa-solid fa-user-tie',
  'candidats': 'fa-solid fa-users',
  'talent': 'fa-solid fa-star',
  'offre': 'fa-solid fa-briefcase',
  'offres': 'fa-solid fa-briefcase',
  'job': 'fa-solid fa-briefcase',
  'malette': 'fa-solid fa-briefcase',
  'creer-offre': 'fa-solid fa-file-circle-plus',
  'recrutement': 'fa-solid fa-user-plus',
  'chasseur-tete': 'fa-solid fa-user-secret',
  'matching': 'fa-solid fa-handshake-angle',
  'recommandation': 'fa-solid fa-thumbs-up',

  // ==========================================
  // --- ETAPES DU PIPELINE & EVALUATION ---
  // ==========================================
  'inbox': 'fa-solid fa-inbox',
  'reçu': 'fa-solid fa-inbox',
  'tri': 'fa-solid fa-filter',
  'filtre': 'fa-solid fa-filter',
  'entretien': 'fa-solid fa-calendar-check',
  'entretiens': 'fa-solid fa-calendar-days',
  'schedule': 'fa-solid fa-calendar-days',
  'calendrier': 'fa-solid fa-calendar',
  'test-technique': 'fa-solid fa-laptop-code',
  'code': 'fa-solid fa-code',
  'evaluation': 'fa-solid fa-clipboard-question',
  'score': 'fa-solid fa-ranking-star',
  'offre-envoyee': 'fa-solid fa-file-signature',
  'embauche': 'fa-solid fa-circle-check',
  'refuse': 'fa-solid fa-circle-xmark',
  'archive': 'fa-solid fa-box-archive',

  // ==========================================
  // --- COMMUNICATION & NOTIFICATIONS ---
  // ==========================================
  'mail': 'fa-solid fa-envelope',
  'email': 'fa-solid fa-envelope',
  'enveloppe': 'fa-solid fa-envelope',
  'message': 'fa-solid fa-comment-dots',
  'messages': 'fa-solid fa-comments',
  'chat': 'fa-solid fa-comments',
  'invitation': 'fa-solid fa-paper-plane',
  'envoyer': 'fa-solid fa-paper-plane',
  'cloche': 'fa-solid fa-bell',
  'notification': 'fa-solid fa-bell',
  'notifications': 'fa-solid fa-bell',
  'telephone': 'fa-solid fa-phone',
  'visio': 'fa-solid fa-video',

  // ==========================================
  // --- UTILISATEURS & STRUCUTRE RH ---
  // ==========================================
  'user': 'fa-solid fa-user',
  'utilisateur': 'fa-solid fa-user',
  'profil': 'fa-solid fa-id-badge',
  'profile': 'fa-solid fa-id-badge',
  'cv': 'fa-solid fa-file-invoice',
  'portfolio': 'fa-solid fa-folder-open',
  'equipe': 'fa-solid fa-users-gear',
  'collaborateurs': 'fa-solid fa-users-gear',
  'users-gear': 'fa-solid fa-users-gear',
  'office': 'fa-solid fa-building',
  'entreprise': 'fa-solid fa-building',
  'batiment': 'fa-solid fa-building',
  'communaute': 'fa-solid fa-users-viewfinder',

  // ==========================================
  // --- ACTIONS, EDITIONS & CONTROLES ---
  // ==========================================
  'search': 'fa-solid fa-magnifying-glass',
  'recherche': 'fa-solid fa-magnifying-glass',
  'loupe': 'fa-solid fa-magnifying-glass',
  'plus': 'fa-solid fa-plus',
  'ajouter': 'fa-solid fa-plus',
  'modifier': 'fa-solid fa-pen-to-square',
  'edit': 'fa-solid fa-pen-to-square',
  'poubelle': 'fa-solid fa-trash',
  'supprimer': 'fa-solid fa-trash',
  'reglage': 'fa-solid fa-gear',
  'parametres': 'fa-solid fa-gear',
  'settings': 'fa-solid fa-gear',
  'logout': 'fa-solid fa-right-from-bracket',
  'deconnexion': 'fa-solid fa-right-from-bracket',
  'login': 'fa-solid fa-right-to-bracket',
  'lock': 'fa-solid fa-lock',
  'cadenas': 'fa-solid fa-lock',
  'unlock': 'fa-solid fa-lock-open',
  'link': 'fa-solid fa-link',
  'partager': 'fa-solid fa-share-nodes',
  'eye': 'fa-solid fa-eye',
  'oeil': 'fa-solid fa-eye',
  'eye-slash': 'fa-solid fa-eye-slash',
  'copier': 'fa-solid fa-copy',

  // ==========================================
  // --- DOCUMENTS, CLOUD & TELECHARGEMENT ---
  // ==========================================
  'document': 'fa-solid fa-file-lines',
  'file-lines': 'fa-solid fa-file-lines',
  'upload': 'fa-solid fa-cloud-arrow-up',
  'publier': 'fa-solid fa-cloud-arrow-up',
  'cloud-arrow-up': 'fa-solid fa-cloud-arrow-up',
  'download': 'fa-solid fa-download',
  'telecharger': 'fa-solid fa-download',
  'import': 'fa-solid fa-file-import',
  'export': 'fa-solid fa-file-export',

  // ==========================================
  // --- DATA, RAPPORTS & METRICS ---
  // ==========================================
  'dashboard': 'fa-solid fa-gauge',
  'tableau-de-bord': 'fa-solid fa-gauge',
  'statistiques': 'fa-solid fa-chart-simple',
  'analyses': 'fa-solid fa-chart-line',
  'arrow-trend-up': 'fa-solid fa-arrow-trend-up',
  'croissance': 'fa-solid fa-arrow-trend-up',
  'arrow-trend-down': 'fa-solid fa-arrow-trend-down',
  'target': 'fa-solid fa-bullseye',
  'objectif': 'fa-solid fa-bullseye',

  // ==========================================
  // --- CONTRATS, PLANS & FACTURATION ---
  // ==========================================
  'salaire': 'fa-solid fa-money-bill-wave',
  'argent': 'fa-solid fa-money-bill-wave',
  'facture': 'fa-solid fa-file-invoice-dollar',
  'invoice': 'fa-solid fa-file-invoice-dollar',
  'premium': 'fa-solid fa-crown',
  'pro': 'fa-solid fa-gem',
  'business': 'fa-solid fa-shield-halved',
  'shield-halved': 'fa-solid fa-shield-halved',
  'rocket': 'fa-solid fa-rocket',
  'zap': 'fa-solid fa-bolt',
  'rapide': 'fa-solid fa-bolt',

  // ==========================================
  // --- GEOLOCALISATION & CONTEXTE ---
  // ==========================================
  'localisation': 'fa-solid fa-location-dot',
  'location': 'fa-solid fa-location-dot',
  'pin': 'fa-solid fa-location-dot',
  'teletravail': 'fa-solid fa-house-laptop',
  'remote': 'fa-solid fa-house-laptop',
  'clock': 'fa-solid fa-clock',
  'temps-plein': 'fa-solid fa-business-time',

  // ==========================================
  // --- NAVIGATION ET UI CONTROLES ---
  // ==========================================
  'menu': 'fa-solid fa-bars',
  'hamburger': 'fa-solid fa-bars',
  'chevron-bas': 'fa-solid fa-chevron-down',
  'chevron-haut': 'fa-solid fa-chevron-up',
  'chevron-droite': 'fa-solid fa-chevron-right',
  'chevron-gauche': 'fa-solid fa-chevron-left',
  'close': 'fa-solid fa-xmark',
  'fermer': 'fa-solid fa-xmark',
  'plus-options': 'fa-solid fa-ellipsis-vertical',
  'drag-drop': 'fa-solid fa-grip-vertical',

  // ==========================================
  // --- FEEDBACKS, ETATS & ALERTES ---
  // ==========================================
  'info': 'fa-solid fa-circle-info',
  'about': 'fa-solid fa-circle-info',
  'validation': 'fa-solid fa-circle-check',
  'check': 'fa-solid fa-check',
  'success': 'fa-solid fa-circle-check',
  'succes': 'fa-solid fa-circle-check',
  'warning': 'fa-solid fa-triangle-exclamation',
  'erreur': 'fa-solid fa-triangle-exclamation',
  'danger': 'fa-solid fa-circle-exclamation',
  'help': 'fa-solid fa-circle-question',
  'aide': 'fa-solid fa-circle-question',
};

const iconClass = computed(() => {
  const cleanedName = props.name.toLowerCase().trim();
  
  // 1. On cherche d'abord dans notre mapping d'alias sémantiques
  if (iconMapping[cleanedName]) {
    return iconMapping[cleanedName];
  }
  
  // 2. Si l'utilisateur passe directement une classe brute FA (ex: "fa-solid fa-user" ou "fa-user")
  if (cleanedName.startsWith('fa-')) {
    // Si c'est juste "fa-user", on ajoute par défaut "fa-solid " devant pour sécuriser le rendu
    return cleanedName.includes(' ') ? cleanedName : `fa-solid ${cleanedName}`;
  }
  
  // 3. Fallback par défaut si rien n'est trouvé
  return 'fa-solid fa-circle-info';
});
</script>