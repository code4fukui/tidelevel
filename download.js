import { Day } from "https://js.sabae.cc/DateTime.js";
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
for (const station of stations) {
  //const dt = new Day("2023/12/26");
  const dt = new Day("2024/01/01");
  const id = station.station_code;
  await save(id, dt);
}
