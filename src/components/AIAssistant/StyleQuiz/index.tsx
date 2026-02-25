'use client';

import { useStyleQuiz } from '../hooks/useStyleQuiz';
import { QuizProgress } from './QuizProgress';
import { QuizQuestion } from './QuizQuestion';
import { QuizResult } from './QuizResult';
import { StyleReport } from './StyleReport';
import { motion, AnimatePresence } from 'framer-motion';
import { useRef } from 'react';

export default function StyleQuiz() {
    const {
        currentQuestion,
        totalQuestions,
        progress,
        completed,
        primaryStyle,
        secondaryStyle,
        distribution,
        aiAnalysis,
        isAnalyzing,
        selectOption,
        nextQuestion,
        prevQuestion,
        fetchAiAnalysis,
        answers
    } = useStyleQuiz();

    const directionRef = useRef(1);

    const handleSelect = (optionId: string, stylePoints: any) => {
        selectOption(QUIZ_QUESTIONS[currentQuestion].id, optionId, stylePoints);
        directionRef.current = 1;

        // Auto next after 600ms
        setTimeout(() => {
            if (currentQuestion < totalQuestions - 1) {
                nextQuestion();
            } else {
                nextQuestion(); // This will trigger completion
                fetchAiAnalysis();
            }
        }, 600);
    };

    const currentQData = QUIZ_QUESTIONS[currentQuestion];
    const currentAnswer = answers.find(a => a.questionId === currentQData.id);

    if (completed && primaryStyle) {
        return (
            <QuizResult
                scores={{ minimalist: 0, klasik: 0, modern: 0, bohem: 0, skandinav: 0 }} // Simplified for display
                distribution={distribution}
                primaryStyle={primaryStyle}
                secondaryStyle={secondaryStyle}
                aiAnalysis={aiAnalysis}
                isAnalyzing={isAnalyzing}
                onShare={() => {
                    if (navigator.share) {
                        navigator.share({
                            title: 'MAISON Stil Testi Sonucum',
                            text: `Benim stilim: ${primaryStyle.name}! Seninkini keşfetmek için tıkla.`,
                            url: window.location.href,
                        });
                    }
                }}
                onDownload={() => {
                    // This would ideally trigger the StyleReport exportPDF method
                    // For simplicity in this index, we'll let the user click the button in Result
                    const reportBtn = document.querySelector('[data-report-btn]');
                    if (reportBtn) (reportBtn as any).click();
                }}
            />
        );
    }

    return (
        <div className="min-h-screen bg-[#F5F0EB] py-16 md:py-24 px-6">
            <div className="max-w-4xl mx-auto">
                <header className="text-center mb-16">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-serif text-[#1C1C1E] mb-4"
                    >
                        Stil Testinizi Yapın
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-[#666] font-light max-w-md mx-auto"
                    >
                        5 dakikada evinize özel mobilya önerileri ve kişisel stil analizi alın.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="mt-4 flex items-center justify-center gap-2"
                    >
                        <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-[11px] text-[#C9A96E] font-bold tracking-widest uppercase">
                            1.247 kişi bu hafta testi tamamladı
                        </span>
                    </motion.div>
                </header>

                <QuizProgress current={currentQuestion + 1} total={totalQuestions} />

                <div className="relative mt-8">
                    <AnimatePresence mode="wait">
                        <QuizQuestion
                            key={currentQuestion}
                            question={currentQData}
                            selectedOptionId={currentAnswer?.selectedOptionId}
                            onSelect={handleSelect}
                            direction={directionRef.current}
                        />
                    </AnimatePresence>
                </div>

                <div className="mt-12 flex justify-between items-center max-w-3xl mx-auto">
                    <button
                        onClick={() => { directionRef.current = -1; prevQuestion(); }}
                        disabled={currentQuestion === 0}
                        className={`text-sm font-bold tracking-widest uppercase py-2 transition-all ${currentQuestion === 0 ? 'text-gray-300 cursor-not-allowed' : 'text-[#666] hover:text-[#1C1C1E]'
                            }`}
                    >
                        ← Önceki Soru
                    </button>

                    <div className="text-[11px] text-[#999] font-medium italic">
                        Seçim yaptıktan sonra otomatik ilerlenir
                    </div>
                </div>
            </div>

            {/* Invisible report template helper */}
            {completed && primaryStyle && (
                <StyleReport
                    profile={primaryStyle}
                    distribution={distribution}
                    aiAnalysis={aiAnalysis}
                />
            )}
        </div>
    );
}

// Import helper for the index
import { QUIZ_QUESTIONS } from '../data/quiz.questions';
