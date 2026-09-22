import { useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Grille from "../components/Grille";
import Panneau from "../components/Panneau";
import { useFetch } from "../hooks/useFetch";
import { useDebounce } from "../hooks/useDebounce";
import { urlListeJeux, transformerListe, type ReponseListeRawg } from "../api";
import type { Jeu } from "../type";

export default function Accueil() {
  const navigate = useNavigate();
  const [recherche, setRecherche] = useState("");
  const rechercheDifferee = useDebounce(recherche, 400);

  const url = useMemo(() => urlListeJeux(rechercheDifferee), [rechercheDifferee]);
  const etat = useFetch<ReponseListeRawg>(url);

  const jeux = useMemo<Jeu[]>(
    () => (etat.statut === "succes" ? transformerListe(etat.donnees) : []),
    [etat]
  );

  const gererSelection = useCallback(
    (jeu: Jeu) => navigate(`/jeu/${jeu.id}`),
    [navigate]
  );

  return (
    <div>
      <Panneau titre="Rechercher un jeu">
        <input
          className="champ-recherche"
          type="search"
          value={recherche}
          onChange={(e) => setRecherche(e.target.value)}
          placeholder="Titre du jeu (ex. Hollow Knight)"
          aria-label="Rechercher un jeu"
        />
      </Panneau>

      {etat.statut === "chargement" && (
        <p className="etat-chargement" role="status">Chargement des jeux...</p>
      )}

      {etat.statut === "erreur" && (
        <p className="etat-erreur" role="alert">
          Impossible de charger les jeux : {etat.message}
        </p>
      )}

      {etat.statut === "succes" && jeux.length === 0 && (
        <p className="etat-vide">Aucun jeu ne correspond à « {rechercheDifferee} ».</p>
      )}

      {etat.statut === "succes" && jeux.length > 0 && (
        <Grille jeux={jeux} onSelection={gererSelection} />
      )}
    </div>
  );
}
