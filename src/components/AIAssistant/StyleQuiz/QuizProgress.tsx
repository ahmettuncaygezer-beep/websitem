'use client';

import { motion } from 'framer-motion';

interface Props {
    current: number;
    total: number;
}

export function QuizProgress({ current, total }: Props) {
    const percentage = (current / total) * 100;

    return (
        <div className="w-full max-w-2xl mx-auto mb-12 px-4">
            <div className="flex justify-between items-center mb-3">
                <span className="text-[13px] text-[#999] font-medium tracking-wide uppercase">
                    Soru {current} / {total}
                </span>
                <span className="text-[13px] text-[#C9A96E] font-bold">
                    %{Math.round(percentage)}
                </span>
            </div>

            <div className="relative h-1.5 w-full bg-[#E8E3DC] rounded-full overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="absolute top-0 left-0 h-full rounded-full"
                    style={{ background: 'linear-gradient(90deg, #C9A96E, #B8915A)' }}
                />
            </div>

            <div className="flex justify-between mt-3">
                {Array.from({ length: total }).map((_, i) => (
                    <div
                        key={i}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${i < current ? 'bg-[#C9A96E] scale-100' :
                                i === current - 1 ? 'bg-[#C9A96E] ring-4 ring-[#C9A96E]/20 scale-125' :
                                    'bg-gray-300 scale-100'
                            }`}
                    />
                ))}
            </div>
        </div>
    );
}
