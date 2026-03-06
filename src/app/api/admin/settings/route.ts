import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

function deepMerge(target: any, source: any) {
    for (const key in source) {
        if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
            if (!target[key]) target[key] = {};
            deepMerge(target[key], source[key]);
        } else {
            target[key] = source[key];
        }
    }
    return target;
}

// GET: Site ayarlarını getir (Public)
export async function GET() {
    return NextResponse.json({ success: true, message: "Minimal test" });
}

/*
// POST: Site ayarlarını güncelle (Admin/Authenticated)
export async function POST(req: Request) {
...
}
*/
