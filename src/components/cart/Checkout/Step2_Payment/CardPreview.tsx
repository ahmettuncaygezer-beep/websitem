'use client';

import { motion, AnimatePresence } from 'framer-motion';

interface Props {
    data: {
        number: string;
        name: string;
        expiry: string;
        cvv: string;
        focused: string;
    };
}

export function CardPreview({ data }: Props) {
    const isFlipped = data.focused === 'cvv';

    const formatNumber = (num: string) => {
        const clear = num.replace(/\D/g, '');
        return clear.padEnd(16, '•').match(/.{1,4}/g)?.join(' ') || '•••• •••• •••• ••••';
    };

    return (
        <div className="perspective-1000 w-full max-w-[340px] aspect-[1.58/1]">
            <motion.div
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ type: 'spring', damping: 20, stiffness: 100 }}
                className="relative w-full h-full preserve-3d shadow-2xl rounded-xl cursor-default"
            >
                {/* Front */}
                <div className="absolute inset-0 backface-hidden bg-gradient-to-br from-[#1C1C1E] to-[#3A3A3D] rounded-xl p-6 text-white flex flex-col justify-between border border-white/10">
                    <div className="flex justify-between items-start">
                        <div className="w-10 h-8 bg-gradient-to-tr from-amber-200 to-amber-500 rounded-md opacity-80" />
                        <div className="text-[14px] font-bold italic tracking-tighter opacity-80">SELIS GOLD</div>
                    </div>

                    <div className="space-y-1">
                        <p className="text-[10px] text-white/40 font-bold tracking-widest uppercase">Kart Numarası</p>
                        <p className="text-[18px] sm:text-[20px] font-mono tracking-[0.15em] text-white/90">
                            {formatNumber(data.number)}
                        </p>
                    </div>

                    <div className="flex justify-between items-end">
                        <div className="space-y-1">
                            <p className="text-[8px] text-white/40 font-bold tracking-widest uppercase">Kart Sahibi</p>
                            <p className="text-[12px] font-bold tracking-wider uppercase truncate max-w-[180px]">
                                {data.name || 'AD SOYAD'}
                            </p>
                        </div>
                        <div className="space-y-1 text-right">
                            <p className="text-[8px] text-white/40 font-bold tracking-widest uppercase">Son Kul.</p>
                            <p className="text-[12px] font-bold tracking-wider">{data.expiry || '00/00'}</p>
                        </div>
                    </div>
                </div>

                {/* Back */}
                <div
                    className="absolute inset-0 backface-hidden bg-gradient-to-br from-[#1C1C1E] to-[#3A3A3D] rounded-xl text-white flex flex-col justify-between py-6 border border-white/10"
                    style={{ transform: 'rotateY(180deg)' }}
                >
                    <div className="w-full h-10 bg-black mt-2" />
                    <div className="px-6">
                        <p className="text-[8px] text-white/40 font-bold tracking-widest uppercase mb-1">Güvenlik Kodu</p>
                        <div className="h-8 bg-white/10 rounded flex items-center justify-end px-3">
                            <p className="text-[14px] font-bold tracking-widest">{data.cvv || '•••'}</p>
                        </div>
                    </div>
                    <div className="px-6 pb-2 opacity-20 text-[6px]">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
