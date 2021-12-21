import '../styles/globals.css';
import 'tailwindcss/tailwind.css';
import '@material-tailwind/react/tailwind.css';
import Head from 'next/head';
import { SessionProvider } from 'next-auth/react';
import ProgressBar from '@badrap/bar-of-progress';
import { Router } from 'next/router';

const progressBar = new ProgressBar({
	color: '#4c8bf5',
	size: 4,
	delay: 100,
	className: 'z-50'
});

Router.events.on('routeChangeStart', progressBar.start);
Router.events.on('routeChangeComplete', progressBar.finish);
Router.events.on('routeChangeError', progressBar.finish);

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
	return (
		<>
			<Head>
				<link
					href='https://fonts.googleapis.com/icon?family=Material+Icons'
					rel='stylesheet'
				/>
			</Head>

			<SessionProvider session={session}>
				<Component {...pageProps} />
			</SessionProvider>
		</>
	);
}

export default MyApp;
