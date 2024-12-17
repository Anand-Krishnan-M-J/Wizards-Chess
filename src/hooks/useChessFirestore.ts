import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import 'firebase/firestore';
import { FirestoreContext } from '@/contexts/firestoreContext';
import { updateState } from '@/store/pieces';
import { RootState } from '@/store/types';

export function useChessFirestore() {
  const router = useRouter();
  const dispatch = useDispatch();
  const pieces = useSelector((state: RootState) => state.pieces);
  const { firestore } = useContext(FirestoreContext);

  const [myName, setMyName] = useState('');
  const [opponentName, setOpponentName] = useState('');

  //Sync redux to firebase
  useEffect(() => {
    if (pieces && firestore && router.query.gameId) {
      const callDoc = firestore.collection('calls').doc(router.query.gameId as string);
      const pieceState = callDoc.collection('pieceState');

      const updateFireStore = async () => {
        await pieceState.add({ pieceState: JSON.stringify(pieces) });
      };
      updateFireStore().then(() => {
        console.log('Firestore updated!!!');
      });
    }
  }, [pieces.currentMoveIsOf]);

  //Sync firebase to redux
  useEffect(() => {
    if (firestore) {
      const callDoc = firestore.collection('calls').doc(router.query.gameId as string);
      const pieceState = callDoc.collection('pieceState');

      callDoc.onSnapshot((snapshot) => {
        const data = snapshot.data();
        if (data && data.playerTwo && data.playerOne) {
          const playerTwo = data.playerTwo;
          const playerOne = data.playerOne;
          const players = [playerOne, playerTwo];
          const currentPlayerType = sessionStorage.getItem('pieceType');
          setMyName(players.find((item) => item.pieceType === currentPlayerType).name);
          setOpponentName(players.find((item) => item.pieceType !== currentPlayerType).name);
        }
      });

      pieceState.onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          const fireStoreState = JSON.parse(change.doc.data().pieceState);
          dispatch(updateState(fireStoreState));
        });
      });
    }
  }, [router.query.gameId]);

  return { myName, opponentName };
}
