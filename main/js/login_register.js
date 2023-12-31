//公钥
var publicKey = $('#publicKey').val();
var encryptor = new JSEncrypt()  // 创建加密对象实例
encryptor.setPublicKey(publicKey)//设置公钥
//
$(function () {
    // 开局动画加载
    $('#loginBox').css('left', '50%');
})
// 进入注册界面
$('#registerBtn').click(enterRegisterPage);
// 返回登录界面
$('#turnBackBtn').click(backLoginPage);
// 登录提交
$('#loginSubmitBtn').click(function () {
    startLoading('#loginSubmitBtn');
    $.ajax({
        url: '/main/api/login.php',
        type: 'post',
        data: encryptor.encrypt(JSON.stringify({
            'account': $('#loginAccount').val(),
            'password': $('#loginPassword').val()
        })),
        error: function (XMLHttpRequest) {
            popWindow('请求错误');
        },
        success: function (response) {
            if (response['opCode'] == 100) {
                window.location.href = '/mainPage.php';
            }
            popWindow(response['message']);
        },
        complete: function () {
            endLoading('#loginSubmitBtn');
        }
    })

});
// 注册提交
$('#registerSubmitBtn').click(function () {
    startLoading('#registerSubmitBtn');
    $.ajax({
        url: '/main/api/register.php',
        type: 'post',
        data: encryptor.encrypt(JSON.stringify({
            'account': $('#registerAccount').val(),
            'password': $('#registerPassword').val(),
            'code': $('#registerCode').val(),
        })),
        error: function (XMLHttpRequest) {
            popWindow('请求错误');
        },
        success: function (response) {
            if (response['opCode'] == 100) {
                regsiterToken = response['token'];
                $('#loginAccount').val($('#registerAccount').val());
                $('#loginPassword').val($('#registerPassword').val());
                $('#registerAccount').val('');
                $('#registerPassword').val('');
                $('#registerCode').val('');
                backLoginPage();
            }
            popWindow(response['message']);
        },
        complete: function () {
            endLoading('#registerSubmitBtn');
        }
    })
});
// 验证码获取
$('#getCodeBtn').click(function () {
    startLoading('#getCodeBtn');
    $.ajax({
        url: '/main/api/email.php',
        type: 'post',
        data: encryptor.encrypt(JSON.stringify({
            'account': $('#registerAccount').val(),
        })),
        error: function (XMLHttpRequest) {
            popWindow('请求错误');
        },
        success: function (response) {
            popWindow(response['message']);
        },
        complete: function () {
            endLoading('#getCodeBtn');
        }
    })
});
// 进入注册界面
function enterRegisterPage() {
    $('#loginBox').css('left', '-1000%');
    $('#registerBox').css('left', '50%');
}
// 返回登录界面
function backLoginPage() {
    $('#loginBox').css('left', '50%');
    $('#registerBox').css('left', '1000%');
}