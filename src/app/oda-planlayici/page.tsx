'use client';

import dynamic from 'next/dynamic';

const RoomPlanner = dynamic(() => import('@/components/RoomPlanner'), {
    ssr: false,
    loading: () => (
        <div className="fixed inset-0 flex items-center justify-center" style={{ background: '#F8F6F3' }}>
            <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full border-2 border-t-transparent animate-spin" style={{ borderColor: '#C9A96E', borderTopColor: 'transparent' }} />
                <p className="text-[14px] font-medium" style={{ color: '#1C1C1E' }}>Oda Planlayıcı yükleniyor…</p>
                <p className="text-[12px] mt-1" style={{ color: '#999' }}>3D motor hazırlanıyor</p>
            </div>
        </div>
    ),
});

export default function OdaPlanlayiciPage() {
    return <RoomPlanner />;
}
