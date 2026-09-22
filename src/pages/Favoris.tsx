import { Link } from "react-router-dom";
import { useFavoris } from "../hooks/useFavoris";
import Panneau from "../components/Panneau";

export default function Favoris() {
  const { favoris, basculerFavori } = useFavoris();

  return (
    <Panneau titre="Mes favoris">
      {favoris.length === 0 ? (
        <p className="etat-vide">
          Aucun favori pour l'instant. Ajoute des jeux depuis{" "}
          <Link to="/">l'accueil</Link>.
        </p>
      ) : (
        <ul className="liste-favoris">
          {favoris.map((jeu) => (
            <li key={jeu.id}>
              <Link to={`/jeu/${jeu.id}`}>{jeu.titre}</Link>
              <button className="btn btn-secondaire" onClick={() => basculerFavori(jeu)}>
                Retirer
              </button>
            </li>
          ))}
        </ul>
      )}
    </Panneau>
  );
}
