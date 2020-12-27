<template>
  <div class="dashboard-data-block">
    <!--数据块-->
    <div v-if="isTruly(title)" :style="titleStyle" class="dashboard-data-block__top">{{ title }}</div>
    <div v-if="isTruly(content)" :style="contentStyle" class="dashboard-data-block__middle">
      <span v-if="isTruly(contentPrepend)" class="dashboard-data-block__middle--prepend">{{ contentPrepend }}</span>
      <span v-if="isTruly(content)" class="dashboard-data-block__middle--inner">{{ content }}</span>
      <span v-if="isTruly(contentAppend)" class="dashboard-data-block__middle--append">{{ contentAppend }}</span>
    </div>
    <slot v-else name="content" />
    <div class="dashboard-data-block__bottom" style="line-height:24px;height:48px;">
      <div v-if="isTruly(footer)" :style="footerStyle">{{ footer }}</div>
      <div v-if="isTruly(footer2)" :style="footerStyle">{{ footer2 }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "dashboard-data-block",
  props: {
    title: {
      type: String,
      default: ""
    },
    titleStyle: {
      type: Object,
      default() {
        return {};
      }
    },
    content: {
      type: [String, Number],
      default: "0.00"
    },
    contentPrepend: {
      type: String,
      default: "￥"
    },
    contentAppend: {
      type: String,
      default: "万"
    },
    contentStyle: {
      type: Object,
      default() {
        return {};
      }
    },
    footer: {
      type: String,
      default: ""
    },
    footer2: {
      type: String,
      default: ""
    },
    footerStyle: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  methods: {
    isTruly(val) {
      return val !== undefined && val !== null && val !== "";
    }
  }
};
</script>

<style lang="scss">
.dashboard-data-block {
  text-align: center;
  .dashboard-data-block__top {
    margin: 11px 0;
    font-size: 18px;
  }
  .dashboard-data-block__middle {
    font-size: 0;
    font-weight: 500;
    .dashboard-data-block__middle--prepend,
    .dashboard-data-block__middle--append {
      font-size: 18px;
      font-weight: 700;
      line-height: 32px;
      vertical-align: middle;
    }
    .dashboard-data-block__middle--inner {
      font-size: 32px;
      vertical-align: middle;
    }
  }
  .dashboard-data-block__bottom {
    padding: 8px 0;
    font-size: 14px;
    color: #666;
  }
}
</style>
