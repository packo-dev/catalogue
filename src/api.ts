import type { Jeu, JeuDetail, Genre } from "./type";

// Clé RAWG : à définir dans un fichier .env (voir .env.example et le README).
// Si elle est absente, l'API renverra une erreur 401, ce qui déclenche
// naturellement l'état "erreur" de l'application (utile pour la démo).
const CLE_API = import.meta.env.VITE_RAWG_API_KEY ?? "";
const BASE_URL = "https://api.rawg.io/api";

type GenreBrutRawg = { id: number; name: string };

export type JeuBrutRawg = {
  id: number;
  name: string;
  released: string | null;
  rating: number;
  background_image: string | null;
  genres: GenreBrutRawg[];
};

export type ReponseListeRawg = {
  results: JeuBrutRawg[];
};

export type JeuDetailBrutRawg = JeuBrutRawg & {
  description_raw: string;
  platforms: { platform: { id: number; name: string } }[];
};

function versGenres(genres: GenreBrutRawg[]): Genre[] {
  return genres.map((g) => ({ id: g.id, nom: g.name }));
}

function versJeu(brut: JeuBrutRawg): Jeu {
  return {
    id: brut.id,
    titre: brut.name,
    genres: versGenres(brut.genres),
    note: brut.rating,
    annee: brut.released ? Number(brut.released.slice(0, 4)) : null,
    image: brut.background_image,
  };
}

export function urlListeJeux(recherche: string): string {
  const params = new URLSearchParams({ key: CLE_API, page_size: "20" });
  if (recherche.trim()) {
    params.set("search", recherche.trim());
  }
  return `${BASE_URL}/games?${params.toString()}`;
}

export function urlDetailJeu(id: string): string {
  const params = new URLSearchParams({ key: CLE_API });
  return `${BASE_URL}/games/${id}?${params.toString()}`;
}

export function transformerListe(brut: ReponseListeRawg): Jeu[] {
  return brut.results.map(versJeu);
}

export function transformerDetail(brut: JeuDetailBrutRawg): JeuDetail {
  return {
    ...versJeu(brut),
    description: brut.description_raw || "Pas de description disponible.",
    plateformes: brut.platforms.map((p) => p.platform.name),
  };
}
