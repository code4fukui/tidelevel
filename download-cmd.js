import { saveDay } from "./saveDay.js";
import { save } from "./save.js";

if (Deno.args.length < 1) {
  console.log("download-cmd [day] [id]");
  Deno.exit(1);
}
const day = Deno.args[0];
const id = Deno.args[1];
if (id) {
  await save(id, day);
} else {
  await saveDay(day);
}
