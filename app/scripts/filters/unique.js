'use strict';

/**
 * @ngdoc filter
 * @name Lambda3WebApp.filter:unique
 * @function
 * @description
 * # unique
 * Filter in the Lambda3WebApp.
 */
angular.module('Lambda3WebApp')
	.filter('unique', ['lodash', function (lodash) {
		return function (arr, field) {
			return lodash.uniqBy(arr, field);
		};
	}]);
