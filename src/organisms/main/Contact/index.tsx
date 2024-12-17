import Image from 'next/image';
import Link from 'next/link';
import { messages } from '@/constants/messages';
import styles from './styles.module.scss';
import github from '../../../assets/socials/github.png';
import instagram from '../../../assets/socials/insta.png';
import linkedin from '../../../assets/socials/linkedin.png';
import mail from '../../../assets/socials/mail.png';

const socials = [
  {
    name: 'Instagram',
    icon: instagram,
    url: 'https://www.instagram.com/anand_krishnan_m_j/',
  },
  {
    name: 'LinkedIn',
    icon: linkedin,
    url: 'https://www.linkedin.com/in/anand-krishnan-mj-a6332b154/',
  },
  {
    name: 'Github',
    icon: github,
    url: 'https://github.com/Anand-Krishnan-M-J',
  },
  {
    name: 'E-mail',
    icon: mail,
    url: 'mailto:anandkrishmj@gmail.com',
  },
];

export const Contact = () => (
  <>
    <h2 className={styles.contact__title}>{messages.connectWithMe}</h2>
    <div className={styles.contact__content}>
      {socials.map((social) => (
        <Link key={social.name} href={social.url} target="_blank">
          <Image key={social.name} src={social.icon} alt={social.name} width={40} />
        </Link>
      ))}
    </div>
  </>
);
