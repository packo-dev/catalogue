import React from "react";
import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CarteJeu from "./CarteJeu";
import { FavorisProvider } from "../context/FavorisContext";
import type { Jeu } from "../type";

const jeuExemple: Jeu = {
  id: 1,
  titre: "Hollow Knight",
  genres: [{ id: 1, nom: "Metroidvania" }],
  note: 4.5,
  annee: 2017,
  image: null,
};

function afficher(jeu: Jeu, onSelection = vi.fn()) {
  return render(
    <FavorisProvider>
      <CarteJeu jeu={jeu} onSelection={onSelection} />
    </FavorisProvider>
  );
}

describe("CarteJeu", () => {
  it("affiche le titre, le genre et la note du jeu", () => {
    afficher(jeuExemple);
    expect(screen.getByText("Hollow Knight")).toBeInTheDocument();
    expect(screen.getByText(/Metroidvania/)).toBeInTheDocument();
    expect(screen.getByText(/4.5\/5/)).toBeInTheDocument();
  });

  it("appelle onSelection avec le jeu quand on clique sur « Voir les détails »", async () => {
    const utilisateur = userEvent.setup();
    const onSelection = vi.fn();
    afficher(jeuExemple, onSelection);

    await utilisateur.click(screen.getByRole("button", { name: /voir les détails/i }));

    expect(onSelection).toHaveBeenCalledTimes(1);
    expect(onSelection).toHaveBeenCalledWith(jeuExemple);
  });

  it("bascule le jeu en favori quand on clique sur le bouton favori", async () => {
    const utilisateur = userEvent.setup();
    afficher(jeuExemple);

    const boutonFavori = screen.getByRole("button", { name: /favoris/i });
    await utilisateur.click(boutonFavori);

    expect(screen.getByRole("button", { name: /retirer/i })).toBeInTheDocument();
  });
});
