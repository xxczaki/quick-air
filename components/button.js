import styled from 'styled-components';

const Button = styled.button`
    border: none;
    border-radius: 3px;
    width: 250px;
    padding: 12px 18px;
    font-size: 16px;
    cursor: pointer;
    color: #000;
    background-color: #2ea0da;
    outline: none;
    user-select: none;
    background-position: center;
    transition: background 0.8s;
    &:hover {
        background: #1d78a7 radial-gradient(circle, transparent 1%, #1d78a7 1%) center/15000%;
    }
    &:active {
        background-color: #16597b;
        background-size: 100%;
        transition: background 0s;
    }
	&:disabled {
		background-color: #545454;
		pointer-events: none;
	}
`;

export default Button;
