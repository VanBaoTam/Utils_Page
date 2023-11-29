export const getTaskStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "activated":
      return "#a5d6a7"; // green
    case "suspended":
      return "#FFFF9F"; // yellow
    case "expired":
      return "#ef9a9a"; // red
    default:
      return "#e0e0e0"; // gray as a default
  }
};
