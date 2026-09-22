type Props = {
  titre: string;
  sousTitre?: string;
};

export default function EnTete({ titre, sousTitre }: Props) {
  return (
    <header className="en-tete">
      <h1>{titre}</h1>
      {sousTitre && <p>{sousTitre}</p>}
    </header>
  );
}
