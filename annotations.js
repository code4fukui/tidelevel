import { DateTime } from "https://js.sabae.cc/DateTime.js";

const eqs = [ // over 5+
  { datetime: "2024-01-01T16:10+09:00", text: "石川県能登地方	M5.7	震度5強" },
  { datetime: "2024-01-01T16:23+09:00", text: "石川県能登地方	6.1	震度5強" },
  { datetime: "2024-01-01T16:24+09:00", text: "石川県能登地方	7.6	震度7" },
  { datetime: "2024-01-01T17:00+09:00", text: "石川県能登地方	5.7	震度5強" },
];
const alerts = [
  { datetime: "2024-01-01T20:30+09:00", text: "大津波警報→津波警報" },
  { datetime: "2024-01-02T01:15+09:00", text: "津波警報→津波注意報" },
  { datetime: "2024-01-02T10:00+09:00", text: "津波注意報 解除" },
];

export const annotations = { xaxis: [] };

for (const eq of [...eqs, ...alerts]) {
  annotations.xaxis.push({
    x: new DateTime(eq.datetime).getTime(),
    borderColor: "#775DD0",
    label: {
      style: { color: "#222" },
      text: eq.text,
    }
  });
}
