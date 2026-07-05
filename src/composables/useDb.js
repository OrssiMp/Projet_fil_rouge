import { ref, computed } from "vue";

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

  // --- 2. GESTION DES ANNONCES (Entreprises) ---

  /**
   * Crée une nouvelle annonce d'emploi (Côté entreprise).
   * @param {Omit<Annonce, 'id' | 'createdAt'>} annonceData
   */
  const createAnnonce = async (annonceData) => {
    loading.value = true;
    try {
      await simulateNetwork();
      const currentAnnonces = getLocal("mosalah_database_annonces");
      const newAnnonce = {
        id: generateAnnonceId(),
        ...annonceData,
        applications: 0,
        createdAt: new Date().toLocaleDateString("fr-FR"),
      };

      currentAnnonces.unshift(newAnnonce);
      setLocal("mosalah_database_annonces", currentAnnonces);
      annonces.value = currentAnnonces;
      return newAnnonce;
    } catch (err) {
      error.value = "Impossible de créer l'annonce.";
      return null;
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

      const annonce = allAnnonces.find((a) => a.id === annonceId);
      if (!annonce) {
        error.value = "Annonce non trouvée.";
        return null;
      }

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

      // Vérifier si le candidat a déjà postulé
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
        createdAt: new Date().toLocaleDateString("fr-FR"),
      };

      currentCandidatures.push(newCandidature);
      setLocal("mosalah_database_candidatures", currentCandidatures);

      // Mettre à jour le compteur de candidatures dans l'annonce
      const annonceIndex = currentAnnonces.findIndex(
        (a) => a.id === candidatureData.annonceId,
      );
      if (annonceIndex !== -1) {
        currentAnnonces[annonceIndex].applications =
          (currentAnnonces[annonceIndex].applications || 0) + 1;
        setLocal("mosalah_database_annonces", currentAnnonces);
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
        return { ...demande, authorProfile: author || null };
      });

      return demandesEmploi.value;
    } catch (err) {
      error.value = "Erreur lors du chargement des demandes d'emploi.";
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

    // Méthodes Annonces (Entreprise)
    createAnnonce,
    fetchAnnonces,
    getAnnonceById,

    // Méthodes Candidatures (Mixte)
    applyToAnnonce,
    fetchCandidaturesForAnnonce,

    // Méthodes Demandes d'emploi (Candidat)
    createDemandeEmploi,
    fetchDemandesEmploi,
  };
}
