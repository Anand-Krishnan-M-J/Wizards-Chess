import { useEffect, useRef, useState } from "react";
import firebase from "firebase/app";
import "firebase/firestore";

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

export const Test = () => {

  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);


  const callIdRef = useRef<HTMLInputElement>(null)
  const [firestore, setFirestore] = useState<firebase.firestore.Firestore>();
  const [peerConnection, setPeerConnection] = useState<RTCPeerConnection>();
  const [dataChannel, setDataChannel] = useState<RTCDataChannel | null>(null)
  const [callId, setCallId] = useState<string>("");

  const [message, setMessage] = useState("")

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
    const channel = pc.createDataChannel("Wizard's chess channel", {
      // maxRetransmits: 10, // Adjust the maximum number of retransmission attempts
      maxPacketLifeTime: 3000, // Adjust the maximum packet life time in milliseconds
    });
    setPeerConnection(pc);
    setDataChannel(channel);


    channel.onopen = (event) => {
      console.log('Data channel is open');
    };
    channel.onclose = (event) => {
      console.log('Data channel is closed');
    };

    channel.onerror = (error) => {
      console.error('Data channel error:', error);
    };

    channel.onbufferedamountlow = () => {
      console.log('Buffered amount is low');
    };

    channel.onmessage = (event) => {
      // Handle incoming messages
      const receivedMessage = event.data;
      console.log('Received message:', receivedMessage);
      setMessage(receivedMessage);
    };

    const initializeVideoCall = async () => {
      try {
        if (localVideoRef.current) {
          const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
          localVideoRef.current.srcObject = stream;
          stream.getTracks().forEach((track) => pc.addTrack(track, stream));
          pc.ontrack = (event) => {
            if (event.streams && event.streams[0] && remoteVideoRef.current) {
              remoteVideoRef.current.srcObject = event.streams[0];
            }
          };
        }
      } catch {
        console.log("camera unavailable")
      }

    };
    initializeVideoCall().then(() => {
      console.log("Camera initialized successfully")
    })

  }, [])



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
        console.log("offer", offer)

        await callDoc.set({ offer });

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
            }
          });
        });

      }
      else {
        console.log("error: peer connection failed to establish")
      }

    }
  }


  const onAnswer = async () => {
    if (firestore) {
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

        await callDoc.update({ answer });
        offerCandidates.onSnapshot((snapshot) => {
          snapshot.docChanges().forEach((change) => {
            if (change.type === 'added') {
              let data = change.doc.data();
              peerConnection.addIceCandidate(new RTCIceCandidate(data));
            }
          });
        });
      }
    }
  }



  return (
    <div style={{ color: "white" }}>
      <div style={{ display: "flex", margin: "auto" }}>
        <div >
          <h2>Your Video</h2>
          <video
            style={{ border: "solid 1px grey", height: "500px" }}
            ref={localVideoRef} autoPlay playsInline muted />
        </div>

        <div>
          <h2>Remote Video</h2>
          <video
            style={{ border: "solid 1px grey", height: "500px" }}
            ref={remoteVideoRef} autoPlay playsInline />
        </div>
      </div>


      <div style={{ display: "flex", flexDirection: "column", width: "400px" }}>

        <button style={{ height: "3rem" }} onClick={createOffer}>Create a call</button>
        <p>Copy code:<span
          style={{
            color: "white", fontWeight: "600", marginLeft: '2rem',
            fontStyle: "italic"

          }}>{callId}</span></p>

        <input style={{ height: "3rem" }} ref={callIdRef} />
        <button style={{ height: "3rem" }} onClick={onAnswer}>Join a call with Id</button>

      </div>
    </div>
  )
}
export default Test
