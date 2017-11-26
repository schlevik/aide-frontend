'use strict';

const INDRA_BASE_URL = 'https://localhost:8916/';

/**
 * @ngdoc service
 * @name Lambda3WebApp.INDRA_CONFIG
 * @description
 * # INDRA_CONFIG
 * Constant in the Lambda3WebApp.
 */
angular.module('Lambda3WebApp')
	.constant('INDRA_CONFIG', {
		baseUrl: INDRA_BASE_URL,

		version: '1.0.0-SNAPSHOT',

		username: 'indra-api',
		password: 'wCL4hc8KlSfOnKdAo5',

		defaultLanguage: 'EN',
		defaultScoreFunction: 'COSINE',
		defaultModel: 'W2V',
		defaultCorpus: 'wiki-2014',

		availableLanguages: [
			{name: 'English', value: 'EN'},
			{name: 'German', value: 'DE'},
			{name: 'Portuguese', value: 'PT'},
			{name: 'Chinese', value: 'ZH'},
			{name: 'Korean', value: 'KO'},
			{name: 'Spanish', value: 'ES'},
			{name: 'French', value: 'FR'},
			{name: 'Swedish', value: 'SV'},
			{name: 'Italian', value: 'IT'},
			{name: 'Dutch', value: 'NL'},
			{name: 'Russian', value: 'RU'},
			{name: 'Arabic', value: 'AR'},
			{name: 'Persian', value: 'FA'},
			{name: 'Japanese', value: 'JP'}
		],

		availableScoreFunctions: [
			{name: 'AlphaSkew', value: 'ALPHASKEW'},
			{name: 'Chebyshev', value: 'CHEBYSHEV'},
			{name: 'Cityblock', value: 'CITYBLOCK'},
			{name: 'Correlation', value: 'CORRELATION'},
			{name: 'Cosine', value: 'COSINE'},
			{name: 'Dice', value: 'DICE'},
			{name: 'Euclidean', value: 'EUCLIDEAN'},
			{name: 'Jaccard', value: 'JACCARD'},
			{name: 'Jaccard2', value: 'JACCARD2'},
			{name: 'JensenShannon', value: 'JENSENSHANNON'},
			{name: 'Lin', value: 'LIN'},
			{name: 'Tanimoto', value: 'TANIMOTO'}
		],

		availableModels: [
			{name: 'ESA', value: 'ESA'},
			{name: 'GLOVE', value: 'GLOVE'},
			{name: 'LSA', value: 'LSA'},
			{name: 'W2V', value: 'W2V'},
			{name: 'DEP', value: 'DEP'}
		],

		availableCorpora: {
			EN: [{name: 'WIKI-2014', value: 'wiki-2014'}],
			DE: [{name: 'WIKI-2014', value: 'wiki-2014'}],
			PT: [{name: 'WIKI-2014', value: 'wiki-2014'}],
			ZH: [{name: 'WIKI-2014', value: 'wiki-2014'}],
			KO: [{name: 'WIKI-2016', value: 'wiki-2016'}],
			ES: [{name: 'WIKI-2014', value: 'wiki-2014'}],
			FR: [{name: 'WIKI-2014', value: 'wiki-2014'}],
			SV: [{name: 'WIKI-2014', value: 'wiki-2014'}],
			IT: [{name: 'WIKI-2014', value: 'wiki-2014'}],
			NL: [{name: 'WIKI-2014', value: 'wiki-2014'}],
			RU: [{name: 'WIKI-2014', value: 'wiki-2014'}],
			AR: [{name: 'WIKI-2014', value: 'wiki-2014'}],
			FA: [{name: 'WIKI-2014', value: 'wiki-2014'}],
			JP: [{name: 'WIKI-2016', value: 'wiki-2016'}]
		}
	});
