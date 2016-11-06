/**
 * Created by shihao on 16/4/25.
 */

'use strict';

presto.CONTROLLERS
    .controller('TabsCtrl', ['$scope', '$state', 'CommonMethods', function ($scope, $state, CommonMethods) {

        $scope.goMyOrdersTab = function () {
            $state.go('tabs.orders');
        };

        $scope.goHomeTab = function () {
            $state.go('tabs.home');
        };

        $scope.goMarketingsTab = function () {
            $state.go('tabs.marketings');
        };

        $scope.goCardsTab = function () {
            $state.go('tabs.cards');
        };

        $scope.goMineTab = function () {
            $state.go('tabs.mine');
        };

        $scope.orderClick = function (e) {
            e.preventDefault();
        };

        $scope.$on('$ionicView.beforeEnter', function () {
            $scope.isShowTabs = $state.is('tabs.home') || $state.is('tabs.orders') || $state.is('tabs.marketings') || $state.is('tabs.cards') || $state.is('tabs.mine');
            var argus = CommonMethods.getArgs();
            if (argus && argus.hideNavTab) {
                $scope.isShowTabs = false;
            }
        });

    }]);
