'use client';

import { useFormStatus } from 'react-dom';
import { Button } from '@nextui-org/react';

interface FormButtonProps {
    children: React.ReactNode;
    className?: string;
    size?: "sm" | "md" | "lg" | undefined;
    variant?: "solid" | "bordered" | "light" | "flat" | "faded" | "shadow" | "ghost" | undefined;
}

export default function FormButton({ children, className, size, variant }: FormButtonProps) {
    const { pending } = useFormStatus();

    return (
        <Button type="submit" className={className} size={size} variant={variant} isLoading={pending}>
            {children}
        </Button>
    )
}

