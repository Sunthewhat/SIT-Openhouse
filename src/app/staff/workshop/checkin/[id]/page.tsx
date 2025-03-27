'use client';

import { getWorkshopAPI } from '@/api/workshop/getWorkshop';
import { WorkshopData } from '@/model/workshop/workshopsResponse';
import Logo from '@/assets/images/mainLogo_yellow.png';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { FC, useEffect, useState } from 'react';
import { QrReader, OnResultFunction } from 'react-qr-reader';
import { WorkshopCheckinAPI } from '@/api/staff/checkinAPI';

const WorkshopCheckInPage: FC = () => {
	const workshopId = parseInt(useParams<{ id: string }>().id);
	const [workshop, setWorkshop] = useState<WorkshopData>();
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [isOpenCamera, setIsOpenCamera] = useState<boolean>(false);
	const [studentList, setStudentList] = useState<string[]>([]);
	const [data, setData] = useState<string[]>([]);

	const handleCheckin = async (UUID: string) => {
		const res = await WorkshopCheckinAPI(workshopId, UUID);
		if (!res.success) {
			alert(res.str);
			setData((p) => p.filter((d) => d !== UUID));
			return;
		}
		setStudentList((p) => [...p, res.str]);
	};

	const QrCodeReader: FC = () => {
		const onReadResult: OnResultFunction = (result, e) => {
			if (e) {
				console.log(e);
				return;
			}
			if (!result) return;
			const resultText = result.getText();

			if (data.find((d) => d === resultText) !== undefined) return;
			setData((p) => [resultText, ...p]);
			handleCheckin(resultText);
		};

		return (
			<QrReader
				onResult={onReadResult}
				constraints={{ facingMode: 'environment' }}
				videoContainerStyle={{ width: '500px', height: '375px' }}
				videoStyle={{ width: '500px', height: '375px' }}
				containerStyle={{ width: '500px', height: '375px' }}
			/>
		);
	};

	const fetchWorkshop = async () => {
		const data = await getWorkshopAPI();
		let workshop = data.morningEvents.find((w) => w.id === workshopId);
		if (!workshop) workshop = data.noonEvents.find((w) => w.id === workshopId);
		if (!workshop) workshop = data.afterNoonEvents.find((w) => w.id === workshopId);
		setWorkshop(workshop);
		setIsLoading(false);
	};

	useEffect(() => {
		fetchWorkshop();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className='flex flex-col w-full items-center'>
			{!isLoading && workshop ? (
				<div className='p-2 flex flex-col items-center w-full max-w-screen-sm'>
					<div className='w-full flex flex-col gap-2'>
						<div className='Banner bg-gradient p-6 py-10 rounded-2xl flex justify-between items-center md:p-10'>
							<Image
								src={Logo}
								alt='logo'
								className='LOGO object-contain h-10 w-fit md:h-14'
								priority
							/>
							<div>
								<p className='text-white text-end font-semibold md:leading-8 md:text-lg'>
									Walk-In Register
									<br />
									<span className='text-xl text-secondary font-bold md:text-3xl'>
										Scan QR
									</span>
								</p>
							</div>
						</div>
						<div className='w-full'>
							<div className='flex justify-center rounded-2xl'>
								<Image
									src={workshop.imagepath!}
									alt={workshop.name}
									width={300}
									height={300}
									className='rounded-xl w-full aspect-video'
									priority
								/>
							</div>
						</div>
						<div className='w-full bg-gray-300 overflow-clip flex flex-col items-center rounded-xl'>
							{isOpenCamera ? (
								<QrCodeReader />
							) : (
								<div className='w-full h-96 flex items-center justify-center text-gray-400'>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										width='4em'
										height='4em'
										viewBox='0 0 24 24'
									>
										<circle
											cx='12'
											cy='12'
											r='3.2'
											fill='currentColor'
										></circle>
										<path
											fill='currentColor'
											d='M9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5s5 2.24 5 5s-2.24 5-5 5'
										></path>
									</svg>
								</div>
							)}
						</div>
						<div className='flex justify-center'>
							<button
								className={`${
									isOpenCamera ? 'bg-gray-400' : 'bg-gradient'
								} w-full text-white font-semibold text-2xl text-center rounded-xl p-6`}
								onClick={() => {
									setIsOpenCamera((p) => !p);
								}}
							>
								<p>{isOpenCamera ? 'Stop' : 'Scan QR Code to check-in'}</p>
							</button>
						</div>
						<div className='flex flex-col items-center'>
							<p className='font-semibold text-xl pt-6 pb-6'>Registered Students</p>
							<div className='w-full grid lg:grid-cols-4 grid-cols-2 gap-2'>
								{studentList.length > 0 ? (
									studentList.map((std, index) => {
										return (
											<div
												key={index}
												className='px-6 py-2 rounded-lg bg-[#9CA3AF] col-span-1 hover:col-span-2 text-center line-clamp-1 transition-transform'
											>
												<p>{std}</p>
											</div>
										);
									})
								) : (
									<p className='text-center col-span-4'>...</p>
								)}
							</div>
						</div>
					</div>
				</div>
			) : !workshop && !isLoading ? (
				<div>
					<p>Workshop not found</p>
				</div>
			) : (
				<div>Loading...</div>
			)}
		</div>
	);
};

export default WorkshopCheckInPage;
