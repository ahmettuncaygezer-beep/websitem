'use client';

import { useGlobal } from '@/context/GlobalContext';

const SPECS = [
    ['pdp_spec_dimensions', '280 × 180 × 85 cm (En×Boy×H)'],
    ['pdp_spec_seat_height', '42 cm'],
    ['pdp_spec_weight', '68 kg'],
    ['pdp_spec_material', 'Masif Meşe + Kadife Kumaş'],
    ['pdp_spec_color', 'Açık Gri'],
    ['pdp_spec_warranty', '5 Yıl'],
    ['pdp_spec_origin', 'Türkiye'],
    ['pdp_spec_certs', 'OEKO-TEX®, ISO 9001'],
];

export function SpecsTab() {
    const { t } = useGlobal();
    return (
        <div className="max-w-2xl">
            <table className="w-full text-[13px]" style={{ borderCollapse: 'collapse' }}>
                <tbody>
                    {SPECS.map(([labelKey, value], i) => (
                        <tr key={i} className={i % 2 === 0 ? 'bg-muted/30' : 'bg-transparent'}>
                            <td className="py-3 px-4 font-medium text-muted-foreground w-[40%]" style={{ fontSize: '13px' }}>{t(labelKey)}</td>
                            <td className="py-3 px-4 text-foreground" style={{ fontSize: '13px' }}>{value}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
