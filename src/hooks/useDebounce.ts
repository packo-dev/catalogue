import { useEffect, useState } from "react";

// Hook générique : retarde la mise à jour de `valeur` de `delaiMs`
// millisecondes. Utilisé pour ne pas interroger l'API à chaque frappe.
export function useDebounce<T>(valeur: T, delaiMs: number): T {
  const [valeurDifferee, setValeurDifferee] = useState(valeur);

  useEffect(() => {
    const identifiant = setTimeout(() => setValeurDifferee(valeur), delaiMs);
    return () => clearTimeout(identifiant);
  }, [valeur, delaiMs]);

  return valeurDifferee;
}
