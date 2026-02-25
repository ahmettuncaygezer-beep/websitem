'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const StyleQuiz = dynamic(() => import('@/components/AIAssistant/StyleQuiz'), {
    loading: () => <QuizLoading />,
    ssr: false
});

function QuizLoading() {
    return (
        <div className="min-h-screen bg-[#F5F0EB] flex flex-col items-center justify-center p-6 text-center">
            <div className="w-16 h-16 border-4 border-[#C9A96E] border-t-transparent rounded-full animate-spin mb-6" />
            <h2 className="text-2xl font-serif text-[#1C1C1E] mb-2 italic">Hazırlanıyor...</h2>
            <p className="text-[#666] font-light italic">Stil testi platformu yükleniyor.</p>
        </div>
    );
}

export default function StyleQuizPage() {
    return (
        <main id="main-content">
            <StyleQuiz />
        </main>
    );
}
