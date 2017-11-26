'use strict';

/**
 * @ngdoc directive
 * @name Lambda3WebApp.directive:autofocus
 * @description
 * # autofocus
 */
angular.module('Lambda3WebApp')
	.directive('autofocus', ['$timeout', function ($timeout) {
		return {
			restrict: 'A',
			link: function (scope, element) {
				$timeout(function () {
					element[0].focus();
				});
			}
		};
	}]);
