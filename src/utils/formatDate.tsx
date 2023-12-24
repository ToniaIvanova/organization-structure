export const formatDate = (
  date:
    | string
    | number
    | boolean
    | null
    | undefined
    | Date
    | string[]
    | number[]
): string => {
  if (typeof date === "string") {
    const newDate = new Date(date);
    const year = newDate.getFullYear();
    const month = newDate.getMonth();
    const day = newDate.getDate();
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sept",
      "Oct",
      "Nov",
      "Dec",
    ];
    return `${day} ${months[month]} ${year}`;
  }
  return "";
};
