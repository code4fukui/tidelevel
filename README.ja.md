# tidelevel

本リポジトリは、気象庁（JMA）の潮位データを自動的にダウンロード、アーカイブ、および可視化します。データはGitHub Actionsにより1時間ごとに更新されます。

- **ライブデモ:** [気象庁 潮位データ 2024-01-01/02 （日本海側5府県）](https://code4fukui.github.io/tidelevel/)

## 仕組み

- **データの自動取得**: GitHub Actionsのワークフロー（[`.github/workflows/scheduled-update.yml`](./.github/workflows/scheduled-update.yml)）により、1時間ごとのスケジュールでDenoスクリプト `download.js` が実行されます。このスクリプトは、登録されている全観測所の最新の潮位データを取得します。
- **データの保存**: 気象庁から取得した生のJSONデータは `data/` ディレクトリにアーカイブされ、年月および観測所コードごとに整理されます。ファイル構成は `data/YYYYMM/STATION_ID/tide_obs_YYYYMMDD_STATION_ID.json` となります。
- **可視化**: [`index.html`](https://code4fukui.github.io/tidelevel/) では、[ApexCharts.js](https://apexcharts.com/) を使用して、ダウンロードしたデータのインタラクティブな折れ線グラフを表示します。

## データ

- **取得元**: [気象庁｜潮位観測情報 (JMA Tide Observation Information)](https://www.jma.go.jp/bosai/tidelevel/)
- **観測所**: 観測所の一覧は [`stations.csv`](./stations.csv) で確認できます。

## 使い方（開発者向け）

本プロジェクトでは、JavaScriptランタイムとして [Deno](https://deno.land/) を使用しています。

### 手動でのデータダウンロード

今日および昨日の最新データを取得するには、メインのダウンロードスクリプトを実行します。
```sh
deno run -A download.js
```

### 特定の日付や観測所を指定したダウンロード

`download-cmd.js` を使用すると、特定の日付や単一の観測所を指定してデータを取得できます。

**特定の日付（YYYYMMDD）における全観測所のデータをダウンロード:**
```sh
deno run -A download-cmd.js 20240101
```

**特定の日付における特定の観測所のデータをダウンロード:**
```sh
deno run -A download-cmd.js 20240101 145602
```

## クレジット

- **データ**: [気象庁 (Japan Meteorological Agency)](https://www.jma.go.jp/jma/index.html)
- **アプリケーション**: [Code for Fukui](https://github.com/code4fukui)
