'use client';

const SPECS = [
    ['Boyutlar', '280 × 180 × 85 cm (En×Boy×H)'],
    ['Koltuk Yüksekliği', '42 cm'],
    ['Ağırlık', '68 kg'],
    ['Malzeme', 'Masif Meşe + Kadife Kumaş'],
    ['Renk', 'Açık Gri'],
    ['Garanti', '5 Yıl'],
    ['Menşei', 'Türkiye'],
    ['Sertifikalar', 'OEKO-TEX®, ISO 9001'],
];

export function SpecsTab() {
    return (
        <div className="max-w-2xl">
            <table className="w-full text-[13px]" style={{ borderCollapse: 'collapse' }}>
                <tbody>
                    {SPECS.map(([label, value], i) => (
                        <tr key={i} className={i % 2 === 0 ? 'bg-muted/30' : 'bg-transparent'}>
                            <td className="py-3 px-4 font-medium text-muted-foreground w-[40%]" style={{ fontSize: '13px' }}>{label}</td>
                            <td className="py-3 px-4 text-foreground" style={{ fontSize: '13px' }}>{value}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
