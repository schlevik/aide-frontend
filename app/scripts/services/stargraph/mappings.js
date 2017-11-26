'use strict';

/**
 * @ngdoc service
 * @name Lambda3WebApp.StargraphMappings
 * @description
 * # StargraphMappings
 * Factory in the Lambda3WebApp.
 */
angular.module('Lambda3WebApp')
	.factory('StargraphMappings', ['$resource', 'STARGRAPH_CONFIG', function ($resource, STARGRAPH_CONFIG) {

		return $resource(
			STARGRAPH_CONFIG.baseUrl + 'mappings',
			{}, // no default parameters
			{
				send: {
					method: 'PUT'
				},
				updateAll: {
					url: STARGRAPH_CONFIG.adminUrl + 'mappingsByQuery',
					method: 'PUT'
				},
				getAll: {
					url: STARGRAPH_CONFIG.adminUrl + 'mappingsByQuery',
					method: 'GET'
				}
			}
		);
	}]);
