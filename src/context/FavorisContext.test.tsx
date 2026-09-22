import { describe, expect, it } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { FavorisProvider } from "./FavorisContext";
import { useFavoris } from "../hooks/useFavoris";
import type { Jeu } from "../type";

const jeu: Jeu = { id: 42, titre: "Portal 2", genres: [], note: 5, annee: 2011, image: null };

describe("FavorisContext / useFavoris", () => {
  it("ajoute puis retire un jeu des favoris de façon immuable", () => {
    const { result } = renderHook(() => useFavoris(), {
      wrapper: FavorisProvider,
    });

    expect(result.current.favoris).toHaveLength(0);

    act(() => result.current.basculerFavori(jeu));
    expect(result.current.favoris).toHaveLength(1);
    expect(result.current.estFavori(42)).toBe(true);

    act(() => result.current.basculerFavori(jeu));
    expect(result.current.favoris).toHaveLength(0);
    expect(result.current.estFavori(42)).toBe(false);
  });

  it("lève une erreur si useFavoris est utilisé hors du Provider", () => {
    expect(() => renderHook(() => useFavoris())).toThrow(
      /doit être utilisé à l'intérieur/
    );
  });
});
