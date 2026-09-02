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


V89.2 — SAUVEGARDE ET ARCHIVAGE GÉNÉRAL
- Nouveau panneau Paramètres protégé par un code spécifique.
- Commande « Sauvegarder + supprimer toutes les listes » :
  export Excel + rapport PDF avant suppression de tous les élèves et évaluations.
- Commande « Archiver toutes les données » :
  Excel multi-feuilles + rapport PDF avec classes, élèves, professeurs,
  évaluations actives/archivées, critères, situations professionnelles,
  référentiel, paramètres et métadonnées des pièces jointes.
- Les fichiers joints eux-mêmes ne sont pas intégrés dans l'archive Excel/PDF.


V89.2.1 — EXPORTS CORRIGÉS
- Excel généré en vrai format .xlsx (plus d'avertissement de format/extension dans Microsoft Excel).
- PDF généré et téléchargé directement en .pdf.
- Plus de fenêtre d'impression pour l'archive PDF.
- Les deux fichiers arrivent dans le dossier de téléchargements configuré par le navigateur.


V89.2.2 — CORRECTIF NOTES DES SAUVEGARDES
- Les exports ne se limitent plus aux champs de notes rétroactives.
- Toutes les évaluations normales utilisent désormais le moteur evaluationScore20 du logiciel.
- Les notes importées depuis Excel conservent leur valeur exacte.
- Excel et PDF utilisent la même fonction de note pour éviter les écarts.
- Une colonne « Source note » permet de distinguer « Import Excel rétroactif » et « Calcul critères ».


V89.3 — SAUVEGARDE INTÉGRALE RESTAURABLE
AUDIT :
- Les anciennes évaluations n'ont pas toutes teacherName / teacherId : aucune identité n'est inventée.
- L'export résout le professeur depuis teacherName puis teacherId et signale les cas non renseignés.
- Les notes utilisent le moteur officiel evaluationScore20 ; les notes Excel rétroactives gardent leur valeur exacte.
- Les feuilles lisibles seules ne suffisaient pas à garantir une restauration sans perte.

NOUVELLE SAUVEGARDE :
- Excel .xlsx natif avec feuilles lisibles + Audit_integrite.
- Feuille technique _RESTAURATION contenant le snapshot JSON intégral en blocs contrôlés par SHA-256.
- Copie technique .json téléchargée en parallèle.
- PDF lisible téléchargé directement.
- Les propriétés brutes des évaluations sont conservées dans le snapshot, y compris pièces jointes dataUrl lorsqu'elles existent.
- Tous les objets : classes, élèves, professeurs, évaluations actives et archivées, situations, référentiel,
  appConfig, paramètres et clés locales evaluation_*.

RESTAURATION :
- Nouveau bouton « Restaurer une sauvegarde » acceptant .xlsx ou .json.
- Contrôle d'intégrité SHA-256 pour Excel.
- Prévisualisation des volumes avant deux confirmations.
- Restauration exacte des IDs et données locales.
- Si Firebase est connecté : remplacement exact des collections classes / students / evaluations / comptes
  et mise à jour des situations professionnelles + configuration.


V89.3.1 — PURGE ÉLÈVES / ÉVALUATIONS FIABLE
- Audit du défaut BTS1 : après suppression totale, loadData recréait automatiquement DEFAULT_STUDENTS dans la classe active.
- Le générateur historique d'élèves fictifs 2 MAC 1 pouvait également repeupler une classe vide.
- Ajout d'un marqueur « liste volontairement vide » qui bloque toute recréation automatique après une purge.
- Suppression locale par clear() complet des stores students + evaluations.
- Si Firebase est connecté : suppression exhaustive de TOUS les documents students + evaluations, même absents du cache local.
- Vérification après suppression et après rechargement : la commande échoue si un seul élève ou une seule évaluation subsiste.
- La restauration V89.3 enlève automatiquement le marqueur si la sauvegarde contient des élèves.
- Nouvelle feuille Controle_sauvegarde dans l'Excel intégral.
