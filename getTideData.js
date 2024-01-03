import { DateTime } from "https://js.sabae.cc/DateTime.js";
import { Station } from "./Station.js";

const tides = {};

const fetchTideData = async (st) => {
  const url = st.getURL();
  const cache = tides[url];
  if (cache) return cache;
  try {
    const tide = await (await fetch(url)).json();
    return tides[url] = tide;
  } catch (e) {
  }
  return null;
};
export const getTideData = async (s, days) => {
    const data = [];
    const code = s.station_code || s.code;
    for (const day of days) {
      const st = new Station(code, day);
      const tide = await fetchTideData(st);
      if (!tide) continue;
      let t = new DateTime(tide.time).getTime();
      //console.log(t, performance.now(), new Date().getTime())
      const dt = parseInt(tide.interval) * 1000;
      const d = tide.tide;
      for (let i = 0; i < d.length; i++) {
        data.push([t, d[i]]);
        t += dt;
      }
    }
  return { name: (s.pref ? s.pref + " " : "") + s.name, data, code };
};
