'use strict';

/**
 * @ngdoc directive
 * @name Lambda3WebApp.directive:aide/sparql
 * @description
 * # aide/sparql
 */
angular.module('Lambda3WebApp')
	.directive('sparqlTriples', function () {
		return {
			templateUrl: 'views/aide/templates/sparqlTriples.tpl.html',
			controller: 'ProgrammingSparqlCtrl',
			restrict: 'E',
			scope: {
				sparqlWhere: "="// two way binding

			},
			transclude: true,
		};
	});
