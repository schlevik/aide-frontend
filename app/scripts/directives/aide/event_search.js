'use strict';

/**
 * @ngdoc directive
 * @name Lambda3WebApp.directive:aide/eventSearch
 * @description
 * # aide/eventSearch
 */
angular.module('Lambda3WebApp')
	.directive('eventSearch', function () {
		return {
			templateUrl: 'views/aide/templates/search-forms/Event.tpl.html',
			controller: 'ProgrammingEventSearchCtrl',
			restrict: 'E',
			scope: {
				event: "=",// two way binding
				context: "="
			}
		};
	});
