import Head from 'next/head';
import Image from 'next/image';
import Header from '../components/Header';
import Button from '@material-tailwind/react/Button';
import Icon from '@material-tailwind/react/Icon';
import { getSession, useSession } from 'next-auth/react';
import Login from '../components/Login';
import Modal from '@material-tailwind/react/Modal';
import ModalBody from '@material-tailwind/react/ModalBody';
import ModalFooter from '@material-tailwind/react/ModalFooter';
import { useState } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import {
	collection,
	addDoc,
	serverTimestamp,
	query,
	orderBy,
	getDocs
} from 'firebase/firestore';
import DocumentRow from '../components/DocumentRow';
import { db } from '../firebase';

export default function Home({ userDocs }) {
	const { data: session } = useSession();
	if (!session) return <Login />;

	const [showModal, setShowModal] = useState(false);
	const [input, setInput] = useState('');
	const [snapshot] = useCollection(
		query(
			collection(db, 'userDocs', session.user.email, 'docs'),
			orderBy('timestamp', 'desc')
		)
	);

	const createDocument = async () => {
		if (!input) return;

		const docRef = await addDoc(
			collection(db, 'userDocs', session.user.email, 'docs'),
			{
				fileName: input,
				timestamp: serverTimestamp()
			}
		);

		setInput('');
		setShowModal(false);
	};

	const modal = (
		<Modal size='sm' active={showModal} toggler={() => setShowModal(false)}>
			<ModalBody>
				<input
					value={input}
					onChange={e => setInput(e.target.value)}
					type='text'
					placeholder='Enter name of document...'
					className='w-full outline-none'
					onKeyDown={e => e.key === 'Enter' && createDocument()}
				/>
			</ModalBody>
			<ModalFooter>
				<Button
					color='blue'
					ripple='dark'
					buttonType='link'
					onClick={() => setShowModal(false)}
				>
					Cancel
				</Button>
				<Button color='blue' ripple='light' onClick={createDocument}>
					Create
				</Button>
			</ModalFooter>
		</Modal>
	);

	return (
		<>
			<Head>
				<title>Google Docs Clone</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<Header />
			{modal}

			<section className='bg-[#f8f9fa] px-10 md:px-0 pb-10'>
				<div className='max-w-3xl mx-auto'>
					<div className='py-6 flex items-center justify-between'>
						<h2 className='text-gray-700 text-lg'>
							Start a new document
						</h2>
						<Button
							color='gray'
							buttonType='outline'
							rounded
							iconOnly
							ripple='dark'
							className='border-0'
						>
							<Icon name='more_vert' size='3xl' />
						</Button>
					</div>
					<div>
						<div
							className='relative h-52 w-40 border-2 cursor-pointer 
            hover:border-blue-700'
							onClick={() => setShowModal(true)}
						>
							<Image
								src='https://links.papareact.com/pju'
								layout='fill'
							/>
						</div>
						<p className='ml-2 mt-2 font-semibold text-gray-700 text-sm'>
							Blank
						</p>
					</div>
				</div>
			</section>

			<section className='px-10 md:px-0 bg-white'>
				<div className='max-w-3xl mx-auto py-8 text-sm text-gray-700'>
					<div className='flex items-center'>
						<h2 className='flex-grow font-medium'>My Documents</h2>
						<p className='mr-12'>Date Created</p>
						<Icon name='folder' size='3xl' color='gray' />
					</div>

					{snapshot
						? snapshot?.docs.map(doc => (
								<DocumentRow
									key={doc.id}
									id={doc.id}
									fileName={doc.data().fileName}
									date={doc.data().timestamp}
								/>
						  ))
						: userDocs.map(doc => (
								<DocumentRow
									key={doc.id}
									id={doc.id}
									fileName={doc.fileName}
									date={doc.timestamp}
								/>
						  ))}
				</div>
			</section>
		</>
	);
}

export async function getServerSideProps(context) {
	const session = await getSession(context);
	let docs;
	if (session) {
		const snapshot = await getDocs(
			query(
				collection(db, 'userDocs', session.user.email, 'docs'),
				orderBy('timestamp', 'desc')
			)
		);
		docs = snapshot.docs.map(doc => ({
			id: doc.id,
			...doc.data(),
			timestamp: null
		}));
	}

	return {
		props: {
			session,
			userDocs: docs || null
		}
	};
}
