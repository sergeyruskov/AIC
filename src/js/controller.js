(function() {
  'use strict';
  var app;

  app = angular.module('controller', []);

  app.controller('navMenuCtrl', [
    '$scope', 'matchmedia', function($scope, matchmedia) {
      return matchmedia.onPhone(function(mediaQueryList) {
        $scope.isPhone = mediaQueryList.matches;
        if ($scope.isPhone) {
          return $scope.isCollapsed = true;
        }
      });
    }
  ]);

  app.controller('listsCtrl', [
    '$scope', function($scope) {
      $scope.isCollapsedSettings = false;
      this["class"] = 'first_load_toggle';
      this.delete_first_load_toggle = (function(_this) {
        return function() {
          if (_this["class"] === "first_load_toggle") {
            return _this["class"] = "";
          }
        };
      })(this);
      this.toggle = function() {
        return {
          toggle_off: 0,
          move_toggle: function(togglePosition) {
            return this.toggle_off = togglePosition;
          }
        };
      };
      this.youtube_toggle = new this.toggle;
      this.youtube_toggle.toggle_off = 1;
      this.habrahabr_toggle = new this.toggle;
      this.habrahabr_toggle.toggle_off = 0;
      this.pikabu_toggle = new this.toggle;
      this.pikabu_toggle.toggle_off = 1;
      this.trinixy_toggle = new this.toggle;
      this.trinixy_toggle.toggle_off = 0;
      this.motor_toggle = new this.toggle;
      return this.motor_toggle.toggle_off = 1;
    }
  ]);

}).call(this);
