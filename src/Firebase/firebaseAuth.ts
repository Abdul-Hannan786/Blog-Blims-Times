import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { toast } from "react-toastify";
import { auth } from "./firebaseConfig";
import { saveUser } from "./firebaseFirestore";

export async function signupWithEmailPassword(
  email: string,
  password: string,
  userName: string
) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const { email: userEmail, uid } = userCredential.user;
    console.log("User created successfully.");
    
    await saveUser(userEmail as string, userName, uid); // Ensure saveUser is awaited if it returns a promise
    toast.success(`Signed up with email: ${userEmail}`);
  } catch (error) {
    console.error("Sign-up Error:", error);
    toast.error(`Couldn't sign-up: `);
  }
}

export async function loginWithEmailPassword(email: string, password: string) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const { email: userEmail } = userCredential.user;
    console.log("User logged in successfully.");
    toast.success(`Signed in with email: ${userEmail}`);
  } catch (error) {
    console.error("Login Error:", error);
    toast.error(`Couldn't sign-in`);
  }
}


export function signOutFunc() {
    signOut(auth)
      .then(() => {
        console.log();
        toast.success("Signed-out succesfully!");
      })
      .catch((error) => {
        console.log(error);
        toast.error(`error : ${error.message}`);
      });
  }