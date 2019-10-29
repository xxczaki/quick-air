'use strict';

const classifyAirQuality = value => {
	if (value < 13) {
		return {classification: 'VERY GOOD', description: 'Air quality is really nice.', color: '#2E7D32'};
	}

	if (value > 13 && value < 37) {
		return {classification: 'GOOD', description: 'Air quality is decent.', color: '#7CB342'};
	}

	if (value > 37 && value < 61) {
		return {classification: 'MIXED', description: 'Air pollution can be a health hazard.', color: '#FFEB3B'};
	}

	if (value > 61 && value < 85) {
		return {classification: 'BAD', description: 'Air pollution is a health hazard.', color: '#FF9800'};
	}

	if (value > 85 && value < 121) {
		return {classification: 'VERY BAD', description: 'Avoid staying outdoors.', color: '#FF5722'};
	}

	if (value > 121) {
		return {classification: 'EXTREMELY BAD', description: 'Avoid staying outdoors at all cost!', color: '#BF360C'};
	}

	return {classification: 'UNKNOWN', description: 'The air quality is unknown.', color: '#9E9E9E'};
};

export default classifyAirQuality;
