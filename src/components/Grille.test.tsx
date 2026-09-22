import React from "react";
import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Grille from "./Grille";
import { FavorisProvider } from "../context/FavorisContext";
import type { Jeu } from "../type";

const jeux: Jeu[] = [
  { id: 1, titre: "Hollow Knight", genres: [], note: 4.5, annee: 2017, image: null },
  { id: 2, titre: "Celeste", genres: [], note: 4.8, annee: 2018, image: null },
];

describe("Grille", () => {
  it("affiche un message quand la liste est vide", () => {
    render(
      <FavorisProvider>
        <Grille jeux={[]} onSelection={vi.fn()} />
      </FavorisProvider>
    );
    expect(screen.getByText("Aucune donnée disponible.")).toBeInTheDocument();
  });

  it("affiche une carte par jeu quand la liste n'est pas vide", () => {
    render(
      <FavorisProvider>
        <Grille jeux={jeux} onSelection={vi.fn()} />
      </FavorisProvider>
    );
    expect(screen.getByText("Hollow Knight")).toBeInTheDocument();
    expect(screen.getByText("Celeste")).toBeInTheDocument();
    expect(screen.getAllByRole("button", { name: /voir les détails/i })).toHaveLength(2);
  });
});
