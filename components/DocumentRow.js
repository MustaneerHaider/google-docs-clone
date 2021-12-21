import Button from '@material-tailwind/react/Button';
import Icon from '@material-tailwind/react/Icon';
import { useRouter } from 'next/router';

function DocumentRow({ id, fileName, date }) {
	const router = useRouter();

	return (
		<div
			onClick={() => router.push(`doc/${id}`)}
			className='flex items-center p-4 hover:bg-gray-100 rounded-lg 
    text-gray-700 cursor-pointer'
		>
			<Icon name='article' size='3xl' color='blue' />
			<p className='flex-grow pl-5 truncate text-sm'>{fileName}</p>
			<p className='pr-5 text-sm'>
				{date ? date?.toDate().toLocaleDateString() : 'Loading...'}
			</p>
			<Button
				buttonType='outline'
				className='border-0'
				color='gray'
				ripple='dark'
				iconOnly
				rounded
			>
				<Icon name='more_vert' size='3xl' />
			</Button>
		</div>
	);
}

export default DocumentRow;
