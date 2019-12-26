'use strict';

import Airly from 'airly';
import haversine from 'haversine';

export const fetcher = async (latitude, longitude) => {
	if (!latitude || !longitude) {
		return null;
	}

	const airly = new Airly(process.env.AIRLY_KEY);

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

	const distance = haversine({latitude, longitude}, installation.location, {unit: 'km'}).toFixed(1);

	return {
		installation,
		usedInstallation,
		distance,
		data
	};
};
