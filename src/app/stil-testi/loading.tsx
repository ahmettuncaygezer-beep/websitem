export default function Loading() {
    return (
        <div className="min-h-screen bg-[#F5F0EB] flex flex-col items-center justify-center p-6 text-center">
            <div className="w-16 h-16 border-4 border-[#C9A96E] border-t-transparent rounded-full animate-spin mb-6" />
            <h2 className="text-2xl font-serif text-[#1C1C1E] mb-2 italic">Yükleniyor...</h2>
            <p className="text-[#666] font-light italic">MAISON Stil Dünyasına Hoş Geldiniz.</p>
        </div>
    );
}
