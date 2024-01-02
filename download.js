import { DateTime, Time, Day, TimeZone } from "https://js.sabae.cc/DateTime.js";
import { CSV } from "https://js.sabae.cc/CSV.js";
import { save } from "./save.js";


const stations = await CSV.fetchJSON("data/stations.csv");

export const saveDay = async (day) => {
  console.log("saveDay", day);
  for (const station of stations) {
    const id = station.station_code;
    await save(id, day);
  }
};

/*
const now = new DateTime();
const day2 = new DateTime(new Day("2024/01/02"), new Time("00:00:00"), TimeZone.JST);
const dt = day2.getTime() - now.getTime();
if (dt > -30 * 60 * 1000) {
  await saveDay(new Day("2024/01/01"));
}
if (dt < 0) {
  await saveDay(new Day("2024/01/02"));
}
*/
//await saveDay(new Day("2024/01/01"));
await saveDay(new Day("2024/01/02"));
await saveDay(new Day("2024/01/03"));
