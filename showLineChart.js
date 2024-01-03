import ApexCharts from "https://code4fukui.github.io/apexcharts.js/ApexCharts.js";
import { annotations } from "./annotations.js";
import { DateTime } from "https://js.sabae.cc/DateTime.js";

export const showLineChart = (divlinechart, series, height = 350) => {
  const options = {
    series,
    annotations,
    chart: {
      height,
      type: "line",
      toolbar: {
        show: true
      },
      animations: {
        enabled: false,
      },
    },
    //colors: ['#77B6EA', '#545454'],
    /*
    dataLabels: {
      enabled: true,
    },
    */
    stroke: {
      width: 2,
      curve: "straight",
    },
    /*
    title: {
      text: title || "",
      align: "center",
    },
    */
    /*
    grid: {
      borderColor: '#e7e7e7',
      row: {
        colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
        opacity: 0.5
      },
    },
    */
    /*
    markers: {
      size: 1
    },
    */
    /*
    xaxis: {
      categories: months.map(i => Math.floor(i / 100) + "/" + i % 100),
      title: {
        text: 'Month'
      }
    },
    */
    xaxis: {
      type: 'datetime',
      labels: {
        datetimeUTC: false,
        datetimeFormatter: {
          year: 'yyyy',
          month: 'yyyy/M',
          day: 'M/d',
          hour: 'HH:mm',
        }
      }
    },
    /*
    yaxis: {
      title: {
        text: 'Temperature'
      },
      min: 5,
      max: 40
    },
    */
    legend: {
      position: "top",
      horizontalAlign: "center",
      showForSingleSeries: true,
      //offsetY: -25,
      //offsetX: -5
    },
    tooltip: {
      x: {
        formatter: val => {
          return new DateTime(val).toString();
        },
      },
    },
    /*
    tooltip: {
      y: {
        formatter: (v) => {
          return Num.addComma(v) + "人";
        },
      }
    },
    */
  };

  const chart = new ApexCharts(divlinechart, options);
  chart.render();
  return chart;
};
