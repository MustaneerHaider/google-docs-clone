import Button from '@material-tailwind/react/Button';
import { signIn } from 'next-auth/react';
import Image from 'next/image';

function Login() {
	return (
		<div className='flex flex-col items-center justify-center min-h-screen'>
			<div className='relative h-60 w-[400px]'>
				<Image
					src='https://links.papareact.com/1ui'
					layout='fill'
					objectFit='contain'
				/>
			</div>
			<Button
				className='w-52 mt-8'
				color='blue'
				buttonType='filled'
				ripple='light'
				onClick={signIn}
			>
				Login
			</Button>
		</div>
	);
}

export default Login;
