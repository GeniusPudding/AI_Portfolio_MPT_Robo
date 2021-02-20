import axios from './api'
import axiosEC from './apiEC'

export const login = (url, data, header) => {
    console.log('check ECheaders:', header)
    console.log('check EC data:', data)
    return axiosEC({
        url: url,
        method: 'post',
        headers: header,
        data: data
    })
}

export const query = (url, params) => {
    return axios({
        url: url,
        method: 'get',
        params
    })
}

export const upload = (url, data, header) => {
    return axios({
        url: url,
        method: 'post',
        header: header,
        data:data
    })
}

// 2020-10-30 新增錯誤處理掛載到$api
export const handlerErr = (err) => {
    // if (!err || !err.response) return alert('系統繁忙中，請稍後再試！');
    // return alert(err.response.data.message);
    console.log('err:', err)
    var msg = '系統繁忙中，請稍後再試！'
    if (err && err.response) {
        if (err.response.hasOwnProperty('data')) {
            if (err.response.data.hasOwnProperty('Status')) {
                msg = err.response.data.Status.Desc
            }
        }
    }
    return alert(msg)
}

export default {
    query,
    upload,
    handlerErr,
    login
}