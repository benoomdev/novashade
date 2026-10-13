import Image from 'next/image';
import {useTranslations} from 'next-intl';
import TitreSection from './TitreSection';
import photo1 from '@/public/images/store-banne-rouge.jpg';
import photo2 from '@/public/images/pergola-blanche.jpg';
import photo3 from '@/public/images/veranda-toit.jpg';
import photo4 from '@/public/images/screen-terrasse.jpg';
import photo5 from '@/public/images/pergola-verre.jpg';
import photo6 from '@/public/images/veranda-vitree.jpg';
import photo7 from '@/public/images/screen-moderne.jpg';
import photo8 from '@/public/images/moustiquaire-fenetre.jpg';
import photo9 from '@/public/images/pergola-maison.jpg';

// Grille en mosaïque : certaines photos occupent deux colonnes ou deux lignes
const photos = [
  {photo: photo1, alt: 'alt1', classe: 'col-span-2 row-span-2'},
  {photo: photo5, alt: 'alt5', classe: 'row-span-2'},
  {photo: photo2, alt: 'alt2', classe: ''},
  {photo: photo4, alt: 'alt4', classe: ''},
  {photo: photo3, alt: 'alt3', classe: 'col-span-2'},
  {photo: photo6, alt: 'alt6', classe: ''},
  {photo: photo7, alt: 'alt7', classe: ''},
  {photo: photo8, alt: 'alt8', classe: 'col-span-2'},
  {photo: photo9, alt: 'alt9', classe: 'col-span-2'}
] as const;

export default function Inspirations() {
  const t = useTranslations('Inspirations');

  return (
    <section id="inspirations" className="scroll-mt-20 bg-carte py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <TitreSection surtitre={t('surtitre')} titre={t('titre')} intro={t('intro')} />

        <ul className="mt-12 grid auto-rows-[160px] grid-cols-2 gap-3 sm:auto-rows-[200px] sm:gap-4 md:grid-cols-4">
          {photos.map(({photo, alt, classe}) => (
            <li key={alt} className={`group relative overflow-hidden rounded-xl ${classe}`}>
              <Image
                src={photo}
                alt={t(alt)}
                fill
                placeholder="blur"
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
