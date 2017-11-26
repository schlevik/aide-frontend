'use strict';

/**
 * @ngdoc function
 * @name Lambda3WebApp.controller:ProgrammingSparqlctrlCtrl
 * @description
 * # ProgrammingSparqlctrlCtrl
 * Controller of the Lambda3WebApp
 */
angular.module('Lambda3WebApp')
	.controller('ProgrammingSparqlCtrl', ['$scope', 'aide', 'lodash', function ($scope, aide, _) {
		$scope.whereRows = [];
		$scope.getAutoComplete = function (value, classes) {
			if (typeof(classes) === 'undefined') {
				classes = null;
			}
			return aide.getAutoComplete({"text": value, "classes": classes})
				.$promise
				.then(
					function (success) {
						console.log(success.proposals);
						return success.proposals;
					},
					function (error) {
						console.log("error:" + error);
						return [];
					});
		};

		function format(item) {
			if (item.includes("/")) {
				return item.split("/").splice(-2).join(":");
			} else {
				return item;
			}
		}

		function isDuplicate(item) {
			return $scope.whereRows
				.some(function (elem) {
					return format(elem.subject) === format(item.subject) && format(elem.predicate) === format(item.predicate) && format(elem.object) === format(item.object);
				});
		}

		$scope.onSelectPlain = function (index) {
			var row = $scope.whereRows[index];
			var selectedProposal = row.selectedProposal;
			while (isDuplicate(selectedProposal[0])) {
				selectedProposal.shift(1);
			}
			if (!isDuplicate(selectedProposal[0])) {
				row.toggle();
				row.subject = format(selectedProposal[0].subject);
				row.predicate = format(selectedProposal[0].predicate);
				row.object = format(selectedProposal[0].object);
			}

			if (selectedProposal.length > 1) {
				selectedProposal.forEach(function (item) {
					if (!isDuplicate(item)) {
						var newRow = $scope.whereRows[$scope.addWhereRow() - 1];
						newRow.toggle();
						newRow.subject = format(item.subject);
						newRow.predicate = format(item.predicate);
						newRow.object = format(item.object);
					}
				});
			}
			$scope.updateSparqlWhere();

		};

		$scope.updateSparqlWhere = () => $scope.sparqlWhere = $scope.getWhere();

		$scope.addWhereRow = function () {
			return $scope.whereRows.push({
				selectedProposal: "",
				subject: "",
				predicate: "",
				object: "",
				subjectClasses: "",
				objectClasses: "",
				type: "plain",

				isPlain: function () {
					return this.type === "plain";
				},
				isTriples: function () {
					return this.type === "triples";
				},
				toggle: function () {
					this.type = this.isPlain() ? "triples" : "plain";
				}

			});
		};

		$scope.removeWhereRow = function (index) {
			$scope.whereRows.splice(index, 1);
			$scope.updateSparqlWhere();
		};

		$scope.getWhere = function () {
			var result = "";
			$scope.whereRows.forEach(function (elem) {
				result += elem.subject + " " + elem.predicate + " " + elem.object + " .\n";
			});
			return result;
		};
	}]);
