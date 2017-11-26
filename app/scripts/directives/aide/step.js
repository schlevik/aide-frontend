'use strict';

/**
 * @ngdoc directive
 * @name Lambda3WebApp.directive:aide/step
 * @description
 * # aide/step
 */
angular.module('Lambda3WebApp')
	.directive('step', function () {
		return {
			templateUrl: 'views/aide/templates/steps/Step.tpl.html',
			//controller: 'ProgrammingStepCtrl',
			restrict: 'E',
			scope: true,
			//transclude: true,
			link: function(scope) {
				scope.stepTypes = ["Execute", "WaitFor", "RepeatUntil"];
			}
		};
	});
