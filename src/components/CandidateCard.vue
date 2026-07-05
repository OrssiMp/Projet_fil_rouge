<template>
    <BaseCard
        class="bg-white border border-base-300 rounded-2xl p-5 flex flex-col justify-between shadow-[0_2px_12px_rgba(0,0,0,0.01)] hover:shadow-[0_6px_30px_rgba(0,0,0,0.05)] transition-all duration-200 group hover:-translate-y-1">
        <div>
            <div class="flex items-start justify-between gap-4 mb-4">
                <div class="avatar flex items-center gap-4">
                    <div
                        class="w-16 h-16 rounded-2xl border border-base-200 overflow-hidden bg-base-100 flex items-center justify-center text-lg font-black text-accent">
                        <BaseImage :src="candidate.avatar" :alt="candidate.name" class="object-cover w-full h-full" />
                    </div>
                    <div>
                        <h3
                            class="font-black text-base-content tracking-tight text-lg leading-snug group-hover:text-[#006643] transition-colors">
                            {{ candidate.name }}
                        </h3>
                        <p class="text-xs font-bold text-base-content/70 mt-0.5">{{ candidate.headline }}</p>
                        <p class="text-xs text-base-content/40 font-semibold mt-1 flex items-center gap-2">
                            <BaseIcon name="location" class="text-[11px]" /> {{ candidate.location }}
                        </p>
                    </div>
                </div>

                <div class="text-right">
                    <span
                        class="text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-lg border inline-block"
                        :class="candidate.isAvailable ? 'bg-emerald-50 border-emerald-200 text-[#006643]' : 'bg-base-100 border-base-200 text-base-content/40'">
                        {{ candidate.isAvailable ? 'Disponible' : 'En poste' }}
                    </span>
                </div>
            </div>

            <p class="text-sm text-base-content/60 font-medium leading-relaxed line-clamp-3 mb-4">
                {{ candidate.bio || "Aucune description fournie pour le moment." }}
            </p>
        </div>

        <div>
            <div class="flex flex-wrap gap-2 mb-4 pt-3 border-t border-base-100 items-center">
                <template v-for="skill in candidate.skills.slice(0, 4)" :key="skill">
                    <span
                        class="bg-base-200/60 text-base-content/80 font-bold text-[11px] px-2.5 py-0.5 rounded-lg whitespace-nowrap">
                        {{ skill }}
                    </span>
                </template>
                <span v-if="candidate.skills.length > 4" class="text-xs text-base-content/50">+{{
                    candidate.skills.length - 4 }}
                    autres</span>
            </div>

            <slot name="actions">
                <div class="flex gap-2 w-full mt-2">
                    <router-link :to="`/candidats/details/${candidate.id}`" class="flex-1">
                        <BaseButton class="w-full" variant="accent">Voir le profil</BaseButton>
                    </router-link>

                    <BaseButton @click="emitBookmark" variant="ghost" class="w-12 h-9 rounded-xl">
                        <span v-if="candidate.isBookmarked" class="text-yellow-400">⭐</span>
                        <span v-else class="text-base-content/50">☆</span>
                    </BaseButton>
                </div>
            </slot>
        </div>
    </BaseCard>
</template>

<script setup>
const props = defineProps({
    candidate: { type: Object, required: true }
});
const emit = defineEmits(["bookmark"]);

const emitBookmark = () => {
    emit('bookmark', props.candidate.id);
};
</script>

<style scoped></style>
