// components/Popup.tsx

import { WorkshopData } from '@/model/workshop/workshopsResponse';
import { Dispatch, FC, SetStateAction, useState } from 'react';

import Image from 'next/image';
import { Modal } from '../modal';

import { parseWorkshopTime } from '@/utils/parseTime';
import { emailValidator } from '@/utils/validateEmail';
import { sendWorkshopFormAPI } from '@/api/workshop/sendForm';
import { searchSchoolAPI } from '@/api/ict-register/searchSchool';
import { WorkshopPayloadType } from '@/model/workshop/workshopPayload';
import { SearchBySchoolResponseType } from '@/model/ICT-register/searchBySchoolResponse';

import MailImage from '@/assets/svg/mail.svg';
import timeIcon from '@/assets/svg/time_icon.svg';

type PopupProps = {
	workshops: WorkshopData[];
	isVisible: boolean;
	onClose: () => void;
};

type ErrorType = {
	title?: string;
	firstName?: string;
	lastName?: string;
	email?: string;
	telephone?: string;
	citizenID?: string;
	currentClass?: string;
	studyPlan?: string;
	schoolID?: string;
};

const initialFormData: WorkshopPayloadType = {
	title: '',
	firstName: '',
	lastName: '',
	email: '',
	telephone: '',
	citizenID: '',
	currentClass: '',
	studyPlan: '',
	schoolID: -1,
	eventIDList: [],
};
const ConfirmationPopup: FC<PopupProps> = ({ isVisible, onClose, workshops }) => {
	const [errors, setErrors] = useState<ErrorType>({});
	const [formData, setFormData] = useState<WorkshopPayloadType>(initialFormData);

	const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
	const [isSchoolloading, setIsSchoolLoading] = useState<boolean>(false);
	const [schoolSearchQuery, setSchoolSearchQuery] = useState<string>('');
	const [schoolSearchError, setSchoolSearchError] = useState<string>('');
	const [isSchoolDropdownVisible, setIsSchoolDropdownVisible] = useState<boolean>(false);
	const [schoolSearchResults, setSchoolSearchResults] = useState<SearchBySchoolResponseType[]>(
		[]
	);

	const [isConfirmModalOpen, setIsConfirmModalOpen] = useState<boolean>(false);
	const [isSuccessModalOpen, setIsSuccessModalOpen] = useState<boolean>(false);

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
	) => {
		const { id, value } = e.target;
		setFormData({ ...formData, [id]: value });
		setErrors({ ...errors, [id]: '' });
	};

	const handleSearch = async () => {
		if (!schoolSearchQuery) return;
		setIsSchoolLoading(true);
		setSchoolSearchError('');

		try {
			const data: SearchBySchoolResponseType[] = await searchSchoolAPI(schoolSearchQuery);
			setSchoolSearchResults(data);
			setIsSchoolDropdownVisible(true);
		} catch (error) {
			setSchoolSearchError('Error fetching school data' + error);
		} finally {
			setIsSchoolLoading(false);
		}
	};

	const handleSelectSchool = (selectedSchool: SearchBySchoolResponseType) => {
		setFormData({
			...formData,
			schoolID: selectedSchool.id,
		});
		setSchoolSearchQuery(selectedSchool.schoolname);
		setIsSchoolDropdownVisible(false);
		setErrors({ ...errors, schoolID: '' });
	};

	const validateForm = () => {
		const newError: ErrorType = {};

		if (formData.schoolID === -1 && schoolSearchQuery) {
			handleSearch();
		}
		if (!emailValidator(formData.email)) newError.email = 'อีเมลไม่ถูกต้อง';
		if (!validatePhone(formData.telephone)) newError.telephone = 'เบอร์โทรศัพท์ไม่ถูกต้อง';
		if (formData.citizenID.length !== 13) newError.citizenID = 'เลขบัตรประชาชนไม่ถูกต้อง';
		if (!formData.title) newError.title = 'กรุณาเลือกคำนำหน้า';
		if (!formData.firstName) newError.firstName = 'กรุณากรอกชื่อจริง';
		if (!formData.lastName) newError.lastName = 'กรุณากรอกนามสกุล';
		if (!formData.email) newError.email = 'กรุณากรอกอีเมล';
		if (!formData.telephone) newError.telephone = 'กรุณากรอกเบอร์โทรศัพท์';
		if (!formData.citizenID) newError.citizenID = 'กรุณากรอกเลขบัตรประชาชน';
		if (!formData.currentClass) newError.currentClass = 'กรุณากรอกระดับชั้นที่กำลังศึกษาอยู่';
		if (!formData.studyPlan) newError.studyPlan = 'กรุณากรอกแผนการเรียน';
		if (formData.schoolID === -1) newError.schoolID = 'กรุณาเลือกโรงเรียน';
		return newError;
	};

	const validatePhone = (p: string) => {
		const phoneRegex = /^[0-9]{10}$/;
		return phoneRegex.test(p);
	};

	const handleSubmit = async () => {
		const errors = validateForm();
		if (Object.keys(errors).length > 0) {
			setErrors(errors);
			return;
		}
		setIsConfirmModalOpen(true);
	};

	const handleSendForm = async () => {
		if (isSubmitting) return;
		setIsSubmitting(true);
		const payload: WorkshopPayloadType = {
			...formData,
			eventIDList: workshops.map((w) => w.id),
		};

		const res = await sendWorkshopFormAPI(payload);
		if (res.status) {
			setIsSuccessModalOpen(true);
		} else {
			alert('ลงทะเบียนไม่สำเร็จ\n' + res.msg);
		}
		setIsSubmitting(false);
	};

	return (
		<Modal isOpen={isVisible} setIsOpen={onClose}>
			<div
				className='bg-white w-11/12 lg:max-w-[1000px] h-5/6 lg:5/6 relative rounded-md shadow-lg p-6 lg:p-14 overflow-y-scroll'
				onClick={(e) => e.stopPropagation()}
			>
				{' '}
				{/* Changed h-[770px] to h-auto */}
				{/* Popup Content */}
				<h2 className='text-xl lg:text-[30px] font-bold text-[#1C3FB7] text-center mb-4'>
					ยืนยันการลงทะเบียนกิจกรรม
				</h2>
				<p className='font-inter text-base lg:text-[20px] font-semibold leading-[30px] text-left text-[#1C3FB7] border-b border-[#DFE4EA] pb-3 mt-[15px]'>
					กิจกรรมที่ลงทะเบียน
				</p>
				<div className='rounded-md p-2 lg:p-6 my-4 w-full grid grid-cols-2 gap-5'>
					{workshops.map((w, i) => (
						<ConfirmationWorkshopCard key={i} w={w} full={false} />
					))}
				</div>
				<p className='font-inter text-base lg:text-[20px] font-semibold leading-[30px] text-left text-[#1C3FB7] border-b border-[#DFE4EA] pb-3 mt-[15px]'>
					ข้อมูลผู้ลงทะเบียน
				</p>
				<div className='mt-3 grid grid-cols-4 lg:grid-cols-12 gap-y-5 lg:gap-5 w-full'>
					<div className='md:w-[120px] w-full col-span-2 relative flex flex-col'>
						<label className='block text-left font-inter text-[16px] font-medium text-[#637381] mb-1 w-full'>
							คำนำหน้า
						</label>
						<select
							className='w-full h-[46px] border border-[#DFE4EA] rounded-md p-2'
							id='title'
							name='title'
							value={formData.title}
							onChange={handleChange}
						>
							<option value='' />
							<option value='นาย'>นาย</option>
							<option value='นางสาว'>นางสาว</option>
							<option value='นาง'>นาง</option>
						</select>
						{errors.title && (
							<span className='absolute -bottom-5 text-red-500 text-sm'>
								{errors.title}
							</span>
						)}
					</div>
					<div className='col-span-5 relative flex flex-col'>
						<label className='block text-left font-inter text-[16px] font-medium text-[#637381] mb-1'>
							ชื่อจริง
						</label>
						<input
							type='text'
							className='w-full h-[46px] border border-[#DFE4EA] rounded-md p-2'
							placeholder='ชื่อจริง'
							id='firstName'
							name='firstName'
							value={formData.firstName}
							onChange={handleChange}
						/>
						{errors.firstName && (
							<span className='absolute -bottom-5 text-red-500 text-sm'>
								{errors.firstName}
							</span>
						)}
					</div>
					<div className='col-span-5 flex flex-col relative'>
						<label className='block text-left font-inter text-[16px] font-medium text-[#637381] mb-1'>
							นามสกุล
						</label>
						<input
							type='text'
							className='w-full h-[46px] border border-[#DFE4EA] rounded-md p-2'
							placeholder='นามสกุล'
							id='lastName'
							value={formData.lastName}
							onChange={handleChange}
						/>
						{errors.lastName && (
							<span className='absolute -bottom-5 text-red-500 text-sm'>
								{errors.lastName}
							</span>
						)}
					</div>
					<div className='col-span-4 flex flex-col relative'>
						<label className='block text-left font-inter text-[16px] font-medium text-[#637381] mb-1'>
							เลขบัตรประชาชน
						</label>
						<input
							type='text'
							className='w-full h-[46px] border border-[#DFE4EA] rounded-md p-2'
							placeholder='เลขบัตรประชาชน'
							value={formData.citizenID}
							id='citizenID'
							onChange={handleChange}
						/>
						{errors.citizenID && (
							<span className='absolute -bottom-5 text-red-500 text-sm'>
								{errors.citizenID}
							</span>
						)}
					</div>
					<div className='col-span-4 flex flex-col relative'>
						<label className='block text-left font-inter text-[16px] font-medium text-[#637381] mb-1'>
							Email
						</label>
						<input
							type='text'
							className='w-full h-[46px] border border-[#DFE4EA] rounded-md p-2'
							placeholder='อีเมล'
							value={formData.email}
							id='email'
							onChange={handleChange}
						/>
						{errors.email && (
							<span className='absolute -bottom-5 text-red-500 text-sm'>
								{errors.email}
							</span>
						)}
					</div>
					<div className='col-span-4 flex flex-col relative'>
						<label className='block text-left font-inter text-[16px] font-medium text-[#637381] mb-1'>
							เบอร์โทรศัพท์
						</label>
						<input
							type='text'
							className='w-full h-[46px] border border-[#DFE4EA] rounded-md p-2'
							placeholder='เบอร์โทรศัพท์'
							value={formData.telephone}
							id='telephone'
							onChange={handleChange}
						/>
						{errors.telephone && (
							<span className='absolute -bottom-5 text-red-500 text-sm'>
								{errors.telephone}
							</span>
						)}
					</div>
					<div className='col-span-4 flex flex-col relative'>
						<label className='block text-left font-inter text-[16px] font-medium text-[#637381] mb-1'>
							อาชีพ
						</label>
						<select
							className='w-full h-[46px] border border-[#DFE4EA] rounded-md p-2'
							value={formData.currentClass}
							id='currentClass'
							onChange={handleChange}
						>
							<option value=''></option>
							<option value='อาจารย์'>อาจารย์</option>
							<option value='มัธยมศึกษาปีที่ 6'>มัธยมศึกษาปีที่ 6</option>
							<option value='มัธยมศึกษาปีที่ 5'>มัธยมศึกษาปีที่ 5</option>
							<option value='มัธยมศึกษาปีที่ 4'>มัธยมศึกษาปีที่ 4</option>
							<option value='ปวช 3'>ปวช 3</option>
							<option value='ปวช 2'>ปวช 2</option>
							<option value='ปวช 1'>ปวช 1</option>
							<option value='อื่นๆ'>อื่นๆ</option>
						</select>
						{errors.currentClass && (
							<span className='absolute -bottom-5 text-red-500 text-sm'>
								{errors.currentClass}
							</span>
						)}
					</div>
					<div className='col-span-4 flex flex-col relative'>
						<label className='block text-left font-inter text-[16px] font-medium text-[#637381] mb-1'>
							แผนการเรียน / กลุ่มสาระ
						</label>
						<input
							type='text'
							className='w-full h-[46px] border border-[#DFE4EA] rounded-md p-2'
							placeholder='แผนการเรียน / กลุ่มสาระ'
							value={formData.studyPlan}
							id='studyPlan'
							onChange={handleChange}
						/>
						{errors.studyPlan && (
							<span className='absolute -bottom-5 text-red-500 text-sm'>
								{errors.studyPlan}
							</span>
						)}
					</div>
					<div className='col-span-4'>
						<label htmlFor='schoolSearch' className='text-[#637381] mb-1 block'>
							ค้นหาโรงเรียน
						</label>
						<div className='flex'>
							<div className='relative w-full'>
								<input
									type='text'
									id='schoolSearch'
									placeholder='พิมพ์ชื่อโรงเรียน'
									className='w-full h-[46px] border border-[#DFE4EA] rounded-md p-2'
									value={schoolSearchQuery}
									onChange={(e) => {
										setSchoolSearchQuery(e.target.value);
									}}
									onKeyDown={(e) => {
										if (e.key === 'Enter') {
											handleSearch();
										}
									}}
								/>
								{isSchoolDropdownVisible && schoolSearchResults.length > 0 && (
									<ul className='absolute z-10 mt-2 w-full bg-white border border-gray-300 rounded-md max-h-60 overflow-y-auto'>
										{schoolSearchResults.map((school) => (
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
						{errors.schoolID && (
							<span className='text-red-500 text-sm absolute'>{errors.schoolID}</span>
						)}
						{isSchoolloading && <p className='absolute'>isSchoolLoading...</p>}
						{schoolSearchError && (
							<p className='text-red-500 absolute'>{schoolSearchError}</p>
						)}
					</div>
				</div>
				<div className='flex justify-between gap-10 items-center mt-4'>
					{/* Back Button */}
					<button
						className='bg-[#9CA3AF] text-white text-sm lg:text-base font-semibold lg:py-2 lg:px-4 rounded-md flex justify-center items-center w-full md:w-[146px] h-[50px]'
						onClick={onClose} // Close popup on click
					>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 24 24'
							strokeWidth={1.5}
							stroke='currentColor'
							className='w-6 h-6 mr-2'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='M15.75 19.5 8.25 12l7.5-7.5'
							/>
						</svg>
						ย้อนกลับ
					</button>

					{/* Submit Button */}
					<button
						className='bg-[#1C3FB7] text-white text-sm lg:text-base font-semibold lg:py-2 lg:px-4 rounded-md w-full md:w-[177px] h-[50px]'
						onClick={handleSubmit}
					>
						ยืนยันการลงทะเบียน
					</button>
				</div>
			</div>
			<ConfirmModal
				isOpen={isConfirmModalOpen}
				onClose={setIsConfirmModalOpen}
				onSubmit={handleSendForm}
				isSubmitting={isSubmitting}
			/>
			<SuccessModal isOpen={isSuccessModalOpen} onClose={setIsSuccessModalOpen} />
		</Modal>
	);
};

const ConfirmModal: FC<{
	isOpen: boolean;
	onClose: Dispatch<SetStateAction<boolean>>;
	onSubmit: () => void;
	isSubmitting: boolean;
}> = ({ isOpen, onClose, onSubmit, isSubmitting }) => {
	return (
		<Modal isOpen={isOpen} setIsOpen={onClose}>
			<div
				className='ConfirmModal w-11/12 lg:w-1/2 h-fit bg-white p-8 rounded-2xl'
				onClick={(e) => e.stopPropagation()}
			>
				<p className='text-[#1C3FB7] font-bold text-xl text-center'>
					ยืนยันการลงทะเบียนหรือไม่
				</p>
				<div className='text-[#637381] text-sm text-center my-8 px-7'>
					<span className='font-semibold'>
						หากใส่อีเมลไม่ถูกต้อง ระบบจะไม่สามารถส่งอีเมลยืนยันการลงทะเบียนให้ท่านได้
					</span>
					<br />
					<span>
						<p>
							ระบบจะส่งอีเมลยืนยันการลงทะเบียนให้ท่านผ่านทางอีเมล
							โปรดยืนยันการลงทะเบียนภายใน 30 นาทีนับจากที่กดยืนยัน
						</p>
						<p className='text-red-500 font-semibold'>
							หากท่านเคยลงทะเบียนไปแล้ว ระบบจะยกเลิกการลงทะเบียนครั้งก่อนของท่าน
							และจะแทนที่ด้วยข้อมูลการจองครั้งใหม่ทั้งหมด
						</p>
					</span>
				</div>
				<div className='grid grid-cols-4 gap-3'>
					<button
						className='bg-[#9CA3AF] col-start-3 text-white text-sm lg:text-base font-semibold lg:py-2 lg:px-4 rounded-md w-full h-[50px]'
						onClick={() => onClose(false)}
					>
						ยกเลิก
					</button>
					<button
						className={`col-start-4 text-white text-sm lg:text-base font-semibold lg:py-2 lg:px-4 rounded-md w-fullh-[50px] ${
							isSubmitting
								? 'cursor-not-allowed bg-[#9CA3AF]'
								: 'cursor-pointer bg-[#1C3FB7]'
						}`}
						onClick={onSubmit}
						disabled={isSubmitting}
					>
						{isSubmitting ? 'กำลังยืนยัน' : 'ยืนยัน'}
					</button>
				</div>
			</div>
		</Modal>
	);
};

const ConfirmationWorkshopCard: FC<{ w: WorkshopData; full: boolean }> = ({ w, full }) => {
	return (
		<div
			className={
				full
					? 'grid grid-cols-8 gap-5 col-span-2'
					: 'grid grid-cols-8 gap-5 lg:col-span-1 col-span-2'
			}
		>
			{w.imagepath ? (
				<Image
					src={w.imagepath}
					alt={w.name}
					className='col-span-3 object-cover rounded-2xl bg-gradient h-full'
					width={400}
					height={400}
				/>
			) : (
				<div className='col-span-3 object-cover rounded-2xl bg-gradient'></div>
			)}
			<div className='text_container col-span-5 font-semibold'>
				<h1 className='text-ellipsis line-clamp-1'>{w.name}</h1>
				<p className='font-light text-ellipsis line-clamp-2 text-[#637381] text-sm'>
					{w.shortdescription}
				</p>
				<div className='flex gap-2 items-center'>
					<Image src={timeIcon} alt={'timeIcon'} width={25} height={25} />{' '}
					<p className='text-sm text-[#637381]'>
						{parseWorkshopTime(w.startAt).time} - {parseWorkshopTime(w.endAt).time}
					</p>
				</div>
			</div>
		</div>
	);
};

const SuccessModal: FC<{
	isOpen: boolean;
	onClose: Dispatch<SetStateAction<boolean>>;
}> = ({ isOpen, onClose }) => {
	return (
		<Modal isOpen={isOpen} setIsOpen={onClose}>
			<div
				className='ConfirmModal w-11/12 lg:w-1/2 h-fit bg-white p-8 rounded-2xl'
				onClick={(e) => e.stopPropagation()}
			>
				<p className='text-[#1C3FB7] font-bold text-xl text-center'>
					ยืนยันการลงทะเบียนของท่านผ่านทางอีเมล
				</p>
				<div className='flex justify-center'>
					<Image src={MailImage} alt='MailImage' className='w-24' />
				</div>
				<p className='text-[#637381] text-sm mt-6 text-center'>
					ระบบได้ส่งอีเมลยืนยันการลงทะเบียนของท่านผ่านทางอีเมลแล้ว
					กรุณายืนยันการลงทะเบียนภายใน 30 นาทีนี้
				</p>
				<div className='grid grid-cols-3 gap-3 mt-6'>
					<button
						className='bg-[#1C3FB7] col-start-2 text-white text-sm lg:text-base font-semibold py-1 lg:py-2 lg:px-4 rounded-md w-fullh-[50px]'
						onClick={() => {
							onClose(false);
							window.location.reload();
						}}
					>
						เสร็จสิ้น
					</button>
				</div>
			</div>
		</Modal>
	);
};

export { ConfirmationPopup }; // Ensure the name matches the component definition
