'use strict';

/**
 * Gives the possibility to press Ctrl+Enter to submit the form when the input is a text area.
 *
 * @ngdoc directive
 * @name Lambda3WebApp.directive:textareaSubmit
 * @description
 * # textareaSubmit
 */
angular.module('Lambda3WebApp')
	.directive('textareaSubmit', function () {
		return {
			require: '^?form',
			restrict: 'A',
			link: function (scope, element) {

				function closestForm() {
					var parent = element.parent();
					while (parent.length && (parent[0].tagName !== 'FORM')) {
						parent = parent.parent();
					}
					return parent;
				}

				element.on('keydown', function (event) {
					if ((event.which === 13 || event.which === 10) && event.ctrlKey) {
						event.preventDefault();

						closestForm().triggerHandler('submit');
					}
				});
			}
		};
	});
