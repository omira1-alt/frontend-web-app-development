(function () {
  'use strict';

  angular.module('MenuApp')
  .component('items', {
    bindings: {
      items: '<'
    },
    template: `
      <h3>{{ $ctrl.items.category.name }}</h3>
      <ul>
        <li ng-repeat="item in $ctrl.items.menu_items">
          {{ item.name }} - {{ item.description }}
        </li>
      </ul>
    `
  });

})();