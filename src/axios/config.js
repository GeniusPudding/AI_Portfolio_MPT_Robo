import md5 from "blueimp-md5";
import dayjs from "dayjs";

var folder = location.pathname == "/" ? "/twb/" : location.pathname ;
const baseURL = location.hostname == "www.jlf.com.tw" ? `https://www.jlf.com.tw/api${folder}` : `https://test.jlf.com.tw/api${folder}`;
const today = dayjs(new Date()).format("YYYY-MM-DD");

export default {
  baseURL: baseURL,
  headers: {
    // "X-Requested-With": "XMLHttpRequest",
    // "Content-Type": "application/json;charset=UTF-8",
    Authorization: md5(`${today} Franklin`),
  },
};
