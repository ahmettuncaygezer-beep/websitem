import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

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
    const defaultSettings = {
        cms_colors: {
            primary: "#C9A96E",
            primaryDark: "#B8915A",
            background: "#F5F0EB",
            text: "#1C1C1E"
        },
        cms_hero: {
            title: "",
            subtitle: "",
            image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=2000&auto=format"
        },
        cms_footer: {
            description: "Premium mobilya ve ev dekorasyonu. Evinizin yeni hikayesini birlikte yazalım.",
            showNewsletter: true
        },
        site_info: {
            siteName: "SELIS",
            siteSlogan: "HOME CONCEPT",
            siteDescription: "SELIS HOME CONCEPT, premium mobilya ve iç mimarlık çözümleri sunan lüks bir markadır.",
            contactEmail: "info@selis.com.tr",
            contactPhone: "+90 212 555 00 00",
            supportEmail: "destek@selis.com.tr",
            logo: "/assets/logo-dark.svg",
            favicon: "/favicon.ico",
            address: { full: "", city: "", district: "" }
        },
        site_social: {
            instagram: "https://instagram.com/selishome",
            facebook: "https://facebook.com/selishome",
            whatsapp: "https://wa.me/905555555555",
            youtube: "",
            twitter: ""
        },
        site_seo: {
            metaTitle: "SELIS HOME CONCEPT | Lüks ve Modern Mobilya Tasarımları",
            metaDescription: "Yaşam alanlarınıza değer katan, el işçiliği ve modern tasarımın buluştuğu lüks mobilya koleksiyonları.",
            ogImage: "/og-image.jpg"
        },
        site_localization: {
            currency: "TRY",
            currencyFormat: "1.247,50 ₺",
            defaultLanguage: "tr",
            timezone: "Europe/Istanbul (UTC+3)",
            dateFormat: "GG/AA/YYYY"
        },
        payment_iyzico: {
            enabled: true,
            environment: 'sandbox',
            sandboxApiKey: '',
            sandboxSecretKey: '',
            liveApiKey: '',
            liveSecretKey: ''
        },
        payment_bank_transfer: {
            enabled: true,
            accounts: [],
            customerMessage: 'Lütfen açıklama kısmına sipariş numaranızı yazınız.'
        },
        payment_cash_on_delivery: {
            enabled: true,
            extraFee: 0,
            minOrderAmount: 0,
            allowedCities: []
        },
        payment_installments: {
            enabled: true,
            minAmount: 1000,
            banks: {}
        },
        shipping_settings: {
            carriers: [],
            freeShippingThreshold: 5000,
            freeShippingEnabled: true,
            weightRules: [],
            deliveryTimes: {
                inCity: [1, 3],
                outOfCity: [3, 5],
                eastRegion: [5, 8]
            },
            customerNote: 'Siparişleriniz %100 sigortalı ve korumalı paketlenerek gönderilir.'
        },
        notification_settings: {
            adminEmails: [],
            emailNotifications: {
                'new_order': true,
                'order_status': true,
                'low_stock': true,
                'new_customer': false,
                'failed_login': true
            },
            sms: {
                enabled: true,
                provider: 'netgsm',
                username: '',
                password: '',
                senderName: '',
                events: {
                    'customer_order_confirm': true,
                    'customer_shipping': true,
                    'admin_critical_stock': false
                }
            }
        },
        maintenanceMode: {
            enabled: false,
            message: 'Sitemizi geliştiriyoruz. Kısa süre içinde geri döneceğiz.',
            allowedIps: []
        }
    };

    try {
        const { data, error } = await supabase
            .from('site_settings')
            .select('*');

        if (error) throw error;

        // Convert array of {key, value} to a single object
        const settings = data.reduce((acc: Record<string, any>, curr: any) => {
            acc[curr.key] = curr.value;
            return acc;
        }, {});

        // Use deep merge for nested settings (like site_info)
        const finalSettings = deepMerge({ ...defaultSettings }, settings);

        return NextResponse.json(finalSettings);
    } catch (err) {
        console.error('Error fetching site settings, falling back to defaults:', err);
        return NextResponse.json(defaultSettings);
    }
}

// POST: Site ayarlarını güncelle (Admin/Authenticated)
export async function POST(req: Request) {
    try {
        const body = await req.json();

        // Handle batch updates (array of {key, value})
        if (Array.isArray(body)) {
            const promises = body.map(item => {
                if (!item.key || item.value === undefined) return Promise.resolve();
                return supabase
                    .from('site_settings')
                    .upsert({ key: item.key, value: item.value, updated_at: new Date().toISOString() });
            });

            await Promise.all(promises);
            return NextResponse.json({ success: true });
        }

        // Handle single update
        const { key, value } = body;
        if (!key || value === undefined) {
            return NextResponse.json({ error: 'Gerekli alanlar eksik' }, { status: 400 });
        }

        const { data, error } = await supabase
            .from('site_settings')
            .upsert({ key, value, updated_at: new Date().toISOString() })
            .select()
            .single();

        if (error) throw error;

        return NextResponse.json({ success: true, setting: data });
    } catch (err) {
        console.error('Error updating site settings:', err);
        return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 });
    }
}
