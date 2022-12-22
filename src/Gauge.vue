<script setup>
import { onMounted, watch } from "vue";
import { min, max } from "d3-array";
import { scaleLinear } from "d3-scale";
import { select } from "d3-selection";
import { arc } from "d3-shape";

const props = defineProps({
  min: {
    type: Number,
    default: 0,
  },
  max: {
    type: Number,
    default: 100,
  },
  value: {
    type: Number,
    default: 0,
  },
  barColor: {
    type: String,
    default: "mediumseagreen",
  }
});

const degToRad = deg => deg / (180 / Math.PI);

const chartId = `chart-${crypto.randomUUID()}`;
const width = 1000;
const height = 500;
const barWidth = height * 0.33;
const fontSize = 50;
const scale = scaleLinear([degToRad(-90), degToRad(90)]);
let chart;

const update = () => {
  chart.selectAll("path.valueBar")
    .data([props.value])
    .join("path")
      .attr("class", "valueBar")
      .attr("d", arc()
        .innerRadius(height - fontSize - barWidth)
        .outerRadius(height - fontSize - 10)
        .startAngle(scale(0))
        .endAngle(scale(max([min([(props.value - props.min) / (props.max - props.min), 1]), 0])))
      )
      .attr("transform", `translate(${width / 2}, ${height - fontSize})`)
      .attr("fill", props.barColor);
  
  chart.selectAll("path.maxBar")
    .data([props.max])
    .join("path")
      .attr("class", "maxBar")
      .attr("d", arc()
        .innerRadius(height - fontSize - 5)
        .outerRadius(height - fontSize)
        .startAngle(scale(0))
        .endAngle(scale(1))
      )
      .attr("transform", `translate(${width / 2}, ${height - fontSize})`)
      .attr("fill", props.barColor);

  chart.selectAll("text.label-min")
    .data([props.min])
    .join("text")
      .attr("class", "label-min")
      .text(d => d)
      .attr("text-anchor", "middle")
      .attr("font-family", "sans-serif")
      .attr("font-size", fontSize)
      .attr("fill", "currentColor")
      .attr("transform", `translate(${barWidth / 2 + fontSize} ${height - 5})`);

  chart.selectAll("text.label-max")
    .data([props.max])
    .join("text")
      .attr("class", "label-max")
      .text(d => d)
      .attr("text-anchor", "middle")
      .attr("font-family", "sans-serif")
      .attr("font-size", fontSize)
      .attr("fill", "currentColor")
      .attr("transform", `translate(${width - (barWidth / 2 + fontSize)} ${height - 5})`);

  chart.selectAll("text.label-value")
    .data([props.value])
    .join("text")
      .attr("class", "label-value")
      .text(d => d)
      .attr("text-anchor", "middle")
      .attr("font-family", "sans-serif")
      .attr("font-size", fontSize * 3)
      .attr("fill", "currentColor")
      .attr("transform", `translate(${width / 2} ${height / 2 + barWidth})`);
};

onMounted(() => {
  chart = select(`#${chartId}`);
  update();
});

watch(() => [props.min, props.max, props.value, props.barColor], () =>{
  update();
});
</script>

<template>
  <svg :id="chartId" :viewBox="`0 0 ${width} ${height}`"></svg>
</template>
