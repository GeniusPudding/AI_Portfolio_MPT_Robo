import axios from "./api";

export const query = (url, params) => {
  return axios({
    url: url,
    method: "get",
    params,
  });
};

export const upload = (url, data, header) => {
  return axios({
    url: url,
    method: "post",
    header,
    data,
  });
};

// 2020-10-30 新增錯誤處理掛載到$api
export const handlerErr = (err) => {
  // if (!err || !err.response) return alert("系統繁忙中，請稍後再試！");
  // return alert(err.response.data.message);

  var msg = "系統繁忙中，請稍後再試！";
  if (err && err.response) {
    if (err.response.hasOwnProperty("data")) {
      if (err.response.data.hasOwnProperty("Status")) {
        msg = err.response.data.Status.Desc;
      }
    }
  }
  return alert(msg);
};

export default {
  query,
  upload,
  handlerErr,
};
