<template>
  <el-button
    plain
    v-waves
    size="small"
    class="dashboard-round-button"
    @click="clickHandler"
  >
    <!--圆角按钮-->
    <i
      v-if="hasInfo"
      class="el-icon-information"
    ></i>
    <slot></slot>
  </el-button>
</template>

<script>
export default {
  name: "dashboard-round-button",
  props: {
    hasInfo: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {};
  },
  methods: {
    clickHandler(e) {
      this.$emit("click", e);
    }
  }
};
</script>

<style lang="scss">
.dashboard-round-button {
  padding: 7px 22px;
  font-size: 14px;
  color: #1e9fff;
  border: 1px solid #1e9fff;
}
</style>
