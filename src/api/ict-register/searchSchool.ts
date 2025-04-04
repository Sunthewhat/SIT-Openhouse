import { SearchBySchoolResponseType } from '@/model/ICT-register/searchBySchoolResponse';
import { Axios } from '@/utils/axios';

const searchSchoolAPI = async (searchParam: string) => {
	const response = await Axios.ictRegister.get<SearchBySchoolResponseType[]>(
		`/searchSchoolByName?name=${searchParam}`
	);

	const SchoolNotExist: SearchBySchoolResponseType = {
		id: 0,
		schoolURL: '',
		latitude: '',
		longitude: '',
		schoolname: 'อื่นๆ',
		province: '',
		district: '',
		subdistrict: '',
		postcode: null,
		housenumber: null,
		villagenumber: null,
		trok: null,
		soi: null,
		street: null,
		tel: null,
		fax: null,
		email: null,
		uuid: null,
		address: null,
	};

	return [...response.data, SchoolNotExist];
};

export { searchSchoolAPI };
