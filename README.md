# Catalogue de Jeux Vidéo

Application React + TypeScript permettant de parcourir un catalogue de jeux vidéo via l'API RAWG, d'ajouter des favoris et de proposer un jeu.

## Prérequis

- Node.js 18+
- npm

## Installation

```bash
git clone <url-du-depot>
cd catalogue-jeux
npm install
```

## Configuration de la clé API

L'application utilise l'API [RAWG](https://rawg.io/apidocs). Pour obtenir une clé gratuite :

1. Créer un compte sur https://rawg.io/login/?forward=developer
2. Copier le fichier `.env.example` en `.env`
3. Coller la clé dans le fichier `.env`

```bash
cp .env.example .env
```

## Lancement

```bash
npm run dev
```

L'application sera accessible sur `http://localhost:5173`.

## Build de production

```bash
npm run build
npm run preview
```

## Tests

```bash
npm run test
```

## Vérification TypeScript

```bash
npx tsc --noEmit
```

## Structure du projet

```
src/
├── api.ts                   # Appels API RAWG + transformation des données
├── type.ts                  # Types partagés (Jeu, EtatAsync<T>, etc.)
├── main.tsx                 # Point d'entrée (BrowserRouter + FavorisProvider)
├── App.tsx                  # Routes de l'application
├── components/
│   ├── EnTete.tsx           # En-tête avec titre et sous-titre
│   ├── Grille.tsx           # Grille responsive de cartes
│   ├── CarteJeu.tsx         # Carte individuelle (memo)
│   └── Panneau.tsx          # Conteneur réutilisable avec children
├── pages/
│   ├── Layout.tsx           # Mise en page commune (Outlet)
│   ├── Accueil.tsx          # Liste + recherche avec debounce
│   ├── DetailJeu.tsx        # Fiche détaillée d'un jeu (/jeu/:id)
│   ├── Favoris.tsx          # Liste des favoris (Context)
│   ├── ProposerJeu.tsx      # Formulaire contrôlé avec validation
│   ├── APropos.tsx          # Page à propos
│   └── NotFound.tsx         # Page 404
├── context/
│   └── FavorisContext.tsx    # Context + useReducer (état global)
├── hooks/
│   ├── useFetch.ts          # Hook générique fetch + AbortController
│   ├── useDebounce.ts       # Hook générique debounce
│   └── useFavoris.ts        # Accès typé au contexte favoris
└── test/
    └── setup.ts             # Configuration Vitest
```

## Fonctionnalités

- Parcours du catalogue via l'API RAWG (fetch, 3 états : chargement / erreur / succès)
- Recherche avec debounce (400 ms)
- Fiche détaillée d'un jeu (route à paramètre)
- Système de favoris (Context + useReducer, immuabilité)
- Formulaire de proposition avec validation par champ
- Navigation React Router v6 (6 routes, Outlet, page 404)
- Performance : memo, useMemo, useCallback
- 9 tests unitaires (Vitest + Testing Library)

## Répartition du travail

| Domaine | Membre |
|---|---|
| Configuration (Vite, TypeScript, tsconfig) | À compléter |
| Types et interfaces | À compléter |
| Composants (EnTete, CarteJeu, Grille, Panneau) | À compléter |
| Routage (React Router, Layout, 404) | À compléter |
| Hooks personnalisés (useFetch, useDebounce, useFavoris) | À compléter |
| État global (FavorisContext, useReducer) | À compléter |
| API et asynchrone (RAWG, AbortController) | À compléter |
| Formulaire (ProposerJeu, validation) | À compléter |
| Tests (Vitest, Testing Library) | À compléter |
| CSS et design | À compléter |
| Déploiement | À compléter |

## Adresse de déploiement

À compléter

## Technologies

- React 19
- TypeScript 6
- Vite 8
- React Router v7
- Vitest + Testing Library
- API RAWG
