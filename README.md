# Projet Fil Rouge - Groupe 4

# **Mosalah : Plateforme locale de recrutement**

## Présentation du projet

**Mosalah** est une plateforme numérique de recrutement conçue pour faciliter la mise en relation entre les chercheurs d'emploi et les entreprises au niveau local.

Elle offre un espace unique où les entreprises peuvent publier leurs offres d'emploi tandis que les candidats peuvent rechercher des opportunités, créer un profil professionnel et postuler directement depuis leur ordinateur ou leur téléphone.

L'objectif principal de Mosalah est de rendre le processus de recrutement plus simple, plus rapide et plus transparent pour l'ensemble des acteurs du marché de l'emploi.

---

# Valeur ajoutée

Mosalah se distingue par plusieurs atouts :

* Une plateforme pensée pour répondre aux besoins du marché local.
* Une centralisation des offres d'emploi et des candidatures sur une seule interface.
* Un suivi transparent de l'évolution des candidatures.
* Une communication simplifiée grâce à une messagerie intégrée.
* La possibilité d'organiser des entretiens vidéo sans quitter la plateforme.
* Une interface moderne, intuitive et accessible sur ordinateur comme sur mobile.

---

# Flux d'utilisation

| **Candidat**                                                                      | **Entreprise**                      |
| --------------------------------------------------------------------------------- | ----------------------------------- |
| Consulter les offres d'emploi                                                     | Publier des offres d'emploi         |
| Rechercher des opportunités correspondant à son profil                            | Gérer les offres publiées           |
| Créer un profil professionnel (biographie, compétences, expériences, projets, CV) | Consulter les profils des candidats |
| Postuler aux offres en quelques clics                                             | Recevoir et suivre les candidatures |
| Publier une demande d'emploi                                                      | Consulter les demandes d'emploi     |
| Échanger avec les recruteurs via la messagerie                                    | Échanger avec les candidats         |
| Participer à des entretiens vidéo                                                 | Organiser des entretiens vidéo      |

---

# Architecture du projet

## Architecture générale

Mosalah est développé selon une architecture **Frontend / Backend** afin de garantir une bonne organisation du code et de faciliter les évolutions futures.

Dans le cadre de ce prototype, seule la partie **Frontend** est entièrement implémentée. Les échanges avec le serveur sont simulés afin de reproduire le comportement d'une application réelle.

### Technologies utilisées

**Frontend**

* Vue.js 3 (Composition API)
* Vite
* Tailwind CSS v4
* DaisyUI
* Vue Router
* AOS (Animate On Scroll)
* Font Awesome

**Gestion des données**

En l'absence d'un backend définitif, les données sont temporairement stockées dans le **localStorage** du navigateur. Cette simulation permet de reproduire les principales fonctionnalités de la plateforme :

* gestion des utilisateurs ;
* gestion des offres d'emploi ;
* gestion des candidatures ;
* gestion des conversations ;
* gestion des notifications.

L'ensemble de cette logique est organisé dans plusieurs **Composables Vue**, ce qui facilite la réutilisation du code, la maintenance et la future migration vers une API REST.

---

# Évolutivité

L'architecture retenue permet d'intégrer ultérieurement un véritable backend (Laravel, Node.js, Symfony ou toute autre technologie REST) sans modifier l'organisation générale de l'application.

Cette approche facilite notamment :

* la sécurisation des données ;
* l'authentification des utilisateurs ;
* le stockage en base de données ;
* les paiements pour les abonnements Premium ;
* les notifications en temps réel ;
* les appels vidéo ;
* les recommandations intelligentes basées sur les profils et les offres.
