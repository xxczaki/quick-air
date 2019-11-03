'use strict';

const classifyAirQuality = index => {
	const {level, advice} = index;

	if (level === 'VERY_LOW') {
		return {classification: 'VERY GOOD', advice, color: '#276749'};
	}

	if (level === 'LOW') {
		return {classification: 'GOOD', advice, color: '#48BB78'};
	}

	if (level === 'MEDIUM') {
		return {classification: 'MIXED', advice, color: '#F6E05E'};
	}

	if (level === 'HIGH') {
		return {classification: 'BAD', advice, color: '#ED8936'};
	}

	if (level === 'VERY_HIGH') {
		return {classification: 'VERY BAD', advice, color: '#E53E3E'};
	}

	if (level === 'EXTREME') {
		return {classification: 'EXTREMELY BAD', advice, color: '#822727'};
	}

	if (level === 'AIRMAGEDDON') {
		return {classification: 'HORRENDOUSLY BAD', advice, color: '#97266D'};
	}

	return {classification: 'UNKNOWN', advice: 'The air quality is unknown.', color: '#A0AEC0'};
};

export default classifyAirQuality;
