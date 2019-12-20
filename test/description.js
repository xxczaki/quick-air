import test from 'ava';
import React from 'react';
import render from 'react-test-renderer';

import Description from '../components/description';

test('Description component', t => {
	const tree = render.create(<Description/>).toJSON();
	t.snapshot(tree);
});
