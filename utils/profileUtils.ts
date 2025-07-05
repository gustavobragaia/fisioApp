import { User } from "@/types/supabase";

export const cpfMask = (value: string): string => {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})/, "$1-$2")
    .replace(/(-\d{2})\d+?$/, "$1");
};

export const hasFormChanges = (
  currentData: User,
  originalData: User
): boolean => {
  return Object.keys(currentData).some(
    key => currentData[key as keyof User] !== originalData[key as keyof User]
  );
};
