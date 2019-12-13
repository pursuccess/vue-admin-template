<template>
  <div class="app-container">
    <el-button type="primary" @click="handleAddRole">添加角色</el-button>

    <el-table :data="rolesList" style="width: 100%;margin-top:30px;" border>
      <el-table-column align="center" label="角色role值" width="220">
        <template slot-scope="scope">
          {{ scope.row.role }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="角色名" width="220">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column align="header-center" label="角色描述">
        <template slot-scope="scope">
          {{ scope.row.description }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="handleEdit(scope)" v-if="scope.row.role!='admin'">编辑</el-button>
          <el-button type="danger" size="small" @click="handleDelete(scope)" v-if="scope.row.role!='admin'">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :visible.sync="dialogVisible" :title="isEdit?'编辑角色':'新增角色'" :close-on-click-modal="false" width="550px">
      <el-form ref="role" :model="role" label-width="120px" label-position="right" style="padding-right: 40px;">
        <el-form-item label="角色role值" prop="role" :rules="{required: true, message: '请填写角色role值'}">
          <el-input v-model="role.role" placeholder="请填写角色role值" :disabled="isEdit"/>
        </el-form-item>
        <el-form-item label="角色名" prop="name" :rules="{required: true, message: '角色名'}">
          <el-input v-model="role.name" placeholder="请填写角色名" />
        </el-form-item>
        <el-form-item label="角色描述" prop="description" :rules="{required: true, message: '请填写角色描述'}">
          <el-input
            v-model="role.description"
            :autosize="{ minRows: 3, maxRows: 5}"
            type="textarea"
            placeholder="请填写角色描述"
          />
        </el-form-item>
        <el-form-item label="权限列表">
          <el-tree
            ref="tree"
            :check-strictly="checkStrictly"
            :data="routesData"
            :props="defaultProps"
            show-checkbox
            node-key="name"
            class="permission-tree"
          />
        </el-form-item>
        <el-form-item>
          <el-button @click="dialogVisible=false">取消</el-button>
          <el-button type="primary" @click="confirmRole">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { getRoutes, getRoles, addRole, deleteRole, editRole } from '@/api/role'

const defaultRole = {
  role: '',
  name: '',
  description: '',
  routes: []
}

export default {
  data() {
    return {
      role: Object.assign({}, defaultRole),
      routes: [],
      rolesList: [],
      dialogVisible: false,
      isEdit: false,
      checkStrictly: false,
      defaultProps: {
        children: 'children',
        label: 'title'
      }
    }
  },
  computed: {
    routesData() {
      return this.routes
    }
  },
  created() {
    // Mock: get all routes and roles list from server
    this.getRoutes()
    this.getRoles()
  },
  methods: {
    async getRoutes() {
      const res = await getRoutes()
      this.routes = res.data
    },
    async getRoles() {
      const res = await getRoles()
      this.rolesList = res.data
    },
    generateArr(routes) {
      let data = []
      routes.forEach(route => {
        data.push(route)
        if (route.children) {
          const temp = this.generateArr(route.children)
          if (temp.length > 0) {
            data = [...data, ...temp]
          }
        }
      })
      return data
    },
    handleAddRole() {
      this.role = Object.assign({}, defaultRole)
      if (this.$refs.tree) {
        this.$refs.tree.setCheckedNodes([])
      }
      this.isEdit = false
      this.dialogVisible = true
    },
    handleEdit(scope) {
      this.isEdit = true
      this.dialogVisible = true
      this.checkStrictly = true
      this.role = Object.assign({}, scope.row)
      this.$nextTick(() => {
        const routes = this.role.routes
        this.$refs.tree.setCheckedNodes(this.generateArr(routes))
        // set checked state of a node not affects its father and child nodes
        this.checkStrictly = false
      })
    },
    handleDelete({ $index, row }) {
      this.$confirm('确定删除该角色吗?', '', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        closeOnClickModal: false,
        center: true
      })
        .then(async() => {
          await deleteRole({ role: row.role} )
          this.rolesList.splice($index, 1)
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
        .catch(err => { console.error(err) })
    },
    generateTree(routes, checkedKeys) {
      const res = []

      routes.forEach(route => {
        const tmp = { ...route }

        if (checkedKeys.includes(tmp.name)) {
          if (tmp.children) {
            tmp.children = this.generateTree(tmp.children, checkedKeys)
          }
          res.push(tmp)
        }
      })
      return res
    },
    async confirmRole() {
      const checkedKeys = this.$refs.tree.getCheckedKeys()
      const halfCheckedKeys = this.$refs.tree.getHalfCheckedKeys()
      const keys = [...checkedKeys, ...halfCheckedKeys]
      const data = Object.assign({}, this.role, { routes: keys})
      this.role.routes = this.generateTree(this.routes, keys)
      
      this.$refs['role'].validate(async(valid) => {
        if (valid) {
          if (this.isEdit) {
            await editRole(data)
            for (let index = 0; index < this.rolesList.length; index++) {
              if (this.rolesList[index].role === this.role.role) {
                this.rolesList.splice(index, 1, Object.assign({}, this.role))
                break
              }
            }
          } else {
            await addRole(data)
            this.rolesList.push(Object.assign({}, this.role))
          }

          this.dialogVisible = false
          this.$message({
            type: 'success',
            message: this.isEdit ? '编辑成功' : '添加成功'
          })
        } else {
          return false
        }
      })
      
    }
  }
}
</script>

<style lang="scss" scoped>
.app-container {
  .roles-table {
    margin-top: 30px;
  }
  .permission-tree {
    margin-bottom: 30px;
  }
}
</style>
