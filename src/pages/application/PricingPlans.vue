<template>
  <div class="w-full text-left select-none max-w-6xl mx-auto py-6" data-aos="fade-up">
    
    <!-- EN-TÊTE DE LA PAGE -->
    <div class="text-center mb-12">
      <h1 class="text-3xl md:text-4xl font-black text-base-content tracking-tight mb-3">
        Propulsez votre avenir professionnel
      </h1>
      <p class="text-sm md:text-base text-base-content/60 font-medium max-w-xl mx-auto leading-relaxed">
        Choisissez le plan adapté à vos besoins. Que vous soyez un talent à la recherche d'opportunités ou une entreprise en quête d'excellence.
      </p>

      <!-- TOGGLE MENSUEL / ANNUEL -->
      <div class="flex items-center justify-center gap-3 mt-8">
        <span class="text-xs font-bold" :class="!isAnnual ? 'text-[#006643]' : 'text-base-content/40'">Mensuel</span>
        <input 
          v-model="isAnnual" 
          type="checkbox" 
          class="toggle toggle-accent bg-[#006643] checked:bg-[#004d32]" 
        />
        <span class="text-xs font-bold flex items-center gap-1.5" :class="isAnnual ? 'text-[#006643]' : 'text-base-content/40'">
          Annuel 
          <span class="badge badge-sm badge-accent font-black text-[10px] text-white px-1.5 py-0.5 rounded-md">-20%</span>
        </span>
      </div>
    </div>

    <!-- GRILLE DES PLANS -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
      
      <!-- PLAN 1 : CANDIDAT STARTER (GRATUIT) -->
      <div class="bg-white border border-base-300 rounded-3xl p-6 flex flex-col justify-between shadow-[0_2px_12px_rgba(0,0,0,0.01)] relative overflow-hidden">
        <div>
          <div class="mb-4">
            <span class="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-lg border bg-base-100 text-base-content/60">Espace Candidat</span>
          </div>
          <h3 class="font-black text-xl text-base-content tracking-tight mb-1">Candidat Starter</h3>
          <p class="text-xs text-base-content/50 font-medium mb-6">Pour commencer à postuler et créer votre profil.</p>
          
          <div class="flex items-baseline gap-1 mb-6">
            <span class="text-4xl font-black text-base-content tracking-tight">0 FCFA</span>
            <span class="text-xs font-bold text-base-content/40">/à vie</span>
          </div>

          <div class="divider my-2"></div>

          <!-- Avantages -->
          <ul class="flex flex-col gap-3 my-6 text-xs font-medium text-base-content/80">
            <li class="flex items-center gap-2">✔ Profil CV public en ligne</li>
            <li class="flex items-center gap-2">✔ Jusqu'à 5 candidatures / mois</li>
            <li class="flex items-center gap-2">✔ Accès au catalogue d'entreprises</li>
            <li class="flex items-center gap-2 opacity-40">❌ Alertes de recrutement instantanées</li>
          </ul>
        </div>

        <button class="btn btn-bordered border-base-300 hover:bg-base-200/50 text-base-content font-bold w-full rounded-xl normal-case text-xs mt-4 h-11">
          Plan Actuel
        </button>
      </div>

      <!-- PLAN 2 : CANDIDAT PRO (PREMIUM TALENT) -->
      <div class="bg-white border-2 border-[#006643] rounded-3xl p-6 flex flex-col justify-between shadow-[0_4px_24px_rgba(0,102,67,0.06)] relative overflow-hidden">
        <!-- Badge Populaire -->
        <div class="absolute top-0 right-0 bg-[#006643] text-white text-[9px] font-black uppercase tracking-wider px-4 py-1.5 rounded-bl-xl">
          Recommandé
        </div>

        <div>
          <div class="mb-4">
            <span class="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-lg border bg-emerald-50 text-[#006643] border-emerald-200">Espace Candidat</span>
          </div>
          <h3 class="font-black text-xl text-base-content tracking-tight mb-1">Candidat Pro</h3>
          <p class="text-xs text-base-content/50 font-medium mb-6">Maximisez vos chances d'être repéré par les recruteurs.</p>
          
          <div class="flex items-baseline gap-1 mb-6">
            <span class="text-4xl font-black text-base-content tracking-tight">
              {{ isAnnual ? '4 000' : '5 000' }} FCFA
            </span>
            <span class="text-xs font-bold text-base-content/40">/mois</span>
          </div>

          <div class="divider my-2"></div>

          <!-- Avantages -->
          <ul class="flex flex-col gap-3 my-6 text-xs font-medium text-base-content/80">
            <li class="flex items-center gap-2">✔ **Candidatures illimitées**</li>
            <li class="flex items-center gap-2">✔ Profil mis en avant (Badge PRO)</li>
            <li class="flex items-center gap-2">✔ Statistiques des visites sur votre profil</li>
            <li class="flex items-center gap-2">✔ Alertes SMS/WhatsApp en temps réel</li>
            <li class="flex items-center gap-2">✔ Accès prioritaire aux salons de l'emploi</li>
          </ul>
        </div>

        <button class="btn bg-[#006643] hover:bg-[#004d32] border-none text-white font-bold w-full rounded-xl normal-case text-xs mt-4 h-11 shadow-md shadow-emerald-800/10">
          Passer à Candidat Pro
        </button>
      </div>

      <!-- PLAN 3 : RECRUTEUR ACCÈS (ENTREPRISES) -->
      <div class="bg-white border border-base-300 rounded-3xl p-6 flex flex-col justify-between shadow-[0_2px_12px_rgba(0,0,0,0.01)] relative overflow-hidden">
        <div>
          <div class="mb-4">
            <span class="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-lg border bg-amber-50 text-amber-700 border-amber-200">Espace Entreprise</span>
          </div>
          <h3 class="font-black text-xl text-base-content tracking-tight mb-1">Recruteur Business</h3>
          <p class="text-xs text-base-content/50 font-medium mb-6">Pour publier des offres et débloquer le vivier complet.</p>
          
          <div class="flex items-baseline gap-1 mb-6">
            <span class="text-4xl font-black text-base-content tracking-tight">
              {{ isAnnual ? '24 000' : '30 000' }} FCFA
            </span>
            <span class="text-xs font-bold text-base-content/40">/mois</span>
          </div>

          <div class="divider my-2"></div>

          <!-- Avantages -->
          <ul class="flex flex-col gap-3 my-6 text-xs font-medium text-base-content/80">
            <li class="flex items-center gap-2">✔ Publication de 5 offres / mois actives</li>
            <li class="flex items-center gap-2">✔ Accès complet au **Vivier de Talents**</li>
            <li class="flex items-center gap-2">✔ Outil de notation et tri des candidats</li>
            <li class="flex items-center gap-2">✔ Exportation des CV au format PDF</li>
            <li class="flex items-center gap-2">✔ Support client dédié en 24h</li>
          </ul>
        </div>

        <button class="btn btn-bordered border-[#006643] text-[#006643] hover:bg-emerald-50 font-bold w-full rounded-xl normal-case text-xs mt-4 h-11">
          Choisir l'offre Entreprise
        </button>
      </div>

    </div>

    <!-- SECTION DE CONFIANCE / FAQ RAPIDE -->
    <div class="mt-16 text-center max-w-md mx-auto">
      <p class="text-xs font-bold text-base-content/40 uppercase tracking-wider mb-2">Paiement 100% sécurisé</p>
      <div class="flex items-center justify-center gap-4 filter grayscale opacity-60 text-xs font-bold">
        <span>Airtel Money</span> • <span>MTN Mobile Money</span> • <span>Carte Visa</span>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue';

// État pour gérer le basculement mensuel / annuel (avec réduction simulée dans le template)
const isAnnual = ref(false);
</script>