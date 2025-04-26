import { Dispatch, FC, SetStateAction, useState } from 'react';
import Image from 'next/image';
import { WorkshopDetail } from '@/components/events/workshopDetailModal';
import { WorkshopData } from '@/model/workshop/workshopsResponse';
import { parseWorkshopTime, parseWorkshopTimeToDateObject } from '@/utils/parseTime';

type WorkshopCardProps = {
	workshop: WorkshopData;
	handleSelect: Dispatch<SetStateAction<WorkshopData[]>>;
	selectedWorkshop: WorkshopData[];
};

const WorkshopCard: FC<WorkshopCardProps> = ({ workshop, handleSelect, selectedWorkshop }) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isNotSelectable, setIsNotSelectable] = useState(false);
	const isSeatFull = workshop.reservationCount >= workshop.seats;
	const workshopDate = parseWorkshopTimeToDateObject(workshop.startAt);
	const queueOpeningTime = new Date(
		workshopDate.getFullYear(),
		workshopDate.getMonth(),
		workshopDate.getDate(),
		8,
		0
	);

	const isOpenQueue = new Date() >= queueOpeningTime;

	const handleShowNotSelectable = () => {
		setIsNotSelectable(true);
		setTimeout(() => {
			setIsNotSelectable(false);
		}, 3000);
	};
	const handleAdd = () => {
		handleSelect((prev) => {
			if (prev.find((w) => w.id === workshop.id)) {
				return prev;
			}
			if (isSeatFull && !isOpenQueue) {
				return prev;
			}

			if (isSeatFull) {
				if (prev.length !== 0) return prev;
				return [workshop];
			}

			if (prev.length === 1 && prev[0].remainingSeats <= 0) {
				return prev;
			}

			const haveTimeConflict = prev.some((selected) => {
				const selectedStart = parseWorkshopTimeToDateObject(selected.startAt);
				const selectedEnd = parseWorkshopTimeToDateObject(selected.endAt);
				const newStart = parseWorkshopTimeToDateObject(workshop.startAt);
				const newEnd = parseWorkshopTimeToDateObject(workshop.endAt);
				const isExeption = workshop.id === 31 || selected.id === 31;
				if (isExeption) return false;
				return (
					(newStart < selectedEnd && newStart >= selectedStart) ||
					(newEnd > selectedStart && newEnd < selectedEnd) ||
					(newStart < selectedStart && newEnd > selectedEnd)
				);
			});
			if (haveTimeConflict) {
				handleShowNotSelectable();
				return prev;
			}
			return [...prev, workshop];
		});
	};

	const handleOpenModal = () => {
		setIsModalOpen(true);
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
	};

	return (
		<div className='group cursor-pointer rounded-xl duration-200 hover:bg-gray-300 relative'>
			{selectedWorkshop.find((w) => w === workshop) && (
				<div className='absolute h-full w-full flex items-center justify-center text-center bg-blue-500 opacity-50 rounded-xl top-0 left-0  cursor-default'></div>
			)}
			<div className='flex flex-col h-full justify-between p-1.5' onClick={handleOpenModal}>
				<div className='workshopCardInfo flex flex-col'>
					{workshop.imagepath ? (
						<div className='w-full'>
							<Image
								src={workshop.imagepath}
								alt={workshop.name}
								width={160}
								height={160}
								priority
								className='w-full object-cover rounded-lg aspect-[3/4]'
							/>
						</div>
					) : (
						<div className='ImagePlaceholder w-[200px] lg:w-[300px] h-[100px] lg:h-[150px] bg-gradient rounded-2xl' />
					)}
					<div className=' w-full pt-2 mb-2'>
						<div className=''>
							<p className='md:text-lg font-semibold line-clamp-2'>{workshop.name}</p>
							<p className='font-light text-[#637381] text-xs lg:text-sm col-span-4 lg:col-span-3'>
								{workshop.shortdescription}
							</p>
							<div className='leading-5 mt-2 space-y-1'>
								<p className='text-sm flex gap-1 text-blue_dark'>
									<span className='mt-0.5'>
										<svg
											xmlns='http://www.w3.org/2000/svg'
											width='1em'
											height='1em'
											viewBox='0 0 24 24'
										>
											<path
												fill='currentColor'
												d='M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7m0 9.5a2.5 2.5 0 0 1 0-5a2.5 2.5 0 0 1 0 5'
											></path>
										</svg>
									</span>
									{workshop.vanue}
								</p>
								<p className='text-sm flex gap-1 text-blue_dark'>
									<span className='mt-0.5'>
										<svg
											xmlns='http://www.w3.org/2000/svg'
											width='1em'
											height='1em'
											viewBox='0 0 24 24'
										>
											<path
												fill='currentColor'
												d='M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2M12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8s8 3.58 8 8s-3.58 8-8 8m.5-13H11v6l5.25 3.15l.75-1.23l-4.5-2.67z'
											></path>
										</svg>
									</span>
									{parseWorkshopTime(workshop.startAt).time} -{' '}
									{parseWorkshopTime(workshop.endAt).time} น.
								</p>
							</div>
						</div>
					</div>
				</div>
				<div className='gap-1 flex'>
					<button className='bg-gray-300 text-gray-500  w-full py-2 rounded-lg duration-200 group-hover:bg-gray-200'>
						ดูรายละเอียด
					</button>
					<button
						className={`${
							!isSeatFull
								? 'bg-blue_dark text-white hover:bg-blue-600'
								: isOpenQueue
								? 'bg-yellow-500 hover:bg-yellow-300 text-white'
								: 'bg-gray-400 text-gray-600 '
						} bg-blue_dark w-full py-2 rounded-lg duration-200 `}
						onClick={(e) => {
							e.stopPropagation();
							handleAdd();
						}}
						disabled={isSeatFull && !isOpenQueue}
					>
						<p>{!isSeatFull ? '+ เพิ่ม' : isOpenQueue ? 'จองคิว' : 'เต็ม'}</p>
					</button>
				</div>
				<WorkshopDetail
					workshop={workshop}
					isOpen={isModalOpen}
					onClose={handleCloseModal}
					handleAdd={handleAdd}
					isSeatFull={isSeatFull}
					isOpenQueue={isOpenQueue}
				/>
				<NotSelectableNotice isOpen={isNotSelectable} />
			</div>
		</div>
	);
};

const WorkshopCardPlaceholder: FC<{ status: 'Loading' | 'Coming Soon' }> = ({ status }) => {
	return (
		<div className='workshopCard font-bold text-xl mr-7 cursor-auto w-full h-[500px] flex text-center items-center justify-center text-[#636363] border-[#636363] border-[0.1px] rounded-2xl'>
			<p>{status} ...</p>
		</div>
	);
};

const NotSelectableNotice: FC<{ isOpen: boolean }> = ({ isOpen }) => {
	if (!isOpen) {
		return null;
	}
	return (
		<div className='fixed z-50 bottom-0 left-0 px-8 py-3 text-white text-xl font-semibold bg-[#1C3FB7] rounded-tr-2xl'>
			! กรุณาเลือกกิจกรรมที่ช่วงเวลาไม่ซ้อนทับกัน
		</div>
	);
};

export { WorkshopCard, WorkshopCardPlaceholder };
