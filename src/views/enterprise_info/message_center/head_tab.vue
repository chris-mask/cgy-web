<template>
  <div>
    <el-tabs class="news-tabs" v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="沟通消息" name="first">
        <ChatList ref="first"></ChatList>
      </el-tab-pane>
      <el-tab-pane label="系统消息" name="second">
        <SysList ref="second"></SysList>
      </el-tab-pane>
    </el-tabs>
  </div>

</template>
<script>
  import ChatList from './chat_list'
  import SysList from './sys_list'

  export default {
    data() {
      return {
        activeName: 'first',
        urlParams: this.$route.query.name
      }
    },
    mounted() {
      this.getPageIf()
    },
    methods: {
      //入页面判断
      getPageIf() {
        if (this.urlParams !== undefined) {
          if (this.urlParams === 'two') {
            this.activeName = 'second';
          } else {
            this.activeName = 'first';
          }
        } else {
          this.activeName = 'first';
        }
      },
      handleClick(tab, event) {
        this.$store.state.activeName = this.activeName
      }
    },
    beforeRouteLeave(to, from, next) {
      if (!this.$store.state.saveState.isSave) {
        this.$confirm('尚有信息未保存，是否直接离开?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'info',
            message: '已清除未保存数据'
          })
          next()
        }).catch(() => {
          next(false)
        })
      } else {
        next()
      }
    },
    computed: {
      id() {
        return this.$route.query.id
      }
    },
    components: {
      ChatList,
      SysList
    }
  }
</script>
<style lang="less" scoped>

  .news-tabs {
    margin: 0 20px;
    margin-top: 4px;

    /deep/ .el-tabs__nav-scroll {
      background: #E4F4FC;
    }

    /deep/ .el-tabs__header, /deep/ .el-tabs__nav {
      margin: 0;
      border: 0;
    }

    /deep/ .el-tabs__item {
      min-width: 100px;
      text-align: center;
      border: 0;
    }

    /deep/ .el-tabs__item.is-active {
      background: #fff;
      color: #05AAFF;
    }
  }
</style>
