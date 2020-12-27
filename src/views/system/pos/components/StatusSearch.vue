<template>
  <search-container can-fold>
    <search-container-item>
      <el-input v-model="machineName" placeholder="设备名称" size="small" style="width: 100%"></el-input>
    </search-container-item>
    <search-container-item>
      <el-select v-model="departmentValue" placeholder="授权部门" size="small" style="width: 100%">
        <el-option v-for="item in department" :key="item.id" :label="item.name" :value="item.id"></el-option>
      </el-select>
    </search-container-item>
    <search-container-item>
      <el-select v-model="stateValue" placeholder="授权状态" size="small" style="width: 100%">
        <el-option v-for="item in states" :key="item.id" :label="item.name" :value="item.id"></el-option>
      </el-select>
    </search-container-item>
  </search-container>
</template>

<script>
import SearchContainer from "@/components/SearchContainer";
import SearchContainerItem from "@/components/SearchContainerItem";

export default {
  name: "StatusSearch",
  components: {
    SearchContainer,
    SearchContainerItem
  },
  data() {
    return {
      ticketId: "", //小票ID
      department: [
        {
          id: 1,
          name: "部门1"
        },
        {
          id: 2,
          name: "部门2"
        },
        {
          id: 3,
          name: "部门3"
        }
      ],
      states: [
        {
          id: 1,
          name: "已启用"
        },
        {
          id: 2,
          name: "已停用"
        }
      ],
      machineName:'',
      departmentValue:'',
      stateValue: ''
    };
  },
  mounted() {},
  methods: {}
};
</script>
<style lang="scss" scoped>
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}

.el-date-editor--daterange.el-input,
.el-date-editor--daterange.el-input__inner,
.el-date-editor--timerange.el-input,
.el-date-editor--timerange.el-input__inner {
  width: 100%;
}
</style>
