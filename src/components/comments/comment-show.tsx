
import type { User } from 'next-auth';
import Image from "next/image";
import CommentCreateForm from "@/components/comments/comment-create-form";
import { fetchCommentsByPostId } from "@/db/queries/comments";
import { deleteComment } from "@/actions/delete-comment";
import FormButton from '@/components/common/form-button';
import { auth } from '@/auth';

interface CommentShowProps {
    commentId: string;
    postId: string;
    slug: string;
}

export default async function CommentShow({ commentId, postId, slug }: CommentShowProps) {
    const comments = await fetchCommentsByPostId(postId);
    const comment = comments.find((c) => c.id === commentId);

    if (!comment) {
        return null;
    }

    const session = await auth();
    let currentUser: User | undefined
    if (session) {
        currentUser = session.user
    }

    const deleteCommentAction = deleteComment.bind(null, commentId, slug, postId);

    const deleteCommentButton = (
        <form action={deleteCommentAction}>
            <FormButton size="sm" variant="light">Delete</FormButton>
        </form>
    )

    const children = comments.filter((c) => c.parentId === commentId);
    const renderedChildren = children.map((child) => {
        return (
            <CommentShow key={child.id} commentId={child.id} postId={postId} slug={slug} />
        );
    });

    return (
        <div className="p-4 border mt-2 mb-1">
            <div className="flex gap-3">
                <Image
                    src={comment.user.image || ""}
                    alt="user image"
                    width={40}
                    height={40}
                    className="w-10 h-10 rounded-full"
                />
                <div className="flex-1 space-y-3">
                    <div>
                        <p className="text-sm font-medium text-gray-500">
                            {comment.user.name}
                        </p>
                    </div>
                    <p className="text-gray-900">{comment.content}</p>
                    <div className="flex flex-row">
                        <CommentCreateForm postId={comment.postId} parentId={comment.id} />
                        { currentUser?.id === comment.user.id ? deleteCommentButton : null }
                    </div>
                </div>
            </div>
            <div className="pl-4">{renderedChildren}</div>
        </div>
    );
}
