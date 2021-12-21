import Button from '@material-tailwind/react/Button';
import Icon from '@material-tailwind/react/Icon';
import { getSession, signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Login from '../../components/Login';
import { db } from '../../firebase';
import { useDocumentOnce } from 'react-firebase-hooks/firestore';
import { doc } from 'firebase/firestore';
import Image from 'next/image';
import TextEditor from '../../components/TextEditor';

function Doc() {
	const { data: session } = useSession();
	if (!session) return <Login />;

	const router = useRouter();
	const { id } = router.query;
	const [snapshot, loading] = useDocumentOnce(
		doc(db, 'userDocs', session.user.email, 'docs', id)
	);

	// Redirect if user tries to access a URL they do not have access to...
	if (!loading && !snapshot?.data()?.fileName) {
		router.replace('/');
	}

	return (
		<div>
			<header className='flex items-center p-3 pb-1'>
				<span
					onClick={() => router.push('/')}
					className='cursor-pointer'
				>
					<Icon name='description' color='blue' size='5xl' />
				</span>

				<div className='flex-grow pl-2'>
					<h2>{snapshot?.data()?.fileName}</h2>
					<div
						className='flex items-center text-sm space-x-1 h-8 -ml-1 
          text-gray-700'
					>
						<p className='option'>File</p>
						<p className='option'>Edit</p>
						<p className='option'>View</p>
						<p className='option'>Insert</p>
						<p className='option'>Format</p>
						<p className='option'>Tools</p>
					</div>
				</div>

				<Button
					buttonType='filled'
					ripple='light'
					color='lightBlue'
					className='hidden md:!inline-flex h-10 md:mr-2'
				>
					<Icon name='people' size='md' /> SHARE
				</Button>

				<Image
					src={session.user.image}
					width={40}
					height={40}
					layout='fixed'
					className='rounded-full cursor-pointer'
					onClick={signOut}
				/>
			</header>

			<TextEditor />
		</div>
	);
}

export default Doc;

export async function getServerSideProps(context) {
	const session = await getSession(context);

	return {
		props: {
			session
		}
	};
}
