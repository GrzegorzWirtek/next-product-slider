import Slider from '@/components/Slider';
import Head from 'next/head';
import p1 from 'public/images/p1.png';
import p2 from 'public/images/p2.png';
import p3 from 'public/images/p3.png';

export default function Home() {
	const images = [
		{ src: p1, alt: 'Description 1' },
		{ src: p2, alt: 'Description 2' },
		{ src: p3, alt: 'Description 3' },
	];

	return (
		<>
			<Head>
				<title>Create Next App</title>
				<meta name='description' content='Generated by create next app' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<main>
				<Slider images={images} />
			</main>
		</>
	);
}
