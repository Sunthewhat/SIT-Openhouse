import React from 'react';
import Image from 'next/image';
import { Modal } from '../modal';
import { WorkshopData } from '@/model/workshop/workshopsResponse';
import { parseWorkshopTime } from '@/utils/parseTime';
import addIcon from '@/assets/svg/addIcon.svg';
import pinIcon from '@/assets/svg/pin_icon.svg';
import timeIcon from '@/assets/svg/time_icon.svg';
import peopleIcon from '@/assets/svg/people_icon.svg';

interface WorkshopDetailProps {
	workshop: WorkshopData;
	isOpen: boolean;
	onClose: () => void;
	handleAdd: () => void;
}

const WorkshopDetail: React.FC<WorkshopDetailProps> = ({
	workshop,
	isOpen,
	onClose,
	handleAdd,
}) => {
	if (!isOpen) return null;
	return (
		<Modal isOpen={isOpen} setIsOpen={onClose}>
			<div
				className='modalcontainer mx-2 max-w-screen-md h-[80vh] overflow-y-auto bg-white border-2 border-white rounded-2xl z-20'
				onClick={(e) => e.stopPropagation()}
			>
				<div className='p-2 relative md:p-4'>
					<button
						onClick={onClose}
						className='absolute top-5 lg:top-8 right-6 lg:right-12 text-gray-500 hover:text-gray-800'
					>
						✕
					</button>

					<div className='flex flex-col'>
						{/* Workshop Image */}
						{workshop.imagepath ? (
							<Image
								src={workshop.imagepath}
								alt='Alumni Talk & Showcase'
								className='w-full aspect-[3/4] rounded-xl object-cover '
								width={500}
								height={500}
							/>
						) : (
							<div className='bg-gradient w-full lg:w-1/2 rounded-lg h-[200px]' />
						)}
						{/* Workshop Details */}
						<div className='mt-6 flex flex-col'>
							{/* <span className='text-xs lg:text-sm text-blue-600'>workshop</span> */}
							<h2 className='text-xl lg:text-2xl font-semibold text-gray-900'>
								{workshop.name}
							</h2>
							<div className='text-gray-500 text-sm mt-4 space-y-3'>
								<div className='flex items-center space-x-1'>
									<span>
										<Image
											src={timeIcon.src}
											alt='Timeicon'
											className='w-5 h-5 fill-{#637381}'
											width={100}
											height={100}
										/>
									</span>
									<span>
										{parseWorkshopTime(workshop.startAt).time} -{' '}
										{parseWorkshopTime(workshop.endAt).time} u.
									</span>
								</div>
								<div className='flex items-center space-x-1'>
									<span>
										<Image
											src={pinIcon.src}
											alt='Pinicon'
											className='w-5 h-5'
											width={100}
											height={100}
										/>
									</span>
									<span>{workshop.vanue}</span>
								</div>
								<div className='flex items-center space-x-1'>
									<span>
										<Image
											src={peopleIcon.src}
											alt='Peopleicon'
											className='w-5 h-5'
											width={100}
											height={100}
										/>
									</span>
									<span
										style={{
											color:
												workshop.reservationCount >= workshop.seats
													? 'red'
													: '',
										}}
									>
										{workshop.seats} ที่นั่ง (เหลือ {workshop.remainingSeats}{' '}
										ที่นั่ง)
									</span>
								</div>
							</div>
						</div>
					</div>
					<div
						className='mt-6 text-gray-700 '
						dangerouslySetInnerHTML={{ __html: workshop.description }}
					/>
				</div>
				<div className='flex sticky bottom-0 gap-2 justify-between bg-white p-2 border-t shadow-sm md:p-4'>
					<button
						className='bg-gray-200 text-gray-500 w-full px-6 py-3 rounded-lg duration-200 hover:bg-gray-300'
						onClick={onClose}
					>
						กลับ
					</button>
					{workshop.reservationCount >= workshop.seats ? (
						<button className='bg-gray-300 w-full text-white text-sm font-medium px-6 py-2 rounded-lg focus:outline-none'>
							เต็ม
						</button>
					) : (
						<button
							className='flex bg-blue_dark w-full text-white font-medium px-6 py-3 rounded-lg focus:outline-none justify-center items-center gap-1 duration-200 hover:bg-blue-600'
							onClick={() => {
								handleAdd();
								onClose();
							}}
						>
							<Image src={addIcon} alt='add icon' width={11} height={11} />
							เพิ่ม
						</button>
					)}
				</div>
			</div>
		</Modal>
	);
};

export { WorkshopDetail };
