import styled from '@emotion/styled';

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(330px, 35em));
	grid-gap: 1rem;
  	align-items: flex-start;
`;

export default Grid;
