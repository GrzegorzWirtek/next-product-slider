import style from './Slider.module.css';
import Image from 'next/image';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import left from '/public/icons/arrow-left.svg';
import right from '/public/icons/arrow-right.svg';

export default function Slider({ images }) {
	const minimumPxShiftToChangeSlide = 80;
	const transitionTimeSeconds = 0.14;

	const wrapperRef = useRef();
	const isClicked = useRef(false);
	const startMousePosition = useRef(0);
	const moveDirection = useRef(null);
	const shift = useRef(0);
	const slideNumberRef = useRef(0);
	const [currentSlide, setCurrentSlide] = useState(slideNumberRef.current);

	const handleMouseDown = (e) => {
		e.preventDefault();
		if (e.target.dataset.button === 'nav') return;
		isClicked.current = true;
		startMousePosition.current = e.clientX || e.touches[0].pageX;
	};

	const handleMouseMove = (e) => {
		e.preventDefault();
		if (!isClicked.current) return;

		const clientX = e.clientX || e.touches[0].pageX;
		const movement =
			clientX -
			startMousePosition.current -
			shift.current * slideNumberRef.current;
		wrapperRef.current.style.transform = `translateX(${movement}px)`;

		if (clientX - startMousePosition.current < -minimumPxShiftToChangeSlide) {
			moveDirection.current = 'left';
		} else if (
			clientX - startMousePosition.current >
			minimumPxShiftToChangeSlide
		) {
			moveDirection.current = 'right';
		} else moveDirection.current = null;
	};

	const recalculateSize = (e) => {
		shift.current = wrapperRef.current.offsetHeight;
	};

	const changeSlide = useCallback(
		(moveLeft) => {
			const wrapper = wrapperRef.current;
			wrapper.style.transition = `${transitionTimeSeconds}s`;

			if (moveLeft === 'left' && slideNumberRef.current < images.length - 1) {
				slideNumberRef.current++;
				setCurrentSlide(slideNumberRef.current);
			} else if (moveLeft === 'right' && slideNumberRef.current > 0) {
				slideNumberRef.current--;
				setCurrentSlide(slideNumberRef.current);
			}

			wrapper.style.transform = `translateX(-${slideNumberRef.current * 100}%)`;
			shift.current = wrapper.offsetHeight;

			setTimeout(() => {
				wrapper.style.transition = '0s';
			}, transitionTimeSeconds * 1000);
		},
		[images.length],
	);

	const handleMouseUp = useCallback(
		(e) => {
			e.preventDefault();
			isClicked.current = false;
			if (e.target.dataset.button === 'nav') return;
			if (!e.target.dataset.img) moveDirection.current = null;
			changeSlide(moveDirection.current);
		},
		[changeSlide],
	);

	useEffect(() => {
		const wrapper = wrapperRef.current;

		wrapper.addEventListener('mousedown', handleMouseDown);
		window.addEventListener('mouseup', handleMouseUp);
		wrapper.addEventListener('mousemove', handleMouseMove);

		wrapper.addEventListener('touchstart', handleMouseDown);
		window.addEventListener('touchend', handleMouseUp);
		wrapper.addEventListener('touchmove', handleMouseMove);

		window.addEventListener('resize', recalculateSize);

		const cleanup = () => {
			wrapper.removeEventListener('mousedown', handleMouseDown);
			window.removeEventListener('mouseup', handleMouseUp);
			wrapper.removeEventListener('mousemove', handleMouseMove);

			wrapper.removeEventListener('touchstart', handleMouseDown);
			window.removeEventListener('touchend', handleMouseUp);
			wrapper.removeEventListener('touchmove', handleMouseMove);

			window.removeEventListener('resize', recalculateSize);
		};

		return cleanup;
	}, [images.length, handleMouseUp]);

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
							data-img='img'
							className={style.slider__img}
						/>
					</div>
				))}
			</div>

			{currentSlide && (
				<button
					onClick={() => changeSlide('right')}
					onTouchEnd={() => changeSlide('right')}
					className={`${style.slider__btn} ${style.slider__btn__left}`}>
					<Image
						src={left}
						alt={'left'}
						data-button='nav'
						className={style.slider__btn__img}
					/>
				</button>
			)}

			{currentSlide < images.length - 1 && (
				<button
					onClick={() => changeSlide('left')}
					onTouchEnd={() => changeSlide('left')}
					className={`${style.slider__btn} ${style.slider__btn__right}`}>
					<Image
						src={right}
						alt={'right'}
						data-button='nav'
						className={style.slider__btn__img}
					/>
				</button>
			)}
		</div>
	);
}
