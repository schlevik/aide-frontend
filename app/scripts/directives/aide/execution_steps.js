'use strict';

/**
 * @ngdoc directive
 * @name Lambda3WebApp.directive:aide/executionSteps
 * @description
 * # aide/executionSteps
 */
angular.module('Lambda3WebApp')
	.directive('executionSteps', function () {
		return {
			templateUrl: 'views/aide/templates/steps/Steps.tpl.html',
			restrict: 'E',
			controller: "ProgrammingStepsCtrl",
			transclude: true,
			scope: {
				'steps': '=',
				'triggeringStep': '=',
				'context': '='
			}
		};
	});

/**
 function (elem, attr) {
				return 'views/aide/templates/steps/' + attr.type + '.tpl.html';
			}*/
