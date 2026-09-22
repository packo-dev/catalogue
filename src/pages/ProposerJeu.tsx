import { useState, type ChangeEvent, type FormEvent } from "react";
import Panneau from "../components/Panneau";

type Champs = { titre: string; genre: string; note: string; annee: string };
type NomChamp = keyof Champs;
type Erreurs = Partial<Record<NomChamp, string>>;

const champsInitiaux: Champs = { titre: "", genre: "", note: "", annee: "" };

function valider(champs: Champs): Erreurs {
  const erreurs: Erreurs = {};

  if (champs.titre.trim().length < 2) {
    erreurs.titre = "Le titre doit contenir au moins 2 caractères.";
  }

  if (champs.genre.trim().length === 0) {
    erreurs.genre = "Le genre est obligatoire.";
  }

  const note = Number(champs.note);
  if (champs.note.trim() === "" || Number.isNaN(note) || note < 0 || note > 5) {
    erreurs.note = "La note doit être un nombre entre 0 et 5.";
  }

  const annee = Number(champs.annee);
  const anneeMax = new Date().getFullYear() + 1;
  if (
    champs.annee.trim() === "" ||
    !Number.isInteger(annee) ||
    annee < 1970 ||
    annee > anneeMax
  ) {
    erreurs.annee = `L'année doit être un entier entre 1970 et ${anneeMax}.`;
  }

  return erreurs;
}

export default function ProposerJeu() {
  const [champs, setChamps] = useState<Champs>(champsInitiaux);
  const [champsTouches, setChampsTouches] = useState<Partial<Record<NomChamp, boolean>>>({});
  const [soumissionTentee, setSoumissionTentee] = useState(false);
  const [envoye, setEnvoye] = useState(false);

  const erreurs = valider(champs);
  const estInvalide = Object.keys(erreurs).length > 0;

  const gererChangement = (nom: NomChamp) => (e: ChangeEvent<HTMLInputElement>) => {
    setChamps((precedent) => ({ ...precedent, [nom]: e.target.value }));
    setEnvoye(false);
  };

  const gererPerteFocus = (nom: NomChamp) => () => {
    setChampsTouches((precedent) => ({ ...precedent, [nom]: true }));
  };

  const gererSoumission = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSoumissionTentee(true);
    if (!estInvalide) {
      setEnvoye(true);
      setChamps(champsInitiaux);
      setChampsTouches({});
      setSoumissionTentee(false);
    }
  };

  const afficherErreur = (nom: NomChamp) =>
    (champsTouches[nom] || soumissionTentee) && erreurs[nom];

  return (
    <Panneau titre="Proposer un jeu">
      <form className="formulaire" onSubmit={gererSoumission} noValidate>
        <div className="champ-groupe">
          <label htmlFor="titre">Titre</label>
          <input
            id="titre"
            value={champs.titre}
            onChange={gererChangement("titre")}
            onBlur={gererPerteFocus("titre")}
          />
          {afficherErreur("titre") && <p className="erreur-champ" role="alert">{erreurs.titre}</p>}
        </div>

        <div className="champ-groupe">
          <label htmlFor="genre">Genre</label>
          <input
            id="genre"
            value={champs.genre}
            onChange={gererChangement("genre")}
            onBlur={gererPerteFocus("genre")}
          />
          {afficherErreur("genre") && <p className="erreur-champ" role="alert">{erreurs.genre}</p>}
        </div>

        <div className="champ-groupe">
          <label htmlFor="note">Note (/5)</label>
          <input
            id="note"
            value={champs.note}
            onChange={gererChangement("note")}
            onBlur={gererPerteFocus("note")}
            inputMode="decimal"
          />
          {afficherErreur("note") && <p className="erreur-champ" role="alert">{erreurs.note}</p>}
        </div>

        <div className="champ-groupe">
          <label htmlFor="annee">Année de sortie</label>
          <input
            id="annee"
            value={champs.annee}
            onChange={gererChangement("annee")}
            onBlur={gererPerteFocus("annee")}
            inputMode="numeric"
          />
          {afficherErreur("annee") && <p className="erreur-champ" role="alert">{erreurs.annee}</p>}
        </div>

        <button className="btn btn-primaire" type="submit" disabled={estInvalide}>
          Envoyer la proposition
        </button>

        {envoye && <p className="confirmation" role="status">Merci, ta proposition a bien été enregistrée !</p>}
      </form>
    </Panneau>
  );
}
