import React from 'react';
import dynamic from 'next/dynamic';
import {
	Box,
	Flex,
	Heading,
	Stat,
	StatLabel,
	StatNumber,
	StatHelpText,
	Tag,
	Tooltip,
	Icon,
	Spinner
} from '@chakra-ui/core';
import {format} from 'date-fns';
import PropTypes from 'prop-types';

import {classifyAirQuality} from '../utils/classifier';
import Legend from './legend';

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

const Grid = dynamic(
	() => import('./grid'),
	{loading: () => <Spinner/>}
);

const OpenMap = dynamic(
	() => import('./map'),
	{
		ssr: false,
		loading: () => <Spinner/>
	}
);

const Data = ({res}) => {
	const {installation, usedInstallation, distance, data} = res;

	// Only retrieve the PM25 and PM10 values
	const current = data.current.values.filter(item => (
		item.name === 'PM25' || item.name === 'PM10'
	));

	// Check Airly CAQI index
	const index = data.current.indexes[0];

	const {classification, advice, backgroundColor, textColor} = classifyAirQuality(index);

	if (classification === 'UNKNOWN') {
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
				<p><u>Sensor location:</u> {installation.address.city}{installation.address.street ? `, ${installation.address.street}` : ''} (about {distance} {distance <= 1 ? 'kilometer' : 'kilometers'} from you)</p>
			</>
		);
	}

	// Format forecast dates to be user friendly
	const notEmpty = data.forecast.filter(el => el.values.toString());
	const from = notEmpty.map(el => `${format(new Date(el.fromDateTime), 'dd.MM HH:mm')}`);

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
			<Grid>
				<Box p={5} shadow="md" borderWidth="1px" height="100%" maxWidth="35em">
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
				{qualityForecast[1].value ?
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
				<Box p={5} shadow="md" borderWidth="1px" maxWidth="35em">
					<Heading as="h2" size="lg">Sensor information:</Heading>
					<br/>
					<OpenMap lat={installation.location.latitude} lng={installation.location.longitude}/>
					<br/>
					<u>Location:</u> {installation.address.city}{installation.address.street ? `, ${installation.address.street}` : ''} (about {distance} {distance <= 1 ? 'kilometer' : 'kilometers'} from you)
				</Box>
			</Grid>
		</>
	);
};

Data.propTypes = {
	res: PropTypes.object.isRequired
};

export default Data;
