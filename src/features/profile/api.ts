// src/features/profile/api.ts
import { api } from "@/shared/apiClient";
import type { Me } from "@/features/auth/api";

export interface UpdateProfileDto {
  firstName?: string;
  lastName?: string;
  phone?: string | null;
  avatarUrl?: string; // сервер всё равно перезапишет
}

export const getMe = async () => {
  const { data } = await api.get<Me>("/users/me");
  return data;
};

export const updateMe = async (dto: UpdateProfileDto) => {
  const { data } = await api.patch<Me>("/users/me", dto);
  return data;
};

export const changeEmail = async (email: string) => {
  const { data } = await api.patch<Me>("/users/me/email", { email });
  return data;
};

export const changePassword = async (
  currentPassword: string,
  newPassword: string
) => {
  const { data } = await api.patch<{ success: true }>("/users/me/password", {
    currentPassword,
    newPassword,
  });
  return data.success;
};

export const uploadAvatar = async (file: File) => {
  const fd = new FormData();
  fd.append("avatar", file);
  const { data } = await api.patch<{ avatarUrl: string }>(
    "/users/me/avatar",
    fd,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
  return data.avatarUrl;
};
