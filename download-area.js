const urls = [
  "https://www.jma.go.jp/bosai/common/const/area.json",
  "https://www.jma.go.jp/bosai/tidelevel/const/tide_area.json",
];
for (const url of urls) {
  const fn = url.substring(url.lastIndexOf("/") + 1);
  const data = await (await fetch(url)).json();
  await Deno.writeTextFile(fn, JSON.stringify(data, null, 2));
}
