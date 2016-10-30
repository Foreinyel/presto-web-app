/**
 * Created by shihao on 16/3/22.
 */
'use strict';
presto.CONTROLLERS
    .controller('LoginCtrl', ['$scope', '$state', 'LoginService', 'CommonToasts', 'CommonMethods', 'Storage', '$interval'
        , function ($scope, $state, LoginService, CommonToasts, CommonMethods, Storage, $interval) {

            $scope.hideNavBar = function () {
                return CommonMethods.ifHideNavBar();
            };

            $scope.userLogin = {
                mobile: '',
                passwd: '',
                inviteCode: ''
            };

            $scope.disableLoginButton = false;

            //短信验证码 button
            $scope.smsCodeObject = {
                disableBtn: false,
                btnText: '发送验证码',
                hitBtnBeforeText: '发送验证码',
                hitBtnText: '短信验证码',
                no: 60,
                timer: '',
                refreshTime: function () {
                    $scope.smsCodeObject.no--;
                    $scope.smsCodeObject.btnText = $scope.smsCodeObject.no + 's';
                    if ($scope.smsCodeObject.no <= 0) {
                        $scope.smsCodeObject.reset();
                    }
                },
                reset: function () {
                    $scope.smsCodeObject.btnText = $scope.smsCodeObject.hitBtnBeforeText;
                    $scope.smsCodeObject.disableBtn = false;
                    $interval.cancel($scope.smsCodeObject.timer);
                    $scope.smsCodeObject.no = 60;
                },
                hitBtn: function () {
                    if (CommonMethods.ismobile($scope.userLogin.mobile)) {
                        $scope.smsCodeObject.disableBtn = true;
                        $scope.smsCodeObject.timer = $interval($scope.smsCodeObject.refreshTime, 1000);
                        $scope.getValidateCode();
                    } else {
                        CommonToasts.showAlert('提示', '请输入正确的手机号码!');
                        return;
                    }

                }
            };

            $scope.login = function () {
                $scope.disableLoginButton = true;
                var v_code = '0000000';
                CommonToasts.showLoading();
                var mobile = $scope.userLogin.mobile;
                var passwd = $scope.userLogin.passwd + '';
                var inviteCode = $scope.userLogin.inviteCode + '';
                if (passwd.length < 6) {
                    passwd = v_code.substr(0, 6 - passwd.length) + passwd;
                }
                if (!CommonMethods.isMobile(mobile)) {
                    $scope.disableLoginButton = false;
                    CommonToasts.hideLoading();
                    CommonToasts.showAlert('提示', '请输入正确的手机号码!');
                    return;
                }
                if (CommonMethods.isStringEmpty(passwd)) {
                    $scope.disableLoginButton = false;
                    CommonToasts.hideLoading();
                    CommonToasts.showAlert('提示', '请输入验证码!');
                    return;
                }
                var param = {
                    mobile: mobile,
                    passwd: passwd,
                    inviteCode:inviteCode
                    //promoterCode:$scope.userLogin.inviteCode,
                    //deviceToken:CommonMethods.getToken()      //token
                };

                LoginService.login(param, function (response) {
                    if (response && response.responseCode == '0') {
                    } else {
                        if (response && response.responseMsg) {
                            CommonToasts.showAlert('提示', response.responseMsg);
                        } else {
                            CommonToasts.showAlert('提示', '登录失败,请稍后再试!');
                        }
                    }
                }, function (response) {
                    CommonToasts.showAlert('提示', '登录失败,请稍后再试!');
                }, function () {
                    $scope.disableLoginButton = false;
                    CommonToasts.hideLoading();
                });

            };

            $scope.goAgreement = function () {
                $state.go('tabs.agreement');
            };

            $scope.getValidateCode = function () {
                var mobile = $scope.userLogin.mobile;
                if (CommonMethods.ismobile(mobile)) {
                    var param = {
                        mobile: $scope.userLogin.mobile
                    };
                    LoginService.getSmsCode(param, function (response) {
                        if (response && response.responseCode == '0') {

                        } else {
                            if (response && response.responseMsg) {
                                CommonToasts.showAlert('提示', response.responseMsg);
                            } else {
                                CommonToasts.showAlert('提示', '获取验证码失败');
                            }
                        }
                    }, function (response) {
                        CommonToasts.showAlert('提示', '获取验证码失败');
                    });
                } else {
                    CommonToasts.showAlert('提示', '请输入正确的手机号码!');
                }
            };

        }]);
