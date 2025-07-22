export const getPriorityColor = (priority: number) => {
  switch (priority) {
    case 2:
      return "bg-red-100 text-red-800";
    case 1:
      return "bg-yellow-100 text-yellow-800";
    case 0:
      return "bg-green-100 text-green-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};
export const getPriorityLabel = (priority: number) => {
  switch (priority) {
    case 2:
      return "High";
    case 1:
      return "Medium";
    case 0:
      return "Low";
    default:
      return "Unknown";
  }
};
