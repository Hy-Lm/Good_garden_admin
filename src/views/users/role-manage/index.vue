<template>
  <el-container>
    <el-header>
      <el-button size="mini" type="primary" icon="el-icon-edit" @click="newRole">新增角色</el-button>
    </el-header>
    <el-main>
      <el-table size="mini" :data="tableData" border style="width: 100%">
        <el-table-column label="角色名称">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.date }}</span>
          </template>
        </el-table-column>
        <el-table-column label="角色编码">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>姓名: {{ scope.row.name }}</p>
              <p>住址: {{ scope.row.address }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">{{ scope.row.name }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="角色状态">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>姓名: {{ scope.row.name }}</p>
              <p>住址: {{ scope.row.address }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">{{ scope.row.name }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="备注">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>姓名: {{ scope.row.name }}</p>
              <p>住址: {{ scope.row.address }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">{{ scope.row.name }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="创建时间">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>姓名: {{ scope.row.name }}</p>
              <p>住址: {{ scope.row.address }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">{{ scope.row.name }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="300">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="setLimit">设置权限</el-button>
            <el-button size="mini" type="primary" @click="edit">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
    <mydialog
    :isWho="isWho"
    :title="title"
    :treedata="treedata"
    :defaultProps="defaultProps"
    :dialogFormVisible="dialogFormVisible"
    :form="form"
    :mess="mess"
    @close="close"
    @surePower="surePower"
    @cancel="cancel"
    @sureDel="sureDel"
    ></mydialog>
  </el-container>
</template>
<script>
import mydialog from "./component/dialog"
export default {
  data() {
    return {
      dialogFormVisible: false, //控制弹框的显示与否
      //弹框--start
      form: {},
      title: "", //弹框标题
      mess: "", //非表单的数据
      isWho: 1, //判断弹框的样式
      //树形控件数据--start
      treedata: [
        {
          id: 1,
          label: "一级 1",
          children: [
            {
              id: 4,
              label: "二级 1-1",
              children: [
                {
                  id: 9,
                  label: "三级 1-1-1"
                },
                {
                  id: 10,
                  label: "三级 1-1-2"
                }
              ]
            }
          ]
        },
        {
          id: 2,
          label: "一级 2",
          children: [
            {
              id: 5,
              label: "二级 2-1"
            },
            {
              id: 6,
              label: "二级 2-2"
            }
          ]
        },
        {
          id: 3,
          label: "一级 3",
          children: [
            {
              id: 7,
              label: "二级 3-1"
            },
            {
              id: 8,
              label: "二级 3-2"
            }
          ]
        }
      ],
      defaultProps: {
        children: "children",
        label: "label"
      },
      //树形控件数据--end
      //弹框--end
      user_phone: "", //头部输入框
      tableData: [
        {
          //表格对应的数据
          date: "1",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        }
      ]
    };
  },
  methods: {
    //添加新用户
    newRole() {
      this.isWho = 1;
      this.title = "新增角色";
      this.dialogFormVisible = true;
      this.form = {
        rolename: "",
        rolenum: ""
      };
    },
    // 设置权限
    setLimit() {
      this.isWho = 2;
      this.title = "设置权限";
      this.dialogFormVisible = true;
    },
    // 点击编辑按钮
    edit() {
      this.isWho = 1;
      this.title = "新增角色";
      this.dialogFormVisible = true;
      this.form = {
        rolename: "",
        rolenum: ""
      };
    },
    // 删除
    handleDelete() {
      this.isWho = 3;
      this.title = "提示";
      this.mess = "是否将角色监理删除";
      this.dialogFormVisible = true;
    },
    // 删除弹框的按钮
    sureDel() {

    },
    // 弹框对应的取消事件
    cancle() {
      this.dialogFormVisible = false;
    },
    // 树形弹框--start
    cancel() {
      this.dialogFormVisible = false;
    },
    surePower() {

    },
    // 树型弹框--end
    //添加新用户表单中的重置
    reset() {},
    // 添加新用户表单中的立即创建
    create() {},
    // 关闭弹框
    close() {
      this.dialogFormVisible = false;
    }
    // 树形控件--start

    // 树形控件--end
  },
  components: {
    mydialog
  }
};
</script>
<style lang="scss">
// 修改的elementui的样式
.el-header {
  @extend %flex-center-row;
  justify-content: flex-start;
  .el-input {
    width: 200px;
    margin-right: 10px;
    .el-input__inner {
      width: 200px;
      height: 50px;
      display: inline-block;
    }
  }
  .el-button {
    width: 117px;
    height: 50px;
    margin-right: 10px;
  }
}
</style>
<style lang="scss" scoped>
</style>