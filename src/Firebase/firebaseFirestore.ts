import { doc, setDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";

export async function saveUser(email: string, userName: string, uid: string) {
  try {
    const docRef = doc(db, "users", uid);
    const user = {
      email,
      userName,
      uid,
      userType: "user",
    };
    await setDoc(docRef, user);
  } catch (error) {
    console.log(error);
  }
}
