'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Check } from 'lucide-react';

interface Props {
    option: {
        id: string;
        text: string;
        image: string;
    };
    isSelected: boolean;
    onSelect: () => void;
}

export function QuizOption({ option, isSelected, onSelect }: Props) {
    return (
        <motion.div
            onClick={onSelect}
            whileHover={{ y: -4 }}
            className={`relative group cursor-pointer border-2 rounded-xl overflow-hidden transition-all duration-300 ${isSelected ? 'border-[#C9A96E] shadow-xl shadow-[#C9A96E]/10' : 'border-transparent hover:border-[#C9A96E]/50'
                }`}
        >
            <div className="relative aspect-[4/3] w-full">
                <Image
                    src={option.image}
                    alt={option.text}
                    fill
                    className={`object-cover transition-transform duration-700 ${isSelected ? 'scale-110' : 'group-hover:scale-110'
                        }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-100" />

                <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-white font-medium text-[15px] leading-tight drop-shadow-md">
                        {option.text}
                    </p>
                </div>

                {/* Selected indicator */}
                <motion.div
                    initial={false}
                    animate={{ scale: isSelected ? 1 : 0, opacity: isSelected ? 1 : 0 }}
                    className="absolute top-4 left-4 w-8 h-8 bg-[#C9A96E] rounded-full flex items-center justify-center text-white shadow-lg"
                >
                    <Check size={18} strokeWidth={3} />
                </motion.div>

                {/* Hover gold tint */}
                <div className={`absolute inset-0 bg-[#C9A96E]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${isSelected ? 'opacity-20' : ''}`} />
            </div>
        </motion.div>
    );
}
