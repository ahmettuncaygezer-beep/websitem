'use client';

import { motion } from 'framer-motion';

interface StarRatingProps {
    rating?: number; // e.g. 4.8 out of 5
    maxStars?: number;
    size?: 'sm' | 'md' | 'lg';
    animate?: boolean;
}

export default function StarRating({
    rating = 4.8,
    maxStars = 5,
    size = 'md',
    animate = true,
}: StarRatingProps) {
    const sizeMap = {
        sm: 'w-3.5 h-3.5',
        md: 'w-5 h-5',
        lg: 'w-7 h-7',
    };

    const starClass = sizeMap[size];

    return (
        <div className="flex gap-0.5">
            {Array.from({ length: maxStars }).map((_, i) => {
                const starIndex = i + 1;
                let fill: string;
                if (starIndex <= Math.floor(rating)) {
                    fill = '#C9A96E';
                } else if (starIndex === Math.ceil(rating) && rating % 1 !== 0) {
                    fill = 'url(#halfFill)';
                } else {
                    fill = '#E8E3DC';
                }

                const Star = (
                    <svg
                        key={i}
                        className={starClass}
                        viewBox="0 0 20 20"
                        fill={fill}
                    >
                        <defs>
                            <linearGradient id="halfFill" x1="0" x2="1" y1="0" y2="0">
                                <stop offset={`${(rating % 1) * 100}%`} stopColor="#C9A96E" />
                                <stop offset={`${(rating % 1) * 100}%`} stopColor="#E8E3DC" />
                            </linearGradient>
                        </defs>
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                );

                if (animate) {
                    return (
                        <motion.div
                            key={i}
                            initial={{ scale: 0, rotate: -30 }}
                            whileInView={{ scale: 1, rotate: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.9 + starIndex * 0.08, type: 'spring' }}
                        >
                            {Star}
                        </motion.div>
                    );
                }

                return Star;
            })}
        </div>
    );
}
