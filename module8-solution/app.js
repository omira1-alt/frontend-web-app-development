(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', FoundItemsDirective);


// Controller
NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var ctrl = this;

  ctrl.searchTerm = "";
  ctrl.found = [];
  ctrl.nothingFound = false;

  ctrl.narrowDown = function () {
    if (!ctrl.searchTerm || ctrl.searchTerm.trim() === "") {
      ctrl.found = [];
      ctrl.nothingFound = true;
      return;
    }

    MenuSearchService.getMatchedMenuItems(ctrl.searchTerm)
      .then(function (result) {
        ctrl.found = result;
        ctrl.nothingFound = result.length === 0;
      });
  };

  ctrl.removeItem = function (index) {
    ctrl.found.splice(index, 1);
  };
}


// Service
MenuSearchService.$inject = ['$http'];
function MenuSearchService($http) {
    var service = this;
    service.getMatchedMenuItems = function (searchTerm) {
    return $http({
        method: "GET",
        url: "https://coursera-jhu-default-rtdb.firebaseio.com/menu_items.json"
    }).then(function (response) {
        var foundItems = [];
        var data = response.data;
        var term = searchTerm.toLowerCase().trim();

        for (var categoryKey in data) {
            var category = data[categoryKey];

            var items = category.menu_items;

            for (var i = 0; i < items.length; i++) {
                var item = items[i];

                if (item.description &&
                    item.description.toLowerCase().includes(term)) {
                foundItems.push(item);
                }
            }
        }
        return foundItems;
        });
    };
}


// Directive
function FoundItemsDirective() {
  return {
    restrict: 'E',
    template:
      '<ul class="list-group">' +
        '<li class="list-group-item" ng-repeat="item in list.items track by $index">' +
          '<strong>{{ item.name }}</strong> ({{ item.short_name }})<br>' +
          '{{ item.description }}<br>' +
          '<button class="btn btn-danger btn-sm" ' +
                  'ng-click="list.onRemove({index: $index})">' +
            'Don\'t want this one!' +
          '</button>' +
        '</li>' +
      '</ul>',
    scope: {
      items: '<',
      onRemove: '&'
    },
    controller: function () {},
    controllerAs: 'list',
    bindToController: true
  };
}

})();