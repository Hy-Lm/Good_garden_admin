import request from '@/plugin/axios'

// api 
export  const banners = (data) => {
    return request({
        url: '/api/search/repositories',
        method: 'get',
        params: data
    })
}
