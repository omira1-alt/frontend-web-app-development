(function () {
  'use strict';

  angular.module('MenuApp')
  .component('categories', {
    bindings: {
      items: '<'
    },
    template: `
      <ul>
        <li ng-repeat="cat in $ctrl.items">
          <a ui-sref="items({ category: cat.short_name })">
            {{ cat.name }}
          </a>
        </li>
      </ul>
    `
  });

})();