import React, {useState} from 'react';
import {useFormState} from 'react-use-form-state';
import {Button, Checkbox, Input, Text, Link} from '@chakra-ui/core';

const Utility = () => {
	const [loading, setLoading] = useState(false);
	const [results, setResults] = useState(null);
	const [formState, {text}] = useFormState({
		manual: false
	});

	const handleSubmit = async () => {
		setLoading(true);

		const getPosition = function (options) {
			return new Promise(((resolve, reject) => {
				navigator.geolocation.getCurrentPosition(resolve, reject, options);
			}));
		};

		if (formState.values.manual) {
			const {value} = formState.values;

			const response = await fetch(`https://nominatim.openstreetmap.org/search?q="${value}"&format=json&limit=1`);
			const json = await response.json();

			if (!json[0]) {
				const {displayError} = await import('./utils/display-error');
				const errorToShow = await displayError('Location not found');

				setResults(errorToShow);
				setLoading(false);
			} else {
				const position = {
					coords: {
						latitude: json[0].lat,
						longitude: json[0].lon
					}
				};

				try {
					const {checkAirQuality} = await import('./utils/check-air-quality');
					const result = await checkAirQuality(position);

					setResults(result);
					setLoading(false);
				} catch (error) {
					const {displayError} = await import('./utils/display-error');
					const errorToShow = await displayError(error.message);

					setResults(errorToShow);
					setLoading(false);
				}
			}
		} else {
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
		}
	};

	return (
		<>
			<Checkbox
				isChecked={!formState.values.manual}
				onChange={() => formState.values.manual ? formState.setField('manual', false) : formState.setField('manual', true)}
			>
				Use geolocation
			</Checkbox>
			<br/>
			{formState.values.manual ?
				<>
					<Input {...text('value')} width={250} marginBottom={2} placeholder="Enter your location"/>
					<Text fontSize="xs">Powered by <Link isExternal color="teal.500" href="https://nominatim.openstreetmap.org/">Nominatim</Link></Text>
					<br/>
				</> : ''}
			<Button
				style={{width: '250px'}}
				size="lg"
				variantColor="green"
				type="submit"
				disabled={results === 'Please grant location access'}
				isLoading={loading}
				onClick={handleSubmit}
			>
				Check air quality
			</Button>
			<br/>
			<br/>
			<br/>
			{results}
		</>
	);
};

export default Utility;
