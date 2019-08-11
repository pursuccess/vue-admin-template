<template>
    <div class="customer-container">
        <top />
        <router-view :key="key" />
    </div>
</template>

<script>
import Top from './components/Top'
export default {
    name: 'Customer',
    data() {
      return {
        
      }
    },
    components: {
      Top,
    }
}
</script>

<style lang='scss' scoped>

</style>
