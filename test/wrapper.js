import test from 'ava';
import React from 'react';
import render from 'react-test-renderer';

import Wrapper from '../components/wrapper';

test('Wrapper component', t => {
	const tree = render.create(<Wrapper/>).toJSON();
	t.snapshot(tree);
});
