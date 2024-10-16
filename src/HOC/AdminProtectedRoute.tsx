"use client"

import { useAuthContext } from "@/Context/AuthContext";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import { toast } from "react-toastify";

const AdminProtectedRoute = ({ children }: { children: ReactNode }) => {
  const {user} = useAuthContext()!
  const route = useRouter()

  useEffect(() => {
    if(user){
      if(user.userType === "user"){
        route.push("/")
        toast.error("You are not an admin")
      }
      else if(user.userType === "admin"){
        route.push("/admin")
      } 
    }
  }, [user, route])

  return <>{children}</>;
};

export default AdminProtectedRoute;
