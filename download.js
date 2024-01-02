import { DateTime, Day, TimeZone } from "https://js.sabae.cc/DateTime.js";
import { saveDay } from "./saveDay.js";

const today = new Day(TimeZone.JST);
const yesterday = today.dayBefore(1);
const now = new DateTime();
const daystart = new DateTime(today, TimeZone.JST);
const dt = daystart.getTime() - now.getTime();
if (dt > -2 * 60 * 60 * 1000) {
  await saveDay(yesterday);
}
await saveDay(today);
