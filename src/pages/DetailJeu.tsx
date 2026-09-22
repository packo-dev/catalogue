import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { useFavoris } from "../hooks/useFavoris";
import { urlDetailJeu, transformerDetail, type JeuDetailBrutRawg } from "../api";

export default function DetailJeu() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { estFavori, basculerFavori } = useFavoris();

  const url = useMemo(() => (id ? urlDetailJeu(id) : null), [id]);
  const etat = useFetch<JeuDetailBrutRawg>(url);

  if (etat.statut === "chargement") {
    return <p className="etat-chargement" role="status">Chargement de la fiche...</p>;
  }

  if (etat.statut === "erreur") {
    return (
      <div className="etat-erreur">
        <p role="alert">Impossible de charger ce jeu : {etat.message}</p>
        <button className="btn btn-secondaire" onClick={() => navigate(-1)}>Retour</button>
      </div>
    );
  }

  const jeu = transformerDetail(etat.donnees);
  const favori = estFavori(jeu.id);

  return (
    <div className="detail-jeu">
      {jeu.image && <img src={jeu.image} alt={jeu.titre} />}
      <h2>{jeu.titre}</h2>
      <p className="info">Genre : {jeu.genres.map((g) => g.nom).join(", ") || "Non renseigné"}</p>
      <p className="info">Plateformes : {jeu.plateformes.join(", ") || "Non renseignées"}</p>
      <p className="info">Note : {jeu.note}/5</p>
      <p className="info">Année de sortie : {jeu.annee ?? "Inconnue"}</p>
      <p className="description">{jeu.description}</p>
      <div className="detail-actions">
        <button className="btn btn-primaire" onClick={() => basculerFavori(jeu)}>
          {favori ? "★ Retirer des favoris" : "☆ Ajouter aux favoris"}
        </button>
        <button className="btn btn-secondaire" onClick={() => navigate(-1)}>Retour</button>
      </div>
    </div>
  );
}
