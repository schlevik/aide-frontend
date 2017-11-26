'use strict';

/**
 * @ngdoc filter
 * @name Lambda3WebApp.filter:convertBoolean
 * @function
 * @description
 * # convertBoolean
 * Filter in the Lambda3WebApp.
 */
angular.module('Lambda3WebApp')
	.filter('convertBoolean', function () {
		return function (input) {
			if (input) {
				return 'Yes';
			} else {
				return 'No';
			}
		};
	});
