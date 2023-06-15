import style from './Slider.module.css';
import Image from 'next/image';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import left from '/public/icons/arrow-left.svg';
import right from '/public/icons/arrow-right.svg';

export default function Slider({ images }) {
	const wrapperRef = useRef();
	const isClicked = useRef(false);
	const startMousePosition = useRef(0);
	const isMoveLeft = useRef(true);
	const shift = useRef(0);
	const slideNumberRef = useRef(0);
	const [currentSlide, setCurrentSlide] = useState(slideNumberRef.current);

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

	const recalculateSize = (e) => {
		shift.current = wrapperRef.current.offsetHeight;
	};

	const slideElement = useCallback(
		(moveLeft) => {
			const wrapper = wrapperRef.current;
			wrapper.style.transition = '0.2s ease-in-out';

			if (moveLeft && slideNumberRef.current < images.length - 1) {
				slideNumberRef.current++;
				setCurrentSlide(slideNumberRef.current);
			} else if (!moveLeft && slideNumberRef.current > 0) {
				slideNumberRef.current--;
				setCurrentSlide(slideNumberRef.current);
			}

			wrapper.style.transform = `translateX(-${slideNumberRef.current * 100}%)`;
			shift.current = wrapper.offsetHeight;

			setTimeout(() => {
				wrapper.style.transition = '0s ease-in-out';
			}, 200);
		},
		[images.length],
	);

	const handleUp = useCallback(
		(e) => {
			e.preventDefault();
			isClicked.current = false;
			if (e.target.dataset.button === 'nav') return;
			slideElement(isMoveLeft.current);
		},
		[slideElement],
	);

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

		return cleanup;
	}, [images, handleUp]);

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

			{currentSlide && (
				<button
					onClick={() => slideElement(false)}
					className={`${style.slider__btn} ${style.slider__btn__left}`}>
					<Image src={left} alt={'left'} data-button='nav' />
				</button>
			)}

			{currentSlide < images.length - 1 && (
				<button
					onClick={() => slideElement(true)}
					className={`${style.slider__btn} ${style.slider__btn__right}`}>
					<Image src={right} alt={'right'} data-button='nav' />
				</button>
			)}
		</div>
	);
}
