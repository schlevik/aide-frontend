'use strict';

/**
 * @ngdoc factory
 * @name Lambda3WebApp.StargraphSyntacticPatterns
 * @description
 * # StargraphSyntacticPatterns
 * Factory in the Lambda3WebApp.
 */
angular.module('Lambda3WebApp')
	.factory('StargraphSyntacticPatterns', ['$resource', 'STARGRAPH_CONFIG', function ($resource, STARGRAPH_CONFIG) {

		return $resource(
			STARGRAPH_CONFIG.baseUrl + '_admin/querySyntacticPatterns',
			{}, // no default parameters
			{
				get: {
					method: 'GET',
					isArray: true
				},
				reset: {
					url: STARGRAPH_CONFIG.baseUrl + '_admin/resetQuerySyntacticPatterns',
					method: 'POST'
				},
				send: {
					method: 'PUT',
					isArray: true
				}
			}
		);

	}]);
