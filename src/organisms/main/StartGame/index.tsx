import { useContext } from "react"
import { DrawerContext, DrawerContextProps } from "@/pages/_app"
import { CustomEndLine } from "@/atoms/endLine"
import { messages } from "@/constants/messages"
import griffindor from "../../../assets/houses/grif.jpg"
import slytherin from "../../../assets/houses/slyt.jpg"
import hufflepuff from "../../../assets/houses/huff.jpg"
import ravenclaw from "../../../assets/houses/rav.jpg"
import { ImageCard } from "../../card"
import { CustomButton } from "@/atoms/Button"
import { Button3D } from "@/atoms/3DButton"
import styles from "./styles.module.scss"

const houses = [
    { name: "Ravenclaw", src: ravenclaw, description: "Or yet in wise old Ravenclaw, if you've a ready mind, where those of wit an learning, will always find their kind" },
    { name: "Hufflepuff", src: hufflepuff, description: "You might belong in Hufflepuff, where they are just and loyal, those patient Hufflepuffs are true and unafraid of tail" },
    { name: "Gryffindor", src: griffindor, description: "You might belong in Gryffindor, where dwell the brave at heart, their daring, nerve and chivalry set Gryffindors apart" },
    { name: "Slytherin", src: slytherin, description: "Or perhaps in Slytherin, you'll make your real friends, those cunning folk use any means to achieve their ends" },
]


export const StartGame = () => {

    const context = useContext<DrawerContextProps|undefined>(DrawerContext);
    return (
        <div className={styles.intro__description}>
            <div className={styles.intro__content}>
                <h2 className={styles.intro__content__title}>{messages.welcomeTitle}</h2>
                <p className={styles.intro__content__description}>{messages.welcomeDescription}</p>
                <div className={styles.intro__instruction__text}>
                    <p>{messages.howToPlay}</p>
                    <CustomButton className={styles.intro__button}>{messages.readInstructions}</CustomButton>
                </div>
                <CustomEndLine />
            </div>
            <div className={styles.house__content}>
                <h2 className={styles.intro__content__title}>{messages.chooseYourHouse}</h2>
                <div className={styles.house__image__wrapper}>
                    {
                        houses.map((item) => <div key={item.name} className={styles.house__image}>
                            <ImageCard src={item.src} name={item.name} description={item.description} isSelected />
                        </div>)
                    }
                </div>
                <Button3D
                    onClick={() => {
                        context?.toggleDrawerOpen(true)
                    }}
                    mainText={messages.openGamePortal}
                    toggleText={messages.alohomora} />
            </div>
        </div>
    )
}
