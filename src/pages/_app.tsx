import { Provider } from 'react-redux'
import { Analytics } from '@vercel/analytics/react'
import type { AppProps } from "next/app";
import Head from "next/head";
import "@fontsource/cinzel-decorative"; // Defaults to weight 400
import "@fontsource/cinzel-decorative/400.css"; // Specify weight;
import { store } from '../store/index'
import "./globals.css";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                {/* eslint-disable-next-line react/no-unescaped-entities */}
                <title>Wizard's chess</title>
                <meta
                    name="description"
                    content="Embark on a magical journey with Wizard's Chess, a captivating online multiplayer chess game inspired by the wizarding world. Challenge friends to epic battles, strategize with enchanted pieces, and experience the thrill of wizardry on the virtual chessboard. Unleash your inner sorcerer and engage in a chess adventure like never before. Play Wizard's Chess today and immerse yourself in a spellbinding fusion of strategy and magic."
                />
                <meta
                    name="keywords"
                    content="Harry Potter Chess, Multiplayer Game, Wizard's Chess, Magical Chess, Online Board Game, React.js, Next.js, WebRTC, Socket.io"
                />
                <meta name="author" content="Anand Krishnan M J" />
                <meta
                    property="og:title"
                    content="Wizard's Chess - Multiplayer Harry Potter Themed Chess Game"
                />
                <meta
                    property="og:description"
                    content="Immerse yourself in the wizarding world with Wizard's Chess, a multiplayer online game inspired by Harry Potter. Engage in magical chess battles with friends, featuring enchanting pieces and strategic gameplay."
                />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://wizards-chess-67s3g28ha-anand-krishnan-m-j.vercel.app/" />
                <meta
                    property="og:image"
                    content="https://your-game-image-url.jpg"
                />
                <meta
                    property="og:image:alt"
                    content="Wizard's Chess - Multiplayer Harry Potter Themed Chess Game"
                />
                <meta
                    name="twitter:title"
                    content="Wizard's Chess - Multiplayer Harry Potter Themed Chess Game"
                />
                <meta
                    name="twitter:description"
                    content="Embark on a magical journey with Wizard's Chess, a multiplayer online chess game set in the enchanting world of Harry Potter. Play with friends and experience the excitement of wizardry on the virtual chessboard."
                />
                <meta name="twitter:card" content="summary_large_image" />
                <meta
                    name="twitter:image"
                    content="https://your-game-image-url.jpg"
                />

                <link rel="canonical" href="https://wizards-chess-67s3g28ha-anand-krishnan-m-j.vercel.app/" />
                <link
                    rel="apple-touch-icon"
                    sizes="57x57"
                    href="/apple-icon-57x57.png"
                />
                <link
                    rel="apple-touch-icon"
                    sizes="60x60"
                    href="/apple-icon-60x60.png"
                />
                <link
                    rel="apple-touch-icon"
                    sizes="72x72"
                    href="/apple-icon-72x72.png"
                />
                <link
                    rel="apple-touch-icon"
                    sizes="76x76"
                    href="/apple-icon-76x76.png"
                />
                <link
                    rel="apple-touch-icon"
                    sizes="114x114"
                    href="/apple-icon-114x114.png"
                />
                <link
                    rel="apple-touch-icon"
                    sizes="120x120"
                    href="/apple-icon-120x120.png"
                />
                <link
                    rel="apple-touch-icon"
                    sizes="144x144"
                    href="/apple-icon-144x144.png"
                />
                <link
                    rel="apple-touch-icon"
                    sizes="152x152"
                    href="/apple-icon-152x152.png"
                />
                <link
                    rel="apple-touch-icon"
                    sizes="180x180"
                    href="/apple-icon-180x180.png"
                />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="192x192"
                    href="/android-icon-192x192.png"
                />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="32x32"
                    href="/favicon-32x32.png"
                />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="96x96"
                    href="/favicon-96x96.png"
                />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="16x16"
                    href="/favicon-16x16.png"
                />
                <link rel="manifest" href="/manifest.json" />
                <meta name="msapplication-TileColor" content="#ffffff" />
                <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
                <meta name="theme-color" content="#ffffff" />
                <meta name="theme-color" content="#ffffff" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Head>

            <Provider store={store}>
                {/* eslint-disable  */}
                <Component {...pageProps} />
            </Provider>
            <Analytics />
        </>
    );
}

export default MyApp;
