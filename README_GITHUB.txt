V88.6 PWA — position des boutons professeur

Sur smartphone :
- bouton de déploiement/réduction de la barre latérale gauche en premier ;
- juste en dessous : 🚪 Quitter sur l’accueil professeur ;
- au même emplacement : 🏠 Accueil sur toutes les autres pages.

Toutes les autres fonctions V88.5 sont conservées :
Firebase, synchronisation stabilisée et codes numériques.

Cache PWA : competences-mv-v88-6-nav-sidebar-9


V89 : fusion des évolutions Firebase, panneau nuage compact et gestion des élèves par classe dans Paramètres.


V89.1 ESSAI
- Base : V89.
- Nouveau module « Import rétroactif collectif » dans Nouvelle évaluation.
- Date rétroactive proposée par défaut : 01/09/2025.
- Lecture prévue de la feuille « Format import » du tableau de positionnement.
- Les lignes « Non évalué » sont ignorées.
- La note /20 est conservée comme résultat exact.
- Les compétences et critères de la situation professionnelle sont renseignés automatiquement.
- Regroupement collectif par situation professionnelle + date.
- Aucune donnée du tableur n'est préchargée dans le logiciel.


V89.1.1 — CORRECTIF QUOTA FIREBASE
- Le référentiel de compétences n'est plus écrit dans localStorage.
- Stockage volumineux déplacé vers IndexedDB (magasin appConfig).
- Firebase applique le référentiel en mémoire puis le conserve dans IndexedDB.
- L'ancienne clé localStorage evaluation_competencies_v74 est supprimée après migration.
- Le module d'import rétroactif collectif V89.1 est conservé.


V89.1.2 — CORRECTIF MIGRATION QUOTA
- Libère les anciennes clés volumineuses evaluation_competencies_v74 / v71 dès le tout début du chargement.
- Récupère d'abord leur contenu en mémoire, puis le migre vers IndexedDB.
- Les petites écritures localStorage critiques sont protégées contre QuotaExceededError.
- Le module rétroactif collectif de V89.1 est conservé.
