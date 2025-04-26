'use client';

import { FC, useState } from 'react';
import SIT_LOGO from '@/assets/svg/SIT_logo.svg';
import Image from 'next/image';
import { StaffLoginAPI } from '@/api/staff/LoginAPI';
import { useRouter } from 'next/navigation';
import { staffCookieHandler } from '@/utils/staff-cookie-handler';

type formDataType = {
	studentId?: string;
	password?: string;
};

const StaffLoginPage: FC = () => {
	const [formData, setFormData] = useState<formDataType>({});
	const [errors, setErrors] = useState<formDataType>({});
	const navigator = useRouter();
	const [responseError, setResponseError] = useState<string>('');

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { id, value } = e.target;
		setFormData((prev) => ({ ...prev, [id]: value }));
		setErrors((prev) => ({ ...prev, [id]: '' }));
	};

	const validateForm = () => {
		const errors: formDataType = {};
		if (!formData.studentId) errors.studentId = 'กรุณากรอกชื่อผู้ใช้';
		if (!formData.password) errors.password = 'กรุณากรอกรหัสผ่าน';
		setErrors(errors);
		return Object.keys(errors).length === 0;
	};

	const handleSubmit = async () => {
		if (!validateForm()) return;
		if (!formData.studentId || !formData.password) return;
		const res = await StaffLoginAPI(formData.studentId, formData.password);
		if (!res.success) {
			setResponseError(res.data);
			return;
		}
		staffCookieHandler.setCred(res.data);
		navigator.replace('/staff');
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			handleSubmit();
		}
	};

	return (
		<div className='PageBox w-full'>
			<div className='bg-gradient w-full h-72 lg:h-96 p-12 lg:p-20 flex justify-center'>
				<Image
					src={SIT_LOGO}
					alt='logo'
					className='LOGO object-contain max-w-[32rem] w-full h-1/2'
					priority
				/>
			</div>
			<div className='px-2'>
				<div className='LoginBox max-w-[32rem] bg-white mx-auto -mt-36 lg:-mt-32 rounded-2xl px-6 py-10'>
					<p className='text-[#1C3FB7] font-bold text-2xl text-center mb-10'>
						Staff Log In
					</p>
					<div className='col-span-4 flex flex-col relative mb-5'>
						<label className='block text-left font-inter text-[16px] font-medium text-[#637381] mb-1'>
							Username
						</label>
						<input
							type='text'
							className='w-full h-[46px] border border-[#DFE4EA] rounded-md p-2'
							placeholder='Username'
							value={formData.studentId}
							id='studentId'
							onChange={handleChange}
							onKeyDown={handleKeyDown}
						/>
						{errors.studentId && (
							<span className='absolute -bottom-5 text-red-500 text-sm'>
								{errors.studentId}
							</span>
						)}
					</div>
					<div className='col-span-4 flex flex-col relative'>
						<label className='block text-left font-inter text-[16px] font-medium text-[#637381] mb-1'>
							Password
						</label>
						<input
							type='password'
							className='w-full h-[46px] border border-[#DFE4EA] rounded-md p-2'
							placeholder='Password'
							value={formData.password}
							id='password'
							onChange={handleChange}
							onKeyDown={handleKeyDown}
						/>
						{errors.password && (
							<span className='absolute -bottom-5 text-red-500 text-sm'>
								{errors.password}
							</span>
						)}
					</div>
					<div>
						<button
							className='w-full h-[46px] bg-[#1C3FB7] text-white rounded-md mt-10'
							onClick={handleSubmit}
						>
							Log In
						</button>
					</div>
				</div>
			</div>
			<ErrorNotice isOpen={responseError !== ''} error={responseError} />
		</div>
	);
};

const ErrorNotice: FC<{ isOpen: boolean; error: string }> = ({ isOpen, error }) => {
	if (!isOpen) {
		return null;
	}
	return (
		<div className='fixed z-50 bottom-0 left-0 px-8 py-3 text-white text-xl font-semibold bg-[#1C3FB7] rounded-tr-2xl'>
			{error}
		</div>
	);
};

export default StaffLoginPage;
