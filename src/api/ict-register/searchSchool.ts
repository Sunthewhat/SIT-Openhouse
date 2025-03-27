import { SearchBySchoolResponseType } from '@/model/ICT-register/searchBySchoolResponse';
import { Axios } from '@/utils/axios';

const searchSchoolAPI = async (searchParam: string) => {
  const response = await Axios.ictRegister.get<SearchBySchoolResponseType[]>(
    `/searchSchoolByName?name=${searchParam}`
  );

  return response.data;
};

export { searchSchoolAPI };
