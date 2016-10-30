/**
 * Created by shihao on 16/4/1.
 */
'use strict';

presto.CONTROLLERS
  .controller('QRCodeCtrl', ['$scope', 'CommonMethods', 'Storage'
    , function ($scope, CommonMethods, Storage) {

      $scope.initScope = function () {

        //var elem = document.getElementById('QRCodeImg');
        //var screenWidth = window.screen.width;
        //var width = screenWidth * 0.8;
        //var height = width;
        //var width = 200;
        //var height = 200;
        if (CommonMethods.checkWechatVersion() || true) {
          /*var qrcode = new QRCode(elem, {
            width: width,//设置宽高
            height: height
          });
          var followUrl = Storage.get('followUrl');
          qrcode.makeCode(followUrl);*/
          var followUrl = Storage.get('followUrl');
          var canvas = qrgen.canvas({
            //data: "http://weixin.qq.com/q/MkQvDoTmydCw7VZmGGzE",
            data: followUrl,
            size:200
          });
          var image = new Image();
          image.src = canvas.toDataURL("image/png");
          //elem.appendChild(image);
        } else {
          $('#QRCodeDesc').html('本系统暂不支持微信5.0以下的版本！请先升级您的微信版本');
        }

      };

      $scope.$on('$ionicView.enter', function () {
        $scope.initScope();
        //console.log(window.screen.width);
      });

    }]);
