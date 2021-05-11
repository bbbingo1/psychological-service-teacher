<template>
  <div v-if="isLogin">
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-menu-item index="1">测试题</el-menu-item>
      <el-menu-item index="2">预约处理</el-menu-item>
      <el-menu-item index="3">留言管理</el-menu-item>
    </el-menu>
    <div class="user">
      <el-dropdown trigger="click">
        <el-button type="text">
          {{ username }}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="signOut">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
    <component :is="componentIds[activeIndex - 1]"></component>
  </div>
  <div v-loading="loadingWrap" v-else id="userLogin" :style="setBackground">
    <el-col class="warp-main" v-loading="loading" element-loading-text="拼命加载中">
      <div class="wrap">
        <form class="login">
          <p class="title">教师登录</p>
          <input v-model="username" type="text" placeholder="请输入账号" autofocus />
          <i class="fa fa-user"></i>
          <input v-model="password" type="password" placeholder="请输入密码" />
          <i class="fa fa-key"></i>
          <a class="button" @click="submit($event)">
            <span class="state">登录</span>
          </a>
        </form>
      </div>
    </el-col>
  </div>
</template>

<script>
import TestPage from './components/test-page.vue'
import Reserve from './components/reserve.vue'
import Message from './components/message.vue'
import { ElMessage } from 'element-plus'
import { login, getLoginStatus, logout } from '@/api/request'

export default {
  name: 'App',
  components: {
    TestPage,
    Reserve,
    Message
  },
  data() {
    return {
      setBackground: {
        backgroundImage: "url(" + require("@/assets/background.png") + ")",
        backgroundRepeat: "repeat"
      },
      activeIndex: "1",
      componentIds: ['TestPage', 'Reserve', 'Message'],
      isLogin: false,
      username: '',
      password: '',
      loading: false,
      loadingWrap: true
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
      this.activeIndex = key
    },
    async submit() {
      const { username, password } = this
      if (username && password) {
        try {
          this.loading = true
          await login({ username, password })
          this.isLogin = true
          this.loading = false
        } catch (err) {
          ElMessage.error(err.toString());
        }
      } else {
        ElMessage.warning('请输入账号密码');
      }
    },
    async signOut() {
      try {
        await logout()
        this.username = ''
        this.password = ''
        this.isLogin = false
      } catch (err) {
        ElMessage.error(err.toString());
      }
    }
  },
  async beforeMount() {
    try {
      const res = await getLoginStatus()
      this.loadingWrap = false
      if (res?.data?.username) {
        this.isLogin = true
        this.username = res?.data?.username
      }
    } catch (err) {
      this.isLogin = false
      this.loadingWrap = false
      // ElMessage.error(err.toString());
    }
  },
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
body {
  margin: 0;
}
.el-menu {
  padding-left: 30px !important;
}
.user {
  position: absolute;
  right: 40px;
  top: 10px;
}
</style>

<style lang="scss" scoped>
$primary: #ff9999;

#userLogin {
  position: relative;
  font-family: "Open Sans", sans-serif;
  height: 100vh;
  width: 100%;
  overflow: hidden;
  background: radial-gradient(50% 50%, #eef4f8, #b8c9d6);
}
* {
  box-sizing: border-box;
}

.wrap {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  min-height: 100%;
}

.login {
  border-radius: 2px 2px 5px 5px;
  padding: 5px 20px 5px 20px;
  width: 90%;
  max-width: 380px;
  background: #ffffff;
  position: relative;
  padding-bottom: 80px;
  background-color: #ffcc99;

  input {
    display: block;
    padding: 15px 10px;
    margin-bottom: 10px;
    width: 100%;
    border: 1px solid #ddd;
    transition: border-width 0.2s ease;
    border-radius: 2px;
    color: #ccc;

    & + i.fa {
      color: #fff;
      font-size: 1em;
      position: absolute;
      margin-top: -47px;
      opacity: 0;
      left: 0;
      transition: all 0.1s ease-in;
    }

    &:focus {
      & + i.fa {
        opacity: 1;
        left: 30px;
        transition: all 0.25s ease-out;
      }
      outline: none;
      color: #444;
      border-color: $primary;
      border-left-width: 35px;
    }
  }

  a.forget {
    font-size: 0.8em;
    color: $primary;
    text-decoration: none;
    display: inline-block;
    cursor: pointer;
  }

  a.remember {
    float: right;
    font-size: 0.8em;
    color: #444;
  }

  #remember {
    display: inline-block;
    width: auto;
    cursor: pointer;
  }

  .title {
    color: #444;
    font-size: 1.2em;
    font-weight: bold;
    margin: 10px 0 10px 0;
    border-bottom: 1px solid #eee;
    padding-bottom: 13px;
  }

  .button {
    width: 88%;
    height: 15%;
    padding: 7px 10px;
    margin: 10px auto;
    background: $primary;
    font-size: 16px;
    color: #fff;
    display: block;
    border: none;
    position: absolute;
    left: 6%;
    bottom: 8%;
    max-height: 60px;
    border: 0px solid rgba(0, 0, 0, 0.1);
    border-radius: 0 0 2px 2px;
    transform: rotateZ(0deg);
    transition: all 0.1s ease-out;
    border-bottom-width: 7px;
    z-index: 4;
    cursor: pointer;

    &:hover {
      box-shadow: 0px 1px 3px $primary;
    }
    &:focus {
      border-bottom-width: 4px;
    }
    &:active {
      height: 14%;
      bottom: 8.5%;
      background: rgb(33, 139, 226);
      border: 1px solid rgb(12, 76, 87);
      -webkit-box-shadow: 0px 1px 6px 4px rgba(121, 121, 121, 0.2) inset;
      -moz-box-shadow: 0px 1px 6px 4px rgba(138, 136, 136, 0.2) inset;
      box-shadow: 0px 1px 6px 4px rgba(126, 123, 123, 0.2) inset;
    }
  }
}

.warp-main {
  float: initial;
  margin-top: 25vh;
}

input:-webkit-autofill,
input[type="text"]:focus,
input[type="password"]:focus {
  -webkit-box-shadow: 0 0 0 1000px white inset;
  box-shadow: 0 0 0 1000px white inset;
}
</style>