'use strict';

/**
 * @ngdoc function
 * @name Lambda3WebApp.controller:ProgrammingEventctrlCtrl
 * @description
 * # ProgrammingEventCtrl
 * Controller for the event preview directive.
 *
 * Has only one function to format the sparql where clause.
 */
angular.module('Lambda3WebApp')
	.controller('ProgrammingEventRepresentationCtrl', ['$scope', 'lodash', '$uibModal', function ($scope, _, $uibModal) {
		/**
		 * Formats the sparql where clause removing the enbracing.
		 *
		 * @returns {string} where clause without brackets.
		 */
		$scope.formatSparqlWhere = function () {
			let sparqlWhere = $scope.event.sparqlWhere;
			sparqlWhere = sparqlWhere ? sparqlWhere : "{ }";
			return "\n" + sparqlWhere.substring(1, sparqlWhere.length - 1);
		};

		$scope.edit = function () {
			const oldEvent = angular.copy($scope.event);
			return $uibModal
				.open({
					templateUrl: "views/aide/templates/modals/createEventModal.tpl.html",
					controller: 'ProgrammingCreateEventModalCtrl',
					size: "lg",
					resolve: {
						event: $scope.event
					}
				}).result
				.then(
					function (result) {
					},
					function () {
						const keys = Object.keys($scope.event);
						console.log("KEYS", keys);
						keys.forEach(function (key) {
							$scope.event[key] = oldEvent[key] ? oldEvent[key] : "";
						})
					});
		}
	}]);
