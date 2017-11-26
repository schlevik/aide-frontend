'use strict';

/**
 * @ngdoc service
 * @name Lambda3WebApp.StargraphQuery
 * @description
 * # StargraphQuery
 * Factory in the Lambda3WebApp.
 */
angular.module('Lambda3WebApp')
	.factory('StargraphQuery', ['$resource', 'STARGRAPH_CONFIG', function ($resource, STARGRAPH_CONFIG) {

		return $resource(
			STARGRAPH_CONFIG.baseUrl + 'query/',
			{}, // no default parameters
			{
				test: {
					method: 'POST',
					url: STARGRAPH_CONFIG.baseUrl + '_admin/testPatterns'
				}
			}
		);

	}]);
