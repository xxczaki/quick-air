import React, {useState} from 'react';
import {Button} from '@chakra-ui/core';

const Utility = () => {
	const [loading, setLoading] = useState(false);
	const [results, setResults] = useState(null);

	const handleSubmit = async () => {
		setLoading(true);

		const getPosition = function (options) {
			return new Promise(((resolve, reject) => {
				navigator.geolocation.getCurrentPosition(resolve, reject, options);
			}));
		};

		getPosition()
			.then(async position => {
				const {checkAirQuality} = await import('./utils/check-air-quality');
				const result = await checkAirQuality(position);

				setResults(result);
				setLoading(false);
			})
			.catch(async error => {
				const {displayError} = await import('./utils/display-error');
				const errorToShow = await displayError(error.message);

				setResults(errorToShow);
				setLoading(false);
			});
	};

	return (
		<>
			<Button
				style={{width: '250px'}}
				size="lg"
				variantColor="green"
				leftIcon={results === null || results === 'Please grant location access' ? '' : 'repeat'}
				type="submit"
				disabled={results === 'Please grant location access'}
				isLoading={loading}
				onClick={handleSubmit}
			>
				{results === null || results === 'Please grant location access' ? 'Check air quality' : 'Refresh'}
			</Button>
			<br/>
			<br/>
			<br/>
			{results}
		</>
	);
};

export default Utility;
