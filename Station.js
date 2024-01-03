import { Day } from "https://js.sabae.cc/DateTime.js";

const base = "https://code4fukui.github.io/tidelevel/";

export class Station {
  constructor(id, dt) {
    this.id = id;
    if (dt instanceof Day) {
      dt = dt.toStringYMD();
    }
    this.dt = dt;
  }
  getName() {
    return `tide_obs_${this.dt}_${this.id}.json`;
  }
  getPath() {
    return "data/" + this.dt.substring(0, 6) + "/" + this.id + "/";  
  }
  getURL() {
    return base + this.getPath() + this.getName();
  }
};
