<template>
  <customer-info :is-public="true" />
</template>

<script>
import CustomerInfo from './components/CustomerInfo'

export default {
  name: "PublicCustomer",
  components: {
    CustomerInfo
  },
}
</script>

<style lang='scss' scoped>
</style>
