import Image from 'next/image';
import React from 'react';
import { joinClass } from '@/helpers/general';
import styles from './styles.module.scss';
import endLine from '../../assets/endLine.png';

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
