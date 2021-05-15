import firebase from 'firebase/app'
import 'firebase/storage'
import 'firebase/database'

var firebaseConfig = {
  apiKey: "AIzaSyAGpPUOxsKbnKVs3U1jR8j1wFcWxV2DH7Q",
  authDomain: "image-uploader-aa214.firebaseapp.com",
  databaseURL: "https://image-uploader-aa214-default-rtdb.firebaseio.com",
  projectId: "image-uploader-aa214",
  storageBucket: "image-uploader-aa214.appspot.com",
  messagingSenderId: "240192892297",
  appId: "1:240192892297:web:cbd294a4924e782a1a0558",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const firebaseDb = firebase.database().ref()

export const firebaseStorage = firebase.storage()

