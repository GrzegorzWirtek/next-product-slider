import style from '@/styles/Slider.module.css';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

export default function Slider({ images, transitionTime }) {
	const sliderWrapperRef = useRef();
	const sliderRef = useRef();
	const isClicked = useRef(false);
	const currentElementPosition = useRef(0);
	const startTouchPosition = useRef(0);
	const transition = useRef(0);
	const isMouseMoveLeft = useRef(true);
	const [itemWidth, setImageWith] = useState(0);
	const newTransitionValue = useRef(0);
	const currentSlide = useRef(0);

	useEffect(() => {
		const wrapper = sliderWrapperRef.current;
		setImageWith(wrapper.offsetHeight * images.length);

		const handleMouseDown = (e) => {
			handleDown(e, e.clientX);
		};

		const handleTouchDown = (e) => {
			startTouchPosition.current = parseInt(e.touches[0].clientX);
			handleDown(e, parseInt(e.touches[0].clientX));
		};

		const handleDown = (e, clientX) => {
			e.preventDefault();
			isClicked.current = true;
			currentElementPosition.current =
				clientX - wrapper.offsetLeft - transition.current;
		};

		const handleUp = (e) => {
			e.preventDefault();
			isClicked.current = false;
			const imageWidth = sliderRef.current.clientWidth;

			const difference = Math.abs(transition.current / imageWidth);
			const factor = parseInt(difference) + 1;
			const isMoveRigthFactor = isMouseMoveLeft.current ? 0 : -imageWidth;
			const isLeftEndFactor =
				imageWidth * factor > sliderWrapperRef.current.clientWidth - imageWidth
					? -imageWidth
					: 0;
			newTransitionValue.current =
				imageWidth * factor + isMoveRigthFactor + isLeftEndFactor;

			currentSlide.current = factor;

			slideImage();
		};

		const slideImage = () => {
			wrapper.style.transition = `${transitionTime}s`;
			wrapper.style.transform = `translateX(-${newTransitionValue.current}px)`;
			transition.current = -newTransitionValue.current;

			setTimeout(() => {
				wrapper.style.transition = '0s';
			}, transitionTime * 1000);
		};

		const handleMouseMove = (e) => {
			handleMove(e, e.clientX, e.movementX);
		};

		const handleTouchMove = (e) => {
			const movementX = parseInt(
				e.touches[0].pageX - startTouchPosition.current,
			);
			handleMove(e, parseInt(e.touches[0].clientX), movementX);
		};

		const handleMove = (e, clientX, movementX) => {
			e.preventDefault();
			if (!isClicked.current) return;

			isMouseMoveLeft.current = movementX > 0 ? false : true;
			let cursorPosition = clientX - wrapper.offsetLeft;
			wrapper.style.transform = `translateX(${
				cursorPosition - currentElementPosition.current
			}px)`;
			transition.current = cursorPosition - currentElementPosition.current;
		};

		const recalculateWidth = () => {
			setImageWith(wrapper.offsetHeight * images.length);

			newTransitionValue.current =
				currentSlide.current * sliderRef.current.clientWidth;
			wrapper.style.transform = `translateX(-${newTransitionValue.current}px)`;
		};

		wrapper.addEventListener('mousedown', handleMouseDown);
		window.addEventListener('mouseup', handleUp);
		wrapper.addEventListener('mousemove', handleMouseMove);

		wrapper.addEventListener('touchstart', handleTouchDown);
		window.addEventListener('touchend', handleUp);
		wrapper.addEventListener('touchmove', handleTouchMove);

		window.addEventListener('resize', recalculateWidth);

		const cleanup = () => {
			wrapper.removeEventListener('mousedown', handleMouseDown);
			window.removeEventListener('mouseup', handleUp);
			wrapper.removeEventListener('mousemove', handleMouseMove);

			wrapper.removeEventListener('touchstart', handleTouchDown);
			window.removeEventListener('touchend', handleUp);
			wrapper.removeEventListener('touchmove', handleTouchMove);

			window.removeEventListener('resize', recalculateWidth);
		};
	}, [transitionTime, images.length]);

	return (
		<div className={style.slider} ref={sliderRef}>
			<div
				className={style.slider__wrapper}
				ref={sliderWrapperRef}
				style={{ width: `${itemWidth}px` }}>
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
