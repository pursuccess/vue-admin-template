<template>
  <div class="pageHeader flex">
    <div class="return" @click="goBack">
      <i class="el-icon-back" />
      <span>返回</span>
    </div>
    <h2 class="title flex-1" v-html="title" />
  </div>
</template>

<script>
export default {
  name: 'PageHeader',
  props: {
    title: {
      type: String,
      default: '详情'
    }
  },
  data() {
    return {

    }
  },
  methods: {
    goBack() {
      this.$emit('goBack')
    }
  }
}
</script>

<style lang="scss">
  @import "~@/styles/variables.scss";

  .pageHeader {
    line-height: 50px;
    border-bottom: 1px solid $borderGrey;
    .return {
      padding: 0 15px;
      cursor: pointer;
    }
    .title {
      margin: 0;
      font-size: 20px;
      font-weight: normal;
      text-align: center;
    }
  }
</style>
