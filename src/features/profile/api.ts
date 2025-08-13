// src/features/profile/api.ts
import { apiFetch } from "@/shared/apiClient";

export type Me = {
  id: number;
  email: string;
  firstName: string | null;
  lastName: string | null;
  phone: string | null;
  city: string | null;
  country: string | null;
  homeAddress: string | null;
  deliveryAddress: string | null;
  avatarUrl: string | null;
  tokenVersion: number;
};

export type UpdateProfileDto = Partial<{
  firstName: string;
  lastName: string;
  phone: string | null;
  city: string | null;
  country: string | null;
  homeAddress: string | null;
  deliveryAddress: string | null;
}>;

export async function getMe() {
  return apiFetch<Me>("/users/me");
}

export async function updateMe(dto: UpdateProfileDto) {
  return apiFetch<Me>("/users/me", {
    method: "PATCH",
    body: JSON.stringify(dto),
  });
}

export async function changeEmail(email: string) {
  return apiFetch<{ email: string }>("/users/me/email", {
    method: "PATCH",
    body: JSON.stringify({ email }),
  });
}

export async function changePassword(
  currentPassword: string,
  newPassword: string
) {
  return apiFetch<{ success: true }>("/users/me/password", {
    method: "PATCH",
    body: JSON.stringify({ currentPassword, newPassword }),
  });
}

export async function uploadAvatar(file: File) {
  const fd = new FormData();
  fd.append("avatar", file);
  return apiFetch<{ avatarUrl: string; user: Me }>("/users/me/avatar", {
    method: "PATCH",
    body: fd,
  });
}
