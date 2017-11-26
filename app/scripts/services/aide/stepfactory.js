'use strict';

/**
 * @ngdoc service
 * @name Lambda3WebApp.aide/stepFactory
 * @description
 * # aide/stepFactory
 * Service in the Lambda3WebApp.
 */
angular.module('Lambda3WebApp')
	.factory('stepFactory', ["aide", "lodash",
		function (aide, _) {
			
			function getEvent(name) {
				return aide.getEvent({"name": name}).$promise.then((success) => success.event_listener);
			}

			/**
			 * Representation of the WaitFor step.
			 * @constructor
			 */
			function WaitFor() {
				this.repr = function () {
					const step = this;
					return {
						type: "WaitFor",
						event_name: step.event.name,
					}
				};

				this.toJson = () => angular.toJson(this.repr());
				this.fillFrom = function (stepRepr) {

					const step = this;

					if (stepRepr.type !== "WaitFor") {
						return
					}

					getEvent(stepRepr.event_name).then(function (event) {
						step.event = event;
					});

				}
			}



			/**
			 * Prepares the args of a function for json encoding.
			 * @param func function object to prepare.
			 * @returns {{function: string, mapping: {}, literals: {}, funcs: {}}}
			 */
			function prepareArgs(func) {
				if (typeof func !== "object") {
					return;
				}

				const functionName = func.api + "." + func.name;
				const mapping = {};
				const literals = {};
				const funcs = {};
				func.args.forEach(function (arg) {

					switch (func.argValues[arg].mode) {
						case "mapping":
							mapping[arg] = func.argValues[arg].mapTo;
							break;
						case "literal":
							literals[arg] = func.argValues[arg].value;
							break;
						case "function":
							const fnc = func.argValues[arg].func;
							funcs[arg] = prepareArgs(fnc);
							break;
						default:
							break;
					}
				});
				return {
					function: functionName,
					mapping: mapping,
					literals: literals,
					funcs: funcs
				}
			}

			/**
			 * Representation of the Execute step.
			 * @constructor
			 */
			function Execute() {
				this.func = undefined;

				this.repr = function () {
					let result = prepareArgs(this.func);
					result.type = "Execute";
					return result;
				};

				this.toJson = () => angular.toJson(this.repr());
				this.fillFrom = function (stepRepr) {
					const funcName = stepRepr.function.split(".");
					const name = funcName[1];
					const api = funcName[0];
					this.func = new Function(name, api);
					this.func.fillFrom(stepRepr.mapping, stepRepr.literals, stepRepr.funcs);

				}


			}

			function createArg(mode, name, type) {
				return {
					//mode can be mapping/function/literal/off
					mode: mode ? mode : "mapping",
					name: name,
					type: type ? type : "text",


				};
			}

			function fromPythonType(pythonType) {
				switch (pythonType) {
					case 'int':
					case 'float':
					case 'long':
						return "number";
					case 'bool':
						return "checkbox";
					default:
						return "text";

				}
			}

			function Function(name, api, args, argTypes) {
				this.name = name;
				this.api = api;
				this.args = args;
				this.argTypes = argTypes;
				this.argValues = {};


				this.createArgs = function () {
					const self = this;
					this.args.forEach(function (arg) {
						let argType;
						try {
							argType = self.argTypes[arg];
							argType = fromPythonType(argType);
						} catch (error) {
							argType = "text";
						}
						self.argValues[arg] = createArg(false, arg, argType);

					});
				};

				this.fillFrom = function (mapping, literals, funcs) {

					this.args = _(Object.keys(mapping))
						.union(Object.keys(literals))
						.union(Object.keys(funcs)).value();

					this.argValues = {};
					const self = this;
					Object.keys(mapping).forEach(function (arg) {
						self.argValues[arg] = createArg("mapping", arg);
						self.argValues[arg].mapTo = mapping[arg];
					});
					Object.keys(literals).forEach(function (arg) {
						self.argValues[arg] = createArg("literal", arg);
						self.argValues[arg].value = literals[arg];
					});
					Object.keys(funcs).forEach(function (arg) {
						self.argValues[arg] = createArg("function", arg);

						const funcName = funcs[arg].function.split(".");
						const name = funcName[1];
						const api = funcName[0];
						self.argValues[arg].func = new Function(name, api);
						self.argValues[arg].func.fillFrom(funcs[arg].mapping, funcs[arg].literals, []);
					})


				};

			}


			/**
			 * Representation of the RepeatUntil step.
			 * @constructor
			 */
			function RepeatUntil() {
				this.WaitFor = new WaitFor();
				this.Execute = new Execute();

				this.repr = function () {
					const step = this;
					return {
						type: "RepeatUntil",
						wait_for: step.WaitFor.event.name,
						execute_steps: step.Execute.repr()
					}
				};

				this.toJson = () => angular.toJson(this.repr());

				this.fillFrom = function (stepRepr) {
					this.WaitFor.fillFrom({event_name: stepRepr.wait_for});
					this.Execute.fillFrom(stepRepr.execute_steps);

				}
			}

			return {
				/**
				 * Execution types implemented.
				 */
				types: ["Execute", "WaitFor", "RepeatUntil"],
				/**
				 * Gets one step of every type.
				 * @returns {{type: string, Execute: (*|{}), WaitFor: (*|{}), RepeatUntil: (*|{})}}
				 */
				getEveryStep: function () {
					const sf = this;
					return {
						type: "Execute",
						Execute: sf.getStep("Execute"),
						WaitFor: sf.getStep("WaitFor"),
						RepeatUntil: sf.getStep("RepeatUntil")
					}
				},

				createEveryStepFromRepr: function (stepRepr) {
					stepRepr = typeof stepRepr === 'string' ? angular.fromJson(stepRepr) : stepRepr;
					const everyStep = this.getEveryStep();

					everyStep.type = stepRepr.type;

					everyStep[stepRepr.type].fillFrom(stepRepr);

					return everyStep;


				},

				/**
				 * Returns a step defined by type.
				 * @param type Type of the step.
				 * @returns {*}
				 */
				getStep: function (type) {

					switch (type) {
						case "Execute":
							return new Execute();
						case "WaitFor":
							return new WaitFor();
						case "RepeatUntil":
							return new RepeatUntil();
						default:
							return {};
					}
				},

				getFunction: function (name, api, args, argTypes) {
					return new Function(name, api, args, argTypes);
				}

			}

		}])
;
