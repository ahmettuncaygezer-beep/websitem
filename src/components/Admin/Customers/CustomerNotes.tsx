'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, User, Send } from 'lucide-react';
import { type CustomerNote } from '@/lib/mock/customers';

interface CustomerNotesProps {
    notes: CustomerNote[];
}

export function CustomerNotes({ notes: initialNotes }: CustomerNotesProps) {
    const [notes, setNotes] = useState(initialNotes);
    const [newNote, setNewNote] = useState('');

    const handleAddNote = () => {
        if (!newNote.trim()) return;
        const note: CustomerNote = {
            id: Math.random().toString(36).substr(2, 9),
            content: newNote,
            createdBy: 'Admin',
            createdAt: new Date().toISOString()
        };
        setNotes([note, ...notes]);
        setNewNote('');
    };

    const handleDeleteNote = (id: string) => {
        setNotes(notes.filter(n => n.id !== id));
    };

    return (
        <div style={{ padding: '20px' }}>
            {/* Input Area */}
            <div style={{ marginBottom: '24px' }}>
                <textarea
                    value={newNote}
                    onChange={e => setNewNote(e.target.value)}
                    placeholder="Müşteri hakkında not ekle..."
                    style={{
                        width: '100%', minHeight: '80px', background: 'rgba(255,255,255,0.04)',
                        border: '1px solid rgba(255,255,255,0.08)', borderRadius: '6px', padding: '12px',
                        fontSize: '13px', color: '#F5F0EB', outline: 'none', resize: 'none', transition: 'border-color 150ms'
                    }}
                    onFocus={e => e.currentTarget.style.borderColor = 'rgba(201,169,110,0.5)'}
                    onBlur={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'}
                />
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
                    <button
                        onClick={handleAddNote}
                        disabled={!newNote.trim()}
                        style={{
                            background: 'rgba(201,169,110,0.1)', border: '1px solid rgba(201,169,110,0.2)',
                            borderRadius: '6px', padding: '7px 16px', fontSize: '12px', color: '#C9A96E',
                            cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', opacity: !newNote.trim() ? 0.5 : 1
                        }}
                    >
                        <Send size={14} /> Not Ekle
                    </button>
                </div>
            </div>

            {/* Notes List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <AnimatePresence initial={false}>
                    {notes.map((note) => (
                        <motion.div
                            key={note.id}
                            initial={{ opacity: 0, y: -8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.2 }}
                            style={{ display: 'flex', gap: '12px', position: 'relative' }}
                            className="note-item"
                        >
                            <div style={{
                                width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(255,255,255,0.06)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#636366', flexShrink: 0
                            }}>
                                <User size={16} />
                            </div>
                            <div style={{ flex: 1, minWidth: 0 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                                    <div style={{ fontSize: '12px', fontWeight: 500, color: '#F5F0EB' }}>{note.createdBy}</div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <span style={{ fontSize: '11px', color: '#636366' }}>{new Date(note.createdAt).toLocaleDateString('tr-TR')}</span>
                                        <button
                                            onClick={() => handleDeleteNote(note.id)}
                                            className="delete-btn"
                                            style={{
                                                background: 'transparent', border: 'none', color: '#636366', cursor: 'pointer',
                                                padding: '2px', transition: 'color 150ms'
                                            }}
                                            onMouseEnter={e => e.currentTarget.style.color = '#FF453A'}
                                            onMouseLeave={e => e.currentTarget.style.color = '#636366'}
                                        >
                                            <Trash2 size={12} />
                                        </button>
                                    </div>
                                </div>
                                <div style={{ fontSize: '13px', color: '#AEAEB2', lineHeight: 1.6 }}>
                                    {note.content}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
                {notes.length === 0 && (
                    <div style={{ padding: '20px', textAlign: 'center', fontSize: '12px', color: '#636366' }}>
                        Bu müşteri için henüz bir not eklenmemiş.
                    </div>
                )}
            </div>
        </div>
    );
}
