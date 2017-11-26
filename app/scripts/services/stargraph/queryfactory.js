'use strict';

/**
 * @ngdoc service
 * @name Lambda3WebApp.StargraphQueryFactory
 * @description
 * # StargraphQueryFactory
 * Factory in the Lambda3WebApp.
 */
angular.module('Lambda3WebApp')
	.factory('StargraphQueryFactory',
		['$resource', 'STARGRAPH_CONFIG', 'StargraphEnrichEntity',
			function ($resource, STARGRAPH_CONFIG, StargraphEnrichEntity) {

				function filterScoredValues(data) {
					const values = [];
					angular.forEach(angular.fromJson(data).scores, function (entity) {
						values.push(entity.entry);
					}, values);
					return values;
				}

				const maxResults = 15;

				return $resource(
					STARGRAPH_CONFIG.baseUrl + 'entity',
					{}, // no default parameters
					{
						getEntities: {
							method: 'GET',
							isArray: true,
							params: {
								topk: maxResults
							},
							transformResponse: function (data) {
								const entities = filterScoredValues(data);
								angular.forEach(entities, function (entity) {
									entity.image = StargraphEnrichEntity.prototype.findImage(entity.id);
								}, entities);
								return entities;
							}
						},

						getPivotedProperties: {
							url: STARGRAPH_CONFIG.baseUrl + 'entity/pivoted',
							method: 'GET',
							isArray: true,
							params: {
								topk: maxResults,
								relationType: 'property'
							},
							transformResponse: function (data) {
								return filterScoredValues(data);
							}
						},

						getClasses: {
							url: STARGRAPH_CONFIG.baseUrl + 'entity',
							method: 'GET',
							isArray: true,
							params: {
								type: 'CLASS',
								model: 'W2V',
								topk: maxResults
							},
							transformResponse: function (data) {
								return filterScoredValues(data);
							}
						},

						getProperties: {
							url: STARGRAPH_CONFIG.baseUrl + 'entity',
							method: 'GET',
							isArray: true,
							params: {
								topk: maxResults,
								model: 'W2V',
								type: 'property'
							},
							transformResponse: function (data) {
								return filterScoredValues(data);
							}
						}
					}
				);

			}]);
