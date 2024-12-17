import firebase from 'firebase/app';
import { useEffect, useState } from 'react';
import 'firebase/firestore';
import { firebaseConfig } from '@/config/firebase';

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export function useFirebaseInit() {
  const [firestore, setFirestore] = useState<firebase.firestore.Firestore>();
  useEffect(() => {
    setFirestore(firebase.firestore());
  }, []);

  return {
    firestore,
  };
}
