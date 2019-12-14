import React from 'react';
import dynamic from 'next/dynamic';
import {
	Box,
	Stack,
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
	Tooltip,
	Icon,
	Spinner
} from '@chakra-ui/core';
import Airly from 'airly';
import {set, get, clear} from 'idb-keyval';
import {format} from 'date-fns';
import haversine from 'haversine';

import Legend from '../legend';
import {classifyAirQuality} from './classifier';

const Bar = dynamic(
	() => import('react-chartjs-2').then(module => module.Bar),
	{loading: () => <Spinner/>}
);

const Line = dynamic(
	() => import('react-chartjs-2').then(module => module.Line),
	{loading: () => <Spinner/>}
);

const Wrapper = dynamic(
	() => import('../wrapper'),
	{loading: () => <Spinner/>}
);

const checkAirQuality = async position => {
	try {
		const {latitude, longitude} = position.coords;

		const airly = new Airly(process.env.AIRLY_KEY);

		// Check whether cached results exists and if not, make an API request
		await get('qa-data').then(async val => {
			const cacheTimestamp = await get('qa-timestamp');
			const currentTimestamp = Math.floor(Date.now() / 1000);

			if (val === undefined || cacheTimestamp === undefined || (currentTimestamp - cacheTimestamp) > 300) {
				await clear();

				// Search for 3 nearest installations, up to 30km from the current location
				const installations = await airly.nearestInstallations(latitude, longitude, 30, 3);

				// Throw an error if no installations were found
				if (!installations[0]) {
					throw new Error('No installations were found in your area.');
				}

				// Otherwise, try to obtain data from the nearest sensor
				let data = await airly.installationMeasurements(installations[0].id);
				let installation = installations[0];
				let usedInstallation = 0;

				const nearestInstallationData = data.current.values.filter(item => (
					item.name === 'PM25'
				)).map(el => el.value);

				// If data from the sensor isn't available, try to fetch from the second sensor available
				if (!nearestInstallationData.toString() && installations[1]) {
					data = await airly.installationMeasurements(installations[1].id);
					installation = installations[1];
					usedInstallation = 1;
				}

				// If data from the second sensor isn't available, try to fetch from the third (last) sensor
				if (!nearestInstallationData.toString() && installations[2]) {
					data = await airly.installationMeasurements(installations[2].id);
					installation = installations[2];
					usedInstallation = 2;
				}

				// Cache data & current timestamp
				set('qa-installations', installation);
				set('qa-usedInstallation', usedInstallation);
				set('qa-data', data);
				set('qa-timestamp', currentTimestamp);
			} else {
				console.log('Using cached data');
			}
		});

		// Get the nearest installation (within 10 kilometers)
		const installations = await get('qa-installations');
		const usedInstallation = await get('qa-usedInstallation');
		const {address, location} = installations;

		// Fetch data from the found installation
		const data = await get('qa-data');

		// Only retrieve the PM25 and PM10 values
		const current = data.current.values.filter(item => (
			item.name === 'PM25' || item.name === 'PM10'
		));

		// Check Airly CAQI index
		const index = data.current.indexes[0];

		const {classification, advice, backgroundColor, textColor} = classifyAirQuality(index);

		const distance = haversine({latitude, longitude}, location, {unit: 'km'}).toFixed(1);

		if (classification === 'UNKNOWN') {
<<<<<<< HEAD
			await clear();
			return (
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
					<br/>
					<hr/>
					<Legend/>
					<br/>
					<p><u>Sensor location:</u> {address.city}{address.street ? `, ${address.street}` : ''} (about {distance} {distance <= 1 ? 'kilometer' : 'kilometers'} from you)</p>
				</>
			);
=======
			throw new Error('Data from installation not available.');
>>>>>>> bbc006fcee8e8141f8b0544bf46d9257491a04eb
		}

		// Format forecast dates to be user friendly
		const notEmpty = await data.forecast.filter(el => el.values.toString());
		const from = await notEmpty.map(el => `${format(new Date(el.fromDateTime), 'dd.MM HH:mm')}`);

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

		return (
			<>
				{usedInstallation === 0 ? '' : (
					<>
						<p>
							Using fallback installation
							<Tooltip hasArrow label="As the nearest sensor isn't available, we are using a fallback to display data">
								<Icon paddingLeft={1} name="info" size="1.1em" mx="2px"/>
							</Tooltip>
						</p>
						<br/>
					</>
				)}
				<Stack direction="row" flexWrap="wrap">
					<Box p={5} marginBottom={5} shadow="md" borderWidth="1px" maxWidth="35em">
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
						<br/>
						<br/>
						<hr/>
						<Legend/>
					</Box>
					<br/>
					{qualityForecast[1].value ?
						<Box p={5} marginBottom={5} shadow="md" borderWidth="1px" maxWidth="35em">
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
									options={{
										tooltips: {
											callbacks: {
												title(tooltipItems) {
													return '🕒 ' + tooltipItems[0].xLabel;
												}
											}
										}
									}}
								/>
							</Wrapper>
						</Box> :
						''}
					<br/>
					{pm25Values[1] ?
						<Box p={5} marginBottom={5} shadow="md" borderWidth="1px" maxWidth="35em">
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
												fill: true,
												data: pm25Values,
												pointRadius: 0
											},
											{
												label: 'PM10 (in μg/m3)',
												backgroundColor: '#63B3ED',
												fill: true,
												data: pm10Values,
												pointRadius: 0
											}
										]
									}}
									options={{
										scales: {
											yAxes: [{
												stacked: true
											}]
										},
										elements: {point: {hitRadius: 7, hoverRadius: 5}},
										tooltips: {
											mode: 'index',
											intersect: false,
											callbacks: {
												title(tooltipItems) {
													return '🕒 ' + tooltipItems[0].xLabel;
												}
											}
										}
									}}
								/>
							</Wrapper>
						</Box> :
						''}
				</Stack>
				<p><u>Sensor location:</u> {address.city}{address.street ? `, ${address.street}` : ''} (about {distance} {distance <= 1 ? 'kilometer' : 'kilometers'} from you)</p>
			</>
		);
	} catch (error) {
		let errorToDisplay = '';

		if (error.message === 'No installations were found in your area.') {
			errorToDisplay = error.message;
		} else {
			errorToDisplay = 'See the browser\'s console for more details';
			console.log(error);
		}

		return (
			<Alert style={{maxWidth: '50em'}} status="error">
				<AlertIcon/>
				<AlertTitle mr={2}>Something went wrong!</AlertTitle>
				<AlertDescription>{errorToDisplay}</AlertDescription>
			</Alert>
		);
	}
};

export {
	checkAirQuality
};
