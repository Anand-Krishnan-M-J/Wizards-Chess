import { takeEvery, put, call } from 'redux-saga/effects';
import firebase from "firebase/app";
import "firebase/firestore";
import { firebasePayloadType, firebaseStateType } from '@/store/firebase/types';
import {
  updateGameStateFirebaseRequest,
  updateGameStateFirebaseRequestFailed
} from '../store/firebase';

const firebaseConfig = {
  apiKey: process.env.firebaseApiKey,
  authDomain: process.env.firebaseAuthDomain,
  projectId: process.env.firebaseProjectId,
  storageBucket: process.env.firebaseStorageBucket,
  messagingSenderId: process.env.firebaseMessagingSenderId,
  appId: process.env.firebaseAppId,
  measurementId: process.env.firebaseMeasurementId
};

const updateFirebase = async (payload: firebasePayloadType) => {

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  const firestore = firebase.firestore()
  const callDoc = firestore.collection('calls').doc();
  await callDoc.update({ gameState: JSON.stringify(payload.gameState) })
}

function* updateGameStateSaga(action: {
  type: string;
  payload: firebaseStateType;
}) {
  try {



    //update firebase db
    // yield call(updateFirebase, action.payload);
    // if (isOk(response)) {
    //   yield put(updateGameStateFirebaseRequestSuccess());
    // } else {
    //   yield put(updateGameStateFirebaseRequestFailed());
    // }
  } catch (e) {
    yield put(updateGameStateFirebaseRequestFailed());
  }
}

export function* gameWatcher() {
  yield takeEvery(updateGameStateFirebaseRequest as any, updateGameStateSaga);
}
