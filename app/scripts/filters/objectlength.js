'use strict';

/**
 * @ngdoc filter
 * @name Lambda3WebApp.filter:objectLength
 * @function
 * @description
 * # objectLength
 * Filter in the Lambda3WebApp.
 */
angular.module('Lambda3WebApp')
	.filter('objectLength', function () {
		return function (input) {
			return Object.keys(input).length;
		};
	});
