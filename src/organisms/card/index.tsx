import Image, { StaticImageData } from 'next/image';
import { CustomButton } from '@/atoms/Button';
import { messages } from '@/constants/messages';
import styles from './style.module.scss';

interface ImageCardProps {
  src: StaticImageData;
  name: string;
  description: string;
  isSelected: boolean;
}

export const ImageCard = ({ src, name, description }: ImageCardProps) => {
  return (
    <div className={styles.image__card__container}>
      <div className={styles.image__card__content}>
        <Image width={200} src={src} alt={name} className={styles.image__card__image} />
        <div className={styles.image__card__overlay}>
          <h3 className={styles.image__card__name}>{name}</h3>
          <p className={styles.image__card__description}>{description}</p>
        </div>
        <Image width={50} src={src} alt={name} className={styles['image__card__image--mobile']} />
        <CustomButton className={styles.image__card__button}>{messages.chooseButton}</CustomButton>
      </div>
    </div>
  );
};
