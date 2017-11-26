'use strict';

/**
 * @ngdoc directive
 * @name Lambda3WebApp.directive:aide/ieresponse.js
 * @description
 * # aide/ieresponse.js
 */
angular.module('Lambda3WebApp')
	.directive('marioResponse', function () {
		return {
			templateUrl: function (elem, attr) {
				return 'views/aide/templates/responses/' + attr.type + '.tpl.html';
			},
			link: function (scope) {
				scope.dismiss = function () {
					scope.output = false;
				};
			},
			restrict: 'E',
			scope: {
				'type': '=',
				'output': '='
			}
		};
	});
