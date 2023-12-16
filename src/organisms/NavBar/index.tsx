import Image from "next/image"
import home from "../../assets/navigation/home.png"
import instructions from "../../assets/navigation/instructions.png"
import start from "../../assets/navigation/start.png"
import contact from "../../assets/navigation/contact.png"
import logo from '../../assets/logo.png'
import styles from "./styles.module.scss"

const navigationLinks = [
    { name: "Home", url: "", icon: home },
    { name: "Start Game", url: "", icon: start },
    { name: "Instructions", url: "", icon: instructions },
    { name: "Contact", url: "", icon: contact }

]
export const Navbar = () => {
    return (
        <div className={styles.header__container}>
            <header className={styles.header}>
                <div className={styles.header__content}>
                    <Image className={styles.logo} src={logo} alt="logo" width={100} />
                    <nav className={styles["nav--desk"]}>
                        {navigationLinks.map(navItem =>
                            <a
                            key={navItem.name}
                                className={styles.nav__link}
                                href={navItem.url}>
                                <Image
                                    className={styles["icon--mobile"]}
                                    width={35}
                                    alt={navItem.name}
                                    src={navItem.icon} />
                                <span className={styles.nav__name}>{navItem.name}</span>
                            </a>
                        )}
                    </nav>
                </div>
            </header>
        </div>
    )
}
