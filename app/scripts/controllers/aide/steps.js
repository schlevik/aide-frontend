'use strict';

/**
 * @ngdoc function
 * @name Lambda3WebApp.controller:ProgrammingStepctrlCtrl
 * @description
 * # ProgrammingStepctrlCtrl
 * Controller of the Lambda3WebApp
 */
angular.module('Lambda3WebApp')
	.controller('ProgrammingStepsCtrl', ['$scope', 'stepFactory', function ($scope, stepFactory) {
		$scope.stepTypes = stepFactory.stepTypes;

		$scope.context.extendReset(function () {
			$scope.steps = [stepFactory.getEveryStep()];
			$scope.triggeringStep = stepFactory.getStep("WaitFor");

		});

		function loadTriggeringStep(rule) {
			$scope.triggeringStep = stepFactory.getStep("WaitFor");
			$scope.triggeringStep.fillFrom({event_name: rule.trigger_name, type: "WaitFor"});


			rule.execution_steps.forEach(function (item, index) {
				console.log("item",item);
				$scope.steps[index] = stepFactory.createEveryStepFromRepr(item);
			})
		}



		$scope.addStep = function () {
			$scope.steps.push(stepFactory.getEveryStep());
		};

		$scope.removeStep = function (index) {
			$scope.steps.splice(index, 1);
		};
		$scope.context.reset();

		$scope.context.extendLoad(loadTriggeringStep);


	}]);
