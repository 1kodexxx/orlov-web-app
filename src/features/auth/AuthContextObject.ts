import { createContext } from "react";
import type { AuthCtx } from "./AuthContext";

export const Ctx = createContext<AuthCtx | undefined>(undefined);
