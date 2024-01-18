import type { User } from 'next-auth';
import PostCreateForm from '@/components/posts/post-create-form';
import PostList from '@/components/posts/post-list';
import { fetchPostsByTopicSlug } from '@/db/queries/posts';
import FormButton from '@/components/common/form-button';
import * as actions from '@/actions';
import { auth } from '@/auth';
import { fetchTopicIdBySlug } from '@/db/queries/topics';

interface TopicShowPageProps {
    params: {
        slug: string;
    }
}

export default async function TopicShowPage({ params }: TopicShowPageProps) {
    const { slug } = params;

    const topic = await fetchTopicIdBySlug(slug);
    let topicId = ""
    if (topic) {
        topicId = topic.id
    }

    const session = await auth();
    let currentUser: User | undefined
    if (session) {
        currentUser = session.user
    }

    const deleteTopicAction = actions.deleteTopic.bind(null, topicId);

    const deleteTopicButton = (
        <form action={deleteTopicAction}>
            <FormButton size="sm" variant="light">Delete Topic</FormButton>
        </form>
    )

    return (
        <div className="grid grid-cols-4 gap-4 p-4">
            <div className="col-span-3">
                <div className="flex flex-row">
                    <h1 className="text-2xl font-bold mb-2 mr-4">
                        {slug}
                    </h1>
                    {currentUser?.id === topic?.userId ? deleteTopicButton : null}
                </div>
                <PostList fetchData={() => fetchPostsByTopicSlug(slug)} />
            </div>

            <div className="col-span-1">
                <PostCreateForm slug={slug} />
            </div>
        </div>
    )
}