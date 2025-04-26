const globalURL = {
	production: 'https://sitevent-api.sit.kmutt.ac.th',
	development: 'https://sitevent-dev.sit.kmutt.ac.th',
	local: 'http://10.4.32.46:8080',
};

const environmentURL = globalURL.production;

const globalConstants = {
	REGISTER_API_KEY: `${environmentURL}/sitopenhouse/public/ictregistration`,
	WORKSHOP_API_KEY: `${environmentURL}/sitopenhouse/public/events`,
	PUBLIC_API_KEY: `${environmentURL}/sitopenhouse`,
	STAFF_API_KEY: `${environmentURL}/sitopenhouse/intranet`,
	IMAGE_PATH: `${globalURL.production}/resources/`,
};

export { globalConstants };
