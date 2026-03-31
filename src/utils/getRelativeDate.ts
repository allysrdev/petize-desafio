import type { TFunction } from "i18next";

export const getRelativeDate = (date: string, t: TFunction) => {
  const now = new Date();
  const updated = new Date(date);

  const diffInSeconds = Math.floor((now.getTime() - updated.getTime()) / 1000);
  const diffInDays = Math.floor(diffInSeconds / 86400);

  if (diffInDays > 0) {
    return t("updated_days", { count: diffInDays });
  }

  const diffInHours = Math.floor(diffInSeconds / 3600);
  if (diffInHours > 0) {
    return t("updated_hours", { count: diffInHours });
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  return t("updated_minutes", { count: diffInMinutes });
};
