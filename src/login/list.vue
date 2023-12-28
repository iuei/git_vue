<template>
  <div class="test-right">
    <el-button type="primary" @click="Cookie_user">获取Cookie</el-button>
    <el-button type="primary" @click="Token_user">获取Token</el-button>
    <el-button type="primary" @click="logout">注销</el-button>
    <el-button type="success" @click="add_dialog_visible = true">添加数据</el-button>
  </div>

  <!--  添加（弹窗）-->
  <el-dialog v-model="add_dialog_visible" title="添加数据" :close-on-click-modal="true">
    <el-form :model="commodity" :rules="rules" ref="ruleForm" label-width="200" class="demo-ruleForm">
      <el-form-item label="名称" prop="username">
        <el-input type="text" v-model="commodity.name" placeholder="请输入名称"></el-input>
      </el-form-item>
      <el-form-item label="价格" prop="cell">
        <el-input type="text" v-model="commodity.price" placeholder="请输入价格"></el-input>
      </el-form-item>
      <el-form-item label="类型" prop="username">
        <el-input type="text" v-model="commodity.type" placeholder="请输入类型"></el-input>
      </el-form-item>
      <div>
        <el-button type="primary" @click="add">立即添加</el-button>
        <el-button @click="add_dialog_visible = false">取消</el-button>
      </div>
    </el-form>
  </el-dialog>

  <el-table :data="commodity.tableData" style="width: 100%">
    <el-table-column prop="id" label="ID" width="180"/>
    <el-table-column prop="name" label="Name" width="180"/>
    <el-table-column prop="price" label="Price" width="180"/>
    <el-table-column prop="type" label="Type"/>
    <el-table-column prop="address" label="操作" width="180" class="operate">
      <el-button>编辑</el-button>
      <el-button>删除</el-button>
    </el-table-column>
  </el-table>
</template>

<script>
import axios from "axios";
import Cookies from "js-cookie";

export default {
  name: 'home',

  data() {
    return {

      add_dialog_visible: false,
      baseUrl: 'http://localhost:5000',
      commodity: {
        name: '',
        type: '',
        token: '',
        price: '',
        userCookie: '',
        tableData: [],
      },
      // 表单规则
      rules: {
        name: [{required: true, message: '请输入内容', trigger: 'blur'}],
      },
      ruleForm: {
        tid: 0,
        name: '',
        status: '1',
        pay_type: '1',
        icon_url: '',
        image_list: [],
        curren_img: ''
      },
    };
  },

  created: function () {
    this.fetchTableData(); // 在组件挂载后触发数据加载
  },

  methods: {
    //加载数据
    fetchTableData() {
      axios.get(this.baseUrl + '/commodity/commodity')
          .then(response => {
            this.commodity.tableData = response.data;
          })
          .catch(error => {
            console.error('Error fetching table data:', error);
            console.log('Response:', error.response);
          });
    },

    add() {
      const commodity = {
        name: this.commodity.name,
        type: this.commodity.type,
        price: this.commodity.price,
      };
      axios.post(this.baseUrl + '/commodity/add', commodity)
          .then(response => {
            this.$message.success('添加成功')
            this.add_dialog_visible = false;
            this.fetchTableData();
            //添加成功后清空添加弹窗的数据
            this.commodity.name='';
            this.commodity.type='';
            this.commodity.price='';
          })
          .catch(error => {
            console.log(error.response.data)
          })
    },

    //获取用户Cookie
    Cookie_user() {
      const userCookie = Cookies.get("user");
      if (userCookie) {
        console.log("用户姓名:", JSON.parse(userCookie));
        this.user_list.userCookie = JSON.parse(userCookie);
      } else {
        console.log("用户 cookie 不存在");
      }
    },

    Token_user() {
      // 从 Cookie 中读取 Token
      const token = Cookies.get("token");
      // 在控制台输出 Token
      console.log("Token:", token);
    },

    // 注销
    logout() {
      // 清除 Token 和相关 cookie 数据
      this.user_list.token = null;
      Cookies.remove("token");
      Cookies.remove("user");
      this.$router.push('/login')
      this.$message.success("注销成功")
    },
  },
};
</script>

<style scoped>
.test-right {
  text-align: right
}
</style>
