import { collection, doc, serverTimestamp, setDoc } from "firebase/firestore";
import { firestore } from "./firebaseClient";

const addDocument = (collectionName, documentObj, id) => {
  const docRef = doc(collection(firestore, collectionName), id);

  return setDoc(docRef, {
    ...documentObj,
    createdAt: serverTimestamp(),
  });
};

export default addDocument;
