'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ArrowLeft, ShoppingBag, MessageSquare, StickyNote, Activity,
    Star, Clock, CheckCircle2, XCircle, AlertCircle, LogIn,
    MapPin, RefreshCcw
} from 'lucide-react';
import { mockCustomers, type Customer, type CustomerReview, type ActivityLogItem } from '@/lib/mock/customers';
import { CustomerProfile } from '@/components/Admin/Customers/CustomerProfile';
import { CustomerOrders } from '@/components/Admin/Customers/CustomerOrders';
import { CustomerNotes } from '@/components/Admin/Customers/CustomerNotes';

const easeOut: [number, number, number, number] = [0, 0, 0.2, 1];

// ── Tab Button Component ──────────────────────────────────────────────────
interface TabBtnProps {
    id: string;
    active: boolean;
    onClick: (id: string) => void;
    label: string;
    icon: React.ReactNode;
    count?: number;
}

function TabBtn({ id, active, onClick, label, icon, count }: TabBtnProps) {
    return (
        <button
            onClick={() => onClick(id)}
            style={{
                padding: '14px 20px', background: 'transparent', border: 'none', borderBottom: `2px solid ${active ? '#C9A96E' : 'transparent'}`,
                color: active ? '#F5F0EB' : '#636366', fontSize: '13px', fontWeight: active ? 600 : 500, cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: '8px', transition: 'all 150ms'
            }}
            onMouseEnter={e => !active && (e.currentTarget.style.color = '#AEAEB2')}
            onMouseLeave={e => !active && (e.currentTarget.style.color = '#636366')}
        >
            {icon}
            {label}
            {count !== undefined && (
                <span style={{
                    fontSize: '10px', color: active ? '#C9A96E' : '#636366', background: 'rgba(255,255,255,0.06)',
                    padding: '1px 6px', borderRadius: '10px'
                }}>
                    {count}
                </span>
            )}
        </button>
    );
}

// ── Reviews List Component ────────────────────────────────────────────────
function CustomerReviews({ reviews }: { reviews: CustomerReview[] }) {
    if (reviews.length === 0) return <NoContent title="Henüz yorum yok" description="Müşteri ürünler için henüz değerlendirme yapmadı." />;
    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            {reviews.map((review, idx) => (
                <div key={review.id} style={{ padding: '16px 20px', borderBottom: idx === reviews.length - 1 ? 'none' : '1px solid rgba(255,255,255,0.03)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                        <div style={{ display: 'flex', gap: '2px' }}>
                            {[1, 2, 3, 4, 5].map(s => (
                                <Star key={s} size={12} fill={s <= review.rating ? '#FFD60A' : 'transparent'} color={s <= review.rating ? '#FFD60A' : 'rgba(255,255,255,0.1)'} />
                            ))}
                        </div>
                        <span style={{ fontSize: '11px', color: '#636366' }}>{new Date(review.createdAt).toLocaleDateString('tr-TR')}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '12px', color: '#C9A96E', fontWeight: 500 }}>{review.productName}</span>
                        <span style={{
                            fontSize: '10px', padding: '2px 6px', borderRadius: '4px',
                            background: review.status === 'Onaylı' ? 'rgba(48,209,88,0.1)' : 'rgba(255,214,10,0.1)',
                            color: review.status === 'Onaylı' ? '#30D158' : '#FFD60A'
                        }}>
                            {review.status}
                        </span>
                    </div>
                    <div style={{ fontSize: '13px', color: '#AEAEB2', marginTop: '8px', lineHeight: 1.6 }}>
                        {review.comment}
                    </div>
                </div>
            ))}
        </div>
    );
}

// ── Activity Log Component ────────────────────────────────────────────────
function CustomerActivity({ log }: { log: ActivityLogItem[] }) {
    if (log.length === 0) return <NoContent title="Aktivite kaydı yok" description="Müşteriye ait sistem hareketi bulunamadı." />;
    return (
        <div style={{ padding: '20px' }}>
            {log.map((item, idx) => {
                const isLast = idx === log.length - 1;
                const getTypeConfig = (type: string) => {
                    switch (type) {
                        case 'order': return { icon: <ShoppingBag size={14} />, bg: 'rgba(201,169,110,0.12)', color: '#C9A96E' };
                        case 'login': return { icon: <LogIn size={14} />, bg: 'rgba(10,132,255,0.1)', color: '#0A84FF' };
                        case 'review': return { icon: <MessageSquare size={14} />, bg: 'rgba(48,209,88,0.1)', color: '#30D158' };
                        case 'refund': return { icon: <RefreshCcw size={14} />, bg: 'rgba(255,69,58,0.1)', color: '#FF453A' };
                        case 'address': return { icon: <MapPin size={14} />, bg: 'rgba(191,90,242,0.1)', color: '#BF5AF2' };
                        default: return { icon: <Activity size={14} />, bg: 'rgba(255,255,255,0.06)', color: '#AEAEB2' };
                    }
                };
                const config = getTypeConfig(item.type);

                return (
                    <div key={item.id} style={{ display: 'flex', gap: '12px', paddingBottom: '16px', position: 'relative' }}>
                        {!isLast && (
                            <div style={{ position: 'absolute', left: '15.5px', top: '32px', width: '1px', height: 'calc(100% - 16px)', background: 'rgba(255,255,255,0.04)' }} />
                        )}
                        <div style={{
                            width: '32px', height: '32px', borderRadius: '8px', background: config.bg, color: config.color,
                            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, zIndex: 1
                        }}>
                            {config.icon}
                        </div>
                        <div style={{ flex: 1, paddingTop: '4px' }}>
                            <div style={{ fontSize: '13px', color: '#F5F0EB', marginBottom: '2px' }}>{item.description}</div>
                            <div style={{ fontSize: '11px', color: '#636366' }}>{new Date(item.createdAt).toLocaleString('tr-TR')}</div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

function NoContent({ title, description }: { title: string, description: string }) {
    return (
        <div style={{ padding: '60px 20px', textAlign: 'center' }}>
            <div style={{ fontSize: '14px', fontWeight: 600, color: '#AEAEB2', marginBottom: '4px' }}>{title}</div>
            <div style={{ fontSize: '12px', color: '#636366' }}>{description}</div>
        </div>
    );
}

// ── Main Page Component ────────────────────────────────────────────────────
export default function CustomerDetailPage() {
    const params = useParams();
    const router = useRouter();
    const [customer, setCustomer] = useState<Customer | null>(null);
    const [activeTab, setActiveTab] = useState('siparisler');

    useEffect(() => {
        const found = mockCustomers.find(c => c.id === params.id);
        if (found) {
            setCustomer({ ...found });
        } else {
            router.push('/admin/musteriler');
        }
    }, [params.id, router]);

    if (!customer) return null;

    return (
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, ease: easeOut }}>
            {/* Back Button */}
            <button
                onClick={() => router.back()}
                style={{
                    display: 'flex', alignItems: 'center', gap: '8px', background: 'transparent', border: 'none',
                    color: '#636366', fontSize: '13px', cursor: 'pointer', marginBottom: '20px', padding: 0
                }}
                onMouseEnter={e => e.currentTarget.style.color = '#C9A96E'}
                onMouseLeave={e => e.currentTarget.style.color = '#636366'}
            >
                <ArrowLeft size={16} /> Müşteri Listesine Dön
            </button>

            <div style={{
                display: 'grid', gridTemplateColumns: '35% 1fr', gap: '24px', alignItems: 'flex-start'
            }} className="customer-detail-layout">

                {/* Left Column - Profile Sidebar */}
                <CustomerProfile customer={customer} />

                {/* Right Column - Tabbed Panels */}
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {/* Tab Bar */}
                    <div style={{
                        background: '#1C1C1E', border: '1px solid rgba(255,255,255,0.05)', borderBottom: 'none',
                        borderRadius: '8px 8px 0 0', display: 'flex', padding: '0 4px', overflowX: 'auto'
                    }}>
                        <TabBtn
                            id="siparisler" active={activeTab === 'siparisler'} onClick={setActiveTab}
                            label="Siparişler" icon={<ShoppingBag size={14} />} count={customer.totalOrders}
                        />
                        <TabBtn
                            id="yorumlar" active={activeTab === 'yorumlar'} onClick={setActiveTab}
                            label="Yorumlar" icon={<MessageSquare size={14} />} count={customer.reviews.length}
                        />
                        <TabBtn
                            id="notlar" active={activeTab === 'notlar'} onClick={setActiveTab}
                            label="Notlar" icon={<StickyNote size={14} />} count={customer.notes.length}
                        />
                        <TabBtn
                            id="aktivite" active={activeTab === 'aktivite'} onClick={setActiveTab}
                            label="Aktivite" icon={<Activity size={14} />}
                        />
                    </div>

                    {/* Tab Content */}
                    <div style={{
                        background: '#1C1C1E', border: '1px solid rgba(255,255,255,0.05)',
                        borderRadius: '0 0 8px 8px', minHeight: '400px'
                    }}>
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, x: 4 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -4 }}
                                transition={{ duration: 0.15 }}
                            >
                                {activeTab === 'siparisler' && <CustomerOrders orders={customer.orders} />}
                                {activeTab === 'yorumlar' && <CustomerReviews reviews={customer.reviews} />}
                                {activeTab === 'notlar' && <CustomerNotes notes={customer.notes} />}
                                {activeTab === 'aktivite' && <CustomerActivity log={customer.activityLog} />}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>

            <style jsx>{`
        @media (max-width: 1280px) {
          .customer-detail-layout {
            grid-template-columns: 38% 1fr !important;
          }
        }
        @media (max-width: 768px) {
          .customer-detail-layout {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
        </motion.div>
    );
}
