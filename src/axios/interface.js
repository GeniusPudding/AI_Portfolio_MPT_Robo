import axiosEC from "./apiEC";
import axiosWF09 from "./apiTaste";

export const getEC = (url, params,header) => {
    return axiosEC({
        url: url,
        method: 'get',
        headers: header,
        params: params
    })
}

export const postEC = (url, data, header) => {
    return axiosEC({
        url: url,
        method: 'post',
        headers: header,
        data: data
    })
}

export const getWF09 = (url, params, header) => {
    return axiosWF09({
        url: url,
        method: 'get',
        headers: header,
        params: params
    })
}

export const postWF09 = (url, data, header) => {
    return axiosWF09({
        url: url,
        method: 'post',
        headers: header,
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
                console.log('err.response.data:', err.response.data)
                msg = err.response.data.Status.Desc
            }
        }
    }
    return alert(msg)
}

export default {
    getWF09,
    postWF09,
    handlerErr,
    postEC,
    getEC
}