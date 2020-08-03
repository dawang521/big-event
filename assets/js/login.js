$(function () {
    // 验证
    var form = layui.form
    form.verify({
        uname: [/^[\S]{6,8}$/, '用户必须是6-8位字符'],
        pwd: function (value, item) {
            var reg = /^\d{6}$/
            if (!reg.test(value)) {
                return '输入的密码必须是6位数字'
            }
        },
        samePwd: function (value) {
            var pwd = $('.reg-form input[type=password]').eq(0).val()
            if (pwd !== value) {
                return "两次输入的值不一样"
            }
        }
    })
    // 点击登录表格发送数据
    $('.login-form').submit(function (e) {
        e.preventDefault()
        var formData = $(this).serialize()
        $.ajax({
            type: "post",
            url: "api/login",
            data: formData,
            success: function (res) {
                //   console.log(res)
                if (res.status === 0) {
                    location.href = './index.html'
                    sessionStorage.setItem('mytoken',res.token)
                } else {
                    alert(res.message)
                }
            }
        })


    })
    // 点击按钮切换注册和登录
    $('.reg-link').click(function () {
        $('.reg-form').show()
        $('.login-form').hide()
    })
    $('.login-link').click(function () {
        $('.reg-form').hide()
        $('.login-form').show()
    })
    // 点击注册表格发送数据
    $('.reg-form').submit(function (e) {
        e.preventDefault()
        var formData = $(this).serialize()
        $.ajax({
            type: "post",
            url: "api/reguser",
            data: formData,
            success: function (res) {
                if (res.status === 0) {
                    $('.login-link').click()
                } else {
                    alert(res.message)
                }
            }
        })
    })
})