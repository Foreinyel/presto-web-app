/**
 *  This Plugin will help you in showing some nice Toast-Message like notification messages. The behavior is
 *  similar to the android Toast class.
 *  You have 4 different toast types you can show. Each type comes with its own icon and colored border. The types are:
 *  - notice
 *  - success
 *  - warning
 *  - error
 *
 *  The following methods will display a toast message:
 *
 *   $().toastmessage('showNoticeToast', 'some message here');
 *   $().toastmessage('showSuccessToast', "some message here");
 *   $().toastmessage('showWarningToast', "some message here");
 *   $().toastmessage('showErrorToast', "some message here");
 *
 *   // user configured toastmessage:
 *   $().toastmessage('showToast', {
 *      text     : 'Hello World',
 *      sticky   : true,
 *      position : 'top-right',
 *      type     : 'success',
 *      close    : function () {console.log("toast is closed ...");}
 *   });
 *   but is enhanced in several ways:
 *
 *   configurable positioning
 *   convenience methods for different message types
 *   callback functionality when closing the toast
 *   included some nice free icons
 *   reimplemented to follow jquery plugin good practices rules
 *
 **/
"use strict";
(function ($) {
  var settings = {
    stayTime: 3000,				// time in miliseconds before the item has to disappear
    text: '',					// content of the item. Might be a string or a jQuery object. Be aware that any jQuery object which is acting as a message will be deleted when the toast is fading away.
    sticky: false,				// should the toast item sticky or not?
    type: 'notice', 			// notice, warning, error, success
    position: 'middle-center',        // top-left, top-center, top-right, middle-left, middle-center, middle-right ... Position of the toast container holding different toast. Position can be set only once at the very first call, changing the position after the first call does nothing
    closeText: '',                 // text which will be shown as close button, set to '' when you want to introduce an image via css
    close: null                // callback function when the toastmessage is closed
  };

  var methods = {
    init: function (options) {
      if (options) {
        $.extend(settings, options);
      }
    },

    showToast: function (options) {
      var localSettings = {};
      $.extend(localSettings, settings, options);
      // declare variables
      var toastBg, toastBgBlock, toastWrapAll, toastItemOuter, toastItemInner, toastItemClose, toastItemImage, toastItemTitle, toastItemButton;
      toastBg = (!$('.toast-bg').length) ? $('<div></div>').addClass('toast-bg').appendTo('body') : $('.toast-bg');
      toastBgBlock = (!$('.toast-bg-block').length) ? $('<div></div>').addClass('toast-bg-block').appendTo(toastBg) : $('.toast-bg-block');
      toastWrapAll = (!$('.toast-container').length) ? $('<div></div>').addClass('toast-container').addClass('toast-position-' + localSettings.position).appendTo(toastBg) : $('.toast-container');
      //toastWrapAll = (!$('.toast-container').length) ? $('<div></div>').addClass('toast-container').addClass('toast-position-' + localSettings.position).appendTo('body') : $('.toast-container');
      toastItemOuter = $('<div></div>').addClass('toast-item-wrapper');
      toastItemInner = $('<div></div>').hide().addClass('toast-item toast-type-' + localSettings.type).appendTo(toastWrapAll).html($('<p>').append (localSettings.text)).show().wrap(toastItemOuter);
      toastItemTitle = $('<div></div>').addClass('toast-item-title').prependTo(toastItemInner).html(localSettings.title);
      if (localSettings.buttonText)
        toastItemButton = $('<div></div>').addClass('toast-item-button').appendTo(toastItemInner).html(localSettings.buttonText).click(function () {
          if(localSettings.callback && typeof localSettings.callback == 'function'){
            $('.toast-bg').remove();
            localSettings.callback();
          }else{
            $('.toast-bg').remove();
          }
        });
      return toastItemInner;
      /*toastItemClose = $('<div></div>').addClass('toast-item-close').prependTo(toastItemInner).html(localSettings.closeText).click(function () {
       $().toastmessage('removeToast', toastItemInner, localSettings)
       });*/
      //toastItemImage = $('<div></div>').addClass('toast-item-image').addClass('toast-item-image-' + localSettings.type).prependTo(toastItemInner);
      /*if (!localSettings.sticky) {
        setTimeout(function () {
            $().toastmessage('removeToast', toastItemInner, localSettings);
          },
          localSettings.stayTime);
      }*/

    },

    showNoticeToast: function (message, title, buttonText,callback) {
      var options = {text: message, type: 'notice', title: title, buttonText: buttonText, callback : callback};
      return $().toastmessage('showToast', options);
    },

    showConfirm:function(options){
      var localSettings = {};
      $.extend(localSettings,settings,options);
      var toastBg, toastBgBlock, toastWrapAll, toastItemOuter, toastItemInner, toastItemClose, toastItemImage, toastItemTitle, toastItemButton;
      toastBg = (!$('.toast-bg').length) ? $('<div></div>').addClass('toast-bg').appendTo('body') : $('.toast-bg');
      toastBgBlock = (!$('.toast-bg-block').length) ? $('<div></div>').addClass('toast-bg-block').appendTo(toastBg) : $('.toast-bg-block');
      toastWrapAll = (!$('.toast-container').length) ? $('<div></div>').addClass('toast-container').addClass('toast-position-' + localSettings.position).appendTo(toastBg) : $('.toast-container');
      //toastWrapAll = (!$('.toast-container').length) ? $('<div></div>').addClass('toast-container').addClass('toast-position-' + localSettings.position).appendTo('body') : $('.toast-container');
      toastItemOuter = $('<div></div>').addClass('toast-item-wrapper');
      toastItemInner = $('<div></div>').hide().addClass('toast-item toast-item-confirm toast-type-' + localSettings.type).appendTo(toastWrapAll).html($('<p>').append (localSettings.text)).show().wrap(toastItemOuter);
      toastItemTitle = $('<div></div>').addClass('toast-item-title').prependTo(toastItemInner).html(localSettings.title);

      if(localSettings.buttonText2){      //有2个button
        var toastItemButton1 = $('<div></div>').addClass('toast-item-button1' + ' ' + localSettings.btn1class).appendTo(toastItemInner).html(localSettings.buttonText1).click(function(){
          if(localSettings.callback1 && typeof localSettings.callback1 == 'function'){
            $('.toast-bg').remove();
            localSettings.callback1();
          }else{
            $('.toast-bg').remove();
          }
        });
        var toastItemButton2 = $('<div></div>').addClass('toast-item-button2' + ' ' + localSettings.btn2class).appendTo(toastItemInner).html(localSettings.buttonText2).click(function(){
          if(localSettings.callback2 && typeof localSettings.callback2 == 'function'){
            $('.toast-bg').remove();
            localSettings.callback2();
          }else{
            $('.toast-bg').remove();
          }
        });
      }else{    //至少一个button
        if (localSettings.buttonText1){
          toastItemButton = $('<div></div>').addClass('toast-item-button').appendTo(toastItemInner).html(localSettings.buttonText1).click(function () {
            if(localSettings.callback1 && typeof localSettings.callback1 == 'function'){
              $('.toast-bg').remove();
              localSettings.callback1();
            }else{
              $('.toast-bg').remove();
            }
          });
        }else{
          toastItemButton = $('<div></div>').addClass('toast-item-button').appendTo(toastItemInner).html('返回').click(function () {
              $('.toast-bg').remove();
          });
        }

      }


      return toastItemInner;
    },

    showConfirmToast : function(message,title,buttonText1,callback1,btn1class,buttonText2,callback2,btn2class){
      var options = {
        text:message,
        type:'notice',
        title:title,
        buttonText1:buttonText1,
        callback1:callback1,
        btn1class:btn1class,
        buttonText2:buttonText2,
        callback2:callback2,
        btn2class:btn2class
      };

      return $().toastmessage('showConfirm',options);

    },

    showSuccessToast: function (message) {

      var options = {text: message, type: 'success'};
      return $().toastmessage('showToast', options);
    },

    showErrorToast: function (message) {
      var options = {text: message, type: 'error'};
      return $().toastmessage('showToast', options);
    },

    showWarningToast: function (message) {
      var options = {text: message, type: 'warning'};
      return $().toastmessage('showToast', options);
    },

    removeToast: function (obj, options) {
      /*obj.show({
       //obj.animate({
       opacity: '0.2'
       }, 1000, 'linear', function () {
       obj.parent().remove();
       });*/
      obj.hide();

      if (options && options.close !== null) {
        options.close();
      }
    }
  };

  $.fn.toastmessage = function (method) {

    // Method calling logic
    if (methods[method]) {
      //return methods[method].apply(this, Array.prototype.slice.call(arguments));
      return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
    } else if (typeof method === 'object' || !method) {

      return methods.init.apply(this, arguments);
    } else {
      $.error('Method ' + method + ' does not exist on Zepto.toastmessage');
    }
  };

})(Zepto);
