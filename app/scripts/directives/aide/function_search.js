'use strict';

/**
 * @ngdoc directive
 * @name Lambda3WebApp.directive:aide/actionSearch
 * @description
 * # aide/actionSearch
 */
angular.module('Lambda3WebApp')
  .directive('functionSearch', function () {
		return {
			templateUrl: function (elem, attr) {
				return 'views/aide/templates/search-forms/' + attr.type + '.tpl.html';
			},
			// templateUrl: 'views/aide/templates/search-forms/Function.tpl.html',
			controller: 'ProgrammingFunctionSearchCtrl',
			restrict: 'E',
			scope: {
				func: "=",// two way binding
				functionType: "=",
				context: "="
			}
		};
  });
