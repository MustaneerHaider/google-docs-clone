import { initializeApp, getApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
	apiKey: process.env.APP_KEY,
	authDomain: 'docs-clone-3d17a.firebaseapp.com',
	projectId: 'docs-clone-3d17a',
	storageBucket: 'docs-clone-3d17a.appspot.com',
	messagingSenderId: '19920385180',
	appId: '1:19920385180:web:836fbbe14e3b92fda6e959'
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();

export { db };
