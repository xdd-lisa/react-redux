// 统一的axios配置
import axios from 'axios';
const register = () => {
    // 全局的 axios 默认值
    axios.defaults.baseURL = '/';
    axios.defaults.timeout = 10*60*1000;
    // axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
    // axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

    // 添加请求拦截器
    axios.interceptors.request.use((config) => {
        // 在发送请求之前做些什么
        let data = Object.assign({}, config);
        data.headers.umNo = 'xudandan941';
        return data;
    }, (error) => {
        // 对请求错误做些什么
        return Promise.reject(error);
    });

    // 添加响应拦截器
    axios.interceptors.response.use((response) => {
        // 对响应数据做点什么
        const { data } = response;
        const { ret, msg} = data;
        if(ret != 0){
            console.log(msg);
        }
        return response;
    }, (error) => {
        // 对响应错误做点什么
        return Promise.reject(error);
    });

}

export default register;
