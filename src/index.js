import Gauge from "./Gauge.vue";
import Line from "./Line.vue";

export default {
  install (Vue) {
    Vue.component("ch-gauge", Gauge);
    Vue.component("ch-line", Line);
  },
};
