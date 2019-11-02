import React from 'react';
import styled from '@emotion/styled';

import airlyLogo from '../public/airly.svg';

const Wrapper = styled.div`
	width: 80px;
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
		<br/>
		<a href="https://airly.eu/" target="blank" rel="noopener noreferrer">
			<Logo src={airlyLogo} alt="Airly" draggable={false} decoding="async" importance="low" loading="lazy" width={80}/>
		</a>
	</Wrapper>
);

export default Attribution;
