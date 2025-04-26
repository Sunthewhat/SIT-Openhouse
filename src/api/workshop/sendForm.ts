import { WorkshopPayloadType } from '@/model/workshop/workshopPayload';
import { Axios } from '@/utils/axios';

type EventFormAPIType = { status: boolean; msg: string };

const sendEventFormAPI = async (data: WorkshopPayloadType): Promise<EventFormAPIType> => {
	const response = await Axios.workshop.post<string>('/addAttendee', data);
	return {
		status:
			response.data === 'Reservation Successful' ||
			response.data === 'Attendee already exists but save the renew reserved already',
		msg: response.data,
	};
};

const sendQueueEventFormAPI = async (data: WorkshopPayloadType): Promise<EventFormAPIType> => {
	const response = await Axios.workshop.post<string>('/addAttendeeQueue', data);
	return {
		status: response.status < 400,
		msg: response.data,
	};
};

export { sendEventFormAPI, sendQueueEventFormAPI };
