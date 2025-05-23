import { Axios } from '@/utils/axios';
import { staffCookieHandler } from '@/utils/staff-cookie-handler';

const VerifyAPI = async () => {
	try {
		const token = staffCookieHandler.getCred();
		const response = await Axios.staff.get('/checkToken', {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return response.status === 200;
	} catch (e) {
		console.log(e);
		return false;
	}
};

export { VerifyAPI };
