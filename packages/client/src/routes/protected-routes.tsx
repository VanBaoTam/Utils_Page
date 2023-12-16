import { useAppSelector } from "@/Redux/hooks";
import { Navigate } from "react-router-dom";
import { ReactNode } from "react";

interface ProtectedRoutesProps {
  children: ReactNode;
}

function ProtectedRoutes({ children }: ProtectedRoutesProps) {
  const accountSelector = useAppSelector((store) => store.account);

  return !accountSelector.isLogged ? children : <Navigate to={"/"} />;
}

export default ProtectedRoutes;
