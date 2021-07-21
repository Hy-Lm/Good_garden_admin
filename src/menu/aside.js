// 菜单 侧边栏
export default [
    { path: '/index', title: '首页', icon: 'home' },
    // {
    //     title: '用户管理',
    //     icon: 'folder-o',
    //     children: [
    //         { path: '/users/user-manage', title: '用户管理' },
    //         { path: '/users/role-manage', title: '角色管理' },
    //         { path: '/users/unit-manage', title: '单位管理' },
    //         { path: '/users/menue-manage', title: '菜单管理' }
    //     ]
    // },
	// 预约管理
	{
	    title: '预约管理',
	    icon: 'folder-o',
	    children: [
	        { path: '/make/makes', title: '预约管理' },
	      
	    ]
	},
	// 商品管理
	{
	    title: '商品管理',
	    icon: 'folder-o',
	    children: [
	        { path: '/commodity/goodsShelves', title: '货架商品管理' },
			{ path: '/commodity/IntegralGoods', title: '积分商品管理' },
	      
	    ]
	},
	// 用户管理
	{
	    title: '用户管理',
	    icon: 'folder-o',
	    children: [
	        { path: '/management/managements', title: '用户管理' },
	      
	    ]
	},
	// 订单处理
	{
	    title: '订单处理',
	    icon: 'folder-o',
	    children: [
	        { path: '/processing/processings', title: '订单处理' },
	      
	    ]
	},
	// 退款管理
	{
	    title: '退款管理',
	    icon: 'folder-o',
	    children: [
	        { path: '/refund/refunds', title: '退款管理' },
	      
	    ]
	},
	// 图片管理
	{
	    title: '图片管理',
	    icon: 'folder-o',
	    children: [
	        { path: '/picture/pictures', title: '图片管理' },
	      
	    ]
	},
	// /管理员列表
	{
	    title: '管理员列表',
	    icon: 'folder-o',
	    children: [
	        { path: '/controller/controllers', title: '管理员列表' },
	      
	    ]
	},
    // {
    //     title: '工序管理',
    //     icon: 'folder-o',
    //     children: [
    //         { path: '/process/process-module', title: '模板管理' },
    //         { path: '/process/node', title: '工序节点' }
    //     ]
    // },
    // {
    //     title: '材料管理',
    //     icon: 'folder-o',
    //     children: [
    //         { path: '/material/material-type', title: '材料类型' },
    //         { path: '/material/building-materials', title: '建筑材料' }
    //     ]
    // },
]
