import md5 from 'blueimp-md5'
import dayjs from 'dayjs'

// var folder = location.pathname == '/' ? '/twb/' : location.pathname 
// API doc: https://www.jlf.com.tw/api/twb/apidocs/#/
// const baseURL = 'https://www.jlf.com.tw/api/twb/'
const baseURL = 'http://10.20.1.7/www/'
const today = dayjs(new Date()).format('YYYY-MM-DD')

export default {
    baseURL: baseURL,
    headers: {
        // 'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json',//;charset=UTF-8
        // Authorization: md5(`${today} Franklin`)
    }
}