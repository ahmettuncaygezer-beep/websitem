'use client';

interface Props {
    data: any;
    onChange: (d: any) => void;
}

export function CreditCardForm({ data, onChange }: Props) {
    const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let val = e.target.value.replace(/\D/g, '').substring(0, 16);
        onChange({ number: val });
    };

    const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let val = e.target.value.replace(/\D/g, '').substring(0, 4);
        if (val.length >= 2) {
            val = val.substring(0, 2) + '/' + val.substring(2);
        }
        onChange({ expiry: val });
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <div className="md:col-span-2 space-y-1.5">
                <label className="text-[12px] font-bold text-[#666] uppercase tracking-wider">Kart Numarası*</label>
                <input
                    type="text"
                    value={data.number.match(/.{1,4}/g)?.join(' ') || ''}
                    onChange={handleNumberChange}
                    onFocus={() => onChange({ focused: 'number' })}
                    placeholder="0000 0000 0000 0000"
                    className="w-full px-4 py-3 bg-[#F9F9F9] border border-[#E0E0E0] rounded-[4px] text-[15px] font-mono tracking-wider focus:border-[#C9A96E] outline-none transition-all"
                />
            </div>

            <div className="md:col-span-2 space-y-1.5">
                <label className="text-[12px] font-bold text-[#666] uppercase tracking-wider">Kart Üzerindeki İsim*</label>
                <input
                    type="text"
                    value={data.name}
                    onChange={(e) => onChange({ name: e.target.value })}
                    onFocus={() => onChange({ focused: 'name' })}
                    placeholder="ALİ KAYA"
                    className="w-full px-4 py-3 bg-[#F9F9F9] border border-[#E0E0E0] rounded-[4px] text-[14px] uppercase tracking-widest focus:border-[#C9A96E] outline-none transition-all"
                />
            </div>

            <div className="space-y-1.5">
                <label className="text-[12px] font-bold text-[#666] uppercase tracking-wider">Son Kullanma*</label>
                <input
                    type="text"
                    value={data.expiry}
                    onChange={handleExpiryChange}
                    onFocus={() => onChange({ focused: 'expiry' })}
                    placeholder="AA/YY"
                    className="w-full px-4 py-3 bg-[#F9F9F9] border border-[#E0E0E0] rounded-[4px] text-[14px] focus:border-[#C9A96E] outline-none transition-all"
                />
            </div>

            <div className="space-y-1.5">
                <label className="text-[12px] font-bold text-[#666] uppercase tracking-wider">CVV*</label>
                <input
                    type="password"
                    maxLength={3}
                    value={data.cvv}
                    onChange={(e) => onChange({ cvv: e.target.value.substring(0, 3) })}
                    onFocus={() => onChange({ focused: 'cvv' })}
                    onBlur={() => onChange({ focused: '' })}
                    placeholder="•••"
                    className="w-full px-4 py-3 bg-[#F9F9F9] border border-[#E0E0E0] rounded-[4px] text-[14px] focus:border-[#C9A96E] outline-none transition-all"
                />
            </div>
        </div>
    );
}
