<template>
  <div>
    <!--表格内容栏-->
    <el-table
      :header-cell-style="{background:'#eef1f6',color:'#606266'}"
      :data="tableData"
      size="mini"
      border
      ref="multipleTable"
      tooltip-effect="dark"
      style="width: 100%; margin-bottom: 40px;"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="40" style="text-align: center;"></el-table-column>
      <el-table-column prop="action" label="操作" fixed align="center" width="200">
        <template>
          <el-link type="configure" :underline="false" size="small">修改</el-link>&ensp;
          <el-link type="configureList" :underline="false" size="small">停用</el-link>&ensp;
        </template>
      </el-table-column>
      <el-table-column prop="activityname" label="活动名称" width="180" align="center"></el-table-column>
      <el-table-column prop="name" label="推荐位名称" align="center"></el-table-column>
      <el-table-column prop="key" label="key" width="180" align="center"></el-table-column>
      <el-table-column prop="state" label="可用状态" align="center"></el-table-column>
      <el-table-column prop="sort" label="排序" align="center"></el-table-column>
      <el-table-column prop="begintime" label="开始时间" align="center"></el-table-column>
      <el-table-column prop="endtime" label="结束时间" align="center"></el-table-column>
    </el-table>
    <el-pagination
      class="fixed-bottom-page"
      small
      :current-page="currentPage4"
      :page-sizes="[30, 50, 100, 200]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  name: "Table",
  data() {
    return {
      currentPage4: 4,
      tableData: [
        {
          id: "1",
          activityname:"端午活动",
          name: "推荐位1",
          key:"/pages/shouye/invite/invite",
          state: "已启用",
          sort:"1",
          begintime: "2020-06-14",
          endtime: "2020-06-18"
        },
        {
          id: "1",
          activityname:"端午活动",
          name: "推荐位2",
          key:"/pages/shouye/invite/invite",
          state: "已启用",
          sort:"2",
          begintime: "2020-06-14",
          endtime: "2020-06-18"
        }
      ]
    };
  }
};
</script>
<style lang="scss">
</style>
