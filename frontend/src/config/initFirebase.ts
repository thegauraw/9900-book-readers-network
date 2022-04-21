import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: 'AIzaSyAYOLd3Z4FwyCJa8w_Ebn3eMj4ikE_XfaU',
  authDomain: 'daydayup-9900.firebaseapp.com',
  projectId: 'daydayup-9900',
  storageBucket: 'daydayup-9900.appspot.com',
  messagingSenderId: '344215169528',
  appId: '1:344215169528:web:9715324897e1f1185c0e0d',
  measurementId: 'G-CYF2P8KGX5',
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseApp);

export default firebaseApp;
