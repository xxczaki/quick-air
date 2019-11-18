import test from 'ava';
import React from 'react';
import {shallow} from 'enzyme';

import Attribution from '../components/attribution';

test('contains text', t => {
	const wrapper = shallow(<Attribution/>);
	t.is(wrapper.contains(<p>Powered by:</p>), true);
});

test('contains line break', t => {
	const wrapper = shallow(<Attribution/>);
	t.is(wrapper.contains(<br/>), true);
});

test('contains `a` tag', t => {
	const wrapper = shallow(<Attribution/>);
	t.is(wrapper.find('a').props().href, 'https://airly.eu/');
	t.is(wrapper.find('a').props().target, 'blank');
	t.is(wrapper.find('a').props().rel, 'noopener noreferrer');
});

test('contains image', t => {
	const wrapper = shallow(<Attribution/>);
	t.is(wrapper.find('Logo').props().src, '');
	t.is(wrapper.find('Logo').props().alt, 'Airly');
	t.is(wrapper.find('Logo').props().draggable, false);
	t.is(wrapper.find('Logo').props().decoding, 'async');
	t.is(wrapper.find('Logo').props().importance, 'low');
	t.is(wrapper.find('Logo').props().loading, 'lazy');
	t.is(wrapper.find('Logo').props().width, 80);
});
