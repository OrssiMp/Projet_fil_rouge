# **`BASE_COMPONENTS.md`**

Tu y trouveras la documentation complète et structurée pour tes composants **`BaseForm.vue`**, **`BaseImage.vue`**, et **`CandidateCard.vue`** avec toutes leurs spécificités techniques et bonnes pratiques.

---

## 📝 7. `BaseForm.vue`

Ce composant centralise la soumission des données, gère l'affichage des retours d'état globaux de l'API (succès ou échecs) et harmonise l'alignement des boutons d'actions finaux.

### Propriétés (Props)

| Propriété | Type | Défaut | Valeurs acceptées | Description |
| --- | --- | --- | --- | --- |
| `cols` | `Number | String` | `1` | `1`, `2`, `3` | Configure le nombre de colonnes de la grille pour les écrans de bureau. |
| `alignActions` | `String` | `'end'` | `'start'`, `'center'`, `'end'` | Gère l'alignement horizontal des boutons du bas. |
| `error` | `String` | `''` | Texte libre | Message d'erreur global (ex: "Identifiants incorrects"). |
| `success` | `String` | `''` | Texte libre | Message de succès global (ex: "Compte créé avec succès"). |

### Zones d'injection (Slots)

* `default` : Reçoit les composants de saisie (`<BaseInput>`, sélecteurs, etc.).
* `actions` : Destiné aux boutons de soumission ou d'annulation (`<BaseButton>`).

### Exemples d'utilisation

#### A. Grille double colonne (Standard)

```vue
<BaseForm cols="2" @submit.prevent="saveData">
  <BaseInput v-model="form.name" label="Nom complet" />
  <BaseInput v-model="form.phone" label="Téléphone" />
  
  <template #actions>
    <BaseButton variant="accent" type="submit">Enregistrer</BaseButton>
  </template>
</BaseForm>

```

#### B. Intégration dans un écran d'authentification (`Login`)

```vue
<BaseCard class="max-w-md mx-auto">
  <BaseForm @submit.prevent="onLogin" :error="apiError">
    <BaseInput v-model="email" type="email" label="Email" icon="mail" />
    
    <div class="relative">
      <BaseInput v-model="password" type="password" label="Mot de passe" icon="lock" />
      <!-- Lien positionné en absolu pour une intégration UX fluide -->
      <a href="#" class="absolute right-1 top-1 text-xs text-accent hover:underline">Mot de passe oublié ?</a>
    </div>
    
    <template #actions>
      <BaseButton type="submit" variant="accent" class="w-full">Se connecter</BaseButton>
    </template>
  </BaseForm>
</BaseCard>

```

---

## 🖼️ 8. `BaseImage.vue`

Ce composant encapsule toutes les optimisations modernes pour les images au sein de **Mosalah**. Il gère le chargement asynchrone, prévient le saut de mise en page, applique le lazy loading natif et offre une sécurité visuelle si l'image est manquante.

### 🧠 Les bonnes pratiques intégrées d'office

* **Anti-CLS (Cumulative Layout Shift) :** Grâce à la prop `ratio` convertie en `aspect-ratio` CSS, le navigateur réserve l'espace exact de l'image avant qu'elle ne soit téléchargée. La page ne "saute" pas pendant le chargement.
* **`loading="lazy"` automatique :** Par défaut, les images ne se chargent que lorsqu'elles approchent du viewport de l'utilisateur, économisant la bande passante.
* **`priority` pour le LCP (Largest Contentful Paint) :** Si l'image est située tout en haut de la page (Hero Section), passez `:priority="true"`. Cela désactive le lazy loading, force un décodage synchrone et accélère l'affichage initial pour le SEO.
* **`decoding="async"` :** Permet au navigateur de décoder l'image en arrière-plan sans bloquer le rendu du texte ou des scripts.

### Propriétés (Props)

| Propriété | Type | Défaut | Valeurs acceptées | Description |
| --- | --- | --- | --- | --- |
| `src` | `String` | *(Requis)* | URL / Chemin | Source ou chemin de l'image à afficher. |
| `alt` | `String` | *(Requis)* | Texte libre | Description textuelle stricte pour l'accessibilité (a11y) et le SEO. |
| `ratio` | `String` | `'16/9'` | `'1/1'`, `'4/3'`, `'16/9'`, `'auto'` | Fixe les proportions de la boîte pour éviter les sauts de contenu. |
| `priority` | `Boolean` | `false` | `true` | `false` | À activer pour les images principales situées au-dessus de la ligne de flottaison. |
| `rounded` | `String` | `'xl'` | `'none'`, `'md'`, `'xl'`, `'2xl'`, `'full'` | Format d'arrondi des angles. |
| `fallbackSrc` | `String` | `'/placeholder.png'` | URL alternative | Image de secours affichée en cas d'erreur 404. |

### Exemples d'utilisation

#### A. Utilisation standard (Logo d'entreprise)

```vue
<BaseImage 
  src="/uploads/logos/company.png" 
  alt="Logo Africa Tech" 
  ratio="1/1" 
  class="w-16 h-16" 
/>

```

#### B. Bannière Hero (Haute priorité SEO / LCP)

```vue
<BaseImage 
  src="/images/hero-banner.jpg" 
  alt="Candidats trouvant un emploi sur Mosalah" 
  ratio="16/9" 
  :priority="true"
  rounded="2xl"
/>

```

---

## 🚀 Note additionnelle : Transitions d'états dynamiques

Lorsque tu couples un conteneur comme `BaseCard` avec un menu d'onglets ou des étapes réactives externes (Steps), pense à utiliser une clé réactive (`:key`) sur ton contenu. Cela force une réanimation propre et fluide à chaque changement d'état sans détruire ou faire clignoter le conteneur principal :

```vue
<div class="grid grid-cols-12 gap-4">
  <NavigationSide @change="activeState = $event" />
  
  <BaseCard class="col-span-8">
    <!-- Le changement de clé déclenche une transition CSS propre sans affecter la carte -->
    <div :key="activeState" class="animate-fade-in-up">
      <!-- Contenu dynamique basé sur l'état actif -->
    </div>
  </BaseCard>
</div>

```
