<script setup>
import EntrepriseLayout from "./EntrepriseLayout.vue";
import CandidateLayout from "./CandidateLayout.vue";
import { useAuth } from "../composables/useAuth";
import {ref} from 'vue'
// const props = defineProps({
//     role: {
//         type: String,
//         required: true,
//     },
// });

const role =ref('candidat')
const {isAuthenticated,currentUser}= useAuth();
if(isAuthenticated.value){
    role.value = currentUser.value.role;
}
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