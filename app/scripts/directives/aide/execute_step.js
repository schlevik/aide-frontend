'use strict';

/**
 * @ngdoc directive
 * @name Lambda3WebApp.directive:aide/executeStep
 * @description
 * # aide/executeStep
 */
angular.module('Lambda3WebApp')
	.directive('executeStep', function () {
		return {
			templateUrl: 'views/aide/templates/steps/Execute.tpl.html',
			//controller: 'ProgrammingExecuteStepCtrl',
			restrict: 'E',
			scope: {
				step: "=",// two way binding
				context: "="
			},
		};
	});
