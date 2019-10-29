import App from 'next/app';
import Head from 'next/head';
import React from 'react';
import {createGlobalStyle} from 'styled-components';

// Assets
import '../node_modules/modern-normalize/modern-normalize.css';
import RobotoMonoWoff from '../public/fonts/roboto-mono-v7-latin-ext-regular.woff';
import RobotoMonoWoff2 from '../public/fonts/roboto-mono-v7-latin-ext-regular.woff2';

const GlobalStyle = createGlobalStyle`
	@font-face {
		font-family: 'Roboto Mono';
		font-style: normal;
		font-weight: 400;
		font-display: fallback;
		src: local('Roboto Mono'), local('RobotoMono-Regular'),
			url(${RobotoMonoWoff2}) format('woff2'),
			url(${RobotoMonoWoff}) format('woff');
  	}

	body {
		background-color: #212121;
		font-family: Roboto Mono, monospace;
		margin: auto;
		width: 80%;
		font-size: 16px;
		padding-top: 50px;
		padding-bottom: 100px;
		color: #fff;
		-webkit-font-smoothing: antialiased;
		text-rendering: optimizeSpeed;
	}

	summary {
		cursor: pointer;
	}

	:focus {
    	outline: none;
  	}
`;

class MyApp extends App {
	render() {
		const {Component, pageProps} = this.props;

		return (
			<>
				<GlobalStyle/>
				<Head>
					<title>Quick Air</title>
				</Head>
				<Component {...pageProps}/>
			</>
		);
	}
}

export default MyApp;
