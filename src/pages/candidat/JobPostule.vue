<template>
  <div class="min-h-screen bg-base-200/40 pb-16 select-none flex flex-col justify-between">
    
    <nav class="bg-base-100 border-b border-base-200 py-4 px-6 flex justify-between items-center">
      <span class="text-xl font-black text-emerald-700 tracking-wide">Mosalah</span>
      <RouterLink :to="`/jobs/${props.id}`" class="text-sm font-semibold text-base-content/60 hover:text-base-content flex items-center gap-1 transition-colors">
        Annuler ✕
      </RouterLink>
    </nav>

    <main class="flex-grow flex items-center justify-center px-4 py-12">
      <BaseCard v-if="job" class="w-full max-w-3xl overflow-hidden shadow-[0_4px_25px_rgba(0,0,0,0.02)] border border-base-200" density="spacious" data-aos="zoom-in">
        
        <div class="mb-6">
          <h1 class="text-2xl font-black text-base-content tracking-tight mb-1">
            Candidature
          </h1>
          <p class="text-xs md:text-sm text-base-content/60 font-medium">
            Révisez les informations ci-dessous et complétez votre dossier.
          </p>
        </div>

        <div class="bg-emerald-50/40 border border-emerald-100/70 rounded-xl p-4 mb-8 flex flex-col gap-2">
          <h2 class="text-base font-extrabold text-base-content">
            {{ job.title }}
          </h2>
          <div class="flex flex-wrap gap-4 text-xs font-semibold text-base-content/60">
            <span class="flex items-center gap-1">🏢 {{ job.company }}</span>
            <span class="flex items-center gap-1">📍 {{ job.location }}</span>
            <span class="flex items-center gap-1">💼 {{ job.type }}</span>
          </div>
        </div>

        <BaseForm @submit="handleApply" class="flex flex-col gap-5">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <BaseInput v-model="form.fullName" label="NOM COMPLET" placeholder="Jean Dupont" icon="user" disabled />
            <BaseInput v-model="form.email" label="EMAIL" type="email" placeholder="jean.dupont@email.com" icon="mail" disabled />
          </div>

          <div class="flex flex-col gap-2">
            <label class="text-xs font-black text-base-content/40 tracking-wider uppercase">Curriculum Vitae *</label>
            <div 
              @dragover.prevent="isDragging = true"
              @dragleave.prevent="isDragging = false"
              @drop.prevent="handleFileDrop"
              @click="$refs.fileInput.click()"
              class="border-2 border-dashed rounded-2xl p-8 text-center flex flex-col items-center justify-center gap-3 cursor-pointer transition-all duration-200"
              :class="[isDragging ? 'border-emerald-500 bg-emerald-50/40' : 'border-base-300 hover:border-emerald-500 hover:bg-base-200/30', form.cvFile ? 'border-emerald-500 bg-emerald-50/10' : '']"
            >
              <input type="file" ref="fileInput" class="hidden" accept=".pdf,.docx" @change="handleFileSelect" />
              <div class="w-12 h-12 rounded-xl bg-base-200 flex items-center justify-center text-base-content/60">📄</div>
              <div v-if="!form.cvFile" class="text-sm font-medium text-base-content/80">
                <p>Glissez-déposez votre CV ici ou <span class="text-emerald-700 font-bold hover:underline">parcourez vos fichiers</span></p>
                <p class="text-xs text-base-content/50 mt-1">Formats acceptés : PDF, DOCX (Max 5Mo)</p>
              </div>
              <div v-else class="text-sm font-bold text-emerald-700">✔️ {{ form.cvFile.name }}</div>
            </div>
          </div>

          <div class="flex flex-col gap-2">
            <div class="flex justify-between items-center">
              <label class="text-xs font-black text-base-content/40 tracking-wider uppercase">Message au recruteur</label>
              <span class="text-xs font-medium text-base-content/40">(Optionnel)</span>
            </div>
            <textarea v-model="form.message" placeholder="Présentez brièvement vos motivations..." class="textarea textarea-bordered w-full h-32 rounded-2xl p-4 text-sm font-medium bg-base-100 border-base-300 focus:border-emerald-500 focus:outline-none transition-all resize-none"></textarea>
          </div>

          <template #actions>
            <div class="flex justify-end mt-4">
              <BaseButton type="submit" variant="accent" icon="send" class="w-full sm:w-auto px-8 shadow-md" :disabled="!form.cvFile">
                Envoyer ma candidature
              </BaseButton>
            </div>
          </template>
        </BaseForm>
      </BaseCard>

      <BaseCard v-else class="w-full max-w-3xl text-center py-12 text-base-content/50 font-medium">
        Chargement des détails de l'offre...
      </BaseCard>
    </main>

    <footer class="bg-base-100 border-t border-base-200 py-5 px-6 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs md:text-sm font-semibold text-base-content/50">
      <span>Mosalah</span>
      <span>© 2026 Mosalah. Recrutement en toute transparence.</span>
    </footer>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';


// Réception de la prop id définie dans le routeur
const props = defineProps({
  id: {
    type: String,
    required: true
  }
});

const job = ref(null);
const isDragging = ref(false);

const form = reactive({
  fullName: 'Jean Dupont', 
  email: 'jean.dupont@email.com',
  cvFile: null,
  message: ''
});

// Simulation de la récupération de l'offre (À remplacer par ton store ou appel API Axios/Fetch)
onMounted(() => {
  console.log("Fetch de l'offre d'emploi ID :", props.id);
  
  // Simulation de réponse API
  setTimeout(() => {
    job.value = {
      id: props.id,
      title: props.id == '1' ? "Développeur Frontend" : "Développeur Full-Stack JavaScript",
      company: "ABC Tech",
      location: "Pointe-Noire (Hybride)",
      type: "CDI"
    };
  }, 300);
});

const handleFileSelect = (e) => { validateAndSetFile(e.target.files[0]); };
const handleFileDrop = (e) => { isDragging.value = false; validateAndSetFile(e.dataTransfer.files[0]); };

const validateAndSetFile = (file) => {
  if (!file) return;
  if (file.size > 5 * 1024 * 1024) return alert("Fichier trop lourd (Max 5Mo).");
  form.cvFile = file;
};

const handleApply = () => {
  console.log(`Candidature soumise pour le job #${props.id}`, form);
};
</script>