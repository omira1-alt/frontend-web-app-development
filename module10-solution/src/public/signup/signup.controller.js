(function () {
"use strict";

angular.module('public')
.controller('SignUpController', SignUpController);

SignUpController.$inject = ['MenuService', 'UserService'];

function SignUpController(MenuService, UserService) {

  var $ctrl = this;

  // ALWAYS define properties inside here
  $ctrl.user = {};
  $ctrl.invalidFavorite = false;
  $ctrl.completed = false;

  $ctrl.checkFavorite = function () {
    if (!$ctrl.user.favorite) return;

    MenuService.getMenuItem($ctrl.user.favorite)
      .then(function (response) {
        if (!response) {
          $ctrl.invalidFavorite = true;
        } else {
          $ctrl.invalidFavorite = false;
          $ctrl.user.menuItem = response;
        }
      })
      .catch(function () {
        $ctrl.invalidFavorite = true;
      });
  };

  $ctrl.submit = function () {
    if (!$ctrl.invalidFavorite) {
      UserService.saveUser($ctrl.user);
      $ctrl.completed = true;
    }
  };

}

})();