'use strict';

/**
 * @ngdoc service
 * @name Lambda3WebApp.Version
 * @description
 * # Version
 * Factory in the Lambda3WebApp.
 */
angular.module('Lambda3WebApp')
    .factory('Version', [
        'STARGRAPH_CONFIG', 'GRAPHENE_CONFIG', 'INDRA_CONFIG', 'AIDE_CONFIG', '$resource',
        function(STARGRAPH_CONFIG, GRAPHENE_CONFIG, INDRA_CONFIG, AIDE_CONFIG, $resource) {

            return $resource(
                null, // different URL for each remote
                null, // no default parameters
                {
                    stargraph: {
                        url: STARGRAPH_CONFIG.adminUrl + '_version',
                        method: 'GET'
                    },

                    graphene: {
                        url: GRAPHENE_CONFIG.adminUrl + 'version',
                        method: 'GET'
                    },

                    indra: {
                        url: INDRA_CONFIG.baseUrl + '_version',
                        method: 'GET'
                    },
                    aide: {
                        url: AIDE_CONFIG.baseUrl + '_version',
                        method: 'GET'
                    }
                }
            );
        }
    ]);
