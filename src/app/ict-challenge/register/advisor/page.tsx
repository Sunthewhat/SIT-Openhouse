'use client';

import { registerCookieHandler } from '@/utils/register-cookie-handler';
import { ProgressBar } from '@/components/ICT-register/progressbar';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { RegisterAdvisorType } from '@/model/ICT-register/registerContext';
import { sendFormAPI } from '@/api/ict-register/sendForm';
import { emailValidator } from '@/utils/validateEmail';
import { registerPathController } from '@/utils/pathController';

const AdvisorPage = () => {
  const navigator = useRouter();
  const [formData, setFormData] = useState<RegisterAdvisorType>({
    advisorTitle: 'นาย',
    advisorFirstname: '',
    advisorLastname: '',
    advisorPosition: '',
    advisorTelephone: '',
    advisorEmail: '',
  });

  const [errors, setErrors] = useState<RegisterAdvisorType>({
    advisorTitle: '',
    advisorFirstname: '',
    advisorLastname: '',
    advisorPosition: '',
    advisorTelephone: '',
    advisorEmail: '',
  });

  const [isOpen, setIsOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const pathStatus = registerPathController();
    if (!pathStatus.isValid) {
      navigator.push(pathStatus.redirectPath);
    }
    const advisor = registerCookieHandler.getAdvisor();
    if (advisor) {
      setFormData(advisor);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSendForm = async () => {
    const response = await sendFormAPI();
    setIsOpen(false);
    if (response.success) {
      setIsSuccess(true);
      registerCookieHandler.clearAllCookies();
    } else {
      setIsError(true);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
    setErrors({ ...errors, [id]: '' });
  };

  const validatePhone = (phone: string) => {
    const phoneRegex = /^[0-9]{9,10}$/;
    return phoneRegex.test(phone);
  };

  const validateEmail = (email: string) => {
    return emailValidator(email);
  };

  const handleBack = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!handleSave()) {
      return;
    }
    navigator.push('/ict-challenge/register/members/3');
  };

  const handleSave = () => {
    // Basic validation (you can enhance this further)
    if (
      !formData.advisorFirstname ||
      !formData.advisorPosition ||
      !formData.advisorLastname ||
      !formData.advisorEmail ||
      !formData.advisorTelephone
    ) {
      setErrors({
        advisorTitle: '',
        advisorFirstname: !formData.advisorFirstname ? 'กรุณากรอกชื่อจริง' : '',
        advisorLastname: !formData.advisorLastname ? 'กรุณากรอกนามสกุล' : '',
        advisorPosition: !formData.advisorPosition
          ? 'กรุณากรอกกลุ่มสาระการเรียนรู้ที่สังกัด หรือตําแหน่งปัจจุบัน'
          : '',
        advisorTelephone: !formData.advisorTelephone ? 'กรุณากรอกเบอร์โทรศัพท์' : '',
        advisorEmail: !formData.advisorEmail ? 'กรุณากรอกอีเมล' : '',
      });
      return false;
    }

    if (!validatePhone(formData.advisorTelephone)) {
      setErrors({
        ...errors,
        advisorTelephone: 'เบอร์โทรศัพท์ต้องมีความยาว 9-10 หลักและเป็นตัวเลขเท่านั้น',
      });
      return false;
    }

    // Validate email
    if (!validateEmail(formData.advisorEmail)) {
      setErrors({ ...errors, advisorEmail: 'Email ไม่ถูกต้อง' });
      return false;
    }

    registerCookieHandler.setAdvisor(formData);
    return true;
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!handleSave()) {
      return;
    }
    setIsOpen(true);
  };

  return (
    <div className='flex justify-center items-center w-full'>
      <form
        className='bg-white w-full p-6 md:p-[40px] lg:p-[70px] rounded-lg'
        style={{ boxShadow: '0px 10px 15px 0px #0000002E' }}
      >
        <ProgressBar currentStep={5} />
        <p className='font-inter text-[20px] font-semibold leading-[30px] text-left text-[#1C3FB7] border-b border-[#DFE4EA] pb-3 mt-[15px]'>
          ข้อมูลอาจารย์ที่ปรึกษาทีม
        </p>
        <p className='font-inter text-[18px] font-bold leading-[26px] text-left text-[#1C3FB7] mt-5'>
          ข้อมูลส่วนตัว
        </p>

        {/* Input fields section */}
        <div className='mt-4 flex flex-col md:flex-row md:space-x-3 space-y-4 md:space-y-0'>
          <div className='md:w-[120px] w-full'>
            <label className='block text-left font-inter text-[16px] font-medium text-[#637381] mb-1'>
              คำนำหน้า
            </label>
            <select
              className='w-full h-[46px] border border-[#DFE4EA] rounded-md p-2'
              id='advisorTitle'
              value={formData.advisorTitle}
              onChange={handleChange}
            >
              <option value='นาย'>นาย</option>
              <option value='นางสาว'>นางสาว</option>
              <option value='นาง'>นาง</option>
            </select>
          </div>
          <div className='flex-1'>
            <label className='block text-left font-inter text-[16px] font-medium text-[#637381] mb-1'>
              ชื่อจริง
            </label>
            <input
              type='text'
              id='advisorFirstname'
              className='w-full h-[46px] border border-[#DFE4EA] rounded-md p-2'
              placeholder='ชื่อจริง'
              value={formData.advisorFirstname}
              onChange={handleChange}
            />
            {errors.advisorFirstname && (
              <p className='text-red-500 text-sm'>{errors.advisorFirstname}</p>
            )}
          </div>
          <div className='flex-1'>
            <label className='block text-left font-inter text-[16px] font-medium text-[#637381] mb-1'>
              นามสกุล
            </label>
            <input
              type='text'
              id='advisorLastname'
              className='w-full h-[46px] border border-[#DFE4EA] rounded-md p-2'
              placeholder='นามสกุล'
              value={formData.advisorLastname}
              onChange={handleChange}
            />
            {errors.advisorLastname && (
              <p className='text-red-500 text-sm'>{errors.advisorLastname}</p>
            )}
          </div>
        </div>
        <div className='mt-5'>
          <label className='block text-left font-inter text-[16px] font-medium text-[#637381] mb-1'>
            กลุ่มสาระการเรียนรู้ที่สังกัด หรือตําแหน่งปัจจุบัน
          </label>
          <input
            name='advisorPosition'
            type='text'
            id='advisorPosition'
            value={formData.advisorPosition}
            onChange={handleChange}
            className='w-full md:w-[344px] h-[46px] border border-[#DFE4EA] rounded-md p-2'
            placeholder='เช่น หัวหน้าฝ่ายคอมพิวเตอร์ หัวหน้างานแนะแนว'
          />
          {errors.advisorPosition && (
            <p className='text-red-500 text-sm'>{errors.advisorPosition}</p>
          )}
        </div>
        {/* Line below the input */}
        <div className='border-b border-[#DFE4EA] mt-6'></div>

        <p className='font-inter text-[18px] font-bold leading-[26px] text-left text-[#1C3FB7] mt-5'>
          ช่องทางการติดต่อ
        </p>
        <div className='mt-4 flex flex-col md:flex-row md:space-x-3 space-y-4 md:space-y-0'>
          <div className='w-full'>
            <label className='block text-left font-inter text-[16px] font-medium text-[#637381] mb-1'>
              เบอร์โทรศัพท์
            </label>
            <input
              type='text'
              id='advisorTelephone'
              className='w-full h-[46px] border border-[#DFE4EA] rounded-md p-2'
              placeholder='xxx-xxx-xxxx'
              value={formData.advisorTelephone}
              onChange={handleChange}
            />
            {errors.advisorTelephone && (
              <p className='text-red-500 text-sm'>{errors.advisorTelephone}</p>
            )}
          </div>
          <div className='w-full'>
            <label className='block text-left font-inter text-[16px] font-medium text-[#637381] mb-1'>
              Email
            </label>
            <input
              type='text'
              id='advisorEmail'
              className='w-full h-[46px] border border-[#DFE4EA] rounded-md p-2'
              placeholder='example@gmail.com'
              value={formData.advisorEmail}
              onChange={handleChange}
            />
            {errors.advisorEmail && <p className='text-red-500 text-sm'>{errors.advisorEmail}</p>}
          </div>
        </div>

        {/* Button container */}
        <div className='flex justify-between gap-10 items-center mt-14'>
          {/* Back Button */}
          <button
            className='bg-[#9CA3AF] text-white font-semibold py-2 px-4 rounded-md flex justify-center items-center w-full md:w-[146px] h-[50px]'
            onClick={handleBack}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='w-6 h-6 mr-2'
            >
              <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5 8.25 12l7.5-7.5' />
            </svg>
            ย้อนกลับ
          </button>

          {/* Submit Button */}
          <button
            className='bg-[#1C3FB7] text-white font-semibold py-2 px-4 rounded-md w-full md:w-[146px] h-[50px]'
            onClick={handleSubmit}
          >
            ส่งข้อมูล
          </button>
        </div>
      </form>
      {/* Modal */}
      {isOpen && (
        <div
          className='modaloverlay fixed top-0 left-0 w-[100dvw] h-[100dvh] bg-[#00000099] flex justify-center items-center z-10'
          onClick={() => {
            setIsOpen(false);
          }}
        >
          <div
            className='modalcontainer bg-white w-[80%] max-w-[500px] px-[5dvw] py-[5dvh] rounded-[20px] z-20'
            onClick={(e) => e.stopPropagation()}
          >
            <h1 className='title font-bold text-center text-[20px]'>ยืนยันการลงทะเบียน</h1>
            <div className='buttonBox flex justify-around mt-[7dvh] text-white z-20'>
              <div
                className='cancleButton bg-[#9CA3AF] px-4 py-2 rounded-md hover:cursor-pointer'
                onClick={() => {
                  setIsOpen(false);
                }}
              >
                ยกเลิก
              </div>
              <div
                className='confirmButton bg-[#1C3FB7] px-4 py-2 rounded-md z-30 hover:cursor-pointer'
                onClick={() => {
                  handleSendForm();
                }}
              >
                ยืนยัน
              </div>
            </div>
          </div>
        </div>
      )}
      {isSuccess && (
        <div className='modaloverlay fixed top-0 left-0 w-[100dvw] h-[100dvh] bg-[#00000099] flex justify-center items-center z-10'>
          <div
            className='modalcontainer bg-white w-[80%] max-w-[500px] px-[3dvw] py-[5dvh] rounded-[20px] z-20'
            onClick={(e) => e.stopPropagation()}
          >
            <h1 className='title font-bold text-center text-[20px]'>ลงทะเบียนสำเร็จ</h1>
            <p className='desc w-[100%] text-center'>
              รายละเอียดการเข้าทำแบบทดสอบได้จัดส่งให้ผู้สมัครเข้าแข่งขันทางอีเมลเป็นที่เรียบร้อยแล้ว
            </p>
            <div className='buttonBox flex justify-around mt-[4dvh] text-white z-20'>
              <div
                className='confirmButton bg-[#1C3FB7] px-4 py-2 rounded-md z-30'
                onClick={() => {
                  navigator.push('/');
                }}
              >
                ตกลง
              </div>
            </div>
          </div>
        </div>
      )}
      {isError && (
        <div className='modaloverlay fixed top-0 left-0 w-[100dvw] h-[100dvh] bg-[#00000099] flex justify-center items-center z-10'>
          <div
            className='modalcontainer bg-white w-[80%] max-w-[500px] px-[5dvw] py-[5dvh] rounded-[20px] z-20'
            onClick={(e) => e.stopPropagation()}
          >
            <h1 className='title font-bold text-center text-[20px]'>เกิดข้อผิดพลาด</h1>
            <p className='text-center text-[16px] mt-5'>กรุณาลองใหม่อีกครั้ง</p>
            <div className='buttonBox flex justify-around mt-[4dvh] text-white z-20'>
              <div
                className='confirmButton bg-[#1C3FB7] px-4 py-2 rounded-md z-30'
                onClick={() => {
                  setIsError(false);
                }}
              >
                ตกลง
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Modal */}
    </div>
  );
};

export default AdvisorPage;
