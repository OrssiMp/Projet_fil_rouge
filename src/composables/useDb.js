import { ref, computed } from "vue";
import { useNotifications } from "./useNotifications";
/**
 * @typedef {Object} Annonce
 * @property {string} id - Identifiant unique de l'annonce.
 * @property {number} entrepriseId - ID de l'entreprise qui recrute.
 * @property {string} title - Titre du poste.
 * @property {string} description - Description détaillée de l'offre.
 * @property {string} type - Type de contrat (CDI, CDD, Freelance, etc.).
 * @property {string} location - Lieu de travail.
 * @property {string} createdAt - Date de publication.
 */

/**
 * @typedef {Object} Candidature
 * @property {string} id - Identifiant unique de la candidature.
 * @property {string} annonceId - ID de l'annonce visée.
 * @property {number} candidatId - ID du candidat qui postule.
 * @property {string} message - Lettre de motivation ou message court.
 * @property {string} createdAt - Date de la candidature.
 */

/**
 * @typedef {Object} DemandeEmploi
 * @property {string} id - Identifiant unique de la demande.
 * @property {number} candidatId - ID du candidat recherchant un emploi.
 * @property {string} title - Titre du profil (ex: "Développeur Vue.js Senior").
 * @property {string} description - Description de ce que le candidat recherche.
 * @property {string} createdAt - Date de publication.
 */

export function useDb() {
  const loading = ref(false);
  const error = ref(null);

  // État réactif pour stocker les données récupérées
  const users = ref([]);
  const annonces = ref([]);
  const candidatures = ref([]);
  const demandesEmploi = ref([]);

  // --- UTILITAIRES INTERNES ---
  const getLocal = (key) => JSON.parse(localStorage.getItem(key) || "[]");
  const setLocal = (key, data) =>
    localStorage.setItem(key, JSON.stringify(data));
  const simulateNetwork = () =>
    new Promise((resolve) => setTimeout(resolve, 500));

  // Générateur d'ID simple et prédictible pour les tests
  let annonceCounter = parseInt(
    localStorage.getItem("mosalah_annonce_counter") || "1000",
  );
  const generateAnnonceId = () => {
    annonceCounter++;
    localStorage.setItem("mosalah_annonce_counter", annonceCounter.toString());
    return `ann_${annonceCounter}`;
  };

  let candidatureCounter = parseInt(
    localStorage.getItem("mosalah_candidature_counter") || "1000",
  );
  const generateCandidatureId = () => {
    candidatureCounter++;
    localStorage.setItem(
      "mosalah_candidature_counter",
      candidatureCounter.toString(),
    );
    return `cand_${candidatureCounter}`;
  };

  let demandeCounter = parseInt(
    localStorage.getItem("mosalah_demande_counter") || "1000",
  );
  const generateDemandeId = () => {
    demandeCounter++;
    localStorage.setItem("mosalah_demande_counter", demandeCounter.toString());
    return `dem_${demandeCounter}`;
  };

  // --- 1. GESTION DES UTILISATEURS ---

  /**
   * Récupère la liste de tous les utilisateurs (candidats et entreprises).
   * @param {'candidat' | 'entreprise' | null} roleFilter - Filtre optionnel par rôle.
   * @returns {Promise<Array>} Liste des utilisateurs
   */
  const fetchUsers = async (roleFilter = null) => {
    loading.value = true;
    error.value = null;
    try {
      await simulateNetwork();
      let allUsers = getLocal("mosalah_database_users");

      // On retire les mots de passe pour la sécurité côté front
      allUsers = allUsers.map(({ password, ...userSafedata }) => userSafedata);

      if (roleFilter) {
        allUsers = allUsers.filter((u) => u.role === roleFilter);
      }
      users.value = allUsers;
      return allUsers;
    } catch (err) {
      error.value = "Erreur lors de la récupération des utilisateurs.";
    } finally {
      loading.value = false;
    }
  };

  const getCandidates = () => fetchUsers("candidat");
  const getEntreprises = () => fetchUsers("entreprise");

  /**
   * Récupère un utilisateur par son ID.
   * @param {string} userId
   * @returns {Promise<Object|null>}
   */
  const getUserById = async (userId) => {
    loading.value = true;
    try {
      await simulateNetwork();
      const allUsers = getLocal("mosalah_database_users");
      const user = allUsers.find((u) => u.id === userId);
      if (user) {
        const { password, ...safeUser } = user;
        return safeUser;
      }
      return null;
    } catch (err) {
      error.value = "Erreur lors de la récupération de l'utilisateur.";
      return null;
    } finally {
      loading.value = false;
    }
  };
/**
 * Récupère une demande d'emploi spécifique, enrichie du profil complet de son auteur.
 * @param {string} demandeId
 */
const getDemandeById = async (demandeId) => {
  loading.value = true;
  try {
    await simulateNetwork();
    const allDemandes = getLocal("mosalah_database_demandes");
    const demande = allDemandes.find((d) => d.id === demandeId);
    if (!demande) {
      error.value = "Demande introuvable.";
      return null;
    }
    const allUsers = getLocal("mosalah_database_users");
    const author = allUsers.find((u) => u.id === demande.candidatId);
    const { password, ...safeAuthor } = author || {};
    return { ...demande, author: author ? safeAuthor : null };
  } catch (err) {
    error.value = "Erreur lors de la récupération de la demande.";
    return null;
  } finally {
    loading.value = false;
  }
};
  /**
   * Met à jour le profil d'un utilisateur.
   * @param {string} userId
   * @param {Object} profileData
   * @returns {Promise<boolean>}
   */
  const updateUserProfile = async (userId, profileData) => {
    loading.value = true;
    try {
      await simulateNetwork();
      const allUsers = getLocal("mosalah_database_users");
      const index = allUsers.findIndex((u) => u.id === userId);

      if (index === -1) {
        throw new Error("Utilisateur non trouvé.");
      }

      allUsers[index] = { ...allUsers[index], ...profileData };
      setLocal("mosalah_database_users", allUsers);

      // Mettre à jour l'état réactif si l'utilisateur est dans la liste
      const stateIndex = users.value.findIndex((u) => u.id === userId);
      if (stateIndex !== -1) {
        const { password, ...safeUser } = allUsers[index];
        users.value[stateIndex] = safeUser;
      }

      return true;
    } catch (err) {
      error.value = err.message || "Erreur lors de la mise à jour du profil.";
      return false;
    } finally {
      loading.value = false;
    }
  };


  // --- 2. GESTION DES ANNONCES (Entreprises) ---

  /**
   * Crée une nouvelle annonce d'emploi (Côté entreprise).
   * @param {Omit<Annonce, 'id' | 'createdAt'>} annonceData
   */

  // ...
  const createAnnonce = async (annonceData) => {
    loading.value = true;
    try {
      await simulateNetwork();
      const currentAnnonces = getLocal("mosalah_database_annonces");
      const newAnnonce = {
        id: generateAnnonceId(),
        ...annonceData,
        applications: 0,
        views: 0, // ← ajouté
        createdAt: new Date().toLocaleDateString("fr-FR"),
      };

      currentAnnonces.unshift(newAnnonce);
      setLocal("mosalah_database_annonces", currentAnnonces);
      annonces.value = currentAnnonces;

      // --- Notification : nouvelle offre pour tous les candidats ---
      const { createBulkNotifications } = useNotifications();
      const allUsers = getLocal("mosalah_database_users");
      const candidatIds = allUsers
        .filter((u) => u.role === "candidat")
        .map((u) => u.id);

      createBulkNotifications(candidatIds, {
        type: "new_offer",
        title: "Nouvelle offre disponible",
        message: `Une nouvelle offre "${newAnnonce.title}" vient d'être publiée.`,
        link: `/offres/${newAnnonce.id}`,
      });

      return newAnnonce;
    } catch (err) {
      error.value = "Impossible de créer l'annonce.";
      return null;
    } finally {
      loading.value = false;
    }
  };
/**
 * Modifie une annonce existante (titre, description, statut, etc.).
 * @param {string} annonceId
 * @param {Object} updates
 */
const updateAnnonce = async (annonceId, updates) => {
  loading.value = true;
  try {
    await simulateNetwork();
    const allAnnonces = getLocal("mosalah_database_annonces");
    const idx = allAnnonces.findIndex((a) => a.id === annonceId);
    if (idx === -1) throw new Error("Annonce introuvable.");
    allAnnonces[idx] = { ...allAnnonces[idx], ...updates };
    setLocal("mosalah_database_annonces", allAnnonces);
    annonces.value = allAnnonces;
    return allAnnonces[idx];
  } catch (err) {
    error.value = err.message || "Impossible de modifier l'annonce.";
    return null;
  } finally {
    loading.value = false;
  }
};

/**
 * Supprime une annonce et nettoie les candidatures liées (évite les orphelines).
 * @param {string} annonceId
 */
const deleteAnnonce = async (annonceId) => {
  loading.value = true;
  try {
    await simulateNetwork();
    const allAnnonces = getLocal("mosalah_database_annonces");
    setLocal("mosalah_database_annonces", allAnnonces.filter((a) => a.id !== annonceId));

    const allCandidatures = getLocal("mosalah_database_candidatures");
    setLocal(
      "mosalah_database_candidatures",
      allCandidatures.filter((c) => c.annonceId !== annonceId),
    );
    return true;
  } catch (err) {
    error.value = "Impossible de supprimer l'annonce.";
    return false;
  } finally {
    loading.value = false;
  }
};
  /**
   * Récupère toutes les annonces, avec le compteur de candidatures pour chacune.
   * @returns {Promise<Array>} Tableau de toutes les annonces enrichies
   */
  const fetchAnnonces = async () => {
    loading.value = true;
    try {
      await simulateNetwork();
      const allAnnonces = getLocal("mosalah_database_annonces");

      // On utilise le compteur de candidatures stocké dans l'annonce
      annonces.value = allAnnonces.map((annonce) => ({
        ...annonce,
        candidaturesCount: annonce.applications || 0,
      }));

      return annonces.value;
    } catch (err) {
      error.value = "Erreur lors du chargement des annonces.";
    } finally {
      loading.value = false;
    }
  };

  /**
   * Récupère une annonce spécifique par son ID.
   * @param {string} annonceId - ID de l'annonce à récupérer
   * @returns {Promise<Object|null>} L'annonce enrichie ou null si non trouvée
   */
  const getAnnonceById = async (annonceId) => {
    loading.value = true;
    try {
      await simulateNetwork();
      const allAnnonces = getLocal("mosalah_database_annonces");
      const allCandidatures = getLocal("mosalah_database_candidatures");
      const allUsers = getLocal("mosalah_database_users");

      const incrementAnnonceViews = (annonceId) => {
        const allAnnonces = getLocal("mosalah_database_annonces");
        const idx = allAnnonces.findIndex((a) => a.id === annonceId);
        if (idx !== -1) {
          allAnnonces[idx].views = (allAnnonces[idx].views || 0) + 1;
          setLocal("mosalah_database_annonces", allAnnonces);
        }
      };
      const annonce = allAnnonces.find((a) => a.id === annonceId);
      if (!annonce) {
        error.value = "Annonce non trouvée.";
        return null;
      }
      incrementAnnonceViews(annonceId);

      // Récupérer les infos de l'entreprise
      const entreprise = allUsers.find((u) => u.id === annonce.entrepriseId);

      return {
        ...annonce,
        candidaturesCount: annonce.applications || 0,
        entreprise: entreprise
          ? {
              id: entreprise.id,
              name: entreprise.name,
              email: entreprise.email,
              location: entreprise.location,
              logo: entreprise.logo,
            }
          : null,
      };
    } catch (err) {
      error.value = "Erreur lors de la récupération de l'annonce.";
      return null;
    } finally {
      loading.value = false;
    }
  };

  // --- 3. GESTION DES CANDIDATURES (Candidats) ---

  /**
   * Permet à un candidat de postuler à une annonce.
   * @param {Omit<Candidature, 'id' | 'createdAt'>} candidatureData
   */
  const applyToAnnonce = async (candidatureData) => {
    loading.value = true;
    try {
      await simulateNetwork();
      const currentCandidatures = getLocal("mosalah_database_candidatures");
      const currentAnnonces = getLocal("mosalah_database_annonces");

      const hasAlreadyApplied = currentCandidatures.some(
        (c) =>
          c.annonceId === candidatureData.annonceId &&
          c.candidatId === candidatureData.candidatId,
      );

      if (hasAlreadyApplied) {
        throw new Error("Vous avez déjà postulé à cette annonce.");
      }

      const newCandidature = {
        id: generateCandidatureId(),
        ...candidatureData,
        status: "en_etude", // 'en_etude' | 'acceptee' | 'refusee'
        createdAt: new Date().toLocaleDateString("fr-FR"),
      };

      currentCandidatures.push(newCandidature);
      setLocal("mosalah_database_candidatures", currentCandidatures);

      const annonceIndex = currentAnnonces.findIndex(
        (a) => a.id === candidatureData.annonceId,
      );
      if (annonceIndex !== -1) {
        currentAnnonces[annonceIndex].applications =
          (currentAnnonces[annonceIndex].applications || 0) + 1;
        setLocal("mosalah_database_annonces", currentAnnonces);

        // --- Notification : nouvelle candidature pour l'entreprise ---
        const { createNotification } = useNotifications();
        const allUsers = getLocal("mosalah_database_users");
        const candidat = allUsers.find(
          (u) => u.id === candidatureData.candidatId,
        );

        createNotification({
          userId: currentAnnonces[annonceIndex].entrepriseId,
          type: "new_candidature",
          title: "Nouvelle candidature reçue",
          message: `${candidat?.name || "Un candidat"} a postulé à l'offre "${currentAnnonces[annonceIndex].title}".`,
          link: `/entreprise/dashboard/offres/${candidatureData.annonceId}`,
        });
      }

      return newCandidature;
    } catch (err) {
      error.value = err.message || "Erreur lors de l'envoi de la candidature.";
      return false;
    } finally {
      loading.value = false;
    }
  };

  /**
   * Récupère toutes les candidatures faites pour une annonce spécifique (Pour l'entreprise).
   * @param {string} annonceId
   */
  const fetchCandidaturesForAnnonce = async (annonceId) => {
    loading.value = true;
    try {
      await simulateNetwork();
      const allCandidatures = getLocal("mosalah_database_candidatures");
      const allUsers = getLocal("mosalah_database_users");

      // On récupère les candidatures et on y attache les infos du candidat
      const filtered = allCandidatures
        .filter((c) => c.annonceId === annonceId)
        .map((c) => {
          const candidatInfos = allUsers.find((u) => u.id === c.candidatId);
          return { ...c, candidatProfile: candidatInfos || null };
        });

      candidatures.value = filtered;
      return filtered;
    } catch (err) {
      error.value = "Impossible de récupérer les candidatures.";
    } finally {
      loading.value = false;
    }
  };
  /**
   * Récupère toutes les candidatures faites pour les annonces d'une entreprise spécifique (Pour l'entreprise).
   * @param {string} entrepriseId
   */
  const fetchCandidaturesForEntreprise = async (entrepriseId) => {
    loading.value = true;
    try {
      await simulateNetwork();
      const allAnnonces = getLocal("mosalah_database_annonces");
      const allCandidatures = getLocal("mosalah_database_candidatures");
      const allUsers = getLocal("mosalah_database_users");

      const myAnnonceIds = allAnnonces
        .filter((a) => a.entrepriseId === entrepriseId)
        .map((a) => a.id);

      const filtered = allCandidatures
        .filter((c) => myAnnonceIds.includes(c.annonceId))
        .map((c) => {
          const candidatInfos = allUsers.find((u) => u.id === c.candidatId);
          return { ...c, candidatProfile: candidatInfos || null };
        });

      candidatures.value = filtered;
      return filtered;
    } catch (err) {
      error.value = "Impossible de récupérer les candidatures.";
      return [];
    } finally {
      loading.value = false;
    }
  };
  // --- 4. GESTION DES DEMANDES D'EMPLOI (Candidats) ---

  /**
   * Publie une nouvelle demande d'emploi de la part d'un candidat.
   * @param {Omit<DemandeEmploi, 'id' | 'createdAt'>} demandeData
   */
  const createDemandeEmploi = async (demandeData) => {
    loading.value = true;
    try {
      await simulateNetwork();
      const currentDemandes = getLocal("mosalah_database_demandes");
      const newDemande = {
        id: generateDemandeId(),
        ...demandeData,
        createdAt: new Date().toLocaleDateString("fr-FR"),
      };

      currentDemandes.unshift(newDemande);
      setLocal("mosalah_database_demandes", currentDemandes);
      demandesEmploi.value = currentDemandes;
      return newDemande;
    } catch (err) {
      error.value = "Impossible de publier la demande d'emploi.";
      return null;
    } finally {
      loading.value = false;
    }
  };

  /**
   * Récupère toutes les demandes d'emploi (Pour les entreprises qui cherchent des profils).
   */
const fetchDemandesEmploi = async () => {
  loading.value = true;
  try {
    await simulateNetwork();
    const allDemandes = getLocal("mosalah_database_demandes");
    const allUsers = getLocal("mosalah_database_users");

    demandesEmploi.value = allDemandes.map((demande) => {
      const author = allUsers.find((u) => u.id === demande.candidatId);
      // Retrait du mot de passe avant d'exposer le profil (fuite corrigée)
      const authorProfile = author ? (({ password, ...safe }) => safe)(author) : null;
      return { ...demande, authorProfile };
    });

    return demandesEmploi.value;
  } catch (err) {
    error.value = "Erreur lors du chargement des demandes d'emploi.";
  } finally {
    loading.value = false;
  }
};
  /**
   * Récupère toutes les demandes d'emploi publiées par un candidat spécifique.
   * @param {number} candidatId
   * @returns {Promise<Array>}
   */
  const fetchDemandesByCandidat = async (candidatId) => {
    loading.value = true;
    try {
      await simulateNetwork();
      const allDemandes = getLocal("mosalah_database_demandes");
      return allDemandes.filter((d) => d.candidatId === candidatId);
    } catch (err) {
      error.value = "Erreur lors du chargement des demandes.";
      return [];
    } finally {
      loading.value = false;
    }
  };

  /**
   * Récupère toutes les candidatures d'un candidat, enrichies des infos de l'annonce et de l'entreprise.
   * @param {number} candidatId
   */
  const fetchCandidaturesForCandidat = async (candidatId) => {
    loading.value = true;
    try {
      await simulateNetwork();
      const allCandidatures = getLocal("mosalah_database_candidatures");
      const allAnnonces = getLocal("mosalah_database_annonces");
      const allUsers = getLocal("mosalah_database_users");

      const filtered = allCandidatures
        .filter((c) => c.candidatId === candidatId)
        .map((c) => {
          const annonce = allAnnonces.find((a) => a.id === c.annonceId);
          const entreprise = annonce
            ? allUsers.find((u) => u.id === annonce.entrepriseId)
            : null;
          return {
            ...c,
            job: annonce?.title || "Poste inconnu",
            company: entreprise?.name || "Entreprise inconnue",
            location: annonce?.location || "Non spécifié",
            contractType: annonce?.contractType || "Non spécifié",
            category: annonce?.category || null,
            salary: annonce?.salary || "À débattre",
          };
        });

      candidatures.value = filtered;
      return filtered;
    } catch (err) {
      error.value = "Impossible de récupérer vos candidatures.";
      return [];
    } finally {
      loading.value = false;
    }
  };

  /**
   * Retire (supprime) une candidature du candidat et décrémente le compteur de l'annonce.
   * @param {string} candidatureId
   */
  const withdrawCandidature = async (candidatureId) => {
    loading.value = true;
    try {
      await simulateNetwork();
      const allCandidatures = getLocal("mosalah_database_candidatures");
      const target = allCandidatures.find((c) => c.id === candidatureId);
      if (!target) throw new Error("Candidature introuvable.");

      setLocal(
        "mosalah_database_candidatures",
        allCandidatures.filter((c) => c.id !== candidatureId),
      );

      const allAnnonces = getLocal("mosalah_database_annonces");
      const annonceIndex = allAnnonces.findIndex(
        (a) => a.id === target.annonceId,
      );
      if (annonceIndex !== -1) {
        allAnnonces[annonceIndex].applications = Math.max(
          0,
          (allAnnonces[annonceIndex].applications || 1) - 1,
        );
        setLocal("mosalah_database_annonces", allAnnonces);
      }
      return true;
    } catch (err) {
      error.value = err.message || "Impossible de retirer la candidature.";
      return false;
    } finally {
      loading.value = false;
    }
  };

  /**
   * Supprime une demande d'emploi publiée par un candidat.
   * @param {string} demandeId
   */
  const deleteDemandeEmploi = async (demandeId) => {
    loading.value = true;
    try {
      await simulateNetwork();
      const allDemandes = getLocal("mosalah_database_demandes");
      setLocal(
        "mosalah_database_demandes",
        allDemandes.filter((d) => d.id !== demandeId),
      );
      return true;
    } catch (err) {
      error.value = "Impossible de supprimer la demande.";
      return false;
    } finally {
      loading.value = false;
    }
  };
  /**
   * Met à jour le statut d'une candidature (accepté, en étude, refusé) et notifie le candidat.
   * @param {string} candidatureId
   * @param {'en_etude' | 'acceptee' | 'refusee'} newStatus
   */
  const updateCandidatureStatus = async (candidatureId, newStatus) => {
    loading.value = true;
    try {
      await simulateNetwork();
      const allCandidatures = getLocal("mosalah_database_candidatures");
      const allAnnonces = getLocal("mosalah_database_annonces");

      const idx = allCandidatures.findIndex((c) => c.id === candidatureId);
      if (idx === -1) throw new Error("Candidature introuvable.");

      allCandidatures[idx].status = newStatus;
      setLocal("mosalah_database_candidatures", allCandidatures);

      const annonce = allAnnonces.find(
        (a) => a.id === allCandidatures[idx].annonceId,
      );

      const statusLabels = {
        en_etude: "est en cours d'étude",
        acceptee: "a été acceptée 🎉",
        refusee: "n'a malheureusement pas été retenue",
      };

      const { createNotification } = useNotifications();
      createNotification({
        userId: allCandidatures[idx].candidatId,
        type: "candidature_status",
        title: "Mise à jour de votre candidature",
        message: `Votre candidature pour "${annonce?.title || "une offre"}" ${statusLabels[newStatus]}.`,
        link: `/candidat/applications`,
      });

      return true;
    } catch (err) {
      error.value = err.message || "Impossible de mettre à jour le statut.";
      return false;
    } finally {
      loading.value = false;
    }
  };

  return {
    // États réactifs
    loading,
    error,
    users,
    annonces,
    candidatures,
    demandesEmploi,

    // Méthodes Utilisateurs
    fetchUsers,
    getCandidates,
    getEntreprises,
    getUserById,
    updateUserProfile,

    // Méthodes Annonces (Entreprise)
    createAnnonce,
    updateAnnonce,
    deleteAnnonce,
    fetchAnnonces,
    getAnnonceById,



    // Méthodes Candidatures (Mixte)
    applyToAnnonce,
    updateCandidatureStatus,
    fetchCandidaturesForAnnonce,
    fetchCandidaturesForEntreprise,
    fetchDemandesByCandidat,
    // Méthodes Demandes d'emploi (Candidat)
    createDemandeEmploi,
    fetchDemandesEmploi,
    deleteDemandeEmploi,
    getDemandeById,
    // Méthodes Candidatures (Candidat)
    fetchCandidaturesForCandidat,
    withdrawCandidature,
  };
}
