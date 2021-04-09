/* eslint-disable */
import axios from "axios";

// const ECLoginbaseURL = location.hostname == 'etrade.fraklin.com.tw' ? 'https://etrade.fraklin.com.tw/v2' : 'https://wt.franklin.com.tw:8080/v2'
const ECbaseURL = location.hostname == 'localhost' 
    ? 'http://10.20.1.7/ec/' : 'https://ai.franklin.com.tw/ec/' // 'http://210.65.139.185/ec/'
export default function $axios(options) {
    console.log('EC options:', options)
    return new Promise((resolve, reject) => {
        const instance = axios.create({
            baseURL: ECbaseURL,
        });

        // request 攔截器
        instance.interceptors.request.use(
            (config) => {
                return config;
            },
            (error) => {
                return Promise.reject(error); // 在調用的那邊可以拿到(catch)你想返回的錯誤信息
            }
        );

        // response 攔截器
        instance.interceptors.response.use(
            (response) => {
                let data;

                
                // IE9時response.data是undefined，因此需要使用response.request.responseText(Stringify後的字符串)
                if (response.data == undefined) {
                    data = response.request.responseText;
                } else {
                    data = response.data;
                }
                if(data.includes('Sortino_Ratio')){
                    data = data.replaceAll('Infinity','\"Infinity\"')
                }
                // console.log('test API response.data:',data)
                // console.log('test API response.data.code:',data.code)
                // console.log('test API response.data includes Sortino_Ratio:',data.includes('Sortino_Ratio'))

                // 根據返回的code值來做不同的處理（和後端約定）
                switch (data.code) {
                    case "":
                        break;
                    default:
                }

                if (typeof data == "string") {
                    data = JSON.parse(data);
                }
                return data;
            },
            (err) => {
                if (err && err.response) {
                    switch (err.response.status) {
                        case 400:
                            err.message = "用戶端錯誤請求錯誤";
                            break;
                        case 401:
                            err.message = "未授權";
                            break;
                        case 403:
                            err.message = "伺服器拒絕訪問";
                            break;
                        case 404:
                            err.message = `請求網址出錯: ${err.response.config.url}`;
                            break;
                        case 408:
                            err.message = "請求超時";
                            break;
                        case 500:
                            err.message = "伺服器錯誤";
                            break;
                        case 501:
                            err.message = "伺服器不支援目前請求";
                            break;
                        case 502:
                            err.message = "無效的回應";
                            break;
                        case 503:
                            err.message = "伺服器過載";
                            break;
                        case 504:
                            err.message = "連線逾時";
                            break;
                        case 505:
                            err.message = "HTTP版本不支援";
                            break;
                        default:
                            err.message = "其他錯誤";
                            break;
                    }
                }
                return Promise.reject(err);
            }
        );

        instance(options)


        .then((res) => {
                resolve(res);
                return false;
            })
            .catch((error) => {
                reject(error);
            });
    });
}