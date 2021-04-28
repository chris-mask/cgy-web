<template>
  <div class="select-box" @click.stop="handleSelectBox()" @mouseover="overThis" @mouseout="outThis">
    <span v-if="subsidyMoneyName == ''">{{inputName}}</span>
    <span style="color: #666;" v-else>{{subsidyMoneyName}}</span>
    <div>
      <i v-if="!isShowMoneyIcon" class="el-icon-arrow-down"></i>
      <i v-if="isShowMoneyIcon" @click.stop="clearMoney" class="el-icon-circle-close"></i>
    </div>
    <div class="select-item-list" v-if="isShowMoneySelectlist">
      <span class="arrow"></span>
      <div class="default-list">
        <div class="item" v-for="item in moneyList" :key="item.keys" @click="handleMoney(item)">
          {{item.val}}
        </div>
      </div>
      <div @mouseover="overCustom" @mouseout="outCustom" class="item custom" @click.stop="handleCustom">
        自定义
        <i class="el-icon-caret-right"></i>
        <!--自定义-输入框-->
        <div class="item-child-list" v-show="isShowCustomList">
          <div class="item-input">
            从
            <el-input type="text" class="money" v-model="startMoney">
              <template slot="append">万</template>
            </el-input>
          </div>
          <div class="item-input">
            至
            <el-input type="text" class="money" v-model="endMoney">
              <template slot="append">万</template>
            </el-input>
          </div>
          <el-button @click.stop="handleCustomMoney" class="sure">确定</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        // 补助金额-自定义
        startMoney: '',
        endMoney: '',
        // 补助金额名称
        subsidyMoneyName: '',
        // 判断显示icon
        isShowMoneyIcon: false,
        // 判断显示下拉窗口
        isShowMoneySelectlist: false,
        // 判断显示自定义窗口
        isShowCustomList: false
      }
    },
    props: [
      'inputName', // 输入框名字
      'moneyList', // 下拉列表数据
      'rangeMoneyName'// 自定义的名
    ],
    mounted() {
      this.clonseSelectBox()
    },
    methods: {
      // 选择补助金额
      handleMoney(data) {
        this.$emit('handleMoney', data)
        this.subsidyMoneyName = data.val
      },
      // 补助金额-自定义-确定
      handleCustomMoney() {
        if (this.startMoney === '' || this.endMoney === '') {
          this.$message.warning('请输入金额')
          return false
        } else if (Number(this.endMoney) < Number(this.startMoney)) {
          this.$message({type: 'warning', message: '结束金额不能少于开始金额'});
          return false
        } else {
          const moneyRangeData = {
            startMoney: this.startMoney,
            endMoney: this.endMoney
          };
          this.$emit('handleMoneyRange', moneyRangeData)
          this.isShowMoneySelectlist = false
          this.isShowCustomList = false
          this.$nextTick(() => {
            this.subsidyMoneyName = this.rangeMoneyName
          })
        }
      },
      // 金额图标鼠标移上去
      overThis() {
        if (this.subsidyMoneyName !== '') {
          this.isShowMoneyIcon = true
        }
      },
      // 金额图标鼠标移出
      outThis() {
        this.isShowMoneyIcon = false
      },
      // 清除补助金额
      clearMoney() {
        this.$emit('handleClearMoney')
        this.subsidyMoneyName = ''
        this.isShowMoneySelectlist = false
      },
      // //点击补助金额框
      handleSelectBox() {
        this.isShowMoneySelectlist = !this.isShowMoneySelectlist
      },
      // 点击自定义
      handleCustom() {
        this.isShowMoneySelectlist = true
      },
      // 鼠标移进自定义
      overCustom() {
        this.isShowCustomList = true
      },
      // 鼠标移出自定义
      outCustom() {
        this.isShowCustomList = false
      },
      // //点击金钱框以外的地方
      clonseSelectBox() {
        const that = this
        document.addEventListener('click', function (e) {
          if (e.target.className !== 'select-box') {
            // e.stopPropagation()
            that.isShowMoneySelectlist = false
          }
        })
      }

    }
  }
</script>

<style lang="less" scoped>
  .select-box {
    font-size: 14px;
    min-width: 143px;
    height: 36px;
    border-radius: 4px;
    border: 1px solid #DCDFE6;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px 0 15px;
    color: #C0C4CC;
    position: relative;

    .select-item-list {
      min-width: 166px;
      position: absolute;
      border: 1px solid #E4E7ED;
      background-color: #FFF;
      z-index: 2160;
      transform-origin: center top;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
      border-radius: 4px;
      padding-bottom: 6px;
      bottom: -165px;
      left: 0;

      .arrow {
        position: absolute;
        width: 0;
        height: 0;
        top: -6px;
        left: 35px;
        border-color: transparent;
        border-style: solid;
        border-width: 6px;
        border-top-width: 0;
        border-bottom-color: #EBEEF5;
        filter: drop-shadow(0 2px 12px rgba(0, 0, 0, .03));

        &::after {
          position: absolute;
          display: block;
          width: 0;
          height: 0;
          border-color: transparent;
          border-style: solid;
          border-width: 6px;
          content: " ";
          top: 1px;
          margin-left: -6px;
          border-top-width: 0;
          border-bottom-color: #FFF;
        }
      }

      .default-list {
        height: 109px;
        overflow-y: auto;
        padding-top: 6px;

        &::-webkit-scrollbar {
          width: 6px;
          border-radius: 4px;
        }
      }

      .item {
        height: 34px;
        line-height: 34px;
        padding: 0 6px;
        color: #666;

        &:hover {
          background: #F5F7FA;
        }

        &.custom {
          position: relative;
          display: flex;
          align-items: center;
          border-top: 1px solid #E4E7ED;

          .item-child-list {
            position: absolute;
            background: #fff;
            right: -85px;
            top: 7px;
            border-radius: 4px;
            padding: 10px;
            border: 1px solid #E4E7ED;
            padding-bottom: 0;

            .item-input {
              display: flex;
              align-items: center;

              .money {
                width: 100px;
                margin-left: 10px;

                /deep/ .el-input-group__append {
                  padding: 0;
                  padding-right: 3px;
                  background: none;
                }

                /deep/ .el-input__inner {
                  border: 1px solid #DCDFE6;
                  border-right: 0;
                  height: 24px;
                }
              }

            }

            .sure {
              border: 0;
              padding: 5px 10px;
              color: #fff;
              background: #05aaff;

              &:hover {

              }
            }
          }
        }
      }
    }
  }
</style>
