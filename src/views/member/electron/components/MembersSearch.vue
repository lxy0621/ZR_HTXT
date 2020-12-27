<template>
  <search-container @search="handleDataSearch" @reset="handleAllReset" can-fold>
    <search-container-item>
      <el-input v-model="queryParams.nicknameOrMobile" placeholder="会员昵称/手机号" size="small" />
    </search-container-item>
    <search-container-item>
      <el-select v-model="queryParams.sourceInForm" placeholder="会员来源渠道" size="small" style="width:100%;">
        <el-option label="全部" value=""></el-option>
        <el-option v-for="item in memberSource" :key="item.value" :label="item.key" :value="item.value"></el-option>
      </el-select>
    </search-container-item>
    <search-container-item>
      <el-select v-model="queryParams.typeInForm" placeholder="会员类型" size="small" style="width:100%;">
        <el-option label="全部" value=""></el-option>
        <el-option v-for="item in memberType" :key="item.value" :label="item.key" :value="item.value"></el-option>
      </el-select>
    </search-container-item>
    <search-container-item>
      <el-select v-model="queryParams.svipInForm" placeholder="是否SVIP" size="small" style="width:100%;">
        <el-option label="全部" value=""></el-option>
        <el-option v-for="item in memberSVIP" :key="item.value" :label="item.key" :value="item.value"></el-option>
      </el-select>
    </search-container-item>
    <search-container-item folded>
      <el-row :gutter="5">
        <el-col :span="6">
          <el-select v-model="queryParams.memberSearchDateType" placeholder="时间类型" size="small" style="width:100%;">
            <el-option v-for="item in memberSearchDateType" :key="item.value" :label="item.key" :value="item.value"></el-option>
          </el-select>
        </el-col>
        <el-col :span="18">
          <el-date-picker v-model="dateRange" size="small" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" style="width:100%;" format="yyyy-MM-dd"
                          value-format="yyyy-MM-dd"></el-date-picker>
        </el-col>
      </el-row>
    </search-container-item>
    <search-container-item folded>
      <el-select v-model="queryParams.tagIds" placeholder="用户标签" size="small" style="width: 100%" multiple>
        <el-option-group v-for="group in tagList" :key="group.tagGroupId" :label="group.tagGroupName">
          <el-option v-for="item in group.tags"
                     :key="item.tagId"
                     :label="item.tagName"
                     :value="item.tagId">
          </el-option>
        </el-option-group>
      </el-select>
    </search-container-item>
  </search-container>
</template>

<script>
  import SearchContainer from '@/components/SearchContainer';
  import searchContainerItem from '@/components/SearchContainerItem.vue';
  import {CommonService} from "@/service/common/CommonService";
  import {MemberService} from "@/service/member/MemberService";

  const getDefaultQueryParams = () => ({
    nicknameOrMobile: '',
    sourceInForm: undefined,
    typeInForm: undefined,
    svipInForm: undefined,
    memberSearchDateType: '',
    startTime: '',
    endTime: '',
    tagIds: [],
    page: 1,
    limit: 30,
  });

  export default {
    name: 'MembersSearch',
    components: {
      SearchContainer,
      searchContainerItem
    },
    data() {
      return {
        queryParams: getDefaultQueryParams(),
        memberSource: [],
        memberType: [],
        memberSVIP: [],
        memberSearchDateType: [],
        tagList: [],
        dateRange: [],
      };
    },
    mounted() {
      this.initSelectData();
    },
    methods: {
      initSelectData() {
        const param = [{
          enumKey: "memberSource",
          enumValue: "EnumMemberSource",
        }, {
          enumKey: "memberType",
          enumValue: "EnumMemberType",
        }, {
          enumKey: "memberSVIP",
          enumValue: "EnumMemberSVIP",
        }, {
          enumKey: "memberSearchDateType",
          enumValue: "EnumMemberSearchDateType",
        }];
        const that = this;
        new CommonService().findEnumExcludeAll('member', param).then(response => {
          that.memberSource = response.memberSource;
          that.memberType = response.memberType;
          that.memberSVIP = response.memberSVIP;
          that.memberSearchDateType = response.memberSearchDateType;
        })

        // 标签
        new MemberService().getTagsSelect().then(response => {
          that.tagList = response;
        })
      },
      handleDataSearch() {
        debugger
        if (this.dateRange.length !== 0 && this.dateRange !== null && this.queryParams.memberSearchDateType === '') {
          this.$message({
            message: '请选择时间类型',
            type: 'warning'
          });
          return ;
        }
        if (undefined != this.dateRange && this.dateRange.length > 0) {
          this.queryParams.startTime = this.dateRange[0];
          this.queryParams.endTime = this.dateRange[1];
        }
        if (null === this.dateRange) {
          this.queryParams.startTime = undefined;
          this.queryParams.endTime = undefined;
        }
        const queryParams = Object.assign({}, this.queryParams);
        this.$emit('search', queryParams);
      },
      handleAllReset() {
        this.queryParams = {
          page: 1,
          limit: 30,
        };
        this.dateRange = [];
        this.$emit('reset', this.queryParams);
      },
    }
  };
</script>
