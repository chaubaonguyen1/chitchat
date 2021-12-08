
import firebase from 'firebase/compat/app';
import 'firebase/analytics';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD0rxJTIV4RIKfdFJB6G--9md2-SAEDwjs",
  authDomain: "chat-app-d3f09.firebaseapp.com",
  projectId: "chat-app-d3f09",
  storageBucket: "chat-app-d3f09.appspot.com",
  messagingSenderId: "361125159681",
  appId: "1:361125159681:web:9557ff40c4e38e30ba3100",
  measurementId: "G-X1Q63CL2N2"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const auth = firebase.auth();
const db = firebase.firestore();

export { db, auth }
export default firebase