<template>
  <div>
    <el-card>
      <tags-search @search="searchMarketCollectRecordList" @reset="resetAllParamsAndData" ref="search"/>
      <div class="opration-btn">
        <div>
          <button type="button" v-waves class="el-button el-button--primary el-button--small" @click="handleAdd">添加标签
          </button>
          <button type="button" v-waves class="el-button el-button--danger el-button--small" @click="batchDelete">
            删除标签
          </button>
        </div>
      </div>
      <tags-table ref="table"></tags-table>
    </el-card>
  </div>
</template>

<script>
  import TagsSearch from './components/TagsSearch';
  import TagsTable from './components/TagsTable';
  import {TagGroupsService} from '@/service/system/tag/TagGroupsService';

  export default {
    name: 'Tags',
    components: {
      TagsSearch,
      TagsTable
    },
    data() {
      return {
        queryParams: {},
        groupService: null
      };
    },
    mounted() {
      this.groupService = new TagGroupsService();
      this.findAllGroups();
    },
    methods: {
      findAllGroups() {
        this.groupService.findAllGroups().then(response => {
          this.$refs.table.groupList = response;
          this.$refs.search.groupList = response;
        })
      },
      searchMarketCollectRecordList(queryParams) {
        this.$refs.table.getList(queryParams);
      },
      resetAllParamsAndData() {
        this.queryParams = {};
        this.$refs.table.getList(this.queryParams);
      },
      handleAdd(dialogtitle) {
        this.$refs.table.form = {};
        this.$refs.table.handleEdit(undefined, 'add');
      },
      batchDelete() {
        this.$refs.table.batchDelete();
      }
    }
  };
</script>

<style lang="scss">
  .opration-btn {
    margin: 10px 0px;
    display: flex;
    justify-content: space-between;
  }
</style>
