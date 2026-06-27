import { createApp } from "vue";
import App from "./App.vue";
import "./style.css";
import router from "./router/index.js";
import BaseIcon from "./ui/BaseIcon.vue";
import BaseButton from "./ui/BaseButton.vue";
import BaseImage from "./ui/BaseImage.vue";
import BaseAlert from "./ui/BaseAlert.vue";
import BaseBadge from "./ui/BaseBadge.vue";
import BaseCard from "./ui/BaseCard.vue";
import BaseBreadCrumbs from "./ui/BaseBreadCrumbs.vue";
import BaseForm from "./ui/BaseForm.vue";
import BaseHero from "./ui/BaseHero.vue";
import BaseInput from "./ui/BaseInput.vue";
import RoadmapInitial from "./ui/RoadmapInitial.vue";
import RoadmapStep from "./ui/RoadmapStep.vue";
import SideBar from './layouts/SideBar.vue'
// 🚨 1. Import de AOS et de ses styles CSS
import AOS from 'aos';
import 'aos/dist/aos.css';
import { mockAuth } from "./utils/mockAuth.js";
import SidebarCandidat from "./layouts/SidebarCandidat.vue";
import PublicLayout from "./layouts/PublicLayout.vue";
import EntrepriseLayout from "./layouts/EntrepriseLayout.vue";

mockAuth.init();
mockAuth.getUser();

const app = createApp(App);

app.use(router);

// composants de base 
app.component("BaseAlert", BaseAlert);
app.component("BaseBadge", BaseBadge);
app.component("BaseButton", BaseButton);
app.component("BaseCard", BaseCard);
app.component("BaseBreadCrumbs", BaseBreadCrumbs);
app.component("BaseForm", BaseForm);
app.component("BaseHero", BaseHero);
app.component("BaseInput", BaseInput);
app.component("BaseIcon", BaseIcon);
app.component("BaseImage", BaseImage);
app.component("RoadmapInitial",RoadmapInitial)
app.component("RoadmapStep",RoadmapStep)
// layouts
app.component("Sidebar",SideBar)
app.component("SideBarCandidat",SidebarCandidat)
app.component("PublicLayout",PublicLayout)
app.component("EntrepriseLayout",EntrepriseLayout)


// 🚨 2. Initialisation globale de AOS
AOS.init({
  duration: 800,     // Durée de l'animation en millisecondes (ex: 800ms)
  once: true,        // L'animation ne se déclenche QU'UNE SEULE fois (recommandé pour la perf)
  easing: 'ease-out' // Type de transition fluide
});

app.mount("#app");
