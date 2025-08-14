import { useContext } from "react";
import type { AuthCtx } from "./AuthContext";
import { Ctx } from "./AuthContextObject";

export const useAuth = (): AuthCtx => {
  const v = useContext(Ctx);
  if (!v) throw new Error("useAuth must be used inside <AuthProvider>");
  return v;
};
