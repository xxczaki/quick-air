'use strict';

const classifyAirQuality = index => {
	const {level, advice} = index;

	if (level === 'VERY_LOW') {
		return {classification: 'VERY GOOD', advice, backgroundColor: '#276749', textColor: '#fff'};
	}

	if (level === 'LOW') {
		return {classification: 'GOOD', advice, backgroundColor: '#48BB78', textColor: '#000'};
	}

	if (level === 'MEDIUM') {
		return {classification: 'MIXED', advice, backgroundColor: '#F6E05E', textColor: '#000'};
	}

	if (level === 'HIGH') {
		return {classification: 'BAD', advice, backgroundColor: '#ED8936', textColor: '#000'};
	}

	if (level === 'VERY_HIGH') {
		return {classification: 'VERY BAD', advice, backgroundColor: '#E53E3E', textColor: '#000'};
	}

	if (level === 'EXTREME') {
		return {classification: 'EXTREMELY BAD', advice, backgroundColor: '#822727', textColor: '#fff'};
	}

	if (level === 'AIRMAGEDDON') {
		return {classification: 'HORRENDOUSLY BAD', advice, backgroundColor: '#97266D', textColor: '#fff'};
	}

	return {classification: 'UNKNOWN', advice: 'The air quality is unknown.', backgroundColor: '#A0AEC0', textColor: '#000'};
};

export default classifyAirQuality;
