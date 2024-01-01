import { DateTime, Time, Day, TimeZone } from "https://js.sabae.cc/DateTime.js";
import { CSV } from "https://js.sabae.cc/CSV.js";
import { Station } from "./Station.js";

const save = async (id, date) => {
  const st = new Station(id, date);
  //const url = "https://www.jma.go.jp/bosai/tidelevel/data/tide/tide_obs_20231226_145553.json";
  const fn = st.getName();
  const url = `https://www.jma.go.jp/bosai/tidelevel/data/tide/${fn}`;
  const data = await (await fetch(url)).text();
  const path = st.getPath();
  await Deno.mkdir(path, { recursive: true });
  await Deno.writeTextFile(path + fn, data);
};

const stations = await CSV.fetchJSON("data/stations.csv");

const saveDay = async (day) => {
  console.log("saveDay", day);
  for (const station of stations) {
    const id = station.station_code;
    await save(id, day);
  }
};

const now = new DateTime();
const day2 = new DateTime(new Day("2024/01/02"), new Time("00:00:00"), TimeZone.JST);
const dt = day2.getTime() - now.getTime();
if (dt > -30 * 60 * 1000) {
  await saveDay(new Day("2024/01/01"));
}
if (dt < 0) {
  await saveDay(new Day("2024/01/02"));
}
