import Slider from '@/components/Slider';
import Head from 'next/head';
import p1 from 'public/images/p1.jpg';
import p2 from 'public/images/p2.jpg';
import p3 from 'public/images/p3.jpg';
import p4 from 'public/images/p4.jpg';
import p5 from 'public/images/p5.jpg';

export default function Home() {
	const images = [
		{ src: p1, alt: 'Description 1' },
		{ src: p2, alt: 'Description 2' },
		{ src: p3, alt: 'Description 3' },
		{ src: p4, alt: 'Description 4' },
		{ src: p5, alt: 'Description 5' },
	];

	return (
		<>
			<Head>
				<title>Next.js Image Slider</title>
				<meta
					name='description'
					content='Responsive image slider for Next.js app'
				/>
				<meta name='viewport' content='width=device-width, initial-scale=1.0' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<main>
				<h1>Next.js Image Slider</h1>
				<p>Created by Grzegorz Wirtek</p>
				<Slider images={images} />
			</main>
		</>
	);
}
