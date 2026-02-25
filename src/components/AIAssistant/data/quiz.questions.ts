import type { QuizQuestion } from '../types/ai.types';

export const QUIZ_QUESTIONS: QuizQuestion[] = [
    {
        id: 'q1',
        question: 'Aşağıdaki hangi mekan sizi en çok ifade eder?',
        options: [
            { id: 'q1a', text: 'Sade, beyaz duvarlı, ahşap detaylı oda', image: '/images/gallery-1.jpg', stylePoints: { minimalist: 2, skandinav: 1, klasik: 0, modern: 0, bohem: 0 } },
            { id: 'q1b', text: 'Kadife koltuklar, mermer yüzeyler, sanat eserleri', image: '/images/gallery-2.jpg', stylePoints: { minimalist: 0, skandinav: 0, klasik: 2, modern: 0, bohem: 0 } },
            { id: 'q1c', text: 'Metal ve cam, geometrik formlar, bold renkler', image: '/images/gallery-3.jpg', stylePoints: { minimalist: 0, skandinav: 0, klasik: 0, modern: 2, bohem: 0 } },
            { id: 'q1d', text: 'Rattan, bitki, renkli tekstil, kişisel objeler', image: '/images/gallery-4.jpg', stylePoints: { minimalist: 0, skandinav: 0, klasik: 0, modern: 0, bohem: 2 } },
        ],
    },
    {
        id: 'q2',
        question: 'Renk paletinde hangisi size daha yakın?',
        options: [
            { id: 'q2a', text: 'Beyaz, krem, doğal ahşap tonları', image: '/images/gallery-5.jpg', stylePoints: { minimalist: 1, skandinav: 2, klasik: 0, modern: 0, bohem: 0 } },
            { id: 'q2b', text: 'Lacivert, bordo, altın, krem', image: '/images/gallery-6.jpg', stylePoints: { minimalist: 0, skandinav: 0, klasik: 2, modern: 0, bohem: 0 } },
            { id: 'q2c', text: 'Grafit, beton grisi, turuncu aksan', image: '/images/gallery-1.jpg', stylePoints: { minimalist: 0, skandinav: 0, klasik: 0, modern: 2, bohem: 0 } },
            { id: 'q2d', text: 'Toprak tonları, terracotta, vizon', image: '/images/gallery-2.jpg', stylePoints: { minimalist: 0, skandinav: 0, klasik: 0, modern: 0, bohem: 2 } },
        ],
    },
    {
        id: 'q3',
        question: 'Oturma odanız nasıl hissettirmeli?',
        options: [
            { id: 'q3a', text: 'Huzurlu ve düzenli', image: '/images/gallery-3.jpg', stylePoints: { minimalist: 2, skandinav: 0, klasik: 0, modern: 0, bohem: 0 } },
            { id: 'q3b', text: 'Zarif ve sofistike', image: '/images/gallery-4.jpg', stylePoints: { minimalist: 0, skandinav: 0, klasik: 2, modern: 0, bohem: 0 } },
            { id: 'q3c', text: 'Enerjik ve çarpıcı', image: '/images/gallery-5.jpg', stylePoints: { minimalist: 0, skandinav: 0, klasik: 0, modern: 2, bohem: 0 } },
            { id: 'q3d', text: 'Sıcak ve kişisel', image: '/images/gallery-6.jpg', stylePoints: { minimalist: 0, skandinav: 0, klasik: 0, modern: 0, bohem: 2 } },
        ],
    },
    {
        id: 'q4',
        question: 'Hangi malzeme en çok ilginizi çekiyor?',
        options: [
            { id: 'q4a', text: 'Masif meşe, keten, mermer', image: '/images/gallery-1.jpg', stylePoints: { minimalist: 1, skandinav: 2, klasik: 0, modern: 0, bohem: 0 } },
            { id: 'q4b', text: 'Maun, kadife, pirinç', image: '/images/gallery-2.jpg', stylePoints: { minimalist: 0, skandinav: 0, klasik: 2, modern: 0, bohem: 0 } },
            { id: 'q4c', text: 'Çelik, cam, deri', image: '/images/gallery-3.jpg', stylePoints: { minimalist: 0, skandinav: 0, klasik: 0, modern: 2, bohem: 0 } },
            { id: 'q4d', text: 'Bambu, rattan, pamuk', image: '/images/gallery-4.jpg', stylePoints: { minimalist: 0, skandinav: 0, klasik: 0, modern: 0, bohem: 2 } },
        ],
    },
    {
        id: 'q5',
        question: 'Sehpanız nasıl olmalı?',
        options: [
            { id: 'q5a', text: 'Yuvarlak, tek ayak, minimal', image: '/images/gallery-5.jpg', stylePoints: { minimalist: 2, skandinav: 0, klasik: 0, modern: 0, bohem: 0 } },
            { id: 'q5b', text: 'Oymalı bacaklar, mermer üst', image: '/images/gallery-6.jpg', stylePoints: { minimalist: 0, skandinav: 0, klasik: 2, modern: 0, bohem: 0 } },
            { id: 'q5c', text: 'İkincil fonksiyonel, endüstriyel', image: '/images/gallery-1.jpg', stylePoints: { minimalist: 0, skandinav: 0, klasik: 0, modern: 2, bohem: 0 } },
            { id: 'q5d', text: 'Çoklu katmanlı, vintage, el yapımı', image: '/images/gallery-2.jpg', stylePoints: { minimalist: 0, skandinav: 0, klasik: 0, modern: 0, bohem: 2 } },
        ],
    },
    {
        id: 'q6',
        question: 'Aydınlatma tercihiniz?',
        options: [
            { id: 'q6a', text: 'Sade beyaz, dolaylı ışık', image: '/images/gallery-3.jpg', stylePoints: { minimalist: 1, skandinav: 2, klasik: 0, modern: 0, bohem: 0 } },
            { id: 'q6b', text: 'Kristal avize, abajurlu lambalar', image: '/images/gallery-4.jpg', stylePoints: { minimalist: 0, skandinav: 0, klasik: 2, modern: 0, bohem: 0 } },
            { id: 'q6c', text: 'LED şerit, endüstriyel sarkıt', image: '/images/gallery-5.jpg', stylePoints: { minimalist: 0, skandinav: 0, klasik: 0, modern: 2, bohem: 0 } },
            { id: 'q6d', text: 'Pek çok farklı lamba, mumlar', image: '/images/gallery-6.jpg', stylePoints: { minimalist: 0, skandinav: 0, klasik: 0, modern: 0, bohem: 2 } },
        ],
    },
    {
        id: 'q7',
        question: 'Evinize misafir geliyor. Hangi sofrayı kurarsınız?',
        options: [
            { id: 'q7a', text: 'Sade beyaz servis, minimalist', image: '/images/gallery-1.jpg', stylePoints: { minimalist: 2, skandinav: 0, klasik: 0, modern: 0, bohem: 0 } },
            { id: 'q7b', text: 'Porselen, gümüş, şamdanlar', image: '/images/gallery-2.jpg', stylePoints: { minimalist: 0, skandinav: 0, klasik: 2, modern: 0, bohem: 0 } },
            { id: 'q7c', text: 'Mat siyah servis, geometrik', image: '/images/gallery-3.jpg', stylePoints: { minimalist: 0, skandinav: 0, klasik: 0, modern: 2, bohem: 0 } },
            { id: 'q7d', text: 'Mix & match, renkli peçeteler', image: '/images/gallery-4.jpg', stylePoints: { minimalist: 0, skandinav: 0, klasik: 0, modern: 0, bohem: 2 } },
        ],
    },
    {
        id: 'q8',
        question: 'Dekorasyon deyince aklınıza ne gelir?',
        options: [
            { id: 'q8a', text: 'Tek bir güzel obje', image: '/images/gallery-5.jpg', stylePoints: { minimalist: 3, skandinav: 0, klasik: 0, modern: 0, bohem: 0 } },
            { id: 'q8b', text: 'Çerçeveli tablolar, antika parçalar', image: '/images/gallery-6.jpg', stylePoints: { minimalist: 0, skandinav: 0, klasik: 3, modern: 0, bohem: 0 } },
            { id: 'q8c', text: 'Statement piece, büyük sanat eseri', image: '/images/gallery-1.jpg', stylePoints: { minimalist: 0, skandinav: 0, klasik: 0, modern: 3, bohem: 0 } },
            { id: 'q8d', text: 'Bitkiler, halılar, yastıklar', image: '/images/gallery-2.jpg', stylePoints: { minimalist: 0, skandinav: 0, klasik: 0, modern: 0, bohem: 3 } },
        ],
    },
];
