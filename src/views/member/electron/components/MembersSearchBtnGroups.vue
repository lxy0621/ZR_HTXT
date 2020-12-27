<template>
  <div>
    <div class="search-btn-group" v-loading="loading">
      <div class="search-btn-group-total" @click="handleSearchTotal" v-bind:class="{'onActiv':totalActive}">
        <p class="search-btn-group-total-num">{{total}}</p>
        <span class="search-btn-group-total-label">查询结果</span>
      </div>
      <div v-for="(searchBtnItem, index) in searchBtnData" :key="index" class="search-btn-group-con">
        <div class="search-btn-group-con-title" @click="toggleContainer(index)" style=";transition: all 0.8s ease;">
          <em v-show="index == onActive[0]"></em>
          <span>{{searchBtnItem.name}}</span>
          <span v-if="index == active ? false : true">
            <i style="padding-top:2px;" class="el-icon-arrow-right"></i>
          </span>
        </div>
        <div class="search-btn-group-container" :class="index == active ? 'group-active' : ''">
          <div class="search-btn-group-type">
            <div v-for="(searchTypeItem, key) in searchBtnItem.children" :key="key" class="search-btn-group-type-block"
                 @click="handleSearch(searchTypeItem,index,key)"
                 v-bind:class="{'onActiv':index==onActive[0]&&onActive[1]==key}">
              <p class="search-btn-group-type-num">{{searchTypeItem.childNum}}</p>
              <span class="search-btn-group-type-label">{{searchTypeItem.childName}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {MemberService} from "@/service/member/MemberService";

  export default {
    name: "MembersSearchBtnGroups",
    data() {
      return {
        loading: false,
        searchBtnShow: true,
        active: 0,
        queryParams: {
          page: 1,
          limit: 30,
        },
        service: null,
        total: 0,
        mini: 0,
        mp: 0,
        person: 0,
        company: 0,
        notsvip: 0,
        svipl1: 0,
        svipl2: 0,
        svipl3: 0,
        searchBtnData: [
          {
            name: "来源",
            children: [
              {
                childName: "小程序",
                childNum: 0,
                flag: "mini"
              },
              {
                childName: "公众号",
                childNum: 0,
                flag: "mp"
              }
            ]
          },
          {
            name: "会员类型",
            children: [
              {
                childName: "个人",
                childNum: 0,
                flag: "person"
              },
              {
                childName: "企业",
                childNum: 0,
                flag: "company"
              }
            ]
          },
          {
            name: "是否SVIP",
            children: [
              {
                childName: "非会员",
                childNum: 0,
                flag: "notsvip"
              },
              {
                childName: "等级1",
                childNum: 0,
                flag: "svipl1"
              },
              {
                childName: "等级2",
                childNum: 0,
                flag: "svipl2"
              },
              {
                childName: "等级3",
                childNum: 0,
                flag: "svipl3"
              }
            ]
          }
        ],
        onActive: [null, null],
        totalActive: true,
      };
    },
    mounted() {
      this.service = new MemberService();
      this.findMemberGroups(this.queryParams);
    },
    methods: {
      toggleContainer(index) {
        this.active = index;
      },
      findMemberGroups(queryParams) {
        this.loading = true;
        this.queryParams = queryParams;
        this.service.findMemberGroups(queryParams).then(response => {
          this.total = response.data.total; //查询结果
          this.searchBtnData[0].children[0].childNum =
            response.data.memberSource.mini === undefined
              ? 0
              : response.data.memberSource.mini;
          this.searchBtnData[0].children[1].childNum =
            response.data.memberSource.mp === undefined
              ? 0
              : response.data.memberSource.mp;
          this.searchBtnData[1].children[0].childNum =
            response.data.memberType.person === undefined
              ? 0
              : response.data.memberType.person;
          this.searchBtnData[1].children[1].childNum =
            response.data.memberType.company === undefined
              ? 0
              : response.data.memberType.company;
          this.searchBtnData[2].children[0].childNum =
            response.data.memberSVIP.notsvip === undefined
              ? 0
              : response.data.memberSVIP.notsvip;
          this.searchBtnData[2].children[1].childNum =
            response.data.memberSVIP.svipl1 === undefined
              ? 0
              : response.data.memberSVIP.svipl1;
          this.searchBtnData[2].children[2].childNum =
            response.data.memberSVIP.svipl2 === undefined
              ? 0
              : response.data.memberSVIP.svipl2;
          this.searchBtnData[2].children[3].childNum =
            response.data.memberSVIP.svipl3 === undefined
              ? 0
              : response.data.memberSVIP.svipl3;
          this.loading = false;
        });
      },
      handleSearchTotal() {
        this.totalActive = true;
        this.onActive = [null, null];
        delete this.queryParams.sourceInCard;
        delete this.queryParams.typeInCard;
        delete this.queryParams.svipInCard;
        this.$emit("search", this.queryParams);
      },
      handleSearch(obj, pindex, cindex) {
        this.totalActive = false;
        this.onActive = [pindex, cindex];
        delete this.queryParams.sourceInCard;
        delete this.queryParams.typeInCard;
        delete this.queryParams.svipInCard;
        switch (obj.flag) {
          case "mini":
            this.queryParams.sourceInCard = 1;
            break;
          case "mp":
            this.queryParams.sourceInCard = 2;
            break;
          case "person":
            this.queryParams.typeInCard = 1;
            break;
          case "company":
            this.queryParams.typeInCard = 2;
            break;
          case "notsvip":
            this.queryParams.svipInCard = 0;
            break;
          case "svipl1":
            this.queryParams.svipInCard = 1;
            break;
          case "svipl2":
            this.queryParams.svipInCard = 2;
            break;
          case "svipl3":
            this.queryParams.svipInCard = 3;
            break;
        }
        this.$emit("search", this.queryParams);
      }
    }
  };
</script>
<style lang="scss" scoped>
  .search-btn-group-container {
    transition: all 0.8s ease;
    opacity: 0;
    width: 0;
  }

  .group-active {
    transition: all 1s ease;
    opacity: 1;
    width: initial;
  }

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
    background-color: #fff;
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
  @import "~@/assets/style/searchBtnGroup.scss";
</style>
