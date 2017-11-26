'use strict';

/**
 * @ngdoc directive
 * @name Lambda3WebApp.directive:aide/repeatUntilStep
 * @description
 * # aide/repeatUntilStep
 */
angular.module('Lambda3WebApp')
  .directive('repeatUntilStep', function () {
		return {
			templateUrl: 'views/aide/templates/steps/RepeatUntil.tpl.html',
			//	controller: 'ProgrammingWaitForStepCtrl',
			restrict: 'E',
			scope: {
				step: "=",// two way binding
				context: "="
			},
		};
  });
