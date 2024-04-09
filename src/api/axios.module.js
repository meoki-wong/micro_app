import React from 'react'
import { useNavigate } from 'react-router-dom'
import axios, { AxiosRequestConfig, AxiosResponse, AxiosInstance } from 'axios'
import { message } from 'antd'
import warnMessage from '../utils/WarnMessage'
// @ts-ignore
// import Nprogress from 'nprogress'
// import 'nprogress/nprogress.css'


// import axiosRetry from 'axios-retry'
// @ts-ignore
// axios.defaults.baseURL = process.env.NODE_ENV === 'production' ?
// 'https://supermeoki/data_admin' :
// 'https://127.0.0.1:10020/data_admin'

let axiosInstance = axios.create({
    baseURL: process.env.NODE_ENV === 'production' ?
        'https://supermeoki.xyz/data_admin' :
        'http://127.0.0.1:10020/data_admin',
    timeout: 15 * 1000, // 设置请求超时时间
    retryDelay: 1000, // 超时请求
    retry: 4, // 超时重新触发请求次数
})

// const navigate = useNavigate()


// 请求拦截
let requestWhiteList = ['/login'] // 请求白名单
// let responseWhiteList = [] // 响应白名单
axiosInstance.interceptors.request.use((config) => {
    // Nprogress.start() // 添加请求进度条
    if (requestWhiteList.includes(config.url)) {
        return config
    }
    let userInfo = {
        id: JSON.parse(localStorage.getItem('userInfo'))?.id || ''
    }
    let token = window.localStorage.getItem('token')
    if (!config.headers) {
        config.headers = {}
    } else {
        // 区分上传接口和普通接口
        if (config.url === "/uploadFile") {
            //以formData上传时请求头Content-Type类型要改为multipart/form-data
            config.headers['Content-Type'] = "multipart/form-data";
        } 
        else {
            config.headers['Content-Type'] = 'application/json';
        }
        config.headers.authorization = token
        // 暂时不能使用中文做中文名  header不能写入中文  需要传入时进行过滤  后期做处理
        config.headers = {
            authorization: token,
            userInfo: JSON.stringify(userInfo)
        }
    }
    return config
}, (err) => {
    message.error(err)
    console.log('=====>请求拦截失败:', err)
    // Nprogress.done() // 结束请求进度条 
})


// 响应拦截
axiosInstance.interceptors.response.use((config) => {
    let { status, statusText, data } = config
    if (!data.success) {
        message.error(data.message)
        // Nprogress.done() // 结束请求进度条 
        return
    }
    // Nprogress.done() // 结束请求进度条 
    return config
}, (err) => {
    // 设置超时请求
    let config = err.config;
    // Nprogress.done()
    console.log('---301', err);
    if(warnMessage({status: err.response?.data?.code || 0, title: err.message})) return 
    message.error(String(err)) // statusCode 不为200时   报相关异常信息
    if(err.response?.data?.code === 301){
        window.location.replace('/blog/login') 
    }
    // 
    if (!config || !config.retry) return Promise.reject(err);

    config.__retryCount = config.__retryCount || 0;

    if (config.__retryCount >= config.retry) {
        return Promise.reject(err);
    }

    config.__retryCount += 1;
    let backoff = new Promise((resolve) => {
        setTimeout(function () {
            resolve();
        }, config.retryDelay || 1);
    });
    return backoff.then(function () {
        return axiosInstance(config);
    });
    
})

export default axiosInstance


