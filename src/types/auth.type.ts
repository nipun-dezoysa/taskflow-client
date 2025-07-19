export type User = {
  id: string;
  fname: string;
  lname: string;
  email: string;
  role: UserRole;
};

export type UserRole = "MANAGER" | "EMPLOYEE";

export type AuthState = {
  user: User | null;
  token: string | null;
  setToken: (token: string, user: User) => void;
  clearToken: () => void;
};
