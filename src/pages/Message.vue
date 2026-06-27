<template>
  <div class="flex h-[calc(100vh-theme(spacing.16)-2px)] bg-base-100 rounded-2xl border border-base-300 overflow-hidden select-none" data-aos="fade-up">
    
    <aside class="w-full md:w-80 lg:w-96 border-r border-base-200 flex flex-col bg-base-50/50 shrink-0" :class="{ 'hidden md:flex': activeChat }">
      <div class="p-4 border-b border-base-200 bg-base-100 flex justify-between items-center h-16">
        <h1 class="text-xl font-black tracking-tight text-base-content flex items-center gap-2">
          <span>Discussions</span>
          <span v-if="isEntreprise" class="badge badge-sm badge-accent font-bold text-[10px]">PRO</span>
        </h1>
      </div>

      <div class="flex-1 overflow-y-auto p-2 flex flex-col gap-1">
        <button 
          v-for="chat in filteredConversations" 
          :key="chat.id"
          @click="activeChat = chat"
          class="flex items-center gap-3 p-3 rounded-xl transition-all duration-200 text-left w-full"
          :class="activeChat?.id === chat.id ? 'bg-accent text-white shadow-md shadow-accent/10' : 'hover:bg-base-200/60 bg-white border border-base-200/40'"
        >
          <div class="avatar placeholder shrink-0">
            <div class="w-11 h-11 rounded-xl font-bold text-sm overflow-hidden flex items-center justify-center shadow-sm" :class="activeChat?.id === chat.id ? 'bg-white text-accent' : 'bg-accent text-white'">
              <img v-if="chat.avatar" :src="chat.avatar" alt="Avatar" class="object-cover w-full h-full" />
              <span v-else>{{ chat.name.charAt(0).toUpperCase() }}</span>
            </div>
          </div>

          <div class="min-w-0 flex-1">
            <div class="flex justify-between items-baseline mb-0.5">
              <h3 class="text-xs font-black truncate" :class="activeChat?.id === chat.id ? 'text-white' : 'text-base-content'">
                {{ chat.name }}
              </h3>
              <span class="text-[10px] opacity-60 font-medium shrink-0 ml-1">{{ chat.time }}</span>
            </div>
            <p class="text-[11px] font-bold truncate mb-0.5 opacity-80" :class="activeChat?.id === chat.id ? 'text-emerald-100' : 'text-emerald-700'">
              {{ isEntreprise ? `Poste : ${chat.subtext}` : chat.subtext }}
            </p>
            <p class="text-xs truncate opacity-70 font-medium" :class="activeChat?.id === chat.id ? 'text-white/90' : 'text-base-content/60'">
              {{ chat.lastMessage }}
            </p>
          </div>
        </button>
      </div>
    </aside>

    <main class="flex-1 flex flex-col bg-base-100" :class="{ 'hidden': !activeChat, 'flex': activeChat }">
      
      <template v-if="activeChat">
        <header class="h-16 px-4 md:px-6 border-b border-base-200 flex items-center justify-between shrink-0 bg-base-100">
          <div class="flex items-center gap-3 min-w-0">
            <button @click="activeChat = null" class="btn btn-sm btn-ghost btn-square md:hidden text-base-content/70">
              ←
            </button>
            <div class="min-w-0">
              <h2 class="text-sm font-black text-base-content truncate">{{ activeChat.name }}</h2>
              <p class="text-xs text-emerald-700 font-extrabold truncate">{{ activeChat.subtext }}</p>
            </div>
          </div>
        </header>

        <div class="flex-1 overflow-y-auto p-4 md:p-6 bg-base-200/20 flex flex-col gap-3">
          <div 
            v-for="(msg, idx) in activeChat.messages" 
            :key="idx"
            class="flex flex-col max-w-[75%] gap-1"
            :class="msg.sender === currentRole ? 'self-end items-end' : 'self-start items-start'"
          >
            <div 
              class="px-4 py-2.5 rounded-2xl text-xs font-medium shadow-sm leading-relaxed"
              :class="msg.sender === currentRole ? 'bg-accent text-white rounded-tr-none' : 'bg-white border border-base-200 text-base-content rounded-tl-none'"
            >
              {{ msg.text }}
            </div>
            <span class="text-[9px] text-base-content/40 font-bold px-1">{{ msg.time }}</span>
          </div>
        </div>

        <footer class="p-4 border-t border-base-200 bg-base-100 shrink-0">
          <form @submit.prevent="sendMessage" class="flex gap-2">
            <input 
              v-model="newMessageInput"
              type="text" 
              placeholder="Écrivez votre message ici..." 
              class="input input-bordered flex-1 rounded-xl text-xs font-medium bg-white border-base-300 focus:outline-none focus:border-accent h-11"
            />
            <button type="submit" class="btn bg-accent hover:bg-accent/90 border-none text-white font-bold rounded-xl px-5 text-xs h-11 shadow-sm">
              Envoyer
            </button>
          </form>
        </footer>
      </template>

      <template v-else>
        <div class="flex-1 flex flex-col items-center justify-center text-center p-6 opacity-50">
          <span class="text-4xl mb-2">💬</span>
          <p class="text-sm font-bold text-base-content/60">Sélectionnez une discussion pour commencer à échanger</p>
        </div>
      </template>

    </main>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useAuth } from '../composables/useAuth';



const { currentUser } = useAuth();

// 🔌 Récupération dynamique du rôle actuel ('candidat' ou 'entreprise')
const currentRole = computed(() => currentUser.value?.role || 'candidat');
const isEntreprise = computed(() => currentRole.value === 'entreprise');

const activeChat = ref(null);
const newMessageInput = ref('');

// 🗃️ Données simulées adaptées selon qui regarde la page
const mockConversations = [
  {
    id: "chat_1",
    targetRole: "entreprise", // Affiché si le lecteur est un candidat
    name: "ImmoCool Services",
    subtext: "Agence Immobilière",
    avatar: "",
    time: "14:32",
    lastMessage: "Votre profil de développeur Vue.js nous intéresse beaucoup.",
    messages: [
      { sender: "entreprise", text: "Bonjour Orsi, j'ai vu vos packages npm.", time: "14:30" },
      { sender: "candidat", text: "Bonjour ! Merci beaucoup, je suis disponible pour échanger.", time: "14:31" },
      { sender: "entreprise", text: "Votre profil de développeur Vue.js nous intéresse beaucoup.", time: "14:32" }
    ]
  },
  {
    id: "chat_2",
    targetRole: "candidat", // Affiché si le lecteur est une entreprise
    name: "Orsi Malik",
    subtext: "Développeur Full-Stack Junior",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=128&auto=format&fit=crop",
    time: "Hier",
    lastMessage: "J'ai bien reçu le lien du test technique pour le projet.",
    messages: [
      { sender: "entreprise", text: "Pouvez-vous travailler sur notre architecture de framework ?", time: "Hier" },
      { sender: "candidat", text: "J'ai bien reçu le lien du test technique pour le projet.", time: "Hier" }
    ]
  },
  {
    id: "chat_3",
    targetRole: "candidat", // Affiché si le lecteur est une entreprise
    name: "Nelly Mpierre",
    subtext: "UI/UX Designer",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=128&auto=format&fit=crop",
    time: "10 Juin",
    lastMessage: "Voici la v2 des maquettes Figma pour le Dashboard.",
    messages: [
      { sender: "candidat", text: "Voici la v2 des maquettes Figma pour le Dashboard.", time: "10 Juin" }
    ]
  }
];

// 🛠️ Filtrage intelligent de la liste selon le rôle connecté
const filteredConversations = computed(() => {
  if (isEntreprise.value) {
    // Une entreprise voit uniquement les candidats
    return mockConversations.filter(c => c.targetRole === 'candidat');
  } else {
    // Un candidat voit uniquement les entreprises
    return mockConversations.filter(c => c.targetRole === 'entreprise');
  }
});

// ✉️ Soumission d'un nouveau message
const sendMessage = () => {
  const text = newMessageInput.value.trim();
  if (!text || !activeChat.value) return;

  activeChat.value.messages.push({
    sender: currentRole.value,
    text: text,
    time: "À l'instant"
  });

  // Mise à jour rapide du dernier message dans la liste latérale
  activeChat.value.lastMessage = text;
  activeChat.value.time = "À l'instant";
  
  newMessageInput.value = '';
};
</script>