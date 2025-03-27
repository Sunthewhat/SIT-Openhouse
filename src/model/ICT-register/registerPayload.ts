type RegisterPayloadType = {
  schoolID: number;
  teamName: string;
  advisorName: string;
  advisorTelephone: string;
  advisorEmail: string;
  advisorPosition: string;
  competitors: RegisterCompetitorPayloadType[];
};

type RegisterCompetitorPayloadType = {
  title: string;
  firstname: string;
  lastname: string;
  classyear: string;
  telephone: string;
  email: string;
  facebook: string;
  lineid: string;
};

export type { RegisterPayloadType, RegisterCompetitorPayloadType };
