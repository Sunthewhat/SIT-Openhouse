'use client';

import { FC, useState } from 'react';
import { QrReader, OnResultFunction } from 'react-qr-reader';
import { ICTCheckinAPI } from '@/api/staff/checkinAPI';
import Logo from '@/assets/svg/SIT_logo.svg';
import Image from 'next/image';
import { ICTCheckinResponseType } from '@/model/staff/ictResponse';

const WorkshopCheckInPage: FC = () => {
	const [isOpenCamera, setIsOpenCamera] = useState<boolean>(false);
	const [studentList, setStudentList] = useState<ICTCheckinResponseType[]>([]);
	const [data, setData] = useState<string[]>([]);

	const handleCheckin = async (UUID: string) => {
		const res = await ICTCheckinAPI(UUID);
		if (!res.success) {
			alert(res.error);
			return;
		}
		setStudentList((p) => [...p, res.payload]);
	};

	const QrCodeReader: FC = () => {
		const onReadResult: OnResultFunction = (result, e) => {
			if (!!e) {
				console.log(e);
				return;
			}
			if (!result) return;
			const resultText = result.getText();

			if (data.find((d) => d === resultText) !== undefined) return;
			setData((p) => [...p, resultText]);
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

	return (
		<div className='flex flex-col w-full items-center'>
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
								ICT Challenge
								<br />
								<span className='text-xl text-secondary font-bold md:text-3xl'>
									Check-in
								</span>
							</p>
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
									<circle cx='12' cy='12' r='3.2' fill='currentColor'></circle>
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
						<p className='font-semibold text-xl pt-6 pb-6'>Registered Team</p>
						<div className='grid lg:grid-cols-4 grid-cols-2 w-full'>
							{studentList.length > 0 ? (
								studentList.map((std, index) => {
									return <TeamPreview key={index} data={std} />;
								})
							) : (
								<p className='col-span-4 text-center'>...</p>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

const TeamPreview: FC<{
	data: ICTCheckinResponseType;
}> = ({ data }) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	return (
		<div
			className='px-4 py-2 rounded-2xl bg-[#9CA3AF] col-span-1 cursor-pointer'
			onClick={() => setIsOpen(true)}
		>
			<p className='text-center'>{data.name}</p>
			{isOpen && (
				<div
					className='fixed w-full h-full top-0 left-0 flex items-center bg-[#00000088]'
					onClick={() => setIsOpen(false)}
				>
					<div
						className='lg:p-10 p-6 rounded-2xl bg-white w-11/12 lg:w-7/12 h-5/6 flex flex-col m-auto'
						onClick={(e) => e.stopPropagation()}
					>
						<div className='flex-grow'>
							<div className='bg-blue_dark text-white w-7/12 py-4 rounded-2xl mx-auto'>
								<p className='font-semibold text-xl text-center'>{data.name}</p>
							</div>
							<p className='mt-8'>โรงเรียน : {data.schoolName}</p>
							<p>อาจารย์ที่ปรึกษา : {data.advisorName}</p>
							<p className='mt-5'>สมาชิก : </p>
							<p> 1. {data.competitorName1}</p>
							<p> 2. {data.competitorName2}</p>
							<p> 3. {data.competitorName3}</p>
						</div>
						<div
							className='mx-auto bg-blue_dark text-white font-semibold py-3 px-7 rounded-xl'
							onClick={() => {
								setIsOpen(false);
							}}
						>
							Done
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default WorkshopCheckInPage;
