export interface Genre {
  id: number;
  nom: string;
}

export interface Jeu {
  id: number;
  titre: string;
  genres: Genre[];
  note: number;
  annee: number | null;
  image: string | null;
}

export interface JeuDetail extends Jeu {
  description: string;
  plateformes: string[];
}

// Union discriminée : un état asynchrone ne peut être que dans un de ces
// trois cas à la fois (jamais "chargement" et "erreur" en même temps).
export type EtatAsync<T> =
  | { statut: "chargement" }
  | { statut: "erreur"; message: string }
  | { statut: "succes"; donnees: T };
