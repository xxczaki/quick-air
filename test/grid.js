import test from 'ava';
import React from 'react';
import render from 'react-test-renderer';

import Grid from '../components/grid';

test('Grid component', t => {
	const tree = render.create(<Grid/>).toJSON();
	t.snapshot(tree);
});
