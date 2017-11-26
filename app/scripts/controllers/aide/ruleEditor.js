'use strict';

/**
 * @ngdoc function
 * @name Lambda3WebApp.controller:ProgrammingRuleeditorCtrl
 * @description
 * # ProgrammingRuleeditorCtrl
 * Controller of the Lambda3WebApp
 */
angular.module('Lambda3WebApp')
	.controller('ProgrammingRuleEditorCtrl', ['$scope', "aide", "$mdSidenav", "lodash",
		function ($scope, aide, $mdSidenav, _) {
			$scope.message = "";

			/**
			 * Get all occuring events.
			 */
			function getEvents(source) {
				// all steps
				let events = _($scope.steps)
				// filter by type where an event occurs
					.filter((step) => step.type === "WaitFor" || step.type === "RepeatUntil")
					// map step to event
					.map((step) => step.type === "WaitFor" ? step.WaitFor.event : step.RepeatUntil.WaitFor.event)
					// filter out undefined
					.filter((event) => typeof(event) !== 'undefined')
					// show unique only
					.uniqBy('name')
					.value();

				// if triggering step defined, add
				if (typeof($scope.triggeringStep) !== 'undefined' && typeof($scope.triggeringStep.event) === 'object') {
					try {
						events.push($scope.triggeringStep.event);
					} catch (error) {
						events = [$scope.triggeringStep.event];
					}
				}

				switch (source) {
					case "old":
						return _(events)
						// filter out new
							.filter(function (event) {
								return !event['new'] || event['new'] === false;
							})
							.uniqBy('name')
							.value();

					case "new":
						return _(events)
						// filter out already defined
							.filter(function (event) {
								return event['new'] && event['new'] === true;
							})
							.uniqBy('name')
							.value();

					default:
						return events;
				}
			}

			/**
			 * Gets all params occuring in current routine.
			 */
			function getParams() {
				const evts = getEvents();
				console.log(evts);
				return _(evts)
					.map((event) => event.params)
					.flatten()
					.uniq()
					.value();
			}

			const resetFunctions = [];
			const loadFunctions = [];
			/**
			 * Context object passed to different controllers in order for the to be able to access events, params, etc.
			 *
			 */
			$scope.context = {
				getParams: getParams,
				getEvents: () => getEvents(),
				getNewEvents: () => getEvents("new"),
				getExistingEvents: () => getEvents("old"),


				extendReset: (fnc) => resetFunctions.push(fnc),
				extendLoad: (fnc) => loadFunctions.push(fnc),

				reset: function () {
					resetFunctions.forEach((fnc) => fnc())
				},

				load: function (rule) {
					loadFunctions.forEach((fnc) => fnc(rule))
				}

			};

			/**
			 * Checks if a given event is defined.
			 * @param event Event to be checked.
			 * @returns {boolean} true if defined, false otherwise.
			 */
			$scope.isDefined = function (event) {
				return typeof (event) === 'object';
			};


			/**
			 * Resets the view
			 */
			$scope.reset = function () {
				$scope.name = "";
				$scope.description = "";
				$scope.loading = false;

				$scope.context.reset();

			};


			/**
			 * Toggler for the Rule list appearing to the right.
			 * @param componentId 'left' or 'right'.
			 * @returns {Function} Returns a function which toggles a sidebar menu.
			 */
			function buildToggler(componentId) {
				return function () {
					$mdSidenav(componentId).toggle();
					if (!$scope.ruleList) {
						$scope.getRules();
					}
				};
			}

			/**
			 * Function to call to toggle the menu on the left side.
			 * @type {Function}
			 */
			$scope.toggleLeft = buildToggler('left');

			$scope.buildRule = function () {
				let trigger = "";
				try {
					trigger = $scope.triggeringStep.event;
				} catch (error) {
				}
				$scope.routine = {
					name: $scope.name,
					description: $scope.description,
					trigger_name: trigger ? trigger.name : undefined,
					execution_steps: []

				};
				if ($scope.steps) {
					$scope.steps.forEach(function (step) {
						try {
							$scope.routine.execution_steps.push(step[step.type].toJson());
						} catch (error) {
						}

					});
				}

				$scope.newEvents = $scope.context.getNewEvents();
				return $scope.routine;

			};
			$scope.saveRule = function () {

				$scope.buildRule();
				$scope.loading = true;
				const events = _($scope.newEvents).map((event) => event.repr()).value();
				aide.postRule({"routine": $scope.routine, "events": events})
					.$promise
					.then(
						function (result) {
							let msg = "Save a rule with the name " + $scope.name + ": Your Result: ";
							msg += result.success === true ? "Successful!" : "Unsuccessful!";
							$scope.message = msg;

							$scope.error = false;
							$scope.getRules();
							$scope.reset();
						},
						function (error) {
							$scope.error = error;
							$scope.loading = false;
						});
			};


			function loadRule(rule) {
				$scope.reset();
				$scope.name = rule.name;
				$scope.description = rule.description;
				$scope.context.load(rule);
			}

			$scope.delete = function () {
				$scope.message = false;
				$scope.loading = true;
				aide.deleteRule({'name': $scope.name})
					.$promise
					.then(function (result) {
							let msg = "Delete a rule with the name " + $scope.name + ". Your Were: ";
							msg += result.success === true ? "Successful!" : "Unsuccessful!";
							$scope.message = msg;
							$scope.reset();

							$scope.error = false;
							$scope.loading = false;
							$scope.getRules();
						},
						function (error) {
							$scope.error = error;
							$scope.loading = false;
						});
			};

			$scope.getRule = function (name) {
				$scope.loading = true;
				$scope.message = false;
				aide.getRule({'q': name})
					.$promise
					.then(
						function (success) {
							loadRule(success.routine);
							$scope.toggleLeft();
							$scope.loading = false;

						},
						function (error) {
							$scope.error = error;
							$scope.toggleLeft();
							$scope.loading = false;
						}
					);
			};


			$scope.getRules = function () {
				aide
					.getRules()
					.$promise
					.then(
						function (success) {
							$scope.ruleList = success.routines;
							console.log("Got Rules!");
						},
						function (error) {
							$scope.error = error;
						}
					);

			};
			$scope.reset();
			$scope.getRules();
		}

	]);
