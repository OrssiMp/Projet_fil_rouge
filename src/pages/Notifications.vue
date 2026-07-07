<template>
  <div class="min-h-screen bg-base-200/30 py-8 px-4 sm:px-6 lg:px-8 select-none">
    <div class="max-w-4xl mx-auto" data-aos="fade-up" data-aos-duration="400">
      
      <!-- EN-TÊTE -->
      <div class="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 class="text-3xl font-black text-base-content tracking-tight mb-1">
            Notifications
          </h1>
          <p class="text-sm text-base-content/60 font-medium">
            Restez informé de l'activité liée à votre compte Mosalah.
          </p>
        </div>

        <button
          v-if="unreadNotifications.length > 0"
          @click="handleMarkAllAsRead"
          class="btn btn-sm h-10 px-4 rounded-xl font-bold normal-case bg-white border border-base-300 text-base-content/70 hover:bg-base-200 hover:text-base-content shadow-sm transition-all"
        >
          <span class="mr-1">✓</span> Tout marquer comme lu
        </button>
      </div>

      <!-- FILTRES -->
      <div class="flex flex-wrap gap-2 mb-6 bg-white p-2 rounded-2xl border border-base-200 w-fit shadow-sm">
        <button
          v-for="f in filters"
          :key="f.value"
          @click="activeFilter = f.value"
          class="btn btn-sm rounded-xl font-bold border-none transition-all normal-case px-5 h-9"
          :class="activeFilter === f.value
            ? 'bg-accent text-white shadow-md'
            : 'bg-transparent text-base-content/60 hover:bg-base-200/50'"
        >
          {{ f.label }}
          <span 
            v-if="f.value === 'unread' && unreadNotifications.length > 0" 
            class="ml-1.5 px-1.5 py-0.5 rounded-md text-[10px]"
            :class="activeFilter === 'unread' ? 'bg-white/20 text-white' : 'bg-[#006643]/10 text-[#006643]'"
          >
            {{ unreadNotifications.length }}
          </span>
        </button>
      </div>

      <!-- ÉTAT DE CHARGEMENT -->
      <div v-if="isLoading" class="flex flex-col gap-3">
        <div v-for="n in 4" :key="n" class="skeleton h-24 w-full bg-base-300/40 rounded-2xl"></div>
      </div>

      <!-- LISTE DES NOTIFICATIONS (Animée) -->
      <TransitionGroup 
        v-else-if="filteredNotifications.length > 0" 
        name="list" 
        tag="div" 
        class="flex flex-col gap-3 relative"
      >
        <div
          v-for="notif in filteredNotifications"
          :key="notif.id"
          @click="handleOpenNotification(notif)"
          class="group flex items-start gap-4 bg-white border rounded-2xl p-4 cursor-pointer transition-all hover:border-[#006643]/40 hover:shadow-md relative overflow-hidden"
          :class="notif.read ? 'border-base-200' : 'border-emerald-200 bg-emerald-50/20'"
        >
          <!-- Indicateur visuel latéral pour les non lues -->
          <div v-if="!notif.read" class="absolute left-0 top-0 bottom-0 w-1 bg-[#006643]"></div>

          <!-- Icône -->
          <div
            class="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-105"
            :class="notifStyle(notif.type).bg"
          >
            <!-- Remplace BaseIcon par ton composant d'icône réel, ou un emoji si tu n'en as pas -->
            <BaseIcon :name="notifStyle(notif.type).icon" :class="[notifStyle(notif.type).text, 'w-6 h-6']" />
          </div>

          <!-- Contenu -->
          <div class="flex-1 min-w-0 py-0.5">
            <div class="flex items-start justify-between gap-2">
              <h3 class="font-bold text-sm text-base-content tracking-tight line-clamp-1" :class="{'text-base-content/70': notif.read}">
                {{ notif.title }}
              </h3>
            </div>
            <p class="text-xs text-base-content/60 font-medium mt-1 leading-relaxed line-clamp-2">
              {{ notif.message }}
            </p>
            <div class="flex items-center gap-2 mt-2">
              <span class="text-[10px] uppercase tracking-widest font-bold text-base-content/40">
                {{ formatDate(notif.createdAt) }}
              </span>
              <span v-if="!notif.read" class="badge badge-xs border-none bg-[#006643]/10 text-[#006643] font-bold p-2 text-[9px]">Nouveau</span>
            </div>
          </div>

          <!-- Bouton Supprimer -->
          <button
            @click.stop="handleDelete(notif.id)"
            class="btn btn-ghost btn-sm btn-square opacity-0 md:group-hover:opacity-100 transition-opacity text-base-content/30 hover:text-rose-600 hover:bg-rose-50 rounded-xl"
            title="Supprimer"
          >
            <BaseIcon name="x" class="w-4 h-4" />
          </button>
        </div>
      </TransitionGroup>

      <!-- ÉTAT VIDE -->
      <div v-else class="bg-white border border-base-200 rounded-3xl py-16 px-6 text-center max-w-xl mx-auto shadow-sm mt-8">
        <div class="w-20 h-20 bg-base-100 rounded-full flex items-center justify-center mx-auto mb-4 border border-base-200">
          <span class="text-4xl opacity-60">🔕</span>
        </div>
        <h3 class="font-black text-base-content tracking-tight text-xl mb-2">
          Aucune notification
        </h3>
        <p class="text-sm text-base-content/50 font-medium max-w-xs mx-auto leading-relaxed">
          {{ activeFilter === 'unread'
            ? "Vous avez lu toutes vos notifications. Tout est à jour !"
            : "Vous serez notifié ici dès qu'il y aura de l'activité sur votre compte." }}
        </p>
        
        <button 
          v-if="activeFilter === 'unread'" 
          @click="activeFilter = 'all'" 
          class="btn btn-ghost btn-sm mt-4 text-[#006643] font-bold"
        >
          Voir toutes les notifications
        </button>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuth } from '@/composables/useAuth'; // Vérifie le chemin selon ton projet
import { useNotifications } from '@/composables/useNotifications'; // Idem

const router = useRouter();
const { currentUser } = useAuth();
const {
  fetchNotifications,
  markAsRead,
  markAllAsRead,
  deleteNotification,
} = useNotifications();

// --- ÉTATS ---
const isLoading = ref(true);
const activeFilter = ref('all');
const userNotifications = ref([]);

const filters = [
  { label: 'Toutes', value: 'all' },
  { label: 'Non lues', value: 'unread' },
];

// --- CHARGEMENT ---
const loadNotifications = async () => {
  if (!currentUser.value) return;
  isLoading.value = true;
  
  try {
    // Simulation d'un appel asynchrone pour l'UX (optionnel, selon l'implémentation de useNotifications)
    await new Promise(resolve => setTimeout(resolve, 300)); 
    userNotifications.value = fetchNotifications(currentUser.value.id);
  } finally {
    isLoading.value = false;
  }
};

onMounted(loadNotifications);

// --- DONNÉES CALCULÉES ---
const unreadNotifications = computed(() =>
  userNotifications.value.filter((n) => !n.read)
);

const filteredNotifications = computed(() => {
  if (activeFilter.value === 'unread') return unreadNotifications.value;
  return userNotifications.value;
});

// --- MÉTHODES UTILITAIRES ---
const notifStyle = (type) => {
  const styles = {
    new_offer: { icon: 'briefcase', bg: 'bg-emerald-100/50', text: 'text-[#006643]' },
    candidature_status: { icon: 'check-circle', bg: 'bg-amber-100/50', text: 'text-amber-600' },
    new_message: { icon: 'message-circle', bg: 'bg-sky-100/50', text: 'text-sky-600' },
    new_candidature: { icon: 'user-plus', bg: 'bg-violet-100/50', text: 'text-violet-600' },
  };
  return styles[type] || { icon: 'bell', bg: 'bg-base-200', text: 'text-base-content/60' };
};

const formatDate = (isoDate) => {
  if (!isoDate) return 'À l\'instant';
  const date = new Date(isoDate);
  // Gestion intelligente de la date (Aujourd'hui, Hier, ou Date complète)
  const today = new Date();
  const isToday = date.toDateString() === today.toDateString();
  
  if (isToday) {
    return `Aujourd'hui à ${date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}`;
  }

  return date.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  });
};

// --- ACTIONS ---
const handleOpenNotification = (notif) => {
  if (!notif.read) {
    markAsRead(notif.id);
    // Met à jour localement sans recharger toute la liste pour plus de fluidité
    const index = userNotifications.value.findIndex(n => n.id === notif.id);
    if(index !== -1) userNotifications.value[index].read = true;
  }
  if (notif.link) {
    router.push(notif.link);
  }
};

const handleMarkAllAsRead = () => {
  if (!currentUser.value) return;
  markAllAsRead(currentUser.value.id);
  // Mise à jour de l'état local pour éviter un appel réseau inutile
  userNotifications.value.forEach(n => n.read = true);
};

const handleDelete = (id) => {
  deleteNotification(id);
  // Retire l'élément du tableau pour déclencher l'animation TransitionGroup
  userNotifications.value = userNotifications.value.filter(n => n.id !== id);
};
</script>

<style scoped>
/* Animations pour le composant <TransitionGroup> */
.list-enter-active,
.list-leave-active {
  transition: all 0.4s ease;
}
.list-enter-from {
  opacity: 0;
  transform: translateX(-20px);
}
.list-leave-to {
  opacity: 0;
  transform: translateX(20px);
}
/* Assure que les éléments restants remontent doucement lorsqu'un élément est supprimé */
.list-leave-active {
  position: absolute;
  width: 100%;
}
</style>