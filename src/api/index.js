import request from '../utils/request';
import config from '../config/index';
const baseUrl = config.apiName;
// 登录
export const login = function (data) {
    return request({
        url:baseUrl + '/login',
        method: "POST",
        data
    })
}

// 检测是否登录
export const checkIs = function (data) {
    return request({
        url:baseUrl + '/checkIs',
        method: "POST",
    })
}
// 退出登录
export const logout = function (data) {
    return request({
        url:baseUrl + '/logout',
        method: "POST",
    })
}
/********************************************** b_verse表操作 ************************************************/
// 获取所有诗句
export const getAllVerse = function () {
    return request({
        url:baseUrl + '/getVerse',
        method: "POST",
    })
}
// 更新诗句
export const updateVerseById = function (data) {
    return request({
        url:baseUrl + '/updateVerse',
        method: "POST",
        data
    })
}
// 删除诗句  {id:1}
export const deleteVerseById = function (data) {
    return request({
        url:baseUrl + '/deleteVerse',
        method: "POST",
        data
    })
}
// 增加诗句 {}
export const addVerse = function (data) {
    return request({
        url:baseUrl + '/addVerse',
        method: "POST",
        data
    })
}
/********************************************** b_articles表操作 ************************************************/
// 获取所有文章
export const getAllArticles = function () {
    return request({
        url:baseUrl + '/articles',
        method: "POST",
    })
}
// 删除文章 {id:0}
export const deleteArticlesById = function (data) {
    return request({
        url:baseUrl + '/deleteArticle',
        method: "POST",
        data
    })
}
// 增加文章 {id:0}
export const addArticles = function (data) {
    return request({
        url:baseUrl + '/addArticle',
        method: "POST",
        data
    })
}
// 修改文章 {id:0}
export const updateArticle = function (data) {
    return request({
        url:baseUrl + '/updateArticle',
        method: "POST",
        data
    })
}
