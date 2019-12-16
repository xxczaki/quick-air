import React from 'react';
import {Map, TileLayer, Marker} from 'react-leaflet';
import PropTypes from 'prop-types';

const OpenMap = ({lat, lng}) => {
	const position = [lat, lng];

	return (
		<>
			<Map center={position} zoom={13} style={{height: '20em'}}>
				<TileLayer
					style={{width: '200px'}}
					attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				<Marker position={position}/>
			</Map>
		</>
	);
};

OpenMap.propTypes = {
	lat: PropTypes.number.isRequired,
	lng: PropTypes.number.isRequired
};

export default OpenMap;
