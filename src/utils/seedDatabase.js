/**
 * ============================================================
 * Script de génération de données de test (Seed) — Mosalah
 * ============================================================
 * Peuple le localStorage avec des utilisateurs, annonces,
 * candidatures, demandes d'emploi, notifications et messages
 * réalistes, en respectant exactement le schéma utilisé par
 * useAuth.js et useDb.js.
 *
 * ⚠️ USAGE : DEV UNIQUEMENT. Écrase les données existantes
 * sous les mêmes clés localStorage.
 *
 * Comment l'utiliser :
 * 1. Copie ce fichier dans src/utils/seedDatabase.js
 * 2. Dans main.js, ajoute temporairement :
 *      import { seedDatabase } from './utils/seedDatabase';
 *      window.seedDatabase = seedDatabase;
 * 3. Lance l'app, ouvre la console du navigateur, exécute :
 *      seedDatabase()
 * 4. Recharge la page.
 * 5. Retire l'import de main.js avant la mise en production.
 * ============================================================
 */

const setLocal = (key, data) => localStorage.setItem(key, JSON.stringify(data));

export function seedDatabase() {
  const password = "123"; // Mot de passe commun à tous les comptes de test

  // --- 1. UTILISATEURS ---
  const users = [
    // ===== CANDIDATS =====
    {
      id: 2001,
      name: "Jean Mouko",
      email: "jean.mouko@example.com",
      password,
      role: "candidat",
      createdAt: "12/03/2026",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=256&auto=format&fit=crop",
      location: "Brazzaville, Congo",
      yearsOfExperience: 3,
      availability: true,
      bio: "Développeur Fullstack passionné par l'écosystème JavaScript. J'aime construire des interfaces performantes et des API robustes.",
      skills: ["Vue.js", "Node.js", "JavaScript", "MongoDB", "Tailwind CSS"],
      languages: ["Français", "Anglais"],
      experiences: [
        {
          id: "exp_2001a",
          role: "Développeur Frontend",
          company: "Digital Congo",
          period: "2023 - Présent",
          description:
            "Développement d'interfaces utilisateurs avec Vue 3 et intégration d'API REST.",
        },
        {
          id: "exp_2001b",
          role: "Développeur Web Junior",
          company: "Agence NumériCo",
          period: "2021 - 2023",
          description:
            "Intégration de maquettes et développement de sites vitrines pour des PME locales.",
        },
      ],
      projects: [
        {
          id: "proj_2001a",
          title: "Mosalah",
          description:
            "Plateforme de recrutement locale connectant candidats et entreprises au Congo.",
          technologies: ["Vue.js", "DaisyUI", "LocalStorage"],
          link: "#",
        },
      ],
    },
    {
      id: 2002,
      name: "Sarah Nkouka",
      email: "s@g.com",
      password,
      role: "candidat",
      createdAt: "02/04/2026",
      avatar: "", // Volontairement vide : teste le fallback initiales
      location: "Pointe-Noire, Congo",
      yearsOfExperience: 2,
      availability: "Sous préavis de 1 mois",
      bio: "Data Analyst spécialisée dans la modélisation de données et la création de dashboards décisionnels.",
      skills: ["Python", "SQL", "PowerBI", "Excel"],
      languages: ["Français", "Anglais"],
      experiences: [
        {
          id: "exp_2002a",
          role: "Data Analyst",
          company: "CongoStat Consulting",
          period: "2024 - Présent",
          description:
            "Analyse de données de vente et création de rapports pour la direction commerciale.",
        },
      ],
      projects: [],
    },
    {
      id: 2003,
      name: "David Elenga",
      email: "david.elenga@example.com",
      password,
      role: "candidat",
      createdAt: "20/01/2026",
      avatar: "", // Volontairement vide : teste le fallback initiales
      location: "Brazzaville, Congo",
      yearsOfExperience: 4,
      availability: true,
      bio: "Designer UI/UX, je conçois des parcours utilisateurs clairs et des interfaces soignées pour le web et le mobile.",
      skills: ["Figma", "Adobe XD", "Prototypage", "Tailwind CSS"],
      languages: ["Français"],
      experiences: [
        {
          id: "exp_2003a",
          role: "Designer UI/UX",
          company: "ImmoCool Services",
          period: "2022 - Présent",
          description:
            "Refonte de la charte graphique et conception des parcours utilisateurs web et mobiles.",
        },
      ],
      projects: [
        {
          id: "proj_2003a",
          title: "Mosalah Design System",
          description: "Système de composants réutilisables pour la plateforme Mosalah.",
          technologies: ["Figma"],
          link: "#",
        },
      ],
    },

    // ===== ENTREPRISES =====
    {
      id: 3001,
      name: "TechSoft Africa",
      email: "contact@techsoft-africa.com",
      password,
      role: "entreprise",
      createdAt: "10/01/2026",
      avatar:
        "https://images.unsplash.com/photo-1560179707-f14e90ef3623?q=80&w=256&auto=format&fit=crop",
      location: "Brazzaville, Congo",
      bio: "Entreprise de développement logiciel spécialisée dans les solutions web pour les PME congolaises.",
      skills: [],
      languages: [],
      experiences: [],
      projects: [],
    },
    {
      id: 3002,
      name: "Banque du Congo",
      email: "recrutement@banqueducongo.cg",
      password,
      role: "entreprise",
      createdAt: "05/02/2026",
      avatar: "",
      location: "Brazzaville, Congo",
      bio: "Institution bancaire de référence en République du Congo.",
      skills: [],
      languages: [],
      experiences: [],
      projects: [],
    },
  ];

  setLocal("mosalah_database_users", users);

  // --- 2. ANNONCES ---
  const annonces = [
    {
      id: "ann_1001",
      entrepriseId: 3001,
      title: "Développeur Fullstack Vue.js / Node.js",
      company: "TechSoft Africa",
      companyTag: "Tech & Innovation",
      contractType: "CDI",
      category: "IT & Tech",
      location: "Brazzaville",
      salary: "600 000 FCFA",
      highlight: "Télétravail partiel possible",
      description:
        "Nous recherchons un développeur fullstack pour renforcer notre équipe produit et accompagner notre croissance.",
      applications: 2,
      views: 148,
      createdAt: "15/06/2026",
    },
    {
      id: "ann_1002",
      entrepriseId: 3001,
      title: "Designer UI/UX",
      company: "TechSoft Africa",
      companyTag: "Tech & Innovation",
      contractType: "Freelance",
      category: "Design",
      location: "Brazzaville",
      salary: "À débattre",
      highlight: "",
      description: "Mission freelance pour la refonte de notre application mobile.",
      applications: 1,
      views: 76,
      createdAt: "28/06/2026",
    },
    {
      id: "ann_1003",
      entrepriseId: 3002,
      title: "Analyste Financier",
      company: "Banque du Congo",
      companyTag: "Finance",
      contractType: "CDI",
      category: "Finance",
      location: "Brazzaville",
      salary: "2 100 000 FCFA",
      highlight: "Accès prioritaire aux candidats qualifiés",
      description:
        "Rejoignez notre département d'investissement pour des projets stratégiques.",
      applications: 1,
      views: 203,
      createdAt: "01/07/2026",
    },
  ];

  setLocal("mosalah_database_annonces", annonces);
  localStorage.setItem("mosalah_annonce_counter", "1003");

  // --- 3. CANDIDATURES ---
  const candidatures = [
    {
      id: "cand_1001",
      annonceId: "ann_1001",
      candidatId: 2001,
      message:
        "Fort de 3 ans d'expérience en Vue.js et Node.js, je pense correspondre parfaitement à ce poste.",
      status: "acceptee",
      createdAt: "20/06/2026",
    },
    {
      id: "cand_1002",
      annonceId: "ann_1001",
      candidatId: 2003,
      message:
        "Bien que designer de formation, je souhaite évoluer vers le développement fullstack.",
      status: "refusee",
      createdAt: "22/06/2026",
    },
    {
      id: "cand_1003",
      annonceId: "ann_1002",
      candidatId: 2003,
      message: "Mon expérience en design de systèmes correspond bien à cette mission.",
      status: "en_etude",
      createdAt: "29/06/2026",
    },
    {
      id: "cand_1004",
      annonceId: "ann_1003",
      candidatId: 2002,
      message:
        "Data analyst avec une forte appétence pour la finance, je souhaite rejoindre votre équipe.",
      status: "en_etude",
      createdAt: "03/07/2026",
    },
  ];

  setLocal("mosalah_database_candidatures", candidatures);
  localStorage.setItem("mosalah_candidature_counter", "1004");

  // --- 4. DEMANDES D'EMPLOI ---
  const demandes = [
    {
      id: "dem_1001",
      candidatId: 2002,
      title: "Data Analyst Senior — Disponible immédiatement",
      description:
        "Je recherche un poste de Data Analyst dans une entreprise ambitieuse, idéalement dans la finance ou l'assurance.",
      createdAt: "25/06/2026",
    },
  ];

  setLocal("mosalah_database_demandes", demandes);
  localStorage.setItem("mosalah_demande_counter", "1001");

  // --- 5. NOTIFICATIONS (exemples) ---
  const notifications = [
    {
      id: "notif_1001",
      userId: 3001,
      type: "new_candidature",
      title: "Nouvelle candidature reçue",
      message:
        'Jean Mouko a postulé à l\'offre "Développeur Fullstack Vue.js / Node.js".',
      link: "/entreprise/dashboard/offres/ann_1001",
      read: false,
      createdAt: "2026-06-20T09:30:00.000Z",
    },
    {
      id: "notif_1002",
      userId: 2001,
      type: "candidature_status",
      title: "Mise à jour de votre candidature",
      message:
        'Votre candidature pour "Développeur Fullstack Vue.js / Node.js" a été acceptée 🎉.',
      link: "/candidat/applications",
      read: false,
      createdAt: "2026-06-25T14:00:00.000Z",
    },
  ];

  setLocal("mosalah_database_notifications", notifications);
  localStorage.setItem("mosalah_notif_counter", "1002");

  // --- 6. CONVERSATIONS / MESSAGES (exemple) ---
  const conversations = [
    {
      id: "conv_1001",
      candidatId: 2001,
      entrepriseId: 3001,
      lastMessage: "Merci, nous vous recontactons cette semaine pour un entretien.",
      lastMessageAt: "2026-06-26T10:00:00.000Z",
      createdAt: "2026-06-20T09:35:00.000Z",
    },
  ];

  const messages = [
    {
      id: "msg_1001",
      conversationId: "conv_1001",
      senderId: 2001,
      senderRole: "candidat",
      content:
        "Bonjour, je viens de postuler à votre offre de Développeur Fullstack. Je reste disponible pour un échange.",
      read: true,
      createdAt: "2026-06-20T09:35:00.000Z",
    },
    {
      id: "msg_1002",
      conversationId: "conv_1001",
      senderId: 3001,
      senderRole: "entreprise",
      content: "Merci, nous vous recontactons cette semaine pour un entretien.",
      read: false,
      createdAt: "2026-06-26T10:00:00.000Z",
    },
  ];

  setLocal("mosalah_database_conversations", conversations);
  setLocal("mosalah_database_messages", messages);
  localStorage.setItem("mosalah_conv_counter", "1001");
  localStorage.setItem("mosalah_msg_counter", "1002");

  console.log("✅ Mosalah : base de données de test générée avec succès.");
  console.table(
    users.map((u) => ({ id: u.id, name: u.name, role: u.role, email: u.email })),
  );
  console.log(`Mot de passe pour tous les comptes de test : "${password}"`);
}