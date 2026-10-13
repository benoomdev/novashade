type Props = {
  surtitre: string;
  titre: string;
  intro?: string;
  clair?: boolean;
  centre?: boolean;
};

// Surtitre doré avec filet, grand titre et introduction optionnelle
export default function TitreSection({surtitre, titre, intro, clair = false, centre = false}: Props) {
  return (
    <div className={`max-w-2xl ${centre ? 'mx-auto text-center' : ''}`}>
      <p
        className={`flex items-center gap-3 text-xs font-medium uppercase tracking-[0.25em] text-or ${
          centre ? 'justify-center' : ''
        }`}
      >
        <span aria-hidden="true" className="fond-degrade-or h-px w-8" />
        {surtitre}
      </p>
      <h2
        className={`mt-4 text-3xl font-light leading-tight sm:text-4xl ${
          clair ? 'text-creme' : 'text-anthracite'
        }`}
      >
        {titre}
      </h2>
      {intro && (
        <p className={`mt-4 text-base leading-relaxed sm:text-lg ${clair ? 'text-creme/70' : 'text-gris'}`}>
          {intro}
        </p>
      )}
    </div>
  );
}
