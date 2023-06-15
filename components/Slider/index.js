import style from './Slider.module.css';
import Image from 'next/image';

export default function Slider({ images }) {
	return (
		<div className={style.slider}>
			<div className={style.slider__wrapper}>
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
