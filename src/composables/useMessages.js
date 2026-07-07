import { ref } from "vue";
import { useNotifications } from "./useNotifications";

/**
 * @typedef {Object} Conversation
 * @property {string} id
 * @property {number} candidatId
 * @property {number} entrepriseId
 * @property {string} lastMessage
 * @property {string} lastMessageAt
 * @property {string} createdAt
 */

/**
 * @typedef {Object} Message
 * @property {string} id
 * @property {string} conversationId
 * @property {number} senderId
 * @property {'candidat'|'entreprise'} senderRole
 * @property {string} content
 * @property {boolean} read
 * @property {string} createdAt
 */

const getLocal = (key) => JSON.parse(localStorage.getItem(key) || "[]");
const setLocal = (key, data) => localStorage.setItem(key, JSON.stringify(data));
const simulateNetwork = () => new Promise((resolve) => setTimeout(resolve, 400));

let convCounter = parseInt(localStorage.getItem("mosalah_conv_counter") || "1000");
const generateConvId = () => {
  convCounter++;
  localStorage.setItem("mosalah_conv_counter", convCounter.toString());
  return `conv_${convCounter}`;
};

let msgCounter = parseInt(localStorage.getItem("mosalah_msg_counter") || "1000");
const generateMsgId = () => {
  msgCounter++;
  localStorage.setItem("mosalah_msg_counter", msgCounter.toString());
  return `msg_${msgCounter}`;
};

const conversations = ref(getLocal("mosalah_database_conversations"));
const messages = ref(getLocal("mosalah_database_messages"));

export function useMessages() {
  const loading = ref(false);
  const error = ref(null);

  /**
   * Récupère une conversation existante entre un candidat et une entreprise,
   * ou la crée si elle n'existe pas encore.
   * @param {number} candidatId
   * @param {number} entrepriseId
   */
  const getOrCreateConversation = async (candidatId, entrepriseId) => {
    loading.value = true;
    try {
      await simulateNetwork();
      const all = getLocal("mosalah_database_conversations");
      let conv = all.find(
        (c) => c.candidatId === candidatId && c.entrepriseId === entrepriseId,
      );

      if (!conv) {
        conv = {
          id: generateConvId(),
          candidatId,
          entrepriseId,
          lastMessage: "",
          lastMessageAt: new Date().toISOString(),
          createdAt: new Date().toISOString(),
        };
        all.unshift(conv);
        setLocal("mosalah_database_conversations", all);
        conversations.value = all;
      }

      return conv;
    } catch (err) {
      error.value = "Impossible d'ouvrir la conversation.";
      return null;
    } finally {
      loading.value = false;
    }
  };

  /**
   * Récupère toutes les conversations d'un utilisateur, avec le profil de l'interlocuteur attaché.
   * @param {number} userId
   * @param {'candidat'|'entreprise'} role
   */
  const fetchConversations = async (userId, role) => {
    loading.value = true;
    try {
      await simulateNetwork();
      const allConv = getLocal("mosalah_database_conversations");
      const allUsers = getLocal("mosalah_database_users");
      const allMessages = getLocal("mosalah_database_messages");

      const key = role === "candidat" ? "candidatId" : "entrepriseId";
      const otherKey = role === "candidat" ? "entrepriseId" : "candidatId";

      const filtered = allConv
        .filter((c) => c[key] === userId)
        .map((c) => {
          const other = allUsers.find((u) => u.id === c[otherKey]);
          const unread = allMessages.filter(
            (m) => m.conversationId === c.id && m.senderId !== userId && !m.read,
          ).length;
          return { ...c, interlocutor: other || null, unreadCount: unread };
        })
        .sort((a, b) => new Date(b.lastMessageAt) - new Date(a.lastMessageAt));

      conversations.value = allConv;
      return filtered;
    } catch (err) {
      error.value = "Erreur lors du chargement des conversations.";
      return [];
    } finally {
      loading.value = false;
    }
  };

  /** Récupère les messages d'une conversation, triés du plus ancien au plus récent. */
  const fetchMessages = async (conversationId) => {
    loading.value = true;
    try {
      await simulateNetwork();
      const all = getLocal("mosalah_database_messages");
      messages.value = all;
      return all
        .filter((m) => m.conversationId === conversationId)
        .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    } catch (err) {
      error.value = "Erreur lors du chargement des messages.";
      return [];
    } finally {
      loading.value = false;
    }
  };

  /**
   * Envoie un message dans une conversation et notifie le destinataire.
   * @param {Object} params
   * @param {string} params.conversationId
   * @param {number} params.senderId
   * @param {'candidat'|'entreprise'} params.senderRole
   * @param {string} params.content
   */
  const sendMessage = async ({ conversationId, senderId, senderRole, content }) => {
    loading.value = true;
    try {
      await simulateNetwork();
      const allMessages = getLocal("mosalah_database_messages");
      const allConv = getLocal("mosalah_database_conversations");
      const allUsers = getLocal("mosalah_database_users");

      const newMessage = {
        id: generateMsgId(),
        conversationId,
        senderId,
        senderRole,
        content,
        read: false,
        createdAt: new Date().toISOString(),
      };

      allMessages.push(newMessage);
      setLocal("mosalah_database_messages", allMessages);
      messages.value = allMessages;

      const convIndex = allConv.findIndex((c) => c.id === conversationId);
      if (convIndex !== -1) {
        allConv[convIndex].lastMessage = content;
        allConv[convIndex].lastMessageAt = newMessage.createdAt;
        setLocal("mosalah_database_conversations", allConv);
        conversations.value = allConv;

        // --- Notification pour le destinataire ---
        const conv = allConv[convIndex];
        const recipientId =
          senderRole === "candidat" ? conv.entrepriseId : conv.candidatId;
        const sender = allUsers.find((u) => u.id === senderId);

        const { createNotification } = useNotifications();
        createNotification({
          userId: recipientId,
          type: "new_message",
          title: "Nouveau message",
          message: `${sender?.name || "Quelqu'un"} vous a envoyé un message.`,
          link: `/message?conversation=${conversationId}`,
        });
      }

      return newMessage;
    } catch (err) {
      error.value = "Impossible d'envoyer le message.";
      return null;
    } finally {
      loading.value = false;
    }
  };

  /** Marque tous les messages reçus dans une conversation comme lus par l'utilisateur courant. */
  const markConversationAsRead = (conversationId, readerId) => {
    const all = getLocal("mosalah_database_messages");
    all.forEach((m) => {
      if (m.conversationId === conversationId && m.senderId !== readerId) {
        m.read = true;
      }
    });
    setLocal("mosalah_database_messages", all);
    messages.value = all;
  };

  return {
    conversations,
    messages,
    loading,
    error,
    getOrCreateConversation,
    fetchConversations,
    fetchMessages,
    sendMessage,
    markConversationAsRead,
  };
}