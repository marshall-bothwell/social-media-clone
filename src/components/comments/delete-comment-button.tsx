'use client';

import { useFormStatus } from 'react-dom';
import { Button } from '@nextui-org/react';

interface DeleteCommentButtonProps {
    children: React.ReactNode;

}

export default function DeleteCommentButton({ children }: DeleteCommentButtonProps) {
    const { pending } = useFormStatus();

    return (
        <Button size="sm" variant="light" type="submit" isLoading={pending}>{children}</Button>
    )
} 