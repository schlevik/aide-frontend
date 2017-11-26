'use strict';

/**
 * @ngdoc service
 * @name Lambda3WebApp.GrapheneInformationExtraction
 * @description
 * # GrapheneInformationExtraction
 * Factory in the Lambda3WebApp.
 */
angular.module('Lambda3WebApp')
	.factory('GrapheneInformationExtraction', ['$resource', 'GRAPHENE_CONFIG', function ($resource, GRAPHENE_CONFIG) {

		return $resource(
			GRAPHENE_CONFIG.baseUrl,
			{}, // no default parameters
			{
				coreference: {
					url: GRAPHENE_CONFIG.baseUrl + 'coreference/text',
					method: 'POST'
				},

				simplification: {
					url: GRAPHENE_CONFIG.baseUrl + 'simplification/text',
					method: 'POST'
				},

				graphExtraction: {
					url: GRAPHENE_CONFIG.baseUrl + 'graphExtraction/text',
					method: 'POST'
				},

				graphExtractionJSON: {
					url: GRAPHENE_CONFIG.baseUrl + 'graphExtraction/rdf',
					method: 'POST'
				},

				graphExtractionRDF: {
					url: GRAPHENE_CONFIG.baseUrl + 'graphExtraction/rdf',
					method: 'POST',
					responseType: 'text',
					headers: {
						'Accept': 'text/plain'
					},
					transformResponse: function (data) {
						return {content: data};
					}
				}
			}
		);
	}]);

