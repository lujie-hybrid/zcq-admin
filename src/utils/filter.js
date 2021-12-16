import Vue from "vue";
import { format, getYearDate } from "./date";

Vue.filter("part_date_time", function (value) {
  return format(value, "MM-DD HH:mm:ss");
});

Vue.filter("str_year", function (value) {
  return getYearDate(value)[0];
});

Vue.filter("str_date", function (value) {
  return getYearDate(value)[1];
});
