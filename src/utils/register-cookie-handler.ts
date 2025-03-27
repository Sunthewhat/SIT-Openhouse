import {
  RegisterAdvisorType,
  RegisterStudentType,
  RegisterTeamType,
} from '@/model/ICT-register/registerContext';
import cookie from 'js-cookie';
const cookiesKey = {
  PDPA: 'PDPA',
  team: 'TEAM',
  advisor: 'ADVISOR',
  competitor1: 'COMPETITOR1',
  competitor2: 'COMPETITOR2',
  competitor3: 'COMPETITOR3',
};

const registerCookieHandler = {
  clearAllCookies: () => {
    Object.keys(cookiesKey).forEach((key) => {
      cookie.remove(cookiesKey[key as keyof typeof cookiesKey]);
    });
  },

  setPDPA: (value: boolean) => {
    cookie.set(cookiesKey.PDPA, value.toString(), {
      expires: 1,
    });
  },

  setTeam: (value: RegisterTeamType) => {
    cookie.set(cookiesKey.team, JSON.stringify(value), {
      expires: 1,
    });
  },

  setAdvisor: (value: RegisterAdvisorType) => {
    cookie.set(cookiesKey.advisor, JSON.stringify(value), {
      expires: 1,
    });
  },

  setCompetitor: (i: number, value: RegisterStudentType) => {
    cookie.set(cookiesKey[`competitor${i}` as keyof typeof cookiesKey], JSON.stringify(value), {
      expires: 1,
    });
  },

  getPDPA: () => {
    return cookie.get(cookiesKey.PDPA) === 'true';
  },

  getTeam: () => {
    const token = cookie.get(cookiesKey.team);
    if (!token) {
      return null;
    }
    return JSON.parse(token) as RegisterTeamType;
  },

  getAdvisor: () => {
    const token = cookie.get(cookiesKey.advisor);
    if (!token) {
      return null;
    }
    return JSON.parse(token) as RegisterAdvisorType;
  },

  getCompetitor: (i: number) => {
    const token = cookie.get(cookiesKey[`competitor${i}` as keyof typeof cookiesKey]);
    if (!token) {
      return null;
    }
    return JSON.parse(token) as RegisterStudentType;
  },
};

export { registerCookieHandler };
