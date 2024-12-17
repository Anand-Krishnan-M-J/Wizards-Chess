import Image from 'next/image';
import styles from './styles.module.scss';
import logo from '../../assets/logo.png';
import contact from '../../assets/navigation/contact.png';
import home from '../../assets/navigation/home.png';

const navigationLinks = [
  { name: 'F A Q s', url: '#faq', icon: home },
  { name: 'Contact', url: '#contact', icon: contact },
];
export const Navbar = () => {
  return (
    <div className={styles.header__container}>
      <header className={styles.header}>
        <div className={styles.header__content}>
          <Image className={styles.logo} src={logo} alt="logo" width={100} />
          <nav className={styles['nav--desk']}>
            {navigationLinks.map((navItem) => (
              <a key={navItem.name} className={styles.nav__link} href={navItem.url}>
                <Image
                  className={styles['icon--mobile']}
                  width={35}
                  alt={navItem.name}
                  src={navItem.icon}
                />
                <span className={styles.nav__name}>{navItem.name}</span>
              </a>
            ))}
          </nav>
        </div>
      </header>
    </div>
  );
};
