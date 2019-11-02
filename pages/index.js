import React from 'react';
import {Heading, Flex, IconButton, useColorMode} from '@chakra-ui/core';

import Container from '../components/container';
import Utility from '../components/utility';
import Description from '../components/description';
import Attribution from '../components/attribution';

const Index = () => {
	const {colorMode, toggleColorMode} = useColorMode();

	return (
		<Container>
			<Flex direction="row" wrap="wrap">
				<Heading style={{paddingRight: '0.5em'}} as="h1">Quick Air</Heading>
				<IconButton
					style={{width: '2em'}}
					variant="ghost"
					size="lg"
					aria-label={`Toggle ${colorMode === 'light' ? 'Dark' : 'Light'}`}
					icon={colorMode === 'light' ? 'moon' : 'sun'}
					onClick={toggleColorMode}
				/>
			</Flex>
			<br/>
			<Description>Check air quality near you quickly!</Description>
			<br/>
			<Attribution/>
			<Utility/>
		</Container>
	);
};

export default Index;
