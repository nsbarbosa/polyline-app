<template>
  <div v-show="store.result" id="chart" style="height: 500px;"></div>
</template>
  
<script lang="ts">
import Plotly from "plotly.js-dist";
import { usePolylineStore } from "@/stores/polylineStore";
import type { Trace } from "@/interfaces/ChartTrace";
import type { Point } from "@/interfaces/Point"; 
import type { Layout } from "@/interfaces/ChartLayout";

  export default {
    name: "PolylinePlot",
    setup() {
      const store = usePolylineStore();
  
      const drawChart = () => {
        const polylineData = store.chartCoordinates;
        const point: Point = store.result?.inputPoint || { x: 0, y: 0 };
        const projectedPoint: Point = store.result?.coordinates || { x: 0, y: 0 };
  
        const polylineTrace: Trace = {
          x: polylineData.x,
          y: polylineData.y,
          mode: "lines+markers",
          name: "Polyline",
          line: { color: "blue", width: 2 },
          marker: { color: "blue", size: 5 },
        };
  
        const pointTrace: Trace = {
          x: [point.x],
          y: [point.y],
          mode: "markers",
          marker: { color: "red", size: 10 },
          name: "Input point",
        };

        const projectedPointTrace: Trace = {
          x: [projectedPoint.x],
          y: [projectedPoint.y],
          mode: "markers",
          marker: { color: "green", size: 10 },
          name: "Projected point",
        };
  
        const offsetTrace: Trace = {
          x: [projectedPoint.x, point.x],
          y: [projectedPoint.y, point.y],
          mode: "lines",
          name: "Offset",
          line: { color: "yellow", width: 2 },
        };
  
        const layout: Layout = {
          title: "Polyline visualization",
          xaxis: { title: "X coordinate" },
          yaxis: { title: "Y coordinate", scaleanchor: "x" },
          showlegend: true,
          annotations: [
            {
              x: polylineData.x[0],
              y: polylineData.y[0],
              xref: "x",
              yref: "y",
              text: "Start",
              showarrow: true,
              arrowhead: 1,
            },
            {
              x: polylineData.x[polylineData.x.length - 1],
              y: polylineData.y[polylineData.y.length - 1],
              xref: "x",
              yref: "y",
              text: "End",
              showarrow: true,
              arrowhead: 1,
            },
          ],
        };
  
        Plotly.newPlot("chart", [polylineTrace, pointTrace, projectedPointTrace, offsetTrace], layout)
        .then(() => {
          Plotly.Plots.resize("chart");
        });;
      };
  
      watch(
        () => store.result,
        () => {
          drawChart();
        }
      );
  
      onMounted(
        drawChart
      );
  
      return {
        store,
      };
    },
  };
</script>
<style scoped>
</style>
  