var ApiToggler = function (aliases) {
	aliases = aliases || {};

	// Fill mirrored aliases
	Object.keys(aliases).forEach(key => {
		aliases[aliases[key]] = key;
	});

	this.aliases = aliases;
};

ApiToggler.prototype = {
	toggleApiKey: function (key) {
		return this.aliases[key] ? this.aliases[key] : key;
	},

	toggleApiObject: function (data) {
		return Object.keys(data).reduce((a, b) => {
			a[this.toggleApiKey(b)] = data[b];

			return a;
		}, {});
	},

	toggle: function (data) {
		if (typeof data === 'string') {
			return this.toggleApiKey(data);
		} else if (!Array.isArray(data)) {
			return this.toggleApiObject(data);
		}

		return data.map(this.toggleApiObject.bind(this));
	}
};

module.exports = ApiToggler;
