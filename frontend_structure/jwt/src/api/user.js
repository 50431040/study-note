import axios from '../libs/ajaxRequest'

// 获取用户
export const getUser = () => {
    return axios.request({
        url: "/user",
        method: "GET"
    })
}

export const login = (username) => {
    return axios.request({
        url: "/login",
        method: "POST",
        data: {
            username
        }
    })
}