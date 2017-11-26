'use strict';

/**
 * @ngdoc directive
 * @name Lambda3WebApp.directive:aide/sparql
 * @description
 * # aide/sparql
 */
angular.module('Lambda3WebApp')
	.directive('eventRepresentation', function () {
		return {
			templateUrl: 'views/aide/templates/EventRepresentation.tpl.html',
			controller: 'ProgrammingEventRepresentationCtrl',
			restrict: 'E',
			scope: {
				event: "=", // two way binding
				editable: "="
			},
			transclude: true,
		};
	});
