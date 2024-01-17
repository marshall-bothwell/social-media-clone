'use server';

import { db } from '@/db';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import paths from '@/paths';


export async function deleteComment(commentId: string, topicSlug: string, postId: string) {
    
    await db.comment.delete({
        where: { id: commentId }
    })
    

    revalidatePath(paths.postShow(topicSlug, postId));
    redirect(paths.postShow(topicSlug, postId));
}