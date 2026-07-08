<template>
    <BaseCard
        class="bg-white border border-base-300 rounded-2xl p-5 flex flex-col justify-between shadow-[0_2px_12px_rgba(0,0,0,0.01)] hover:shadow-[0_6px_30px_rgba(0,0,0,0.05)] transition-all duration-200 group hover:-translate-y-1">
        <div>
            <div class="flex items-start justify-between gap-4 mb-4">
                <div class="avatar flex items-center gap-4">
                    <!-- AVATAR : image si disponible, sinon initiales colorées -->
                    <div class="w-16 h-16 rounded-2xl border border-base-200 overflow-hidden bg-base-100 flex items-center justify-center shrink-0">
                        <BaseImage
                            v-if="candidate.avatar"
                            :src="candidate.avatar"
                            :alt="candidate.name"
                            class="object-cover w-full h-full"
                        />
                        <div
                            v-else
                            class="w-full h-full flex items-center justify-center font-black text-lg"
                            :class="[avatarColor.bg, avatarColor.text]"
                        >
                            {{ initials }}
                        </div>
                    </div>
                    <div>
                        <h3 class="font-black text-base-content tracking-tight text-lg leading-snug group-hover:text-[#006643] transition-colors">
                            {{ candidate.name || 'Nom non renseigné' }}
                        </h3>
                        <p class="text-xs font-bold text-base-content/70 mt-0.5">
                            {{ professionalTitle }}
                        </p>
                        <p class="text-xs text-base-content/40 font-semibold mt-1 flex items-center gap-2">
                            <BaseIcon name="location" class="text-[11px]" />
                            {{ candidate.location || 'Localisation non renseignée' }}
                        </p>
                    </div>
                </div>

                <div class="text-right shrink-0">
                    <span
                        class="text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-lg border inline-block"
                        :class="isAvailable ? 'bg-emerald-50 border-emerald-200 text-[#006643]' : 'bg-base-100 border-base-200 text-base-content/40'">
                        {{ availabilityLabel }}
                    </span>
                </div>
            </div>

            <p class="text-sm text-base-content/60 font-medium leading-relaxed line-clamp-3 mb-4">
                {{ candidate.bio || "Ce candidat n'a pas encore rédigé de présentation." }}
            </p>
        </div>

        <div>
            <div class="flex flex-wrap gap-2 mb-4 pt-3 border-t border-base-100 items-center">
                <template v-if="skills.length > 0">
                    <span
                        v-for="skill in skills.slice(0, 4)"
                        :key="skill"
                        class="bg-base-200/60 text-base-content/80 font-bold text-[11px] px-2.5 py-0.5 rounded-lg whitespace-nowrap"
                    >
                        {{ skill }}
                    </span>
                    <span v-if="skills.length > 4" class="text-xs text-base-content/50">
                        +{{ skills.length - 4 }} autres
                    </span>
                </template>
                <span v-else class="text-xs text-base-content/30 font-semibold italic">
                    Aucune compétence renseignée
                </span>
            </div>

            <slot name="actions">
                <BaseButton class="w-full" variant="accent" @click="$emit('view', candidate)">
                    Voir le profil
                </BaseButton>
            </slot>
        </div>
    </BaseCard>
    
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
    candidate: { type: Object, required: true },
});
defineEmits(['view']);

const skills = computed(() => props.candidate?.skills || []);

// Pas de champ "titre professionnel" dédié dans useAuth : dérivé de la dernière expérience
const professionalTitle = computed(() => {
    return props.candidate?.experiences?.[0]?.role || 'Titre professionnel non renseigné';
});

const isAvailable = computed(() => {
    const a = props.candidate?.availability;
    return a === true || (typeof a === 'string' && a.trim().length > 0);
});

const availabilityLabel = computed(() => {
    const a = props.candidate?.availability;
    if (a === true) return 'Disponible';
    if (a === false || a === undefined || a === null) return 'Indisponible';
    return a; // ex : "Sous préavis de 1 mois"
});

// Initiales + couleur stable — même logique que CandidatDetail.vue
const initials = computed(() => {
    const name = props.candidate?.name;
    if (!name) return '?';
    const parts = name.trim().split(/\s+/).filter(Boolean);
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
});

const avatarPalette = [
    { bg: 'bg-emerald-100', text: 'text-emerald-700' },
    { bg: 'bg-sky-100', text: 'text-sky-700' },
    { bg: 'bg-amber-100', text: 'text-amber-700' },
    { bg: 'bg-violet-100', text: 'text-violet-700' },
    { bg: 'bg-rose-100', text: 'text-rose-700' },
    { bg: 'bg-indigo-100', text: 'text-indigo-700' },
    { bg: 'bg-teal-100', text: 'text-teal-700' },
];
const hashString = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) hash = str.charCodeAt(i) + ((hash << 5) - hash);
    return Math.abs(hash);
};
const avatarColor = computed(() => {
    const key = String(props.candidate?.id ?? props.candidate?.name ?? 'default');
    return avatarPalette[hashString(key) % avatarPalette.length];
});
</script>

<style scoped></style>