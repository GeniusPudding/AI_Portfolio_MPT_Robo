import axios from "axios";
import config from "./config.js";
// import qs from 'qs'
// import store from "../store";

export default function $axios(options) {
    return new Promise((resolve, reject) => {
        const instance = axios.create({
            baseURL: config.baseURL,
            headers: config.headers,
        });

        // request 攔截器
        instance.interceptors.request.use(
            (config) => {
                // Tip: 1
                // 請求開始的時候可以結合 vuex 開啟全屏的 loading 動畫

                // Tip: 2
                // 帶上 token , 可以結合 vuex 或者 localStorage
                // if (store.getters.token) {
                //     config.headers['X-Token'] = getToken() // 讓每個請求攜帶token--['X-Token']為自定義key 請根據實際情況自行修改
                // } else {
                //     // 重定向到登錄頁面
                // }

                // if (store.state.open_no != "") {
                //   config.headers["Authorization"] = store.state.open_no;
                // } else {
                //   config.headers["Authorization"] = "NONE TOKEN";
                // }

                // Tip: 3
                // 根據請求方法，序列化傳來的參數，根據後端需求是否序列化
                if (config.method.toLocaleLowerCase() === "post" || config.method.toLocaleLowerCase() === "put" || config.method.toLocaleLowerCase() === "delete") {
                    // 後端要求json字串，故送出去的在這邊一次轉換
                    // config.data = qs.stringify(config.data)
                    // config.data = JSON.stringify(config.data)
                }
                return config;
            },
            (error) => {
                // 請求錯誤時做些事(接口錯誤、超時等)
                // Tip: 4
                // 關閉loading
                // console.log("request:", error);

                //  1.判斷請求超時
                if (error.code === "ECONNABORTED" && error.message.indexOf("timeout") !== -1) {
                    // console.log('根據你設置的timeout/真的請求超時 判斷請求現在超時了，你可以在這裏加入超時的處理方案')
                    // return service.request(originalRequest);//例如再重覆請求一次
                }
                //  2.需要重定向到錯誤頁面
                // const errorInfo = error.response
                // console.log(errorInfo)
                // if (errorInfo) {
                // error =errorInfo.data//頁面那邊catch的時候就能拿到詳細的錯誤信息,看最下邊的Promise.reject
                //   const errorStatus = errorInfo.status; // 404 403 500 ... 等
                //   router.push({
                //     path: `/error/${errorStatus}`
                //   })
                // }
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
                // 根據返回的code值來做不同的處理（和後端約定）
                switch (data.code) {
                    case "":
                        break;
                    default:
                }

                if (typeof data == "string") {
                    data = JSON.parse(data);
                    // data.status = response.status;
                }

                // 若不是正確的返回code，且已經登錄，就拋出錯誤
                // const err = new Error(data.description)

                // err.data = data
                // err.response = response

                // throw err
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