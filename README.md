# tidelevel

> 日本語のREADMEはこちらです: [README.ja.md](README.ja.md)

This repository automatically downloads, archives, and visualizes tide level data from the Japan Meteorological Agency (JMA). The data is updated hourly via a GitHub Action.

- **Live Demo:** [気象庁 潮位データ 2024-01-01/02 （日本海側5府県）](https://code4fukui.github.io/tidelevel/)

## How It Works

- **Automatic Data Fetching**: A GitHub Actions workflow (see [`.github/workflows/scheduled-update.yml`](./.github/workflows/scheduled-update.yml)) runs the `download.js` Deno script on an hourly schedule. This script fetches the latest tide data for all registered stations.
- **Data Storage**: The raw JSON data from JMA is archived in the `data/` directory, organized by year/month and station code. The file structure is `data/YYYYMM/STATION_ID/tide_obs_YYYYMMDD_STATION_ID.json`.
- **Visualization**: The [`index.html`](https://code4fukui.github.io/tidelevel/) page uses [ApexCharts.js](https://apexcharts.com/) to create an interactive line chart of the downloaded data.

## Data

- **Source**: [気象庁｜潮位観測情報 (JMA Tide Observation Information)](https://www.jma.go.jp/bosai/tidelevel/)
- **Stations**: A list of observation stations is available in [`stations.csv`](./stations.csv).

## Usage (For Developers)

This project uses [Deno](https://deno.land/) as its JavaScript runtime.

### Manual Data Download

To fetch the latest data for today and yesterday, run the main download script:
```sh
deno run -A download.js
```

### Download for a Specific Day or Station

You can use `download-cmd.js` to fetch data for a specific day or a single station.

**Download data for all stations on a specific day (YYYYMMDD):**
```sh
deno run -A download-cmd.js 20240101
```

**Download data for a specific station on a specific day:**
```sh
deno run -A download-cmd.js 20240101 145602
```

## Attribution

- **Data**: [気象庁 (Japan Meteorological Agency)](https://www.jma.go.jp/jma/index.html)
- **Application**: [Code for Fukui](https://github.com/code4fukui)