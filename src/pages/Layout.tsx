import { Outlet, Link } from "react-router-dom";
import EnTete from "../components/EnTete";
import { useFavoris } from "../hooks/useFavoris";

export default function Layout() {
  const { favoris } = useFavoris();

  return (
    <div className="app-layout">
      <EnTete
        titre="Catalogue de jeux"
        sousTitre={`${favoris.length} favori${favoris.length > 1 ? "s" : ""}`}
      />
      <nav className="nav-principale">
        <Link to="/">Accueil</Link>
        <Link to="/favoris">Favoris ({favoris.length})</Link>
        <Link to="/proposer">Proposer un jeu</Link>
        <Link to="/a-propos">À propos</Link>
      </nav>
      <Outlet />
    </div>
  );
}
