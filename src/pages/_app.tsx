import { Provider } from 'react-redux'
import { createContext, useCallback, useState } from 'react'
import { SideDrawer } from '@/organisms/Drawer'
import Cursor from '@/organisms/Cursor'
import { Analytics } from '@vercel/analytics/react'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import '@fontsource/cinzel-decorative' // Defaults to weight 400
import '@fontsource/cinzel-decorative/400.css' // Specify weight;
import { store } from '../store/index'
import './globals.css'

export interface DrawerContextProps {
    isDrawerOpen: boolean
    toggleDrawerOpen: (isOpen: boolean) => void
    enableVideoDrawer: boolean
    setEnableVideoDrawer: (isOpen: boolean) => void
}
export const DrawerContext = createContext<DrawerContextProps | undefined>(
    undefined
)

function MyApp({ Component, pageProps }: AppProps) {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)
    const [enableVideoDrawer, setEnableVideoDrawer] = useState(false)

    const toggleDrawerOpen = useCallback((isOpen: boolean) => {
        setIsDrawerOpen(isOpen)
    }, [])

    return (
        <>
            <Head>
                {/* eslint-disable-next-line react/no-unescaped-entities */}
                <title>Wizard's chess</title>
                {/* PWA starts*/}
                <meta name="application-name" content="Wizards's Chess" />
                <meta name="apple-mobile-web-app-capable" content="yes" />
                <meta
                    name="apple-mobile-web-app-status-bar-style"
                    content="default"
                />
                <meta
                    name="apple-mobile-web-app-title"
                    content="Wizards's Chess"
                />
                <meta name="format-detection" content="telephone=no" />
                <meta name="mobile-web-app-capable" content="yes" />
                <meta
                    name="msapplication-config"
                    content="/icons/browserconfig.xml"
                />
                <meta name="msapplication-tap-highlight" content="no" />
                <link rel="manifest" href="/manifest.json" />
                <link
                    rel="mask-icon"
                    href="/icons/safari-pinned-tab.svg"
                    color="#5bbad5"
                />
                <link rel="shortcut icon" href="/favicon.ico" />
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"
                />

                <meta name="twitter:card" content="summary" />
                <meta
                    name="twitter:url"
                    content="https://www.chess.anandkris.com"
                />
                <meta name="twitter:title" content="Wizards's Chess" />
                <meta
                    name="twitter:image"
                    content="https://www.chess.anandkris.com/logo/icon-192x192.png"
                />
                {/* PWA ends*/}

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
                <meta
                    property="og:url"
                    content="https://www.chess.anandkris.com"
                />
                <meta
                    property="og:image"
                    content="https://www.chess.anandkris.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.2ce43850.png&w=128&q=75"
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

                <link rel="canonical" href="https://www.chess.anandkris.com" />
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
                <meta name="msapplication-TileColor" content="#ffffff" />
                <meta
                    name="msapplication-TileImage"
                    content="/ms-icon-144x144.png"
                />
                <meta name="theme-color" content="#ffffff" />
                <meta name="theme-color" content="#ffffff" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>

            </Head>

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
                <Cursor/>
            </Provider>
            <Analytics />
        </>
    )
}

export default MyApp
