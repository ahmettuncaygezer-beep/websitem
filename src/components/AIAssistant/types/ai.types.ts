export type MessageRole = 'user' | 'assistant' | 'system';

export interface ChatMessage {
    id: string;
    role: MessageRole;
    content: string;
    timestamp: Date;
    products?: RecommendedProduct[];
    quickReplies?: string[];
    isStreaming?: boolean;
    imageUrl?: string;
}

export interface RecommendedProduct {
    id: string;
    name: string;
    price: number;
    image: string;
    href: string;
    matchScore: number;
    matchReason: string;
}

export interface QuizAnswer {
    questionId: string;
    selectedOptionId: string;
    stylePoints: StylePoints;
}

export interface StylePoints {
    minimalist: number;
    klasik: number;
    modern: number;
    bohem: number;
    skandinav: number;
}

export type StyleId = 'minimalist' | 'klasik' | 'modern' | 'bohem' | 'skandinav';

export interface QuizOption {
    id: string;
    text: string;
    image: string;
    stylePoints: StylePoints;
}

export interface QuizQuestion {
    id: string;
    question: string;
    options: QuizOption[];
}

export interface StyleProfile {
    id: StyleId;
    name: string;
    tagline: string;
    description: string;
    colors: { hex: string; name: string }[];
    keywords: string[];
    heroImage: string;
    recommendedCategories: string[];
    products: RecommendedProduct[];
}

export interface ChatContext {
    currentPage: string;
    currentProduct?: string;
    budget?: number;
    roomType?: string;
    styleProfile?: string;
}

export interface ChatStore {
    messages: ChatMessage[];
    isOpen: boolean;
    isMinimized: boolean;
    isLoading: boolean;
    sessionId: string;
    context: ChatContext;

    openChat: () => void;
    closeChat: () => void;
    minimizeChat: () => void;
    maximizeChat: () => void;
    addMessage: (msg: Omit<ChatMessage, 'id' | 'timestamp'>) => void;
    updateLastMessage: (content: string, extras?: Partial<ChatMessage>) => void;
    setLoading: (v: boolean) => void;
    updateContext: (ctx: Partial<ChatContext>) => void;
    clearMessages: () => void;
}
