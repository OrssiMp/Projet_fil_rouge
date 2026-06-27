<template>
    <BaseHero centered variant="soft" class="my-12">
        <template #title>
            Prêt à trouver votre prochain emploi ?
        </template>

        <template #subtitle>
            Quelques minutes suffisent pour créer votre profil et commencer à postuler.
            <span class="block text-xs text-base-content/40 italic mt-4">
                Gratuit et sans engagement.
            </span>
        </template>

        <template #actions>
            <BaseButton variant="accent" icon="candidat" class="px-10 shadow-lg hover:shadow-xl w-full sm:w-auto"
                @click="handleNavigation">
                Créer mon compte
            </BaseButton>
        </template>
    </BaseHero>
</template>

<script setup>
import { useRouter } from 'vue-router';


const router = useRouter();

const handleNavigation = () => {
    console.log("Redirection vers la page de choix du type de compte...");
    router.push('/register');
};
</script>