import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { productId, productName, email, phone, channels } = body;

        // Validation
        if (!productId || !email) {
            return NextResponse.json({ error: 'productId ve email zorunlu' }, { status: 400 });
        }

        // TODO: Save to database (Supabase/Prisma)
        // await db.stockNotification.create({ data: { productId, productName, email, phone, channels } });

        console.log('[StockNotify] Kayıt:', { productId, productName, email, channels });

        return NextResponse.json(
            { success: true, message: 'Bildirim talebiniz alındı.' },
            { status: 201 }
        );
    } catch {
        return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 });
    }
}
