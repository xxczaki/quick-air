import test from 'ava';
import React from 'react';
import render from 'react-test-renderer';

import Legend from '../components/legend';

test('Legend component', t => {
	const tree = render.create(<Legend/>).toJSON();
	t.snapshot(tree);
});
