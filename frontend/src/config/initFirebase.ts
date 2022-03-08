import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: 'AIzaSyAp4uvJzdjlF8s7ERGFI7F7N99IQ2dWMgk',
  authDomain: 'bookrs.firebaseapp.com',
  projectId: 'bookrs',
  storageBucket: 'bookrs.appspot.com',
  messagingSenderId: '966754210029',
  appId: '1:966754210029:web:dd858a103151b713773ce4',
  measurementId: 'G-JGBFJV3LK9',
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseApp);

export default firebaseApp;
