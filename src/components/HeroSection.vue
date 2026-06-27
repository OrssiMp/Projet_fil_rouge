<template>
   
    <BaseHero  variant="ghost" size="lg" class="min-h-[70vh] flex items-center">
        <template #title>
            <span class="text-accent animate-fade-in-up">Trouve</span> ton job en quelques secondes
        </template>

        <template #subtitle>
            Le job qu'il vous faut à portée de clic.
        </template>

        <template #actions>
            <BaseForm @submit="handleSearch" class="w-full">
                <div
                    class="flex flex-col sm:flex-row gap-3 sm:gap-2 items-end sm:items-center bg-base-100 p-2 rounded-2xl border border-base-200 shadow-lg">

                    <div class="flex-grow w-full">
                        <BaseInput v-model="searchQuery" type="text" placeholder="Poste, compétences, entreprise..."
                            icon="search" class="w-full" />
                    </div>

                    <BaseButton type="submit" variant="accent" class="w-full sm:w-auto h-12 rounded-xl px-8 shrink-0">
                        Rechercher
                    </BaseButton>
                </div>
            </BaseForm>
        </template>

        <template #visual>
            <div class="w-full max-w-md xl:max-w-lg card-interactive shadow-2xl rounded-2xl">
                <BaseImage class="hidden lg:block" :src="heroImage" alt="Jeune femme congolaise souriante cherchant un emploi sur Mosalah"
                    ratio="5/5" priority rounded="2xl" />
            </div>
        </template>
    </BaseHero>
</template>

<script setup>
import { ref } from 'vue';
import heroImage from '../assets/fille-souriante.png';

const searchQuery = ref('');

const handleSearch = () => {
    console.log('Recherche lancée pour :', searchQuery.value);
};


</script>