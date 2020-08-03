$(function () {
    var baseURL = 'http://ajax.frontend.itheima.net/'
    $.ajaxPrefilter(function (option) {
        // option 表示请求配置选项，$.ajax方法的参数
        option.url = baseURL + option.url
    })
})