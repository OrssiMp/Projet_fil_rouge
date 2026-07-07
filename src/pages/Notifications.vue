<template>
  <div class="w-full text-left select-none" data-aos="fade-up">

    <!-- EN-TÊTE -->
    <div class="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div>
        <h1 class="text-2xl md:text-3xl font-black text-base-content tracking-tight mb-1">
          Notifications
        </h1>
        <p class="text-sm text-base-content/60 font-medium">
          Restez informé de l'activité liée à votre compte Mosalah.
        </p>
      </div>
      <button
        v-if="unreadNotifications.length > 0"
        @click="handleMarkAllAsRead"
        class="btn btn-sm rounded-xl font-bold normal-case bg-white border border-base-300 text-base-content/70 hover:bg-base-200/50 self-start md:self-auto"
      >
        Tout marquer comme lu
      </button>
    </div>

    <!-- FILTRES -->
    <div class="flex flex-wrap gap-2 mb-6">
      <button
        v-for="f in filters"
        :key="f.value"
        @click="activeFilter = f.value"
        class="btn btn-xs rounded-lg font-bold border transition-all normal-case"
        :class="activeFilter === f.value
          ? 'bg-[#006643] text-white border-transparent shadow-sm'
          : 'bg-white border-base-300 text-base-content/70 hover:bg-base-200/50'"
      >
        {{ f.label }}
        <span v-if="f.value === 'unread' && unreadNotifications.length > 0" class="ml-1">
          ({{ unreadNotifications.length }})
        </span>
      </button>
    </div>

    <!-- LISTE DES NOTIFICATIONS -->
    <div v-if="filteredNotifications.length > 0" class="flex flex-col gap-3">
      <div
        v-for="notif in filteredNotifications"
        :key="notif.id"
        @click="handleOpenNotification(notif)"
        class="group flex items-start gap-4 bg-white border rounded-2xl p-4 cursor-pointer transition-all hover:border-[#006643]/40 hover:shadow-sm"
        :class="notif.read ? 'border-base-300' : 'border-emerald-200 bg-emerald-50/30'"
      >
        <div
          class="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
          :class="notifStyle(notif.type).bg"
        >
          <BaseIcon :name="notifStyle(notif.type).icon" :class="notifStyle(notif.type).text" />
        </div>

        <div class="flex-1 min-w-0">
          <div class="flex items-center justify-between gap-2">
            <h3 class="font-bold text-sm text-base-content tracking-tight">
              {{ notif.title }}
            </h3>
            <span v-if="!notif.read" class="w-2 h-2 rounded-full bg-[#006643] flex-shrink-0"></span>
          </div>
          <p class="text-xs text-base-content/60 font-medium mt-0.5 leading-relaxed">
            {{ notif.message }}
          </p>
          <p class="text-[11px] text-base-content/40 font-semibold mt-1.5">
            {{ formatDate(notif.createdAt) }}
          </p>
        </div>

        <button
          @click.stop="handleDelete(notif.id)"
          class="opacity-0 group-hover:opacity-100 transition-opacity text-base-content/30 hover:text-rose-600 flex-shrink-0"
          title="Supprimer"
        >
          <BaseIcon name="x" />
        </button>
      </div>
    </div>

    <!-- ÉTAT VIDE -->
    <div v-else class="bg-white border border-base-300 rounded-2xl py-16 px-4 text-center max-w-xl mx-auto mt-6">
      <p class="text-3xl mb-2">🔔</p>
      <h3 class="font-black text-base-content tracking-tight text-lg mb-1">
        Aucune notification
      </h3>
      <p class="text-xs text-base-content/50 font-medium max-w-sm mx-auto leading-relaxed">
        {{ activeFilter === 'unread'
          ? "Vous n'avez aucune notification non lue pour le moment."
          : "Vous serez notifié ici dès qu'il y aura de l'activité sur votre compte." }}
      </p>
    </div>

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuth } from '../composables/useAuth';
import { useNotifications } from '../composables/useNotifications';

const router = useRouter();
const { currentUser } = useAuth();
const {
  fetchNotifications,
  markAsRead,
  markAllAsRead,
  deleteNotification,
} = useNotifications();

const activeFilter = ref('all');
const userNotifications = ref([]);

const filters = [
  { label: 'Toutes', value: 'all' },
  { label: 'Non lues', value: 'unread' },
];

const loadNotifications = () => {
  if (!currentUser.value) return;
  userNotifications.value = fetchNotifications(currentUser.value.id);
};

onMounted(loadNotifications);

const unreadNotifications = computed(() =>
  userNotifications.value.filter((n) => !n.read)
);

const filteredNotifications = computed(() => {
  if (activeFilter.value === 'unread') return unreadNotifications.value;
  return userNotifications.value;
});

// Association type de notification -> icône / couleur
const notifStyle = (type) => {
  const styles = {
    new_offer: { icon: 'briefcase', bg: 'bg-emerald-50', text: 'text-[#006643]' },
    candidature_status: { icon: 'check-circle', bg: 'bg-amber-50', text: 'text-amber-600' },
    new_message: { icon: 'message-circle', bg: 'bg-sky-50', text: 'text-sky-600' },
    new_candidature: { icon: 'user-plus', bg: 'bg-violet-50', text: 'text-violet-600' },
  };
  return styles[type] || { icon: 'bell', bg: 'bg-base-200', text: 'text-base-content/60' };
};

const formatDate = (isoDate) => {
  const date = new Date(isoDate);
  return date.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  });
};

const handleOpenNotification = (notif) => {
  if (!notif.read) {
    markAsRead(notif.id);
    loadNotifications();
  }
  if (notif.link) router.push(notif.link);
};

const handleMarkAllAsRead = () => {
  if (!currentUser.value) return;
  markAllAsRead(currentUser.value.id);
  loadNotifications();
};

const handleDelete = (id) => {
  deleteNotification(id);
  loadNotifications();
};
</script>