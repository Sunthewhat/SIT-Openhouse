/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: '**',
				port: '',
				pathname: '**',
			},
		],
	},
	reactStrictMode: false,
	// assetPrefix: 'https://sitevent.sit.kmutt.ac.th',
};

export default nextConfig;
