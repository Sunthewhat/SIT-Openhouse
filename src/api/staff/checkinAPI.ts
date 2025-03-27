import { ICTCheckinResponseType } from '@/model/staff/ictResponse';
import { Axios } from '@/utils/axios';
import { staffCookieHandler } from '@/utils/staff-cookie-handler';

const WorkshopCheckinAPI = async (
	workshopId: number,
	UUID: string
): Promise<{ success: boolean; str: string }> => {
	try {
		const token = staffCookieHandler.getCred();
		console.log(token);

		if (!token) {
			return {
				success: false,
				str: 'Unauthorized',
			};
		}
		const response = await Axios.staff.post<string>(
			'/workshopCheckin',
			{
				workshopID: workshopId,
				attendeeUuid: UUID,
			},
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);
		if (response.status !== 200) {
			return {
				success: false,
				str: response.data,
			};
		}
		return {
			success: true,
			str: response.data,
		};
	} catch (e) {
		console.log(e);
		return {
			success: false,
			str: e + '',
		};
	}
};

type ICTCheckinAPIResponse =
	| {
			success: true;
			payload: ICTCheckinResponseType;
	  }
	| {
			success: false;
			error: string;
	  };

const ICTCheckinAPI = async (UUID: string): Promise<ICTCheckinAPIResponse> => {
	try {
		const token = staffCookieHandler.getCred();
		const response = await Axios.staff.post<ICTCheckinResponseType | string>(
			'/ictCheckin',
			`${UUID}`,
			{
				headers: { Authorization: `Bearer ${token}` },
			}
		);
		if (response.status !== 200) {
			return {
				success: false,
				error: response.data as string,
			};
		}
		return {
			success: true,
			payload: response.data as ICTCheckinResponseType,
		};
	} catch (e) {
		console.log(e);
		return {
			success: false,
			error: e + '',
		};
	}
};

export { WorkshopCheckinAPI, ICTCheckinAPI };
