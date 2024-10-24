import AdminProtectedRoute from "@/HOC/AdminProtectedRoute";
import { ReactNode } from "react";
import Footer from "../Components/Footer";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <AdminProtectedRoute>
      {children}
      <Footer />
    </AdminProtectedRoute>
  );
};

export default AuthLayout;
