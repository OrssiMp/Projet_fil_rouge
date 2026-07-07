<template>
  <div
    class="flex h-[calc(100vh-theme(spacing.16)-2px)] bg-base-100 rounded-2xl border border-base-300 overflow-hidden select-none"
    data-aos="fade-up"
  >
    <!-- BARRE LATÉRALE : Liste des conversations -->
    <aside
      class="w-full md:w-80 lg:w-96 border-r border-base-200 flex flex-col bg-base-50/50 shrink-0 transition-all duration-300"
      :class="{ 'hidden md:flex': activeChat }"
    >
      <div
        class="p-4 border-b border-base-200 bg-base-100 flex justify-between items-center h-16"
      >
        <h1
          class="text-xl font-black tracking-tight text-base-content flex items-center gap-2"
        >
          <span>Discussions</span>
          <!-- <span v-if="isEntreprise" class="badge badge-sm bg-[#006643] text-white border-none font-bold text-[10px]">PRO</span> -->
        </h1>
      </div>

      <div class="flex-1 overflow-y-auto p-2 flex flex-col gap-1">
        <!-- État de chargement -->
        <div v-if="loading" class="flex flex-col gap-2 p-2">
          <div
            v-for="n in 4"
            :key="n"
            class="skeleton h-16 w-full rounded-xl bg-base-300/40"
          ></div>
        </div>

        <!-- État vide -->
        <div
          v-else-if="filteredConversations.length === 0"
          class="text-center p-6 opacity-50 mt-10"
        >
          <span class="text-3xl mb-2 block">📭</span>
          <p class="text-xs font-bold text-base-content/70">
            Aucun contact disponible pour le moment.
          </p>
        </div>

        <!-- Liste des contacts -->
        <button
          v-else
          v-for="chat in filteredConversations"
          :key="chat.id"
          @click="selectChat(chat)"
          class="flex items-center gap-3 p-3 rounded-xl transition-all duration-200 text-left w-full border"
          :class="
            activeChat?.id === chat.id
              ? 'bg-emerald-500 text-white border-[#006643] shadow-md'
              : 'hover:bg-base-200/60 bg-white border-transparent hover:border-base-200/40'
          "
        >
          <div class="avatar placeholder shrink-0">
            <div
              class="w-11 h-11 rounded-xl font-bold text-sm overflow-hidden flex items-center justify-center shadow-sm transition-colors"
              :class="
                activeChat?.id === chat.id
                  ? 'bg-white text-[#006643]'
                  : 'bg-base-200 text-base-content/70'
              "
            >
              <img
                v-if="chat.avatar"
                :src="chat.avatar"
                alt="Avatar"
                class="object-cover w-full h-full"
              />
              <span v-else>{{ chat.name.charAt(0).toUpperCase() }}</span>
            </div>
          </div>

          <div class="min-w-0 flex-1">
            <div class="flex justify-between items-baseline mb-0.5">
              <h3
                class="text-sm font-black truncate transition-colors"
                :class="
                  activeChat?.id === chat.id
                    ? 'text-white'
                    : 'text-base-content'
                "
              >
                {{ chat.name }}
              </h3>
              <span class="text-[10px] opacity-60 font-medium shrink-0 ml-1">
                {{ chat.lastMessageTime || "" }}
              </span>
            </div>
            <p
              class="text-[11px] font-bold truncate mb-0.5 transition-colors"
              :class="
                activeChat?.id === chat.id
                  ? 'text-emerald-100'
                  : 'text-[#006643]'
              "
            >
              {{ chat.subtext }}
            </p>
            <p
              class="text-xs truncate font-medium transition-colors"
              :class="
                activeChat?.id === chat.id
                  ? 'text-white/80'
                  : 'text-base-content/50'
              "
            >
              {{ chat.lastMessageText || "Nouvelle conversation..." }}
            </p>
          </div>
        </button>
      </div>
    </aside>

    <!-- ZONE PRINCIPALE : Chat actif -->
    <main
      class="flex-1 flex flex-col bg-base-100 relative"
      :class="{ hidden: !activeChat, flex: activeChat }"
    >
      <template v-if="activeChat">
        <header
          class="h-16 px-4 md:px-6 border-b border-base-200 flex items-center justify-between shrink-0 bg-white z-10 shadow-sm"
        >
          <div class="flex items-center gap-3 min-w-0">
            <button
              @click="activeChat = null"
              class="btn btn-sm btn-ghost btn-square md:hidden text-base-content/70"
            >
              ←
            </button>
            <div class="min-w-0">
              <h2 class="text-sm font-black text-base-content truncate">
                {{ activeChat.name }}
              </h2>
              <p class="text-xs text-[#006643] font-extrabold truncate">
                {{ activeChat.subtext }}
              </p>
            </div>
          </div>
        </header>

        <!-- Conteneur des messages -->
        <div
          ref="messagesContainer"
          class="flex-1 overflow-y-auto p-4 md:p-6 bg-base-200/30 flex flex-col gap-3 scroll-smooth"
        >
          <div
            v-if="!activeChat.messages?.length"
            class="flex-1 flex flex-col items-center justify-center opacity-40 text-center"
          >
            <span class="text-4xl mb-2">👋</span>
            <p class="text-xs font-bold">
              Soyez le premier à envoyer un message à {{ activeChat.name }}
            </p>
          </div>

          <div
            v-for="msg in activeChat.messages"
            :key="msg.id"
            class="flex flex-col max-w-[80%] md:max-w-[70%] gap-1"
            :class="
              msg.senderId === currentUser.id
                ? 'self-end items-end'
                : 'self-start items-start'
            "
          >
            <div
              class="px-4 py-2.5 rounded-2xl text-sm font-medium shadow-sm leading-relaxed"
              :class="
                msg.senderId === currentUser.id
                  ? 'bg-[#006643] text-white rounded-tr-none'
                  : 'bg-white border border-base-200 text-base-content rounded-tl-none'
              "
            >
              {{ msg.text }}
            </div>
            <span class="text-[9px] text-base-content/40 font-bold px-1">{{
              msg.time
            }}</span>
          </div>
        </div>

        <!-- Zone de saisie -->
        <footer class="p-4 border-t border-base-200 bg-white shrink-0">
          <form @submit.prevent="sendMessage" class="flex gap-2">
            <input
              v-model="newMessageInput"
              type="text"
              placeholder="Écrivez votre message ici..."
              class="input input-bordered flex-1 rounded-xl text-sm font-medium bg-base-100 border-base-300 focus:outline-none focus:border-[#006643] focus:ring-1 focus:ring-[#006643] h-12"
            />
            <button
              type="submit"
              :disabled="!newMessageInput.trim()"
              class="btn bg-[#006643] hover:bg-[#004d32] disabled:bg-base-300 disabled:text-base-content/40 border-none text-white font-bold rounded-xl px-6 text-sm h-12 shadow-sm transition-all"
            >
              Envoyer
            </button>
          </form>
        </footer>
      </template>

      <!-- État vide (Aucun chat sélectionné) -->
      <template v-else>
        <div
          class="flex-1 flex flex-col items-center justify-center text-center p-6 bg-base-100/50"
        >
          <div
            class="w-20 h-20 bg-base-200 rounded-full flex items-center justify-center mb-4"
          >
            <span class="text-4xl">💬</span>
          </div>
          <h3 class="text-lg font-black text-base-content mb-1">
            Vos messages
          </h3>
          <p class="text-sm font-medium text-base-content/50 max-w-xs">
            Sélectionnez une discussion dans le menu latéral pour commencer à
            échanger.
          </p>
        </div>
      </template>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick } from "vue";
import { useAuth } from "../composables/useAuth";
import { useDb } from "../composables/useDb";

// --- INITIALISATION ---
const { currentUser } = useAuth();
const { fetchUsers, loading } = useDb();

const activeChat = ref(null);
const newMessageInput = ref("");
const messagesContainer = ref(null);
const allConversations = ref([]);

const isEntreprise = computed(() => currentUser.value?.role === "entreprise");

// --- CHARGEMENT DES DONNÉES ---
onMounted(async () => {
  if (!currentUser.value) return;

  // 1. Récupérer tous les utilisateurs depuis useDb
  const users = await fetchUsers();

  // 2. Récupérer l'historique global des messages (simulé via localStorage)
  const allMessages = JSON.parse(
    localStorage.getItem("mosalah_messages") || "[]",
  );

  // 3. Déterminer les contacts à afficher selon le rôle
  const targetRole = isEntreprise.value ? "candidat" : "entreprise";
  const contacts = users.filter((u) => u.role === targetRole);

  // 4. Construire les objets de conversation
  allConversations.value = contacts.map((contact) => {
    // Filtrer les messages qui lient l'utilisateur courant et ce contact
    const threadMessages = allMessages.filter(
      (m) =>
        (m.senderId === currentUser.value.id && m.receiverId === contact.id) ||
        (m.senderId === contact.id && m.receiverId === currentUser.value.id),
    );

    const lastMsg = threadMessages[threadMessages.length - 1];

    // Sous-titre intelligent
    let subtext = contact.location || "Brazzaville, Congo";
    if (contact.role === "candidat") subtext = contact.title || "Développeur";
    if (contact.role === "entreprise") subtext = "Recruteur";

    return {
      id: contact.id, // L'ID de la conversation est l'ID du contact visé
      name: contact.name,
      avatar: contact.avatar,
      subtext: subtext,
      messages: threadMessages,
      lastMessageText: lastMsg?.text || "",
      lastMessageTime: lastMsg?.time || "",
    };
  });

  // Trier pour mettre les conversations avec des messages en haut
  allConversations.value.sort((a, b) => b.messages.length - a.messages.length);
});

// Liste réactive (utile pour d'éventuels filtres de recherche plus tard)
const filteredConversations = computed(() => allConversations.value);

// --- MÉTHODES ---

const selectChat = async (chat) => {
  activeChat.value = chat;
  await nextTick();
  scrollToBottom();
};

const scrollToBottom = () => {
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
  }
};

const sendMessage = async () => {
  const text = newMessageInput.value.trim();
  if (!text || !activeChat.value || !currentUser.value) return;

  const now = new Date();
  const timeString = now.toLocaleTimeString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const newMessage = {
    id: `msg_${Date.now()}`,
    senderId: currentUser.value.id,
    receiverId: activeChat.value.id,
    text: text,
    time: timeString,
    timestamp: now.getTime(),
  };

  // 1. Mettre à jour l'interface immédiatement
  activeChat.value.messages.push(newMessage);
  activeChat.value.lastMessageText = text;
  activeChat.value.lastMessageTime = timeString;
  newMessageInput.value = "";

  // 2. Scroller en bas
  await nextTick();
  scrollToBottom();

  // 3. Sauvegarder dans localStorage (Simulation DB)
  const allMessages = JSON.parse(
    localStorage.getItem("mosalah_messages") || "[]",
  );
  allMessages.push(newMessage);
  localStorage.setItem("mosalah_messages", JSON.stringify(allMessages));
};
</script>
