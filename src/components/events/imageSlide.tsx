'use client';
import { useState, useEffect, useRef, FC } from 'react';
import Image from 'next/image';

type imageType = {
	src: string;
	alt: string;
};

type ImageSlideshowProps = {
	images: imageType[];
	autoplaySpeed?: number;
	transitionDuration?: number;
};

const ImageSlideshow: FC<ImageSlideshowProps> = ({
	images,
	autoplaySpeed = 5000,
	transitionDuration = 500,
}) => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [transitioning, setTransitioning] = useState(false);
	const slideContainerRef = useRef(null);

	// Auto-advance slides
	useEffect(() => {
		const interval = setInterval(() => {
			goToNext();
		}, autoplaySpeed);

		return () => clearInterval(interval);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [images.length, autoplaySpeed]);

	// Navigation functions
	const goToNext = () => {
		if (transitioning) return;

		setTransitioning(true);
		setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);

		setTimeout(() => {
			setTransitioning(false);
		}, transitionDuration);
	};

	const goToPrev = () => {
		if (transitioning) return;

		setTransitioning(true);
		setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);

		setTimeout(() => {
			setTransitioning(false);
		}, transitionDuration);
	};

	const goToSlide = (index: number) => {
		if (transitioning || index === currentIndex) return;

		setTransitioning(true);
		setCurrentIndex(index);

		setTimeout(() => {
			setTransitioning(false);
		}, transitionDuration);
	};

	return (
		<div className='relative aspect-[21/9] overflow-hidden'>
			{/* Sliding container */}
			<div
				ref={slideContainerRef}
				className='flex h-full transition-transform duration-1000 ease-in-out'
				style={{
					transform: `translateX(-${currentIndex * 100}%)`,
					// width: `${images.length * 100}%`,
				}}
			>
				{/* Images */}
				{images.map((image, index) => (
					<div key={index} className='w-full h-full flex-shrink-0'>
						<div className='relative w-full h-full'>
							<Image
								src={image.src}
								alt={image.alt || `Slide ${index + 1}`}
								fill
								className='object-cover w-full h-full'
								priority={index === 0}
							/>
						</div>
					</div>
				))}
			</div>

			{/* Navigation arrows */}
			<button
				onClick={goToPrev}
				className='absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 focus:outline-none'
				aria-label='Previous slide'
				disabled={transitioning}
			>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					width='24'
					height='24'
					viewBox='0 0 24 24'
					fill='none'
					stroke='currentColor'
					strokeWidth='2'
					strokeLinecap='round'
					strokeLinejoin='round'
				>
					<path d='M15 18l-6-6 6-6' />
				</svg>
			</button>

			<button
				onClick={goToNext}
				className='absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 focus:outline-none'
				aria-label='Next slide'
				disabled={transitioning}
			>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					width='24'
					height='24'
					viewBox='0 0 24 24'
					fill='none'
					stroke='currentColor'
					strokeWidth='2'
					strokeLinecap='round'
					strokeLinejoin='round'
				>
					<path d='M9 18l6-6-6-6' />
				</svg>
			</button>

			{/* Pagination indicators */}
			<div className='absolute bottom-4 left-0 right-0 z-0 flex justify-center space-x-2'>
				{images.map((_, index) => (
					<button
						key={index}
						onClick={() => goToSlide(index)}
						className={`w-2 h-2 md:w-3 md:h-3 rounded-full focus:outline-none transition-colors ${
							index === currentIndex ? 'bg-white' : 'bg-white/50 hover:bg-white/80'
						}`}
						aria-label={`Go to slide ${index + 1}`}
						disabled={transitioning}
					/>
				))}
			</div>
		</div>
	);
};

export default ImageSlideshow;
