<template>
  <div class="tagTemplete">
    <el-tag
      :key="key"
      v-for="(tag, key) in dynamicTags"
      closable
      :disable-transitions="false"
      @close="handleClose(tag)"
      :style="tagStyle(key)"
    >
      {{tag}}
    </el-tag>
    <el-input
      class="input-new-tag"
      v-if="inputVisible"
      v-model="inputValue"
      placeholder="光标移出退出编辑"
      ref="saveTagInput"
      size="small"
      :maxlength="maxlength"
      @keyup.enter.native="handleInputConfirm"
      @blur="handleInputConfirm"
    >
    </el-input>
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
        return ['#40A9FF','#FFC53D','#73D13D','#FF4D4F','#597EF7','#F759AB','#36CFC9','#9254DE','#FFA940']
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
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      });
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
