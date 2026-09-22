<div align="center">

# 🎮 Catalogue de Jeux Vidéo

**Application React + TypeScript — Projet final Bachelor 2**

[![Site en ligne](https://img.shields.io/badge/🌐_Site_en_ligne-catalogue--jeux--two.vercel.app-blue?style=for-the-badge)](https://catalogue-jeux-two.vercel.app)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vite.dev/)
[![Tests](https://img.shields.io/badge/Tests-9%20passent-2ecc71?style=for-the-badge)]()

Une application web pour parcourir un catalogue de jeux vidéo, rechercher des titres, consulter leurs fiches détaillées, gérer une liste de favoris et proposer de nouveaux jeux.

Les données proviennent de l'API [RAWG Video Games Database](https://rawg.io/apidocs) (plus de 800 000 jeux référencés).

</div>

---

## 📋 Table des matières

- [Fonctionnalités](#-fonctionnalités)
- [Technologies](#-technologies)
- [Installation](#-installation)
- [Lancement](#-lancement)
- [Structure du projet](#-structure-du-projet)
- [Compétences démontrées](#-compétences-démontrées)
- [Tests](#-tests)
- [Déploiement](#-déploiement)
- [Répartition du travail](#-répartition-du-travail)

---

## ✨ Fonctionnalités

| Fonctionnalité | Description |
|---|---|
| 🔍 **Recherche en temps réel** | Barre de recherche avec debounce (400 ms) — l'API n'est interrogée qu'après une courte pause de frappe |
| 📄 **Fiche détaillée** | Chaque jeu a sa propre page avec image, description, genres, plateformes, note et année |
| ⭐ **Favoris** | Ajout/retrait de favoris depuis n'importe quelle page, liste consultable à tout moment |
| 📝 **Proposer un jeu** | Formulaire complet avec validation en temps réel sur chaque champ |
| 🔄 **3 états de chargement** | Chaque appel API affiche clairement : chargement, erreur ou succès |
| 🧭 **Navigation complète** | 6 routes, page 404, navigation par boutons et liens |
| 🌑 **Thème sombre** | Interface moderne avec design responsive |

---

## 🛠 Technologies

| Outil | Rôle |
|---|---|
| **React 19** | Bibliothèque d'interface utilisateur (composants, hooks, état) |
| **TypeScript 6** | Typage statique pour éviter les bugs avant l'exécution |
| **Vite 8** | Serveur de développement rapide avec rechargement automatique (HMR) |
| **React Router v7** | Navigation entre les pages sans rechargement |
| **Vitest** | Framework de tests unitaires |
| **Testing Library** | Tester les composants comme un utilisateur les verrait |
| **API RAWG** | Source de données : catalogue de 800 000+ jeux vidéo |
| **Vercel** | Hébergement gratuit avec HTTPS |

---

## 🚀 Installation

### Prérequis

- [Node.js](https://nodejs.org/) version 18 ou plus récente
- npm (installé automatiquement avec Node.js)

### Étapes

```bash
# 1. Cloner le dépôt
git clone https://github.com/packo-dev/catalogue.git

# 2. Entrer dans le dossier
cd catalogue

# 3. Installer les dépendances
npm install
```

### Configuration de la clé API

L'application a besoin d'une clé API RAWG (gratuite) pour charger les jeux.

1. Créer un compte sur [rawg.io/apidocs](https://rawg.io/login/?forward=developer)
2. Copier la clé API fournie
3. Créer un fichier `.env` à la racine du projet :

```env
VITE_RAWG_API_KEY=colle_ta_cle_ici
```

> 💡 Un fichier `.env.example` est fourni comme modèle.

---

## 🏃 Lancement

```bash
# Démarrer le serveur de développement
npm run dev
```

L'application sera accessible sur **http://localhost:5173**

```bash
# Vérifier que TypeScript compile sans erreur
npx tsc --noEmit

# Lancer les tests
npm run test

# Construire la version de production
npm run build
```

---

## 📁 Structure du projet

```
src/
│
├── api.ts                        # Appels à l'API RAWG + transformation des données brutes
├── type.ts                       # Types partagés : Jeu, JeuDetail, Genre, EtatAsync<T>
├── main.tsx                      # Point d'entrée : BrowserRouter + FavorisProvider
├── App.tsx                       # Définition des 6 routes
│
├── components/                   # Composants réutilisables
│   ├── EnTete.tsx                # En-tête avec titre et sous-titre
│   ├── Grille.tsx                # Grille responsive qui affiche les cartes
│   ├── CarteJeu.tsx              # Carte d'un jeu (mémoïsée avec memo)
│   └── Panneau.tsx               # Conteneur générique avec children
│
├── pages/                        # Pages de l'application
│   ├── Layout.tsx                # Mise en page commune avec navigation + Outlet
│   ├── Accueil.tsx               # Page d'accueil : recherche + grille de jeux
│   ├── DetailJeu.tsx             # Fiche détaillée d'un jeu (route /jeu/:id)
│   ├── Favoris.tsx               # Liste des jeux mis en favoris
│   ├── ProposerJeu.tsx           # Formulaire contrôlé avec validation
│   ├── APropos.tsx               # Page « À propos »
│   └── NotFound.tsx              # Page 404
│
├── context/
│   └── FavorisContext.tsx         # État global des favoris (Context + useReducer)
│
├── hooks/                        # Hooks personnalisés
│   ├── useFetch.ts               # Hook générique : fetch + AbortController + race conditions
│   ├── useDebounce.ts            # Hook générique : retarder une valeur de N ms
│   └── useFavoris.ts             # Accès typé et sécurisé au contexte favoris
│
└── test/
    └── setup.ts                  # Configuration de Vitest
```

---

## 🎯 Compétences démontrées

### TypeScript

- **Types primitifs** et **interfaces** : `Jeu`, `JeuDetail`, `Genre`
- **Union discriminée** pour un état fini : `EtatAsync<T>` (chargement | erreur | succès)
- **Génériques** écrits par le groupe : `useFetch<T>`, `useDebounce<T>`, `EtatAsync<T>`
- Aucun `any` dans le code
- `tsc --noEmit` passe sans erreur

### Configuration

- Projet **Vite + react-ts**
- HMR en développement, build de production sans erreur
- Options tsconfig : `noUnusedLocals`, `noUnusedParameters`, `noFallthroughCasesInSwitch`, `verbatimModuleSyntax`

### Composants

- **11 composants** au total (8 minimum demandés)
- `Panneau` : composant réutilisable acceptant **`children`**
- `CarteJeu` : composant réutilisable avec **`memo`**
- Props typées sur tous les composants

### Hooks

| Hook | Type | Ce qu'il fait |
|---|---|---|
| `useState` | Natif | État local dans Accueil, ProposerJeu |
| `useEffect` | Natif | Appels API et debounce |
| `useContext` | Natif | Lecture du contexte favoris |
| `useReducer` | Natif | Gestion de l'état global des favoris |
| `useFetch<T>` | **Personnalisé** | Appel API générique avec gestion d'erreur, annulation et race conditions |
| `useDebounce<T>` | **Personnalisé** | Retarde une valeur pour éviter trop d'appels API |
| `useFavoris` | **Personnalisé** | Accès au contexte + vérification qu'on est dans le Provider |

### Formulaires

- 4 champs contrôlés (titre, genre, note, année)
- Validation côté client avec messages d'erreur par champ
- Soumission bloquée tant que le formulaire est invalide
- Erreurs affichées au blur (quand on quitte un champ) ou à la soumission

### Routage (React Router v7)

| Route | Page | Description |
|---|---|---|
| `/` | Accueil | Grille de jeux + recherche |
| `/jeu/:id` | DetailJeu | Fiche détaillée (route à paramètre) |
| `/favoris` | Favoris | Liste des favoris |
| `/proposer` | ProposerJeu | Formulaire de proposition |
| `/a-propos` | APropos | Page à propos |
| `*` | NotFound | Page 404 |

- Navigation programmatique avec `useNavigate`
- Mise en page partagée avec `Layout` + `Outlet`

### État global

- `FavorisContext` : **Context** partagé entre composants éloignés (Layout, CarteJeu, DetailJeu, Favoris)
- État géré par **`useReducer`** avec 2 actions : `AJOUTER` et `RETIRER`
- **Immuabilité** respectée partout (spread operator, filter, pas de push)

### API et asynchrone

- Données chargées par **`fetch`** depuis l'API RAWG
- **3 états** traités et visibles : chargement, erreur, succès
- **`AbortController`** pour annuler les requêtes au démontage
- **Race conditions** traitées (un flag `annule` ignore les réponses tardives)
- Nettoyage dans le `return` du `useEffect`

### Performance

- **`memo`** sur `CarteJeu` : évite de re-rendre les ~20 cartes à chaque frappe
- **`useMemo`** : transformation des données API, calcul d'URL, valeur du contexte
- **`useCallback`** : fonction de sélection, fonctions du contexte favoris

---

## 🧪 Tests

**9 tests** avec Vitest + Testing Library, tous passent :

| Fichier | Tests | Ce qui est vérifié |
|---|---|---|
| `CarteJeu.test.tsx` | 3 | Affichage des infos, clic "Voir les détails", bascule favori |
| `Grille.test.tsx` | 2 | Message si liste vide, affichage correct si liste remplie |
| `ProposerJeu.test.tsx` | 2 | Soumission bloquée si invalide, soumission OK si valide |
| `FavorisContext.test.tsx` | 2 | Ajout/retrait de favori, erreur hors du Provider |

Le test `ProposerJeu` porte sur un **comportement conditionnel** : le bouton passe de désactivé à activé selon la validité des champs.

```bash
npm run test
```

---

## 🌐 Déploiement

L'application est déployée sur **Vercel** en HTTPS :

👉 **https://catalogue-jeux-two.vercel.app**

Le fichier `vercel.json` redirige toutes les routes vers `index.html` pour que le routage React fonctionne correctement côté client.

---

## 👥 Répartition du travail

| Domaine | Membre(s) |
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
| Déploiement (Vercel) | À compléter |

---

<div align="center">

**Projet réalisé dans le cadre du Bachelor 2 — Soutenance React.js & TypeScript**

Formateur : PREVOST Nathan

</div>
