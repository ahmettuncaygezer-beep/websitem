'use client';

import { useState, useCallback, useMemo } from 'react';
import { QUIZ_QUESTIONS } from '../data/quiz.questions';
import { STYLE_PROFILES } from '../data/style.profiles';
import type { QuizAnswer, StylePoints, StyleId, StyleProfile } from '../types/ai.types';

export function useStyleQuiz() {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState<QuizAnswer[]>([]);
    const [completed, setCompleted] = useState(false);
    const [aiAnalysis, setAiAnalysis] = useState('');
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    const totalQuestions = QUIZ_QUESTIONS.length;
    const progress = currentQuestion / totalQuestions;

    const selectOption = useCallback((questionId: string, optionId: string, points: StylePoints) => {
        setAnswers((prev) => {
            const filtered = prev.filter((a) => a.questionId !== questionId);
            return [...filtered, { questionId, selectedOptionId: optionId, stylePoints: points }];
        });
    }, []);

    const nextQuestion = useCallback(() => {
        if (currentQuestion < totalQuestions - 1) {
            setCurrentQuestion((p) => p + 1);
        } else {
            setCompleted(true);
        }
    }, [currentQuestion, totalQuestions]);

    const prevQuestion = useCallback(() => {
        if (currentQuestion > 0) setCurrentQuestion((p) => p - 1);
    }, [currentQuestion]);

    // Compute final scores
    const scores = useMemo((): StylePoints => {
        const base: StylePoints = { minimalist: 0, klasik: 0, modern: 0, bohem: 0, skandinav: 0 };
        for (const a of answers) {
            (Object.keys(a.stylePoints) as StyleId[]).forEach((k) => {
                base[k] += a.stylePoints[k];
            });
        }
        return base;
    }, [answers]);

    const totalPoints = useMemo(() =>
        Object.values(scores).reduce((s, v) => s + v, 0) || 1, [scores]);

    const distribution = useMemo(() => {
        const items = (Object.entries(scores) as [StyleId, number][])
            .map(([id, pts]) => ({ id, pts, pct: Math.round((pts / totalPoints) * 100) }))
            .sort((a, b) => b.pts - a.pts);
        return items;
    }, [scores, totalPoints]);

    const primaryStyle: StyleProfile | undefined = useMemo(
        () => distribution[0] ? STYLE_PROFILES[distribution[0].id] : undefined, [distribution]);

    const secondaryStyle: StyleProfile | undefined = useMemo(
        () => distribution[1] ? STYLE_PROFILES[distribution[1].id] : undefined, [distribution]);

    // Fetch AI analysis from Claude
    const fetchAiAnalysis = useCallback(async () => {
        if (isAnalyzing) return;
        setIsAnalyzing(true);
        try {
            const res = await fetch('/api/style-quiz', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ answers, scores, primaryStyle: primaryStyle?.id, secondaryStyle: secondaryStyle?.id }),
            });
            if (!res.ok) throw new Error('API error');
            const reader = res.body?.getReader();
            const decoder = new TextDecoder();
            let text = '';
            if (reader) {
                while (true) {
                    const { done, value } = await reader.read();
                    if (done) break;
                    text += decoder.decode(value, { stream: true });
                    setAiAnalysis(text);
                }
            }
            // Save to localStorage
            if (primaryStyle) {
                localStorage.setItem('selis_style_profile', primaryStyle.id);
                localStorage.setItem('selis_style_data', JSON.stringify({ primary: primaryStyle.id, secondary: secondaryStyle?.id, scores, date: new Date().toISOString() }));
            }
        } catch {
            setAiAnalysis('Yapay zeka analiziniz yüklenirken bir sorun oluştu. Lütfen sayfayı yenileyin.');
        } finally {
            setIsAnalyzing(false);
        }
    }, [answers, scores, primaryStyle, secondaryStyle, isAnalyzing]);

    const reset = useCallback(() => {
        setCurrentQuestion(0); setAnswers([]); setCompleted(false); setAiAnalysis('');
    }, []);

    return {
        currentQuestion, totalQuestions, progress, answers,
        completed, scores, distribution, primaryStyle, secondaryStyle,
        aiAnalysis, isAnalyzing,
        selectOption, nextQuestion, prevQuestion, fetchAiAnalysis, reset,
    };
}
