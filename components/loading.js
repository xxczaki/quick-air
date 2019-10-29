import React from 'react';
import styled from 'styled-components';

import Spinner from './spinner';
import Bold from './bold';

const Wrapper = styled.div`
	display: flex;
	width: 300px;
	align-items: center;
	justify-content: center;
	padding-top: 1.2em;
	user-select: none;
`;

const Loading = () => (
	<Wrapper>
		<Spinner/>
		<Bold>Loading data...</Bold>
	</Wrapper>
);

export default Loading;
