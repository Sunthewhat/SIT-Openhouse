'use client';

import { useEffect, useState } from 'react';
import { ProgressBar } from '@/components/ICT-register/progressbar';
import { registerCookieHandler } from '@/utils/register-cookie-handler';
import { RegisterStudentType } from '@/model/ICT-register/registerContext';
import { useRouter, useParams } from 'next/navigation';
import { emailValidator } from '@/utils/validateEmail';
import { registerPathController } from '@/utils/pathController';

const MemberPage = () => {
  const index = parseInt(useParams<{ count: string }>().count);

  const initialStateFormData = {
    title: '',
    firstname: '',
    lastname: '',
    classyear: '',
    telephone: '',
    email: '',
    facebook: '',
    lineid: '',
  };
  const [formData, setFormData] = useState<RegisterStudentType>(initialStateFormData);

  const [errors, setErrors] = useState<RegisterStudentType>(initialStateFormData);

  useEffect(() => {
    const pathStatus = registerPathController();
    if (!pathStatus.isValid) {
      navigator.push(pathStatus.redirectPath);
    }
    const competitor = registerCookieHandler.getCompetitor(index);
    if (competitor) {
      setFormData(competitor);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  const navigator = useRouter();

  const handleBack = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (handleSave() === false) return;
    if (index === 1) {
      navigator.push('/ict-challenge/register/team');
      return;
    }
    navigator.push(`/ict-challenge/register/members/${index - 1}`);
  };

  const handleSave = () => {
    const validateFormValue = validateForm();
    if (validateFormValue !== false) {
      return false;
    }
    if (!validatePhone(formData.telephone)) {
      setErrors({ ...errors, telephone: 'เบอร์โทรศัพท์ไม่ถูกต้อง' });
      return false;
    }
    if (!validateEmail(formData.email)) {
      setErrors({ ...errors, email: 'Email ไม่ถูกต้อง' });
      return false;
    }
    registerCookieHandler.setCompetitor(index, formData);
    return true;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors: any = {};
    if (!formData.title) {
      newErrors.title = 'กรุณาเลือกคำนำหน้า';
      isValid = false;
    }
    if (!formData.firstname) {
      newErrors.firstname = 'กรุณากรอกชื่อจริง';
      isValid = false;
    }
    if (!formData.lastname) {
      newErrors.lastname = 'กรุณากรอกนามสกุล';
      isValid = false;
    }
    if (!formData.classyear) {
      newErrors.classyear = 'กรุณาเลือกระดับชั้น';
      isValid = false;
    }
    if (!formData.telephone) {
      newErrors.telephone = 'กรุณากรอกเบอร์โทรศัพท์';
      isValid = false;
    }
    if (!formData.email) {
      newErrors.email = 'กรุณากรอกอีเมล';
      isValid = false;
    }
    setErrors(newErrors);

    if (isValid) return false;
    return newErrors;
  };

  const validatePhone = (phone: string) => {
    const phoneRegex = /^[0-9]{9,10}$/;
    return phoneRegex.test(phone);
  };

  const validateEmail = (email: string) => {
    return emailValidator(email);
  };

  const handleSubmit = () => {
    if (handleSave() === false) return;
    if (index === 3) {
      navigator.push('/ict-challenge/register/advisor');
      return;
    }
    navigator.push(`/ict-challenge/register/members/${index + 1}`);
  };

  return (
    <div className='flex justify-center items-center w-full'>
      <div className='flex flex-col justify-center p-8 border bg-white shadow-lg rounded-[12px] w-full'>
        <ProgressBar currentStep={index + 1} />
        <h6 className='text-[#1C3FB7] text-xl sm:text-2xl mb-6 font-bold'>
          ข้อมูลผู้สมัครคนที่ {index}
        </h6>
        <div className='border-b border-[#DFE4EA] mb-5'></div>

        <h4 className='text-[#1C3FB7] text-lg sm:text-xl mb-3 font-bold'>ข้อมูลส่วนตัว</h4>
        <div className='flex flex-wrap sm:flex-nowrap justify-between mb-2 gap-2'>
          <div className='w-full sm:w-auto'>
            <label className='block text-[#637381] font-medium mb-1'>คำนำหน้า</label>
            <select
              className='w-full sm:w-[150px] h-12 p-2 border text-[#637381] border-gray-300 rounded-lg focus:outline-blue-700'
              id='title'
              name='title'
              value={formData.title}
              onChange={handleChange}
            >
              <option value=''></option>
              <option value='นาย'>นาย</option>
              <option value='นางสาว'>นางสาว</option>
              <option value='นาง'>นาง</option>
            </select>
            {errors.title && <span className='text-red-500 text-sm'>{errors.title}</span>}
          </div>

          <div className='w-full sm:flex-1'>
            <label className='block text-[#637381] font-medium mb-1'>ชื่อจริง</label>
            <input
              type='string'
              id='firstname'
              name='firstname'
              className='w-full h-12 p-2 border border-gray-300 rounded-lg focus:outline-blue-700'
              placeholder='ชื่อจริง'
              required
              value={formData.firstname}
              onChange={handleChange}
            />
            {errors.firstname && <span className='text-red-500 text-sm'>{errors.firstname}</span>}
          </div>

          <div className='w-full sm:flex-1'>
            <label className='block text-[#637381] font-medium mb-1'>นามสกุล</label>
            <input
              type='string'
              id='lastname'
              name='lastname'
              className='w-full h-12 p-2 border border-gray-300 rounded-lg focus:outline-blue-700'
              placeholder='นามสกุล'
              required
              value={formData.lastname}
              onChange={handleChange}
            />
            {errors.lastname && <span className='text-red-500 text-sm'>{errors.lastname}</span>}
          </div>
        </div>

        <div className='mb-5'>
          <label className='block text-[#637381] font-medium mb-1'>
            ระดับชั้นที่กำลังศึกษาอยู่
          </label>
          <select
            className='w-full sm:w-[250px] h-12 p-2 border border-gray-300 rounded-lg focus:outline-blue-700 text-[#637381]'
            id='classyear'
            name='classyear'
            value={formData.classyear}
            onChange={handleChange}
          >
            <option value=''></option>
            <option value='มัธยมศึกษาปีที่ 6'>มัธยมศึกษาปีที่ 6</option>
            <option value='มัธยมศึกษาปีที่ 5'>มัธยมศึกษาปีที่ 5</option>
            <option value='มัธยมศึกษาปีที่ 4'>มัธยมศึกษาปีที่ 4</option>
            <option value='ปวช 3'>ปวช 3</option>
            <option value='ปวช 2'>ปวช 2</option>
            <option value='ปวช 1'>ปวช 1</option>
            <option value='อื่นๆ'>อื่นๆ</option>
          </select>
          {errors.classyear && <span className='text-red-500 text-sm'>{errors.classyear}</span>}
        </div>
        <div className='border-b border-[#DFE4EA] mb-4'></div>

        <h4 className='text-[#1C3FB7] text-lg sm:text-xl mb-3 font-bold'>ช่องทางการติดต่อ</h4>
        <div className='flex flex-wrap sm:flex-nowrap justify-between mb-2 gap-2'>
          <div className='w-full'>
            <label className='block text-[#637381] font-medium mb-1'>เบอร์โทรศัพท์</label>
            <input
              type='string'
              id='telephone'
              name='telephone'
              className='w-full h-12 p-2 border border-gray-300 rounded-lg focus:outline-blue-700'
              placeholder='xxx-xxx-xxxx'
              required
              value={formData.telephone}
              onChange={handleChange}
            />
            {errors.telephone && <span className='text-red-500 text-sm'>{errors.telephone}</span>}
          </div>

          <div className='w-full'>
            <label className='block text-[#637381] font-medium mb-1'>Email</label>
            <input
              type='string'
              id='email'
              name='email'
              className='w-full h-12 p-2 border border-gray-300 rounded-lg focus:outline-blue-700'
              placeholder='example@gmail.com'
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <span className='text-red-500 text-sm'>{errors.email}</span>}
          </div>
        </div>

        <div className='flex flex-wrap sm:flex-nowrap justify-between mb-8 gap-2'>
          <div className='w-full'>
            <label className='block text-[#637381] font-medium mb-1'>Facebook (ไม่บังคับ)</label>
            <input
              type='string'
              id='facebook'
              name='facebook'
              className='w-full h-12 p-2 border border-gray-300 rounded-lg focus:outline-blue-700'
              placeholder='เฟสบุ๊ค'
              value={formData.facebook}
              onChange={handleChange}
            />
          </div>

          <div className='w-full'>
            <label className='block text-[#637381] font-medium mb-1'>Line ID (ไม่บังคับ)</label>
            <input
              type='string'
              id='lineid'
              name='lineid'
              className='w-full h-12 p-2 border border-gray-300 rounded-lg focus:outline-blue-700'
              placeholder='@ไอดีไลน์'
              value={formData.lineid}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className='flex justify-between gap-4 md:gap-10 lg:gap-10'>
          <button
            className='flex-1 sm:flex-none w-full sm:w-auto px-3 md:px-5 lg:px-5 py-2 h-12 border border-gray-300 rounded-lg bg-[#9CA3AF] hover:bg-[#6B7280] text-white transition'
            onClick={handleBack}
          >
            <span className='mr-2'>&lt;</span> ย้อนกลับ
          </button>
          <button
            className='flex-1 sm:flex-none w-full sm:w-auto px-3 md:px-5 lg:px-5 py-2 h-12 bg-[#1C3FB7] text-white rounded-lg hover:bg-[#0D2A8D] transition'
            onClick={handleSubmit}
          >
            ถัดไป <span className='ml-2'>&gt;</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MemberPage;
