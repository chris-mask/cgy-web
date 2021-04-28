<template>
  <div class="sales-plan-box">
    <!--列表-->
    <div class="list">
      <div class="list-title">
        <div class="left">
          <div class="title-text">
            <span class="line"></span>
            <div class="btn" @click="updateVisible = true">编辑</div>
          </div>
        </div>
      </div>

      <div class="list-detail">
        <table>
          <tr>
            <td>参保人数：{{listData.socialSecurityNum|lengthFilter}}</td>
            <td>科技人数：{{listData.technologyNum|lengthFilter}}</td>
            <td>大专以上人数：{{listData.collegeNum|lengthFilter}}</td>
            <td>本科以上人数：{{listData.universityNum|lengthFilter}}</td>
            <td>硕士以上人数：{{listData.masterNum|lengthFilter}}</td>
          </tr>
          <tr>
            <td>博士以上人数：{{listData.doctorNum|lengthFilter}}</td>
            <td>初级职称人数：{{listData.lowLevelNum|lengthFilter}}</td>
            <td>中级职称人数：{{listData.midLevelNum|lengthFilter}}</td>
            <td>高级职称人数：{{listData.highLevelNum|lengthFilter}}</td>
          </tr>
        </table>

      </div>
    </div>

    <!--弹窗-->
    <el-dialog title="编辑" :visible.sync="updateVisible" width="586px">
      <el-form :model="form" :rules="rules" ref="form" label-width="120px">
        <el-form-item label="参保人数:">
          <el-input v-model="form.socialSecurityNum"
                    min="0"
                    type="number"
                    placeholder="参保人数"
                    oninput="if(value.length>9)value=value.slice(0,9)"
                    onKeypress="return (/[\d]/.test(String.fromCharCode(event.keyCode)))"
          >
          </el-input>
        </el-form-item>
      </el-form>
      <el-form :model="form" :rules="rules" ref="form" label-width="120px">
        <el-form-item label="科技人数:">
          <el-input v-model="form.technologyNum"
                    min="0"
                    type="number"
                    placeholder="科技人数"
                    oninput="if(value.length>9)value=value.slice(0,9)"
                    onKeypress="return (/[\d]/.test(String.fromCharCode(event.keyCode)))"
          >
          </el-input>
        </el-form-item>
      </el-form>
      <el-form :model="form" :rules="rules" ref="form" label-width="120px">
        <el-form-item label="大专以上人数:">
          <el-input v-model="form.collegeNum" min="0" type="number" placeholder="大专以上人数" oninput="if(value.length>9)value=value.slice(0,9)"
                    onKeypress="return (/[\d]/.test(String.fromCharCode(event.keyCode)))"></el-input>
        </el-form-item>
      </el-form>
      <el-form :model="form" :rules="rules" ref="form" label-width="120px">
        <el-form-item label="本科以上人数:">
          <el-input v-model="form.universityNum" min="0" type="number" placeholder="本科以上人数" oninput="if(value.length>9)value=value.slice(0,9)"
                    onKeypress="return (/[\d]/.test(String.fromCharCode(event.keyCode)))"></el-input>
        </el-form-item>
      </el-form>
      <el-form :model="form" :rules="rules" ref="form" label-width="120px">
        <el-form-item label="硕士以上人数:">
          <el-input v-model="form.masterNum" min="0" type="number" placeholder="硕士以上人数" oninput="if(value.length>9)value=value.slice(0,9)"
                    onKeypress="return (/[\d]/.test(String.fromCharCode(event.keyCode)))"></el-input>
        </el-form-item>
      </el-form>
      <el-form :model="form" :rules="rules" ref="form" label-width="120px">
        <el-form-item label="博士以上人数:">
          <el-input v-model="form.doctorNum" min="0" type="number" placeholder="博士以上人数" oninput="if(value.length>9)value=value.slice(0,9)"
                    onKeypress="return (/[\d]/.test(String.fromCharCode(event.keyCode)))"></el-input>
        </el-form-item>
      </el-form>
      <el-form :model="form" :rules="rules" ref="form" label-width="120px">
        <el-form-item label="初级职称人数:">
          <el-input v-model="form.lowLevelNum" min="0" type="number" placeholder="初级职称人数" oninput="if(value.length>9)value=value.slice(0,9)"
                    onKeypress="return (/[\d]/.test(String.fromCharCode(event.keyCode)))"></el-input>
        </el-form-item>
      </el-form>
      <el-form :model="form" :rules="rules" ref="form" label-width="120px">
        <el-form-item label="中级职称人数:">
          <el-input v-model="form.midLevelNum" min="0" type="number" placeholder="中级职称人数" oninput="if(value.length>9)value=value.slice(0,9)"
                    onKeypress="return (/[\d]/.test(String.fromCharCode(event.keyCode)))"></el-input>
        </el-form-item>
      </el-form>
      <el-form :model="form" :rules="rules" ref="form" label-width="120px">
        <el-form-item label="高级职称人数:">
          <el-input v-model="form.highLevelNum" min="0" type="number" placeholder="高级职称人数" oninput="if(value.length>9)value=value.slice(0,9)"
                    onKeypress="return (/[\d]/.test(String.fromCharCode(event.keyCode)))"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button class="bg_blue" @click="handleUpdate">确 定</el-button>
        <el-button @click="handleCancel">取 消</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
  import {queryCrmCompanyInfo, updateCrmCompanyPersonnelStatistics} from '@/api/customerCenter'

  export default {
    data() {
      return {
        //列表参数
        listParams: {
          page: 0,
          pageSize: 20
        },

        //获取列表数据的字段
        listData: {},

        //编辑提交的字段
        form: {},
        rules: {},

        //编辑窗口---显示/隐藏
        updateVisible: false,
      }
    },
    props: ['id','isContractListSkipFlag'],

    mounted() {
      if (this.id) {
        this.getCompanyList();
      }
    },

    filters: {
      lengthFilter(val) {
        if (val == undefined || val == "" || val == null || !val) {
          return '-'
        } else {
          return val
        }
      }
    },


    methods: {
      //获取列表数据
      getCompanyList() {
        this.listParams = {page: 0, pageSize: 20};
        this.listParams.crmCompanyId = this.id;
        if(this.isContractListSkipFlag){
          this.listParams.isContractListSkipFlag = Number(this.isContractListSkipFlag);
        }
        queryCrmCompanyInfo(this.listParams).then(res => {
          if (res.code === 200) {
            this.listData = JSON.parse(JSON.stringify(res.data.data[0]));
            this.form = res.data.data[0];

            if (!res.data.data[0].socialSecurityNum || res.data.data[0].socialSecurityNum == "") {
              this.$set(this.form, 'socialSecurityNum', 0)
            }
            if (!res.data.data[0].technologyNum || res.data.data[0].technologyNum == "") {
              this.$set(this.form, 'technologyNum', 0)
            }
            if (!res.data.data[0].collegeNum || res.data.data[0].collegeNum == "") {
              this.$set(this.form, 'collegeNum', 0)
            }
            if (!res.data.data[0].universityNum || res.data.data[0].universityNum == "") {
              this.$set(this.form, 'universityNum', 0)
            }
            if (!res.data.data[0].masterNum || res.data.data[0].masterNum == "") {
              this.$set(this.form, 'masterNum', 0)
            }
            if (!res.data.data[0].doctorNum || res.data.data[0].doctorNum == "") {
              this.$set(this.form, 'doctorNum', 0)
            }
            if (!res.data.data[0].lowLevelNum || res.data.data[0].lowLevelNum == "") {
              this.$set(this.form, 'lowLevelNum', 0)
            }
            if (!res.data.data[0].midLevelNum || res.data.data[0].midLevelNum == "") {
              this.$set(this.form, 'midLevelNum', 0)
            }
            if (!res.data.data[0].highLevelNum || res.data.data[0].highLevelNum == "") {
              this.$set(this.form, 'highLevelNum', 0)
            }
          }
        })
      },

      // 保存
      handleUpdate() {
        this.form.crmCompanyId = this.id;
        if (this.form.socialSecurityNum == "") {
          this.form.socialSecurityNum = 0;
        }
        if (this.form.technologyNum == "") {
          this.form.technologyNum = 0;
        }
        if (this.form.collegeNum == "") {
          this.form.collegeNum = 0;
        }
        if (this.form.universityNum == "") {
          this.form.universityNum = 0;
        }
        if (this.form.masterNum == "") {
          this.form.masterNum = 0;
        }
        if (this.form.doctorNum == "") {
          this.form.doctorNum = 0;
        }
        if (this.form.lowLevelNum == "") {
          this.form.lowLevelNum = 0;
        }
        if (this.form.midLevelNum == "") {
          this.form.midLevelNum = 0;
        }
        if (this.form.highLevelNum == "") {
          this.form.highLevelNum = 0;
        }

        updateCrmCompanyPersonnelStatistics(this.form).then(res => {
          if (res.code === 200) {
            this.$message.success(res.data.message ? res.data.message : '保存成功!')
            this.updateVisible = false
            this.getCompanyList()
          }
        })
      },
      // 取消
      handleCancel() {
        this.updateVisible = false
        this.getCompanyList()
      }

    }
  }
</script>
<style lang="less" scoped>
  ul li {
    list-style: none;
  }

  .sales-plan-box {
    margin: auto 5%;

    .list {
      background: rgba(255, 255, 255, 1);
      box-shadow: 0 3px 12px rgba(5, 170, 255, 0.08);
      margin-top: 16px;

      .list-title {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 5px 16px;
        box-shadow: -1px 2px 12px rgba(5, 170, 255, 0.08);

        .left {
          display: flex;
          align-items: center;

          .title-text {
            display: flex;
            align-items: center;
            margin-right: 38px;

            .line {
              margin-right: 8px;
              display: inline-block;
              width: 3px;
              height: 14px;
              background: rgba(255, 169, 106, 1);
            }

            .btn {
              display: flex;
              align-items: center;
              justify-content: center;
              margin-right: 20px;
              padding: 4px 9px;
              font-size: 16px;
              color: rgba(5, 170, 255, 1);
              border: 1px solid rgba(5, 170, 255, 1);
              border-radius: 2px;
              cursor: pointer;

              &:hover {
                color: #fff;
                background: rgba(5, 170, 255, 1);
              }

              &.del {
                border: 1px solid rgba(245, 108, 108, 1);
                color: rgba(245, 108, 108, 1);

                &:hover {
                  color: #fff;
                  background: rgba(245, 108, 108, 1);
                }
              }

              &:active {
                opacity: .5;
              }
            }
          }
        }
      }

      .list-detail {
        padding: 10px 40px;

        table {
          width: 100%;

          tr {
            height: 30px;
          }
        }
      }
    }

    .bg_blue {
      background: #05AAFF;
      color: #fff;

      &:hover {
        background: #05AAFF;
        opacity: 0.5;
      }
    }

  }

</style>
