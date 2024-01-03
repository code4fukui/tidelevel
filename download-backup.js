import { Day } from "https://js.sabae.cc/DateTime.js";
import { saveDay } from "./saveDay.js";
import { sleep } from "https://js.sabae.cc/sleep.js";

for (let i = new Day("2023-12-02"); !i.equals(new Day("2024-01-01")); i = i.dayAfter(1)) {
  await saveDay(i);
  await sleep(1000);
}
