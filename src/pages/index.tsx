import 'firebase/firestore';
import firebase from 'firebase/app';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';
import { CustomHr } from '@/atoms';
import { Button3D } from '@/atoms/3DButton';
import { messages } from '@/constants/messages';
import { FadeInText } from '@/organisms/FadeText';
import { Contact } from '@/organisms/main/Contact';
import { FAQ } from '@/organisms/main/FAQ';
import { Navbar } from '@/organisms/NavBar';
import { DrawerContext, DrawerContextProps } from './_app';
import styles from './page.module.scss';

const firebaseConfig = {
  apiKey: process.env.firebaseApiKey,
  authDomain: process.env.firebaseAuthDomain,
  projectId: process.env.firebaseProjectId,
  storageBucket: process.env.firebaseStorageBucket,
  messagingSenderId: process.env.firebaseMessagingSenderId,
  appId: process.env.firebaseAppId,
  measurementId: process.env.firebaseMeasurementId,
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default function Home() {
  const context = useContext<DrawerContextProps | undefined>(DrawerContext);
  const { push } = useRouter();
  return (
    <>
      <section className={styles.parallax}>
        <Navbar />
        <div className={styles['parallax-inner']}>
          <div className={styles.wrapper}>
            <FadeInText variant="title" text={messages.mainHeading} />
            <p className={styles.description}>
              {' '}
              <span>{messages.welcomeDescription1}</span>{' '}
              <span>{messages.welcomeDescription2}</span>{' '}
            </p>
            <div className={styles.buttonGroup}>
              <Button3D
                onClick={() => {
                  push('/game');
                }}
                mainText={messages.practiceMode}
                toggleText={messages.alohomora}
              />
              <Button3D
                onClick={() => {
                  context?.toggleDrawerOpen(true);
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
  );
}
