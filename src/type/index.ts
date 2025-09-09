import type { User } from "lucia";

export type ActionResult = {
  error: string;
  success?: boolean;
};

export interface EditPageProp {
  params: Promise<{ id: string }>;
}

export interface DeletePageProps {
  params: Promise<{ id: string }>;
}

export interface UserRole extends User {
  role: string;
  name: string;
}

export interface UserRoleEmail extends User {
  email: string;
  role: string;
}
