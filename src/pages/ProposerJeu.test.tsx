import React from "react";
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ProposerJeu from "./ProposerJeu";

describe("ProposerJeu", () => {
  it("bloque la soumission et affiche les erreurs tant que le formulaire est invalide", async () => {
    const utilisateur = userEvent.setup();
    render(<ProposerJeu />);

    const bouton = screen.getByRole("button", { name: /envoyer la proposition/i });
    expect(bouton).toBeDisabled();

    await utilisateur.click(screen.getByLabelText(/titre/i));
    await utilisateur.tab();

    expect(
      screen.getByText(/le titre doit contenir au moins 2 caractères/i)
    ).toBeInTheDocument();
    expect(bouton).toBeDisabled();
  });

  it("autorise la soumission une fois tous les champs valides", async () => {
    const utilisateur = userEvent.setup();
    render(<ProposerJeu />);

    await utilisateur.type(screen.getByLabelText(/titre/i), "Hades");
    await utilisateur.type(screen.getByLabelText(/genre/i), "Roguelike");
    await utilisateur.type(screen.getByLabelText(/note/i), "4.5");
    await utilisateur.type(screen.getByLabelText(/année de sortie/i), "2020");

    const bouton = screen.getByRole("button", { name: /envoyer la proposition/i });
    expect(bouton).toBeEnabled();

    await utilisateur.click(bouton);

    expect(
      screen.getByText(/ta proposition a bien été enregistrée/i)
    ).toBeInTheDocument();
  });
});
