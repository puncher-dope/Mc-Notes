export const formatFullDate = (isoString: string) => {
  const date = new Date(isoString);
  return date.toLocaleString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};
export const formatTimeDate = (isoString: string) => {
  const date = new Date(isoString);
  return date.toLocaleString('ru-RU', {
    hour: '2-digit',
    minute: '2-digit'
  });
};