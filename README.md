# Exercice Frontend Senior - Gestionnaire de Tournées Théâtrales

**Durée :** 2 heures
**Niveau :** Senior

## Contexte

Vous travaillez pour une compagnie théâtrale qui organise des tournées dans plusieurs villes. Le directeur artistique a besoin d'un outil simple pour visualiser les tournées en cours et ajouter de nouvelles représentations.

## Objectif

Créer le MVP d'une application web de gestion de tournées théâtrales en se concentrant sur les fonctionnalités essentielles et une expérience utilisateur fluide.

## Fonctionnalités à implémenter

### 1. Liste des tournées avec filtres

- Afficher les tournées avec les informations principales :
  - Titre du spectacle
  - Statut (Planifiée, En cours, Terminée)
  - Nombre de représentations
  - Revenus totaux
  - Taux de remplissage moyen
- **Filtrage par statut** ("En cours","Planifiée","Terminée","Annulée")
- **Recherche simple** par titre de spectacle
- **Indicateur visuel** du taux de remplissage (barre de progression ou badge coloré)

### 2. Vue détaillée d'une tournée

- Cliquer sur une tournée ouvre la vue détaillée
- **Liste des représentations** avec :
  - Date et heure
  - Ville et lieu
  - Places vendues / Capacité totale
  - Prix du billet
- **Formulaire d'ajout** d'une représentation (champs : date, ville, lieu, capacité, prix)
- **Bouton retour** vers la liste principale
- **Mise à jour** du taux de remplissage en temps réel

### 3. Dashboard basique

- **3 métriques principales** :
  - Nombre total de représentations
  - Revenus cumulés
  - Taux de remplissage moyen
- **Mise à jour automatique** quand on ajoute une représentation
- **Affichage visuel** simple (cartes ou badges)

### 4. Interface responsive

- **Version mobile fonctionnelle**
- **États de chargement** basiques
- **Messages de confirmation** pour les actions

## Données de test fournies

Les données sont mises à disposition via une API Rest [documentation ici](/api/README.md)

## Contraintes techniques

- **Framework :** React ou Vue.js (au choix)
- **State Management :** Context API ou composition API suffisent (pas besoin de Redux/Pinia)
- **Styling :** CSS simple, Tailwind ou styled-components (pas d'obligation de design complexe)
- **Persistance :** LocalStorage pour sauvegarder les ajouts
- **TypeScript :** Optionnel mais valorisé

## Livrables attendus

Dans le dossier app:

1. **Code source** fonctionnel et structuré
2. **README.md** avec :
   - Instructions d'installation et de lancement
   - Choix techniques (si temps disponible)
3. **Application déployable** localement (documentée)

## Ce qu'on n'attend PAS

- Design pixel-perfect
- Gestion d'erreurs exhaustive
- Tests unitaires
- Animations complexes
- Optimisations poussées
- Backend ou API

## Critères d'évaluation

### Fonctionnalités (40%)

- Complétude des fonctionnalités demandées
- Logique métier correcte
- Interactions utilisateur fluides

### Code (35%)

- Structure et organisation
- Qualité et lisibilité
- Bonnes pratiques React/Vue

### UX (25%)

- Interface intuitive
- Responsive design
- Feedback utilisateur

## Conseils

- **Priorisez la fonctionnalité sur l'esthétique**
- **Commencez par la liste des tournées** (fonctionnalité principale)
- **Documentez vos choix** si vous manquez de temps sur certaines parties

## Questions ?

N'hésitez pas à faire des assumptions raisonnables si certains points ne sont pas précisés. Documentez-les dans le fichier README.md.

## Restitution du projet

Pour soumettre votre travail :

1. Créez une nouvelle branche depuis `main` avec le format : `feature/votre-nom`
2. Committez vos changements avec des messages clairs et descriptifs
3. Poussez votre branche sur le dépôt distant
4. Créez une Pull Request vers `main` avec :
   - Un titre descriptif
   - Une description des fonctionnalités implémentées

**Bon courage !**