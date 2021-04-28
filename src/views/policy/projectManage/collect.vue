<!-- 文件资料增删改查页面 -->
<template>
  <div class="app-container">
    <div class="filter-container">
      <el-row :gutter="10">
        <el-col :span="10">
          <el-input class="filter-item" placeholder="项目名称" v-model="project_name" readonly>
          </el-input>
        </el-col>
        <el-col :span="3">
          <el-button class="filter-item" type="success"  style="margin-left: 100px;" v-waves icon="el-icon-edit" @click="AddMainItem">创建</el-button>
        </el-col>
      </el-row>
    </div>

    <el-table :key='tableKey' :data="CollectList" ref="collect_table" v-loading="listLoading" border fit
              style="width: 100%;" row-key="num" :tree-props="{children: 'children'}"  :default-expand-all="true" >
      <el-table-column align="center" width="65" label="次序" type="selection">
        <template slot-scope="scope" v-if="scope.row.is_parent">
          <span v-if="!scope.row.edit">{{scope.row.idx}}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="120px" header-align="center"  label="材料类型">
        <template slot-scope="scope">
          <template v-if="scope.row.edit">
            <el-select width="80%" v-if="scope.row.edit && scope.row.is_main" clearable  class="filter-item"
                       v-model="scope.row.material_type" placeholder="事件类型" >
              <el-option v-for="item in material_type_list" :value="item.dict_value" :key="item.dict_value" :label="item.dict_value">
              </el-option>
            </el-select>
          </template>
          <span v-else>
            <span >{{ scope.row.material_type }}</span>
            <el-button v-if="scope.row.children" type="primary" size="mini" icon="el-icon-plus" @click="ParentAddItem(scope.row)"></el-button>
          </span>
        </template>
      </el-table-column>


      <el-table-column min-width="100px" align="center" label="材料名称">
        <template slot-scope="scope">
          <template v-if="!scope.row.is_main">
            <el-input v-if="scope.row.edit" style="margin-left: 10px; width: 90%;" class="edit-input" size="small"
                      v-model="scope.row.material_name"></el-input>
            <span v-else>{{ scope.row.material_name }}</span>
          </template>
        </template>
      </el-table-column>

      <el-table-column min-width="100px" align="center" label="资料所需要求">
        <template slot-scope="scope">
          <template v-if="!scope.row.is_main">
            <el-input v-if="scope.row.edit" style="margin-left: 10px; width: 90%;" class="edit-input" size="small"
                      v-model="scope.row.material_need"></el-input>
            <span v-else>{{ scope.row.material_need }}</span>

          </template>
        </template>
      </el-table-column>

      <el-table-column min-width="100px" align="center" label="材料模板文件">
        <template slot-scope="scope">
          <template v-if="!scope.row.is_main">
            <div v-if="!scope.row.material_url || scope.row.edit ">
              <el-upload
                class="upload-box upload-box-width"
                :action="host + upload_url"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :file-list="fileList"
                :on-change="(file)=> onUploadChange(file, scope.row)"
                :show-file-list="true"
                :data="uploadData"
                :limit="limit">
                <i class="el-icon-upload"></i>
                <span style="margin:10px;color:gray;cursor: default;display: inline-block">{{scope.row.material_url?'已上传':'未上传'}}

                </span>
              </el-upload>
              <i v-if="scope.row.material_url" class="el-icon-error" @click="removeFile(scope.row)"></i>
            </div>
            <el-popover  v-else
                         placement="top-start"
                         width="200"
                         trigger="hover"
                         :content="scope.row.material_file_name">
              <el-button slot="reference" class="download-btn" @click="preview_one(scope.row)">{{scope.row.material_url?'下载':'未上传'}}</el-button>

            </el-popover>
          </template>
        </template>
      </el-table-column>

      <el-table-column min-width="100px" align="center" label="备注">
        <template slot-scope="scope">
          <template v-if="scope.row.edit&!scope.row.children ">
            <el-input style="margin-left: 10px; width: 90%;" class="edit-input" size="small" v-model="scope.row.remarks"></el-input>
          </template>
          <span v-else>{{ scope.row.remarks }}</span>
        </template>
      </el-table-column>


      <el-table-column align="center" label="操作" width="230px" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" v-if="!scope.row.edit"   size="mini" @click="goEdit(scope.row)">编辑</el-button>
          <el-button type="primary" v-else=""   size="mini" @click="goSure(scope.row)">确定</el-button>
          <el-button type="danger"   size="mini" @click="goDel(scope.row.num)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--<el-divider></el-divider>-->
    <div style="text-align: right;margin-top: 50px">
      <el-button type="primary" @click="submitForm()">保存</el-button>
      <el-button @click="goback">取消</el-button>
    </div>



  </div>
</template>

<script>
  import waves from '@/directive/waves' // 水波纹指令
  // import AreaSelect from '@/components/AreaSelect/AreaSelect'
  // import { GetProjectMaterialList, SaveProjectMaterial } from '@/api/grp'
  import axios from 'axios'

  export default {
    name: 'complexTable',
    directives: {
      waves
    },
    // components: {
    //   AreaSelect
    // },
    data() {
      return {
        count: 1,
        tableKey: 0,
        host: process.env.BASE_API,
        upload_url: '/core/upload-files-api/',
        uploadData: { save_path: 'project_material/' },
        limit: 1,
        fileList: [],
        CollectList: [],
        total: null,
        listLoading: false,
        num: 1,
        project_name: '',
        material_type_list: []
      }
    },
    filters: {
    },
    created() {
    },
    mounted() {
      if (this.$route.query.id) {
        this.id = this.$route.query.id
      }
      this.getList()
    },
    methods: {
      getList() {
        // GetProjectMaterialList({ id: this.id }).then(res => {
        //   if (res.data.code === 1) {
        //     this.CollectList = this.initList(res.data.data)
        //     this.project_name = res.data.project_name
        //     this.material_type_list = res.data.material_type_list
        //     this.CollectList.map(item => {
        //       item.is_main = true
        //     })
        //   }
        // })
      },

      handlePreview(file) {
      },
      handleRemove(file, fileList) {
        this.ruleForm.official_file = null
      },
      removeFile(data) {
        data.material_file_name = null
        data.material_url = null
      },
      preview_one(file_obj) {
        this.a_downfile(this.host + file_obj.material_url, file_obj.material_file_name)
      },
      a_downfile(path, filename) {
        window.open(path, '_blank')
      },
      mydownfile(path, filename) {
        const downloadFile = (params) => {
          return axios({
            url: params,
            method: 'get',
            responseType: 'blob'
          })
        }
        downloadFile(path).then(data => {
          if (!data) {
            return false
          }
          const url = window.URL.createObjectURL(data.data)
          const link = document.createElement('a')
          link.style.display = 'none'
          link.href = url
          link.setAttribute('download', filename)
          document.body.appendChild(link)
          link.click()
          // 销毁添加的a标签
          setTimeout(() => {
            link.parentNode.removeChild(link)
          }, 200)
        })
      },
      onUploadChange(file, data) {
        var form = data
        if (file.response) {
          form.material_url = file.response.url
          form.material_file_name = file.response.original
        }
      },

      handleFilter() {
        this.listQuery.page = 1
        this.getList()
      },
      handleSizeChange(val) {
        this.listQuery.limit = val
        this.getList()
      },
      handleCurrentChange(val) {
        this.listQuery.page = val
        this.getList()
      },
      AddMainItem() {
        // 添加主项
        var idx = this.CollectList.length + 1
        var obj = { material_name: '', edit: true, children: [], is_parent: true, is_main: true, idx: idx }
        this.setNum(obj)
        this.CollectList.push(obj)
      },
      ParentAddItem(data) {
        // 主项下添加子项
        var obj = { material_name: '', edit: true, is_main: false, material_need: '', remarks: '',
          file_mould: null }
        this.setNum(obj)
        data.children.push(obj)
      },
      goDel(num) {
        var data = this.CollectList
        for (var p_item in data) {
          if (data[p_item].num === num) {
            data.splice(p_item, 1)
            break
          }
          if (data[p_item].children) {
            for (var item in data[p_item].children) {
              if (data[p_item].children[item].num === num) {
                data[p_item].children.splice(item, 1)
                return
              }
            }
          }
        }
      },
      submitForm() {
        if (!this.checkList()) {
          this.$message.error('主项必须添加子项')
          return
        }
        var form = this.CollectList
        // SaveProjectMaterial({ id: this.id, data: form }).then(response => {
        //   if (response.data.code === 1) {
        //     this.$message({
        //       message: '操作成功',
        //       type: 'success'
        //     })
        //     this.$router.go(-1)
        //   }
        // })
      },
      checkList() {
        for (var item in this.CollectList) {
          if (this.CollectList[item].is_main) {
            if (this.CollectList[item].children.length === 0) {
              return false
            }
          }
        }
        return true
      },
      setNum(data) {
        data.num = this.num
        this.num += 1
      },
      initList(data) {
        for (var p_item in data) {
          data[p_item].edit = false
          this.setNum(data[p_item])
          if (data[p_item].children) {
            for (var item in data[p_item].children) {
              data[p_item].children[item].edit = false
              this.setNum(data[p_item].children[item])
            }
          }
        }
        return data
      },
      goback() {
        this.$router.go(-1)
      },
      getArea(val) {
        this.listQuery.areaId = val
      },
      goEdit(data) {
        data.edit = true
      },
      goSure(data) {
        data.edit = false
      },
      changeType() {
        var lists = this.CollectList
        for (var item in lists) {
          if (!lists[item].is_main) {
            lists[item].material_type = ''
          } else {
            for (var c_item in lists[item].children) {
              lists[item].children[c_item].material_type = ''
            }
          }
        }
      }
    }
  }
</script>

<style scoped>
  .download-btn {
    border: none;
    background: none;
  }

</style>
