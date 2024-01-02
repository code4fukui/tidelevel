import { save } from "./save.js";

const id = "156131";
const days = ["20240101", "20240102"];
for (const day of days) {
  await save(id, day);
}
