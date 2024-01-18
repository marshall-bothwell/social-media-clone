import { db } from '@/db';

export const fetchTopicIdBySlug = async (slug: string) => {
    return db.topic.findFirst({
        where: { slug: slug }
    })
}