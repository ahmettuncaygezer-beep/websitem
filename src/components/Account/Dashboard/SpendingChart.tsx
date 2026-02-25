'use client';

import dynamic from 'next/dynamic';
import { mockSpendingData } from '@/data/mock-account';

const ResponsiveContainer = dynamic(() => import('recharts').then((m) => m.ResponsiveContainer), { ssr: false });
const BarChart = dynamic(() => import('recharts').then((m) => m.BarChart), { ssr: false });
const Bar = dynamic(() => import('recharts').then((m) => m.Bar), { ssr: false });
const XAxis = dynamic(() => import('recharts').then((m) => m.XAxis), { ssr: false });
const YAxis = dynamic(() => import('recharts').then((m) => m.YAxis), { ssr: false });
const Tooltip = dynamic(() => import('recharts').then((m) => m.Tooltip), { ssr: false });
const CartesianGrid = dynamic(() => import('recharts').then((m) => m.CartesianGrid), { ssr: false });

export function SpendingChart() {
    return (
        <div className="mt-6 p-5" style={{ background: 'white', borderRadius: '8px', border: '1px solid #F0EDE8' }}>
            <h3 className="text-[15px] font-semibold mb-4" style={{ color: '#1C1C1E' }}>Harcama Geçmişim</h3>
            <div style={{ height: 200 }}>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={mockSpendingData} margin={{ top: 5, right: 0, left: -10, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#F0EDE8" vertical={false} />
                        <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#999' }} axisLine={false} tickLine={false} />
                        <YAxis tick={{ fontSize: 11, fill: '#999' }} axisLine={false} tickLine={false} tickFormatter={(v: number) => `₺${(v / 1000).toFixed(0)}k`} />
                        <Tooltip
                            contentStyle={{ background: '#1C1C1E', border: 'none', borderRadius: '6px', padding: '8px 12px' }}
                            labelStyle={{ color: 'rgba(255,255,255,0.6)', fontSize: '11px' }}
                            itemStyle={{ color: 'white', fontSize: '13px' }}
                            formatter={(value: any) => [`₺${Number(value).toLocaleString('tr-TR')}`, 'Harcama']}
                            cursor={{ fill: 'rgba(201,169,110,0.1)' }}
                        />
                        <Bar dataKey="amount" fill="#1C1C1E" radius={[4, 4, 0, 0]} activeBar={{ fill: '#C9A96E' }} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
