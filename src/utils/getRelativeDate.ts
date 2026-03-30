export const getRelativeDate = (date: string) => {
  const now = new Date();
  const updated = new Date(date);

  const diffInSeconds = Math.floor((now.getTime() - updated.getTime()) / 1000);
  const diffInDays = Math.floor(diffInSeconds / 86400);

  if (diffInDays > 0) return `há ${diffInDays} dias`;

  const diffInHours = Math.floor(diffInSeconds / 3600);
  if (diffInHours > 0) return `há ${diffInHours} horas`;

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  return `há ${diffInMinutes} minutos`;
};
