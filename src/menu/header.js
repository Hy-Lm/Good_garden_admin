// // 菜单 顶栏
export default [
    { path: '/index', title: '首页', icon: 'home' },
    {
        title: '用户管理',
        icon: 'folder-o',
        children: [
            { path: '/users/user-manage', title: '用户管理' },
            { path: '/users/role-manage', title: '角色管理' },
            { path: '/users/unit-manage', title: '单位管理' },
            { path: '/users/menue-manage', title: '菜单管理' }
        ]
    },
    {
        title: '分类菜单管理',
        icon: 'folder-o',
        children: [
            { path: '/mybase/category', title: '分类维护' },
            { path: '/mybase/group', title: '分组维护' },
            { path: '/mybase/unit', title: '单位维护' }

        ]
    },
    {
        title: '系统用户管理',
        icon: 'folder-o',
        children: [
            { path: '/person/user', title: '客户信息维护' },
            { path: '/person/tenant', title: '租户信息维护' }

        ]
    },
    {
        title: '商品管理',
        icon: 'folder-o',
        children: [
            { path: '/goods/manage', title: '店铺管理' },
            { path: '/goods/warehouse', title: '仓库管理' },
            { path: '/goods/evaluate', title: '评价管理' }

        ]
    },
    {
        title: '结算管理',
        icon: 'folder-o',
        children: [
            { path: '/orders/manage', title: '订单管理' }

        ]
    },


  // 恰饭
  ...process.env.VUE_APP_BUILD_MODE === 'TRAVIS' ? [
    {
      path: 'https://gio.ren/w/nP2OALom',
      title: 'Web进阶教程',
      icon: 'book'
    }
  ] : []
]
