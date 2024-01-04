import { CSV } from "https://js.sabae.cc/CSV.js";
import { save } from "./save.js";
import { sleep } from "https://js.sabae.cc/sleep.js";

//const stations = await CSV.fetchJSON("data/stations.csv");
const stations = await CSV.fetchJSON("./stations.csv");

export const saveDay = async (day) => {
  console.log("saveDay", day);
  for (const station of stations) {
    const id = station.code;
    console.log("save", id);
    await save(id, day);
    await sleep(500);
  }
};
