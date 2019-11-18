import React from 'react';
import {Flex, Box, Tooltip} from '@chakra-ui/core';

const Legend = () => (
	<Flex paddingTop="1em" maxWidth="13em" direction="row">
		<b style={{paddingRight: '10px'}}>Legend:</b>
		<Tooltip hasArrow label="Very good" placement="bottom">
			<Box width="100%" h="7" bg="#276749"/>
		</Tooltip>
		<Tooltip hasArrow label="Good" placement="bottom">
			<Box width="100%" h="7" bg="#48BB78"/>
		</Tooltip>
		<Tooltip hasArrow label="Mixed" placement="bottom">
			<Box width="100%" h="7" bg="#F6E05E"/>
		</Tooltip>
		<Tooltip hasArrow label="Bad" placement="bottom">
			<Box width="100%" h="7" bg="#ED8936"/>
		</Tooltip>
		<Tooltip hasArrow label="Very bad" placement="bottom">
			<Box width="100%" h="7" bg="#E53E3E"/>
		</Tooltip>
		<Tooltip hasArrow label="Extremely bad" placement="bottom">
			<Box width="100%" h="7" bg="#822727"/>
		</Tooltip>
		<Tooltip hasArrow label="Horrendously bad" placement="bottom">
			<Box width="100%" h="7" bg="#97266D"/>
		</Tooltip>
	</Flex>
);

export default Legend;
