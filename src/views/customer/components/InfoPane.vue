<template>
  <div class="infoPanne">
    <el-form :rules="rules" :model="temp" label-position="right" label-width="160px" size="small" style="width: 400px;">
      <el-form-item label="客户名称">
        <div style="padding: 0 15px;">{{ temp.name }}</div>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="temp.mail" :class="{'no-border': !editStatus}" />
      </el-form-item>
      <el-form-item label="微信昵称">
        <div style="padding: 0 15px;">{{ temp.nickname }}</div>
      </el-form-item>
      <el-form-item label="QQ号">
        <div style="padding: 0 15px;">{{ temp.qq }}</div>
      </el-form-item>
      <el-form-item label="企业名称">
        <el-input v-model="temp.company" :class="{'no-border': !editStatus}" />
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="temp.tel" :class="{'no-border': !editStatus}" />
      </el-form-item>
      <el-form-item label="客户来源">
        <div style="padding: 0 15px;">{{ temp.userOrigin }}</div>
      </el-form-item>
      <el-form-item v-if="routhPath=='/own-customer' || routhPath=='/public-customer'" label="当前责任销售">
        <div style="padding: 0 15px;">{{ temp.sellerCurrent }}</div>
      </el-form-item>
      <el-form-item v-if="routhPath=='/own-customer' || routhPath=='/public-customer'" label="当前责任销售分配时间">
        <div style="padding: 0 15px;">{{ temp.distributeTime }}</div>
      </el-form-item>
      <el-form-item v-if="routhPath=='/own-customer' || routhPath=='/public-customer'" label="上次跟进销售">
        <div style="padding: 0 15px;">{{ temp.sellerPast }}</div>
      </el-form-item>
      <el-form-item v-if="!adminId">
        <el-button v-show="!editStatus" @click="formEdit">编辑</el-button>
        <el-button v-show="editStatus" style="margin-left: 0;" @click="formCancel">取消</el-button>
        <el-button v-show="editStatus" type="primary" @click="formSave">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'InfoPane',
  components: {

  },
  props: {
    temp: {
      type: Object,
      default: function() {
        return {
          userId: undefined,
          name: '',
          mail: '',
          nickname: '',
          qq: '',
          company: '',
          tel: '',
          userOrigin: ''
        }
      }
    }
  },
  data() {
    return {
      rules: {
        type: [{ required: true, message: 'type is required', trigger: 'change' }],
        timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
        title: [{ required: true, message: 'title is required', trigger: 'blur' }]
      },
      editStatus: false
    }
  },
  computed: {
    routhPath() {
      return this.$route.path
    },
    adminId() {
      return this.$route.path === '/own-group' ? this.$store.state.user.adminId : ''
    }
  },
  created() {

  },
  methods: {
    formEdit() {
      this.editStatus = true
    },
    formCancel() {
      this.editStatus = false
    },
    formSave() {
      const query = { userId: this.temp.userId, mail: this.temp.mail, company: this.temp.company, tel: this.temp.tel }
      this.$emit('formSave', query)
    }
  }
}
</script>

<style lang="scss">
  .infoPanne {
    .no-border {
      .el-input__inner {
        border: none;
      }
    }
    .el-form-item--small.el-form-item {
      margin-bottom: 8px;
    }
  }
</style>

