(function() {
  'use strict';
  var app;

  app = angular.module('settings', []);

  app.controller('listsCtrl', [
    '$scope', '$http', function($scope, $http) {
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
      this.motor_toggle.toggle_off = 1;
      $http.get('json/subscribe.json').success((function(_this) {
        return function(data) {
          return _this.successAnswer(data);
        };
      })(this));
      return this.successAnswer = (function(_this) {
        return function(data) {
          var subscribe;
          subscribe = data.subscribe;
          _this.youtube = subscribe.youtube;
          return _this.habrahabr = subscribe.habrahabr;
        };
      })(this);
    }
  ]);

}).call(this);
