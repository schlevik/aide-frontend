'use strict';

/**
 * @ngdoc function
 * @name Lambda3WebApp.controller:AideActionsearchCtrl
 * @description
 * # AideActionsearchCtrl
 * Controller of the Lambda3WebApp
 */
angular.module('Lambda3WebApp')
	.controller('ProgrammingFunctionSearchCtrl', function ($scope, SemanticRelatedness, stepFactory) {
		$scope.is = (mode, arg) => $scope.func.argValues[arg] ? $scope.func.argValues[arg].mode === mode : false;

		$scope.isMapping = (arg) => $scope.is("mapping", arg);
		$scope.isLiteral = (arg) => $scope.is("literal", arg);
		$scope.isFunction = (arg) => $scope.is("function", arg);

		$scope.toggleArg = function (arg, mode) {
			console.log("toggling");
			if (!$scope.func.argValues[arg]) {
				$scope.func.argValues[arg] = createArg();
			} else {
				$scope.func.argValues[arg].mode = mode;
			}
		};


		$scope.getTypeAhead = function (value) {
			return SemanticRelatedness.getRelated($scope.functionType, value).then(
				function (success) {
					return success.result;
				},
				function (error) {
					console.log(error);
				});
		};


		$scope.createArgsFrom = function ($item) {
			console.log($item);
			$scope.func = stepFactory.getFunction($item.name, $item.api, $item.args, $item.hinted_args);
			$scope.func.createArgs();
		};

	});
