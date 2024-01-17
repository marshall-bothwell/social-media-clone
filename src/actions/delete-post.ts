'use server';

import { db } from '@/db';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';


export async function deletePost(postId: number) {

    //Revalidate topicShow path
}