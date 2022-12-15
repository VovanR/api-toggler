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
	for (const [key, value] of Object.entries(aliases)) {
		aliases[value] = key;
	}

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
		var result = {};

		for (const [key, value] of Object.entries(data)) {
			result[this.toggleApiKey(key)] = value;
		}

		return result;
	},

	/**
	 * @param {string|Object|Array} data
	 * @returns {string|Object|Array}
	 * @public
	 */
	toggle: function (data) {
		if (data === null || typeof data === 'undefined') {
			return data;
		}

		if (typeof data === 'string') {
			// Is String
			return this.toggleApiKey(data);
		}

		if (!Array.isArray(data)) {
			// Is Object
			return this.toggleApiObject(data);
		}

		// Is Array
		return data.map(data => this.toggleApiObject(data));
	}
};

module.exports = ApiToggler;
