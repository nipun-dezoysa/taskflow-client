export type User = {
  id: string;
  fname: string;
  lname: string;
  email: string;
  role: UserRole;
};

export type UserProfile = {
  id: string;
  fname: string;
  lname: string;
  email: string;
  role: UserRole;
  status: UserState;
  createdAt: string;
  lastLogin: string;
};

export enum UserRole {
  MANAGER = "MANAGER",
  EMPLOYEE = "EMPLOYEE",
}

export enum UserStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  SUSPENDED = "SUSPENDED",
}

export type UserState = {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
};
