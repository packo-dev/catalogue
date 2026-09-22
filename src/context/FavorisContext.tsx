import { createContext, useCallback, useMemo, useReducer, type ReactNode } from "react";
import type { Jeu } from "../type";

type EtatFavoris = {
  jeux: Jeu[];
};

type ActionFavoris = { type: "AJOUTER"; jeu: Jeu } | { type: "RETIRER"; id: number };

function reducteurFavoris(etat: EtatFavoris, action: ActionFavoris): EtatFavoris {
  switch (action.type) {
    case "AJOUTER": {
      if (etat.jeux.some((j) => j.id === action.jeu.id)) {
        return etat;
      }
      // Immuabilité : on renvoie un nouveau tableau, jamais de push() direct.
      return { jeux: [...etat.jeux, action.jeu] };
    }
    case "RETIRER": {
      return { jeux: etat.jeux.filter((j) => j.id !== action.id) };
    }
    default:
      return etat;
  }
}

type FavorisContextValeur = {
  favoris: Jeu[];
  estFavori: (id: number) => boolean;
  basculerFavori: (jeu: Jeu) => void;
};

export const FavorisContext = createContext<FavorisContextValeur | null>(null);

export function FavorisProvider({ children }: { children: ReactNode }) {
  const [etat, dispatch] = useReducer(reducteurFavoris, { jeux: [] });

  const estFavori = useCallback(
    (id: number) => etat.jeux.some((j) => j.id === id),
    [etat.jeux]
  );

  const basculerFavori = useCallback(
    (jeu: Jeu) => {
      dispatch(
        etat.jeux.some((j) => j.id === jeu.id)
          ? { type: "RETIRER", id: jeu.id }
          : { type: "AJOUTER", jeu }
      );
    },
    [etat.jeux]
  );

  // Sans ce useMemo, `valeur` serait un nouvel objet à chaque rendu du
  // Provider et re-rendrait tous les composants abonnés au contexte,
  // même quand rien ne change pour eux.
  const valeur = useMemo<FavorisContextValeur>(
    () => ({ favoris: etat.jeux, estFavori, basculerFavori }),
    [etat.jeux, estFavori, basculerFavori]
  );

  return <FavorisContext.Provider value={valeur}>{children}</FavorisContext.Provider>;
}
