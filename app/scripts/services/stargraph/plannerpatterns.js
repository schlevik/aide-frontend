'use strict';

/**
 * @ngdoc service
 * @name Lambda3WebApp.StargraphPlannerPatterns
 * @description
 * # StargraphPlannerPatterns
 * Factory in the Lambda3WebApp.
 */
angular.module('Lambda3WebApp')
	.factory('StargraphPlannerPatterns', ['$resource', 'STARGRAPH_CONFIG', function ($resource, STARGRAPH_CONFIG) {

		return $resource(
			STARGRAPH_CONFIG.baseUrl + '_admin/queryPlannerPatterns',
			{}, // no default parameters
			{
				get: {
					method: 'GET',
				},
				reset: {
					url: STARGRAPH_CONFIG.baseUrl + '_admin/resetQueryPlannerPatterns',
					method: 'POST'
				},
				send: {
					method: 'PUT',
				}
			}
		);

	}]);
