import style from './Slider.module.css';
import Image from 'next/image';
import { useEffect, useRef } from 'react';

export default function Slider({ images }) {
	const wrapperRef = useRef();
	const isClicked = useRef(false);
	const startMousePosition = useRef(0);
	const isMoveLeft = useRef(true);
	const shift = useRef(0);
	const slideNumberRef = useRef(0);

	const handleMouseDown = (e) => {
		e.preventDefault();
		isClicked.current = true;
		startMousePosition.current = e.clientX;
	};

	const handleMouseMove = (e) => {
		e.preventDefault();
		if (!isClicked.current) return;
		const movement =
			e.clientX -
			startMousePosition.current -
			shift.current * slideNumberRef.current;
		wrapperRef.current.style.transform = `translateX(${movement}px)`;
		isMoveLeft.current =
			e.clientX - startMousePosition.current < 0 ? true : false;
	};

	const handleUp = (e) => {
		e.preventDefault();
		isClicked.current = false;
		slideElement(isMoveLeft.current);
	};

	const slideElement = (moveLeft) => {
		const wrapper = wrapperRef.current;
		wrapper.style.transition = '0.2s ease-in-out';
		if (moveLeft && slideNumberRef.current < images.length - 1) {
			slideNumberRef.current++;
		} else if (!moveLeft && slideNumberRef.current > 0) {
			slideNumberRef.current--;
		}
		wrapper.style.transform = `translateX(-${slideNumberRef.current * 100}%)`;
		shift.current = wrapper.offsetHeight;

		setTimeout(() => {
			wrapper.style.transition = '0s ease-in-out';
		}, 200);
	};

	const recalculateSize = (e) => {
		shift.current = wrapperRef.current.offsetHeight;
	};

	useEffect(() => {
		const wrapper = wrapperRef.current;

		wrapper.addEventListener('mousedown', handleMouseDown);
		window.addEventListener('mouseup', handleUp);
		wrapper.addEventListener('mousemove', handleMouseMove);

		// wrapper.addEventListener('touchstart', handleTouchDown);
		// window.addEventListener('touchend', handleUp);
		// wrapper.addEventListener('touchmove', handleTouchMove);

		window.addEventListener('resize', recalculateSize);

		const cleanup = () => {
			wrapper.removeEventListener('mousedown', handleMouseDown);
			window.removeEventListener('mouseup', handleUp);
			wrapper.removeEventListener('mousemove', handleMouseMove);

			// wrapper.removeEventListener('touchstart', handleTouchDown);
			// window.removeEventListener('touchend', handleUp);
			// wrapper.removeEventListener('touchmove', handleTouchMove);

			window.removeEventListener('resize', recalculateSize);
		};
	});

	return (
		<div className={style.slider}>
			<div ref={wrapperRef} className={style.slider__wrapper}>
				{images.map((img) => (
					<div key={img.src.src} className={style.slider__item}>
						<Image
							src={img.src}
							alt={img.alt}
							height={'auto'}
							width={'auto'}
							className={style.slider__img}
						/>
					</div>
				))}
			</div>
		</div>
	);
}
