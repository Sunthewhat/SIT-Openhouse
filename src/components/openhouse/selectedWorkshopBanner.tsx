import { Dispatch, FC, SetStateAction, useState } from 'react';
import Image from 'next/image';
import removeIcon from '@/assets/svg/remove.svg';
import submit from '@/assets/svg/submit.svg';
import { ConfirmationPopup } from '@/components/openhouse/confirmationModal';
import { WorkshopData } from '@/model/workshop/workshopsResponse';
import { addWorkshopAPI } from '@/api/staff/addWorkshopAPI';
import { useRouter } from 'next/navigation';

type SelectedWorkshopBannerProps = {
	selectedWorkshops: WorkshopData[];
	handleRemove: Dispatch<SetStateAction<WorkshopData[]>>;
	isStaff?: boolean;
	confirmed?: number[];
	uuid?: string;
};

const SelectedWorkshopBanner: FC<SelectedWorkshopBannerProps> = ({
	selectedWorkshops,
	handleRemove,
	isStaff,
	confirmed,
	uuid,
}) => {
	const [isPopupVisible, setIsPopupVisible] = useState(false);
	const [isStaffPopupVisible, setIsStaffPopupVisible] = useState(false);

	const navigator = useRouter();

	const removeWorkshop = (id: number) => {
		handleRemove((prev) => {
			return prev.filter((item) => item.id !== id);
		});
	};

	const togglePopup = () => {
		if (isStaff === true) {
			setIsStaffPopupVisible(true);
			return;
		}

		setIsPopupVisible((prev) => !prev);
	};

	const handleStaffAdd = async () => {
		if (!uuid) return;
		const response = await addWorkshopAPI(
			selectedWorkshops.map((w) => w.id),
			uuid
		);
		if (!response) {
			alert('เกิดข้อผิดพลาด');
			return;
		}
		alert('เพิ่มกิจกรรมสำเร็จ');
		setIsStaffPopupVisible(false);
		navigator.push('/staff');
	};

	return (
		<>
			{selectedWorkshops.length > 0 && (
				<div className='w-full sticky bottom-0 flex justify-center pb-10'>
					<div className='bg-blue_dark py-2 rounded-3xl'>
						<div className='justify-center px-4 py-2 grid grid-cols-12 items-center gap-3'>
							{selectedWorkshops.map((w, s) => (
								<>
									<div
										key={s}
										className='grid grid-cols-6 w-full bg-white px-4 py-2 text-sm lg:text-base rounded-md col-span-6 lg:col-span-3'
									>
										<p className='truncate col-span-5'>{w.name}</p>
										{(!isStaff === undefined && isStaff === true) ||
											(!confirmed?.includes(w.id) && (
												<div
													className='flex justify-center'
													onClick={() => removeWorkshop(w.id)}
												>
													<Image
														className='ml-2'
														src={removeIcon}
														width={18}
														height={18}
														alt='close'
													/>
												</div>
											))}
									</div>
								</>
							))}
							<div
								className='flex flex-row bg-[#FCD34D] text-sm lg:text-base items-center justify-center py-2 rounded-md cursor-pointer col-span-4 col-start-9 lg:col-span-2 lg:col-start-11'
								onClick={togglePopup}
							>
								ลงทะเบียน
								<Image
									className='ml-2 self-center'
									src={submit}
									width={6}
									height={6}
									alt='submit'
								/>
							</div>
						</div>
					</div>
				</div>
			)}
			{/* Using Popup Component */}
			{isStaff !== true && (
				<ConfirmationPopup
					isVisible={isPopupVisible}
					onClose={togglePopup}
					workshops={selectedWorkshops}
				/>
			)}
			{isStaff === true && isStaffPopupVisible && (
				<div className='fixed w-full h-full bg-[#00000088] top-0 left-0 flex items-center justify-center'>
					<div className=' bg-white rounded-2xl p-7 w-11/12 lg:w-8/12 h-5/6 flex flex-col text-center'>
						<p className='font-bold text-2xl'>ยืนยันการเพิ่มกิจกรรม</p>
						<div className='flex-grow'>
							<p className='mt-8'>รายการกิจกรรม</p>
							<div className='pt-4'>
								{selectedWorkshops.map((w, s) => (
									<div key={s} className='bg-[#E5E7EB] rounded-2xl p-3 mt-4'>
										<p>{w.name}</p>
									</div>
								))}
							</div>
						</div>
						<div className=' grid grid-cols-2 gap-4 text-center'>
							<div
								className=' bg-[#9CA3AF] text-white font-semibold rounded-2xl py-2 cursor-pointer'
								onClick={() => {
									setIsStaffPopupVisible(false);
								}}
							>
								ยกเลิก
							</div>
							<div
								className=' bg-blue_dark text-white font-semibold rounded-2xl py-2 cursor-pointer'
								onClick={handleStaffAdd}
							>
								ยืนยัน
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export { SelectedWorkshopBanner };
