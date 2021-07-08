// 菜单 侧边栏
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
	    title: 'home',
	    icon: 'folder-o',
	    children: [
	        { path: '/home/homes', title: 'homes' },
	      
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
