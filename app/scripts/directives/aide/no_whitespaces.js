'use strict';

/**
 * @ngdoc directive
 * @name Lambda3WebApp.directive:aide/noWhitespaces
 * @description
 * # aide/noWhitespaces
 */
angular.module('Lambda3WebApp')
	.directive('noSpaces', function () {
		return {
			require: 'ngModel',
			link: function (scope, element, attrs, ngModel) {
				attrs.ngTrim = 'false';

				element.bind('keydown', function (e) {
					if (e.which === 32) {
						e.preventDefault();
						return false;
					}
				});

				ngModel.$parsers.unshift(function (value) {
					var spacelessValue = value.replace(/ /g, '');

					if (spacelessValue !== value) {
						ngModel.$setViewValue(spacelessValue);
						ngModel.$render();
					}

					return spacelessValue;
				});
			}
		};
	});
