"use client";

import { useAuthContext } from "@/Context/AuthContext";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

const HomeProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { user } = useAuthContext()!;
  const route = useRouter();

  useEffect(() => {
    if (user) {
      if (user.userType === "admin") {
        route.push("/admin");
      }
    }
  }, [user, route]);

  return <>{children}</>;
};

export default HomeProtectedRoute;
