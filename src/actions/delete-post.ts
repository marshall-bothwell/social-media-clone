'use server';

import { db } from '@/db';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import paths from '@/paths';


export async function deletePost(postId: string, slug: string) {
    await db.post.delete({
        where: { id: postId }
    });

    //Revalidate topicShow path
    revalidatePath(paths.topicShow(slug));
    redirect(paths.topicShow(slug));
}