(function () {
  'use strict';

  angular.module('MenuApp')
  .config(RoutesConfig);

  RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
  function RoutesConfig($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider

    // HOME
    .state('home', {
      url: '/',
      template: `
        <h2>Welcome to our Restaurant</h2>
        <a ui-sref="categories">View Categories</a>
      `
    })

    // CATEGORIES
    .state('categories', {
      url: '/categories',
      template: '<categories items="categoriesCtrl.categories"></categories>',
      controller: 'CategoriesController as categoriesCtrl',
      resolve: {
        categories: ['MenuDataService', function (MenuDataService) {
          return MenuDataService.getAllCategories()
            .then(function (response) {
              return response.data;
            });
        }]
      }
    })

    // ITEMS
    .state('items', {
      url: '/items/{category}',
      template: '<items items="itemsCtrl.items"></items>',
      controller: 'ItemsController as itemsCtrl',
      resolve: {
        items: ['$stateParams', 'MenuDataService', function ($stateParams, MenuDataService) {
          return MenuDataService.getItemsForCategory($stateParams.category)
            .then(function (response) {
              return response.data;
            });
        }]
      }
    });
  }

  // Controllers (separate artifact rule respected per file? 👉 If strict, move these to separate files)
  angular.module('MenuApp')
  .controller('CategoriesController', CategoriesController);

  CategoriesController.$inject = ['categories'];
  function CategoriesController(categories) {
    var $ctrl = this;
    $ctrl.categories = categories;
  }

  angular.module('MenuApp')
  .controller('ItemsController', ItemsController);

  ItemsController.$inject = ['items'];
  function ItemsController(items) {
    var $ctrl = this;
    $ctrl.items = items;
  }

})();