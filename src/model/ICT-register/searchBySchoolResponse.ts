type SearchBySchoolResponseType = {
  id: number;
  schoolURL: string;
  latitude: string;
  longitude: string;
  schoolname: string;
  province: string;
  district: string;
  subdistrict: string;
  postcode: string | null;
  housenumber: string | null;
  villagenumber: string | null;
  trok: string | null;
  soi: string | null;
  street: string | null;
  tel: string | null;
  fax: string | null;
  email: string | null;
  uuid: string | null;
  address: string | null;
};

export type { SearchBySchoolResponseType };
