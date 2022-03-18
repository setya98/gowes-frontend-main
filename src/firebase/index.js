import firebase from "firebase/app"
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAz_hw_3N05Ext1mtzeT8xe3rR2pixFP8w",
  authDomain: "gowesapp-c8c7c.firebaseapp.com",
  databaseURL: "https://gowesapp-c8c7c.firebaseio.com",
  projectId: "gowesapp-c8c7c",
  storageBucket: "gowesapp-c8c7c.appspot.com",
  messagingSenderId: "402584781476",
  appId: "1:402584781476:web:55c3954d124c7796775c31",
  measurementId: "G-7EB0PY4K61"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };