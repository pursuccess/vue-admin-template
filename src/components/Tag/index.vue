<template>
  <div class="tagTemplete">
    <el-tag
      v-for="(tag, key) in dynamicTags"
      :key="key"
      closable
      :disable-transitions="false"
      :style="tagStyle(key)"
      @close="handleClose(tag)"
    >
      {{ tag }}
    </el-tag>
    <el-input
      v-if="inputVisible"
      ref="saveTagInput"
      v-model="inputValue"
      class="input-new-tag"
      placeholder="光标移出退出编辑"
      size="small"
      :maxlength="maxlength"
      @keyup.enter.native="handleInputConfirm"
      @blur="handleInputConfirm"
    />
    <el-button v-else v-show="dynamicTags.length<maxAmount" class="button-new-tag" size="small" @click="showInput">+ 标签</el-button>
  </div>
</template>

<script>

export default {
  name: 'Tag',
  props: {
    dynamicTags: {
      type: Array,
      default() {
        return []
      }
    },
    maxAmount: {
      type: Number,
      default: 9
    },
    colors: {
      type: Array,
      default() {
        return ['#40A9FF', '#FFC53D', '#73D13D', '#FF4D4F', '#597EF7', '#F759AB', '#36CFC9', '#9254DE', '#FFA940']
      }
    },
    maxlength: {
      type: Number,
      default: 10
    }
  },
  data() {
    return {
      inputVisible: false,
      inputValue: ''
    }
  },
  methods: {
    tagStyle(i) {
      return {
        background: this.colors[i],
        borderColor: this.colors[i]
      }
    },
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
    },

    showInput() {
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },

    handleInputConfirm() {
      if (this.inputValue && this.dynamicTags.length < this.maxAmount) {
        this.dynamicTags.push(this.inputValue)
      }
      this.inputVisible = false
      this.inputValue = ''
    }
  }
}
</script>

<style lang="scss">
  .tagTemplete {
    .el-tag {
      color: #fff;
      margin-right: 10px;
      margin-bottom: 10px;
      .el-icon-close {
        color: #fff;
      }
    }
  }
</style>

<style lang="scss" scoped>
  .input-new-tag {
    width: 180px;
  }
</style>
