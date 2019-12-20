import test from 'ava';
import React from 'react';
import render from 'react-test-renderer';

import Attribution from '../components/attribution';

test('Attribution component', t => {
	const tree = render.create(<Attribution/>).toJSON();
	t.snapshot(tree);
});
