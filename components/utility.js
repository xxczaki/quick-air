import React, {useState} from 'react';
import {useFormState} from 'react-use-form-state';
import {Button, Checkbox, Input, Text, Link} from '@chakra-ui/core';
import {usePosition} from 'use-position';

import {fetcher} from '../utils/fetcher';

import Data from './data';

const Utility = () => {
	const [loading, setLoading] = useState(false);
	const [results, setResults] = useState(null);
	const {latitude, longitude, error} = usePosition();
	const [formState, {text}] = useFormState({
		manual: false
	});

	const handleSubmit = async () => {
		setLoading(true);

		if (formState.values.manual || error) {
			const {value} = formState.values;

			const response = await fetch(`https://nominatim.openstreetmap.org/search?q="${value}"&format=json&limit=1`);
			const json = await response.json();

			if (!json[0]) {
				const {displayError} = await import('../utils/display-error');
				const errorToShow = await displayError('Location not found');

				setResults(errorToShow);
				setLoading(false);
			} else {
				const response = await fetcher(json[0].lat, json[0].lon);

				setResults(<Data res={response}/>);
				setLoading(false);
			}
		} else {
			const response = await fetcher(latitude, longitude);

			setResults(<Data res={response}/>);
			setLoading(false);
		}
	};

	return (
		<>
			<Checkbox
				isChecked={!error && !formState.values.manual}
				isDisabled={error}
				onChange={() => formState.values.manual ? formState.setField('manual', false) : formState.setField('manual', true)}
			>
			Use geolocation
			</Checkbox>
			<br/>
			{formState.values.manual || error ?
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
