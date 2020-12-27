<template>
  <transition name="fade">
    <div class="search-container-item" v-show="visible">
      <slot></slot>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    folded: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      visible: !this.folded //如果this.folded为true，说明该组件是在折叠区域内的，则初始不显示
    };
  },
  methods: {
    show() {
      this.visible = true;
    },
    hide() {
      this.visible = false;
    },
    dispatch(componentName, eventName, params) {
      let parent = this.$parent || this.$root;
      let name = parent.$options.componentName;

      while (parent && (!name || name !== componentName)) {
        parent = parent.$parent;

        if (parent) {
          name = parent.$options.componentName;
        }
      }
      if (parent) {
        parent.$emit.apply(parent, [eventName].concat(params));
      }
    }
  },
  mounted() {
    const searchItem = {
      show: this.show,
      hide: this.hide,
      folded: this.folded
    };
    this.dispatch('SearchContainer', 'add-item', [searchItem]);
  }
};
</script>

<style lang="scss">
.search-container-item {
  font-size: 13px;
  display: inline-block;
  vertical-align: middle;
  width: 25%;
  padding: 5px 10px 5px 0px;
  box-sizing: border-box;
}
</style>
