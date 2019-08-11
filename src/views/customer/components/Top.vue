<template>
  <div class="flex top">
    <div class="fl"><el-avatar :size="90" :src="userInfo.avatarUrl"></el-avatar></div>
    <div class="flex-1 flex fm">
      <div>早安，{{userInfo.name}},祝你开心每一天！</div>
      <div>
        <span>{{userInfo.position}}</span>
        <span>|</span>
        <span>{{userInfo.department}}</span>
      </div>
    </div>
    <div class="fr">
      <ul>
        <li v-for="(item, key) in userInfo.achievement" :key="key">
          <span class="dec">{{item.dec}}</span>
          <span class="num">{{item.num}}</span>
        </li>
      </ul>
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
        achievement: [
          {'dec': '历史总单量','num': '234'},
          {'dec': '历史总业绩','num': '234'},
          {'dec': '团队内排名','num': '2/10'}
        ]
      }
    }
  }
}
</script>

<style lang='scss' scoped>
  .top {
    padding: 15px 20px;
    border: 1px solid #dcdfe6;
  }
</style>
