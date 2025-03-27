type RegisterContextType = {
  isPDPAAccepted: boolean;
  schoolID?: number;
  teamName?: string;
  teamId?: string;
  advisor?: RegisterAdvisorType;
  competitors?: RegisterStudentType[];
};

type RegisterAdvisorType = {
  // advisorName: string;
  advisorTitle: string;
  advisorFirstname: string;
  advisorLastname: string;
  advisorTelephone: string;
  advisorPosition: string;
  advisorEmail: string;
};

type RegisterStudentType = {
  title: string;
  firstname: string;
  lastname: string;
  classyear: string;
  telephone: string;
  email: string;
  facebook: string;
  lineid: string;
};

type RegisterTeamType = {
  schoolID: number;
  schoolName: string;
  schoolAddress: string;
  teamName: string;
};

export type { RegisterContextType, RegisterAdvisorType, RegisterStudentType, RegisterTeamType };
