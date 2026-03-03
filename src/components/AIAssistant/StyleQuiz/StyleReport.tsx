'use client';

import { Download } from 'lucide-react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import type { StyleProfile } from '../types/ai.types';

interface Props {
    profile: StyleProfile;
    distribution: { id: string; pct: number }[];
    aiAnalysis: string;
}

export function StyleReport({ profile, distribution, aiAnalysis }: Props) {
    const exportPDF = async () => {
        const reportElement = document.getElementById('report-template');
        if (!reportElement) return;

        reportElement.style.display = 'block';

        try {
            const canvas = await html2canvas(reportElement, {
                scale: 2,
                useCORS: true,
                logging: false,
                backgroundColor: '#FFFFFF',
            });

            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save(`SELIS-Stil-Raporu-${profile.name}.pdf`);
        } catch (err) {
            console.error('PDF Export Error:', err);
        } finally {
            reportElement.style.display = 'none';
        }
    };

    return (
        <>
            <div id="report-template" style={{ display: 'none', width: '210mm', padding: '20mm', background: 'white', color: '#1C1C1E', fontFamily: 'serif' }}>
                <div style={{ borderBottom: '2px solid #C9A96E', paddingBottom: '10px', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h1 style={{ margin: 0, fontSize: '24pt', fontWeight: 'bold' }}>SELIS</h1>
                    <span style={{ fontSize: '10pt', color: '#999' }}>{new Date().toLocaleDateString('tr-TR')}</span>
                </div>

                <div style={{ marginBottom: '30px' }}>
                    <h2 style={{ fontSize: '12pt', color: '#C9A96E', textTransform: 'uppercase', letterSpacing: '2px', margin: '0 0 5px 0' }}>Kişisel Stil Raporunuz</h2>
                    <h3 style={{ fontSize: '36pt', margin: 0, fontStyle: 'italic' }}>{profile.name}</h3>
                    <p style={{ fontSize: '14pt', color: '#666', marginTop: '5px' }}>{profile.tagline}</p>
                </div>

                <div style={{ marginBottom: '30px' }}>
                    <h4 style={{ fontSize: '12pt', borderBottom: '1px solid #F5F0EB', paddingBottom: '5px', marginBottom: '10px' }}>Stil Analizi</h4>
                    <p style={{ fontSize: '11pt', lineHeight: '1.6', color: '#333' }}>{profile.description}</p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '30px' }}>
                    <div>
                        <h4 style={{ fontSize: '12pt', borderBottom: '1px solid #F5F0EB', paddingBottom: '5px', marginBottom: '10px' }}>Renk Paletiniz</h4>
                        <div style={{ display: 'flex', gap: '10px' }}>
                            {profile.colors.map(c => (
                                <div key={c.hex} style={{ textAlign: 'center' }}>
                                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: c.hex, border: '1px solid #EEE' }} />
                                    <span style={{ fontSize: '8pt', color: '#999', marginTop: '5px', display: 'block' }}>{c.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h4 style={{ fontSize: '12pt', borderBottom: '1px solid #F5F0EB', paddingBottom: '5px', marginBottom: '10px' }}>Stil Dağılımı</h4>
                        {distribution.map(d => (
                            <div key={d.id} style={{ marginBottom: '8px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '9pt', fontWeight: 'bold' }}>
                                    <span style={{ textTransform: 'uppercase' }}>{d.id}</span>
                                    <span>%{d.pct}</span>
                                </div>
                                <div style={{ height: '4px', background: '#F5F0EB', borderRadius: '2px', overflow: 'hidden' }}>
                                    <div style={{ width: `${d.pct}%`, height: '100%', background: '#C9A96E' }} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div style={{ background: '#FAFAF8', padding: '20px', borderRadius: '10px', marginBottom: '30px' }}>
                    <h4 style={{ fontSize: '12pt', marginBottom: '15px', color: '#1C1C1E', fontStyle: 'italic' }}>SELIS AI Yorumu</h4>
                    <p style={{ fontSize: '10pt', lineHeight: '1.8', color: '#666' }}>{aiAnalysis.replace(/(\r\n|\n|\r)/gm, " ")}</p>
                </div>

                <div>
                    <h4 style={{ fontSize: '12pt', borderBottom: '1px solid #F5F0EB', paddingBottom: '5px', marginBottom: '10px' }}>Önerilen Ürünler</h4>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
                        {profile.products.slice(0, 4).map(p => (
                            <div key={p.id} style={{ border: '1px solid #F5F0EB', padding: '5px', borderRadius: '5px', textAlign: 'center' }}>
                                <div style={{ width: '100%', aspectRatio: '1', background: '#EEE', borderRadius: '3px', marginBottom: '5px' }} />
                                <p style={{ fontSize: '8pt', fontWeight: 'bold', margin: '0 0 2px 0' }}>{p.name}</p>
                                <p style={{ fontSize: '8pt', color: '#C9A96E', margin: 0 }}>₺{p.price.toLocaleString('tr-TR')}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div style={{ marginTop: '40px', textAlign: 'center', fontSize: '9pt', color: '#999', borderTop: '1px solid #EEE', paddingTop: '10px' }}>
                    Bu rapor selis.com.tr üzerinden oluşturulmuştur. Tüm hakları saklıdır.
                </div>
            </div>
        </>
    );
}
