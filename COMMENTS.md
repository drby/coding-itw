# Commentaire du candidat

## Questions
- L'anglais a été utilisé dans le code et pour les noms de variables, fonctions et fichiers, par habitude. Quand je m'en suis rendu compte, il était trop tard et je n'ai pas eu le temps de le refaire en francais, mais je suis parfaitement capable de coder et travailler en francais si besoin.
...

## Choix de conception
 - React JS avec Vite car j'ai déjà utilisé ces technologies de nombreuses fois
 - Chakra UI pour le design, je trouve que la librairie est moderne et facile à utiliser pour un MVP, ce qui permet de ne pas se soucier des styles afin de se concentrer sur la logique métier et l'expérience utilisateur.
 - Axios pour les appels API, car il y a des templates disponibles pour les appels API avec React. Il y a aussi plein d'outils pour la gestion d'erreurs et la persistance des données. Je choisis toujours d'avoir ma logique métier dans un fichier séparé, de sorte à avoir un code plus lisible et plus facile à maintenir, sans avoir à se soucier des appels API dans les fichiers JSX.
 - React Router pour la navigation
 - Context API pour la gestion des données (implementé a la fin, la structure et les conventions ne sont peut etre pas optimales)

## Point d'amélioration
 - Chakra UI est un gros package, il y a des composants que je n'ai pas utilisés. Etant donné que tailwind est déjà installé, avec le recul, j'aurais du opter pour des composants shadcn/ui, meme si certains diront que les longues lignes de styles CSS inline dans les fichiers JSX sont un peu fastidieuses, aumoins je peux utiliser uniquement les composants dont j'ai besoin.
...

## Ressources
 - Documentations Chakra UI
 - Documentations Axios
 - Documentations VITE
 - Copilot pour les taches redondantes, le design avec Chakra UI et l'implementation de utils. Egalement consulté pour refactoring le code et l'implementation de la logique contextuelle (context API)
 - https://codeparrot.ai/blogs/advanced-guide-to-using-vite-with-react-in-2025 pour les convention, l'organisation du code et la structure des fichiers ainsi que le parametrage de Vite.
