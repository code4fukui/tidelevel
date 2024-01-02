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
