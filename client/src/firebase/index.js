import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBNsYMuxphlTZqe_Vsl2tq9dF1VQGNlHpI',
  authDomain: 'fir-react-upload-fac67.firebaseapp.com',
  projectId: 'fir-react-upload-fac67',
  storageBucket: 'fir-react-upload-fac67.appspot.com',
  messagingSenderId: '113794177044',
  appId: '1:113794177044:web:6237f5f83a19afb3a4af01',
  measurementId: 'G-GHM06FQPDT',
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };
