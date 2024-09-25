import { useContext, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import 'firebase/firestore'
import { Button3D } from '@/atoms/3DButton'
import { CustomHr } from '@/atoms'
import { Navbar } from '@/organisms/NavBar'
import { FAQ } from '@/organisms/main/FAQ'
import { FadeInText } from '@/organisms/FadeText'
import { messages } from '@/constants/messages'
import { Contact } from '@/organisms/main/Contact'
import firebase from 'firebase/app'
import { DrawerContext, DrawerContextProps } from './_app'
import styles from './page.module.scss'

const firebaseConfig = {
    apiKey: process.env.firebaseApiKey,
    authDomain: process.env.firebaseAuthDomain,
    projectId: process.env.firebaseProjectId,
    storageBucket: process.env.firebaseStorageBucket,
    messagingSenderId: process.env.firebaseMessagingSenderId,
    appId: process.env.firebaseAppId,
    measurementId: process.env.firebaseMeasurementId,
}

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}

type ThrottleFn = (func: Function, limit: number) => (...args: any[]) => void;

export const throttle: ThrottleFn = (func, limit) => {
  let lastFunc: ReturnType<typeof setTimeout>;
  let lastRan: number;
  let isRunning = false;

  return function(...args: any[]) {
    if (!isRunning) {
      isRunning = true;
      requestAnimationFrame(() => {
        func(...args);
        isRunning = false;
      });
    }
  };
};

export default function Home() {
    const context = useContext<DrawerContextProps | undefined>(DrawerContext)
    const { push } = useRouter()
    useEffect(() => {
        // Define the scroll handler
        const handleScroll = throttle((event: Event) => {
          console.log('Scroll position:', window.scrollY); // Example action
        }, 100); // Adjust the throttle delay (in milliseconds) as needed
    
        // Attach the scroll event listener
        window.addEventListener('scroll', handleScroll);
    
        // Clean up the event listener on component unmount
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
      }, []);
    return (
        <>
            <section className={styles.parallax}>
                <Navbar />
                <div className={styles['parallax-inner']}>
                    <div className={styles.wrapper}>
                        <FadeInText
                            variant="title"
                            text={messages.mainHeading}
                        />
                        <p className={styles.description}>
                            {' '}
                            <span>{messages.welcomeDescription1}</span>{' '}
                            <span>{messages.welcomeDescription2}</span>{' '}
                        </p>
                        <div className={styles.buttonGroup}>
                            <Button3D
                                onClick={() => {
                                    push('/game')
                                }}
                                mainText={messages.practiceMode}
                                toggleText={messages.alohomora}
                            />
                            <Button3D
                                onClick={() => {
                                    context?.toggleDrawerOpen(true)
                                }}
                                mainText={messages.startGame}
                                toggleText={messages.alohomora}
                            />
                        </div>
                    </div>
                </div>
            </section>
            <CustomHr />
            <section id="faq">
                <FAQ />
            </section>
            <section id="contact" className={styles['2']}>
                <Contact />
            </section>
            <p>Copyright@AKMJ</p>
        </>
    )
}
