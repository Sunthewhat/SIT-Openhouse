import { Axios } from '@/utils/axios';

export type NewcomerPayloadType = {
	title: string;
	firstName: string;
	lastName: string;
	email: string;
	telephone: string;
	citizenID: string;
	currentClass: string;
	studyPlan: string;
	schoolID: number;
};

type WalkInAPIResponse = {
	success: boolean;
	msg: string;
};

const newcomerWalkInAPI = async (data: NewcomerPayloadType): Promise<WalkInAPIResponse> => {
	try {
		const resp = await Axios.workshop.post('/addAttendeeWithoutConfirmation', data);

		return {
			success: resp.status < 400 && resp.data != 'Invalid Citizen ID',
			msg: resp.data,
		};
	} catch (e) {
		console.log(e);

		return {
			success: false,
			msg: 'Network Error',
		};
	}
};

const registeredWalkInAPI = async (idcard: string, phone: string): Promise<WalkInAPIResponse> => {
	try {
		const resp = await Axios.workshop.get(
			`/searchAttendeeForDDay?citizenID=${idcard}&telephone=${phone}`
		);

		return {
			success: resp.status < 400,
			msg: resp.data,
		};
	} catch (e) {
		console.log(e);

		return {
			success: false,
			msg: 'Network Error',
		};
	}
};

export { newcomerWalkInAPI, registeredWalkInAPI };
