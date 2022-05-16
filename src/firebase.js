import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBeNOU4ry47EsMyaUiV4phyojfLlUV2tEE",
  authDomain: "app-notas-5ba12.firebaseapp.com",
  projectId: "app-notas-5ba12",
  storageBucket: "app-notas-5ba12.appspot.com",
  messagingSenderId: "150810820769",
  appId: "1:150810820769:web:f99033288819cb9817f0e0",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {db};
