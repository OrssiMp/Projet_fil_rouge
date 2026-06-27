<template>
  <div class="p-4 md:p-8 w-full max-w-4xl mx-auto text-left select-none" data-aos="fade-up">
    
    <BaseCard class="bg-white border border-base-200 rounded-2xl p-6 md:p-10 shadow-[0_2px_16px_rgba(0,0,0,0.01)] flex flex-col gap-8">
      
      <header class="flex flex-col gap-2">
        <h1 class="text-3xl md:text-4xl font-black text-base-content tracking-tight">
          Politique de confidentialité
        </h1>
        <p class="text-xs md:text-sm font-semibold text-base-content/40 tracking-wide">
          Dernière mise à jour : 24 Octobre 2024
        </p>
        <div class="h-[1px] bg-base-200 w-full mt-4"></div>
      </header>

      <p class="text-sm md:text-base text-base-content/70 font-medium leading-relaxed">
        Chez Mosalah, nous accordons une importance primordiale à la protection de vos données personnelles. Cette politique décrit comment nous recueillons, utilisons et protégeons vos informations.
      </p>

      <section class="flex flex-col gap-3">
        <h2 class="text-lg md:text-xl font-black text-emerald-800 tracking-tight flex items-center gap-2">
          <span>📂</span> Collecte des données
        </h2>
        <p class="text-sm text-base-content/80 font-medium leading-relaxed">
          Nous collectons les informations que vous nous fournissez directement lors de l'utilisation de notre plateforme de recrutement :
        </p>
        <ul class="list-disc pl-5 text-sm text-base-content/70 font-medium space-y-2 leading-relaxed">
          <li>Informations d'identification (nom, prénom, adresse e-mail, numéro de téléphone).</li>
          <li>Données professionnelles (CV, historique professionnel, compétences, diplômes).</li>
          <li>Données de connexion et d'utilisation de la plateforme.</li>
        </ul>
      </section>

      <section class="flex flex-col gap-3">
        <h2 class="text-lg md:text-xl font-black text-emerald-800 tracking-tight flex items-center gap-2">
          <span>⚙️</span> Utilisation des informations
        </h2>
        <p class="text-sm text-base-content/80 font-medium leading-relaxed">
          Les données collectées sont utilisées pour les finalités suivantes :
        </p>
        <ul class="list-disc pl-5 text-sm text-base-content/70 font-medium space-y-2 leading-relaxed">
          <li>Faciliter la mise en relation entre les recruteurs et les candidats.</li>
          <li>Améliorer nos algorithmes de matching pour des recommandations plus pertinentes.</li>
          <li>Assurer la sécurité de notre plateforme et prévenir les fraudes.</li>
          <li>Vous contacter concernant des opportunités professionnelles ou des mises à jour de service.</li>
        </ul>
      </section>

      <section class="flex flex-col gap-3">
        <h2 class="text-lg md:text-xl font-black text-emerald-800 tracking-tight flex items-center gap-2">
          <span>🍪</span> Cookies
        </h2>
        <p class="text-sm text-base-content/80 font-medium leading-relaxed">
          Mosalah utilise des cookies pour améliorer votre expérience utilisateur. Ces petits fichiers texte nous permettent de :
        </p>
        <ul class="list-disc pl-5 text-sm text-base-content/70 font-medium space-y-2 leading-relaxed">
          <li>Maintenir votre session active.</li>
          <li>Mémoriser vos préférences d'affichage.</li>
          <li>Analyser le trafic sur notre site afin d'optimiser nos performances.</li>
        </ul>
        <p class="text-xs text-base-content/50 font-medium mt-1 leading-relaxed">
          Vous pouvez configurer votre navigateur pour refuser les cookies, bien que cela puisse limiter certaines fonctionnalités de la plateforme.
        </p>
      </section>

      <section class="flex flex-col gap-4">
        <h2 class="text-lg md:text-xl font-black text-emerald-800 tracking-tight flex items-center gap-2">
          <span>⚖️</span> Droits des utilisateurs
        </h2>
        <p class="text-sm text-base-content/80 font-medium leading-relaxed">
          Conformément au RGPD et aux lois en vigueur, vous disposez des droits suivants concernant vos données :
        </p>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
          <div class="bg-emerald-50/30 border border-emerald-100/50 rounded-xl p-4 flex flex-col gap-1 text-left">
            <h3 class="text-sm font-black text-emerald-900 tracking-wide">Droit d'accès</h3>
            <p class="text-xs text-base-content/60 font-medium leading-relaxed">Vous pouvez demander une copie des données que nous détenons sur vous.</p>
          </div>
          <div class="bg-emerald-50/30 border border-emerald-100/50 rounded-xl p-4 flex flex-col gap-1 text-left">
            <h3 class="text-sm font-black text-emerald-900 tracking-wide">Droit de rectification</h3>
            <p class="text-xs text-base-content/60 font-medium leading-relaxed">Vous pouvez corriger toute information inexacte ou incomplète.</p>
          </div>
          <div class="bg-emerald-50/30 border border-emerald-100/50 rounded-xl p-4 flex flex-col gap-1 text-left">
            <h3 class="text-sm font-black text-emerald-900 tracking-wide">Droit à l'effacement</h3>
            <p class="text-xs text-base-content/60 font-medium leading-relaxed">Vous pouvez demander la suppression de votre compte et de vos données (droit à l'oubli).</p>
          </div>
          <div class="bg-emerald-50/30 border border-emerald-100/50 rounded-xl p-4 flex flex-col gap-1 text-left">
            <h3 class="text-sm font-black text-emerald-900 tracking-wide">Droit d'opposition</h3>
            <p class="text-xs text-base-content/60 font-medium leading-relaxed">Vous pouvez vous opposer à certains traitements de vos données.</p>
          </div>
        </div>
      </section>

      <footer class="mt-4 pt-6 border-t border-base-200 text-center sm:text-left">
        <p class="text-sm text-base-content/70 font-medium">
          Pour exercer ces droits, veuillez nous contacter à l'adresse suivante : 
          <a href="mailto:privacy@mosalah.com" class="text-emerald-700 font-bold hover:underline transition-all">
            privacy@mosalah.com
          </a>
        </p>
      </footer>

    </BaseCard>
  </div>
</template>
