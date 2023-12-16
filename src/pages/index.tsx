import { CustomHr } from "@/atoms"
import { Navbar } from "@/organisms/NavBar"
import { StartGame } from "@/organisms/main/StartGame"
import { FadeInText } from "@/organisms/FadeText"
import { messages } from "@/constants/messages"
import { Contact } from "@/organisms/main/Contact"
import { Instructions } from "@/organisms/main/Instructions"
import styles from "./page.module.scss"

export default function Home() {
  return (
    <>
      <section className={styles.parallax}>
        <Navbar />
        <div className={styles["parallax-inner"]}>

          <FadeInText text={messages.mainHeading} />
        </div>
      </section>
      {/* start game section */}
      <CustomHr />
      <StartGame />
      <CustomHr />
      {/* Instrtuctions section */}
      <section className={styles["parallax-1"]}>
        <div className={styles["parallax-inner"]}>
          <Instructions />
        </div>
      </section>
      {/* Contact section */}
      <CustomHr />
      <section className={styles["2"]}>
        <Contact />
      </section>
      <p>Copyright@AKMJ</p>
    </>
  )
}
