import Button from '@material-tailwind/react/Button';
import Icon from '@material-tailwind/react/Icon';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';

function Header() {
	const { data: session } = useSession();

	return (
		<header
			className='sticky top-0 z-50 bg-white flex items-center
       px-4 py-2 shadow-md'
		>
			{/* Left */}
			<div className='flex items-center'>
				<Button
					color='gray'
					buttonType='outline'
					rounded
					iconOnly
					ripple='dark'
					className='hidden md:!inline-flex h-20 w-20 border-0'
				>
					<Icon name='menu' size='3xl' />
				</Button>

				<Icon name='description' size='5xl' color='blue' />
				<h1 className='hidden md:!inline-flex ml-2 text-2xl text-gray-700'>
					Docs
				</h1>
			</div>

			{/* Search */}
			<div
				className='flex-grow flex items-center px-5 py-2 bg-gray-100 rounded-lg 
      ml-5 md:ml-20 focus-within:shadow-md'
			>
				<Icon name='search' size='3xl' color='gray' />
				<input
					type='text'
					placeholder='Search'
					className='flex-grow bg-transparent placeholder-gray-400 
          outline-none ml-2 text-gray-600 text-base'
				/>
			</div>

			{/* Right */}
			<div className='ml-5 md:ml-20 flex items-center'>
				<Button
					color='gray'
					buttonType='outline'
					rounded
					iconOnly
					ripple='dark'
					className='hidden md:!inline-flex h-20 w-20 border-0'
				>
					<Icon name='apps' size='3xl' />
				</Button>

				<Image
					src={session.user.image}
					width={40}
					height={40}
					layout='fixed'
					className='cursor-pointer rounded-full ml-2'
					onClick={() => signOut()}
				/>
			</div>
		</header>
	);
}

export default Header;
