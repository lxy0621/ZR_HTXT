<template>
  <div class="container-modules">
    <el-card class="container">
      <el-card class="search">
        <el-row :gutter="6">
          <el-col :span="6">
            <el-input placeholder="活动名称" size="small" prefix-icon="el-icon-search" v-model="input"></el-input>
          </el-col>
          <el-col :span="5">
            <el-select class="search-value" size="small" v-model="options" placeholder="推荐位">
              <el-option
                v-for="item in option"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-col>
          <el-col :span="6">
            <el-select class="search-value" size="small" v-model="states" placeholder="可用状态">
              <el-option
                v-for="item in state"
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
          <el-button type="primary" style="float:left" size="small">搜索</el-button>
        </el-row>
      </el-card>
      <modules-table></modules-table>
    </el-card>
  </div>
</template>

<script>
import modulesTable from "./components/ModulesTable";
export default {
  name: "Modules",
  components: {
    modulesTable
  },
  data() {
    return {
      search: "",
      input: "",
      date: "",
      states:"",
      state: [
        {
          value: "1",
          label: "已启用"
        },
        {
          value: "2",
          label: "已停用"
        }
      ],
      options:"",
      option: [
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
.search {
  margin-bottom: 10px;
}
.search-value {
  width: 100%;
}
.search-button {
  margin-top: 10px;
}
.static {
  margin-top: 10px;
}
.el-button {
  width: 80px;
  height: 32px;
  text-align: center;
}
</style>
