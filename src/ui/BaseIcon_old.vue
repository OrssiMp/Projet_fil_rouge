<template>
  <span class="material-symbols-outlined select-none" aria-hidden="true">
    {{ iconName }}
  </span>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  name: {
    type: String,
    required: false,
    default: 'info'
  }
});

// Le dictionnaire ultime - Plus de 100 icônes vérifiées pour Mosalah
const iconMapping = {
  // --- BASE & NAVIGATION ---
  'accueil': 'home',
  'home': 'home',
  'menu': 'menu',
  'fermer': 'close',
  'close': 'close',
  'back': 'arrow_back',
  'fleche-retour': 'arrow_back',
  'fleche-droite': 'arrow_forward',
  'fleche-haut': 'arrow_upward',
  'fleche-bas': 'arrow_downward',
  'chevron-droite': 'chevron_right',
  'chevron-gauche': 'chevron_left',
  'chevron-bas': 'expand_more',
  'chevron-haut': 'expand_less',
  'plus': 'add',
  'moins': 'remove',
  'info': 'info',
  'aide': 'help',

  // --- MONDE DE L'ENTREPRISE & RECRUTEMENT (MOCKUPS-READY) ---
  'entreprise': 'corporate_fare',
  'office': 'corporate_fare',
  'batiment': 'domain',
  'malette': 'work',
  'job': 'work',
  'offre': 'post_add',
  'publier': 'publish',
  'recruter': 'group_add',
  'talents': 'psychology',
  'contrat': 'description',
  'salaire': 'payments',
  'argent': 'monetization_on',
  'badge': 'badge',
  'analytics': 'analytics',
  'statistiques': 'bar_chart',
  'pipeline': 'account_tree',
  'dashboard': 'dashboard',

  // --- MONDE DU CANDIDAT ---
  'user': 'person',
  'utilisateur': 'person',
  'candidat': 'person_search',
  'cv': 'contact_page',
  'profil': 'account_circle',
  'avatar': 'account_circle',
  'diplome': 'school',
  'etudes': 'school',
  'competence': 'star',
  'recherche-emploi': 'find_in_page',
  'postuler': 'send_to_mobile',
  'suivi': 'track_changes',

  // --- ACTIONS & INTERACTIONS ---
  'recherche': 'search',
  'search': 'search',
  'loupe': 'search',
  'reglage': 'settings',
  'parametres': 'settings',
  'poubelle': 'delete',
  'modifier': 'edit',
  'crayon': 'edit',
  'sauvegarder': 'save',
  'partager': 'share',
  'favoris': 'favorite',
  'coeur': 'favorite',
  'bookmark': 'bookmark',
  'cloche': 'notifications',
  'notification': 'notifications',
  'mail': 'mail',
  'email': 'mail',
  'telephone': 'call',
  'phone': 'call',
  'lock': 'lock',
  'cadenas': 'lock',
  'deverrouiller': 'lock_open',
  'oeil-ouvert': 'visibility',
  'oeil-ferme': 'visibility_off',
  'telecharger': 'download',
  'upload': 'upload',
  'filtre': 'filter_alt',

  // --- VALIDATIONS & MESSAGES ---
  'validation': 'check_circle',
  'check': 'check',
  'succes': 'check_circle',
  'erreur': 'error',
  'warning': 'warning',
  'danger': 'report',
  'bloque': 'block',
  'attente': 'pending',
  'chrono': 'schedule',
  'temps': 'history',
  'gain-temps': 'update',
  'zap': 'bolt',
  'rapide': 'bolt',

  // --- GEOLOCALISATION & DIVERS ---
  'localisation': 'location_on',
  'map': 'map',
  'pin': 'location_on',
  'ville': 'location_city',
  'monde': 'language',
  'web': 'language',
  'lien': 'link',
  'calendar': 'calendar_month',
  'date': 'calendar_month',
  'copier': 'content_copy',
  'logout': 'logout',
  'deconnexion': 'logout',
  'login': 'login',
  'connexion': 'login'
};

const iconName = computed(() => {
  // Retourne l'alias s'il existe, sinon le nom brut (au cas où tu tapes un nom officiel directement)
  return iconMapping[props.name.toLowerCase().trim()] || props.name;
});
</script>