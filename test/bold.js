import test from 'ava';
import React from 'react';
import render from 'react-test-renderer';

import Bold from '../components/bold';

test('Bold component', t => {
	const tree = render.create(<Bold/>).toJSON();
	t.snapshot(tree);
});
