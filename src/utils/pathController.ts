import { registerCookieHandler } from './register-cookie-handler';

type pathControllerType = {
  isValid: boolean;
  redirectPath: string;
};

const registerPathController = (): pathControllerType => {
  const PDPA = registerCookieHandler.getPDPA();
  const team = registerCookieHandler.getTeam();
  const competitor1 = registerCookieHandler.getCompetitor(1);
  const competitor2 = registerCookieHandler.getCompetitor(2);
  const competitor3 = registerCookieHandler.getCompetitor(3);
  const advisor = registerCookieHandler.getAdvisor();

  if (!PDPA) {
    return {
      isValid: false,
      redirectPath: '/ict-challenge/register/PDPA',
    };
  }
  if (!team) {
    return {
      isValid: false,
      redirectPath: '/ict-challenge/register/team',
    };
  }

  if (!competitor1) {
    return {
      isValid: false,
      redirectPath: '/ict-challenge/register/members/1',
    };
  }
  if (!competitor2) {
    return {
      isValid: false,
      redirectPath: '/ict-challenge/register/members/2',
    };
  }

  if (!competitor3) {
    return {
      isValid: false,
      redirectPath: '/ict-challenge/register/members/3',
    };
  }

  if (!advisor) {
    return {
      isValid: false,
      redirectPath: '/ict-challenge/register/advisor',
    };
  }

  return {
    isValid: true,
    redirectPath: '',
  };
};

export { registerPathController };
