<template>
  <div>
    <el-form :rules="rules" :model="temp" label-position="right" label-width="70px" style="width: 400px; margin-left:50px;">
      <el-form-item label="客户名称">
        <div style="padding: 0 15px;">{{temp.name}}</div>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="temp.mail" :class="{'no-border': !editStatus}"/>
      </el-form-item>
      <el-form-item label="微信昵称">
        <div style="padding: 0 15px;">{{temp.nickname}}</div>
      </el-form-item>
      <el-form-item label="QQ号">
        <div style="padding: 0 15px;">{{temp.qq}}</div>
      </el-form-item>
      <el-form-item label="企业名称">
        <el-input v-model="temp.company" />
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="temp.tel" />
      </el-form-item>
      <el-form-item label="客户来源">
        <div style="padding: 0 15px;">{{temp.origin}}</div>
      </el-form-item>
      <el-form-item>
        <el-button @click="formEdit" v-show="!editStatus">编辑</el-button>
        <el-button @click="formCancel" v-show="editStatus" style="margin-left: 0;">取消</el-button>
        <el-button type="primary" @click="formSave" v-show="editStatus">保存</el-button>
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
      default: function () {
        return {
          id: undefined,
          name: '',
          mail: '',
          nickname: '',
          qq: '',
          company: '',
          tel: '',
          origin: '',
        }
      }
    },
  },
  data() {
    return {
      rules: {
        type: [{ required: true, message: 'type is required', trigger: 'change' }],
        timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
        title: [{ required: true, message: 'title is required', trigger: 'blur' }]
      },
      editStatus: false,
    }
  },
  created() {
    
  },
  methods: {
    formEdit() {
      this.editStatus = true;
    },
    formCancel() {
      this.editStatus = false;
    },
    formSave() {
      this.$emit('formSave',this.temp);
    }
  }
}
</script>

