'use strict';

/**
 * @ngdoc service
 * @name Lambda3WebApp.aide/aide.js
 * @description
 * # aide/aide.js
 * Service to connect to the AIDE rest api.
 */
angular.module('Lambda3WebApp')
	.factory('aide', function ($resource, AIDE_CONFIG) {
		const top_k = 3;
		return $resource(
			AIDE_CONFIG.baseUrl, {}, // no default parameters
			{

				postRule: {
					url: AIDE_CONFIG.baseUrl + 'rules',
					method: 'POST',
					headers: {
						"Content-Type": "application/json"
					}
				},

				getClasses: {
					url: AIDE_CONFIG.baseUrl + 'classes',
					method: 'GET'
				},

				getRules: {
					url: AIDE_CONFIG.baseUrl + 'routines',
					method: 'GET'
				},

				getRule: {
					method: 'GET',
					url: AIDE_CONFIG.baseUrl + 'routines/:q',
					params: {
						q: ':q'
					}
				},

				deleteRule: {
					method: 'DELETE',
					url: AIDE_CONFIG.baseUrl + 'routines/:name',
					params: {
						name: ':name'
					}
				},

				getEvent: {
					method: 'GET',
					url: AIDE_CONFIG.baseUrl + 'events/:name',
					params: {
						name: ':name'
					}
				},

				formatCode: {
					method: 'POST',
					url: AIDE_CONFIG.baseUrl + 'format',
					headers: {
						"Content-Type": "application/json",
						"Accept": "application/json"
					},
				},

				getFunctions: {
					url: AIDE_CONFIG.baseUrl + 'functions',
					method: 'GET'
				},

				getRelated: {
					url: AIDE_CONFIG.baseUrl + ':type/:text/related/' + top_k,
					params: {
						text: ':text',
						type: ':type'
					},
					method: 'GET'
				},

				getRelatedClasses: {
					url: AIDE_CONFIG.baseUrl + 'classes/:text/related/' + top_k,
					params: {
						text: ':text'
					},
					method: 'GET'
				},

				getAutoComplete: {
					url: AIDE_CONFIG.baseUrl + 'qp',
					headers: {
						"Content-Type": "application/json",
						"Accept": "application/json"
					},
					method: 'POST'
				},

				getApis: {
					url: AIDE_CONFIG.baseUrl + ':type',
					method: 'GET',
					params: {
						type: ':type'
					}
				},
				getApi: {
					method: 'GET',
					url: AIDE_CONFIG.baseUrl + ':type/:name',
					params: {
						name: ':name',
						type: ':type'
					}
				},
				deleteApi: {
					method: 'DELETE',
					url: AIDE_CONFIG.baseUrl + ':type/:name',
					params: {
						name: ':name',
						type: ':type'
					}
				},

				postApi: {
					method: 'POST',
					url: AIDE_CONFIG.baseUrl + ':type',
					headers: {
						"Content-Type": "application/json",
						"Accept": "application/json"
					},
					params: {
						type: ':type'
					},
				},
				getExtractors: {
					url: AIDE_CONFIG.baseUrl + 'extractors',
					method: 'GET'
				},
				getExtractor: {
					method: 'GET',
					url: AIDE_CONFIG.baseUrl + 'extractors/:name',
					params: {
						name: ':name'
					}
				},
				postExtractor: {
					method: 'POST',
					url: AIDE_CONFIG.baseUrl + 'extractors/:name',
					headers: {
						"Content-Type": "application/json",
						"Accept": "application/json"
					},
				},
				getActionProviders: {
					url: AIDE_CONFIG.baseUrl + 'actions',
					method: 'GET'
				},
				getActionProvider: {
					method: 'GET',
					url: AIDE_CONFIG.baseUrl + 'actions/:name',
					params: {
						name: ':name'
					}
				},
				postActionProvider: {
					method: 'POST',
					url: AIDE_CONFIG.baseUrl + 'actions/:name',
					headers: {
						"Content-Type": "application/json",
						"Accept": "application/json"
					},
				},

				postFunction: {
					method: 'POST',
					url: AIDE_CONFIG.baseUrl + 'functions',
					headers: {
						"Content-Type": "application/json"
					},
					transformResponse: function (data) {
						console.log("Transforming response!");
						return {name: data};
					}
				}
			}
		);
	});
