import Image from "next/image"
import { messages } from "@/constants/messages"
import github from "../../../assets/socials/github.png"
import instagram from "../../../assets/socials/insta.png"
import linkedin from "../../../assets/socials/linkedin.png"
import mail from "../../../assets/socials/mail.png"
import styles from "./styles.module.scss"

const socials = [
    {
        name: "Instagram",
        icon: instagram
    },
    {
        name: "LinkedIn",
        icon: linkedin
    },
    {
        name: "Github",
        icon: github
    },
    {
        name: "E-mail",
        icon: mail
    },
]

export const Contact = () => (
    <>
        <h2 className={styles.contact__title}>{messages.connectWithMe}</h2>
        <div className={styles.contact__content}>
            {
                socials.map((social) => (
                    <Image key={social.name} src={social.icon} alt={social.name} width={40} />
                ))
            }
        </div>
    </>
)
