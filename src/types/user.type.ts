export type User = {
  id: string;
  fname: string;
  lname: string;
  email: string;
  role: UserRole;
};

export enum UserRole {
  MANAGER = "MANAGER",
  EMPLOYEE = "EMPLOYEE",
}

export type UserState = {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
};