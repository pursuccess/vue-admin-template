<template>
  <customer-info :is-public="false" />
</template>

<script>
import CustomerInfo from './components/CustomerInfo'

export default {
  name: "OwnCustomer",
  components: {
    CustomerInfo
  },
}
</script>

<style lang='scss' scoped>
</style>
