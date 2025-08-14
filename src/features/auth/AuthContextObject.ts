import { createContext } from "react";
import type { AuthCtx } from "./AuthContext";

/** Сам объект контекста — отдельно от компонента провайдера */
export const Ctx = createContext<AuthCtx | undefined>(undefined);
