import { WorkshopPayloadType } from '@/model/workshop/workshopPayload';
import { Axios } from '@/utils/axios';

const sendWorkshopFormAPI = async (
  data: WorkshopPayloadType
): Promise<{ status: boolean; msg: string }> => {
  const response = await Axios.workshop.post<string>('/addAttendee', data);
  return {
    status:
      response.data === 'Reservation Successful' ||
      response.data === 'Attendee already exists but save the renew reserved already',
    msg: response.data,
  };
};

export { sendWorkshopFormAPI };
