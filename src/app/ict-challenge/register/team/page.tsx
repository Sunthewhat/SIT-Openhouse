'use client';

import { ProgressBar } from '@/components/ICT-register/progressbar';
import { useEffect, useState } from 'react';
import { searchSchoolAPI } from '@/api/ict-register/searchSchool';
import { SearchBySchoolResponseType } from '@/model/ICT-register/searchBySchoolResponse';
import { useRouter } from 'next/navigation';
import { registerCookieHandler } from '@/utils/register-cookie-handler';
import { registerPathController } from '@/utils/pathController';

const TeamPage = () => {
  const navigator = useRouter();
  const [formData, setFormData] = useState({
    teamName: '',
    schoolName: '',
    schoolAddress: '',
  });

  const [errors, setErrors] = useState({
    teamName: '',
    schoolName: '',
    schoolAddress: '',
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchBySchoolResponseType[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchError, setSearchError] = useState('');
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [selectedSchool, setSelectedSchool] = useState<SearchBySchoolResponseType | null>(null);
  const [isFromCookie, setIsFromCookie] = useState(false);
  const [isEdited, setIsEdited] = useState(false);

  useEffect(() => {
    const pathStatus = registerPathController();
    if (!pathStatus.isValid) {
      navigator.push(pathStatus.redirectPath);
    }
    const team = registerCookieHandler.getTeam();
    if (team) {
      setFormData({
        teamName: team.teamName,
        schoolName: team.schoolName,
        schoolAddress: team.schoolAddress,
      });
      setSearchQuery(team.schoolName);
      setIsFromCookie(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
    setErrors({ ...errors, [id]: '' }); // Clear error when user types
  };

  const validateForm = () => {
    const newErrors: any = {};
    if (!formData.teamName) newErrors.teamName = 'กรุณากรอกชื่อทีม';
    if (!formData.schoolName) newErrors.schoolName = 'กรุณาเลือกโรงเรียนจากการค้นหา';
    return newErrors;
  };

  const handleBack = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0 || (selectedSchool === null && !isFromCookie)) {
      setErrors(validationErrors);
    } else if (
      isFromCookie &&
      !isEdited &&
      registerCookieHandler.getTeam()?.schoolName === searchQuery
    ) {
      navigator.push('/ict-challenge/register/PDPA');
    } else {
      registerCookieHandler.setTeam({
        schoolID: selectedSchool!.id,
        teamName: formData.teamName,
        schoolName: formData.schoolName,
        schoolAddress: formData.schoolAddress,
      });
      navigator.push('/ict-challenge/register/PDPA');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0 || (selectedSchool === null && !isFromCookie)) {
      setErrors(validationErrors);
    } else if (
      isFromCookie &&
      !isEdited &&
      registerCookieHandler.getTeam()?.schoolName === searchQuery
    ) {
      navigator.push('/ict-challenge/register/members/1');
    } else {
      registerCookieHandler.setTeam({
        schoolID: selectedSchool!.id,
        teamName: formData.teamName,
        schoolName: formData.schoolName,
        schoolAddress: formData.schoolAddress,
      });
      navigator.push('/ict-challenge/register/members/1');
    }
  };

  const handleSearch = async () => {
    if (!searchQuery) return;
    setLoading(true);
    setSearchError('');

    try {
      const data: SearchBySchoolResponseType[] = await searchSchoolAPI(searchQuery);
      setSearchResults(data);
      setIsDropdownVisible(true);
    } catch (error) {
      setSearchError('Error fetching school data' + error);
    } finally {
      setLoading(false);
    }
  };

  const buildFullAddress = (school: SearchBySchoolResponseType) => {
    const {
      housenumber,
      villagenumber,
      street,
      soi,
      trok,
      subdistrict,
      district,
      province,
      postcode,
    } = school;

    return [
      housenumber ? `${housenumber} ` : '',
      villagenumber ? `${villagenumber} ` : '',
      street ? `${street} ` : '',
      soi ? `${soi} ` : '',
      trok ? `${trok} ` : '',
      subdistrict ? `${subdistrict} ` : '',
      district ? `${district} ` : '',
      province ? `${province} ` : '',
      postcode ? `${postcode}` : '',
    ]
      .filter(Boolean)
      .join(' ');
  };

  const handleSelectSchool = (selectedSchool: SearchBySchoolResponseType) => {
    const fullAddress = buildFullAddress(selectedSchool);
    setFormData({
      ...formData,
      schoolName: selectedSchool.schoolname,
      schoolAddress: fullAddress,
    });
    setSearchQuery(selectedSchool.schoolname);
    setIsDropdownVisible(false);
    setErrors({ ...errors, schoolName: '' });
    setSelectedSchool(selectedSchool);
  };

  return (
    <div className='flex justify-center items-center w-full'>
      <div className='bg-white w-full p-6 md:p-[40px] lg:p-[70px] rounded-lg shadow-lg'>
        <ProgressBar currentStep={1} />
        <form onSubmit={handleSubmit}>
          <h1 className='text-[#1C3FB7] mb-5 mt-10 text-xl md:text-2xl font-bold'>ข้อมูลทีม</h1>

          <div className='flex flex-col md:flex-row md:space-x-5'>
            <div className='w-full mb-4'>
              <label htmlFor='teamName' className='text-[#637381] mb-2 block'>
                ชื่อทีม
              </label>
              <input
                type='text'
                id='teamName'
                placeholder='ชื่อทีม'
                className='w-full px-4 py-2 border border-gray-300 rounded-md'
                value={formData.teamName}
                onChange={handleChange}
              />
              {errors.teamName && <span className='text-red-500 text-sm'>{errors.teamName}</span>}
            </div>
            <div className='mb-4 w-full'>
              <label htmlFor='schoolSearch' className='text-[#637381] mb-2 block'>
                ค้นหาโรงเรียน
              </label>
              <div className='flex'>
                <div className='relative w-full'>
                  <input
                    type='text'
                    id='schoolSearch'
                    placeholder='พิมพ์ชื่อโรงเรียน'
                    className='w-full px-4 py-2 border border-gray-300 rounded-md'
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      if (isFromCookie) {
                        setIsEdited(true);
                      }
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleSearch();
                      }
                    }}
                  />
                  {isDropdownVisible && searchResults.length > 0 && (
                    <ul className='absolute z-10 mt-2 w-full bg-white border border-gray-300 rounded-md max-h-60 overflow-y-auto'>
                      {searchResults.map((school) => (
                        <li
                          key={school.id}
                          className='px-4 py-2 hover:bg-gray-100 cursor-pointer'
                          onClick={() => handleSelectSchool(school)}
                        >
                          {school.schoolname}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <button
                  type='button'
                  className='bg-[#1C3FB7] hover:bg-[#0D2A8D] text-white px-4 py-2 rounded-md ml-2'
                  onClick={handleSearch}
                >
                  ค้นหา
                </button>
              </div>
              {errors.schoolName && (
                <span className='text-red-500 text-sm'>{errors.schoolName}</span>
              )}
              {loading && <p>Loading...</p>}
              {searchError && <p className='text-red-500'>{searchError}</p>}
            </div>
          </div>
          <div className='mb-4 '>
            <label htmlFor='schoolAddress' className='text-[#637381] mb-2 block'>
              ที่อยู่โรงเรียน
            </label>
            <div
              className='w-full px-4 py-2 border border-gray-300 rounded-md resize-vertical bg-white'
              style={{ minHeight: '100px' }}
            >
              {formData.schoolAddress || 'กรุณาเลือกโรงเรียนเพื่อแสดงที่อยู่'}
            </div>
          </div>

          <div className='flex md:flex-row justify-between mt-6'>
            <button
              onClick={handleBack}
              type='button'
              className='bg-gray-400 hover:bg-[#6B7280] text-white px-5 w-32 py-2 rounded-md'
            >
              <span className='mr-2'>&lt;</span>ย้อนกลับ
            </button>
            <button
              onClick={handleSubmit}
              type='submit'
              className='bg-[#1C3FB7] hover:bg-[#0D2A8D] text-white px-5 w-32 py-2 rounded-md'
            >
              ถัดไป<span className='ml-2'>&gt;</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TeamPage;
