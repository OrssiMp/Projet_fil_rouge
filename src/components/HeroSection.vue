<template>
    <BaseHero variant="ghost" size="lg" class="min-h-[70vh] flex items-center">
        <template #title>
            <span class="text-accent animate-fade-in-up">Trouve</span> ton job en quelques secondes
        </template>

        <template #subtitle>
            Le job qu'il vous faut à portée de clic.
        </template>

        <template #actions>
            <!-- 🎯 On ajoute `relative` ici pour positionner le dropdown par rapport à ce formulaire -->
            <!-- 🖱️ @focusin et @focusout détectent si l'utilisateur interagit avec l'input ou le bouton -->
            <BaseForm @submit.prevent="handleSearch" class="w-full relative" @focusin="isOpen = true"
                @focusout="handleBlur">
                <div
                    class="flex flex-col sm:flex-row gap-3 sm:gap-2 items-end sm:items-center bg-base-100 p-2 rounded-2xl border border-base-200 shadow-lg relative z-50">

                    <div class="flex-grow w-full">
                        <BaseInput v-model="searchQuery" type="text"
                            placeholder="Poste, compétences,Ville ,entreprise..." icon="search" class="w-full"
                            autocomplete="off" />
                    </div>

                    <BaseButton type="submit" variant="accent" class="w-full sm:w-auto h-12 rounded-xl px-8 shrink-0">
                        Rechercher
                    </BaseButton>
                </div>

                <!-- 📋 Le conteneur des résultats de recherche (Dropdown) -->
                <Transition enter-active-class="transition ease-out duration-200"
                    enter-from-class="opacity-0 translate-y-2 scale-95"
                    enter-to-class="opacity-100 translate-y-0 scale-100"
                    leave-active-class="transition ease-in duration-150"
                    leave-from-class="opacity-100 translate-y-0 scale-100"
                    leave-to-class="opacity-0 translate-y-2 scale-95">
                    <div v-show="isOpen && searchQuery.length > 1"
                        class="absolute top-[calc(60%+0.5rem)] left-0 right-0 bg-base-100 border border-base-200 shadow-2xl rounded-2xl overflow-hidden flex flex-col max-h-[420px] z-50">
                        <!-- En-tête des résultats -->
                        <div
                            class="px-5 py-3 border-b border-base-200/60 bg-base-50 flex justify-between items-center shrink-0">
                            <span class="text-[10px] font-black text-base-content/50 uppercase tracking-widest">
                                Résultats pour "{{ searchQuery }}"
                            </span>
                            <span class="text-[10px] font-black text-accent bg-accent/10 px-2.5 py-1 rounded-md">
                                {{ filteredResults.length }} trouvés
                            </span>
                        </div>

                        <!-- Liste des résultats -->
                        <ul class="overflow-y-auto p-2 flex flex-col gap-1">
                            <template v-if="filteredResults.length">
                                <li v-for="result in filteredResults" :key="result.id">
                                    <router-link :to="result.link"
                                        class="flex items-center gap-4 p-3 rounded-xl hover:bg-base-200/60 transition-colors cursor-pointer group text-left">
                                        <div class="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-sm border border-base-200/50"
                                            :class="result.type === 'job' ? 'bg-accent/10 text-accent' : 'bg-base-200 text-base-content/70'">
                                            <BaseIcon v-if="result.type === 'job'" name="job" />
                                            <BaseIcon v-else-if="result.type === 'company'" name="office" />
                                        </div>

                                        <div class="flex-1 min-w-0">
                                            <h4
                                                class="text-sm font-black text-base-content truncate group-hover:text-accent transition-colors">
                                                {{ result.title }}
                                            </h4>
                                            <div
                                                class="flex flex-wrap items-center gap-x-2 gap-y-1 mt-1 text-[11px] font-semibold text-base-content/60">
                                                <span v-if="result.subtitle" class="text-base-content/80">{{
                                                    result.subtitle }}</span>
                                                <span v-if="result.subtitle && result.location"
                                                    class="hidden sm:inline">•</span>
                                                <span v-if="result.location" class="flex items-center gap-1">
                                                    <BaseIcon name="location" class="text-[9px]" /> {{ result.location
                                                    }}
                                                </span>
                                            </div>
                                        </div>
                                    </router-link>
                                </li>
                            </template>

                            <!-- Aucun résultat -->
                            <div v-else class="px-6 py-10 text-center flex flex-col items-center justify-center">
                                <div class="w-12 h-12 bg-base-200 rounded-full flex items-center justify-center mb-3">
                                    <BaseIcon name="magnifying-glass-minus" class="text-xl text-base-content/30" />
                                </div>
                                <p class="text-sm font-black text-base-content">Aucun résultat trouvé</p>
                                <p class="text-xs font-semibold text-base-content/50 mt-1 max-w-[250px]">
                                    Essayez un autre poste ou une autre compétence.
                                </p>
                            </div>
                        </ul>
                    </div>
                </Transition>
            </BaseForm>
        </template>

        <template #visual>
            <div class="w-full max-w-md xl:max-w-lg card-interactive shadow-2xl rounded-2xl">
                <BaseImage class="hidden lg:block" :src="heroImage"
                    alt="Jeune femme congolaise souriante cherchant un emploi sur Mosalah" ratio="5/5" priority
                    rounded="2xl" />
            </div>
        </template>
    </BaseHero>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import heroImage from '../assets/fille-souriante.png';

const router = useRouter();
const searchQuery = ref('');
const isOpen = ref(false);

// 🖱️ Gestion de la fermeture du dropdown (avec délai pour permettre le clic)
const handleBlur = () => {
    setTimeout(() => {
        isOpen.value = false;
    }, 200);
};

// 🚀 Action lors du clic sur le bouton "Rechercher"
const handleSearch = () => {
    if (searchQuery.value.trim() !== '') {
        // Redirection vers la page des offres avec le paramètre de recherche
        router.push({ name: 'JobList', query: { q: searchQuery.value } });
        isOpen.value = false;
    }
};

// 🗃️ Base de données simulée pour tester le dropdown
const mockData = [
    { id: 1, type: 'job', title: 'Développeur Frontend', subtitle: 'ABC Tech', location: 'Pointe-Noire', link: '/offres/1' },
    { id: 2, type: 'job', title: 'Sécretaire Administratif', subtitle: 'IMMOcool Agency', location: 'Brazzaville', link: '/offres/2' },
    { id: 3, type: 'company', title: 'Bantou Digital', subtitle: 'Pôle Technologique', location: 'Brazzaville', link: '/entreprises/details/3' },
    { id: 4, type: 'job', title: 'Administrateur Systèmes Linux', subtitle: 'Congo Telecom', location: 'Pointe-Noire', link: '/offres/4' },
];


// ⚙️ Logique de filtrage local
const filteredResults = computed(() => {
    const query = searchQuery.value.toLowerCase().trim();
    if (!query) return [];

    return mockData.filter(item =>
        item.title.trim().toLowerCase().includes(query) ||
        item.subtitle.trim().toLowerCase().includes(query) ||
        item.location.trim().toLowerCase().includes(query)
    );
});
</script>