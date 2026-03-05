'use client';

import { useGlobal } from '@/context/GlobalContext';

export function DeliveryTab() {
    const { t } = useGlobal();

    const STEPS = [
        { label: t('pdp_delivery_step_1') || 'Sipariş Verildi', icon: '📦', done: true },
        { label: t('pdp_delivery_step_2') || 'Hazırlanıyor', icon: '🔧', done: false },
        { label: t('pdp_delivery_step_3') || 'Kargoda', icon: '🚚', done: false },
        { label: t('pdp_delivery_step_4') || 'Teslim Edildi', icon: '✅', done: false },
    ];

    return (
        <div className="max-w-3xl">
            {/* Timeline */}
            <h3 className="text-lg mb-6 text-foreground font-normal" style={{ fontFamily: 'var(--font-playfair, serif)' }}>{t('pdp_delivery_title') || 'Teslimat Süreci'}</h3>
            <div className="flex items-start justify-between mb-10">
                {STEPS.map((step, i) => (
                    <div key={i} className="flex flex-col items-center text-center flex-1 relative">
                        {i > 0 && (
                            <div className="absolute top-4 right-1/2 w-full h-px translate-x-1/2" style={{ background: step.done ? '#C9A96E' : 'var(--border)' }} />
                        )}
                        <div className="relative z-10 w-8 h-8 rounded-full flex items-center justify-center text-sm"
                            style={{ background: step.done ? '#C9A96E' : 'var(--muted)', color: step.done ? 'white' : 'var(--muted-foreground)' }}>
                            {step.icon}
                        </div>
                        <span className="text-[11px] mt-2 font-medium" style={{ color: step.done ? 'var(--foreground)' : 'var(--muted-foreground)' }}>{step.label}</span>
                    </div>
                ))}
            </div>

            {/* Details */}
            <div className="space-y-4">
                <div>
                    <h4 className="text-[14px] font-medium mb-2 text-foreground">{t('pdp_delivery_times_title') || 'Büyükşehir Teslimat Süreleri'}</h4>
                    <p className="text-[13px] text-muted-foreground">{t('pdp_delivery_times_desc') || 'İstanbul, Ankara, İzmir: 3-5 iş günü · Diğer büyükşehirler: 5-7 iş günü · Diğer iller: 7-10 iş günü'}</p>
                </div>
                <div>
                    <h4 className="text-[14px] font-medium mb-2 text-foreground">{t('pdp_delivery_pkg_title') || 'Paketleme & Sigorta'}</h4>
                    <p className="text-[13px] text-muted-foreground">{t('pdp_delivery_pkg_desc') || 'Tüm ürünler hasar sigortası ile gönderilir. Özel koruyucu ambalaj ile paketlenir.'}</p>
                </div>
                <div>
                    <h4 className="text-[14px] font-medium mb-2 text-foreground">{t('pdp_delivery_install_title') || 'Montaj Hizmeti'}</h4>
                    <p className="text-[13px] text-muted-foreground">{t('pdp_delivery_install_desc') || 'Profesyonel montaj ekibimiz ürününüzü yerine monte eder. Bu hizmet ücretsizdir.'}</p>
                </div>
                <div>
                    <h4 className="text-[14px] font-medium mb-2 text-foreground">{t('pdp_delivery_return_title') || 'İade Süreci'}</h4>
                    <p className="text-[13px] text-muted-foreground">{t('pdp_delivery_return_desc') || '30 gün içinde koşulsuz iade hakkınız bulunmaktadır. İade kargo ücreti tarafımıza aittir.'}</p>
                </div>
            </div>
        </div>
    );
}
