import request from '@/plugin/axios'

// 获取分类tree
export  const getClassifyTreeFn = (data) => {
    return  request({
        url: '/category/findCategoryTreeFn',
        method: 'get',
        params: data
    })
}

// 获取单位list
export  const getUnitListFn = (data) => {
    return request({
        url: '/unit/findUnitListFn',
        method: 'get',
        params: data
    })
}

// 新增商品
export const addGoodsInfoFn = (data) => {
    return request({
        url: '/goods/addGoodsInfoFn',
        method: 'post',
        params: data
    })
}

// 下架商品
export const editGoodsByStatusFn = (data) => {
    return request({
        url: '/goods/editGoodsByStatusFn',
        method: 'post',
        params: data
    })
}