(function () {
"use strict";

angular.module('common')
.service('MenuService', MenuService);


MenuService.$inject = ['$http', 'ApiPath'];
function MenuService($http, ApiPath) {
  var service = this;

  service.getCategories = function () {
    return $http.get(ApiPath + '/categories.json').then(function (response) {
      return response.data;
    });
  };


  service.getMenuItem = function (shortName) {

  var category = shortName.charAt(0);
  var index = shortName.slice(1) - 1;

  return $http({
    method: "GET",
    url: "https://coursera-jhu-default-rtdb.firebaseio.com/menu_items/"
         + category + "/menu_items/" + index + ".json"
  }).then(function (response) {
    return response.data;
  });

};

}



})();
