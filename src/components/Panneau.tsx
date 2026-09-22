import type { ReactNode } from "react";

type Props = {
  titre?: string;
  children: ReactNode;
};

export default function Panneau({ titre, children }: Props) {
  return (
    <section className="panneau">
      {titre && <h3>{titre}</h3>}
      {children}
    </section>
  );
}
