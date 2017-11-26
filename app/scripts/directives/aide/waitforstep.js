'use strict';

/**
 * @ngdoc directive
 * @name Lambda3WebApp.directive:WaitFor
 * @description
 * # WaitFor
 */
angular.module('Lambda3WebApp')
	.directive('waitForStep', function () {
		return {
			templateUrl: 'views/aide/templates/steps/WaitFor.tpl.html',
		//	controller: 'ProgrammingWaitForStepCtrl',
			restrict: 'E',
			scope: {
				step: "=",// two way binding
				context: "="
			},
		};
	});
