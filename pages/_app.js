import App from 'next/app';
import Head from 'next/head';
import React from 'react';
import {Global, css} from '@emotion/core';
import {ThemeProvider, ColorModeProvider, CSSReset} from '@chakra-ui/core';

// Assets
import OpenSansWoff from '../public/fonts/open-sans-v17-latin-regular.woff';
import OpenSansWoff2 from '../public/fonts/open-sans-v17-latin-regular.woff2';

const globalStyle = css`
	@font-face {
		font-family: 'Open Sans';
		font-style: normal;
		font-weight: 400;
		font-display: fallback;
		src: local('Open Sans'), local('OpenSans-Regular'),
			url(${OpenSansWoff2}) format('woff2'),
			url(${OpenSansWoff}) format('woff');
  	}

	body {
		font-family: Open Sans, arial, sans-serif;
		margin: auto;
		width: 100%;
		font-size: 16px;
		padding-top: 50px;
		padding-bottom: 100px;
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
			<ThemeProvider>
				<ColorModeProvider>
					<CSSReset/>
					<Global styles={globalStyle}/>
					<Head>
						<title>Quick Air</title>
					</Head>
					<Component {...pageProps}/>
				</ColorModeProvider>
			</ThemeProvider>
		);
	}
}

export default MyApp;
