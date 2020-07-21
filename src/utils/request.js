import Axios from "axios";
import { MessageBox, Message } from "element-ui"
import store from "@/store";

// 创建axios实例
const axios = Axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  // withCredentials:true, // 跨域时若需要发送cookies需设置该选项
  timeout: 5000
})

// 请求拦截
axios.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers['authorization'] = 'Bearer '+ token;
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

//相应拦截
axios.interceptors.response.use(
  response => {
    const res = response.data;
    if (res.code !==1) {
      Message({
        message: res.message || "Error",
        type: "error",
        duration: 5*1000
      })

      if(res.code === 10008 || res.code === 10012 || res.code === 10014) {
        MessageBox.confirm(
          "登录状态异常，请重新登录",
          "确认登录信息",
          {
            confirmButtonText: "重新登录",
            cancelButtonText: "取消",
            type: "warning"
          }
        ).then(() => {
          store.dispatch("user/resetToken").then(() => {
            location.reload()
          })
        })
      }
      return Promise.reject(new Error(res.message || "Error"))
    } else {
      return res;
    }
  },
  error => {
    Message({
      message: error.message,
      type: "error",
      duration: 5 * 1000
    });
    return Promise.reject(error);
  }
)

export default axios