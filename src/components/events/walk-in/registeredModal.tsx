import { registeredWalkInAPI } from '@/api/events/walk-in';
import { Modal } from '@/components/modal';
import { FC, useState } from 'react';

type RegisteredModalProps = {
	isVisible: boolean;
	onClose: () => void;
};

const RegisteredModal: FC<RegisteredModalProps> = ({ isVisible, onClose }) => {
	const [id, setId] = useState('');
	const [tel, setTel] = useState('');
	const [idError, setIdError] = useState<string | null>(null);
	const [telError, setTelError] = useState<string | null>(null);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const validatePhone = (p: string) => {
		const phoneRegex = /^[0-9]{10}$/;
		return phoneRegex.test(p);
	};

	const validateId = (i: string) => {
		const idRegex = /^[0-9]{13}$/;
		return idRegex.test(i);
	};

	const handleSubmit = async () => {
		if (isSubmitting) return;
		setIsSubmitting(true);
		if (!validateId(id)) setIdError('เลขบัตรประชาชนไม่ถูกต้อง');
		if (id.length === 0) setIdError('กรุณากรอกเลขบัตรประชาชน');
		if (!validatePhone(tel)) setTelError('เบอร์โทรศัพท์ไม่ถูกต้อง');
		if (tel.length === 0) setTelError('กรุณากรอกเบอร์โทรศัพท์');

		if (!validateId(id) || !validatePhone(tel)) return setIsSubmitting(false);

        const resp = await registeredWalkInAPI(id, tel);
		if (resp.success) {
			onClose();
		} else {
			alert(resp.msg);
		}
		setIsSubmitting(false);
	};

	return (
		<Modal isOpen={isVisible} setIsOpen={onClose}>
			<div
				className='bg-white w-11/12 lg:max-w-[1000px] h-fit lg:5/6 relative rounded-md shadow-lg p-6 lg:p-14 overflow-y-scroll'
				onClick={(e) => e.stopPropagation()}
			>
				<h2 className='text-xl lg:text-[30px] font-bold text-[#1C3FB7] text-center mb-4'>
					ลงทะเบียนเข้าชมกิจกรรม
				</h2>
				<p className='font-inter text-base lg:text-[20px] font-semibold leading-[30px] text-left text-[#1C3FB7] border-b border-[#DFE4EA] pb-3 mt-[15px]'>
					ข้อมูลผู้เข้าชม
				</p>
				<div className='mt-3 mb-10 grid grid-cols-4 lg:grid-cols-12 gap-y-5 lg:gap-5 w-full'>
					<div className='col-span-6 flex flex-col relative'>
						<label className='block text-left font-inter text-[16px] font-medium text-[#637381] mb-1'>
							เลขบัตรประชาชน
						</label>
						<input
							type='text'
							className='w-full h-[46px] border border-[#DFE4EA] rounded-md p-2'
							placeholder='เลขบัตรประชาชน'
							value={id}
							id='citizenID'
							onChange={(e) => {
								setId(e.target.value);
								setIdError(null);
							}}
						/>
						{idError && (
							<span className='absolute -bottom-5 text-red-500 text-sm'>
								{idError}
							</span>
						)}
					</div>
					<div className='col-span-6 flex flex-col relative'>
						<label className='block text-left font-inter text-[16px] font-medium text-[#637381] mb-1'>
							เบอร์โทรศัพท์
						</label>
						<input
							type='tel'
							className='w-full h-[46px] border border-[#DFE4EA] rounded-md p-2'
							placeholder='เบอร์โทรศัพท์'
							value={tel}
							id='telephone'
							onChange={(e) => {
								setTel(e.target.value);
								setTelError(null);
							}}
						/>
						{telError && (
							<span className='absolute -bottom-5 text-red-500 text-sm'>
								{telError}
							</span>
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
						className={`text-white text-sm lg:text-base font-semibold lg:py-2 lg:px-4 rounded-md w-full md:w-[177px] h-[50px] ${
							isSubmitting ? 'bg-gray-500' : `bg-[#1C3FB7]`
						}`}
						onClick={handleSubmit}
					>
						ยืนยันการลงทะเบียน
					</button>
				</div>
			</div>
		</Modal>
	);
};

export { RegisteredModal };
