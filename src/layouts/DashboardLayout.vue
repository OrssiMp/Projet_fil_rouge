<script setup>
import EntrepriseLayout from "./EntrepriseLayout.vue";
import CandidateLayout from "./CandidateLayout.vue";
import { useAuth } from "../composables/useAuth";
import { computed } from 'vue';

const { isAuthenticated, currentUser } = useAuth();
const role = computed(() => currentUser.value?.role || 'candidat');
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

</template>