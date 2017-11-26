'use strict';

/**
 * @ngdoc service
 * @name Lambda3WebApp.StargraphNamedEntities
 * @description
 * # StargraphNamedEntities
 * Factory in the Lambda3WebApp.
 */
angular.module('Lambda3WebApp')
	.factory('StargraphNamedEntities', ['$resource', 'STARGRAPH_CONFIG', function ($resource, STARGRAPH_CONFIG) {

		return $resource(
			STARGRAPH_CONFIG.baseUrl + 'ner/link',
			{}, // no default parameters
			{
				findAndLink: {
					method: 'POST'
				}
			}
		);

	}]);
