import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import { setDoc, doc } from 'firebase/firestore';
import { useDocumentOnce } from 'react-firebase-hooks/firestore';
import { db } from '../firebase';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

const Editor = dynamic(
	() => import('react-draft-wysiwyg').then(module => module.Editor),
	{ ssr: false }
);

function TextEditor() {
	const [editorState, setEditorState] = useState(EditorState.createEmpty());
	const { data: session } = useSession();
	const router = useRouter();
	const { id } = router.query;
	const [snapshot] = useDocumentOnce(
		doc(db, 'userDocs', session.user.email, 'docs', id)
	);

	useEffect(() => {
		if (snapshot?.data()?.editorState) {
			setEditorState(
				EditorState.createWithContent(
					convertFromRaw(snapshot?.data()?.editorState)
				)
			);
		}
	}, [snapshot]);

	const handleEditorStateChange = async editorState => {
		setEditorState(editorState);

		await setDoc(
			doc(db, 'userDocs', session.user.email, 'docs', id),
			{
				editorState: convertToRaw(editorState.getCurrentContent())
			},
			{ merge: true }
		);
	};

	return (
		<div className='bg-[#f8f9fa] min-h-screen pb-16'>
			<Editor
				editorState={editorState}
				toolbarClassName='flex !justify-center sticky top-0 z-50'
				editorClassName='mt-6 p-10 bg-white max-w-5xl mx-auto shadow-md border'
				onEditorStateChange={handleEditorStateChange}
			/>
		</div>
	);
}

export default TextEditor;
