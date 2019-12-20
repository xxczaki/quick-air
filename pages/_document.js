import React from 'react';
import Document, {Head, Main, NextScript} from 'next/document';

export default class MyDocument extends Document {
	render() {
		return (
			<html lang="pl">
				<Head>
					<meta charSet="utf-8"/>
					<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
					<meta httpEquiv="X-UA-Compatible" content="ie=edge"/>
					<meta name="description" content="Check air quality near you quickly!"/>
					<meta name="theme-color" content="#212121"/>
					<meta name="msapplication-TileColor" content="#212121"/>
					<meta name="apple-mobile-web-app-capable" content="yes"/>
					<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent"/>
					<meta name="twitter:card" content="summary"/>
					<meta name="twitter:title" content="Quick Air"/>
					<meta name="twitter:description" content="Check air quality near you quickly!"/>
					<meta name="og:title" content="Quick Air"/>
					<meta name="og:description" content="Check air quality near you quickly!"/>
					<meta name="og:url" content="https://quick-air.now.sh"/>
					<meta name="og:site_name" content="Quick Air"/>
					<meta name="og:type" content="website"/>
					<link rel="manifest" href="/manifest.json"/>
					<link rel="icon" href="/favicon.png"/>
					<link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-icon-180.png"/>
					<link rel="apple-touch-icon" sizes="167x167" href="/icons/apple-icon-167.png"/>
					<link rel="apple-touch-icon" sizes="152x152" href="/icons/apple-icon-152.png"/>
					<link rel="apple-touch-icon" sizes="120x120" href="/icons/apple-icon-120.png"/>
					<link rel="apple-touch-startup-image"
						href="/icons/apple-splash-2048-2732.png"
						media="(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"/>
					<link rel="apple-touch-startup-image"
						href="/icons/apple-splash-2732-2048.png"
						media="(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"/>
					<link rel="apple-touch-startup-image"
						href="/icons/apple-splash-1668-2388.png"
						media="(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"/>
					<link rel="apple-touch-startup-image"
						href="/icons/apple-splash-2388-1668.png"
						media="(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"/>
					<link rel="apple-touch-startup-image"
						href="/icons/apple-splash-1668-2224.png"
						media="(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"/>
					<link rel="apple-touch-startup-image"
						href="/icons/apple-splash-2224-1668.png"
						media="(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"/>
					<link rel="apple-touch-startup-image"
						href="/icons/apple-splash-1536-2048.png"
						media="(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"/>
					<link rel="apple-touch-startup-image"
						href="/icons/apple-splash-2048-1536.png"
						media="(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"/>
					<link rel="apple-touch-startup-image"
						href="/icons/apple-splash-1242-2688.png"
						media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"/>
					<link rel="apple-touch-startup-image"
						href="/icons/apple-splash-2688-1242.png"
						media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"/>
					<link rel="apple-touch-startup-image"
						href="/icons/apple-splash-1125-2436.png"
						media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"/>
					<link rel="apple-touch-startup-image"
						href="/icons/apple-splash-2436-1125.png"
						media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"/>
					<link rel="apple-touch-startup-image"
						href="/icons/apple-splash-828-1792.png"
						media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"/>
					<link rel="apple-touch-startup-image"
						href="/icons/apple-splash-1792-828.png"
						media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"/>
					<link rel="apple-touch-startup-image"
						href="/icons/apple-splash-1242-2208.png"
						media="(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"/>
					<link rel="apple-touch-startup-image"
						href="/icons/apple-splash-2208-1242.png"
						media="(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"/>
					<link rel="apple-touch-startup-image"
						href="/icons/apple-splash-750-1334.png"
						media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"/>
					<link rel="apple-touch-startup-image"
						href="/icons/apple-splash-1334-750.png"
						media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"/>
					<link rel="apple-touch-startup-image"
						href="/icons/apple-splash-640-1136.png"
						media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"/>
					<link rel="apple-touch-startup-image"
						href="/icons/apple-splash-1136-640.png"
						media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"/>
					<link
						rel="preload"
						href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css"
						integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
						as="style"
					/>
					<link
						rel="stylesheet"
						href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css"
						integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
						crossOrigin=""
					/>
				</Head>
				<body>
					<Main/>
					<NextScript/>
				</body>
			</html>
		);
	}
}
