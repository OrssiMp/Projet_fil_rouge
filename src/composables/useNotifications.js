import { ref, computed } from "vue";

/**
 * @typedef {Object} Notification
 * @property {string} id
 * @property {number} userId - Destinataire de la notification.
 * @property {'new_offer'|'candidature_status'|'new_message'|'new_candidature'} type
 * @property {string} title
 * @property {string} message
 * @property {string} [link] - Route à ouvrir au clic (ex: "/offres/ann_1001").
 * @property {boolean} read
 * @property {string} createdAt
 */

const getLocal = () =>
  JSON.parse(localStorage.getItem("mosalah_database_notifications") || "[]");
const setLocal = (data) =>
  localStorage.setItem("mosalah_database_notifications", JSON.stringify(data));

let notifCounter = parseInt(
  localStorage.getItem("mosalah_notif_counter") || "1000",
);
const generateNotifId = () => {
  notifCounter++;
  localStorage.setItem("mosalah_notif_counter", notifCounter.toString());
  return `notif_${notifCounter}`;
};

// État partagé, un seul flux réactif pour toute l'app (comme currentUser dans useAuth)
const notifications = ref(getLocal());

export function useNotifications() {
  const loading = ref(false);
  const error = ref(null);

  /**
   * Crée une notification pour un utilisateur donné.
   * Fonction interne appelée par useDb lors d'événements métier (nouvelle annonce, candidature, etc.)
   *
   * @param {Omit<Notification, 'id' | 'read' | 'createdAt'>} data
   */
  const createNotification = (data) => {
    const all = getLocal();
    const newNotif = {
      id: generateNotifId(),
      read: false,
      createdAt: new Date().toISOString(),
      ...data,
    };
    all.unshift(newNotif);
    setLocal(all);
    notifications.value = all;
    return newNotif;
  };

  /**
   * Crée la même notification pour plusieurs destinataires en une fois (ex: nouvelle offre → tous les candidats).
   * @param {number[]} userIds
   * @param {Omit<Notification, 'id'|'read'|'createdAt'|'userId'>} data
   */
  const createBulkNotifications = (userIds, data) => {
    const all = getLocal();
    const created = userIds.map((userId) => ({
      id: generateNotifId(),
      userId,
      read: false,
      createdAt: new Date().toISOString(),
      ...data,
    }));
    all.unshift(...created);
    setLocal(all);
    notifications.value = all;
    return created;
  };

  /**
   * Récupère les notifications d'un utilisateur, triées des plus récentes aux plus anciennes.
   * @param {number} userId
   */
  const fetchNotifications = (userId) => {
    loading.value = true;
    error.value = null;
    try {
      const all = getLocal();
      notifications.value = all;
      return all
        .filter((n) => n.userId === userId)
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } catch (err) {
      error.value = "Erreur lors du chargement des notifications.";
      return [];
    } finally {
      loading.value = false;
    }
  };

  /** Nombre de notifications non lues pour un utilisateur (utile pour le badge dans la navbar). */
  const unreadCount = (userId) =>
    computed(
      () =>
        notifications.value.filter((n) => n.userId === userId && !n.read)
          .length,
    );

  const markAsRead = (notifId) => {
    const all = getLocal();
    const idx = all.findIndex((n) => n.id === notifId);
    if (idx !== -1) {
      all[idx].read = true;
      setLocal(all);
      notifications.value = all;
    }
  };

  const markAllAsRead = (userId) => {
    const all = getLocal();
    all.forEach((n) => {
      if (n.userId === userId) n.read = true;
    });
    setLocal(all);
    notifications.value = all;
  };

  const deleteNotification = (notifId) => {
    const all = getLocal().filter((n) => n.id !== notifId);
    setLocal(all);
    notifications.value = all;
  };

  return {
    notifications,
    loading,
    error,
    createNotification,
    createBulkNotifications,
    fetchNotifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    deleteNotification,
  };
}


