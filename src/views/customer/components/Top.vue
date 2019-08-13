<template>
  <div class="head">
    <div class="flex align-items-center top">
      <div class="fLeft"><img width="90" :src="userInfo.avatarUrl" ></div>
      <div class="flex-1 fMidle">
        <h3 class="mt-0">早安，{{userInfo.name}},祝你开心每一天！</h3>
        <div>
          <span>{{userInfo.position}}</span>
          <span>|</span>
          <span>{{userInfo.department}}</span>
        </div>
      </div>
      <div class="fRight">
        <ul class="flex">
          <li v-for="(item, key) in userInfo.achievement" :key="key">
            <span class="dec">{{item.dec}}</span>
            <span class="num">{{item.num}}</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="tab my-3">
      <el-row :span="12">
        <el-col :span="12">
          <router-link class="el-button" :class="activeClass(item)" v-for="(item, key) in tabBtn" :key="key" :to="item.path">{{item.name}}</router-link>
        </el-col>
        <el-col :span="8" :offset="4">
          <el-date-picker v-model="searchTime" type="date" placeholder="Pick a date" style="width: 100%;" v-if="routhPath=='/customer/achievement'"/>
          <div v-if="routhPath=='/customer/public-customer'">
            <el-input v-model="searchInput" placeholder="请输入客户名" style="width: 200px;" class="search-item" @keyup.enter.native="handleFilter" />
            <el-button class="search-item" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Top',
  data() {
    return {
      userInfo: {
        avatarUrl: '',
        name: 'Bob',
        position: '销售组长',
        department: 'SellerMoto销售部',
        achievement: [
          { 'dec': '历史总单量', 'num': '234' },
          { 'dec': '历史总业绩', 'num': '234' },
          { 'dec': '团队内排名', 'num': '2/10' }
        ]
      },
      tabBtn: [
        { 'name': '我的业绩', 'path': '/customer/achievement'},
        { 'name': '我的客户', 'path': '/customer/own-customer'},
        { 'name': '公有客户池', 'path': '/customer/public-customer'}
      ],
      searchTime: '',
      searchInput: '',
    }
  },
  computed: {
    routhPath() {
      return this.$route.path
    }
  },
  methods: {
    activeClass(item) {
      return item.path == this.routhPath ? 'active' : ''
    },
    handleFilter() {

    }
  }
}
</script>

<style lang='scss' scoped>
  @import "~@/styles/variables.scss";

  .top {
    padding: 15px 20px;
    border: 1px solid #dcdfe6;
    .fLeft {
      width: 90px;
      margin-right: 20px;
    }
    .fRight {
      li {
        border-left: 1px solid $borderGrey;
        &:first-child {
          border-left: none;
        }
      }
      span {
        display: block;
        padding: 5px 20px;
        text-align: center;
        &:first-child {
          color: #5e5e5e;
        }
      }
    }
  }
  .el-button {
    &.active {
      color: #fff;
      background-color: #409eff;
      border-color: #409eff;
    }
  }
</style>
