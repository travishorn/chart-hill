import Gauge from "./Gauge.vue";
import TimeLine from "./TimeLine.vue";

export default {
  install (Vue) {
    Vue.component("ch-gauge", Gauge);
    Vue.component("ch-time-line", TimeLine);
  },
};
