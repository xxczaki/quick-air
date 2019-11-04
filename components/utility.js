import React, {useState} from 'react';
import dynamic from 'next/dynamic';
import {
	Box,
	Stack,
	Button,
	Flex,
	Heading,
	Stat,
	StatLabel,
	StatNumber,
	StatHelpText,
	Alert,
	AlertIcon,
	AlertTitle,
	AlertDescription,
	Tag,
	Spinner
} from '@chakra-ui/core';
import {format} from 'date-fns';

const Bar = dynamic(
	() => import('react-chartjs-2').then(module => module.Bar),
	{loading: () => <Spinner/>}
);

const Line = dynamic(
	() => import('react-chartjs-2').then(module => module.Line),
	{loading: () => <Spinner/>}
);

const Wrapper = dynamic(
	() => import('./wrapper'),
	{loading: () => <Spinner/>}
);

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

		const checkAirQuality = async position => {
			try {
				const {latitude, longitude} = position.coords;

				const {default: Airly} = await import('airly');
				const airly = new Airly('API_KEY');

				// Check whether cached results exists and if not, make an API request
				await import('idb-keyval').then(async module => {
					await module.get('qa-data').then(async val => {
						const cacheTimestamp = await module.get('qa-timestamp');
						const currentTimestamp = Math.floor(Date.now() / 1000);

						if (val === undefined || cacheTimestamp === undefined || (currentTimestamp - cacheTimestamp) > 300) {
							await module.clear();

							const installations = await airly.nearestInstallations(latitude, longitude, 30, 3);

							let data = await airly.installationMeasurements(installations[0].id);

							const nearestInstallationData = data.current.values.filter(item => (
								item.name === 'PM25'
							));

							if (!nearestInstallationData) {
								data = await airly.installationMeasurements(installations[1].id);
							}

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

					// Check Airly CAQI index
					const index = data.current.indexes[0];

					const {default: classifyAirQuality} = await import('./utils/classifier');
					const {classification, advice, backgroundColor, textColor} = classifyAirQuality(index);

					const {default: haversine} = await import('haversine');
					const distance = Math.round(haversine({latitude, longitude}, location, {unit: 'km'}));

					if (classification === 'UNKNOWN') {
						setResults(
							<>
								<Heading as="h2" size="lg">Current:</Heading>
								<br/>
								<Stat>
									{current.map(el => (
										<div key={el.name}>
											<StatLabel>{el.name === 'PM25' ? 'PM2.5' : el.name}</StatLabel>
											<StatNumber fontSize="xl">{el.value} µg/m³</StatNumber>
											<StatHelpText>{el.name === 'PM25' ? `${Math.round(el.value / 25 * 100)}%` : `${Math.round(el.value / 50 * 100)}%`} of the WHO standard</StatHelpText>
											<br/>
										</div>
									))}
								</Stat>
								<br/>
								<Flex direction="row">
									<p style={{paddingRight: '10px'}}>Air Quality:</p>
									<Tag style={{backgroundColor, color: textColor}} size="sm">{classification}</Tag>
								</Flex>
								<br/>
								<p><u>Sensor location:</u> {address.city}{address.street ? `, ${address.street}` : ''} (about {distance} {distance <= 1 ? 'kilometer' : 'kilometers'} from you)</p>
							</>
						);
						setLoading(false);
					} else {
						// Format forecast dates to be user friendly
						const from = await data.forecast.map(el => `${format(new Date(el.fromDateTime), 'dd.MM HH:mm')}`);

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

						const qualityForecast = data.forecast.map(el => {
							return el.indexes[0];
						});

						setResults(
							<Stack maxWidth="50em">
								<Box p={5} shadow="md" borderWidth="1px" maxWidth="35em">
									<Heading as="h2" size="lg">Current:</Heading>
									<br/>
									<Stat>
										{current.map(el => (
											<div key={el.name}>
												<StatLabel>{el.name === 'PM25' ? 'PM2.5' : el.name}</StatLabel>
												<StatNumber fontSize="xl">{el.value} µg/m³</StatNumber>
												<StatHelpText>{el.name === 'PM25' ? `${Math.round(el.value / 25 * 100)}%` : `${Math.round(el.value / 50 * 100)}%`} of the WHO standard</StatHelpText>
											</div>
										))}
									</Stat>
									<br/>
									<Flex direction="row">
										<p style={{paddingRight: '10px'}}>Air Quality:</p>
										<Tag style={{backgroundColor, color: textColor}} size="sm">{classification}</Tag>
									</Flex>
									<i style={{fontSize: '0.8em'}}>{advice}</i>
								</Box>
								<br/>
								{qualityForecast[1] ?
									<Box p={5} shadow="md" borderWidth="1px" maxWidth="35em">
										<Wrapper>
											<Heading as="h2" size="lg">Air Quality Forecast</Heading>
											<br/>
											<Bar
												height={250}
												data={{
													labels: from,
													datasets: [{
														label: 'Airly CAQI',
														backgroundColor: qualityForecast.map(value => classifyAirQuality(value).backgroundColor),
														data: qualityForecast.map(el => el.value)
													}]
												}}
											/>
										</Wrapper>
									</Box> :
									''}
								<br/>
								{pm25Values[1] ?
									<Box p={5} shadow="md" borderWidth="1px" maxWidth="35em">
										<Wrapper>
											<Heading as="h2" size="lg">PM2.5 & PM10 Forecast</Heading>
											<br/>
											<Line
												height={250}
												data={{
													labels: from,
													datasets: [
														{
															label: 'PM2.5 (in μg/m3)',
															backgroundColor: '#3182CE',
															data: pm25Values
														},
														{
															label: 'PM10 (in μg/m3)',
															backgroundColor: '#63B3ED',
															data: pm10Values
														}
													]
												}}
												options={{
													tooltips: {
														mode: 'index'
													}
												}}
											/>
										</Wrapper>
									</Box> :
									''}
								<br/>
								<p><u>Sensor location:</u> {address.city}{address.street ? `, ${address.street}` : ''} (about {distance} {distance <= 1 ? 'kilometer' : 'kilometers'} from you)</p>
							</Stack>
						);
						setLoading(false);
					}
				});
			} catch (error) {
				setResults(
					<Alert style={{maxWidth: '50em'}} status="error">
						<AlertIcon/>
						<AlertTitle mr={2}>Something went wrong!</AlertTitle>
						<AlertDescription>{error}</AlertDescription>
					</Alert>
				);
				setLoading(false);
			}
		};

		getPosition()
			.then(position => {
				checkAirQuality(position);
			})
			.catch(error => {
				if (error.message === 'User denied Geolocation') {
					setResults(
						<Alert style={{maxWidth: '50em'}} status="warning">
							<AlertIcon/>
							<AlertTitle mr={2}>Please grant location access</AlertTitle>
							<AlertDescription>We need it to search for air quality sensors near you.</AlertDescription>
						</Alert>
					);
					setLoading(false);
				} else {
					setResults(
						<Alert style={{maxWidth: '50em'}} status="error">
							<AlertIcon/>
							<AlertTitle mr={2}>Something went wrong!</AlertTitle>
							<AlertDescription>{error.message}</AlertDescription>
						</Alert>
					);
					setLoading(false);
				}
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
