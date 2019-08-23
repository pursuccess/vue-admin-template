<template>
  <div class="head">
    <div class="flex align-items-center top">
      <div class="fLeft"><img :src="avatar" ></div>
      <div class="flex-1 fMidle">
        <h3 class="mt-0">早安，{{name}}，祝你开心每一天！</h3>
        <div>
          <span>{{position}}</span>
          <span>|</span>
          <span>{{department}}</span>
        </div>
      </div>
      <div class="fRight">
        <ul class="flex">
          <li v-for="(item, key) in achievement" :key="key">
            <span class="dec">{{item.dec}}</span>
            <span class="num">{{item.num}}</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="tab my-3">
      <el-row>
        <el-col :span="12" style="display: none;">
          <router-link class="el-button" :class="activeClass(item)" v-for="(item, key) in tabBtn" :key="key" :to="item.path">{{item.name}}</router-link>
        </el-col>
        <el-col :span="8" :offset="16">
          <div v-if="routhPath=='/customer/public-customer'" style="display:none;">
            <el-input v-model="searchInput" placeholder="请输入客户名" style="width: 200px;" class="search-item" @keyup.enter.native="handleFilter" />
            <el-button class="search-item" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Top',
  data() {
    return {
      tabBtn: [
        { 'name': '我的业绩', 'path': '/customer/achievement'},
        { 'name': '我的客户', 'path': '/customer/own-customer'},
        { 'name': '公有客户池', 'path': '/customer/public-customer'}
      ],
      searchInput: '',
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'avatar',
      'position',
      'department',
      'achievement'
    ]),
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
    font-size: 16px;
    .fLeft {
      margin-right: 20px;
      img {
        width: 90px;
        height: 90px;
        border-radius: 50%;
      }
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
