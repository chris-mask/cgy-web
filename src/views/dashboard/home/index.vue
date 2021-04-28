<template>
  <div class="home">
    <!--内部端-->
    <inside v-if="companyType == 1"></inside>
    <!--企业端-->
    <enterprise v-else></enterprise>
  </div>
</template>

<script>
  import inside from './inside'
  import enterprise from './enterprise'

  export default {
    data() {
      return {
        companyType: this.$store.getters.companyType,
      }
    },
    components: {
      inside,
      enterprise
    },
  }
</script>

<style lang="less" scoped>

</style>
