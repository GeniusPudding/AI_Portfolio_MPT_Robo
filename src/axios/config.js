import dayjs from "dayjs";

console.log('location.pathname:',location.pathname)
console.log('location.hostname:',location.hostname)

// var folder = location.pathname == '/' ? '/twb/' : location.pathname 
// API doc: https://www.jlf.com.tw/api/twb/apidocs/#/
// const baseURL = 'https://www.jlf.com.tw/api/twb/'
const baseURL =  location.hostname == 'localhost' 
? 'http://10.20.1.7/www/' : 'https://ai.franklin.com.tw/www/' // 'http://210.65.139.185/www/'
// const ECLoginbaseURL = location.hostname == 'etrade.fraklin.com.tw' ? 'https://etrade.fraklin.com.tw/v2' : 'https://wt.franklin.com.tw:8080/v2'
const ECbaseURL = location.hostname == 'localhost' 
    ? 'http://10.20.1.7/ec/' : 'https://ai.franklin.com.tw/ec/' // 'http://210.65.139.185/ec/'

const today = dayjs(new Date()).format('YYYY-MM-DD')

export default {
    ECbaseURL: ECbaseURL,
    baseURL: baseURL,
    headers: {
        // 'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json',//;charset=UTF-8
        // Authorization: md5(`${today} Franklin`)
    }
}