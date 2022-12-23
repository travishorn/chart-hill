<script setup>
import { onMounted, watch } from "vue";
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
    default: "#106cde",
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
let guideBar;
let valueBar;
let labelMin;
let labelMax;
let labelValue;

const valueArc = arc()
  .innerRadius(height - fontSize - barWidth)
  .outerRadius(height - fontSize - 10)
  .startAngle(scale(0))
  .endAngle(() => {
    const pct = (props.value - props.min) / (props.max - props.min);
    if (pct < 0) return scale(0);
    if (pct > 1) return scale(1);
    return scale(pct);
  });

onMounted(() => {
  chart = select(`#${chartId}`);

  valueBar = chart.selectAll("path.valueBar")
    .data([props.value])
    .join("path")
      .attr("class", "valueBar")
      .attr("transform", `translate(${width / 2}, ${height - fontSize})`)
      .attr("fill", props.barColor);

  labelMin = chart.selectAll("text.label-min")
    .data([props.min])
    .join("text")
      .attr("class", "label-min")
      .attr("text-anchor", "middle")
      .attr("font-family", "sans-serif")
      .attr("font-size", fontSize)
      .attr("fill", "currentColor")
      .attr(
        "transform",
        `translate(${barWidth / 2 + fontSize} ${height - 5})`
      );

  labelMax = chart.selectAll("text.label-max")
    .data([props.max])
    .join("text")
      .attr("class", "label-max")
      .attr("text-anchor", "middle")
      .attr("font-family", "sans-serif")
      .attr("font-size", fontSize)
      .attr("fill", "currentColor")
      .attr(
        "transform",
        `translate(${width - (barWidth / 2 + fontSize)} ${height - 5})`
      );

  labelValue = chart.selectAll("text.label-value")
    .data([props.value])
    .join("text")
      .attr("class", "label-value")
      .attr("text-anchor", "middle")
      .attr("font-family", "sans-serif")
      .attr("font-size", fontSize * 3)
      .attr("fill", "currentColor")
      .attr("transform", `translate(${width / 2} ${height / 2 + barWidth})`);

  guideBar = chart.selectAll("path.guideBar")
    .data([props.max])
    .join("path")
      .attr("class", "guideBar")
      .attr("d", arc()
        .innerRadius(height - fontSize - 5)
        .outerRadius(height - fontSize)
        .startAngle(scale(0))
        .endAngle(scale(1))
      )
      .attr("transform", `translate(${width / 2}, ${height - fontSize})`);

  guideBar.attr("fill", props.barColor);
  valueBar.attr("fill", props.barColor);
  valueBar.attr("d", valueArc);
  labelMin.text(props.min);
  labelMax.text(props.max);
  labelValue.text(props.value);
});

watch(() => props.barColor, () => {
  guideBar.attr("fill", props.barColor);
  valueBar.attr("fill", props.barColor);
});

watch(() => props.value, () => {
  valueBar.attr("d", valueArc);
  labelValue.text(props.value);
});

watch(() => props.min, () => {
  valueBar.attr("d", valueArc);
  labelMin.text(props.min);
});

watch(() => props.max, () => {
  valueBar.attr("d", valueArc);
  labelMax.text(props.max);
});
</script>

<template>
  <svg :id="chartId" :viewBox="`0 0 ${width} ${height}`"></svg>
</template>
