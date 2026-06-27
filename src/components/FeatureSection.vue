<template>
  <section id="features" class="py-16 px-4 bg-base-100 select-none">
    <div class="max-w-6xl mx-auto flex flex-col gap-16 md:gap-24">
      
      <div class="text-center max-w-2xl mx-auto">
        <h2 class="text-2xl md:text-4xl font-black text-base-content tracking-tight mb-4">
          Pourquoi choisir Mosalah ?
        </h2>
        <p class="text-xs md:text-base text-base-content/70 font-medium">
          Tout ce dont vous avez besoin pour trouver votre prochain emploi plus facilement.
        </p>
      </div>

      <div class="flex flex-col gap-16 md:gap-24">
        
        <div class="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
          <div class="flex-1 w-full max-w-md lg:max-w-none bg-base-200 p-2 rounded-3xl shadow-xl border border-base-200/50 card-interactive">
            <BaseImage 
              :src="featureOpportunites" 
              alt="Interface de recherche d'emploi filtrée sur Mosalah" 
              ratio="16/10"
              rounded="2xl"
            />
          </div>
          <div class="flex-1 text-center lg:text-left flex flex-col gap-3">
            <h3 class="text-xl md:text-2xl font-black text-base-content tracking-tight">
              Trouver des opportunités <span class="text-accent">rapidement</span>
            </h3>
            <p class="text-sm md:text-base text-base-content/70 leading-relaxed font-medium">
              Découvrez les offres publiées par des entreprises qui recrutent activement et trouvez celles qui correspondent exactement à votre profil.
            </p>
          </div>
        </div>

        <div class="flex flex-col flex-col-reverse lg:flex-row items-center gap-8 lg:gap-16">
          <div class="flex-1 text-center lg:text-left flex flex-col gap-3">
            <h3 class="text-xl md:text-2xl font-black text-base-content tracking-tight">
              Postuler <span class="text-accent">facilement</span>
            </h3>
            <p class="text-sm md:text-base text-base-content/70 leading-relaxed font-medium">
              Envoyez votre candidature en quelques clics sans répéter les mêmes informations à chaque offre.
            </p>
          </div>
          <div class="flex-1 w-full max-w-md lg:max-w-none bg-base-200 p-2 rounded-3xl shadow-xl border border-base-200/50 card-interactive">
            <BaseImage 
              :src="featurePostuler" 
              alt="Formulaire de candidature simplifiée en un clic" 
              ratio="16/10"
              rounded="2xl"
            />
          </div>
        </div>

        <div class="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
          <div class="flex-1 w-full max-w-md lg:max-w-none bg-base-200 p-2 rounded-3xl shadow-xl border border-base-200/50 card-interactive">
            <BaseImage 
              :src="featureProfil" 
              alt="Aperçu d'un profil professionnel complet sur le marché congolais" 
              ratio="16/10"
              rounded="2xl"
            />
          </div>
          <div class="flex-1 text-center lg:text-left flex flex-col gap-3">
            <h3 class="text-xl md:text-2xl font-black text-base-content tracking-tight">
              Créer un profil <span class="text-accent">professionnel</span>
            </h3>
            <p class="text-sm md:text-base text-base-content/70 leading-relaxed font-medium">
              Mettez en avant vos compétences, votre expérience et votre parcours pour attirer l'attention des recruteurs locaux.
            </p>
          </div>
        </div>

        <div class="flex flex-col flex-col-reverse lg:flex-row items-center gap-8 lg:gap-16">
          <div class="flex-1 text-center lg:text-left flex flex-col gap-3">
            <h3 class="text-xl md:text-2xl font-black text-base-content tracking-tight">
              Suivre ses <span class="text-accent">candidatures</span>
            </h3>
            <p class="text-sm md:text-base text-base-content/70 leading-relaxed font-medium">
              Consultez l'état de vos candidatures depuis un espace unique et gardez le contrôle de votre recherche d'emploi.
            </p>
          </div>
          <div class="flex-1 w-full max-w-md lg:max-w-none bg-base-200 p-2 rounded-3xl shadow-xl border border-base-200/50 card-interactive">
            <BaseImage 
              :src="featureSuiviCandidatures" 
              alt="Tableau de bord de suivi du statut des recrutements" 
              ratio="16/10"
              rounded="2xl"
            />
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup>
import featureOpportunites from '../assets/feature-opportunites.png';
import featurePostuler from '../assets/feature-postuler.png';
import featureProfil from '../assets/feature-profil.png';
import featureSuiviCandidatures from '../assets/feature-suivi.png';
</script>