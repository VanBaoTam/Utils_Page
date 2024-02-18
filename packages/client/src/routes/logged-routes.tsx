import { useAppSelector } from "@/Redux/hooks";
import { Navigate } from "react-router-dom";
import { ReactNode, useEffect } from "react";
import { displayToast } from "@/utils/toast";

interface ProtectedRoutesProps {
  children: ReactNode;
}

function LoggedRoutes({ children }: ProtectedRoutesProps) {
  const accountSelector = useAppSelector((store) => store.account);
  useEffect(() => {
    if (!accountSelector.isLogged) {
      displayToast("You must log out before login into new account!", "info");
    }
  }, []);
  return accountSelector.isLogged ? children : <Navigate to={"/"} />;
}

export default LoggedRoutes;
