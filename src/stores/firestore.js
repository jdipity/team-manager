import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { defineStore } from "pinia";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
  apiKey: "AIzaSyBzl40wlxQ0ulfBnARaeJoXqfxH7TVS3wg",
  authDomain: "worship-team-manager.firebaseapp.com",
  databaseURL: "https://worship-team-manager-default-rtdb.firebaseio.com",
  projectId: "worship-team-manager",
  storageBucket: "worship-team-manager.appspot.com",
  messagingSenderId: "82010217250",
  appId: "1:82010217250:web:7108b1920737aad72ee37b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export const useStore = defineStore("firestore", {
  state: () => ({
    city: "",
  }),
  getters: {
    doubleCount: (state) => state.counter * 2,
  },
  actions: {
    async buildDoc() {
      // Add a new document in collection "cities"
      await setDoc(doc(db, "cities", "LA"), {
        name: "Los Angeles",
        state: "CA",
        country: "USA",
      });
    },

    async getDocument(collection, id) {
      const docRef = doc(db, collection, id);

      // Add a new document in collection "cities"
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        this.city = docSnap.data();
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
        this.city = "No such document!";
      }
    },

    async registerUser(email, password) {
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // ..
        });
    },
  },
});
