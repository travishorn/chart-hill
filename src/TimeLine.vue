<script setup>
import { onMounted, watch } from "vue";
import { extent, max, ticks } from "d3-array";
import { axisBottom, axisLeft } from "d3-axis";
import { select } from "d3-selection";
import { line } from "d3-shape";
import { scaleLinear, scaleTime } from "d3-scale";
import { schemeCategory10 } from "d3-scale-chromatic";

const props = defineProps({
  data: {
    type: Array,
    default: [],
  },
  lineColor: {
    type: String,
    default: schemeCategory10[0],
  }
});

const chartId = `chart-${crypto.randomUUID()}`;
const width = 1000;
const height = 500;
const margin = { top: 20, right: 60, bottom: 60, left: 130 };
const fontSize = 40;

const xScale = scaleTime()
  .range([0, width - margin.left - margin.right])
  .domain(extent(props.data, d => d.date))
  .nice();

const yScale = scaleLinear()
    .range([height - margin.top - margin.bottom, 0])
    .domain([0, max(props.data, d => d.value)]);

let chart;
let valueLine;
let xAxis;
let yAxis;

const lineGenerator = line()
  .x(d => xScale(d.date) + margin.left)
  .y(d => yScale(d.value) + margin.top);

onMounted(() => {
  chart = select(`#${chartId}`);

  valueLine = chart.append("path")
    .datum(props.data)
    .attr("class", "valueLine")
    .attr("fill", "none")
    .attr("stroke", props.lineColor)
    .attr("stroke-width", fontSize / 4)
    .attr("stroke-linecap", "round")
    .attr("d", lineGenerator);

  xAxis = chart.append("g")
    .attr(
      "transform",
      `translate(${margin.left}, ${height - margin.bottom + fontSize / 2})`
    )
    .call(axisBottom(xScale).ticks(4))
    .call(c => c.selectAll(".tick line").remove())
    .call(c => c.select("path").remove())
    .call(c => c.selectAll("text").attr("font-size", fontSize));

  yAxis = chart.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`)
    .call(axisLeft(yScale)
      .ticks(4)
      .tickSize(-width + margin.left + margin.right)
    )
    .call(c => c.selectAll(".tick line").attr("opacity", 0.2))
    .call(c => c.select("path").remove())
    .call(c => c.selectAll("text").attr("font-size", fontSize));
});

watch(() => props.lineColor, () => {
  valueLine.attr("stroke", props.lineColor);
});

watch(() => props.data, () => {
  xScale.domain(extent(props.data, d => d.date))
  yScale.domain([0, max(props.data, d => d.value)]);

  xAxis.call(axisBottom(xScale).ticks(4))
    .call(c => c.selectAll(".tick line").remove())
    .call(c => c.select("path").remove())
    .call(c => c.selectAll("text").attr("font-size", fontSize));

  yAxis.call(axisLeft(yScale)
    .ticks(4)
    .tickSize(-width + margin.left + margin.right)
  )
    .call(c => c.selectAll(".tick line").attr("opacity", 0.2))
    .call(c => c.select("path").remove())
    .call(c => c.selectAll("text").attr("font-size", fontSize));

  valueLine
    .datum(props.data)
    .attr("d", lineGenerator);
});
</script>

<template>
  <svg :id="chartId" :viewBox="`0 0 ${width} ${height}`"></svg>
</template>
