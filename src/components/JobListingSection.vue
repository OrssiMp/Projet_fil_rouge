<template>
    <section class="py-16 px-4 bg-emerald-50/30">
        <div class="max-w-6xl mx-auto text-center flex flex-col gap-10">

            <div>
                <h2 class="text-3xl font-extrabold text-base-content mb-2">
                    Découvrez les dernières opportunités
                </h2>
                <p class="text-base-content/60 text-sm">
                    Explorez les offres publiées récemment par les entreprises.
                </p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <JobCard v-for="job in sampleJobs" :key="job.id" :job="job" :id="job.id" />
            </div>

            <RouterLink to="/offres" class="mt-4">
                <BaseButton variant="accent" class="text-white mx-auto px-8 shadow-md">
                    Voir toutes les offres
                </BaseButton>
            </RouterLink>

        </div>
    </section>
</template>

<script setup>
import { ref } from 'vue';
import JobCard from './JobCard.vue';

// Mock data calqué exactement sur ta maquette (Brazzaville, Pointe-Noire, Remote...)
const sampleJobs = ref([
    {
        id: 1,
        title: 'Développeur Frontend',
        company: 'TechSolutions Congo',
        contractType: 'CDI',
        location: 'Brazzaville',
        postedAt: 'Il y a 2 jours',
        description: 'Rejoignez notre équipe pour concevoir des interfaces web modernes et performantes avec...'
    },
    {
        id: 2,
        title: 'Product Designer',
        company: 'Creative Hub',
        contractType: 'Freelance',
        location: 'Remote',
        postedAt: 'Il y a 3 jours',
        description: 'Nous recherchons un designer passionné pour définir l’expérience utilisateur de nos futurs produ...'
    },
    {
        id: 3,
        title: 'Marketing Manager',
        company: 'Global Services',
        contractType: 'CDI',
        location: 'Pointe-Noire',
        postedAt: 'Il y a 1 jour',
        description: 'Pilotez la stratégie marketing digitale et développez la notoriété de notre marque sur le marché local.'
    },
    {
        id: 4,
        title: 'Analyste Financier',
        company: 'Banque du Congo',
        contractType: 'CDI',
        location: 'Brazzaville',
        postedAt: 'Il y a 4 jours',
        description: 'Expert en modélisation financière ? Rejoignez notre département d’investissement pour des projets...'
    },
    {
        id: 5,
        title: 'Chef de Projet IT',
        company: 'Innov’Africa',
        contractType: 'CDD',
        location: 'Pointe-Noire',
        postedAt: 'Il y a 5 jours',
        description: 'Gérez le cycle de vie complet de nos projets logiciels, de la conception à la mise en production.'
    },
    {
        id: 6,
        title: 'Commercial Terrain',
        company: 'Logistics Pro',
        contractType: 'CDI',
        location: 'Brazzaville',
        postedAt: 'Il y a 6 jours',
        description: 'Développez notre portefeuille client et assurez le suivi commercial de nos solutions logistiques.'
    }
]);
</script>