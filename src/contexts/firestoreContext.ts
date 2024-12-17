import firebase from 'firebase/app';
import { createContext } from 'react';
import 'firebase/firestore';

type FirestoreContextType = {
  firestore: firebase.firestore.Firestore | undefined;
};

export const FirestoreContext = createContext<FirestoreContextType>({
  firestore: undefined,
});
