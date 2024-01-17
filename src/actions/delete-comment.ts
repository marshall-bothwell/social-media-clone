'use server';

import { db } from '@/db';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import paths from '@/paths';


export async function deleteComment(id: string) {
    
    await db.comment.delete({
        where: { id: id }
    })
    

    //revalidatePath(paths.postShow())
    //Revalidate postShow path

    redirect(paths.home());
}