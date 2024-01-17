import type { User } from 'next-auth';
import { db } from '@/db'
import { auth } from '@/auth';
import FormButton from '@/components/common/form-button';
import { notFound } from 'next/navigation';
import * as actions from '@/actions';

interface PostShowProps {
    postId: string;
    slug: string;
}

export default async function PostShow({ postId, slug }: PostShowProps) {
    const post = await db.post.findFirst({
        where: { id: postId }
    });

    if (!post) {
        notFound();
    }

    const session = await auth();
    let currentUser: User | undefined
    if (session) {
        currentUser = session.user
    }

    const deletePostAction = actions.deletePost.bind(null, postId, slug);

    const deletePostButton = (
        <form action={deletePostAction}>
            <FormButton size="sm" variant="light">Delete Post</FormButton>
        </form>
    )

    return (
        <div className="m-4">
            <div className="flex flex-row w-full">
                <h1 className="text-2xl font-bold my-2 grow">{post.title}</h1>
                { currentUser?.id === post.userId ? deletePostButton : null }
            </div>
            <p className="p-4 border rounded">{post.content}</p>
        </div>
    );
}
