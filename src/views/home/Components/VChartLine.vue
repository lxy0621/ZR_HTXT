<template>
  <div>
    <ve-line :data="idata" :settings="settings" :tooltip="tooltip" :legend="legend" :grid="grid"></ve-line>
  </div>
</template>
<script>
  export default {
    name: "v-charts-line",
    props: {
      idata: {
        type: [Object, Array],
        default() {
          return {};
        }
      },
      settings: {
        type: [Object, Array],
        default() {
          return {};
        },
      },
      tooltip: {
        type: [Object, Array],
        default() {
          return {};
        }
      },
      legend: {
        type: [Object, Array],
        default() {
          return {
            left: "center",
            top: "bottom"
          };
        }
      },
      grid: {
        type: [Object, Array],
        default() {
          return {
            left: "2%",
            right: "2%",
            bottom: "8%",
            top: "6%",
            containLabel: true
          };
        }
      },
      titlecontent: {
        type: Object,
        default() {
          return {};
        }
      },
    },
    methods: {}
  };
</script>
