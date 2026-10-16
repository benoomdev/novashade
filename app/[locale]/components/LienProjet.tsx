'use client';

export const EVENEMENT_PROJET = 'novashade:projet';

type Props = {
  projet: 'reparation';
  className?: string;
  children: React.ReactNode;
};

// Lien vers le formulaire qui présélectionne le type de projet, sans recharger la page
export default function LienProjet({projet, className, children}: Props) {
  return (
    <a
      href="#contact"
      onClick={() => window.dispatchEvent(new CustomEvent(EVENEMENT_PROJET, {detail: projet}))}
      className={className}
    >
      {children}
    </a>
  );
}
