import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="page-404">
      <h2>404 — Page introuvable</h2>
      <p>La page que vous cherchez n'existe pas.</p>
      <Link to="/">Retour à l'accueil</Link>
    </div>
  );
}
