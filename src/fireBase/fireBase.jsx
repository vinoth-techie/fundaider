import firebase from "firebase/app";
import 'firebase/auth';

const app = firebase.initializeApp( {
    apiKey: "AIzaSyAN4V0jOk2ulOp7L1APjtNm33e0ptIAlEo",
    authDomain: "fundaider-2021mini.firebaseapp.com",
    projectId: "fundaider-2021mini",
    storageBucket: "fundaider-2021mini.appspot.com",
    messagingSenderId: "928656338237",
    appId: "1:928656338237:web:3df5353a272c41a04fe954",
    measurementId: "G-T36WBRJBN3"
  });

/* {}
    apiKey: "AIzaSyAN4V0jOk2ulOp7L1APjtNm33e0ptIAlEo",
    authDomain: "expensetracker-6e5ba.firebaseapp.com",
    projectId: "fundaider-2021mini",
    storageBucket: "expensetracker-6e5ba.appspot.com",
    messagingSenderId: "259707873994",
    appId: "1:259707873994:web:76133db07be3513da02233",
    measurementId: "G-5Z284HHHEV"
}); */
export const auth = app.auth();
export default app;