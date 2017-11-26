'use strict';

//noinspection JSUnusedLocalSymbols
/**
 * @ngdoc service
 * @name Lambda3WebApp.StargraphKnowledgeBase
 * @description
 * # StargraphKnowledgeBase
 * Factory in the Lambda3WebApp.
 */
angular.module('Lambda3WebApp')
	.factory('StargraphKnowledgeBase', ['$resource', 'STARGRAPH_CONFIG', function ($resource, STARGRAPH_CONFIG) {

		return $resource(
			STARGRAPH_CONFIG.adminUrl + 'kb',
			{}, // no default parameters
			{
				getAvailableGraphs: {
					method: 'GET',
					isArray: true
				}
			}
		);


	}]);
