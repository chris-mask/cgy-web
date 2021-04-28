<template>
  <div class="select-box-date" @click.stop="handleSelectBox()">
    <span v-if="subsidyDateName == ''">{{inputName}}</span>
    <span style="color: #666;" v-else>{{subsidyDateName}}</span>
    <div @mouseover="overThis" @mouseout="outThis">
      <i v-if="!isShowDateIcon" class="el-icon-arrow-down"></i>
      <i v-if="isShowDateIcon" @click.stop="clearDate" class="el-icon-circle-close"></i>
    </div>
    <div class="select-item-list" v-if="isShowDateSelectlist">
      <span class="arrow"></span>
      <div class="default-list">
        <div class="item" @mouseover.stop="outCustom" v-for="item in dateList" :key="item.key" @click="handleDate(item)">
          {{item.val}}
        </div>
      </div>
      <div @mouseover="overCustom"  class="item custom" @click.stop="handleCustom">
        自定义
        <i class="el-icon-caret-right"></i>
        <!--自定义-输入框-->
        <div class="item-child-list" v-show="isShowCustomList">
          <div class="item-input">
            从
            <div @click.stop="handleStartDate">
              <el-date-picker
                v-model="startDate"
                type="date"
                class="money"
                ref="startDate"
                value-format="yyyy-MM-dd"
                placeholder="开始日期">
              </el-date-picker>
            </div>
          </div>
          <div class="item-input">
            至
            <el-date-picker
              v-model="endDate"
              type="date"
              class="money"
              value-format="yyyy-MM-dd"
              placeholder="结束日期">
            </el-date-picker>
          </div>
          <el-button @click.stop="handleCustomDate" class="sure">确定</el-button>
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
        startDate: '',
        endDate: '',
        // 补助金额名称
        subsidyDateName: '',
        // 判断显示icon
        isShowDateIcon: false,
        // 判断显示下拉窗口
        isShowDateSelectlist: false,
        // 判断显示自定义窗口
        isShowCustomList: false
      }
    },
    props: [
      'inputName', // 输入框名字
      'dateList', // 下拉列表数据
      'rangeDateName'// 自定义的名
    ],
    mounted() {
      this.clonseSelectBox()
    },
    methods: {
      // 选择补助金额
      handleDate(data) {
        data.labelName = this.inputName
        this.$emit('handleDate', data)
        this.subsidyDateName = data.val
      },
      // 补助金额-自定义-确定
      handleCustomDate() {
        if ((this.startDate === '' && this.endDate === '') || (this.startDate === null && this.endDate === null)) {
          this.$message.warning('请选择日期')
          return false
        } else {
          const dateRangeData = {
            startDate: this.startDate,
            endDate: this.endDate,
            labelName: this.inputName,
            rangeDateName: ''
          }
          if (dateRangeData.startDate === '' || dateRangeData.startDate === null) {
            delete dateRangeData.startDate
            dateRangeData.rangeDateName = `- 至 ${dateRangeData.endDate}`
          } else if (dateRangeData.endDate === '' || dateRangeData.endDate === null) {
            delete dateRangeData.endDate
            dateRangeData.rangeDateName = `${dateRangeData.startDate} 至 -`
          } else {
            dateRangeData.rangeDateName = `${dateRangeData.startDate} 至 ${dateRangeData.endDate}`
          }
          this.$emit('handleDateRange', dateRangeData)
          this.isShowDateSelectlist = false
          this.isShowCustomList = false
          this.$nextTick(() => {
            this.subsidyDateName = this.rangeDateName
          })
        }
      },
      // 金额图标鼠标移上去
      overThis() {
        if (this.subsidyDateName !== '') {
          this.isShowDateIcon = true
        }
      },
      // 金额图标鼠标移出
      outThis() {
        this.isShowDateIcon = false
      },
      // 清除补助金额
      clearDate() {
        this.$emit('handleClearDate', this.inputName)
        this.subsidyDateName = ''
        this.isShowDateSelectlist = false
        this.startDate = ''
        this.endDate = ''
      },
      // //点击补助金额框
      handleSelectBox() {
        this.isShowDateSelectlist = !this.isShowDateSelectlist
      },
      // 点击自定义
      handleCustom() {
        this.isShowDateSelectlist = true
      },
      // 鼠标移进自定义
      overCustom() {
        this.isShowCustomList = true
      },
      // 鼠标移出自定义
      outCustom() {
        this.isShowCustomList = false
      },
      // 点击开始日期
      handleStartDate() {
        this.isShowCustomList = true
      },
      //点击金钱框以外的地方
      clonseSelectBox() {
        const that = this
        document.addEventListener('click', function(event) {
          if (event.target.className !== 'select-box-date') {
            that.isShowDateSelectlist = false
            that.isShowCustomList = false
            event.stopPropagation()
          }
        })
      }

    }
  }
</script>

<style lang="less" scoped>
  .select-box-date{
    min-width: 143px;
    height: 32px;
    border-radius: 4px;
    border: 1px solid #DCDFE6;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px 0 15px;
    color: #C0C4CC;
    position: relative;
    font-size: 14px;
    .select-item-list{
      min-width: 166px;
      position: absolute;
      border: 1px solid #E4E7ED;
      background-color: #FFF;
      z-index: 90;
      transform-origin: center top;
      box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
      border-radius: 4px;
      padding-bottom: 6px;
      bottom: -165px;
      left: 0;
      .arrow{
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
        &::after{
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
          width: 4px;
        }

        &::-webkit-scrollbar-thumb {
          border-radius: 10px;
          -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
          background: rgba(0, 0, 0, 0.2);
        }

        &::-webkit-scrollbar-track {
          -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
          border-radius: 0;
          background: rgba(0, 0, 0, 0.1);
        }
      }

      .item {
        padding: 0 6px;
        color: #666;
        &:hover{
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
            right: -136px;
            top: 7px;
            border-radius: 4px;
            padding: 10px;
            border: 1px solid #E4E7ED;
            padding-bottom: 0;

            .item-input {
              display: flex;
              align-items: center;

              .money {
                width: auto;
                margin-left: 10px;

                /deep/ .el-input-group__append {
                  padding: 0;
                  padding-right: 3px;
                  background: none;
                }

                /deep/ .el-input__inner {
                  border: 1px solid #DCDFE6;
                  height: 24px;
                  width: 140px;
                }
              }

            }

            .sure {
              border: 0;
              padding: 5px 10px;
              color: #fff;
              background: #05aaff;
              &:hover{

              }
            }
          }
        }
      }
    }
  }
</style>
