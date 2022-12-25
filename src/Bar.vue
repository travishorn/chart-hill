<script setup>
import { onMounted, toRefs, watch } from "vue";
import { max } from "d3-array";
import { axisLeft } from "d3-axis";
import { select } from "d3-selection";
import { scaleBand, scaleLinear, scaleOrdinal } from "d3-scale";
import { schemeCategory10 } from "d3-scale-chromatic";

const props = defineProps({
  data: {
    type: Array,
    default: [],
  },
});

const chartId = `chart-${crypto.randomUUID()}`;
const width = 1000;
const height = 500;
const margin = { top: 0, right: 100, bottom: 0, left: 250 };
const fontSize = 40;

const xScale = scaleLinear()
  .range([0, width - margin.left - margin.right])
  .domain([0, max(props.data, d => d.value)]);
  
const yScale = scaleBand()
  .range([0, height - margin.top - margin.bottom])
  .domain(props.data.map(d => d.label))
  .padding(0.4);

const color = scaleOrdinal()
  .range(schemeCategory10)
  .domain(props.data.map(d => d.label));

let chart;
let bars;
let valueLabels;
let yAxis;

onMounted(() => {
  chart = select(`#${chartId}`);

  bars = chart.selectAll('.value')
    .data(props.data)
    .join('rect')
    .attr('class', 'value')
    .attr('fill', d => color(d.label))
    .attr('height', yScale.bandwidth())
    .attr('width', d => xScale(d.value))
    .attr('x', margin.left + 1)
    .attr('y', d => yScale(d.label) + margin.top);

  valueLabels = chart.selectAll('.valueLabel')
    .data(props.data)
    .join('text')
    .text(d => d.value)
    .attr("class", "valueLabel")
    .attr('font-size', fontSize * 0.75)
    .attr('x', d => xScale(d.value) + margin.left + 5)
    .attr('y', d => yScale(d.label) + margin.top + (yScale.bandwidth() / 2))
    .attr('dy', fontSize * 0.75 / 2 - 6);

  yAxis = chart.append('g')
    .call(axisLeft(yScale))
    .attr('transform', `translate(${margin.left}, ${margin.top})`)
    .call(c => c.selectAll(".tick line").remove())
    .call(c => c.select("path").remove())
    .call(c => c.selectAll("text").attr("font-size", fontSize));
});

watch(() => props.data, () => {
  xScale.domain([0, max(props.data, d => d.value)]);
  yScale.domain(props.data.map(d => d.label));

  bars
    .data(props.data)
    .join('rect')
    .attr('class', 'value')
    .attr('fill', d => color(d.label))
    .attr('height', yScale.bandwidth())
    .attr('width', d => xScale(d.value))
    .attr('x', margin.left + 1)
    .attr('y', d => yScale(d.label) + margin.top);

  valueLabels
    .data(props.data)
    .join('text')
    .text(d => d.value)
    .attr("class", "valueLabel")
    .attr('font-size', fontSize * 0.75)
    .attr('x', d => xScale(d.value) + margin.left + 5)
    .attr('y', d => yScale(d.label) + margin.top + (yScale.bandwidth() / 2))
    .attr('dy', fontSize * 0.75 / 2 - 6);

  yAxis
    .call(axisLeft(yScale))
    .call(c => c.selectAll(".tick line").remove())
    .call(c => c.select("path").remove())
    .call(c => c.selectAll("text").attr("font-size", fontSize));
});
</script>

<template>
  <svg :id="chartId" :viewBox="`0 0 ${width} ${height}`"></svg>
</template>
