// SideDrawer.tsx
import React, { useRef, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { messages } from '@/constants/messages';
import { CustomInputField } from '@/atoms/InputField';
import { CustomButton } from '@/atoms/Button';
import { CheckboxComponent } from '@/atoms/Checkbox';
import { CustomHr } from '@/atoms';
import close from "../../assets/close.png"
import copyImg from "../../assets/copy.png"
import styles from './styles.module.scss';
import { useWebRtc } from '@/hooks/useWebRtc';
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard';
import { Loader } from '@/atoms/Icons/Loader';
import { Tick } from '@/atoms/Icons/Tick';
import { CustomEndLine } from '@/atoms/endLine';

interface SideDrawerProps {
    isDrawerOpen: boolean,
    setIsDrawerOpen: (isDrawerOpen: boolean) => void
}
export const SideDrawer = ({ isDrawerOpen, setIsDrawerOpen }: SideDrawerProps) => {
    //states
    const [isChecked, setChecked] = useState(true);
    const { callId,
        createOffer,
        callIdRef,
        onAnswer,
        userNameRef,
        localVideoRef,
        remoteVideoRef,
        isConnectionEstablished,
        connectionError
    } = useWebRtc();
    const [copy] = useCopyToClipboard()
    const [error, setError] = useState<{ name?: boolean, gameCode?: boolean }>({})
    //refs
    const drawerRef = useRef<HTMLDivElement>(null);
    const router = useRouter();
    //lifecycles
    useEffect(() => {
        document.addEventListener('click', handleOutsideClick);
        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, []);

    useEffect(() => {
        if (isConnectionEstablished) {
            router.push(`/game?gameId=${!!callId ? callId : callIdRef.current?.value}&whoAmiI=${userNameRef.current?.value}`)
        }
    }, [isConnectionEstablished]
    )

    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };

    const handleOutsideClick = (e: MouseEvent) => {
        if (drawerRef.current && !drawerRef.current.contains(e.target as Node)) {
            setIsDrawerOpen(false);
        }
    };

    const handleCheckboxChange = () => {
        setChecked(!isChecked);
    };

    const handleConnect = () => {

        let error = {}
        //check if connection is established b4 starting game
        if (!userNameRef.current?.value) {
            error = { ...error, name: true }
        }
        if (!callIdRef.current?.value) {
            error = { ...error, gameCode: true }
        }
        setError(error)
        if (!!userNameRef.current?.value && !!callIdRef.current?.value) {
            setError({ name: false, gameCode: false })
            onAnswer()
        }


    }
    const handleGenerateGameCode = (e: React.MouseEvent<HTMLElement>) => {
        if (userNameRef?.current?.value) {
            setError({ name: false })
            createOffer();
            e.stopPropagation();
            //Disable name field, once the offer is created the user shouldn't be able to change name
            userNameRef.current.disabled = true
        }
        else {
            setError({ name: true })
        }
    }

    return (
        <div ref={drawerRef} className={`${styles['side-drawer']} ${isDrawerOpen ? styles.open : ''}`}>
            <CustomHr />
            <Image src={close} alt="close" width={30} className={styles['toggle-button']} onClick={toggleDrawer} />
            <div className={styles.drawer__content}>
                <h3 className={styles.drawer__title}>
                    {messages.register}
                </h3>
                <p className={styles.drawer__connection__error}>{connectionError ? messages.somethingWentWrong : ""}</p>
                <div className={styles.drawer__sub__content}>

                    <CustomInputField
                        error={error.name ? messages.nameEmptyError : ""}
                        disabled={isConnectionEstablished}
                        ref={userNameRef}
                        label={messages.name}
                        placeholder={messages.namePlaceHolder}
                        toolTipText={messages.nameInfo}
                    />
                    <CheckboxComponent
                        label={messages.startNewGame}
                        isChecked={isChecked}
                        handleCheckboxChange={handleCheckboxChange}
                        toolTipText={messages.startNewGameInfo}
                    />
                    {!isChecked && <>
                        <CustomInputField
                            error={
                                error.gameCode ? messages.gameCodeEmptyError : "" ||
                                    connectionError ? messages.checkGameCode : ""
                            }
                            disabled={isConnectionEstablished}
                            ref={callIdRef}
                            label={messages.gameCode}
                            placeholder={messages.gameCodePlaceholder}
                            toolTipText={messages.gameCodeInfo} />
                        {!isConnectionEstablished && <CustomButton
                            onClick={handleConnect}
                            className={styles.drawer__generate__code__button}>
                            {messages.connectWithOpponent}
                        </CustomButton>}
                    </>
                    }
                    <div className={styles.drawer__generate__code__container}>
                        {
                            isChecked &&
                            <>
                                {
                                    !callId &&
                                    <CustomButton
                                        onClick={handleGenerateGameCode}
                                        className={styles.drawer__generate__code__button}>
                                        {messages.generateCode}
                                    </CustomButton>
                                }
                                {
                                    callId && !isConnectionEstablished && <>
                                        <div className={styles.drawer__generate__code__wrapper}
                                            onClick={() => copy(callId)}
                                        >
                                            <span className={styles.drawer__generate__code}>
                                                {callId}
                                            </span>
                                            <Image
                                                src={copyImg}
                                                alt="close"
                                                width={30}
                                                className={styles.drawer__generate__code__copy} />
                                        </div>
                                        {
                                            !isConnectionEstablished &&
                                            <div className={styles.drawer__establish__conn__wrapper}>
                                                <Loader />
                                                <p className={styles.drawer__establish__conn}>{messages.waitingToEstablishConnection}</p>
                                            </div>
                                        }
                                    </>
                                }
                            </>
                        }

                        {isConnectionEstablished && <div className={styles.drawer__conn__established__wrapper}>
                            <p className={styles.drawer__conn__established}>{messages.connectionEstablishedSuccessfully}</p>
                            <Tick />
                        </div>
                        }
                        <CustomEndLine/>
                        <div className={styles.drawer__video__container}>
                            <div>
                                <p className={styles.drawer__video__text}>You</p>
                                <video
                                    className={styles.drawer__video}
                                    ref={localVideoRef} autoPlay playsInline muted />
                            </div>
                            <div>
                                <p className={styles.drawer__video__text}>Opponent</p>
                                <video
                                    className={styles.drawer__video}
                                    ref={remoteVideoRef} autoPlay playsInline />

                            </div>
                        </div>
                        <CustomEndLine/>

                    </div>
                </div>
            </div>
        </div>
    );
};
