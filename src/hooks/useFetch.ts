import { useEffect, useState } from "react";
import type { EtatAsync } from "../type";

// Hook générique : T est le type des données brutes attendues de l'API.
export function useFetch<T>(url: string | null): EtatAsync<T> {
  const [etat, setEtat] = useState<EtatAsync<T>>({ statut: "chargement" });

  useEffect(() => {
    if (!url) {
      return;
    }

    let annule = false;
    const controleur = new AbortController();
    setEtat({ statut: "chargement" });

    (async () => {
      try {
        const reponse = await fetch(url, { signal: controleur.signal });
        if (!reponse.ok) {
          throw new Error(`Erreur ${reponse.status} : ${reponse.statusText}`);
        }
        const donnees = (await reponse.json()) as T;
        // On ignore une réponse arrivée après le démontage ou après un
        // changement d'URL : ça évite qu'une réponse "en retard" écrase un
        // état plus récent (situation de course).
        if (!annule) {
          setEtat({ statut: "succes", donnees });
        }
      } catch (erreur) {
        if (erreur instanceof DOMException && erreur.name === "AbortError") {
          return;
        }
        if (!annule) {
          const message =
            erreur instanceof Error ? erreur.message : "Erreur réseau inconnue.";
          setEtat({ statut: "erreur", message });
        }
      }
    })();

    return () => {
      annule = true;
      controleur.abort();
    };
  }, [url]);

  return etat;
}
