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
			console.log($scope.event.whereRows);
			return $scope.event.whereRows
				.some(function (elem) {					
					return format(elem.subject) === format(item.subject) && format(elem.predicate) === format(item.predicate) && format(elem.object) === format(item.object);
				});
		}

		$scope.onSelectPlain = function (index) {
			console.log(index);
			console.log($scope.event.whereRows);
			console.log($scope.event.whereRows[0]);
			var row = $scope.event.whereRows[index];
			console.log("ROW", row);
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
						var newRow = $scope.event.whereRows[$scope.addWhereRow() - 1];
						newRow.toggle();
						newRow.subject = format(item.subject);
						newRow.predicate = format(item.predicate);
						newRow.object = format(item.object);
					}
				});
			}
			$scope.updateSparqlWhere();

		};

		$scope.updateSparqlWhere = () => $scope.event.sparqlTriples = $scope.getWhere();

		$scope.addWhereRow = function () {
			return $scope.event.whereRows.push({
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
			$scope.event.whereRows.splice(index, 1);
			$scope.updateSparqlWhere();
		};

		$scope.getWhere = function () {
			var result = "";
			$scope.event.whereRows.forEach(function (elem) {
				//const strng = elem.object;
				//if (!(/:/.test(strng) || /\?/.test(strng)) && (strng[0] !== '"' && strng[strng.length-1] !== '"')) {
				//	console.log("snd predicate:", (strng[0] !== '"' && strng[strng.length-1] !== '"'));
				//	elem.object = '"' + elem.object  +'"';
				//}
				result += elem.subject + " " + elem.predicate + " " + elem.object + "\n";
			});
			return result;
		};
	}]);
