import axios from "axios";
import Config from '../config';
import {notification} from 'antd';

console.log(
    "当前开发模式:" +
    process.env.NODE_ENV
);
const service = axios.create({
    // baseURL:process.env.NODE_ENV === "production" ? process.env.VUE_APP_BASE_API: (process.env.VUE_APP_BASE_API + "/"),
    // 取当前开发环境下的地址
    // baseURL:process.env.VUE_APP_BASE_API + "/",
    // 2020.9.5 上线后方便修改后台接口
    baseURL: (window.g_config.base_url ? window.g_config.base_url : 'http://localhost:3000') + "/",
    timeout: Config.timeout, // 请求超时时间
    withCredentials: false, // 设置cross跨域 并设置访问权限 允许跨域携带cookie信息
    headers: {}
});

// 请求拦截器,这是大众请求方式，对特殊请求做另外的axios实例创建
service.interceptors.request.use(
    // config => {
    //     if (getToken()) {
    //         config.headers["Authorization"] = getToken(); // 登录后，每个请求必须带上的参数
    //     }
    //     // axios默认使用application/json格式来提交数据
    //     // config.headers['Content-Type'] = 'application/json';     // 该属性会与post请求冲突，暂时去掉
    //     return config;
    // },
    // error => {
    //     debugger;
    //     Message({
    //         showClose: true,
    //         message: error,
    //         type: "warning"
    //     });
    //     Promise.reject(error);
    // }
);
// 响应拦截器
service.interceptors.response.use(
    response => {
        const code = response.status;
        if (code < 200 || code > 300) {
            notification.error({
                message: response.status,
                description: response.statusText,
                duration: 3
            });
        } else {
            // 后台接口的errno
            let errno = response.data.errno;
            if (0 === errno) {
                return response.data;
            } else {
                // 发送到以失败状态发出
                notification.warning({
                    message: errno,
                    description: response.data.message || "请求出现问题!",
                    duration: 3
                });
                return Promise.reject(response);
            }
        }
        return response.data;
    },
    error => {
        debugger
        return Promise.reject(error);
    }
);
export default service;
