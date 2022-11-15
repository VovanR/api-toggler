# api-toggler

[![Commitizen friendly][commitizen-image]][commitizen-url]
[![XO code style][codestyle-image]][codestyle-url]

[![NPM version][npm-image]][npm-url]
[![Build Status][build-image]][build-url]
[![Coveralls Status][coveralls-image]][coveralls-url]

> Alias your app API with other API

## Install

```shell
npm install --save api-toggler
```

## Usage

```js
const ApiToggler = require('api-toggler');

const someApiToggler = new ApiToggler({
  name: 'first_name',
  surname: 'last_name'
});
```

### String
```js
someApiToggler.toggle('name');
//=> 'first_name'

someApiToggler.toggle('first_name');
//=> 'name'
```

### Object
```js
someApiToggler.toggle({first_name: 'Vladimir', last_name: 'Rodkin'});
//=> {name: 'Vladimir', surname: 'Rodkin'}

someApiToggler.toggle({name: 'Vladimir', surname: 'Rodkin'});
//=> {first_name: 'Vladimir', last_name: 'Rodkin'}
```

### Array
```js
someApiToggler.toggle([{
  first_name: 'Vladimir',
  last_name: 'Rodkin'
}, {
  first_name: 'Foo',
  last_name: 'Bar'
}]);
//=> [{name: 'Vladimir', surname: 'Rodkin'}, {name: 'Foo', surname: 'Bar'}]

someApiToggler.toggle([{
  name: 'Vladimir',
  surname: 'Rodkin'
}, {
  name: 'Foo',
  surname: 'Bar'
}]);
//=> [{first_name: 'Vladimir', last_name: 'Rodkin'}, {first_name: 'Foo', last_name: 'Bar'}]
```

## Example
| My API | GitHub API |
|--------|------------|
| `pk` | `id` |
| `username` | `login` |
| `fullname` | `name` |

I need to convert GitHub API to my and back

Initialize schema toggler:
```js
const ApiToggler = require('api-toggler');

const ghApiToggler = new ApiToggler({
  username: 'login',
  fullname: 'name',
  pk: 'id'
});
```

Toggle GitHub API to my API:
```js
fetch('https://api.github.com/users/vovanr')
  .then(x => x.json())
  //=> {id: 1, login: 'VovanR', name: 'Vladimir Rodkin', . . . }
  .then(x => ghApiToggler.toggle(x))
  //=> {pk: 1, username: 'VovanR', fullname: 'Vladimir Rodkin', . . . }
```

Toggle my API to GitHub API:
```js
x
//=> {pk: 1, username: 'VovanR', fullname: 'Vladimir Rodkin', . . . }
apiToggler.toggle(x)
//=> {id: 1, login: 'VovanR', name: 'Vladimir Rodkin', . . . }

```

## License
MIT © [Vladimir Rodkin](https://github.com/VovanR)

[commitizen-url]: https://commitizen.github.io/cz-cli/
[commitizen-image]: https://img.shields.io/badge/commitizen-friendly-brightgreen.svg?style=flat-square

[codestyle-url]: https://github.com/xojs/xo
[codestyle-image]: https://img.shields.io/badge/code_style-XO-5ed9c7.svg?style=flat-square

[npm-url]: https://npmjs.org/package/api-toggler
[npm-image]: https://img.shields.io/npm/v/api-toggler.svg?style=flat-square

[build-url]: https://github.com/VovanR/api-toggler/actions?query=workflow%3A%22Tests%22
[build-image]: https://img.shields.io/github/workflow/status/VovanR/api-toggler/Tests?style=flat-square

[coveralls-url]: https://coveralls.io/r/VovanR/api-toggler
[coveralls-image]: https://img.shields.io/coveralls/VovanR/api-toggler.svg?style=flat-square
