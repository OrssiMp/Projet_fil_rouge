<template>
  <section class="py-16 px-4 bg-emerald-50/50 ">
    <div class="max-w-6xl mx-auto">

      <div class="text-center mb-12">
        <h2 class="text-2xl md:text-3xl font-black text-base-content tracking-tight mb-3">
          Votre parcours vers le succès
        </h2>
        <p class="text-base-content/60 max-w-2xl mx-auto text-xs md:text-sm font-medium">
          Découvrez comment Mosalah vous accompagne à chaque étape.
        </p>
      </div>

      <div class="hidden lg:grid grid-cols-12 gap-12 items-center">
        <div class="col-span-5 flex justify-start">
          <RoadmapInitial direction="vertical" :currentStep="activeStep" class="w-full max-w-xs" theme="success">
            <RoadmapStep 
              v-for="(step, index) in stepsData" 
              :key="index" 
              :active="activeStep === index + 1"
              @select="activeStep = $event"
            >
              {{ step.menuTitle }}
            </RoadmapStep>
          </RoadmapInitial>
        </div>

        <div class="col-span-7">
          <BaseCard 
            density="spacious" 
            class="min-h-[380px] flex flex-col justify-center text-center border-emerald-100/70"
          >
            <div :key="activeStep" class="flex flex-col gap-4 animate-fade-in-up">
              <h3 class="text-2xl font-black text-base-content tracking-tight">
                {{ stepsData[activeStep - 1].contentTitle }}
              </h3>
              <p class="text-sm md:text-base text-base-content/70 max-w-md mx-auto leading-relaxed font-medium">
                {{ stepsData[activeStep - 1].description }}
              </p>
            </div>
          </BaseCard>
        </div>
      </div>

      <div class="block lg:hidden max-w-md mx-auto">
        <div class="flex flex-col gap-3">
          <div 
            v-for="(step, index) in stepsData" 
            :key="index"
            class="collapse collapse-arrow bg-white border rounded-2xl shadow-sm transition-all duration-300"
            :class="activeStep === index + 1 ? 'border-emerald-500 ring-1 ring-emerald-500' : 'border-base-200'"
          >
            <input 
              type="radio" 
              name="process-accordion" 
              :checked="activeStep === index + 1"
              @change="activeStep = index + 1" 
            />

            <div class="collapse-title text-sm font-bold flex items-center gap-4 text-base-content">
              <span
                class="w-8 h-8 rounded-full flex items-center justify-center text-xs font-black transition-colors shrink-0"
                :class="activeStep >= index + 1 ? 'bg-emerald-500 text-white' : 'bg-base-200 text-base-content/50'"
              >
                {{ index + 1 }}
              </span>
              <span :class="{ 'text-emerald-600 font-extrabold': activeStep === index + 1 }">
                {{ step.menuTitle }}
              </span>
            </div>

            <div class="collapse-content px-6 pb-6 text-left flex flex-col gap-3">
              <div class="h-[1px] bg-base-200/60 w-full mb-1"></div>
              <h4 class="text-lg font-black text-base-content tracking-tight">
                {{ step.contentTitle }}
              </h4>
              <p class="text-xs md:text-sm text-base-content/70 leading-relaxed font-medium">
                {{ step.description }}
              </p>
            </div>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';
// import RoadmapStep from '../ui/RoadmapStep.vue';
// import RoadmapInitial from '../ui/RoadmapInitial.vue';


const activeStep = ref(1);

const stepsData = [
  {
    menuTitle: "Créer un compte",
    contentTitle: "Créez votre compte gratuitement",
    description: "Inscrivez-vous en quelques secondes et accédez immédiatement à des milliers d'opportunités d'emploi disponibles sur Mosalah."
  },
  {
    menuTitle: "Compléter son profil",
    contentTitle: "Valorisez votre parcours",
    description: "Remplissez vos expériences et compétences pour permettre aux recruteurs de vous trouver plus facilement."
  },
  {
    menuTitle: "Explorer les offres",
    contentTitle: "Trouvez le job idéal",
    description: "Utilisez nos filtres intelligents pour dénicher les offres qui correspondent exactement à vos attentes."
  },
  {
    menuTitle: "Postuler",
    contentTitle: "Candidatez en un clic",
    description: "Plus besoin de CV à chaque fois. Postulez instantanément avec votre profil Mosalah déjà rempli."
  },
  {
    menuTitle: "Suivre ses candidatures",
    contentTitle: "Gardez le contrôle",
    description: "Suivez en temps réel l'évolution de vos demandes et recevez des notifications dès qu'un recruteur vous répond."
  }
];
</script>