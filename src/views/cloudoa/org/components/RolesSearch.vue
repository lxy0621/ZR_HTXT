<template>
  <search-container
    @search="handleDataSearch"
    @reset="handleAllReset"
    can-fold
  >
    <search-container-item>
      <el-input
        v-model="queryParams.name"
        placeholder="角色名称"
        size="small"
      />
    </search-container-item>
    <search-container-item>
      <el-input
        v-model="queryParams.code"
        placeholder="角色编码"
        size="small"
      />
    </search-container-item>
    <search-container-item>
      <el-select v-model="queryParams.enabled" placeholder="角色状态" size="small" style="width: 100%">
        <el-option
          v-for="item in roleState"
          :key="item.value"
          :label="item.key"
          :value="item.value">
        </el-option>
      </el-select>
    </search-container-item>
    <search-container-item>
      <el-select v-model="queryParams.type" placeholder="角色类型" size="small" style="width: 100%">
        <el-option
          v-for="item in roleType"
          :key="item.value"
          :label="item.key"
          :value="item.value">
        </el-option>
      </el-select>
    </search-container-item>
  </search-container>
</template>

<script>
  import SearchContainer from '@/components/SearchContainer';
  import SearchContainerItem from '@/components/SearchContainerItem';
  import {CommonService} from "@/service/common/CommonService";

  const getDefaultQueryParams = () => ({
    name: '',
    code: '',
    enabled: '',
    type: '',
  });

  export default {
    name: 'RolesSearch',
    components: {
      SearchContainer,
      SearchContainerItem,
    },
    data() {
      return {
        queryParams: getDefaultQueryParams(),
        roleState: [],
        roleType: []
      };
    },
    mounted() {
      this.initSelectData();
    },
    methods: {
      initSelectData() {
        const param = [{
          enumKey: "roleState",
          enumValue: "EnumRoleState",
        }, {
          enumKey: "roleType",
          enumValue: "EnumRoleType",
        }];
        const that = this;
        new CommonService().findEnumIncludeAll('system', param).then(response => {
          that.roleState = response.roleState;
          that.roleType = response.roleType;
        })
      },
      handleDataSearch() {
        const queryParams = Object.assign({}, this.queryParams);
        this.$emit('search', queryParams);
      },
      handleAllReset() {
        const queryParams = getDefaultQueryParams();
        this.queryParams = queryParams;
        this.filterTags = [];
        this.$emit('reset', queryParams);
        this.handleDataSearch();
      },
    }
  };
</script>
<style lang="scss">
  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }
</style>
