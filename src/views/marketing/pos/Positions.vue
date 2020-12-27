<template>
  <div class="container-position">
    <el-card class="container">
      <el-card class="search">
        <el-row :gutter="6">
          <el-col :span="6">
            <el-input placeholder="请输入内容" size="small" prefix-icon="el-icon-search" v-model="input"></el-input>
          </el-col>
          <el-col :span="6">
            <el-select class="search-value" size="small" v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-col>
          <el-col :span="5">
            <el-select class="search-value" size="small" v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-col>
          <el-col :span="6">
            <div class="block">
              <el-date-picker
                size="small"
                v-model="date"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              ></el-date-picker>
            </div>
          </el-col>
        </el-row>
        <el-row class="search-button">
          <el-button type="primary" style="float:left" size="small">查询</el-button>
        </el-row>
      </el-card>
      <el-row>
        <search-btn-group></search-btn-group>
      </el-row>
      <el-row>
        <el-button type="primary" size="small" style="float:left;margin:10px 0 10px 0">添加</el-button>
      </el-row>
      <table-components></table-components>
    </el-card>
  </div>
</template>

<script>
import SearchBtnGroup from "./components/SearchBtnGroup";
import tableComponents from "./components/Table";
export default {
  name: "Positions",
  components: {
    SearchBtnGroup,
    tableComponents
  },
  data() {
    return {
      search: "",
      input: "",
      date: "",
      options: [
        {
          value: "1",
          label: "num1"
        },
        {
          value: "2",
          label: "num2"
        }
      ]
    };
  }
};
</script>

<style scoped>
.container {
  margin: 10px;
}

.search-value {
  width: 100%;
}
.search-button {
  margin-top: 10px;
}
.el-button {
  width: 80px;
  height: 32px;
  text-align: center;
}
</style>
