/**
 * Created by shihao on 16/3/24.
 */

'use strict';
presto.SERVICES
  .factory('CommonToasts',['$ionicPopup','$ionicLoading',function($ionicPopup,$ionicLoading){
    return {

      /**
       * 弹出对话框
       * @param title
       * @param context
       */
      showAlert: function (title, context , buttonText , callback) {
        /*if(window.plugins)
          window.plugins.toast.show(context,2000,'center');*/
        //alert(context);
        if(!buttonText) buttonText = '我知道啦';
        $().toastmessage('showNoticeToast', context,title,buttonText,callback);
        //$.toast(context);
        /*if (title == null) {
          title = "";
        }
        if (context == null) {
          context = "";
        }
        var alertPopup = $ionicPopup.alert({
          title: title,
          template: context,
          okText: '确认'
        });
        alertPopup.then();*/
      },
      /**
       * 加载时延迟提示
       */
      showLoading: function (params) {
        var defaultParams = {"template": "努力加载中..."};
        var toParams = angular.extend(defaultParams, params || {});
        $ionicLoading.show(toParams);
      },
      /**
       * 隐藏加载时提示
       */
      hideLoading: function () {
        $ionicLoading.hide();
      },
      /**
       * 警告对话框
       * @param title
       * @param content
       * @param duration
       * @param callback
       */
      alert: function (title, content, duration, callback) {
        var alertPopup = $ionicPopup.alert({
          title:title,
          template: content,
          okText: "确定"
        });
        if (angular.isNumber(duration) && duration > 0) {
          $timeout(function () {
            alertPopup.close();
          }, duration);
        }
        alertPopup.then(callback);
      },
      /**
       * 确认对话框
       * @param title
       * @param content
       * @param callback
       */
      confirm: function (title, content, buttonText1,callback1,btnClass1,buttonText2,callback2,btnClass2) {
        /*var confirmPopup = $ionicPopup.confirm({
          title: title,
          template: content,
          cancelText: "取消",
          okText: "确定"
        });
        confirmPopup.then(function(res){
          if(res){
            sucCallback();
          }else{
            failCallback();
          }
        });*/
        $().toastmessage('showConfirmToast', content,title,buttonText1,callback1,btnClass1,buttonText2,callback2,btnClass2);
      },
      /**
       * 提示对话框
       * @param title
       * @param template
       * @param inputType
       * @param inputPlaceholder
       * @param callback
       */
      prompt:function(title,template,inputType,inputPlaceholder,callback){
        $ionicPopup.prompt({
          title: title,
          template: template,
          inputType:inputType,
          inputPlaceholder:inputPlaceholder,
          cancelText: "取消",
          okText: "确定"
        }).then(callback);
      },
      /**
       * 自定义弹出框
       * @param title
       * @param context
       * @param duration
       * @param callback
       * @param buttons
       */
      show:function(title,context,duration,callback,buttons){
        if(!(buttons instanceof Array)){
          buttons=[
            {
              text: '取消'
            },
            {
              text: '<b>确定</b>',
              type: 'button-positive'
            }
          ];
        }
        var showPopup = $ionicPopup.show({
          title:title,
          template:context,
          buttons:buttons
        });
        showPopup.then(callback);
        if (angular.isNumber(duration) && duration > 0) {
          $timeout(function() {
            showPopup.close();
          }, duration);
        }
      }

    };
  }])
