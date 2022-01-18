import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
 apiKey: "AIzaSyCErkz0Zk8vIZwgeUrRqHIUu3m6j_CBYOQ",
 authDomain: "react-store-c8087.firebaseapp.com",
 projectId: "react-store-c8087",
 storageBucket: "react-store-c8087.appspot.com",
 messagingSenderId: "496804940782",
 appId: "1:496804940782:web:9ddb0693341ce57f841cff"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
 if (!userAuth) return;
 
 const userRef = firestore.doc(`users/${userAuth.uid}`);

 const snapShot = await userRef.get();

 if (!snapShot.exists) {
  const { displayName, email } = userAuth;
  const createdAt = new Date();

  try {
   await userRef.set({
    displayName,
    email,
    createdAt,
    ...additionalData
   })
  } catch(error) {
   console.log(error.message);
  }
 }

 return userRef;
}

// Used to create initial collections in Firebase
export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
 const collectionRef = firestore.collection(collectionKey);
 console.log(objectsToAdd);
 
 const batch = firestore.batch();
 objectsToAdd.forEach(obj => {
  const newDocRef = collectionRef.doc();
  batch.set(newDocRef, obj);
 });

 return await batch.commit();
}

export const convertCollectionsSnapshotToMap = (collections) => {
 const transformCollection = collections.docs.map(doc => {
  const { title, items } = doc.data();

  return {
   routeName: encodeURI(title.toLowerCase()),
   id: doc.id,
   title,
   items
  }
 });

 return transformCollection.reduce((accumulator, collection) => {
  accumulator[collection.title.toLowerCase()] = collection;
  return accumulator;
 }, {});
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;