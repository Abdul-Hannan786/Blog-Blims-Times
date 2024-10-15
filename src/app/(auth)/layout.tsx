import AuthProtectedRoute from "@/HOC/AuthProtectedRoute";
import { ReactNode } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return <AuthProtectedRoute>{children}</AuthProtectedRoute>;
};

export default AuthLayout;
