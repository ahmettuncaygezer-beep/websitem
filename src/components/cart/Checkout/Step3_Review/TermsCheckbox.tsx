'use client';

interface Props {
    checked: boolean;
    onChange: (val: boolean) => void;
}

export function TermsCheckbox({ checked, onChange }: Props) {
    return (
        <div className="p-4 bg-[#F9F9F9] border border-[#F0EDE8] rounded-lg">
            <label className="flex items-start gap-3 cursor-pointer group">
                <div className="relative flex items-center mt-0.5">
                    <input
                        type="checkbox"
                        checked={checked}
                        onChange={(e) => onChange(e.target.checked)}
                        className="w-4 h-4 rounded border-[#E0E0E0] text-[#C9A96E] focus:ring-[#C9A96E] cursor-pointer"
                    />
                </div>
                <span className="text-[12px] text-[#666] leading-relaxed">
                    <strong className="text-[#1C1C1E]">Ön Bilgilendirme Formu</strong>'nu ve <strong className="text-[#1C1C1E]">Mesafeli Satış Sözleşmesi</strong>'ni okudum, içeriğini anladım ve onaylıyorum.*
                </span>
            </label>
        </div>
    );
}
