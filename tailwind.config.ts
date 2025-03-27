import type { Config } from 'tailwindcss';

const config: Config = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			colors: {
				primary_text: '#637381',
				secondary: '#FFDE59',
				second_text: '#8899A8',
				blue_dark: '#1C37B7',
				dark6: '#9CA3AF',
				dark8: '#E5E7EB',
			},
			backgroundImage: {
				blue_dark: '#1C37B7',
				yellow_button: '#FCD34D',
				gradient: 'linear-gradient(-45deg, #0B5796, #001678, #2AA4E6)',
			},
		},
	},
	plugins: [],
};
export default config;
