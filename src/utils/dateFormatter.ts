export const dateFormatter = (
  dateString: string,
  options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  }
): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString(undefined, options);
};
