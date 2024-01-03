import { CSV } from "https://js.sabae.cc/CSV.js";

const tides = JSON.parse(await Deno.readTextFile("./tide_area.json"));

const flat = (obj) => {
  const res = {};
  const flat2 = (obj, pre) => {
    for (const name in obj) {
      const o = obj[name];
      if (typeof o == "object") {
        flat2(o, name + "_");
      } else {
        res[pre + name] = o;
      }
    }
  };
  flat2(obj, "");
  return res;
};

const data = [];
for (const name in tides) {
  const tide = tides[name];
  for (const list of tide.class30s) {
    if (!list.stations) continue;
    list.stations.forEach(i => {
      i.pref = i.addr.split(" ")[0];
      data.push(flat(i));
    });
  }
}
console.log(data);
await Deno.writeTextFile("./stations.csv", CSV.stringify(data));
