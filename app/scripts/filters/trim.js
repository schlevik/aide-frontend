'use strict';

/**
 * @ngdoc filter
 * @name Lambda3WebApp.filter:trim
 * @function
 * @description
 * # trim
 * Filter in the Lambda3WebApp.
 */
angular.module('Lambda3WebApp')
	.filter('trim', function () {
		return function (input) {
			if (input) {
				return input.trim();
			}
		};
	});
