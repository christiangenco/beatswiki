import { useState, useEffect } from "react";

import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import {
  useCollectionData,
  useDocumentData,
} from "react-firebase-hooks/firestore";
import debounce from "lodash.debounce";
import mapValues from "lodash.mapvalues";

const FirebaseContext = React.createContext();
const FirestoreContext = React.createContext();
const FirebaseUserContext = React.createContext();

function storeUser({ user, db }) {
  if (user) {
    const { uid, displayName, photoURL, email, isAnonymous } = user;
    const { creationTime, lastSignInTime } = user.metadata;

    const userDoc = db.collection("users").doc(user.uid);
    const userData = {
      uid,
      displayName,
      photoURL,
      email,
      isAnonymous,
      creationTime: new Date(creationTime),
      lastSignInTime: new Date(lastSignInTime),
    };
    userDoc.set(userData);
    return { userDoc, userData };
  }
  return {};
}

function FirebaseProvider({ children, config }) {
  const [user, setUser] = useState(null);

  if (!firebase.apps.length) {
    firebase.initializeApp(config);
    firebase
      .firestore()
      .enablePersistence()
      .catch(err => {
        if (err.code == "failed-precondition") {
          alert(
            "Oh yikes—looks like multiple tabs are open. Offline support may be weird."
          );
        } else if (err.code == "unimplemented") {
          // The current browser does not support all of the
          // features required to enable persistence
          // ...
        }
      });
  }
  // const firebaseApp = !firebase.apps.length
  //   ?
  //   : firebase.app();

  // firebase.analytics();
  const db = firebase.firestore();

  useEffect(() => {
    return firebase.auth().onAuthStateChanged(user => {
      const { userDoc, userData } = storeUser({ user, db });
      setUser(userData || null);
    });
  }, []);

  return (
    <FirebaseContext.Provider value={firebase}>
      <FirebaseUserContext.Provider value={user}>
        <FirestoreContext.Provider value={db}>
          {children}
        </FirestoreContext.Provider>
      </FirebaseUserContext.Provider>
    </FirebaseContext.Provider>
  );
}

function useFirestore() {
  const context = React.useContext(FirestoreContext);
  if (context === undefined) {
    throw new Error("useFirestore must be used within a FirebaseProvider");
  }
  return context;
}

function useFirebase() {
  const context = React.useContext(FirebaseContext);
  if (context === undefined) {
    throw new Error("useFirebase must be used within a FirebaseProvider");
  }
  return context;
}

function signinWithGoogle() {
  const provider = new firebase.auth.GoogleAuthProvider();
  // provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
  provider.addScope("https://www.googleapis.com/auth/youtube.upload");
  // provider.setCustomParameters({
  //   'login_hint': 'user@example.com'
  // });
  return firebase.auth().signInWithPopup(provider);
}

function useAuth() {
  const context = React.useContext(FirebaseUserContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a FirebaseProvider");
  }

  // link anonymous user with logged in user
  // https://firebase.google.com/docs/auth/web/anonymous-auth#convert-an-anonymous-account-to-a-permanent-account
  // firebase.auth().signInAnonymously()
  // error and loading?
  return {
    user: context,
    signOut: () => {
      console.log("signing out");
      firebase.auth().signOut();
    },
    signinWithGoogle,
  };
}

const debouncedUpdate = debounce(({ doc, data }) => {
  doc.update(data);
}, 1000);

function useCollection(collectionPath) {
  let path = collectionPath;
  const db = useFirestore();
  const firebase = useFirebase();
  const { user } = useAuth();
  if (user && path[0] !== "/") path = `/users/${user.uid}/${path}`;

  const collection = db.collection(path);

  const [firebaseData, loading, error] = useCollectionData(collection, {
    idField: "id",
  });

  function add(doc) {
    return collection.add({
      ...doc,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
  }

  function update(doc) {
    // nested object updates use dot notation:
    // https://firebase.google.com/docs/firestore/manage-data/add-data#update_fields_in_nested_objects
    // undefined => null
    const updatedFields = mapValues(doc, v => v || null);
    return collection.doc(doc.id).update({
      ...updatedFields,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
  }

  function remove(doc) {
    return collection.doc(doc.id).delete();
  }

  // console.log({ path });
  // return [firebaseData, addDoc, loading, error];
  return { data: firebaseData, add, update, remove, loading, error };
}

function useDoc(docPath) {
  let path = docPath;
  const db = useFirestore();
  const firebase = useFirebase();
  const { user } = useAuth();
  if (user && path[0] !== "/") path = `/users/${user.uid}/${path}`;
  const doc = db.doc(path);

  const [data, setData] = useState(null);
  const [firebaseData, loading, error] = useDocumentData(doc, {
    idField: "id",
  });

  // update local data if remote data changes
  useEffect(() => {
    setData(firebaseData);
  }, [firebaseData]);

  function setDataWithFirebase(newData) {
    setData(newData);
    debouncedUpdate({
      doc,
      data: {
        ...newData,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      },
    });
  }

  function remove() {
    doc.delete();
  }

  function update(newData) {
    doc.update(newData);
  }

  return {
    data,
    update,
    debouncedUpdate: setDataWithFirebase,
    remove,
    loading,
    error,
  };
}

export {
  FirebaseProvider,
  useFirestore,
  useFirebase,
  useAuth,
  useCollection,
  useDoc,
};
