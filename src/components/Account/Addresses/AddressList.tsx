'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Pencil, Trash2, MapPin } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { AccountHeader } from '../AccountHeader';
import type { Address } from '@/types/account.types';

function AddressForm({ address, onSave, onCancel }: { address?: Address; onSave: (data: Omit<Address, 'id'>) => void; onCancel: () => void }) {
    const [form, setForm] = useState({
        label: address?.label || 'Ev',
        firstName: address?.firstName || '',
        lastName: address?.lastName || '',
        phone: address?.phone || '',
        address: address?.address || '',
        apartment: address?.apartment || '',
        city: address?.city || '',
        district: address?.district || '',
        postalCode: address?.postalCode || '',
        isDefault: address?.isDefault || false,
    });

    const update = (field: string, value: string | boolean) => setForm((f) => ({ ...f, [field]: value }));

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" onClick={onCancel} />
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="fixed z-50 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] max-w-[95vw] max-h-[90vh] overflow-y-auto p-6 bg-card border border-border shadow-2xl rounded-xl"
            >
                <h3 className="text-lg font-semibold mb-4 text-foreground font-serif" style={{ fontFamily: 'var(--font-playfair, serif)' }}>
                    {address ? 'Adresi Düzenle' : 'Yeni Adres Ekle'}
                </h3>

                <div className="space-y-3">
                    {/* Label */}
                    <div className="flex gap-2">
                        {['Ev', 'İş', 'Diğer'].map((l) => (
                            <button
                                key={l}
                                onClick={() => update('label', l)}
                                className={`px-4 py-2 text-[12px] font-medium rounded-full border transition-colors cursor-pointer ${form.label === l ? 'bg-foreground text-background border-foreground' : 'bg-transparent text-muted-foreground border-border hover:border-foreground'}`}
                            >
                                {l === 'Ev' ? '🏠' : l === 'İş' ? '💼' : '📍'} {l}
                            </button>
                        ))}
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <input value={form.firstName} onChange={(e) => update('firstName', e.target.value)} placeholder="Ad *" className="px-3 py-2.5 text-[13px] outline-none bg-muted border border-border rounded-md text-foreground focus:border-selis-gold transition-colors" />
                        <input value={form.lastName} onChange={(e) => update('lastName', e.target.value)} placeholder="Soyad *" className="px-3 py-2.5 text-[13px] outline-none bg-muted border border-border rounded-md text-foreground focus:border-selis-gold transition-colors" />
                    </div>
                    <input value={form.phone} onChange={(e) => update('phone', e.target.value)} placeholder="Telefon *" className="w-full px-3 py-2.5 text-[13px] outline-none bg-muted border border-border rounded-md text-foreground focus:border-selis-gold transition-colors" />
                    <textarea value={form.address} onChange={(e) => update('address', e.target.value)} placeholder="Adres *" rows={2} className="w-full px-3 py-2.5 text-[13px] outline-none resize-none bg-muted border border-border rounded-md text-foreground focus:border-selis-gold transition-colors" />
                    <input value={form.apartment} onChange={(e) => update('apartment', e.target.value)} placeholder="Daire / Kat (opsiyonel)" className="w-full px-3 py-2.5 text-[13px] outline-none bg-muted border border-border rounded-md text-foreground focus:border-selis-gold transition-colors" />
                    <div className="grid grid-cols-3 gap-3">
                        <input value={form.city} onChange={(e) => update('city', e.target.value)} placeholder="Şehir *" className="px-3 py-2.5 text-[13px] outline-none bg-muted border border-border rounded-md text-foreground focus:border-selis-gold transition-colors" />
                        <input value={form.district} onChange={(e) => update('district', e.target.value)} placeholder="İlçe *" className="px-3 py-2.5 text-[13px] outline-none bg-muted border border-border rounded-md text-foreground focus:border-selis-gold transition-colors" />
                        <input value={form.postalCode} onChange={(e) => update('postalCode', e.target.value)} placeholder="Posta Kodu" className="px-3 py-2.5 text-[13px] outline-none bg-muted border border-border rounded-md text-foreground focus:border-selis-gold transition-colors" />
                    </div>

                    <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" checked={form.isDefault} onChange={(e) => update('isDefault', e.target.checked)} className="accent-selis-gold" />
                        <span className="text-[12px] text-muted-foreground">Varsayılan adres olarak ayarla</span>
                    </label>
                </div>

                <div className="flex gap-3 mt-6">
                    <button onClick={onCancel} className="flex-1 py-2.5 text-[13px] font-medium border border-border rounded-md bg-card text-muted-foreground cursor-pointer hover:bg-muted transition-colors">İptal</button>
                    <button onClick={() => onSave(form)} className="flex-1 py-2.5 text-[13px] font-semibold bg-foreground text-background rounded-md border-none cursor-pointer hover:opacity-90 transition-opacity">Kaydet</button>
                </div>
            </motion.div>
        </motion.div>
    );
}

export function AddressList() {
    const addresses = useAuthStore((s) => s.addresses);
    const addAddress = useAuthStore((s) => s.addAddress);
    const updateAddress = useAuthStore((s) => s.updateAddress);
    const deleteAddress = useAuthStore((s) => s.deleteAddress);
    const setDefaultAddress = useAuthStore((s) => s.setDefaultAddress);

    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);

    const editing = editingId ? addresses.find((a) => a.id === editingId) : undefined;

    const handleSave = (data: Omit<Address, 'id'>) => {
        if (editingId) {
            updateAddress(editingId, data);
        } else {
            addAddress(data);
        }
        setShowForm(false);
        setEditingId(null);
    };

    const labelIcons: Record<string, string> = { Ev: '🏠', İş: '💼', Yazlık: '🏖️' };

    return (
        <div>
            <AccountHeader title="Adreslerim" breadcrumbs={[{ label: 'Adreslerim' }]} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {addresses.map((addr) => (
                    <div
                        key={addr.id}
                        className={`relative p-5 rounded-lg border-1.5 transition-colors ${addr.isDefault ? 'bg-selis-gold/5 border-selis-gold' : 'bg-card border-border'}`}
                    >
                        {addr.isDefault && (
                            <span className="absolute -top-2.5 left-4 px-2 py-0.5 text-[10px] font-bold rounded bg-selis-gold text-black">
                                Varsayılan
                            </span>
                        )}

                        <div className="flex items-center justify-between mb-2">
                            <span className="text-[13px] font-semibold text-foreground">
                                {labelIcons[addr.label] || '📍'} {addr.label}
                            </span>
                            <div className="flex items-center gap-2">
                                <button onClick={() => { setEditingId(addr.id); setShowForm(true); }} className="text-muted-foreground hover:text-foreground bg-transparent border-none cursor-pointer"><Pencil size={14} /></button>
                                <button onClick={() => deleteAddress(addr.id)} className="text-red-500 hover:text-red-600 bg-transparent border-none cursor-pointer"><Trash2 size={14} /></button>
                            </div>
                        </div>

                        <p className="text-[14px] font-medium mt-2 text-foreground">{addr.firstName} {addr.lastName}</p>
                        <p className="text-[12px] text-muted-foreground">{addr.phone}</p>
                        <p className="text-[13px] mt-2 leading-relaxed text-muted-foreground/80">
                            {addr.address}{addr.apartment && `, ${addr.apartment}`}
                            <br />{addr.district}, {addr.city} {addr.postalCode}
                        </p>

                        {!addr.isDefault && (
                            <button onClick={() => setDefaultAddress(addr.id)} className="text-[12px] font-medium mt-2 text-selis-gold hover:underline bg-transparent border-none cursor-pointer">
                                Varsayılan Yap
                            </button>
                        )}
                    </div>
                ))}

                {/* Add new card */}
                <motion.div
                    whileHover={{ borderColor: 'var(--selis-gold)', backgroundColor: 'rgba(201,169,110,0.05)' }}
                    onClick={() => { setEditingId(null); setShowForm(true); }}
                    className="flex flex-col items-center justify-center cursor-pointer p-8 border-2 border-dashed border-border rounded-lg min-h-[180px] transition-colors group"
                >
                    <Plus size={32} className="text-muted-foreground/30 group-hover:text-selis-gold transition-colors" />
                    <span className="text-[13px] font-medium mt-2 text-muted-foreground group-hover:text-selis-gold transition-colors">Yeni Adres Ekle</span>
                </motion.div>
            </div>

            <AnimatePresence>
                {showForm && (
                    <AddressForm
                        address={editing}
                        onSave={handleSave}
                        onCancel={() => { setShowForm(false); setEditingId(null); }}
                    />
                )}
            </AnimatePresence>
        </div>
    );
}
