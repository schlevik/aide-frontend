'use strict';

/**
 * @ngdoc service
 * @name Lambda3WebApp.aide/SemanticRelatedness
 * @description
 * # aide/getRelated
 * Service in the Lambda3WebApp.
 */
angular.module('Lambda3WebApp')
	.service('SemanticRelatedness', function (aide) {
		this.getRelated = function (type, value) {
			return aide
				.getRelated({"type": type, "text": value})
				.$promise;
		}
	});
