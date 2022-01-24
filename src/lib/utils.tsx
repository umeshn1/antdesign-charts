export const getTimeRange = (hr: number): string => {
  if (hr >= 0 && hr <= 2) {
    return "0-3";
  } else if (hr >= 3 && hr <= 5) {
    return "3-6";
  } else if (hr >= 6 && hr <= 8) {
    return "6-9";
  } else if (hr >= 9 && hr <= 11) {
    return "9-12";
  } else if (hr >= 12 && hr <= 14) {
    return "12-15";
  } else if (hr >= 15 && hr <= 17) {
    return "15-18";
  } else if (hr >= 18 && hr <= 20) {
    return "18-21";
  } else if (hr >= 21 && hr <= 23) {
    return "21-24";
  }
  return "error"
};

export const defaultTimeRange: any = {
  "0-3D": { timeRange: "0-3", count: 0, slot: "D" },
  "0-3L": { timeRange: "0-3", count: 0, slot: "L" },
  "3-6D": { timeRange: "3-6", count: 0, slot: "D" },
  "3-6L": { timeRange: "3-6", count: 0, slot: "L" },
  "6-9D": { timeRange: "6-9", count: 0, slot: "L" },
  "6-9L": { timeRange: "6-9", count: 0, slot: "L" },
  "9-12D": { timeRange: "9-12", count: 0, slot: "L" },
  "9-12L": { timeRange: "9-12", count: 0, slot: "L" },
  "12-15D": { timeRange: "12-15", count: 0, slot: "D" },
  "12-15L": { timeRange: "12-15", count: 0, slot: "L" },
  "15-18D": { timeRange: "15-18", count: 0, slot: "D" },
  "15-18L": { timeRange: "15-18", count: 0, slot: "L" },
  "18-21L": { timeRange: "18-21", count: 0, slot: "L" },
  "18-21D": { timeRange: "18-21", count: 0, slot: "D" },
  "21-24L": { timeRange: "21-24", count: 0, slot: "L" },
  "21-24D": { timeRange: "21-24", count: 0, slot: "D" },
};
