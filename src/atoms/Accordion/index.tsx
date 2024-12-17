import React, { useState } from 'react';
import styles from './styles.module.scss';

interface AccordionProps {
  title: string;
  children: React.ReactNode;
}

const Accordion: React.FC<AccordionProps> = ({ title, children }) => {
  const [isOpen, setOpen] = useState(false);

  return (
    <div className={styles.accordion__wrapper}>
      <div
        className={styles[`accordion__title${isOpen ? '--open' : ''}`]}
        onClick={() => {
          setOpen(!isOpen);
        }}
      >
        {title}
      </div>
      <div className={styles[`accordion__item${!isOpen ? '--collapsed' : ''}`]}>
        <div
          onClick={() => {
            setOpen(!isOpen);
          }}
          className={styles.accordion__content}
        >
          {children}
        </div>
      </div>
    </div>
  );
};
interface Props {
  items: {
    question: string;
    answer: string;
  }[];
}

export const AccordionComponent: React.FC<Props> = ({ items }) => (
  <div className={styles.wrapper}>
    {items.map((item) => (
      <Accordion key={item.question} title={item.question}>
        {item.answer}
      </Accordion>
    ))}
  </div>
);
