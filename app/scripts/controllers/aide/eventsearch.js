'use strict';

/**
 * @ngdoc function
 * @name Lambda3WebApp.controller:AideEventsearchCtrl
 * @description
 * # AideEventsearchCtrl
 * Controller of the Lambda3WebApp
 */
angular.module('Lambda3WebApp')
	.controller('ProgrammingEventSearchCtrl', function ($scope, SemanticRelatedness, filterFilter, $uibModal) {


		function handleEventSources(name, ...items) {
			let result = [];

			items.forEach(function (item) {
				item.list.forEach(function (elem, index) {
					if (typeof(elem) === 'object') {
						if (index === 0) {
							elem.firstInGroup = true;
						}

						elem.source = item.categoryDescription;
						elem.paramList = _.join(elem.params, ", ");
						result.push(elem);
					}
					return elem;
				});
			});
			result.push({last: true, name: name});
			return result;
		}

		$scope.selected = false;
		$scope.getTypeAhead = function (value) {
			return SemanticRelatedness.getRelated("events", value).then(
				function (success) {
					const related = {
						list: success.result,
						categoryDescription: "Already defined earlier:"
					};
					const defined = {
						list: filterFilter($scope.context.getNewEvents(), value),
						categoryDescription: "Defined in this rule:"
					};
					return handleEventSources(value, defined, related);
				},
				function (error) {
					console.log(error);
				});

		};

		$scope.onSelected = function (item) {
			if (item.last) {
				return $scope.newEvent(item.name);
			}
		};
		$scope.delete = function () {
			$scope.event = "";
		};

		$scope.$watch("event", function (event) {
			if (!event) {
				$scope.selected = false;
			}
			if (typeof event === 'object') {
				$scope.selected = true;
			}

		});

		$scope.newEvent = function (name) {
			console.log("NAME", name);
			return $uibModal
				.open({
					templateUrl: "views/aide/templates/modals/createEventModal.tpl.html",
					controller: 'ProgrammingCreateEventModalCtrl',
					size: "lg",
					resolve: {
						event: {
							empty: true,
							name: name
						},
					}
				}).result
				.then(
					function (result) {
						$scope.event = result;
						return event;
					},
					function () {
					});
		}
	});
