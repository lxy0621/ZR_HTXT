<template>
  <div class="search-container">
    <el-card>
      <div class="search-card-header">
        <i :class="icon"></i>
        {{ title }}
        <div
          class="filter-tag"
          v-for="tag in siftedFilterTags"
          :key="tag.key"
        >
          {{ tag.label }}
          <i
            class="fa fa-close"
            aria-hidden="true"
            @click="deleteFilter(tag.key)"
          />
        </div>
      </div>
      <div class="search-container-inner">
        <slot></slot>
        <search-container-item style="min-width: 283px; white-space: nowrap;">
          <el-button
            class="search-btn"
            type="primary"
            size="small"
            v-waves
            @click="search"
          >
            查询
          </el-button>
          <el-button
            class="reset-btn"
            v-if="resetBtn"
            size="small"
            v-waves
            @click="reset"
          >
            重置
          </el-button>

          <template v-if="canFold">
            <el-button
              class="fold-btn"
              v-show="this.fold_state"
              size="small"
              @click="unfold"
            >
              更多筛选
              <i
                class="fa fa-angle-down fold-caret"
                aria-hidden="true"
              />
            </el-button>
            <el-button
              class="fold-btn"
              v-show="!this.fold_state"
              size="small"
              @click="fold"
            >
              收起筛选
              <i
                class="fa fa-angle-up fold-caret"
                aria-hidden="true"
              />
            </el-button>
          </template>
        </search-container-item>
      </div>
    </el-card>
  </div>
</template>

<script>
  import searchContainerItem from "../components/SearchContainerItem.vue";

  export default {
    name: "SearchContainer",
    componentName: "SearchContainer",
    props: {
      title: {
        type: String,
        default: ''
      },
      icon: {
        type: String,
        default: ''
      },
      resetBtn: {
        type: Boolean,
        default: true
      },
      filterTags: {
        type: Array,
        default: () => []
      }
    },
    data() {
      return {
        fold_state: true,
        searchItems: []
      };
    },
    components: {
      searchContainerItem
    },
    computed: {
      canFold() {
        return this.searchItems.some(item => {
          return item.folded;
        });
      },
      siftedFilterTags() {
        return this.filterTags.filter(item => {
          return Boolean(item.label);
        });
      }
    },
    methods: {
      search() {
        this.$emit("search");
      },
      reset() {
        this.$emit("reset");
      },
      fold() {
        this.fold_state = true;
        this.searchItems.forEach(item => {
          if (item.folded) {
            item.hide();
          }
        });
      },
      unfold() {
        this.fold_state = false;
        this.searchItems.forEach(item => {
          if (item.folded) {
            item.show();
          }
        });
      },
      deleteFilter(key) {
        this.$emit("delete-filter", key);
      }
    },
    created() {
      this.$on("add-item", item => {
        this.searchItems.push(item);
        if (!this.fold_state) {
          //有一些在面板展开状态下才初始化的需要手动执行unfold让其显示出来，否则默认是不显示的
          this.unfold();
        }
      });
    }
  };
</script>

<style lang="scss">
  .search-container {
    .search-card-header {
      color: #8492a6;
      padding: 5px 0 5px 0;
      font-weight: 700;

      .filter-tag {
        display: inline-block;
        background-color: #eef1f6;
        font-size: 12px;
        font-weight: normal;
        padding: 5px 0 5px 6px;
        margin: 2px 5px;
        color: #000;

        .fa-close {
          width: 20px;
          height: 8px;
          padding: 0 6px;
          color: #979797;
          cursor: pointer;
        }

        &:hover {
          .fa-close {
            color: #1b97ff;
          }
        }
      }
    }

    .filter-tag-wrap {
      display: inline-block;
      margin-left: 5px;
    }

    .el-row + .el-row {
      margin-top: 5px;
    }

    .el-col {
      line-height: 36px;
    }

    .el-input__inner {
      &::placeholder {
        font-size: 12px;
      }
    }

    .search-container-inner {
      font-size: 0;

      .search-btn,
      .reset-btn {
        padding-left: 27px;
        padding-right: 27px;
      }

      .fold-caret {
        margin-left: 6px;
      }
    }
  }
</style>
