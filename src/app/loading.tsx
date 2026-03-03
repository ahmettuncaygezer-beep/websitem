export default function Loading() {
    return (
        <div className="min-h-[80vh] flex items-center justify-center bg-[#FAFAF8] dark:bg-[#0D0D0F]">
            <div className="flex flex-col items-center gap-6">
                {/* Animated SELIS Logo Spinner */}
                <div className="relative w-16 h-16">
                    <div className="absolute inset-0 rounded-full border-2 border-[#E8E2DB] dark:border-[#2C2C2E]" />
                    <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-[#C9A96E] animate-spin" />
                </div>

                {/* Brand name */}
                <div className="flex flex-col items-center gap-2">
                    <span className="font-serif text-lg tracking-[0.3em] text-[#1C1C1E] dark:text-[#F5F0EB]">
                        SELIS
                    </span>
                    <span className="text-[11px] font-sans uppercase tracking-[0.2em] text-[#9C9590] dark:text-[#636366]">
                        Yükleniyor...
                    </span>
                </div>
            </div>
        </div>
    );
}
