'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { QuizOption } from './QuizOption';
import type { QuizQuestion as QuestionType, QuizAnswer } from '../types/ai.types';

interface Props {
    question: QuestionType;
    selectedOptionId?: string;
    onSelect: (optionId: string, stylePoints: any) => void;
    direction: number; // 1 for next, -1 for prev
}

export function QuizQuestion({ question, selectedOptionId, onSelect, direction }: Props) {
    return (
        <motion.div
            key={question.id}
            initial={{ opacity: 0, x: direction * 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -50 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="w-full max-w-3xl mx-auto bg-white rounded-3xl p-8 md:p-12 shadow-2xl shadow-black/5"
        >
            <h2 className="text-2xl md:text-3xl font-serif text-[#1C1C1E] text-center mb-10 leading-tight">
                {question.question}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {question.options.map((option) => (
                    <QuizOption
                        key={option.id}
                        option={option}
                        isSelected={selectedOptionId === option.id}
                        onSelect={() => onSelect(option.id, option.stylePoints)}
                    />
                ))}
            </div>
        </motion.div>
    );
}
