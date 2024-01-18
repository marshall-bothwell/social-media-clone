'use server';

import { db } from '@/db';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import paths from '@/paths';


export async function deleteTopic(topicId: string) {
    await db.topic.delete({
        where: { id: topicId }
    })

    //Revalidate home path
    revalidatePath(paths.home());
    redirect(paths.home());
}