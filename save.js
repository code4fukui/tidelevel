import { Station } from "./Station.js";

export const save = async (id, date) => {
  const st = new Station(id, date);
  //const url = "https://www.jma.go.jp/bosai/tidelevel/data/tide/tide_obs_20231226_145553.json";
  const fn = st.getName();
  const url = `https://www.jma.go.jp/bosai/tidelevel/data/tide/${fn}`;
  const data = await (await fetch(url)).text();
  const path = st.getPath();
  await Deno.mkdir(path, { recursive: true });
  await Deno.writeTextFile(path + fn, data);
};
