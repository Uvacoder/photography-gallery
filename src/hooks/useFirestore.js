import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { firestore, storage } from "../firebase/firebaseClient";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const useFirestore = () => {
  const [documents, setDocuments] = useState([]);
  const router = useLocation();

  const albumId = router.pathname.split("/")[2];

  useEffect(() => {
    const q = query(
      collection(firestore, `albums/${albumId}/gallery`),
      orderBy("createdAt", "desc")
    );
    const unsub = onSnapshot(
      q,
      (snapshot) => {
        const docs = [];
        snapshot.forEach((doc) => {
          docs.push({ id: doc.id, data: doc.data() });
        });
        setDocuments(docs);
      },
      (error) => {
        console.log("useFirestore Errro", error);
      }
    );

    return () => unsub();
  }, [albumId]);

  const uploadFileProgress = (file, subFolder, imageName, setProgress) => {
    return new Promise((resolve, reject) => {
      const storageRef = ref(storage, subFolder + "/" + imageName);
      const upload = uploadBytesResumable(storageRef, file);
      upload.on(
        "state_change",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(progress);
        },
        (error) => {
          reject(error);
        },
        async () => {
          try {
            const url = await getDownloadURL(storageRef);
            resolve(url);
          } catch (error) {
            console.log("uploadFileProgress Error", error);
            reject(error);
          }
        }
      );
    });
  };

  const addDocument = (collectionName, documentObj, id) => {
    const docRef = doc(collection(firestore, collectionName), id);

    return setDoc(docRef, {
      ...documentObj,
      createdAt: serverTimestamp(),
    });
  };

  const deleteDocument = (collectionName, docId) => {
    return deleteDoc(doc(firestore, collectionName, docId));
  };

  const deleteFile = (filePath) => {
    const imageRef = ref(storage, filePath);
    return deleteObject(imageRef);
  };

  const deleteUserFiles = (collectionName, albumId) => {
    return new Promise(async (resolve, reject) => {
      const q = query(collection(firestore, collectionName));
      try {
        const snapshot = await getDocs(q);
        const storePromises = [];
        const storagePromises = [];
        snapshot.forEach((doc) => {
          storePromises.push(deleteDocument(collectionName, doc.id));
          storagePromises.push(deleteFile(`gallery/${albumId}/${doc.id}`));
        });
        await Promise.all(storePromises);
        await Promise.all(storagePromises);

        resolve();
      } catch (error) {
        console.log("deleteUserFiles Error", error);
        reject(error);
      }
    });
  };

  return {
    uploadFileProgress,
    addDocument,
    documents,
    deleteDocument,
    deleteFile,
    deleteUserFiles,
  };
};

export default useFirestore;
