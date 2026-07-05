Voici la liste des composants fondamentaux (**`Base...`**) que nous avons structurés et uniformisés jusqu'à présent pour l'écosystème de **Mosalah** :

---

### 🧱 La Collection des Composants Globaux

* **`BaseIcon.vue`**
* **Rôle :** Le pivot visuel de l'application. Il centralise et affiche toutes tes icônes via des alias simples (`menu`, `entreprise`, `candidat`, `lock`, `chevron-bas`, `chevron-gauche`, `chevron-droite`, `validation`, `cloche`, `dashboard`, `reglage`, etc.).

* **`BaseCard.vue`**
* **Rôle :** Le conteneur universel basé sur daisyUI. Il gère l'élévation, les bordures, le comportement au survol (`hoverable`) et s'ajuste selon trois niveaux de densité (`compact`, `normal`, `spacious`) avec des structures de `slots` pour injecter des en-têtes ou des pieds de page.

* **`CandidateCard.vue`**
* **Rôle :** Carte réutilisable pour l'affichage des profils candidats. Elle normalise l'affichage des avatars, des statuts, des compétences et des actions (voir le profil, bookmark, noter) dans les listes publiques et recruteur.

* **`BaseBadge.vue`**
* **Rôle :** Utilisé pour l'affichage de statuts courts, de tags de contrats (CDI, CDD) ou d'états de candidatures (*Acceptée*, *En attente*, *Refusée*), en se synchronisant avec les variations de couleurs de ton thème.

* **`BaseBreadcrumbs.vue`**
* **Rôle :** Le fil d'ariane intelligent et 100% automatisé. Il écoute passivement `vue-router` et génère la hiérarchie des liens dynamiquement en se basant sur le tableau de tes routes (`meta.title`).

* **BaseButton.vue**

* **Rôle** : Le composant d'action standardisé. Il encapsule les classes daisyUI (btn, btn-accent, btn-outline, etc.) et gère de manière transparente les états de chargement (loading), les tailles (sm, md) et les icônes intégrées sans surcharger ton code HTML.

* **BaseInput.vue**

* **Rôle** : La brique de saisie universelle. Elle standardise le rendu de tes champs de texte, gère le v-model (via v-model de Vue 3 ou defineModel), l'affichage des messages d'erreur de validation et l'intégration optionnelle d'icônes à l'intérieur du champ (comme on l'a vu sur la barre de recherche).

C'est une excellente initiative Orssi. Avoir une documentation centralisée et propre en Markdown permettra à ton équipe de savoir exactement quelles briques utiliser et comment les paramétrer sans réinventer la roue.

Voici le contenu complet et prêt à être copié-collé dans ton fichier **`BASE_COMPONENTS.md`** :

```markdown
# 🏗️ Documentation des Composants de Base — Mosalah (v1.0)

Ce document centralise et documente l'ensemble des composants fondamentaux réutilisables de l'application **Mosalah**. Ils sont construits avec **Vue 3 (Composition API)**, utilisent **Tailwind CSS** et **daisyUI**, et intègrent les dernières nouveautés de performance comme `defineModel`.

---

## 🧭 Table des Matières
1. [BaseIcon](#-1-baseiconvue)
2. [BaseButton](#-2-basebuttonvue)
3. [BaseInput](#-3-baseinputvue)
4. [BaseCard](#-4-basecardvue)
5. [BaseBadge](#-5-basebadgevue)
6. [BaseBreadcrumbs](#-6-basebreadcrumbsvue)

---

## 🏷️ 1. `BaseIcon.vue`
Le pivot visuel de l'application. Il centralise et affiche toutes les icônes de la plateforme via des alias textuels standardisés.

### Propriétés (Props)
| Propriété | Type | Défaut | Description |
| :--- | :--- | :--- | :--- |
| `name` | `String` | *(Requis)* | L'alias de l'icône à afficher (ex: `'menu'`, `'candidat'`, `'lock'`). |

### Liste des alias communs à maintenir
* `dashboard` : Icône du tableau de bord
* `entreprise` / `candidat` : Profils ou espaces dédiés
* `offre` : Symbole de mallette pour les postes d'emploi
* `lock` : Cadenas pour la sécurité ou déconnexion
* `chevron-bas`, `chevron-gauche`, `chevron-droite` : Flèches de navigation
* `validation` : Badge de succès ou élément postulé
* `cloche` : Icône de notifications ou d'alertes

### Exemple d'utilisation
```vue
<BaseIcon name="validation" class="text-emerald-500 text-sm" />

```

---

## 🔘 2. `BaseButton.vue`

Le composant d'action standardisé. Il encapsule les types d'affichages daisyUI et gère nativement les états complexes comme le chargement (`loading`).

### Propriétés (Props)

| Propriété | Type | Défaut | Description |
| --- | --- | --- | --- |
| `type` | `String` | `'button'` | Type HTML (`'button'`, `'submit'`). |
| `variant` | `String` | `'primary'` | Style visuel (`'primary'`, `'accent'`, `'outline'`, `'ghost'`). |
| `size` | `String` | `'md'` | Dimension du bouton (`'sm'`, `'md'`). |
| `round` | `Boolean` | `false` | Si `true`, applique des bords complètement circulaires (`rounded-full`). |
| `disabled` | `Boolean` | `false` | Désactive les interactions sur le bouton. |
| `loading` | `Boolean` | `false` | Active le spinner daisyUI et bloque les clics. |
| `icon` | `String` | `''` | Alias d'une icône à placer à gauche du texte. |

### Exemples d'utilisation

```vue
<BaseButton variant="accent" size="sm" round icon="lock">
  Inscription
</BaseButton>

<BaseButton variant="primary" :loading="isSubmitting" type="submit">
  Enregistrer les modifications
</BaseButton>

```

---

## ✍️ 3. `BaseInput.vue`

La brique de saisie universelle propulsée par `defineModel()`. Elle gère automatiquement la liaison bidirectionnelle (`v-model`), les erreurs et l'intégration des icônes de contexte.

### Propriétés (Props)

| Propriété | Type | Défaut | Description |
| --- | --- | --- | --- |
| `label` | `String` | `''` | Texte affiché au-dessus du champ. |
| `type` | `String` | `'text'` | Type HTML (`'text'`, `'email'`, `'password'`). |
| `placeholder` | `String` | `''` | Texte d'aide en fond de champ. |
| `icon` | `String` | `''` | Alias d'icône inséré proprement à gauche du texte de saisie. |
| `error` | `String` | `''` | Message d'erreur textuel (colore le champ en rouge si présent). |

### Exemple d'utilisation

```vue
<BaseInput 
  v-model="searchPoste" 
  label="Poste recherché" 
  placeholder="Ex: Développeur Vue.js" 
  icon="candidat" 
  :error="errors.searchPoste"
/>

```

---

## 🎴 4. `BaseCard.vue`

Le conteneur universel basé sur le système de cartes daisyUI. Il structure les blocs de données, les éléments de liste et les widgets statistiques.

### Propriétés (Props)

| Propriété | Type | Défaut | Description |
| --- | --- | --- | --- |
| `title` | `String` | `''` | Titre rapide injecté dans l'en-tête de la carte. |
| `hoverable` | `Boolean` | `false` | Active l'effet d'ombre et de bordure au survol de la souris. |
| `density` | `String` | `'normal'` | Gestion interne des paddings (`'compact'`, `'normal'`, `'spacious'`). |

### Zones d'injection (Slots)

* `default` : Corps principal de la carte.
* `header` : Personnalisation avancée de l'en-tête (écrase la prop `title`).
* `footer` : Barre d'action basse alignée à droite.

### Exemple d'utilisation

```vue
<BaseCard title="Dernières candidatures" hoverable>
  <div class="space-y-2">
    <p class="text-sm">Contenu de la liste ou données dynamiques...</p>
  </div>
  <template #footer>
    <BaseButton variant="ghost" size="sm">Fermer</BaseButton>
    <BaseButton variant="accent" size="sm">Voir tout</BaseButton>
  </template>
</BaseCard>

```

---

## badge 5. `BaseBadge.vue`

Idéal pour afficher des statuts, des types de contrat (CDI, CDD) ou des labels courts. Il s'adapte à la charte de couleurs de l'application.

### Exemple d'utilisation

```vue
<BaseBadge class="bg-emerald-50 text-emerald-700 border-emerald-200">
  Acceptée
</BaseBadge>

```

---

## 🗺️ 6. `BaseBreadcrumbs.vue`

Le fil d'ariane intelligent et autonome. **Il ne prend aucune prop**, il écoute passivement l'historique de `vue-router` et génère l'arborescence des liens automatiquement en lisant le `meta.title` de la route active.

### Configuration requise dans le routeur (`src/router/index.js`)

Pour que le fil d'ariane affiche un texte propre, l'objet `meta` de la route doit impérativement déclarer un `title` :

```javascript
{
  path: '/dashboard/candidatures',
  component: MesCandidatures,
  meta: { layout: 'CandidatDashboard', title: 'Mes candidatures' }
}

```

### Exemple d'utilisation dans n'importe quelle page

```vue
<BaseBreadcrumbs />

```

---

## 🚀 Directives de développement pour l'équipe

1. **Pas de styles codés en dur** : Utilisez toujours les utilitaires de couleurs sémantiques de daisyUI (`text-base-content`, `bg-base-100`, `text-accent`) pour garantir le bon rendu.
2. **Priorité aux composants de base** : Il est interdit d'écrire des balises `<button class="btn...">` ou `<input class="input...">` standard dans les pages. Utilisez exclusivement `<BaseButton>` et `<BaseInput>`.

#### 5. Version "Call to Action" (Fin de page avec note explicative)

Idéal pour conclure une landing page ou inciter à une conversion rapide. Utilise le saut de ligne sémantique dans le sous-titre pour la mention légale discrète.

```vue
<BaseHero centered variant="soft">
  <template #title>Prêt à sauter le pas ?</template>
  <template #subtitle>
    Rejoignez la communauté dès aujourd'hui.
    <span class="block text-xs text-base-content/40 italic mt-4">Gratuit et sans engagement.</span>
  </template>
  <template #actions>
    <BaseButton variant="accent" @click="onSubmit">Créer un compte</BaseButton>
  </template>
</BaseHero>












## 📝 7. `BaseForm.vue`
Ce composant centralise la soumission des données, l'affichage des retours d'état de l'API (succès/échecs globaux) et harmonise l'alignement des boutons d'actions finaux.

### Propriétés (Props)
| Propriété | Type | Défaut | Valeurs acceptées | Description |
| :--- | :--- | :--- | :--- | :--- |
| `cols` | `Number \| String` | `1` | `1`, `2`, `3` | Configure la grille des champs sur écran de bureau. |
| `alignActions` | `String` | `'end'` | `'start'`, `'center'`, `'end'` | Aligne les boutons du bas. |
| `error` | `String` | `''` | Texte libre | Message d'erreur global (ex: "Identifiants incorrects"). |
| `success` | `String` | `''` | Texte libre | Message de succès (ex: "Compte créé avec succès"). |

### Zones d'injection (Slots)
* `default` : Reçoit les composants de saisie (`<BaseInput>`, sélecteurs, etc.).
* `actions` : Destiné aux boutons de soumission ou d'annulation (`<BaseButton>`).

### Exemple d'utilisation rapide (Grille double colonne)
```vue
<BaseForm cols="2" @submit="saveData">
  <BaseInput v-model="form.name" label="Nom complet" />
  <BaseInput v-model="form.phone" label="Téléphone" />
  <template #actions>
    <BaseButton variant="accent" type="submit">Enregistrer</BaseButton>
  </template>
</BaseForm>

#### 2. Intégration dans un Écran d'Authentification (`Login / Register`)
Montre comment imbriqués les champs de formulaires sécurisés et comment gérer un positionnement absolu pour les liens annexes (comme "Mot de passe oublié") directement au-dessus d'un `<BaseInput>`.

```vue
<BaseCard class="max-w-md">
  <BaseForm @submit="onLogin">
    <BaseInput v-model="email" type="email" label="Email" icon="mail" />
    <div class="relative">
      <BaseInput v-model="password" type="password" label="Mot de passe" icon="lock" />
      <a href="#" class="absolute right-1 top-1 text-xs text-accent">Lien externe</a>
    </div>
    <template #actions>
      <BaseButton type="submit" variant="accent" class="w-full">Action</BaseButton>
    </template>
  </BaseForm>
</BaseCard>




















````

image

🧠 Les bonnes pratiques intégrées (Pourquoi c'est bon pour le SEO et les perfs)
Anti-CLS (Cumulative Layout Shift) : Grâce à la prop ratio convertie en aspect-ratio CSS, le navigateur réserve l'espace exact de l'image avant qu'elle ne soit téléchargée. La page ne "saute" pas pendant le chargement.

loading="lazy" automatique : Par défaut, toutes les images ne se chargeront que lorsqu'elles approcheront de l'écran de l'utilisateur, économisant de la bande passante (critère Google majeur).

priority pour le LCP (Largest Contentful Paint) : Si l'image est dans la Hero Section (tout en haut), passez :priority="true". Cela désactive le lazy loading, force un décodage synchrone et dit à Google : "Cette image est cruciale, charge-la en premier".

decoding="async" : Permet au navigateur de décoder l'image en arrière-plan sans bloquer le rendu du texte ou des scripts.

## 🖼️ 8. `BaseImage.vue`

Ce composant encapsule toutes les optimisations modernes pour les images. Il gère le chargement asynchrone, prévient le saut de mise en page (CLS), applique le lazy loading natif et offre une sécurité visuelle si le lien de l'image est mort.

### Propriétés (Props)

| Propriété | Type | Défaut | Valeurs acceptées | Description |
| :--- | :--- | :--- | :--- | :--- |
| `src` | `String` | *(Requis)* | URL / Chemin | Source de l'image à afficher. |
| `alt` | `String` | *(Requis)* | Texte libre | Description textuelle stricte pour l'accessibilité et le SEO. |
| `ratio` | `String` | `'16/9'` | `'1/1'`, `'4/3'`, `'16/9'`, `'auto'` | Fixe les proportions pour éviter les sauts de contenu (CLS). |
| `priority` | `Boolean` | `false` | `true` \| `false` | À activer impérativement pour les images de bannières/Hero (LCP). |
| `rounded` | `String` | `'xl'` | `'none'`, `'md'`, `'xl'`, `'2xl'`, `'full'` | Format des angles de la boîte. |
| `fallbackSrc`| `String` | `'/placeholder...'` | URL alternative | Image de secours si la source principale renvoie une erreur 404. |

### Exemple d'utilisation standard

```vue
<BaseImage 
  src="/uploads/logos/company.png" 
  alt="Logo Africa Tech" 
  ratio="1/1" 
  class="w-16 h-16" 
/>


#### 5. Utilisation avec un état réactif externe (Onglets / Steps)
Idéal pour coupler la carte à un menu ou un système de progression externe. L'utilisation d'une clé réactive (`:key="activeState"`) force une réanimation propre du contenu injecté sans casser la boîte de la carte.

```vue
<div class="grid grid-cols-12">
  <NavigationSide @change="state = $event" />
  <BaseCard class="col-span-7">
    <div :key="state" class="animate-fade-in-up">
      </div>
  </BaseCard>
</div>
