import React from 'react';
import styled from 'styled-components';

import airlyLogo from '../public/airly.svg';

const Wrapper = styled.div`
	font-size: 0.8em;
	padding-bottom: 3em;
	user-select: none;
`;

const Logo = styled.img`
	width: 80px;
`;

const Attribution = () => (
	<Wrapper>
		<p>Powered by:</p>
		<a href="https://airly.eu/" target="blank" rel="noopener noreferrer">
			<Logo src={airlyLogo} alt="Airly" draggable={false} decoding="async" importance="low" loading="lazy" width={80}/>
		</a>
	</Wrapper>
);

export default Attribution;
