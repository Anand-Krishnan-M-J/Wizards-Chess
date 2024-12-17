/* eslint-disable react/no-unescaped-entities */
import { Provider } from 'react-redux';
import { createContext, useCallback, useState } from 'react';
import { SideDrawer } from '@/organisms/Drawer';
import Cursor from '@/organisms/Cursor';
import { Analytics } from '@vercel/analytics/react';
import { useFirebaseInit } from '@/hooks/useFirebaseInit';
import { FirestoreContext } from '@/contexts/firestoreContext';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { SpeedInsights } from '@vercel/speed-insights/next';
import '@fontsource/cinzel-decorative'; // Defaults to weight 400
import '@fontsource/cinzel-decorative/400.css'; // Specify weight;
import { store } from '../store/index';
import './globals.css';

export interface DrawerContextProps {
  isDrawerOpen: boolean;
  toggleDrawerOpen: (isOpen: boolean) => void;
  enableVideoDrawer: boolean;
  setEnableVideoDrawer: (isOpen: boolean) => void;
}
export const DrawerContext = createContext<DrawerContextProps | undefined>(undefined);

function MyApp({ Component, pageProps }: AppProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [enableVideoDrawer, setEnableVideoDrawer] = useState(false);
  const { firestore } = useFirebaseInit();
  const toggleDrawerOpen = useCallback((isOpen: boolean) => {
    setIsDrawerOpen(isOpen);
  }, []);

  return (
    <>
      <Head>
        <title>Wizard's Chess - Play Magical Chess Online</title>

        {/* PWA Settings */}
        <meta name="application-name" content="Wizard's Chess" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Wizard's Chess" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-tap-highlight" content="no" />

        {/* Icons and Favicons */}
        <link rel="icon" type="image/png" href="/favicon-48x48.png" sizes="48x48" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />

        {/* Preloading fonts for performance */}
        <link
          rel="preload"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"
          as="style"
        />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" />

        {/* SEO Optimization */}
        <meta
          name="description"
          content="Play Wizard's Chess - an immersive, magical 3D chess game. Challenge friends and players worldwide in an enchanting chess duel where strategy meets fantasy!"
        />
        <meta
          name="keywords"
          content="3D Chess, Magical Chess, Multiplayer Chess, Online Chess Game, Fantasy Strategy, Chess Tournaments, Wizard's Chess"
        />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Anand Krishnan M J" />

        {/* Open Graph Meta Tags for Social Sharing */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Wizard's Chess - Play Magical Chess Online" />
        <meta
          property="og:description"
          content="Immerse yourself in Wizard's Chess - a multiplayer online chess game where fantasy and strategy collide. Join now to challenge players in magical chess battles."
        />
        <meta property="og:url" content="https://www.chess.anandkris.com" />
        <meta property="og:image" content="https://www.chess.anandkris.com/images/og-image.png" />
        <meta property="og:image:alt" content="Wizard's Chess - Multiplayer Magical Chess Game" />

        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Wizard's Chess - Play Magical Chess Online" />
        <meta
          name="twitter:description"
          content="Experience the magical world of Wizard's Chess. Join players online in this enchanting 3D chess duel."
        />
        <meta
          name="twitter:image"
          content="https://www.chess.anandkris.com/images/twitter-card.png"
        />
        <meta name="twitter:url" content="https://www.chess.anandkris.com" />

        {/* Canonical URL */}
        <link rel="canonical" href="https://www.chess.anandkris.com" />

        {/* JSON-LD Structured Data for Rich Snippets */}
        <script type="application/ld+json">
          {`
        {
          "@context": "https://schema.org",
          "@type": "WebSite",
          "url": "https://www.chess.anandkris.com",
          "name": "Wizard's Chess",
          "description": "Play Wizard's Chess - an immersive, magical 3D chess game. Challenge friends and players worldwide in an enchanting chess duel where strategy meets fantasy.",
          "author": {
            "@type": "Person",
            "name": "Anand Krishnan M J"
          },
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://www.chess.anandkris.com/search?q={search_term_string}",
            "query-input": "required name=search_term_string"
          }
        }
        `}
        </script>

        {/* Viewport and Theme Color */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <FirestoreContext.Provider value={{ firestore }}>
        <Provider store={store}>
          {/* eslint-disable  */}
          <DrawerContext.Provider
            value={{
              isDrawerOpen,
              toggleDrawerOpen,
              enableVideoDrawer,
              setEnableVideoDrawer,
            }}
          >
            <Component {...pageProps} />
          </DrawerContext.Provider>
          <SideDrawer
            setIsDrawerOpen={toggleDrawerOpen}
            isDrawerOpen={isDrawerOpen}
            enableVideoDrawer={enableVideoDrawer}
          />
          <Cursor />
        </Provider>
      </FirestoreContext.Provider>
      <Analytics />
      <SpeedInsights />
    </>
  );
}

export default MyApp;
