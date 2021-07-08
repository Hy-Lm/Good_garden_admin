import layoutHeaderAside from '@/layout/header-aside'

// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/libs/util.import.' + process.env.NODE_ENV)

/**
 * 在主框架内显示
 */
const frameIn = [
  {
    path: '/',
    redirect: { name: 'index' },
    component: layoutHeaderAside,
    children: [
      // 首页
      {
        path: 'index',
        name: 'index',
        meta: {
          auth: true
        },
        component: _import('system/index')
      },
      //******************************用户管理start
      {
        path: '/users/user-manage',
        name: 'user_manage',
        meta: {
          title: '用户管理',
          auth: true
        },
        component: _import('users/user-manage')
      },
      // 角色管理
      {
        path: '/users/role-manage',
        name: 'role_manage',
        meta: {
          title: '角色管理',
          auth: true
        },
        component: _import('users/role-manage')
      },
      // 单位管理
      {
        path: '/users/unit-manage',
        name: 'unit_manage',
        meta: {
          title: '单位管理',
          auth: true
        },
        component: _import('users/unit-manage')
      },
      // 菜单管理
      {
        path: '/users/menue-manage',
        name: 'menue_manage',
        meta: {
          title: '菜单管理',
          auth: true
        },
        component: _import('users/menue-manage')
      },
	  // home
	  {
	    path: '/home/homes',
	    name: 'homes',
	    meta: {
	      title: 'home',
	      auth: true
	    },
	    component: _import('home/homes')
	  },
      // ******************************系统设置end
      // 页面重定向 必须保留
      {
        path: 'redirect/:route*',
        name: 'redirect',
        hidden: true,
        component: _import('system/function/redirect')
      }
    ]
  }
]

/**
 * 在主框架之外显示
 */
const frameOut = [
  // 登录
  {
    path: '/login',
    name: 'login',
    component: _import('system/login')
  }
]

/**
 * 错误页面
 */
const errorPage = [
  {
    path: '*',
    name: '404',
    component: _import('system/error/404')
  }
]

// 导出需要显示菜单的
export const frameInRoutes = frameIn

// 重新组织后导出
export default [
  ...frameIn,
  ...frameOut,
  ...errorPage
]
