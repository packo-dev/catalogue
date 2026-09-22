import { memo } from "react";
import type { Jeu } from "../type";
import { useFavoris } from "../hooks/useFavoris";

type Props = {
  jeu: Jeu;
  onSelection: (jeu: Jeu) => void;
};

function CarteJeu({ jeu, onSelection }: Props) {
  const { estFavori, basculerFavori } = useFavoris();
  const favori = estFavori(jeu.id);

  return (
    <div className="carte-jeu">
      {jeu.image && <img src={jeu.image} alt={jeu.titre} loading="lazy" />}
      <h2>{jeu.titre}</h2>
      <p>Genre : {jeu.genres.map((g) => g.nom).join(", ") || "Non renseigné"}</p>
      <p>Note : {jeu.note}/5</p>
      <p>Année : {jeu.annee ?? "Inconnue"}</p>
      <div className="carte-actions">
        <button className="btn btn-primaire" onClick={() => onSelection(jeu)}>
          Voir les détails
        </button>
        <button className="btn btn-secondaire" onClick={() => basculerFavori(jeu)}>
          {favori ? "★ Retirer" : "☆ Favoris"}
        </button>
      </div>
    </div>
  );
}

export default memo(CarteJeu);
