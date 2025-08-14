export type Role = "admin" | "manager" | "customer";

export type CurrentUser = {
  id: number;
  email: string;
  role: Role;
  firstName: string | null;
  lastName: string | null;
  avatarUrl: string | null;
} | null;

export type AuthCtx = {
  user: CurrentUser;
  loading: boolean;
  login: (p: { email: string; password: string }) => Promise<void>;
  register: (p: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }) => Promise<void>;
  logout: () => Promise<void>;
  refreshProfile: () => Promise<void>;
};
