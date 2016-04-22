# api-toggler

[![Commitizen friendly][commitizen-image]][commitizen-url]
[![XO code style][codestyle-image]][codestyle-url]

[![NPM version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Dependency Status][depstat-image]][depstat-url]
[![DevDependency Status][depstat-dev-image]][depstat-dev-url]

> Alias your app api with other api

## Install

```
npm install --save api-toggler
```

## Usage

```js
const ApiToggler = require('api-toggler');

var someApiToggler = new ApiToggler({
    name: 'first_name',
    surname: 'last_name'
});

someApiToggler.toggle('name');
//=> 'first_name'

someApiToggler.toggle({
    first_name: 'Vladimir',
    last_name: 'Rodkin'
});
//=> {name: 'Vladimir', surname: 'Rodkin'}

someApiToggler.toggle([{
    first_name: 'Vladimir',
    last_name: 'Rodkin'
}, {
    first_name: 'Foo',
    last_name: 'Bar'
}]);
//=> [{name: 'Vladimir', surname: 'Rodkin'}, {name: 'Foo', surname: 'Bar'}]
```

## License

MIT © [Vladimir Rodkin](https://github.com/VovanR)

[demo]: https://vovanr.github.io/api-toggler

[commitizen-url]: http://commitizen.github.io/cz-cli/
[commitizen-image]: https://img.shields.io/badge/commitizen-friendly-brightgreen.svg?style=flat-square

[codestyle-url]: https://github.com/sindresorhus/xo
[codestyle-image]: https://img.shields.io/badge/code_style-XO-5ed9c7.svg?style=flat-square

[npm-url]: https://npmjs.org/package/api-toggler
[npm-image]: https://img.shields.io/npm/v/api-toggler.svg?style=flat-square

[travis-url]: https://travis-ci.org/VovanR/api-toggler
[travis-image]: https://img.shields.io/travis/VovanR/api-toggler.svg?style=flat-square

[depstat-url]: https://david-dm.org/VovanR/api-toggler
[depstat-image]: https://david-dm.org/VovanR/api-toggler.svg?style=flat-square

[depstat-dev-url]: https://david-dm.org/VovanR/api-toggler
[depstat-dev-image]: https://david-dm.org/VovanR/api-toggler/dev-status.svg?style=flat-square
