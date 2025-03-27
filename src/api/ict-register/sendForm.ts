import { RegisterPayloadType } from '@/model/ICT-register/registerPayload';
import { Axios } from '@/utils/axios';
import { registerCookieHandler } from '@/utils/register-cookie-handler';

type SendFormAPIResponse = {
  success: boolean;
  message: string;
};

const sendFormAPI = async (): Promise<SendFormAPIResponse> => {
  const teamdata = registerCookieHandler.getTeam();
  const advisor = registerCookieHandler.getAdvisor();
  const competitor1 = registerCookieHandler.getCompetitor(1);
  const competitor2 = registerCookieHandler.getCompetitor(2);
  const competitor3 = registerCookieHandler.getCompetitor(3);

  if (!teamdata || !advisor || !competitor1 || !competitor2 || !competitor3) {
    return {
      success: false,
      message: 'Missing data',
    };
  }

  const competitors = [competitor1, competitor2, competitor3];

  const data: RegisterPayloadType = {
    schoolID: teamdata.schoolID,
    teamName: teamdata.teamName,
    advisorName: advisor.advisorTitle + advisor.advisorFirstname + ' ' + advisor.advisorLastname,
    advisorTelephone: advisor.advisorTelephone,
    advisorEmail: advisor.advisorEmail,
    advisorPosition: advisor.advisorPosition,
    competitors: competitors.map((competitor) => ({
      title: competitor.title,
      firstname: competitor.firstname,
      lastname: competitor.lastname,
      classyear: competitor.classyear,
      telephone: competitor.telephone,
      email: competitor.email,
      facebook: competitor.facebook,
      lineid: competitor.lineid,
    })),
  };

  const response = await Axios.ictRegister.post('/addTeamAndCompetitor', data);

  if (response.status === 201) {
    return {
      success: true,
      message: 'Success',
    };
  }

  return {
    success: false,
    message: 'Failed : ' + response.data,
  };
};

export { sendFormAPI };
