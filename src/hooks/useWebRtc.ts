import { useEffect, useRef, useState } from "react";
import firebase from "firebase/app";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import "firebase/firestore";
import { pieceTypeColor } from "@/store/pieces/types";
import { RootState } from "@/store/types";
import { updateState } from "@/store/pieces";

const firebaseConfig = {
    apiKey: process.env.firebaseApiKey,
    authDomain: process.env.firebaseAuthDomain,
    projectId: process.env.firebaseProjectId,
    storageBucket: process.env.firebaseStorageBucket,
    messagingSenderId: process.env.firebaseMessagingSenderId,
    appId: process.env.firebaseAppId,
    measurementId: process.env.firebaseMeasurementId
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export function useWebRtc() {
    const router = useRouter();
    const dispatch = useDispatch()
    const pieces = useSelector((state: RootState) => state.pieces);
    const localVideoRef = useRef<HTMLVideoElement>(null);
    const remoteVideoRef = useRef<HTMLVideoElement>(null);
    const userNameRef = useRef<HTMLInputElement>(null);
    const callIdRef = useRef<HTMLInputElement>(null);

    const [isConnectionEstablished, setIsConnectionEstablished] = useState(false)
    const [firestore, setFirestore] = useState<firebase.firestore.Firestore>();
    const [peerConnection, setPeerConnection] = useState<RTCPeerConnection>();
    const [callId, setCallId] = useState<string>("");
    const [connectionError, setConnectionError] = useState(false);
    const [isSharing, setIsSharing] = useState(true);
    const [isCameraBlocked, setIsCameraBlocked] = useState(false);
    const checkCameraPermission = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            // Camera access granted
            stream.getTracks().forEach((track) => track.stop());
        } catch (error) {
            // Camera access denied or blocked
            setIsCameraBlocked(true);
        }
    };
    useEffect(() => {
        checkCameraPermission();
    }, []);

    useEffect(() => {
        setFirestore(firebase.firestore());
        // Initialize WebRTC
        const servers = {
            iceServers: [
                {
                    urls: process.env.iceServerUrl as string,
                    username: process.env.iceUsername as string,
                    credentials: process.env.iceCredentials as string
                }
            ],
            iceCandidatePoolSize: 10,
        };
        const pc = new RTCPeerConnection(servers);
        setPeerConnection(pc);

        const initializeVideoCall = async () => {
            try {
                if (localVideoRef.current) {
                    const stream = await navigator.mediaDevices.getUserMedia({ video: isSharing, audio: isSharing });
                    localVideoRef.current.srcObject = stream;
                    stream.getTracks().forEach((track) => pc.addTrack(track, stream));
                    pc.ontrack = (event) => {
                        if (event.streams && event.streams[0] && remoteVideoRef.current) {
                            remoteVideoRef.current.srcObject = event.streams[0];
                        }
                    };
                }
            } catch {
                console.log("Camera or microphone unavailable");
            }
        };
        initializeVideoCall().then(() => {
            console.log("Camera and microphone initialized successfully");
        });
    }, [isSharing]);
    //Sync redux to firebase
    useEffect(() => {
        if (pieces && firestore && router.query.gameId) {
            const callDoc = firestore.collection('calls').doc(router.query.gameId as string);
            const pieceState = callDoc.collection('pieceState')

            const updateFireStore = async () => {
                await pieceState.add({ pieceState: JSON.stringify(pieces) })
            }
            updateFireStore().then(() => { console.log("Firestore updated!!!") })
        }
    }, [pieces.currentMoveIsOf])

    //Sync firebase to redux
    useEffect(() => {
        if (firestore) {
            const callDoc = firestore.collection('calls').doc(router.query.gameId as string);
            const pieceState = callDoc.collection('pieceState');
            pieceState.onSnapshot((snapshot) => {
                snapshot.docChanges().forEach((change) => {
                    const fireStoreState = JSON.parse(change.doc.data().pieceState);
                    dispatch(updateState(fireStoreState))
                });
            });

        }
    }, [router.query.gameId])

    const createOffer = async () => {
        if (firestore) {
            const callDoc = firestore.collection('calls').doc();
            const offerCandidates = callDoc.collection('offerCandidates');
            const answerCandidates = callDoc.collection('answerCandidates');

            setCallId(callDoc.id);
            if (peerConnection) {
                peerConnection.onicecandidate = (event) => {

                    if (event.candidate) {
                        offerCandidates.add(event.candidate.toJSON());
                    }
                    else {
                        console.log("error: event candidate missing")

                    }
                }

                const offerDescription = await peerConnection.createOffer();
                await peerConnection.setLocalDescription(offerDescription);

                const offer = {
                    sdp: offerDescription.sdp,
                    type: offerDescription.type,
                };
                //By default, the player who wants to start a game will have white pieces
                await callDoc.set({ offer, playerOne: { name: userNameRef.current?.value, pieceType: pieceTypeColor.white } });
                sessionStorage.setItem("pieceType", pieceTypeColor.white)

                // Listen for remote answer
                callDoc.onSnapshot((snapshot) => {
                    const data = snapshot.data();
                    if (!peerConnection.currentRemoteDescription && data?.answer) {
                        const answerDescription = new RTCSessionDescription(data.answer);
                        peerConnection.setRemoteDescription(answerDescription);
                    }
                });

                // When answered, add candidate to peer connection
                answerCandidates.onSnapshot((snapshot) => {
                    snapshot.docChanges().forEach((change) => {
                        if (change.type === 'added') {
                            const candidate = new RTCIceCandidate(change.doc.data());
                            peerConnection.addIceCandidate(candidate);
                            if (!isConnectionEstablished) {
                                setIsConnectionEstablished(true)
                            }
                        }
                    });
                });
                //If cam is blocked proceed to start game without camera
                if (isCameraBlocked) {
                    callDoc.onSnapshot(snapshot => {
                        const data = snapshot.data();
                        if (data && data.playerTwo) {
                            const playerTwo = data.playerTwo;
                            if (playerTwo.name) {
                                setIsConnectionEstablished(true);
                            }
                        }
                    });
                }
            }
            else {
                console.log("error: peer connection failed to establish")
            }

        }
    }

    const onAnswer = async () => {
        if (firestore) {
            try {
                const callId = callIdRef.current?.value;
                const callDoc = firestore.collection('calls').doc(callId);
                const answerCandidates = callDoc.collection('answerCandidates');
                const offerCandidates = callDoc.collection('offerCandidates');
                if (peerConnection) {
                    peerConnection.onicecandidate = (event) => {
                        if (event.candidate) {
                            answerCandidates.add(event.candidate.toJSON());
                        }
                    };
                    const callData = (await callDoc.get()).data();
                    const offerDescription = callData?.offer;
                    if (!offerDescription) {
                        console.log("error offer desc is invalid:",)
                    }
                    await peerConnection.setRemoteDescription(new RTCSessionDescription(offerDescription));
                    const answerDescription = await peerConnection.createAnswer();
                    await peerConnection.setLocalDescription(answerDescription);


                    const answer = {
                        type: answerDescription.type,
                        sdp: answerDescription.sdp,
                    };

                    await callDoc.update({
                        answer,
                        playerTwo: {
                            name: userNameRef.current?.value, pieceType: pieceTypeColor.black,
                        }
                    });
                    sessionStorage.setItem("pieceType", pieceTypeColor.black)
                    offerCandidates.onSnapshot((snapshot) => {
                        snapshot.docChanges().forEach((change) => {
                            if (change.type === 'added') {
                                let data = change.doc.data();
                                peerConnection.addIceCandidate(new RTCIceCandidate(data));
                                if (!isConnectionEstablished) {
                                    setIsConnectionEstablished(true)
                                }
                            }
                        });
                    });
                    //If camera is unavailable check if playerTwo has been set to start game and proceed to start game
                    callDoc.onSnapshot(snapshot => {
                        const data = snapshot.data();
                        if (data && data.playerTwo && !isConnectionEstablished) {
                            const playerTwo = data.playerTwo;
                            if (playerTwo.name) {
                                setIsConnectionEstablished(true);
                            }
                        }
                    });
                }
            }
            catch {
                setConnectionError(true)
            }

        }
    }

    const stopSharing = () => {
        if (localVideoRef.current && localVideoRef.current.srcObject) {
            const tracks = (localVideoRef.current.srcObject as MediaStream).getTracks();
            tracks.forEach((track) => track.stop());
            setIsSharing(false)
        }
    };
    return {
        localVideoRef,
        remoteVideoRef,
        callId,
        createOffer,
        onAnswer,
        userNameRef,
        callIdRef,
        isConnectionEstablished,
        connectionError,
        stopSharing,
        isSharing,
    };
}
