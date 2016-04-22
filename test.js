import test from 'ava';
import ApiToggler from './';

const dataFromServer = {
	cost: 321,
	createdAt: 'now',
	vendor: 'foo'
};

const dataFromClient = {
	price: 321,
	brand: 'foo'
};

const options = {
	price: 'cost',
	brand: 'vendor'
};

test('String', t => {
	const apiToggler = new ApiToggler(options);

	t.is(apiToggler.toggle('price'), 'cost');
	t.is(apiToggler.toggle('cost'), 'price');
	t.is(apiToggler.toggle('brand'), 'vendor');
	t.is(apiToggler.toggle('price'), 'cost');
	t.is(apiToggler.toggle('vendor'), 'brand');
	t.is(apiToggler.toggle('cost'), 'price');
	t.is(apiToggler.toggle('createdAt'), 'createdAt');
});

test('Object', t => {
	const apiToggler = new ApiToggler(options);
	const expected = {
		serverToClient: {
			price: 321,
			brand: 'foo',
			createdAt: 'now'
		},
		clientToServer: {
			cost: 321,
			vendor: 'foo'
		}
	};

	t.deepEqual(apiToggler.toggle(dataFromClient), expected.clientToServer);
	t.deepEqual(apiToggler.toggle(dataFromServer), expected.serverToClient);
});

test('Array', t => {
	const apiToggler = new ApiToggler(options);
	const dataArrayFromServer = [
		{
			cost: 321,
			vendor: 'foo',
			createdAt: 'now'
		},
		{
			cost: 321,
			vendor: 'foo',
			createdAt: 'now'
		}
	];
	const dataArrayFromClient = [
		{
			price: 321,
			brand: 'foo'
		},
		{
			price: 321,
			brand: 'foo'
		}
	];
	const expected = {
		serverToClient: [
			{
				price: 321,
				brand: 'foo',
				createdAt: 'now'
			},
			{
				price: 321,
				brand: 'foo',
				createdAt: 'now'
			}
		],
		clientToServer: [
			{
				cost: 321,
				vendor: 'foo'
			},
			{
				cost: 321,
				vendor: 'foo'
			}
		]
	};

	t.deepEqual(apiToggler.toggle(dataArrayFromClient), expected.clientToServer);
	t.deepEqual(apiToggler.toggle(dataArrayFromServer), expected.serverToClient);
});
