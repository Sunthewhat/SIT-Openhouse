import type { Metadata } from 'next';
import { Noto_Sans_Thai } from 'next/font/google';
import { GoogleAnalytics } from '@next/third-parties/google';

import './global.css';

const noto = Noto_Sans_Thai({
	subsets: ['thai'],
});

export const metadata: Metadata = {
	title: 'SIT Event',
	description: 'Welcome to SIT Event',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<GoogleAnalytics gaId='G-VV3V1JZTK1' />
			<body className={noto.className}>{children}</body>
		</html>
	);
}
