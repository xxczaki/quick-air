import React from 'react';
import {
	Alert,
	AlertIcon,
	AlertTitle,
	AlertDescription
} from '@chakra-ui/core';

const displayError = async message => {
	if (message === 'User denied Geolocation') {
		return (
			<Alert style={{maxWidth: '50em'}} status="warning">
				<AlertIcon/>
				<AlertTitle mr={2}>Please grant location access</AlertTitle>
				<AlertDescription>We need it to search for air quality sensors near you.</AlertDescription>
			</Alert>
		);
	}

	return (
		<Alert style={{maxWidth: '50em'}} status="error">
			<AlertIcon/>
			<AlertTitle mr={2}>Something went wrong!</AlertTitle>
			<AlertDescription>{message}</AlertDescription>
		</Alert>
	);
};

export {displayError};
