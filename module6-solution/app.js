(function () {
  'use strict';

  angular.module('LunchCheck', [])
    .controller('LunchCheckController', LunchCheckController);

  LunchCheckController.$inject = ['$scope'];

  function LunchCheckController($scope) {
    $scope.lunchItems = "";
    $scope.message = "";
    $scope.messageClass = "";
    $scope.borderClass = "";

    $scope.checkLunch = function () {
      if (!$scope.lunchItems) {
        setError("Please enter data first");
        return;
      }

      // Simple split — empty items are counted
      var items = $scope.lunchItems.split(',');

      if (items.length <= 3) {
        setSuccess("Enjoy!");
      } else {
        setSuccess("Too much!");
      }
    };

    function setError(msg) {
      $scope.message = msg;
      $scope.messageClass = "red";
      $scope.borderClass = "red";
    }

    function setSuccess(msg) {
      $scope.message = msg;
      $scope.messageClass = "green";
      $scope.borderClass = "green";
    }
  }
})();