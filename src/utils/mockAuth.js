// Clé unique pour stocker la session
const STORAGE_KEY = 'mosalah_user_session';

export const mockAuth = {
  /**
   * Initialise le localStorage avec un faux utilisateur si aucun n'existe déjà.
   */
  init() {
    if (!localStorage.getItem(STORAGE_KEY)) {
      const fakeUser = {
        token: 'mock-jwt-token-xyz123',
        role: 'candidat',
        info: {
          fullName: 'Mosalah',
          email: 'mosalah@example.com',
          phone: '+33 6 12 34 56 78',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256&auto=format&fit=crop',
          visibility: 'Public',
          tags: ['React.js', 'Tailwind CSS', 'TypeScript'],
          bio: 'Développeur Frontend passionné par les interfaces fluides et responsives.'
        },
        preferences: {
          notifyApplications: true,
          weeklyReports: false
        }
      };
      
      localStorage.setItem(STORAGE_KEY, JSON.stringify(fakeUser));
      console.log('✨ [MockAuth] Utilisateur fictif initialisé dans le localStorage !');
    }
  },

  /**
   * Récupère les données de l'utilisateur connecté
   */
  getUser() {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  },

  /**
   * Met à jour une partie des données (ex: après modification du profil)
   */
  updateUser(newInfo) {
    const currentSession = this.getUser();
    if (currentSession) {
      currentSession.info = { ...currentSession.info, ...newInfo };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(currentSession));
      console.log('💾 [MockAuth] localStorage mis à jour avec succès.');
    }
  },

  /**
   * Simule une déconnexion en vidant le stockage
   */
  logout() {
    localStorage.removeItem(STORAGE_KEY);
    console.log('🚪 [MockAuth] Session supprimée du localStorage.');
  }
};