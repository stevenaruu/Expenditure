import { updateDoc, collection, getDocs, getFirestore, doc } from 'firebase/firestore'
import app from './firebase'
import { IData } from '../../interfaces/IData.interfaces';

const firestore = getFirestore(app);

export async function retriveData(collectionName: string) {
    try {
      const snapshot = await getDocs(collection(firestore, collectionName));
  
      const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          amount: doc.data().amount as number,
      }))

      return data

    } catch (err) {
      console.log(err);
    }
}

export async function updateData(collectionName: string, id: string, amount: number) {
  try {
    const snapshot = doc(collection(firestore, collectionName), id);

    await updateDoc(snapshot, { amount: amount });
  } catch (err) {
    console.log(err);
  }
}