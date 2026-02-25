'use client';

const STEPS = [
    { label: 'Sipariş Verildi', icon: '📦', done: true },
    { label: 'Hazırlanıyor', icon: '🔧', done: false },
    { label: 'Kargoda', icon: '🚚', done: false },
    { label: 'Teslim Edildi', icon: '✅', done: false },
];

export function DeliveryTab() {
    return (
        <div className="max-w-3xl">
            {/* Timeline */}
            <h3 className="text-lg mb-6" style={{ fontFamily: 'var(--font-playfair, serif)', fontWeight: 400, color: '#1C1C1E' }}>Teslimat Süreci</h3>
            <div className="flex items-start justify-between mb-10">
                {STEPS.map((step, i) => (
                    <div key={i} className="flex flex-col items-center text-center flex-1 relative">
                        {i > 0 && (
                            <div className="absolute top-4 right-1/2 w-full h-px" style={{ background: step.done ? '#C9A96E' : '#E8E3DC', transform: 'translateX(50%)' }} />
                        )}
                        <div className="relative z-10 w-8 h-8 rounded-full flex items-center justify-center text-sm"
                            style={{ background: step.done ? '#C9A96E' : '#F5F0EB', color: step.done ? 'white' : '#999' }}>
                            {step.icon}
                        </div>
                        <span className="text-[11px] mt-2 font-medium" style={{ color: step.done ? '#1C1C1E' : '#999' }}>{step.label}</span>
                    </div>
                ))}
            </div>

            {/* Details */}
            <div className="space-y-4">
                <div>
                    <h4 className="text-[14px] font-medium mb-2" style={{ color: '#1C1C1E' }}>Büyükşehir Teslimat Süreleri</h4>
                    <p className="text-[13px]" style={{ color: '#666' }}>İstanbul, Ankara, İzmir: 3-5 iş günü · Diğer büyükşehirler: 5-7 iş günü · Diğer iller: 7-10 iş günü</p>
                </div>
                <div>
                    <h4 className="text-[14px] font-medium mb-2" style={{ color: '#1C1C1E' }}>Paketleme & Sigorta</h4>
                    <p className="text-[13px]" style={{ color: '#666' }}>Tüm ürünler hasar sigortası ile gönderilir. Özel koruyucu ambalaj ile paketlenir.</p>
                </div>
                <div>
                    <h4 className="text-[14px] font-medium mb-2" style={{ color: '#1C1C1E' }}>Montaj Hizmeti</h4>
                    <p className="text-[13px]" style={{ color: '#666' }}>Profesyonel montaj ekibimiz ürününüzü yerine monte eder. Bu hizmet ücretsizdir.</p>
                </div>
                <div>
                    <h4 className="text-[14px] font-medium mb-2" style={{ color: '#1C1C1E' }}>İade Süreci</h4>
                    <p className="text-[13px]" style={{ color: '#666' }}>30 gün içinde koşulsuz iade hakkınız bulunmaktadır. İade kargo ücreti tarafımıza aittir.</p>
                </div>
            </div>
        </div>
    );
}
