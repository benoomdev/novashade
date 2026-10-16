import type {StaticImageData} from 'next/image';
import {useTranslations} from 'next-intl';
import TitreSection from './TitreSection';
import FiltreInspirations from './FiltreInspirations';
import pergolaBioclimatique from '@/public/images/pergola-bioclimatique.jpg';
import pergolaToile from '@/public/images/hero-pergola-toile.jpg';
import pergolaBlanche from '@/public/images/pergola-blanche.jpg';
import pergolaMaison from '@/public/images/pergola-maison.jpg';
import pergolaToit from '@/public/images/pergola-toit.jpg';
import storeBanne from '@/public/images/store-banne.jpg';
import storeBanneRouge from '@/public/images/store-banne-rouge.jpg';
import storeBanneRougeTerrasse from '@/public/images/store-banne-rouge-terrasse.jpg';
import voletsRoulants from '@/public/images/volets-roulants.jpg';
import voletsColoris from '@/public/images/volets-coloris.jpg';
import voletAnthracite from '@/public/images/volet-roulant-anthracite.jpg';
import screens from '@/public/images/screens.jpg';
import screenModerne from '@/public/images/screen-moderne.jpg';
import screensColoris from '@/public/images/screens-coloris.jpg';
import screenTerrasse from '@/public/images/screen-terrasse.jpg';
import veranda from '@/public/images/veranda.jpg';
import verandaVitree from '@/public/images/veranda-vitree.jpg';
import verandaVerre from '@/public/images/pergola-verre.jpg';
import verandaToitVerre from '@/public/images/veranda-toit-verre.jpg';
import moustiquaire from '@/public/images/moustiquaire.jpg';
import moustiquaireFenetre from '@/public/images/moustiquaire-fenetre.jpg';
import moustiquaireToit from '@/public/images/moustiquaire-fenetre-toit.jpg';
import moustiquaireToitNoire from '@/public/images/moustiquaire-fenetre-toit-noire.jpg';
import pergolaAlbertGenau from '@/public/images/pergola-albertgenau.jpg';
import pergolaPiscine from '@/public/images/pergola-piscine.jpg';
import verandaVitrages from '@/public/images/veranda-vitrages.jpg';
import porteGarageSectionnelle from '@/public/images/porte-garage-sectionnelle.jpg';
import porteGarageEnroulable from '@/public/images/porte-garage-enroulable.jpg';

// Mêmes catégories que la section Services
const categories = ['pergolas', 'storesBannes', 'volets', 'screens', 'verandas', 'moustiquaires'] as const;
type Categorie = (typeof categories)[number];

// entier : image affichée sans recadrage (fiche produit en hauteur)
const photos: {id: string; photo: StaticImageData; categorie: Categorie; entier?: boolean}[] = [
  {id: 'pergolaPiscine', photo: pergolaPiscine, categorie: 'pergolas'},
  {id: 'pergolaBioclimatique', photo: pergolaBioclimatique, categorie: 'pergolas'},
  {id: 'pergolaToile', photo: pergolaToile, categorie: 'pergolas'},
  {id: 'pergolaBlanche', photo: pergolaBlanche, categorie: 'pergolas'},
  {id: 'pergolaMaison', photo: pergolaMaison, categorie: 'pergolas'},
  {id: 'pergolaToit', photo: pergolaToit, categorie: 'pergolas'},
  {id: 'pergolaAlbertGenau', photo: pergolaAlbertGenau, categorie: 'pergolas'},
  {id: 'storeBanne', photo: storeBanne, categorie: 'storesBannes'},
  {id: 'storeBanneRouge', photo: storeBanneRouge, categorie: 'storesBannes'},
  {id: 'storeBanneRougeTerrasse', photo: storeBanneRougeTerrasse, categorie: 'storesBannes'},
  {id: 'voletsRoulants', photo: voletsRoulants, categorie: 'volets'},
  {id: 'voletsColoris', photo: voletsColoris, categorie: 'volets'},
  {id: 'voletAnthracite', photo: voletAnthracite, categorie: 'volets'},
  {id: 'porteGarageEnroulable', photo: porteGarageEnroulable, categorie: 'volets'},
  {id: 'porteGarageSectionnelle', photo: porteGarageSectionnelle, categorie: 'volets'},
  {id: 'screens', photo: screens, categorie: 'screens'},
  {id: 'screenModerne', photo: screenModerne, categorie: 'screens'},
  {id: 'screensColoris', photo: screensColoris, categorie: 'screens'},
  {id: 'screenTerrasse', photo: screenTerrasse, categorie: 'screens'},
  {id: 'veranda', photo: veranda, categorie: 'verandas'},
  {id: 'verandaVitree', photo: verandaVitree, categorie: 'verandas'},
  {id: 'verandaVerre', photo: verandaVerre, categorie: 'verandas'},
  {id: 'verandaToitVerre', photo: verandaToitVerre, categorie: 'verandas'},
  {id: 'verandaVitrages', photo: verandaVitrages, categorie: 'verandas', entier: true},
  {id: 'moustiquaire', photo: moustiquaire, categorie: 'moustiquaires'},
  {id: 'moustiquaireFenetre', photo: moustiquaireFenetre, categorie: 'moustiquaires'},
  {id: 'moustiquaireToit', photo: moustiquaireToit, categorie: 'moustiquaires'},
  {id: 'moustiquaireToitNoire', photo: moustiquaireToitNoire, categorie: 'moustiquaires'}
];

export default function Inspirations() {
  const t = useTranslations('Inspirations');
  const ts = useTranslations('Services');

  return (
    <section id="inspirations" className="scroll-mt-20 bg-carte py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <TitreSection surtitre={t('surtitre')} titre={t('titre')} intro={t('intro')} />

        <FiltreInspirations
          libelleFiltres={t('filtres')}
          libelleTout={t('tout')}
          categories={categories.map((cle) => ({cle, label: ts(`${cle}.titre`)}))}
          photos={photos.map(({id, photo, categorie, entier}) => ({
            id,
            photo,
            categorie,
            entier,
            alt: t(`alts.${id}`),
            label: ts(`${categorie}.titre`)
          }))}
        />
      </div>
    </section>
  );
}
