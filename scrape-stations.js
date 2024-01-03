import { HTMLParser } from "https://js.sabae.cc/HTMLParser.js";
import { CSV } from "https://js.sabae.cc/CSV.js";
import { fetchOrLoad } from "https://js.sabae.cc/fetchOrLoad.js";
import { Geo3x3 } from "https://geo3x3.com/Geo3x3.js";
import { sdms2d } from "https://code4fukui.github.io/DMS/DMS.js";

//const url = "https://www.data.jma.go.jp/kaiyou/db/tide/suisan/index.php";
const base = "https://www.data.jma.go.jp/kaiyou/db/tide/suisan/";

const stns = [];
const fetched = {};
const parseSTN = async (path) => {
  if (fetched[path]) return;
  fetched[path] = true;
  console.log("parseSTN", path);

  const url = base + path;
  const html = await fetchOrLoad(url);
  const dom = HTMLParser.parse(html);
  //const stories = dom.querySelectorAll(".con_story .wrp_sto > li");
  const links = dom.querySelectorAll("a");
  //console.log(links.length);
  for (const a of links) {
    const link = a.getAttribute("href");
    if (!link) continue;
    const pre = "suisan.php?stn=";
    if (link.startsWith(pre)) {
      stns.push(link.substring(pre.length));
    } else if (link.startsWith("s_") && link.endsWith(".php")) {
      await parseSTN(link);
    }
  }
};
await parseSTN("index.php");
console.log(stns);

const data = [];
for (const stn of stns) {
  const url = base + "suisan.php?stn=" + stn;
  const html = await fetchOrLoad(url);
  const dom = HTMLParser.parse(html);
  //console.log(dom);

  /*
<h1>潮位表 稚内（WAKKANAI）</h1>
<ul class="contentslink ltx">
	<li><a href="explanation.html">解説</a></li>
</ul>
<table border="0">
  <tr align="right"><td nowrap="nowrap" colspan="2">　北海道 稚内市 新港町  </td>
<td rowspan="4"><a href="s_hokkaidonw.php"><img src="../map/map_hokkaidonw.gif" width="179" height="150" alt="地点索引に戻る" /></a></td>
</tr>
<tr align="right"><td nowrap="nowrap">緯度：</td><td nowrap="nowrap">45°24′N</td></tr>
<tr align="right"><td nowrap="nowrap">経度：</td><td nowrap="nowrap">141°41′E</td></tr>
<tr align="right"><td nowrap="nowrap">潮位表基準面の標高：</td><td nowrap="nowrap">-1.8(cm)</td></tr>
  */
  const h1 = dom.querySelector("h1").text.replace(/[（）]/g, " ").split(" ");
  const d = {};
  const detail = "//www.jma.go.jp/bosai/tidelevel/#point_code=";
  d.station_code = dom.querySelectorAll("a").map(i => i.getAttribute("href")).find(i => i && i.startsWith(detail))?.substring(detail.length).trim();
  d.stn = stn;

  d.name = h1[1];
  d.name_en = h1[2];
  const trs = dom.querySelectorAll("#main table tr");
  const pos = trs[0].querySelector("td").text.trim().split(" ");
  d.pref = pos[0];
  pos.shift()
  d.address = pos.join(" ");
  d.lat = trs[1].querySelectorAll("td")[1].text;
  d.lng = trs[2].querySelectorAll("td")[1].text;
  d.att = trs[3].querySelectorAll("td")[1].text;
  d.geo3x3 = Geo3x3.encode(sdms2d(d.lat), sdms2d(d.lng), 11);

  d.src = url;
  //console.log(d);
  //break;
  data.push(d);
}
console.log(data);
data.sort((a, b) => -a.geo3x3.localeCompare(b.geo3x3));

/*
for (const d of data) {
  if (!d.station_code) continue;

  const url = "https://www.jma.go.jp/bosai/tidelevel/#point_code=" + d.station_code;
  const html = await fetchOrLoad(url);
  const dom = HTMLParser.parse(html);
  console.log(dom);
  console.log(url);

  break;
}
*/

await Deno.writeTextFile("stations2.csv", CSV.stringify(data));
