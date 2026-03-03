'use client';

interface Props {
    checked: boolean;
    onChange: (val: boolean) => void;
}

export function TermsCheckbox({ checked, onChange }: Props) {
    return (
        <div className="p-4 bg-muted/50 border border-border rounded-lg">
            <label className="flex items-start gap-3 cursor-pointer group">
                <div className="relative flex items-center mt-0.5">
                    <input
                        type="checkbox"
                        checked={checked}
                        onChange={(e) => onChange(e.target.checked)}
                        className="w-4 h-4 rounded border-border text-selis-gold focus:ring-selis-gold cursor-pointer"
                    />
                </div>
                <span className="text-[12px] text-muted-foreground leading-relaxed">
                    <strong className="text-foreground">Ön Bilgilendirme Formu</strong>'nu ve <strong className="text-foreground">Mesafeli Satış Sözleşmesi</strong>'ni okudum, içeriğini anladım ve onaylıyorum.*
                </span>
            </label>
        </div>
    );
}
