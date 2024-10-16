import Footer from "@/Components/Footer";
import AdminProtectedRoute from "@/HOC/AdminProtectedRoute";
import { ReactNode } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <AdminProtectedRoute>
      {children}
      <Footer />
    </AdminProtectedRoute>
  );
};

export default AuthLayout;
