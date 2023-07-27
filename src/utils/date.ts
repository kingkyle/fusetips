import dayjs from "dayjs";

export function formatTime(v: Date) {
  return dayjs(v).format("HH:mm A");
}

export function formatDayMonth(v: Date) {
  return dayjs(v).format("ddd D, MMM");
}
