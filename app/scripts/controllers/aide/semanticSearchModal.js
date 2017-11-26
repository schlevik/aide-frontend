'use strict';

/**
 * @ngdoc function
 * @name Lambda3WebApp.controller:ProgrammingSemanticsearchmodalCtrl
 * @description
 * # ProgrammingSemanticsearchmodalCtrl
 * Controller of the Lambda3WebApp
 */
angular.module('Lambda3WebApp')
	.controller('ProgrammingSemanticSearchModalCtrl', function($scope, $uibModalInstance, semanticSearch, aide) {
		$scope.ok = function() {
			$uibModalInstance.close($scope.func);
		};
		$scope.getFunctions = function(value) {
			return aide
				.getRelated({
					"type": semanticSearch.ApiFunctions,
					"text": value
				})
				.$promise
				.then(
					function(success) {
						console.log(success);
						console.log(success.result);
						return success.result;
					},
					function(error) {
						return [];
					}
				);
		};

		$scope.cancel = function() {
			$uibModalInstance.dismiss('cancel');
		};
	});
