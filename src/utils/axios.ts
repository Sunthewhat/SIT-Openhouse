import { globalConstants } from '@/constants/global';
import axios from 'axios';

const Axios = {
	ictRegister: axios.create({
		baseURL: globalConstants.REGISTER_API_KEY,
		validateStatus: (status) => status >= 200 && status < 500,
		headers: {
			'Content-Type': 'application/json; charset=utf-8',
		},
	}),
	public: axios.create({
		baseURL: globalConstants.PUBLIC_API_KEY,
		validateStatus: (status) => status >= 200 && status < 500,
		headers: {
			'Content-Type': 'application/json; charset=utf-8',
		},
	}),
	workshop: axios.create({
		baseURL: globalConstants.WORKSHOP_API_KEY,
		validateStatus: (status) => status >= 200 && status < 500,
		headers: {
			'Content-Type': 'application/json; charset=utf-8',
		},
	}),

	staff: axios.create({
		baseURL: globalConstants.STAFF_API_KEY,
		validateStatus: (status) => status >= 200 && status < 500,
		headers: {
			'Content-Type': 'application/json; charset=utf-8',
		},
	}),
};

export { Axios };
