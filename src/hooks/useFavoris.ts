import { useContext } from "react";
import { FavorisContext } from "../context/FavorisContext";

// Factorise l'accès au contexte + la vérification qu'on est bien
// à l'intérieur du Provider (logique réelle, pas un simple alias).
export function useFavoris() {
  const contexte = useContext(FavorisContext);
  if (!contexte) {
    throw new Error("useFavoris doit être utilisé à l'intérieur de <FavorisProvider>.");
  }
  return contexte;
}
