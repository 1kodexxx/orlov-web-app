import { useContext } from "react";
import { Ctx } from "./AuthContextObject.ts"; // если вынес Ctx в другой файл, поменяй путь

export const useAuth = () => {
  const v = useContext(Ctx);
  if (!v) throw new Error("useAuth must be used inside <AuthProvider>");
  return v;
};
