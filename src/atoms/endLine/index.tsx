import React from 'react';
import Image from 'next/image';
import { joinClass } from '@/helpers/general';
import endLine from '../../assets/endLine.png';
import styles from './styles.module.scss';

export const CustomEndLine = ({ isSmall }: { isSmall?: boolean }) => (
  <div className={joinClass(styles.endLine, isSmall ? styles.small : '')}>
    <Image
      width={isSmall ? 300 : 800}
      className={styles.endLine__image}
      alt={'endLine'}
      src={endLine}
    />
  </div>
);
