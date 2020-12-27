<template>
  <div>
    <div class="search-btn-group">
      <div class="search-btn-group-total">
        <p class="search-btn-group-total-num">1837627</p>
        <span class="search-btn-group-total-label">查询结果</span>
      </div>
      <div
        v-for="(searchBtnItem, index) in searchBtnData"
        :key="index"
        class="search-btn-group-con"
      >
        <div
          class="search-btn-group-con-title"
          @click="searchBtnShow=!searchBtnShow"
        >
          <span>{{searchBtnItem.name}}</span>
          <i
            style="padding-top:2px;"
            class="el-icon-arrow-right"
          ></i>
        </div>
        <transition name="drawer-list">
          <div
            class="search-btn-group-type"
            v-show="searchBtnShow"
          >
            <div
              v-for="(searchTypeItem, key) in searchBtnItem.children"
              :key="key"
              class="search-btn-group-type-block"
            >
              <p class="search-btn-group-type-num">{{searchTypeItem.childNum}}</p>
              <span class="search-btn-group-type-label">{{searchTypeItem.childName}}</span>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SearchBtnGroup",
  data() {
    return {
      searchBtnShow: true,
      searchBtnData: [
        {
          name: "可用状态",
          children: [
            {
              childName: "已启用",
              childNum: "17"
            },
            {
              childName: "已停用",
              childNum: "172"
            }
          ]
        }
      ]
    };
  },
  methods: {}
};
</script>
<style lang="scss">
.search-btn-group {
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-flex-wrap: wrap;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  text-align: center;
  margin: 10px 0 5px;
  height: 54px;
}
.search-btn-group-total {
  padding: 9px 16px;
  background-color: #409eff;
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  -moz-box-orient: vertical;
  -moz-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -moz-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  cursor: pointer;
  .search-btn-group-total-num {
    color: #ffffff;
    margin: 1px;
    font-weight: 700;
    font-size: 12px;
  }
  .search-btn-group-total-label {
    color: #ffffff;
    margin: 1px;
    font-size: 12px;
  }
}
.search-btn-group-con {
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  margin-left: 16px;
  -webkit-box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.15);
  -moz-box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.15);
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.15);
  .search-btn-group-con-title {
    padding: 9px 16px;
    color: #161616;
    background-color: #eef1f6;
    display: -webkit-box;
    display: -webkit-flex;
    display: -moz-box;
    display: -ms-flexbox;
    display: flex;
    align-items: middle;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -moz-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    -moz-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    cursor: pointer;
    max-width: 100px;
    position: relative;
  }
  .search-btn-group-type {
    display: -webkit-box;
    display: -webkit-flex;
    display: -moz-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-flex-wrap: nowrap;
    -ms-flex-wrap: nowrap;
    flex-wrap: nowrap;
    overflow: hidden;
    max-width: 800px;
    .search-btn-group-type-block {
      display: -webkit-box;
      display: -webkit-flex;
      display: -moz-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-orient: vertical;
      -webkit-box-direction: normal;
      -webkit-flex-direction: column;
      -moz-box-orient: vertical;
      -moz-box-direction: normal;
      -ms-flex-direction: column;
      flex-direction: column;
      -webkit-box-pack: center;
      -webkit-justify-content: center;
      -moz-box-pack: center;
      -ms-flex-pack: center;
      justify-content: center;
      padding: 9px 16px;
      background-color: #ffffff;
      border: 1px solid #eef1f6;
      cursor: pointer;
      -webkit-box-flex: 0;
      -webkit-flex: 0 0 auto;
      -moz-box-flex: 0;
      -ms-flex: 0 0 auto;
      flex: 0 0 auto;
      .search-btn-group-type-num {
        color: #409eff;
        margin: 1px;
        font-weight: 700;
        font-size: 12px;
      }
      .search-btn-group-type-label {
        margin: 1px;
        font-size: 12px;
        color: #161616;
      }
    }
  }
}
</style>
