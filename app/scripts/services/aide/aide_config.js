'use strict';

const AIDE_BASE_URL = 'http://localhost:5000/aide/';

/**
 * @ngdoc service
 * @name Lambda3WebApp.MARIO_CONFIG
 * @description
 * # MARIO_CONFIG
 * Constant in the Lambda3WebApp.
 */
angular.module('Lambda3WebApp')
    .constant('AIDE_CONFIG', {
        baseUrl: AIDE_BASE_URL,
        version: '"Alluring Alliteration"'
    });
