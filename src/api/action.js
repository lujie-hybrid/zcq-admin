import axios from "./axios";

// get请求
export function getAction(url, params) {
  return axios({
    method: "get",
    url,
    params,
  });
}

// post请求
export function postAction(url, data) {
  return axios({
    method: "post",
    url,
    data,
  });
}
