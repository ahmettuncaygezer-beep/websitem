'use client';

import { useState } from 'react';
import { ReviewSummary } from './ReviewSummary';
import { ReviewCard } from './ReviewCard';

const MOCK_REVIEWS = [
    { id: 'r1', author: 'Ayşe Y.', initials: 'AY', verified: true, date: '15 Şubat 2026', rating: 5, title: 'Harika kalite, çok memnunum!', text: 'Koltuk tam beklediğim gibi geldi. Kumaş kalitesi mükemmel, oturma konforu harika. Montaj ekibi de çok profesyoneldi. Kesinlikle tavsiye ederim.', variant: 'Açık Gri | 280×190 cm', helpful: 23, unhelpful: 2 },
    { id: 'r2', author: 'Mehmet K.', initials: 'MK', verified: true, date: '10 Şubat 2026', rating: 5, title: 'Premium kalite, her kuruşuna değer', text: 'İkinci defa SELIS\'dan mobilya alıyorum. Luna koltuğun konforu gerçekten üst düzey. Ailem de çok beğendi.', variant: 'Vizon | 240×160 cm', helpful: 18, unhelpful: 1 },
    { id: 'r3', author: 'Elif D.', initials: 'ED', verified: true, date: '3 Şubat 2026', rating: 4, title: 'Güzel ürün, teslimat biraz geç', text: 'Koltuk çok kaliteli ve konforlu. Tek sıkıntı teslimatın 2 gün geç gelmesiydi ama ürünle ilgili hiçbir şikayetim yok.', variant: 'Krem | 280×190 cm', helpful: 11, unhelpful: 3 },
    { id: 'r4', author: 'Can B.', initials: 'CB', verified: false, date: '28 Ocak 2026', rating: 5, title: 'Şık ve rahat', text: 'Oturma odamıza çok yakıştı. Misafirlerimiz hep soruyor nerede aldığımızı.', helpful: 8, unhelpful: 0 },
];

export function ReviewsTab() {
    const [filter, setFilter] = useState<number | null>(null);

    const filtered = filter ? MOCK_REVIEWS.filter((r) => r.rating === filter) : MOCK_REVIEWS;
    const distribution = [0, 1, 3, 10, 73].reverse(); // [73, 10, 3, 1, 0] → 5★,4★,3★,2★,1★ indexes

    return (
        <div>
            <ReviewSummary average={4.8} count={127} distribution={[0, 1, 3, 10, 73]} onFilter={(s) => setFilter(s === filter ? null : s)} />

            {/* Filter pills */}
            <div className="flex items-center gap-2 mb-6 flex-wrap">
                <span className="text-[12px] text-muted-foreground">Filtrele:</span>
                {[null, 5, 4].map((v) => (
                    <button key={String(v)} onClick={() => setFilter(v === filter ? null : v)}
                        className={`px-4 py-1.5 rounded-full text-[11px] font-medium transition-colors duration-150 border-none cursor-pointer
                            ${filter === v ? 'bg-foreground text-background' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`}
                    >
                        {v === null ? 'Tümü' : `${v}★`}
                    </button>
                ))}
            </div>

            {/* Review list */}
            <div>
                {filtered.map((r) => (
                    <ReviewCard key={r.id} review={r} />
                ))}
            </div>
        </div>
    );
}
