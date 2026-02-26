'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Sparkles, BookOpen, Clock, Tag } from 'lucide-react';
import Link from 'next/link';
import { CampaignForm } from '@/components/Admin/Campaigns/CampaignForm';

export default function NewCampaignPage() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            style={{ paddingBottom: '60px' }}
        >
            {/* Header Row */}
            <div style={{ marginBottom: '24px' }}>
                <Link href="/admin/kampanyalar" style={{
                    display: 'flex', alignItems: 'center', gap: '8px', color: '#636366',
                    textDecoration: 'none', fontSize: '13px', marginBottom: '12px'
                }}>
                    <ArrowLeft size={14} /> Kampanyalara Dön
                </Link>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '30px', fontWeight: 500, color: '#F5F0EB', margin: 0 }}>Yeni Kampanya Oluştur</h1>
                        <p style={{ fontSize: '13px', color: '#AEAEB2', marginTop: '4px' }}>Modern pazarlama araçlarıyla satışlarınızı artırın.</p>
                    </div>

                    <div style={{ display: 'flex', gap: '12px' }}>
                        <div style={{
                            padding: '8px 16px', background: 'rgba(255,214,10,0.05)', border: '1px solid rgba(255,214,10,0.1)',
                            borderRadius: '6px', fontSize: '12px', color: '#FFD60A', display: 'flex', alignItems: 'center', gap: '8px'
                        }}>
                            <BookOpen size={14} /> Kampanya Rehberi
                        </div>
                    </div>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '24px' }}>
                {/* Main Form Component */}
                <CampaignForm />

                {/* Footer info or Similar Campaigns section could go here if needed, 
            but for now we follow the user's specific form structure inside CampaignForm. */}

                <div style={{
                    marginTop: '20px', padding: '24px', background: '#1C1C1E', borderRadius: '8px',
                    border: '1px solid rgba(255,255,255,0.05)', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px'
                }} className="footer-tips">
                    <TipCard
                        icon={<Sparkles size={20} color="#C9A96E" />}
                        title="Dönüşüm Odaklı olun"
                        text="Flash sale kampanyaları genellikle %40 daha fazla dönüşüm sağlar."
                    />
                    <TipCard
                        icon={<Clock size={20} color="#0A84FF" />}
                        title="Tarihleri Kontrol Edin"
                        text="Kampanyaların hafta sonlarına denk gelmesi trafiği %15 artırabilir."
                    />
                    <TipCard
                        icon={<Tag size={20} color="#30D158" />}
                        title="Kupon Kodları"
                        text="Kısa ve akılda kalıcı kodlar (örn: BAHAR20) paylaşım oranını yükseltir."
                    />
                </div>
            </div>

            <style jsx>{`
        @media (max-width: 768px) {
          .footer-tips { grid-template-columns: 1fr !important; }
        }
      `}</style>
        </motion.div>
    );
}

function TipCard({ icon, title, text }: { icon: React.ReactNode, title: string, text: string }) {
    return (
        <div style={{ display: 'flex', gap: '16px' }}>
            <div style={{ flexShrink: 0 }}>{icon}</div>
            <div>
                <div style={{ fontSize: '13px', fontWeight: 600, color: '#F5F0EB' }}>{title}</div>
                <p style={{ fontSize: '11px', color: '#636366', marginTop: '4px', lineHeight: 1.5 }}>{text}</p>
            </div>
        </div>
    );
}
