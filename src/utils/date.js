var dayjs = require("dayjs");

// 格式化
export function format(str, fmt = "YYYY-MM-DD HH:mm:ss") {
  return dayjs(str).format(fmt);
}

// 获取当天凌晨到当前时间
export function getStartToNow() {
  const y = dayjs().year();
  const m = Number(dayjs().month()) + 1;
  const d = Number(dayjs().date());
  const nowTime = dayjs().format("YYYY-MM-DD HH:mm:ss");
  return [
    `${y}-${m < 10 ? "0" + m : m}-${d < 10 ? "0" + d : d} 00:00:00`,
    nowTime,
  ];
}

// 获取当前年
export function getNowYear() {
  return parseInt(dayjs().year());
}

// 获取当前日期
export function getYearDate(str) {
  return [dayjs(str).format("YYYY"), dayjs(str).format("MM-DD")];
}

// 获取当前时间
export function getNowTime() {
  return dayjs().format("YYYY-MM-DD HH:mm:ss");
}
