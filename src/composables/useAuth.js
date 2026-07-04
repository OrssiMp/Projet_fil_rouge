import { ref, computed } from "vue";
import { useRouter } from "vue-router";

/**
 * @typedef {Object} UserExperience
 * @property {string} id - Identifiant unique de l'expérience.
 * @property {string} role - Intitulé du poste occupé.
 * @property {string} company - Nom de l'entreprise.
 * @property {string} period - Période (ex: "2024 - Présent").
 * @property {string} description - Description des tâches effectuées.
 */

/**
 * @typedef {Object} UserProject
 * @property {string} id - Identifiant unique du projet.
 * @property {string} title - Nom du projet.
 * @property {string} description - Description ou résumé du projet.
 * @property {string[]} technologies - Liste des technologies et frameworks utilisés.
 * @property {string} [link] - Lien vers le dépôt ou le projet en ligne.
 */

/**
 * @typedef {Object} UserProfileData
 * @property {number} id - Identifiant unique de l'utilisateur.
 * @property {string} name - Nom complet ou raison sociale.
 * @property {string} email - Adresse de messagerie électronique.
 * @property {'candidat' | 'entreprise'} role - Rôle d'accès système.
 * @property {string} createdAt - Date d'inscription au format local.
 * @property {string} [avatar] - URL ou chaîne Base64 de l'image de profil.
 * @property {string} [location] - Ville ou zone géographique de résidence.
 * @property {number|string} [yearsOfExperience] - Nombre d'années d'expérience.
 * @property {boolean|string} [availability] - Statut de disponibilité pour de nouvelles opportunités.
 * @property {string} [bio] - Court texte de présentation ou biographie.
 * @property {string[]} [skills] - Liste des compétences techniques.
 * @property {string[]} [languages] - Liste des langues maîtrisées.
 * @property {UserExperience[]} [experiences] - Historique de parcours professionnel.
 * @property {UserProject[]} [projects] - Catalogue de projets réalisés.
 */

// État global partagé agissant comme un store léger persistant au rechargement
/** @type {import('vue').Ref<UserProfileData|null>} */
const currentUser = ref(
  JSON.parse(localStorage.getItem("mosalah_user") || "null"),
);

/**
 * Hook d'authentification et de gestion de session pour l'application Mosalah.
 * Gère l'état réactif de l'utilisateur connecté ainsi que les mutations du profil.
 *
 * @returns {{
 *   currentUser: import('vue').ComputedRef<UserProfileData|null>,
 *   isAuthenticated: import('vue').ComputedRef<boolean>,
 *   userRole: import('vue').ComputedRef<'candidat'|'entreprise'|null>,
 *   loading: import('vue').Ref<boolean>,
 *   error: import('vue').Ref<string|null>,
 *   success: import('vue').Ref<string|null>,
 *   register: (userData: Object) => Promise<void>,
 *   login: (email: string, password: string) => Promise<void>,
 *   logout: () => void,
 *   updateProfile: (profileFields: Partial<UserProfileData>) => Promise<boolean>,
 *   addExperience: (experience: Omit<UserExperience, 'id'>) => Promise<boolean>,
 *   addProject: (project: Omit<UserProject, 'id'>) => Promise<boolean>
 * }}
 */
export function useAuth() {
  const router = useRouter();
  const loading = ref(false);
  const error = ref(null);
  const success = ref(null);

  // Getters réactifs et encapsulés
  const isAuthenticated = computed(() => currentUser.value !== null);
  const userRole = computed(() => currentUser.value?.role || null);
  const userProfile = computed(() => currentUser.value);

  /**
   * Enregistre un nouvel utilisateur dans la base de données locale.
   * Connecte automatiquement le profil après création.
   *
   * @param {Object} userData - Les informations d'inscription.
   * @param {string} userData.name - Nom de l'utilisateur ou de l'entreprise.
   * @param {string} userData.email - Identifiant de connexion.
   * @param {string} userData.password - Clé secrète de validation.
   * @param {'candidat' | 'entreprise'} userData.role - Type d'espace de travail.
   * @returns {Promise<void>}
   */
  const register = async (userData) => {
    loading.value = true;
    error.value = null;
    success.value = null;

    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      const localUsers = JSON.parse(
        localStorage.getItem("mosalah_database_users") || "[]",
      );

      const emailExists = localUsers.some(
        (u) => u.email.toLowerCase() === userData.email.toLowerCase(),
      );
      if (emailExists) {
        throw new Error("Cette adresse email est déjà utilisée sur Mosalah.");
      }

      const newUser = {
        id: Date.now(),
        name: userData.name,
        email: userData.email,
        password: userData.password,
        role: userData.role,
        createdAt: new Date().toLocaleDateString("fr-FR"),
        avatar: "",
        location: "",
        yearsOfExperience: 0,
        availability: true,
        bio: "",
        skills: [],
        languages: [],
        experiences: [],
        projects: [],
      };

      localUsers.push(newUser);
      localStorage.setItem(
        "mosalah_database_users",
        JSON.stringify(localUsers),
      );

      const { password, ...sessionUser } = newUser;
      currentUser.value = sessionUser;
      localStorage.setItem("mosalah_user", JSON.stringify(sessionUser));

      success.value = "Votre compte a été créé avec succès !";
      redirectUser(sessionUser.role);
    } catch (err) {
      error.value =
        err.message || "Une erreur est survenue lors de l'inscription.";
    } finally {
      loading.value = false;
    }
  };

  /**
   * Vérifie les identifiants fournis et initialise la session utilisateur réactive.
   *
   * @param {string} email - L'adresse de messagerie de l'utilisateur.
   * @param {string} password - Le mot de passe associé.
   * @returns {Promise<void>}
   */
  const login = async (email, password, expectedRole = null) => {
    loading.value = true;
    error.value = null;
    success.value = null;

    try {
      await new Promise((resolve) => setTimeout(resolve, 600));
      const localUsers = JSON.parse(
        localStorage.getItem("mosalah_database_users") || "[]",
      );

      const user = localUsers.find(
        (u) =>
          u.email.toLowerCase() === email.toLowerCase() &&
          u.password === password,
      );

      if (!user) {
        throw new Error(
          "Identifiants incorrects. Veuillez vérifier votre email et mot de passe.",
        );
      }

      if (expectedRole && user.role !== expectedRole) {
        throw new Error(
          `Ce compte n'est pas enregistré en tant que ${expectedRole}.`,
        );
      }

      const { password: _, ...sessionUser } = user;
      currentUser.value = sessionUser;
      localStorage.setItem("mosalah_user", JSON.stringify(sessionUser));

      success.value = "Connexion réussie.";
      redirectUser(sessionUser.role);
    } catch (err) {
      error.value =
        err.message || "Une erreur est survenue lors de la connexion.";
    } finally {
      loading.value = false;
    }
  };

  /**
   * Détruit la session active et redirige l'application vers la page d'accueil.
   * @param {boolean} redirect - Si vrai, redirige l'utilisateur vers la page d'accueil.
   * @returns {void}
   */
  const logout = (redirect = true) => {
    currentUser.value = null;
    localStorage.removeItem("mosalah_user");
    if (redirect && router) {
      router.push({ name: "Login" });
    }
  };

  /**
   * Met à jour les métadonnées de profil de l'utilisateur actif (Bio, compétences, etc.).
   * Synchronise les modifications avec la base locale et l'état de session global.
   *
   * @param {Partial<UserProfileData>} profileFields - Un objet contenant les champs à modifier ou ajouter.
   * @returns {Promise<boolean>} Renvoie vrai si la mise à jour s'est terminée avec succès.
   */
  const updateProfile = async (profileFields) => {
    if (!currentUser.value) return false;
    loading.value = true;
    error.value = null;

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      const localUsers = JSON.parse(
        localStorage.getItem("mosalah_database_users") || "[]",
      );

      const userIndex = localUsers.findIndex(
        (u) => u.id === currentUser.value.id,
      );
      if (userIndex === -1)
        throw new Error("Utilisateur introuvable dans la base locale.");

      // Fusion des modifications dans le stockage physique de référence
      localUsers[userIndex] = { ...localUsers[userIndex], ...profileFields };
      localStorage.setItem(
        "mosalah_database_users",
        JSON.stringify(localUsers),
      );

      // Mise à jour synchrone du store réactif en cours d'utilisation
      const { password, ...updatedSession } = localUsers[userIndex];
      currentUser.value = updatedSession;
      localStorage.setItem("mosalah_user", JSON.stringify(updatedSession));

      success.value = "Profil mis à jour avec succès.";
      return true;
    } catch (err) {
      error.value = err.message || "Impossible de mettre à jour le profil.";
      return false;
    } finally {
      loading.value = false;
    }
  };

  /**
   * Ajoute une nouvelle expérience professionnelle au parcours du candidat.
   *
   * @param {Omit<UserExperience, 'id'>} experience - Les détails de l'expérience sans identifiant numérique.
   * @returns {Promise<boolean>}
   */
  const addExperience = async (experience) => {
    const currentExperiences = currentUser.value?.experiences || [];
    const newExperience = {
      id: `exp_${Date.now()}`,
      ...experience,
    };
    return await updateProfile({
      experiences: [newExperience, ...currentExperiences],
    });
  };

  /**
   * Ajoute une nouvelle réalisation ou un projet technique à la vitrine du candidat.
   *
   * @param {Omit<UserProject, 'id'>} project - Les caractéristiques du projet de développement.
   * @returns {Promise<boolean>}
   */
  const addProject = async (project) => {
    const currentProjects = currentUser.value?.projects || [];
    const newProject = {
      id: `proj_${Date.now()}`,
      ...project,
    };
    return await updateProfile({
      projects: [newProject, ...currentProjects],
    });
  };

  /**
   * Utilitaire d'aiguillage de routage suite aux changements d'états d'accès critiques.
   *
   * @param {'candidat' | 'entreprise'} role - Le rôle cible.
   * @private
   */
  const redirectUser = (role) => {
    if (!router) return;
    if (role === "entreprise") {
      router.push({ name: "EntrepriseDashboard" });
    } else if (role === "candidat") {
      router.push({ name: "CandidatDashboard" });
    } else {
      router.push({ name: "Home" });
    }
  };

  return {
    currentUser: userProfile,
    isAuthenticated,
    userRole,
    loading,
    error,
    success,
    register,
    login,
    logout,
    updateProfile,
    addExperience,
    addProject,
  };
}
