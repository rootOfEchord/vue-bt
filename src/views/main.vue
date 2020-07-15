<template>
  <div class="index">
    <div class="header com-fc">
      <div class="logo com-fc">
        <img src="@/assets/imgs/logo.png" alt="" />
        <h2>洋葱头网课管理平台</h2>
      </div>
      <div class="">
        <p>欢迎{{ vxUserInfo.userName }}进入系统</p>
        <p>
          <span class="com-link" @click="loginOut"><i class="el-icon-back"></i>退出</span>
          <span class="com-link" @click="showEditPwd"><i class="el-icon-edit"></i>修改密码</span>
        </p>
      </div>
    </div>
    <div class="left-menu">
      <el-menu
        :default-active="activeMenu"
        class="el-menu-vertical-demo"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        unique-opened
        router
      >
        <template v-for="(item, index) in routers">
          <el-menu-item v-if="isOneChildren(item)" :index="item.path" :key="index">
            <i :class="item.meta.icon"></i>
            <span slot="title">{{ item.meta.title }}</span>
          </el-menu-item>

          <el-submenu v-else :index="item.path" :key="index">
            <template slot="title">
              <i :class="item.meta.icon"></i>
              <span>{{ item.meta.title }}</span>
            </template>
            <el-menu-item
              :index="item.path + '/' + v.path"
              v-for="v in menuChildren(item)"
              :key="v.path"
            >
              <i :class="v.meta.icon"></i>
              <span>{{ v.meta.title }}</span>
            </el-menu-item>
          </el-submenu>
        </template>
      </el-menu>
    </div>
    <div class="com-right">
      <div class="top">
        <div>当前位置:</div>
        <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb">
          <el-breadcrumb-item v-for="bread in breadList" v-bind:key="bread.name">
            {{ bread.meta.title }}
          </el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="content">
        <!-- <transition name="bounce" mode="">
          <keep-alive>
            <router-view v-if="$route.meta.isActive" />
          </keep-alive>
        </transition> -->
        <transition name="bounce" mode="">
          <router-view />
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import { defaultRouters } from '../router'
import { mapState, mapMutations, mapActions } from 'vuex'
export default {
  name: 'index',
  components: {},
  data() {
    return {
      breadList: [],
    }
  },
  computed: {
    ...mapState({
      vxRouters: 'routers',
      vxUserInfo: 'userInfo',
    }),
    activeMenu() {
      return this.$route.path.replace('/index', '')
    },
    routers() {
      return defaultRouters.concat(this.vxRouters)
    },
  },
  watch: {
    $route() {
      this.getBreadList()
    },
  },
  methods: {
    ...mapMutations({
      vxLoginOut: 'loginOut',
    }),
    ...mapActions({
      vxGetUserInfo: 'getUserInfo',
    }),
    showEditPwd() {
      this.$refs.editPwd.show()
    },
    isOneChildren(route) {
      if (!route.children) return false
      let ch = route.children.filter((item) => item.meta && item.meta.icon)
      return ch.length <= 1
    },
    menuChildren(route) {
      return route.children.filter((item) => item.meta.icon)
    },
    getBreadList() {
      this.breadList = []
      for (const routeInfo of this.$route.matched) {
        if (typeof routeInfo.name === 'string' && routeInfo.name !== 'index') {
          this.breadList.push(routeInfo)
        }
      }
    },
    loginOut() {
      this.$confirm('退出登陆, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        this.vxLoginOut()
        this.$router.replace('/login')
      })
    },
  },
  created() {
    // this.vxGetUserInfo()
  },
  mounted() {
    this.getBreadList()
  },
}
</script>

<style lang="less">
.index {
  height: 100vh;
  padding-top: 90px;
  box-sizing: border-box;
  display: flex;
  .header {
    position: fixed;
    box-sizing: border-box;
    color: #fff;
    text-align: right;
    top: 0;
    left: 0;
    width: 100%;
    height: 90px;
    padding: 0 30px;
    background-color: #353f48;
    .com-link {
      margin-left: 10px;
    }
  }
  .el-menu {
    border: none;
  }

  .left-menu {
    width: 200px;
    flex-shrink: 0;
    background-color: #353f48;
  }

  > .com-right {
    width: 100%;
    height: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column;

    .top {
      padding: 20px;
      display: flex;
      align-items: center;
      flex-shrink: 0;
    }

    .el-breadcrumb {
      margin-left: 20px;
    }

    .content {
      padding: 20px;
      height: 100%;
      overflow: hidden;
    }
  }

  // .bounce-enter-active {
  //   animation: bounce-in 0.5s;
  // }

  // .bounce-leave-active {
  //   animation: bounce-in 0.5s reverse;
  // }

  // @keyframes bounce-in {
  //   0% {
  //     transform: scale(0);
  //   }

  //   50% {
  //     transform: scale(1.5);
  //   }

  //   100% {
  //     transform: scale(1);
  //   }
  // }
}
</style>
