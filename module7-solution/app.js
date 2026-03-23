(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService)
.filter('angularCurrency', AngularCurrencyFilter);

// ----------------------
// Controllers
// ----------------------

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
  var toBuy = this;

  toBuy.items = ShoppingListCheckOffService.getToBuyItems();

  toBuy.buyItem = function (index) {
    ShoppingListCheckOffService.buyItem(index);
  };
}

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var bought = this;

  bought.items = ShoppingListCheckOffService.getBoughtItems();
}

// ----------------------
// Service (Singleton)
// ----------------------

function ShoppingListCheckOffService() {
  var service = this;

  // Initial To Buy items
  var toBuyItems = [
    { name: "cookies", quantity: 10, pricePerItem: 2 },
    { name: "apples", quantity: 5, pricePerItem: 1.5 },
    { name: "milk", quantity: 2, pricePerItem: 3 },
    { name: "bread", quantity: 1, pricePerItem: 2.5 },
    { name: "eggs", quantity: 12, pricePerItem: 0.2 }
  ];

  var boughtItems = [];

  service.buyItem = function (index) {
    var item = toBuyItems.splice(index, 1)[0];
    boughtItems.push(item);
  };

  service.getToBuyItems = function () {
    return toBuyItems;
  };

  service.getBoughtItems = function () {
    return boughtItems;
  };
}

// ----------------------
// Custom Filter (Triple $)
// ----------------------

function AngularCurrencyFilter() {
  return function (input) {
    if (!input) return "$$$0.00";
    return "$$$" + input.toFixed(2);
  };
}

})();