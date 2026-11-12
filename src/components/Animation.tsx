'use client'

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
// import Footer from './Footer';

type FadeInFadeOutTextProps = {
    children: React.ReactNode;
    delay?: number;
    duration?: number;
};
const FadeInFadeOut = ({ children, delay = 0, duration = 1 }: FadeInFadeOutTextProps) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
                duration: duration,
                delay: delay,
                ease: 'easeInOut',
            }}
        >
            {children}
        </motion.div>
    );
};

type SlideInProps = {
    children: React.ReactNode;
    from?: 'left' | 'right' | 'top' | 'bottom';
    delay?: number;
    duration?: number;
};

const getInitialPosition = (from: string) => {
    switch (from) {
        case 'left':
            return { x: -50, opacity: 0 };
        case 'right':
            return { x: 50, opacity: 0 };
        case 'top':
            return { y: -50, opacity: 0 };
        case 'bottom':
            return { y: 50, opacity: 0 };
        default:
            return { opacity: 0 };
    }
};

function SlideIn({
    children,
    from = 'bottom',
    delay = 0,
    duration = 0.6,
}: SlideInProps) {
    return (
        <motion.div
            initial={getInitialPosition(from)}
            animate={{ x: 0, y: 0, opacity: 1 }}
            transition={{ duration, delay, ease: 'easeOut' }}
        >
            {children}
        </motion.div>
    );
}

function StaggerContainer({ children }: { children: React.ReactNode }) {
    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={{
                hidden: {},
                visible: {
                    transition: {
                        staggerChildren: 0.2,
                    },
                },
            }}
        >
            {children}
        </motion.div>
    );
}

function StaggerItem({ children, className = '' }: { children: React.ReactNode, className?: string }) {
    return (
        <motion.div
            className={className}
            variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
        >
            {children}
        </motion.div>
    );
}

const PageWrapper = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => {
    return (
        <main className={cn(className, 'animate-page-fade')}>
            {children}
        </main>
    );
};

export { FadeInFadeOut, SlideIn, PageWrapper, StaggerContainer, StaggerItem };