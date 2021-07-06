export default {
    // 验证用户名
    validatorName: (rule, value, callback) => {
        console.log(value)
        const pattern =  /^[a-zA-Z]{4,20}$/
        if (value !== "") {
            if (!pattern.test(value)) {
                callback(new Error('用户名由4-20位字母组成'))
            } else {
                callback()
            }
        }
        else {
            callback(new Error('请输入用户名'))
        }
    },
    // 验证用户手机号
    validatorPhone : (rule, value, callback) => {
        const pattern = /^((0\d{2,3}-\d{7,8})|(1[3576849]\d{9}))$/
        if (value !== '') {
            if (!pattern.test(value)) {
                callback(new Error('请输入正确的电话'))
            } else {
                callback()
            }
        } else {
            callback(new Error('请输入电话'))
        }
    },
    // 验证账号
    validatorAccount: (rule, value, callback) => {
        const pattern = /^\w{4,16}$/
        if (value !== '') {
            if (!pattern.test(value)) {
                callback(new Error('账号格式：4-16为，字母、下划线、数字、减号'))
            } else {
                callback()
            }
        } else {
            callback(new Error('请输入账号'))
        }
    },
    // 验证密码
    validatorPassword: (rule, value, callback) => {
        const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*?[#?!@$%^&*-]).{6,}$/
        if (value !== '') {
            if (!pattern.test(value)) {
                callback(new Error('最少6位，至少包括一个大写字母，一个小写字母，一个数字，一个特殊字符'))
            } else {
                callback()
            }
        } else {
            callback(new Error('请输入密码'))
        }
    }
}