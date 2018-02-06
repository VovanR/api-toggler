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
	 * toggleApiKey
	 *
	 * @param {string} key
	 * @returns {string}
	 * @public
	 */
	toggleApiKey: function (key) {
		return this.aliases[key] ? this.aliases[key] : key;
	},

	/**
	 * toggleApiObject
	 *
	 * @param {Object} data
	 * @returns {Object}
	 * @public
	 */
	toggleApiObject: function (data) {
		return Object.keys(data).reduce(function (a, b) {
			a[this.toggleApiKey(b)] = data[b];

			return a;
		}.bind(this), {});
	},

	/**
	 * toggle
	 *
	 * @param {string|Object|Array} data
	 * @returns {string|Object|Array}
	 * @public
	 */
	toggle: function (data) {
		if (typeof data === 'string') {
			// is String
			return this.toggleApiKey(data);
		} else if (!Array.isArray(data)) {
			// is Object
			return this.toggleApiObject(data);
		}

		// is Array
		return data.map(this.toggleApiObject.bind(this));
	}
};

module.exports = ApiToggler;
