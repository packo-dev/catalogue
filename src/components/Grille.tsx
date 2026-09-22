import type { Jeu } from "../type";
import CarteJeu from "./CarteJeu";

type Props = {
  jeux: Jeu[];
  onSelection: (jeu: Jeu) => void;
};

export default function Grille({ jeux, onSelection }: Props) {
  if (!jeux || jeux.length === 0) {
    return <p>Aucune donnée disponible.</p>;
  }

  return (
    <div className="grille">
      {jeux.map((jeu) => (
        <CarteJeu key={jeu.id} jeu={jeu} onSelection={onSelection} />
      ))}
    </div>
  );
}
