// Vue
import Vue from 'vue'
import App from './App'
// ant-design-vue组件
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
// import {message,inputNumber} from "ant-design-vue"

// 核心插件
import d2Admin from '@/plugin/d2admin'
// store
import store from '@/store/index'
// 多国语
import i18n from './i18n'
// 引入公共的字体文件样式
import "@/assets/style/iconfont.scss"
// 引入vue-beaty的样式
import 'vue-beauty/package/style/vue-beauty.css'
// 引入vue-beaty的组件
import vueBeauty from 'vue-beauty'

// 菜单和路由设置
import router from './router'
import menuHeader from '@/menu/header'
import menuAside from '@/menu/aside'
import { frameInRoutes } from '@/router/routes'

import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

// 核心插件
Vue.use(d2Admin)
Vue.use(VueQuillEditor)
Vue.use(vueBeauty)
Vue.use(Antd);


// 注册全局组件
// 引入全局组件
import mypopconfirm from "@/components/dialog/popconfirm"
import lineTree from "@/components/tree/line-tree"

// 将表单验证注入到全局
import validata from "@/assets/util/validator.js";
Vue.prototype.$validata = validata
// 图表注入全局
import echarts from 'echarts'  //引入echarts
Vue.prototype.$echarts = echarts  //挂载在全局

Vue.component("mypopconfirm",mypopconfirm)
Vue.component("lineTree",lineTree)

new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
  created () {
    // 处理路由 得到每一级的路由设置
    this.$store.commit('d2admin/page/init', frameInRoutes)
    // 设置顶栏菜单
    this.$store.commit('d2admin/menu/headerSet', menuHeader)
    // 设置侧边栏菜单
    this.$store.commit('d2admin/menu/asideSet', menuAside)
    // 初始化菜单搜索功能
    this.$store.commit('d2admin/search/init', menuHeader)
  },
  mounted () {
    // 展示系统信息
    this.$store.commit('d2admin/releases/versionShow')
    // 用户登录后从数据库加载一系列的设置
    this.$store.dispatch('d2admin/account/load')
    // 获取并记录用户 UA
    this.$store.commit('d2admin/ua/get')
    // 初始化全屏监听
    this.$store.dispatch('d2admin/fullscreen/listen')
  }
}).$mount('#app')
