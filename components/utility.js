import React, {useState} from 'react';
import dynamic from 'next/dynamic';
import {usePosition} from 'use-position';

const Bar = dynamic(
	() => import('react-chartjs-2').then(module => module.Bar),
	{loading: () => <p>Loading chart...</p>}
);

import Button from './button';
import Loading from './loading';
import Wrapper from './wrapper';

const Utility = () => {
	const [results, setResults] = useState(null);
	const {latitude, longitude, error} = usePosition({enableHighAccuracy: true, maximumAge: 5000});

	const handleSubmit = async () => {
		if (!results) {
			setResults(<Loading/>);
		}

		try {
			const {default: Airly} = await import('airly');
			const airly = new Airly('API_KEY');

			// Check whether cached results exists and if not, make an API request
			await import('idb-keyval').then(async module => {
				await module.get('qa-data').then(async val => {
					const cacheTimestamp = await module.get('qa-timestamp');
					const currentTimestamp = Math.floor(Date.now() / 1000);

					if (val === undefined || cacheTimestamp === undefined || (currentTimestamp - cacheTimestamp) > 300) {
						await module.clear();

						const installations = await airly.nearestInstallations(latitude, longitude, 30, 1);

						const data = await airly.installationMeasurements(installations[0].id);

						module.set('qa-installations', installations);
						module.set('qa-data', data);
						module.set('qa-timestamp', currentTimestamp);
					} else {
						console.log('Using cached data');
					}
				});

				// Get the nearest installation (within 10 kilometers)
				const installations = await module.get('qa-installations');
				const {address, location} = installations[0];

				// Fetch data from the found installation
				const data = await module.get('qa-data');

				// Only retrieve the PM25 and PM10 values
				const current = data.current.values.filter(item => (
					item.name === 'PM25' || item.name === 'PM10'
				));

				// Get current PM25 value
				const currentQuality = current.map(el => el.value)[0];

				const {default: classifyAirQuality} = await import('./utils/classifier');
				const {classification, description, color} = classifyAirQuality(currentQuality);

				const {default: haversine} = await import('haversine');
				const distance = Math.round(haversine({latitude, longitude}, location, {unit: 'km'}));

				if (classification === 'UNKNOWN') {
					setResults(
						<>
							<h2>Current:</h2>
							{current.map(el => <p key={el.name}>{el.name === 'PM25' ? 'PM2.5' : 'PM10'}: <b>{el.value} µg/m³</b> ({el.name === 'PM25' ? `${Math.round(el.value / 25 * 100)} %` : `${Math.round(el.value / 50 * 100)} %`})</p>)}
							<>
								<p>Air Quality: <b style={{color}}>{classification}</b></p>
								<i style={{fontSize: '0.8em'}}>{description}</i>
							</>
							<br/>
							<p><u>Sensor location:</u> {address.city}{address.street ? `, ${address.street}` : ''} (about {distance} {distance <= 1 ? 'kilometer' : 'kilometers'} from you)</p>
						</>
					);
				} else {
					// Format forecast dates to be user friendly
					const {format} = await import('date-fns');
					const from = await data.forecast.map(el => `${format(new Date(el.fromDateTime), 'dd.MM hh:mm')}`);

					// Get PM25 forecast
					const pm25Values = data.forecast.map(el => {
						const value = el.values.map(el => el.value);

						return value[0];
					});

					// Get PM10 forecast
					const pm10Values = data.forecast.map(el => {
						const value = el.values.map(el => el.value);

						return value[1];
					});

					setResults(
						<>
							<h2>Current:</h2>
							{current.map(el => <p key={el.name}>{el.name === 'PM25' ? 'PM2.5' : 'PM10'}: <b>{el.value} µg/m³</b> ({el.name === 'PM25' ? `${Math.round(el.value / 25 * 100)} %` : `${Math.round(el.value / 50 * 100)} %`})</p>)}
							<>
								<p>Air Quality: <b style={{color}}>{classification}</b></p>
								<i style={{fontSize: '0.8em'}}>{description}</i>
							</>
							<br/>
							<Wrapper>
								<h2>PM2.5 Forecast</h2>
								<Bar
									data={{
										labels: from,
										datasets: [{
											label: 'PM2.5 (in μg/m3)',
											backgroundColor: pm25Values.map(value => classifyAirQuality(value).color),
											data: pm25Values
										}]
									}}
								/>
								<h2>PM10 Forecast</h2>
								<Bar
									data={{
										labels: from,
										datasets: [{
											label: 'PM10 (in μg/m3)',
											backgroundColor: '#9E9E9E',
											data: pm10Values
										}]
									}}
								/>
							</Wrapper>
							<br/>
							<p><u>Sensor location:</u> {address.city}{address.street ? `, ${address.street}` : ''} (about {distance} {distance <= 1 ? 'kilometer' : 'kilometers'} from you)</p>
						</>
					);
				}
			});
		} catch (error_) {
			setResults(`Something went wrong! ${error_}`);
		}
	};

	return (
		<>
			<Button disabled={error} type="submit" onClick={handleSubmit}>
				{results === null ? 'Check air quality' : '🔄 Refresh'}
			</Button>
			<br/>
			{error === 'User denied Geolocation' ? 'Please allow location access!' : ''}
			<br/>
			<br/>
			{results}
		</>
	);
};

export default Utility;
