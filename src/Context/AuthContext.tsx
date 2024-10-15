"use client";

import { auth, db } from "@/Firebase/firebaseConfig";
import { UserType } from "@/Types/all-types";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type ChildrenType = {
  children: ReactNode;
};

type ContextType = {
  user: UserType | null;
};

const AuthContext = createContext<ContextType | null>({user: null});

export default function AuthContextProvider({ children }: ChildrenType) {
  const [user, setUser] = useState<UserType| null>(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        fetchuserData(uid);
      } else {
        setUser(null);
      }
    });
  }, []);

  const fetchuserData = async (uid: string) => {
    const docRef = doc(db, "users", uid);
    try {
      const userFound = await getDoc(docRef);
      const user = userFound.data();
      if (!user) return;
      setUser(user as UserType);
    } catch (e) {
      console.error("error:", e);
    }
  };

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => useContext(AuthContext);