'use strict';

/**
 * @ngdoc function
 * @name Lambda3WebApp.controller:ProgrammingCreateeventmodalCtrl
 * @description
 * # ProgrammingCreateeventmodalCtrl
 * Controller of the Lambda3WebApp
 */
angular.module('Lambda3WebApp')
	.controller('ProgrammingCreateEventModalCtrl', ['$scope', '$uibModalInstance', 'lodash', 'event',
		function ($scope, $uibModalInstance, _, event) {

			$scope.ok = function () {
				$uibModalInstance.close($scope.event);
			};
			$scope.cancel = function () {
				$uibModalInstance.dismiss('cancel');
			};

			/**
			 * Gets all params from the formatted sparql where clause.
			 *
			 * Basically gets all tokens which start with ? and are preceded with a whitespace character.
			 */
			$scope.getParams = function () {
				console.log($scope.event.sparqlWhere);
				$scope.event.possibleParams = _($scope.event.sparqlWhere.match(/(".*?")|(\S+)/g)) //split by whitespace
					.filter((elem) => elem[0] === '?') // filter for starting with ?
					.map((elem) => elem.slice(1)) // remove ?
					.filter((elem) => (elem)) // remove empty elements now (since something could be only a ? character)
					.uniq().value(); // deduplicate and finalize

				// if a param was removed, remove its according toggle value
				if ($scope.event.possibleParams.length < $scope.event.possibleParamValues.length) {
					$scope.event.possibleParamValues = $scope.event.possibleParamValues.slice(0, $scope.event.possibleParams.length);

				}

				// assign toggle value (true/false) for each param. If a param is new, assign true (toggled) initially, else, assign current value.
				$scope.event.possibleParams.forEach(function (elem, index) {
					$scope.event.possibleParamValues[index] =
						typeof $scope.event.possibleParamValues[index] === 'undefined' ? true : $scope.event.possibleParamValues[index];
				});

				$scope.updateParams();
			};

			/**
			 * Updates the events param list based on their toggle status.
			 */
			$scope.updateParams = function () {
				$scope.event.params = _($scope.event.possibleParams).filter((elem, index) => $scope.event.possibleParamValues[index]).value();
			};

			/**
			 * Toggles the param to be exposed or not.
			 * @param index Index of param to be toggled.
			 */
			$scope.toggleParam = function (index) {
				console.log("toggling param at", index);
				$scope.event.possibleParamValues[index] = !$scope.event.possibleParamValues[index];
				console.log("toggled");
				$scope.updateParams();
			};

			function createEvent() {
				return {
					name: event.name,
					params: [],
					executionType: 1,
					range: 2,
					rangeUnit: "s",
					step: 1,
					stepUnit: "s",
					sparqlWhere: "",
					new: true,
					whereRows: [],
					possibleParams: [],
					possibleParamValues: [],
					sparqlTriples: "",
					additionalSparql: "",

					formatInternalSparqlWhere: function() {
						let result = "";
						this.sparqlWhere.split(/\r?\n/).forEach(function (elem) {
							if (/\S/.test(elem)) {
								let row = "";
								elem.split(/\ +/).forEach(function (elem) {
									if (/\S/.test(elem)) {
										if (/:/.test(elem) && !(/\^\^/.test(elem))) {
											const split = elem.split(":");
											row += "<http://lambda3.org/aide/"+ split[0] + "/" + split[1]  + "> ";
										}
										else {
											row += elem + " ";
										}
									}
								});
								result += row + " .\n";
							}
						});
						return result;
					},

					repr: function () {
						const event = this;
						return {
							name: event.name,
							params: event.params,
							executionType: event.executionType,
							range: event.range,
							rangeUnit: event.rangeUnit,
							step: event.step,
							stepUnit: event.stepUnit,
							sparqlWhere: event.formatInternalSparqlWhere(),
						}
					}
				}
			}


			$scope.event = !event.empty ? event : createEvent();

// $scope.params = [];
// $scope.paramValues = [];
			$scope.timeUnits = ["s", "m", "h", "d"];
// $scope.sparqlTriples = "";
// $scope.additionalSparql = "";

			console.log("EVENT", $scope.event);



			/**
			 * Combines triples and text area to a sparql clause.
			 */
			function setSparqlWhere() {
				const triples = typeof($scope.event.sparqlTriples) === "undefined" ? "" : $scope.event.sparqlTriples;
				console.log("TRIPLES", triples);
				$scope.event.sparqlWhere = triples + $scope.event.additionalSparql;

				$scope.updateParams();
			}

			/**
			 * Watch sparql triples and additional sparql to combine it together to a sparql where clause.
			 */
			$scope.$watch("event.sparqlTriples", setSparqlWhere);
			$scope.$watch("event.additionalSparql", setSparqlWhere);

			$scope.$watch('event.sparqlWhere', () => $scope.getParams());

			function initParams() {
				const incomingParams = event.params;
				$scope.getParams();
				console.log("found params: ", $scope.event.possibleParams);
				console.log("param values:", $scope.event.possibleParamValues);
				console.log("incoming params: ", incomingParams);
				$scope.event.params.forEach(function (elem, index) {
					console.log("regarding param", elem);
					console.log("incoming params: ", incomingParams);
					const equals = _.some(incomingParams, function (a) {
						return a === elem;
					});
					if (!equals) {
						$scope.toggleParam(index);
					}
				});
				console.log("param values", $scope.event.possibleParamValues);
			}

			$scope.getKeys = () => Object.keys($scope.event);

			if (!event.empty) {
				console.log("INITIALIZING");
				setSparqlWhere();
				$scope.updateParams();
				initParams();
			}

		}])
;
