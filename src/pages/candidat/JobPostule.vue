<template>
  <div class="max-w-7xl mx-auto space-y-8 animate-fade-in-up pb-20">
    
    <!-- HEADER & STATS -->
    <header class="space-y-6">
      <div>
        <h1 class="text-3xl font-black text-base-content tracking-tight">Espace Candidat</h1>
        <p class="text-sm font-semibold text-base-content/60 mt-1">Suivez vos postulations et gérez vos annonces de recherche d'emploi.</p>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-5 gap-4">
        <!-- Stats Cards minimalistes -->
        <div class="bg-base-100 p-4 rounded-2xl border border-base-200 shadow-sm flex flex-col gap-2">
          <div class="flex justify-between items-start">
            <span class="text-xs font-black uppercase text-base-content/50">Envoyées</span>
            <div class="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center"><i class="fa-solid fa-paper-plane text-sm"></i></div>
          </div>
          <span class="text-2xl font-black">24</span>
        </div>
        <div class="bg-base-100 p-4 rounded-2xl border border-base-200 shadow-sm flex flex-col gap-2">
          <div class="flex justify-between items-start">
            <span class="text-xs font-black uppercase text-base-content/50">En attente</span>
            <div class="w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center"><i class="fa-solid fa-hourglass-half text-sm"></i></div>
          </div>
          <span class="text-2xl font-black">12</span>
        </div>
        <div class="bg-base-100 p-4 rounded-2xl border border-base-200 shadow-sm flex flex-col gap-2">
          <div class="flex justify-between items-start">
            <span class="text-xs font-black uppercase text-base-content/50">Entretiens</span>
            <div class="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center"><i class="fa-regular fa-calendar-check text-sm"></i></div>
          </div>
          <span class="text-2xl font-black">3</span>
        </div>
        <div class="bg-base-100 p-4 rounded-2xl border border-base-200 shadow-sm flex flex-col gap-2">
          <div class="flex justify-between items-start">
            <span class="text-xs font-black uppercase text-base-content/50">Acceptées</span>
            <div class="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center"><i class="fa-solid fa-circle-check text-sm"></i></div>
          </div>
          <span class="text-2xl font-black">1</span>
        </div>
        <div class="bg-base-100 p-4 rounded-2xl border border-base-200 shadow-sm flex flex-col gap-2">
          <div class="flex justify-between items-start">
            <span class="text-xs font-black uppercase text-base-content/50">Refusées</span>
            <div class="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center"><i class="fa-solid fa-circle-xmark text-sm"></i></div>
          </div>
          <span class="text-2xl font-black">8</span>
        </div>
      </div>
    </header>

    <!-- MAIN TABS (Candidatures vs Demandes) -->
    <div class="flex gap-4 border-b border-base-200 pb-px">
      <button 
        @click="activeMainTab = 'candidatures'" 
        class="pb-3 text-sm font-black transition-colors relative"
        :class="activeMainTab === 'candidatures' ? 'text-accent' : 'text-base-content/50 hover:text-base-content'"
      >
        Mes candidatures
        <div v-if="activeMainTab === 'candidatures'" class="absolute bottom-0 left-0 w-full h-1 bg-accent rounded-t-full"></div>
      </button>
      <button 
        @click="activeMainTab = 'demandes'" 
        class="pb-3 text-sm font-black transition-colors relative"
        :class="activeMainTab === 'demandes' ? 'text-accent' : 'text-base-content/50 hover:text-base-content'"
      >
        Mes demandes d'emploi
        <div v-if="activeMainTab === 'demandes'" class="absolute bottom-0 left-0 w-full h-1 bg-accent rounded-t-full"></div>
      </button>
    </div>

    <!-- ==========================================
         VUE 1 : MES CANDIDATURES
    =========================================== -->
    <section v-if="activeMainTab === 'candidatures'" class="space-y-6">
      
      <!-- Filtres & Sous-onglets -->
      <div class="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4">
        <!-- Scroll horizontal pour les onglets sur mobile -->
        <div class="overflow-x-auto w-full xl:w-auto pb-2 xl:pb-0 hide-scrollbar">
          <div class="flex gap-2">
            <button v-for="tab in statusTabs" :key="tab.id" 
              class="badge badge-lg border-none font-bold px-4 py-3 whitespace-nowrap cursor-pointer transition-all"
              :class="activeStatus === tab.id ? 'bg-base-content text-base-100 shadow-md' : 'bg-base-200 text-base-content/70 hover:bg-base-300'">
              {{ tab.label }} <span v-if="tab.count" class="ml-2 opacity-50 text-xs">{{ tab.count }}</span>
            </button>
          </div>
        </div>

        <div class="flex gap-2 w-full xl:w-auto shrink-0">
          <div class="join w-full sm:w-auto">
            <input class="input input-sm input-bordered join-item w-full sm:w-64 focus:border-accent" placeholder="Rechercher une entreprise..." />
            <select class="select select-sm select-bordered join-item hidden sm:block focus:border-accent font-semibold">
              <option disabled selected>Domaine</option>
              <option>BTP / Construction</option>
              <option>Santé</option>
              <option>Informatique</option>
              <option>Commerce</option>
            </select>
            <button class="btn btn-sm btn-neutral join-item"><i class="fa-solid fa-magnifying-glass"></i></button>
          </div>
        </div>
      </div>

      <!-- Liste des cartes -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <!-- Carte Candidature (Exemple 1 : BTP) -->
        <div class="bg-base-100 rounded-2xl border border-base-200 shadow-sm p-5 hover:border-accent/50 transition-colors group">
          <div class="flex justify-between items-start mb-4">
            <div class="flex gap-4">
              <div class="w-12 h-12 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center shrink-0">
                <i class="fa-solid fa-helmet-safety text-orange-500 text-xl"></i>
              </div>
              <div>
                <h3 class="font-black text-base-content line-clamp-1 group-hover:text-accent transition-colors">Chef de Chantier BTP</h3>
                <p class="text-xs font-bold text-base-content/60">Sogea Satom • Pointe-Noire</p>
              </div>
            </div>
            <span class="badge badge-sm font-bold border-none bg-orange-100 text-orange-700">En cours d'étude</span>
          </div>
          
          <div class="flex flex-wrap gap-2 text-[11px] font-bold text-base-content/70 mb-4">
            <span class="bg-base-50 px-2 py-1 rounded-md border border-base-200"><i class="fa-solid fa-file-contract mr-1"></i> CDD</span>
            <span class="bg-base-50 px-2 py-1 rounded-md border border-base-200"><i class="fa-regular fa-clock mr-1"></i> Il y a 3 jours</span>
            <span class="bg-base-50 px-2 py-1 rounded-md border border-base-200"><i class="fa-solid fa-money-bill-wave mr-1"></i> 350k - 500k FCFA</span>
          </div>
          
          <div class="divider my-2"></div>
          
          <div class="flex flex-col sm:flex-row gap-2 justify-between items-center mt-2">
            <p class="text-xs font-semibold text-base-content/50"><i class="fa-solid fa-eye mr-1"></i> Le recruteur a vu votre profil</p>
            <div class="flex gap-2 w-full sm:w-auto">
              <button class="btn btn-xs btn-outline btn-error w-1/2 sm:w-auto"><i class="fa-solid fa-trash-can"></i> Retirer</button>
              <button class="btn btn-xs btn-neutral w-1/2 sm:w-auto">Détails</button>
            </div>
          </div>
        </div>

        <!-- Carte Candidature (Exemple 2 : Informatique) -->
        <div class="bg-base-100 rounded-2xl border border-accent/20 shadow-md p-5 relative overflow-hidden group">
          <!-- Indicateur d'action requise -->
          <div class="absolute top-0 right-0 w-16 h-16 overflow-hidden">
             <div class="bg-purple-500 text-white text-[9px] font-black uppercase text-center py-1 rotate-45 translate-x-4 translate-y-2 shadow-sm">Action</div>
          </div>

          <div class="flex justify-between items-start mb-4">
            <div class="flex gap-4">
              <div class="w-12 h-12 rounded-xl bg-base-200 border border-base-300 flex items-center justify-center shrink-0 overflow-hidden">
                <span class="font-black text-xl text-base-content/30">TS</span>
              </div>
              <div>
                <h3 class="font-black text-base-content line-clamp-1 group-hover:text-accent transition-colors">Développeur Front-End</h3>
                <p class="text-xs font-bold text-base-content/60">TechSoft • Brazzaville</p>
              </div>
            </div>
            <span class="badge badge-sm font-bold border-none bg-purple-100 text-purple-700 mr-4">Entretien</span>
          </div>
          
          <div class="flex flex-wrap gap-2 text-[11px] font-bold text-base-content/70 mb-4">
            <span class="bg-base-50 px-2 py-1 rounded-md border border-base-200"><i class="fa-solid fa-file-contract mr-1"></i> CDI</span>
            <span class="bg-base-50 px-2 py-1 rounded-md border border-base-200"><i class="fa-regular fa-clock mr-1"></i> Il y a 1 sem</span>
          </div>
          
          <div class="bg-purple-50 rounded-lg p-3 mb-2 flex justify-between items-center border border-purple-100">
            <div>
              <p class="text-xs font-black text-purple-800"><i class="fa-solid fa-video mr-1"></i> Entretien visio programmé</p>
              <p class="text-[10px] font-bold text-purple-600 mt-0.5">Jeu. 12 Juil • 14h30</p>
            </div>
            <button class="btn btn-xs bg-purple-600 hover:bg-purple-700 text-white border-none">Rejoindre</button>
          </div>
        </div>

      </div>
    </section>

    <!-- ==========================================
         VUE 2 : MES DEMANDES D'EMPLOI
    =========================================== -->
    <section v-if="activeMainTab === 'demandes'" class="space-y-6">
      
      <div class="flex justify-between items-center bg-accent/5 p-6 rounded-2xl border border-accent/20">
        <div>
          <h2 class="text-lg font-black text-accent">Vous ne trouvez pas l'offre idéale ?</h2>
          <p class="text-sm font-semibold text-base-content/70 mt-1 max-w-xl">Publiez une annonce indiquant que vous êtes à la recherche d'opportunités. Les entreprises viendront directement à vous.</p>
        </div>
        <button class="btn bg-accent text-white border-none shadow-lg shadow-accent/20 rounded-xl px-6 font-black shrink-0 hidden md:flex">
          <i class="fa-solid fa-plus"></i> Publier une demande
        </button>
      </div>

      <!-- Liste des demandes publiées -->
      <h3 class="font-black text-lg mt-8">Vos annonces actives</h3>
      
      <div class="space-y-4">
        <!-- Carte Demande (Exemple 1 : Comptable) -->
        <div class="bg-base-100 rounded-2xl border border-base-200 shadow-sm p-6 flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
          
          <div class="flex gap-4 flex-1">
            <div class="w-14 h-14 rounded-full bg-base-200 border-2 border-base-300 flex items-center justify-center shrink-0">
              <span class="font-black text-lg">OM</span>
            </div>
            <div>
              <div class="flex items-center gap-3">
                <h3 class="font-black text-lg text-base-content">Comptable / Gestionnaire Financier</h3>
                <span class="badge badge-sm badge-success font-bold text-white border-none">En ligne</span>
              </div>
              <p class="text-sm font-semibold text-base-content/70 mt-1 line-clamp-2">Diplômé d'un Master en Finance, 3 ans d'expérience en cabinet. Je recherche un poste de comptable unique ou assistant de direction financière.</p>
              
              <div class="flex flex-wrap gap-2 mt-3">
                <span class="badge badge-outline badge-sm font-bold text-base-content/60">Brazzaville</span>
                <span class="badge badge-outline badge-sm font-bold text-base-content/60">CDI / CDD</span>
                <span class="badge badge-outline badge-sm font-bold text-base-content/60">Dispo : Immédiate</span>
              </div>
            </div>
          </div>

          <!-- Statistiques & Actions de la demande -->
          <div class="flex flex-col items-end gap-4 shrink-0 w-full lg:w-auto border-t lg:border-t-0 lg:border-l border-base-200 pt-4 lg:pt-0 lg:pl-6 mt-2 lg:mt-0">
            <div class="flex gap-6 text-center">
              <div>
                <p class="text-xl font-black text-base-content">142</p>
                <p class="text-[10px] font-black uppercase text-base-content/50">Vues</p>
              </div>
              <div>
                <p class="text-xl font-black text-accent">5</p>
                <p class="text-[10px] font-black uppercase text-base-content/50">Intéressés</p>
              </div>
              <div>
                <p class="text-xl font-black text-blue-500">2</p>
                <p class="text-[10px] font-black uppercase text-base-content/50">Messages</p>
              </div>
            </div>
            <div class="flex gap-2 w-full lg:w-auto">
              <button class="btn btn-sm btn-ghost hover:bg-base-200"><i class="fa-solid fa-pause"></i> Mettre en pause</button>
              <button class="btn btn-sm btn-neutral"><i class="fa-solid fa-pen"></i> Modifier</button>
            </div>
          </div>

        </div>
      </div>
      
      <!-- Bouton mobile -->
      <button class="btn bg-accent text-white border-none shadow-lg shadow-accent/20 rounded-xl w-full font-black mt-4 md:hidden">
        <i class="fa-solid fa-plus"></i> Publier une demande
      </button>

    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const activeMainTab = ref('candidatures'); // 'candidatures' ou 'demandes'
const activeStatus = ref('all');

const statusTabs = [
  { id: 'all', label: 'Toutes', count: 24 },
  { id: 'pending', label: 'En attente', count: 12 },
  { id: 'review', label: 'En étude', count: 4 },
  { id: 'interview', label: 'Entretiens', count: 3 },
  { id: 'accepted', label: 'Acceptées', count: 1 },
  { id: 'rejected', label: 'Refusées', count: 4 },
];
</script>

<style scoped>
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>