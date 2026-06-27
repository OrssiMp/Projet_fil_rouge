<script setup>
import EntrepriseLayout from "./EntrepriseLayout.vue";
import CandidateLayout from "./CandidateLayout.vue";

const props = defineProps({
    role: {
        type: String,
        required: true,
    },
});
</script>

<template>
    <template v-if="role?.toLowerCase() === 'entreprise'">
        <EntrepriseLayout>
            <router-view />
        </EntrepriseLayout>
    </template>

    <template v-else-if="role?.toLowerCase() === 'candidat'" >
        <CandidateLayout>
            <router-view/>
        </CandidateLayout>
    </template>

    <template v-else>
        <div>Dashboard role inconnue : {{ role }}</div>
        <router-view />
    </template>
</template>