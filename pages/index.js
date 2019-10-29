import React from 'react';

import Container from '../components/container';
import Header from '../components/header';
import Utility from '../components/utility';
import Description from '../components/description';
import Attribution from '../components/attribution';

const Index = () => {
	return (
		<Container>
			<Header>Quick Air</Header>
			<Description>Check air quality near you quickly!</Description>
			<Attribution/>
			<Utility/>
		</Container>
	);
};

export default Index;
