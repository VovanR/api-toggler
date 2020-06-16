/**
 * ApiToggler
 *
 * @constructor
 * @param {Object} aliases
 * @public
 *
 * @example
 *
 *   var someApiToggler = new ApiToggler({
 *     name: 'first_name',
 *     surname: 'last_name'
 *   });
 *
 *   // String
 *   someApiToggler.toggle('name');
 *   //=> 'first_name'
 *
 *   // Object
 *   someApiToggler.toggle({first_name: 'Vladimir', last_name: 'Rodkin'});
 *   //=> {name: 'Vladimir', surname: 'Rodkin'}
 *
 *   // Array
 *   someApiToggler.toggle([{
 *     first_name: 'Vladimir',
 *     last_name: 'Rodkin'
 *   }, {
 *     first_name: 'Foo',
 *     last_name: 'Bar'
 *   }]);
 *   //=> [{name: 'Vladimir', surname: 'Rodkin'}, {name: 'Foo', surname: 'Bar'}]
 */
var ApiToggler = function (aliases) {
	aliases = aliases || {};

	// Fill mirrored aliases
	Object.keys(aliases).forEach(function (key) {
		aliases[aliases[key]] = key;
	});

	// @private
	this.aliases = aliases;
};

ApiToggler.prototype = {
	/**
	 * @param {string} key
	 * @returns {string}
	 * @public
	 */
	toggleApiKey: function (key) {
		return this.aliases[key] ? this.aliases[key] : key;
	},

	/**
	 * @param {Object} data
	 * @returns {Object}
	 * @public
	 */
	toggleApiObject: function (data) {
		var _this = this;
		var result = {};

		Object.keys(data).forEach(function (key) {
			result[_this.toggleApiKey(key)] = data[key];
		});

		return result;
	},

	/**
	 * @param {string|Object|Array} data
	 * @returns {string|Object|Array}
	 * @public
	 */
	toggle: function (data) {
		if (typeof data === 'string') {
			// Is String
			return this.toggleApiKey(data);
		}

		if (!Array.isArray(data)) {
			// Is Object
			return this.toggleApiObject(data);
		}

		// Is Array
		var _this = this;
		return data.map(function (data) {
			return _this.toggleApiObject(data);
		});
	}
};

module.exports = ApiToggler;
