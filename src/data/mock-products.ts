import { Product } from '@/types';

export const mockProducts: Product[] = [
    {
        id: '1',
        name: 'Luna Köşe Koltuk',
        nameKey: 'prod_name_luna_sofa',
        slug: 'luna-kose-koltuk',
        description: 'Bouclé kumaşıyla kaplı, yumuşak hatlarıyla salonunuza zarafet katan modüler köşe koltuk. Doğal meşe ayakları ve yüksek yoğunluklu sünger dolgusu ile üstün konfor sunar.',
        descriptionKey: 'prod_desc_luna_sofa',
        price: 89990,
        salePrice: 74990,
        categoryId: '1',
        categorySlug: 'oturma-odasi',
        images: ['/images/products/luna-sofa-1.jpg', '/images/products/luna-sofa-2.jpg', '/images/products/luna-sofa-3.jpg'],
        lifestyleImage: '/images/products/luna-sofa-lifestyle.jpg',
        colors: [
            { name: 'Kum Beji', hex: '#D4C5B2' },
            { name: 'Antrasit', hex: '#3C3C3C' },
            { name: 'Adaçayı', hex: '#8B9E82' },
        ],
        materials: ['Bouclé', 'Meşe'],
        dimensions: { width: 320, height: 85, depth: 180, unit: 'cm' },
        stock: 12,
        featured: true,
        isNew: true,
        brand: 'MAISON Atelier',
    },
    {
        id: '2',
        name: 'Aria Berjer',
        nameKey: 'prod_name_aria_chair',
        slug: 'aria-berjer',
        description: 'İtalyan tasarımından ilham alan, keten kumaşlı berjer koltuk. Ceviz ağacı iskelet üzerine el işçiliğiyle üretilmiştir.',
        descriptionKey: 'prod_desc_aria_chair',
        price: 34990,
        categoryId: '1',
        categorySlug: 'oturma-odasi',
        images: ['/images/products/aria-chair-1.jpg', '/images/products/aria-chair-2.jpg'],
        lifestyleImage: '/images/products/aria-chair-lifestyle.jpg',
        colors: [
            { name: 'Keten Beyaz', hex: '#F5F0EB' },
            { name: 'Terakota', hex: '#C67D5B' },
        ],
        materials: ['Keten', 'Ceviz'],
        dimensions: { width: 78, height: 95, depth: 82, unit: 'cm' },
        stock: 8,
        featured: true,
        brand: 'MAISON Atelier',
    },
    {
        id: '3',
        name: 'Nova Yemek Masası',
        nameKey: 'prod_name_nova_table',
        slug: 'nova-yemek-masasi',
        description: 'Masif meşe ağacından üretilen, 8 kişilik premium yemek masası. Doğal ahşap damarlarıyla her parça kendine özgüdür.',
        descriptionKey: 'prod_desc_nova_table',
        price: 45990,
        categoryId: '3',
        categorySlug: 'yemek-odasi',
        images: ['/images/products/nova-table-1.jpg', '/images/products/nova-table-2.jpg'],
        lifestyleImage: '/images/products/nova-table-lifestyle.jpg',
        colors: [
            { name: 'Doğal Meşe', hex: '#C4A265' },
            { name: 'Koyu Ceviz', hex: '#5C4033' },
        ],
        materials: ['Meşe'],
        dimensions: { width: 220, height: 76, depth: 100, unit: 'cm' },
        stock: 5,
        featured: true,
        brand: 'MAISON',
    },
    {
        id: '4',
        name: 'Zen Yatak Başlığı',
        nameKey: 'prod_name_zen_bed',
        slug: 'zen-yatak-basligi',
        description: 'Kadife kumaşlı, baton dikişli premium yatak başlığı. Sıcak ve lüks bir yatak odası atmosferi yaratır.',
        descriptionKey: 'prod_desc_zen_bed',
        price: 28990,
        categoryId: '2',
        categorySlug: 'yatak-odasi',
        images: ['/images/products/zen-bed-1.jpg', '/images/products/zen-bed-2.jpg'],
        lifestyleImage: '/images/products/zen-bed-lifestyle.jpg',
        colors: [
            { name: 'Gri Kadife', hex: '#9E9E9E' },
            { name: 'Bej Kadife', hex: '#D4C5B2' },
            { name: 'Mavi', hex: '#7B9EB8' },
        ],
        materials: ['Kadife'],
        dimensions: { width: 180, height: 130, depth: 12, unit: 'cm' },
        stock: 15,
        featured: false,
        isNew: true,
        brand: 'MAISON',
    },
    {
        id: '5',
        name: 'Orbit Sehpa',
        nameKey: 'prod_name_orbit_table',
        slug: 'orbit-sehpa',
        description: 'Mermer tablalı ve mat altın metal ayaklı minimalist orta sehpa. Modern oturma odaları için zarif bir tamamlayıcı.',
        descriptionKey: 'prod_desc_orbit_table',
        price: 18990,
        categoryId: '1',
        categorySlug: 'oturma-odasi',
        images: ['/images/products/orbit-table-1.jpg', '/images/products/orbit-table-2.jpg'],
        lifestyleImage: '/images/products/orbit-table-lifestyle.jpg',
        colors: [
            { name: 'Beyaz Mermer', hex: '#FAFAFA' },
            { name: 'Yeşil Mermer', hex: '#5B7B6B' },
        ],
        materials: ['Mermer', 'Metal'],
        dimensions: { width: 90, height: 40, depth: 90, unit: 'cm' },
        stock: 20,
        featured: true,
        brand: 'MAISON',
    },
    {
        id: '6',
        name: 'Aura Lambader',
        nameKey: 'prod_name_aura_lamp',
        slug: 'aura-lambader',
        description: 'El yapımı keten abajurlu, mat siyah metal gövdeli premium lambader. Yumuşak ve sıcak bir aydınlatma sunar.',
        descriptionKey: 'prod_desc_aura_lamp',
        price: 12990,
        categoryId: '5',
        categorySlug: 'aydinlatma',
        images: ['/images/products/aura-lamp-1.jpg', '/images/products/aura-lamp-2.jpg'],
        lifestyleImage: '/images/products/aura-lamp-lifestyle.jpg',
        colors: [
            { name: 'Mat Siyah', hex: '#2C2C2C' },
            { name: 'Mat Altın', hex: '#C4A265' },
        ],
        materials: ['Metal', 'Keten'],
        dimensions: { width: 45, height: 170, depth: 45, unit: 'cm' },
        stock: 25,
        featured: false,
        isNew: true,
        brand: 'MAISON Luce',
    },
    {
        id: '7',
        name: 'Serene İkili Koltuk',
        nameKey: 'prod_name_serene_sofa',
        slug: 'serene-ikili-koltuk',
        description: 'Bouclé kumaşıyla kaplı, yuvarlak hatları ve derin oturma alanı ile maksimum konforu sunan ikili koltuk.',
        descriptionKey: 'prod_desc_serene_sofa',
        price: 52990,
        salePrice: 44990,
        categoryId: '1',
        categorySlug: 'oturma-odasi',
        images: ['/images/products/serene-sofa-1.jpg', '/images/products/serene-sofa-2.jpg'],
        lifestyleImage: '/images/products/serene-sofa-lifestyle.jpg',
        colors: [
            { name: 'Krem', hex: '#F5F0EB' },
            { name: 'Gri', hex: '#9E9E9E' },
        ],
        materials: ['Bouclé', 'Meşe'],
        dimensions: { width: 195, height: 82, depth: 95, unit: 'cm' },
        stock: 7,
        featured: true,
        brand: 'MAISON Atelier',
    },
    {
        id: '8',
        name: 'Botanica Vazo Seti',
        slug: 'botanica-vazo-seti',
        description: 'El yapımı seramik vazo seti. Mat yüzeyi ve organik formlarıyla doğadan ilham alan dekoratif obje.',
        price: 4990,
        categoryId: '6',
        categorySlug: 'dekorasyon',
        images: ['/images/products/botanica-vase-1.jpg', '/images/products/botanica-vase-2.jpg'],
        lifestyleImage: '/images/products/botanica-vase-lifestyle.jpg',
        colors: [
            { name: 'Terakota', hex: '#C67D5B' },
            { name: 'Kum', hex: '#D4C5B2' },
            { name: 'Adaçayı', hex: '#8B9E82' },
        ],
        materials: ['Seramik'],
        dimensions: { width: 15, height: 30, depth: 15, unit: 'cm' },
        stock: 40,
        featured: false,
        isNew: true,
        brand: 'MAISON Casa',
    },
    {
        id: '9',
        name: 'Oslo Çalışma Masası',
        slug: 'oslo-calisma-masasi',
        description: 'İskandinav tasarımından ilham alan, masif meşe tablalı ve mat siyah metal ayaklı modern çalışma masası.',
        price: 24990,
        categoryId: '4',
        categorySlug: 'calisma-odasi',
        images: ['/images/products/oslo-desk-1.jpg', '/images/products/oslo-desk-2.jpg'],
        lifestyleImage: '/images/products/oslo-desk-lifestyle.jpg',
        colors: [
            { name: 'Doğal Meşe', hex: '#C4A265' },
        ],
        materials: ['Meşe', 'Metal'],
        dimensions: { width: 140, height: 76, depth: 65, unit: 'cm' },
        stock: 10,
        featured: true,
        brand: 'MAISON',
    },
    {
        id: '10',
        name: 'Como Sandalye',
        slug: 'como-sandalye',
        description: 'İtalyan deri döşemeli, masif ceviz iskeletli premium yemek sandalyesi. Ergonomik tasarımıyla uzun oturumlarda bile konfor sunar.',
        price: 8990,
        categoryId: '3',
        categorySlug: 'yemek-odasi',
        images: ['/images/products/como-chair-1.jpg', '/images/products/como-chair-2.jpg'],
        lifestyleImage: '/images/products/como-chair-lifestyle.jpg',
        colors: [
            { name: 'Koyu Kahve', hex: '#5C4033' },
            { name: 'Bej', hex: '#D4C5B2' },
        ],
        materials: ['Deri', 'Ceviz'],
        dimensions: { width: 52, height: 85, depth: 55, unit: 'cm' },
        stock: 30,
        featured: false,
        brand: 'MAISON',
    },
    {
        id: '11',
        name: 'Celestia Avize',
        slug: 'celestia-avize',
        description: 'Mat altın kaplama, minimal çizgileriyle modern mekanlara sofistike bir dokunuş katan lüks avize.',
        price: 22990,
        categoryId: '5',
        categorySlug: 'aydinlatma',
        images: ['/images/products/celestia-chandelier-1.jpg', '/images/products/celestia-chandelier-2.jpg'],
        lifestyleImage: '/images/products/celestia-chandelier-lifestyle.jpg',
        colors: [
            { name: 'Mat Altın', hex: '#C4A265' },
            { name: 'Mat Siyah', hex: '#2C2C2C' },
        ],
        materials: ['Metal'],
        dimensions: { width: 80, height: 45, depth: 80, unit: 'cm' },
        stock: 6,
        featured: true,
        isNew: true,
        brand: 'MAISON Luce',
    },
    {
        id: '12',
        name: 'Terra Halı',
        slug: 'terra-hali',
        description: 'El dokuması yün halı. Doğal tonları ve yumuşak dokusuyla mekanınıza sıcaklık katar. Her parça benzersizdir.',
        price: 15990,
        categoryId: '6',
        categorySlug: 'dekorasyon',
        images: ['/images/products/terra-rug-1.jpg', '/images/products/terra-rug-2.jpg'],
        lifestyleImage: '/images/products/terra-rug-lifestyle.jpg',
        colors: [
            { name: 'Doğal', hex: '#D4C5B2' },
            { name: 'Antrasit', hex: '#3C3C3C' },
        ],
        materials: ['Keten'],
        dimensions: { width: 200, height: 1, depth: 300, unit: 'cm' },
        stock: 14,
        featured: false,
        brand: 'MAISON Casa',
    },
    {
        "id": "selis-2574",
        "name": "Charisma Yemek Odası Grubu",
        "slug": "charisma-yemek-odasi-grubu",
        "description": "",
        "price": 0,
        "categoryId": "3",
        "categorySlug": "yemek-odasi",
        "images": [
            "https://selishome.com/wp-content/uploads/2025/07/1-2-2-scaled.jpeg",
            "https://selishome.com/wp-content/uploads/2025/07/2-2-scaled.jpeg",
            "https://selishome.com/wp-content/uploads/2025/07/3-2-scaled.jpeg",
            "https://selishome.com/wp-content/uploads/2025/07/4-2-scaled.jpeg",
            "https://selishome.com/wp-content/uploads/2025/07/5-2-scaled.jpeg",
            "https://selishome.com/wp-content/uploads/2025/07/6-2-scaled.jpeg",
            "https://selishome.com/wp-content/uploads/2025/07/7-2-scaled.jpeg",
            "https://selishome.com/wp-content/uploads/2025/07/8-2-scaled.jpeg",
            "https://selishome.com/wp-content/uploads/2025/07/9-2-scaled.jpeg",
            "https://selishome.com/wp-content/uploads/2025/07/10-2-scaled.jpeg",
            "https://selishome.com/wp-content/uploads/2025/07/11-2-scaled.jpeg",
            "https://selishome.com/wp-content/uploads/2025/07/12-2-scaled.jpeg",
            "https://selishome.com/wp-content/uploads/2025/07/13-1-scaled.jpeg",
            "https://selishome.com/wp-content/uploads/2025/07/14-1-scaled.jpeg",
            "https://selishome.com/wp-content/uploads/2025/07/15-1-scaled.jpeg",
            "https://selishome.com/wp-content/uploads/2025/07/16-1-scaled.jpeg",
            "https://selishome.com/wp-content/uploads/2025/07/17-1-scaled.jpeg",
            "https://selishome.com/wp-content/uploads/2025/07/18-1-scaled.jpeg",
            "https://selishome.com/wp-content/uploads/2025/07/19-1-scaled.jpeg",
            "https://selishome.com/wp-content/uploads/2025/07/20-1-scaled.jpeg"
        ],
        "colors": [
            {
                "name": "Standart",
                "hex": "#D4C5B2"
            }
        ],
        "materials": [
            "Ahşap"
        ],
        "dimensions": {
            "width": 0,
            "height": 0,
            "depth": 0,
            "unit": "cm"
        },
        "stock": 10,
        "featured": false,
        "brand": "SelisHome"
    },
    {
        "id": "selis-2565",
        "name": "Venedik Yemek Odası Grubu",
        "slug": "venedik-yemek-odasi-grubu-2",
        "description": "",
        "price": 0,
        "categoryId": "3",
        "categorySlug": "yemek-odasi",
        "images": [
            "https://selishome.com/wp-content/uploads/2025/07/1-11-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/07/2-11-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/07/3-11-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/07/4-11-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/07/5-11-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/07/6-10.jpg"
        ],
        "colors": [
            {
                "name": "Standart",
                "hex": "#D4C5B2"
            }
        ],
        "materials": [
            "Ahşap"
        ],
        "dimensions": {
            "width": 0,
            "height": 0,
            "depth": 0,
            "unit": "cm"
        },
        "stock": 10,
        "featured": false,
        "brand": "SelisHome"
    },
    {
        "id": "selis-2548",
        "name": "Oslo Oturma Grubu",
        "slug": "oslo-oturma-grubu-2",
        "description": "",
        "price": 0,
        "categoryId": "1",
        "categorySlug": "oturma-odasi",
        "images": [
            "https://selishome.com/wp-content/uploads/2025/07/2-10.jpg",
            "https://selishome.com/wp-content/uploads/2025/07/3-10.jpg",
            "https://selishome.com/wp-content/uploads/2025/07/4-10.jpg",
            "https://selishome.com/wp-content/uploads/2025/07/5-10.jpg",
            "https://selishome.com/wp-content/uploads/2025/07/6-9.jpg",
            "https://selishome.com/wp-content/uploads/2025/07/7-9.jpg",
            "https://selishome.com/wp-content/uploads/2025/07/8-8.jpg",
            "https://selishome.com/wp-content/uploads/2025/07/9-7.jpg",
            "https://selishome.com/wp-content/uploads/2025/07/10-6.jpg",
            "https://selishome.com/wp-content/uploads/2025/07/11-2.jpg",
            "https://selishome.com/wp-content/uploads/2025/07/12-2.jpg",
            "https://selishome.com/wp-content/uploads/2025/07/13-2.jpg",
            "https://selishome.com/wp-content/uploads/2025/07/14-1.jpg",
            "https://selishome.com/wp-content/uploads/2025/07/15-1.jpg",
            "https://selishome.com/wp-content/uploads/2025/07/16.jpg"
        ],
        "colors": [
            {
                "name": "Standart",
                "hex": "#D4C5B2"
            }
        ],
        "materials": [
            "Ahşap"
        ],
        "dimensions": {
            "width": 0,
            "height": 0,
            "depth": 0,
            "unit": "cm"
        },
        "stock": 10,
        "featured": false,
        "brand": "SelisHome"
    },
    {
        "id": "selis-2536",
        "name": "Vizyon Oturma Grubu",
        "slug": "vizyon-oturma-grubu-2",
        "description": "",
        "price": 0,
        "categoryId": "1",
        "categorySlug": "oturma-odasi",
        "images": [
            "https://selishome.com/wp-content/uploads/2025/07/1-10.jpg",
            "https://selishome.com/wp-content/uploads/2025/07/2-9.jpg",
            "https://selishome.com/wp-content/uploads/2025/07/3-9.jpg",
            "https://selishome.com/wp-content/uploads/2025/07/4-9.jpg",
            "https://selishome.com/wp-content/uploads/2025/07/5-9.jpg",
            "https://selishome.com/wp-content/uploads/2025/07/6-8.jpg",
            "https://selishome.com/wp-content/uploads/2025/07/7-8.jpg",
            "https://selishome.com/wp-content/uploads/2025/07/8-7.jpg",
            "https://selishome.com/wp-content/uploads/2025/07/9-6.jpg",
            "https://selishome.com/wp-content/uploads/2025/07/10-5.jpg"
        ],
        "colors": [
            {
                "name": "Standart",
                "hex": "#D4C5B2"
            }
        ],
        "materials": [
            "Ahşap"
        ],
        "dimensions": {
            "width": 0,
            "height": 0,
            "depth": 0,
            "unit": "cm"
        },
        "stock": 10,
        "featured": false,
        "brand": "SelisHome"
    },
    {
        "id": "selis-2533",
        "name": "Sembol Mutfak Takımı",
        "slug": "sembol-mutfak-takimi-2",
        "description": "",
        "price": 0,
        "categoryId": "3",
        "categorySlug": "yemek-odasi",
        "images": [
            "https://selishome.com/wp-content/uploads/2025/07/WhatsApp-Gorsel-2025-07-14-saat-09.40.17_5f9c56dc-1.jpg"
        ],
        "colors": [
            {
                "name": "Standart",
                "hex": "#D4C5B2"
            }
        ],
        "materials": [
            "Ahşap"
        ],
        "dimensions": {
            "width": 0,
            "height": 0,
            "depth": 0,
            "unit": "cm"
        },
        "stock": 10,
        "featured": false,
        "brand": "SelisHome"
    },
    {
        "id": "selis-2523",
        "name": "Polo Köşe Koltuk Grubu",
        "slug": "polo-kose-koltuk-grubu-2",
        "description": "",
        "price": 0,
        "categoryId": "1",
        "categorySlug": "oturma-odasi",
        "images": [
            "https://selishome.com/wp-content/uploads/2025/07/1-9.jpg",
            "https://selishome.com/wp-content/uploads/2025/07/2-8.jpg",
            "https://selishome.com/wp-content/uploads/2025/07/3-8.jpg",
            "https://selishome.com/wp-content/uploads/2025/07/4-8.jpg",
            "https://selishome.com/wp-content/uploads/2025/07/5-8.jpg",
            "https://selishome.com/wp-content/uploads/2025/07/6-7.jpg",
            "https://selishome.com/wp-content/uploads/2025/07/7-7.jpg",
            "https://selishome.com/wp-content/uploads/2025/07/8-6.jpg"
        ],
        "colors": [
            {
                "name": "Standart",
                "hex": "#D4C5B2"
            }
        ],
        "materials": [
            "Ahşap"
        ],
        "dimensions": {
            "width": 0,
            "height": 0,
            "depth": 0,
            "unit": "cm"
        },
        "stock": 10,
        "featured": false,
        "brand": "SelisHome"
    },
    {
        "id": "selis-2520",
        "name": "Natura Mutfak Takımı",
        "slug": "natura-mutfak-takimi",
        "description": "",
        "price": 0,
        "categoryId": "3",
        "categorySlug": "yemek-odasi",
        "images": [
            "https://selishome.com/wp-content/uploads/2025/07/WhatsApp-Gorsel-2025-07-14-saat-09.40.41_c995f3e0.jpg"
        ],
        "colors": [
            {
                "name": "Standart",
                "hex": "#D4C5B2"
            }
        ],
        "materials": [
            "Ahşap"
        ],
        "dimensions": {
            "width": 0,
            "height": 0,
            "depth": 0,
            "unit": "cm"
        },
        "stock": 10,
        "featured": false,
        "brand": "SelisHome"
    },
    {
        "id": "selis-2493",
        "name": "Elita Lux Köşe Koltuk Grubu",
        "slug": "elita-lux-kose-koltuk-grubu",
        "description": "",
        "price": 0,
        "categoryId": "1",
        "categorySlug": "oturma-odasi",
        "images": [
            "https://selishome.com/wp-content/uploads/2025/07/1-7.jpg",
            "https://selishome.com/wp-content/uploads/2025/07/2-6.jpg",
            "https://selishome.com/wp-content/uploads/2025/07/3-6.jpg",
            "https://selishome.com/wp-content/uploads/2025/07/4-6.jpg",
            "https://selishome.com/wp-content/uploads/2025/07/5-6.jpg",
            "https://selishome.com/wp-content/uploads/2025/07/6-5.jpg",
            "https://selishome.com/wp-content/uploads/2025/07/7-5.jpg",
            "https://selishome.com/wp-content/uploads/2025/07/8-4.jpg",
            "https://selishome.com/wp-content/uploads/2025/07/9-4.jpg",
            "https://selishome.com/wp-content/uploads/2025/07/10-3.jpg",
            "https://selishome.com/wp-content/uploads/2025/07/11-1.jpg",
            "https://selishome.com/wp-content/uploads/2025/07/12-1.jpg",
            "https://selishome.com/wp-content/uploads/2025/07/13-1.jpg"
        ],
        "colors": [
            {
                "name": "Standart",
                "hex": "#D4C5B2"
            }
        ],
        "materials": [
            "Ahşap"
        ],
        "dimensions": {
            "width": 0,
            "height": 0,
            "depth": 0,
            "unit": "cm"
        },
        "stock": 10,
        "featured": false,
        "brand": "SelisHome"
    },
    {
        "id": "selis-2464",
        "name": "Charisma Yatak Odası Grubu",
        "slug": "charisma-yatak-odasi-grubu",
        "description": "",
        "price": 0,
        "categoryId": "7",
        "categorySlug": "genc-cocuk-odasi",
        "images": [
            "https://selishome.com/wp-content/uploads/2025/07/1-2-1-scaled.jpeg",
            "https://selishome.com/wp-content/uploads/2025/07/2-1-scaled.jpeg",
            "https://selishome.com/wp-content/uploads/2025/07/3-1-scaled.jpeg",
            "https://selishome.com/wp-content/uploads/2025/07/4-1-scaled.jpeg",
            "https://selishome.com/wp-content/uploads/2025/07/5-1-scaled.jpeg",
            "https://selishome.com/wp-content/uploads/2025/07/6-1-scaled.jpeg",
            "https://selishome.com/wp-content/uploads/2025/07/7-1-scaled.jpeg",
            "https://selishome.com/wp-content/uploads/2025/07/8-1-scaled.jpeg",
            "https://selishome.com/wp-content/uploads/2025/07/9-1-scaled.jpeg",
            "https://selishome.com/wp-content/uploads/2025/07/10-1-scaled.jpeg",
            "https://selishome.com/wp-content/uploads/2025/07/11-1-scaled.jpeg",
            "https://selishome.com/wp-content/uploads/2025/07/12-1-scaled.jpeg",
            "https://selishome.com/wp-content/uploads/2025/07/13-scaled.jpeg",
            "https://selishome.com/wp-content/uploads/2025/07/14-scaled.jpeg",
            "https://selishome.com/wp-content/uploads/2025/07/15-scaled.jpeg",
            "https://selishome.com/wp-content/uploads/2025/07/16-scaled.jpeg",
            "https://selishome.com/wp-content/uploads/2025/07/17-scaled.jpeg",
            "https://selishome.com/wp-content/uploads/2025/07/18-scaled.jpeg",
            "https://selishome.com/wp-content/uploads/2025/07/19-scaled.jpeg",
            "https://selishome.com/wp-content/uploads/2025/07/20-scaled.jpeg",
            "https://selishome.com/wp-content/uploads/2025/07/21-scaled.jpeg",
            "https://selishome.com/wp-content/uploads/2025/07/22-scaled.jpeg",
            "https://selishome.com/wp-content/uploads/2025/07/23-scaled.jpeg",
            "https://selishome.com/wp-content/uploads/2025/07/24-scaled.jpeg",
            "https://selishome.com/wp-content/uploads/2025/07/25-scaled.jpeg",
            "https://selishome.com/wp-content/uploads/2025/07/26-scaled.jpeg",
            "https://selishome.com/wp-content/uploads/2025/07/27-scaled.jpeg"
        ],
        "colors": [
            {
                "name": "Standart",
                "hex": "#D4C5B2"
            }
        ],
        "materials": [
            "Ahşap"
        ],
        "dimensions": {
            "width": 0,
            "height": 0,
            "depth": 0,
            "unit": "cm"
        },
        "stock": 10,
        "featured": false,
        "brand": "SelisHome"
    },
    {
        "id": "selis-2450",
        "name": "Charisma Oturma Grubu",
        "slug": "charisma-oturma-grubu",
        "description": "",
        "price": 0,
        "categoryId": "1",
        "categorySlug": "oturma-odasi",
        "images": [
            "https://selishome.com/wp-content/uploads/2025/07/1-2-scaled.jpeg",
            "https://selishome.com/wp-content/uploads/2025/07/2-scaled.jpeg",
            "https://selishome.com/wp-content/uploads/2025/07/3-scaled.jpeg",
            "https://selishome.com/wp-content/uploads/2025/07/4-scaled.jpeg",
            "https://selishome.com/wp-content/uploads/2025/07/5-scaled.jpeg",
            "https://selishome.com/wp-content/uploads/2025/07/6-scaled.jpeg",
            "https://selishome.com/wp-content/uploads/2025/07/7-scaled.jpeg",
            "https://selishome.com/wp-content/uploads/2025/07/8-scaled.jpeg",
            "https://selishome.com/wp-content/uploads/2025/07/9-scaled.jpeg",
            "https://selishome.com/wp-content/uploads/2025/07/10-scaled.jpeg",
            "https://selishome.com/wp-content/uploads/2025/07/11-scaled.jpeg",
            "https://selishome.com/wp-content/uploads/2025/07/12-scaled.jpeg"
        ],
        "colors": [
            {
                "name": "Standart",
                "hex": "#D4C5B2"
            }
        ],
        "materials": [
            "Ahşap"
        ],
        "dimensions": {
            "width": 0,
            "height": 0,
            "depth": 0,
            "unit": "cm"
        },
        "stock": 10,
        "featured": false,
        "brand": "SelisHome"
    },
    {
        "id": "selis-2438",
        "name": "Oscar Yatak Odası Grubu",
        "slug": "oscar-yatak-odasi-grubu",
        "description": "<p>başlıca traitler<br />\n1.sınıf işçilik<br />\nMdf baskı işçiliği<br />\ndolap hariç %100 mdf<br />\n1. kalite kumaş</p>\n<p>dolap içi ledler mevcut<br />\nmakyaj masası ledler başlıkta ledler<br />\nyatak geniş bir bazaya sahip<br />\n160&#215;200 &amp; 180&#215;200<br />\nistek ve ihtiyaca göre karyola boyutu</p>\n<p>&nbsp;</p>",
        "price": 0,
        "categoryId": "7",
        "categorySlug": "genc-cocuk-odasi",
        "images": [
            "https://selishome.com/wp-content/uploads/2025/07/1-6.jpg",
            "https://selishome.com/wp-content/uploads/2025/07/2-5.jpg",
            "https://selishome.com/wp-content/uploads/2025/07/1-12.jpg",
            "https://selishome.com/wp-content/uploads/2025/07/3-5.jpg",
            "https://selishome.com/wp-content/uploads/2025/07/4-5.jpg",
            "https://selishome.com/wp-content/uploads/2025/07/5-5.jpg",
            "https://selishome.com/wp-content/uploads/2025/07/6-4.jpg",
            "https://selishome.com/wp-content/uploads/2025/07/7-4.jpg",
            "https://selishome.com/wp-content/uploads/2025/07/8-3.jpg",
            "https://selishome.com/wp-content/uploads/2025/07/9-3.jpg",
            "https://selishome.com/wp-content/uploads/2025/07/10-2.jpg",
            "https://selishome.com/wp-content/uploads/2025/07/2-12.jpg"
        ],
        "colors": [
            {
                "name": "Standart",
                "hex": "#D4C5B2"
            }
        ],
        "materials": [
            "Ahşap"
        ],
        "dimensions": {
            "width": 0,
            "height": 0,
            "depth": 0,
            "unit": "cm"
        },
        "stock": 10,
        "featured": false,
        "brand": "SelisHome"
    },
    {
        "id": "selis-2431",
        "name": "Venedik Yemek Odası Grubu",
        "slug": "venedik-yemek-odasi-grubu",
        "description": "",
        "price": 0,
        "categoryId": "3",
        "categorySlug": "yemek-odasi",
        "images": [
            "https://selishome.com/wp-content/uploads/2025/07/1-5-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/07/2-4-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/07/3-4-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/07/4-4-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/07/5-4.jpg"
        ],
        "colors": [
            {
                "name": "Standart",
                "hex": "#D4C5B2"
            }
        ],
        "materials": [
            "Ahşap"
        ],
        "dimensions": {
            "width": 0,
            "height": 0,
            "depth": 0,
            "unit": "cm"
        },
        "stock": 10,
        "featured": false,
        "brand": "SelisHome"
    },
    {
        "id": "selis-2419",
        "name": "Oslo Oturma Grubu",
        "slug": "oslo-oturma-grubu",
        "description": "",
        "price": 0,
        "categoryId": "1",
        "categorySlug": "oturma-odasi",
        "images": [
            "https://selishome.com/wp-content/uploads/2025/07/1-4.jpg",
            "https://selishome.com/wp-content/uploads/2025/07/2-3.jpg",
            "https://selishome.com/wp-content/uploads/2025/07/3-3.jpg",
            "https://selishome.com/wp-content/uploads/2025/07/4-3.jpg",
            "https://selishome.com/wp-content/uploads/2025/07/5-3.jpg",
            "https://selishome.com/wp-content/uploads/2025/07/6-3.jpg",
            "https://selishome.com/wp-content/uploads/2025/07/7-3.jpg",
            "https://selishome.com/wp-content/uploads/2025/07/8-2.jpg",
            "https://selishome.com/wp-content/uploads/2025/07/9-2.jpg",
            "https://selishome.com/wp-content/uploads/2025/07/10-1.jpg"
        ],
        "colors": [
            {
                "name": "Standart",
                "hex": "#D4C5B2"
            }
        ],
        "materials": [
            "Ahşap"
        ],
        "dimensions": {
            "width": 0,
            "height": 0,
            "depth": 0,
            "unit": "cm"
        },
        "stock": 10,
        "featured": false,
        "brand": "SelisHome"
    },
    {
        "id": "selis-2408",
        "name": "Vizyon Oturma Grubu",
        "slug": "vizyon-oturma-grubu",
        "description": "",
        "price": 0,
        "categoryId": "1",
        "categorySlug": "oturma-odasi",
        "images": [
            "https://selishome.com/wp-content/uploads/2025/07/1-3.jpg",
            "https://selishome.com/wp-content/uploads/2025/07/2-2.jpg",
            "https://selishome.com/wp-content/uploads/2025/07/3-2.jpg",
            "https://selishome.com/wp-content/uploads/2025/07/4-2.jpg",
            "https://selishome.com/wp-content/uploads/2025/07/5-2.jpg",
            "https://selishome.com/wp-content/uploads/2025/07/6-2.jpg",
            "https://selishome.com/wp-content/uploads/2025/07/7-2.jpg",
            "https://selishome.com/wp-content/uploads/2025/07/8-1.jpg",
            "https://selishome.com/wp-content/uploads/2025/07/9-1.jpg"
        ],
        "colors": [
            {
                "name": "Standart",
                "hex": "#D4C5B2"
            }
        ],
        "materials": [
            "Ahşap"
        ],
        "dimensions": {
            "width": 0,
            "height": 0,
            "depth": 0,
            "unit": "cm"
        },
        "stock": 10,
        "featured": false,
        "brand": "SelisHome"
    },
    {
        "id": "selis-2405",
        "name": "Sembol Mutfak Takımı",
        "slug": "sembol-mutfak-takimi",
        "description": "",
        "price": 0,
        "categoryId": "3",
        "categorySlug": "yemek-odasi",
        "images": [
            "https://selishome.com/wp-content/uploads/2025/07/1-2.jpg"
        ],
        "colors": [
            {
                "name": "Standart",
                "hex": "#D4C5B2"
            }
        ],
        "materials": [
            "Ahşap"
        ],
        "dimensions": {
            "width": 0,
            "height": 0,
            "depth": 0,
            "unit": "cm"
        },
        "stock": 10,
        "featured": false,
        "brand": "SelisHome"
    },
    {
        "id": "selis-2396",
        "name": "Polo Köşe Koltuk Grubu",
        "slug": "polo-kose-koltuk-grubu",
        "description": "",
        "price": 0,
        "categoryId": "1",
        "categorySlug": "oturma-odasi",
        "images": [
            "https://selishome.com/wp-content/uploads/2025/07/1-1.jpg",
            "https://selishome.com/wp-content/uploads/2025/07/2-1.jpg",
            "https://selishome.com/wp-content/uploads/2025/07/3-1.jpg",
            "https://selishome.com/wp-content/uploads/2025/07/4-1.jpg",
            "https://selishome.com/wp-content/uploads/2025/07/5-1.jpg",
            "https://selishome.com/wp-content/uploads/2025/07/6-1.jpg",
            "https://selishome.com/wp-content/uploads/2025/07/7-1.jpg"
        ],
        "colors": [
            {
                "name": "Standart",
                "hex": "#D4C5B2"
            }
        ],
        "materials": [
            "Ahşap"
        ],
        "dimensions": {
            "width": 0,
            "height": 0,
            "depth": 0,
            "unit": "cm"
        },
        "stock": 10,
        "featured": false,
        "brand": "SelisHome"
    },
    {
        "id": "selis-2361",
        "name": "Rose Genç Odası",
        "slug": "rose-genc-odasi",
        "description": "",
        "price": 0,
        "categoryId": "7",
        "categorySlug": "genc-cocuk-odasi",
        "images": [
            "https://selishome.com/wp-content/uploads/2025/05/1-48-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/2-50-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/3-49-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/4-48-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/5-46-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/6-44-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/7-42-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/8-40-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/9-35-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/10-30.jpg"
        ],
        "colors": [
            {
                "name": "Standart",
                "hex": "#D4C5B2"
            }
        ],
        "materials": [
            "Ahşap"
        ],
        "dimensions": {
            "width": 0,
            "height": 0,
            "depth": 0,
            "unit": "cm"
        },
        "stock": 10,
        "featured": false,
        "brand": "SelisHome"
    },
    {
        "id": "selis-2349",
        "name": "Marıne Genç Odası",
        "slug": "marine-genc-odasi",
        "description": "",
        "price": 0,
        "categoryId": "7",
        "categorySlug": "genc-cocuk-odasi",
        "images": [
            "https://selishome.com/wp-content/uploads/2025/05/1-47-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/2-49-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/3-48-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/4-47-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/5-45-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/6-43-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/7-41-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/8-39-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/9-34-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/10-29-scaled.jpg"
        ],
        "colors": [
            {
                "name": "Standart",
                "hex": "#D4C5B2"
            }
        ],
        "materials": [
            "Ahşap"
        ],
        "dimensions": {
            "width": 0,
            "height": 0,
            "depth": 0,
            "unit": "cm"
        },
        "stock": 10,
        "featured": false,
        "brand": "SelisHome"
    },
    {
        "id": "selis-2338",
        "name": "Latte Genç Odası",
        "slug": "latte-genc-odasi",
        "description": "",
        "price": 0,
        "categoryId": "7",
        "categorySlug": "genc-cocuk-odasi",
        "images": [
            "https://selishome.com/wp-content/uploads/2025/05/1-2-2.jpeg",
            "https://selishome.com/wp-content/uploads/2025/05/2-6.jpeg",
            "https://selishome.com/wp-content/uploads/2025/05/3-6.jpeg",
            "https://selishome.com/wp-content/uploads/2025/05/4-6.jpeg",
            "https://selishome.com/wp-content/uploads/2025/05/5-6.jpeg",
            "https://selishome.com/wp-content/uploads/2025/05/6-5.jpeg",
            "https://selishome.com/wp-content/uploads/2025/05/7-5.jpeg",
            "https://selishome.com/wp-content/uploads/2025/05/8-5.jpeg",
            "https://selishome.com/wp-content/uploads/2025/05/9-4.jpeg"
        ],
        "colors": [
            {
                "name": "Standart",
                "hex": "#D4C5B2"
            }
        ],
        "materials": [
            "Ahşap"
        ],
        "dimensions": {
            "width": 0,
            "height": 0,
            "depth": 0,
            "unit": "cm"
        },
        "stock": 10,
        "featured": false,
        "brand": "SelisHome"
    },
    {
        "id": "selis-2325",
        "name": "Gold Genç Odası",
        "slug": "gold-genc-odasi",
        "description": "",
        "price": 0,
        "categoryId": "7",
        "categorySlug": "genc-cocuk-odasi",
        "images": [
            "https://selishome.com/wp-content/uploads/2025/05/1-46-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/2-48-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/3-47-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/4-46-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/5-44-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/6-42-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/7-40-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/8-38-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/9-33-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/10-28-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/11-20-scaled.jpg"
        ],
        "colors": [
            {
                "name": "Standart",
                "hex": "#D4C5B2"
            }
        ],
        "materials": [
            "Ahşap"
        ],
        "dimensions": {
            "width": 0,
            "height": 0,
            "depth": 0,
            "unit": "cm"
        },
        "stock": 10,
        "featured": false,
        "brand": "SelisHome"
    },
    {
        "id": "selis-2315",
        "name": "Dark Poınt Genç Odası",
        "slug": "dark-point-genc-odasi",
        "description": "",
        "price": 0,
        "categoryId": "7",
        "categorySlug": "genc-cocuk-odasi",
        "images": [
            "https://selishome.com/wp-content/uploads/2025/05/1-45-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/2-47-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/3-46-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/4-45.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/5-43-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/6-41-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/7-39-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/8-37-scaled.jpg"
        ],
        "colors": [
            {
                "name": "Standart",
                "hex": "#D4C5B2"
            }
        ],
        "materials": [
            "Ahşap"
        ],
        "dimensions": {
            "width": 0,
            "height": 0,
            "depth": 0,
            "unit": "cm"
        },
        "stock": 10,
        "featured": false,
        "brand": "SelisHome"
    },
    {
        "id": "selis-2303",
        "name": "Corner Genç Odası",
        "slug": "corner-genc-odasi",
        "description": "",
        "price": 0,
        "categoryId": "7",
        "categorySlug": "genc-cocuk-odasi",
        "images": [
            "https://selishome.com/wp-content/uploads/2025/05/1-44-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/2-46-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/3-45-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/4-44-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/5-42-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/6-40.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/7-38-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/8-36-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/9-32-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/10-27-scaled.jpg"
        ],
        "colors": [
            {
                "name": "Standart",
                "hex": "#D4C5B2"
            }
        ],
        "materials": [
            "Ahşap"
        ],
        "dimensions": {
            "width": 0,
            "height": 0,
            "depth": 0,
            "unit": "cm"
        },
        "stock": 10,
        "featured": false,
        "brand": "SelisHome"
    },
    {
        "id": "selis-2288",
        "name": "Cıty Genç Odası",
        "slug": "city-genc-odasi",
        "description": "",
        "price": 0,
        "categoryId": "7",
        "categorySlug": "genc-cocuk-odasi",
        "images": [
            "https://selishome.com/wp-content/uploads/2025/05/1-43.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/2-45.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/3-44.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/4-43.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/7-37.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/8-35.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/9-31.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/10-26.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/13-13.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/14-11.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/15-7.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/17-2.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/20.jpg"
        ],
        "colors": [
            {
                "name": "Standart",
                "hex": "#D4C5B2"
            }
        ],
        "materials": [
            "Ahşap"
        ],
        "dimensions": {
            "width": 0,
            "height": 0,
            "depth": 0,
            "unit": "cm"
        },
        "stock": 10,
        "featured": false,
        "brand": "SelisHome"
    },
    {
        "id": "selis-2277",
        "name": "Bıanca Sedirli Genç Odası",
        "slug": "bianca-sedirli-genc-odasi",
        "description": "",
        "price": 0,
        "categoryId": "7",
        "categorySlug": "genc-cocuk-odasi",
        "images": [
            "https://selishome.com/wp-content/uploads/2025/05/1-42-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/2-44-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/3-43-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/4-42-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/5-41-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/7-36-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/9-30-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/10-25-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/11-19-scaled.jpg"
        ],
        "colors": [
            {
                "name": "Standart",
                "hex": "#D4C5B2"
            }
        ],
        "materials": [
            "Ahşap"
        ],
        "dimensions": {
            "width": 0,
            "height": 0,
            "depth": 0,
            "unit": "cm"
        },
        "stock": 10,
        "featured": false,
        "brand": "SelisHome"
    },
    {
        "id": "selis-2270",
        "name": "Bıanca Cibinikli Genç Odası",
        "slug": "bianca-cibinikli-genc-odasi",
        "description": "",
        "price": 0,
        "categoryId": "7",
        "categorySlug": "genc-cocuk-odasi",
        "images": [
            "https://selishome.com/wp-content/uploads/2025/05/1-41-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/2-43-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/3-42-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/4-41-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/5-40-scaled.jpg"
        ],
        "colors": [
            {
                "name": "Standart",
                "hex": "#D4C5B2"
            }
        ],
        "materials": [
            "Ahşap"
        ],
        "dimensions": {
            "width": 0,
            "height": 0,
            "depth": 0,
            "unit": "cm"
        },
        "stock": 10,
        "featured": false,
        "brand": "SelisHome"
    },
    {
        "id": "selis-2254",
        "name": "Agra Genç Odası",
        "slug": "agra-genc-odasi",
        "description": "",
        "price": 0,
        "categoryId": "7",
        "categorySlug": "genc-cocuk-odasi",
        "images": [
            "https://selishome.com/wp-content/uploads/2025/05/1-40.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/2-42.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/3-41.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/4-2-1.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/5-2-1.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/6-39.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/7-35.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/8-34.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/9-29.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/10-24.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/11-18.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/12-16.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/13-12.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/14-10.jpg"
        ],
        "colors": [
            {
                "name": "Standart",
                "hex": "#D4C5B2"
            }
        ],
        "materials": [
            "Ahşap"
        ],
        "dimensions": {
            "width": 0,
            "height": 0,
            "depth": 0,
            "unit": "cm"
        },
        "stock": 10,
        "featured": false,
        "brand": "SelisHome"
    },
    {
        "id": "selis-2243",
        "name": "Virjin Köşe Koltuk Grubu",
        "slug": "virjin-kose-koltuk-grubu",
        "description": "",
        "price": 0,
        "categoryId": "1",
        "categorySlug": "oturma-odasi",
        "images": [
            "https://selishome.com/wp-content/uploads/2025/05/1-2-1-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/2-41-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/3-40-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/4-40-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/5-39-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/6-38-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/7-34-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/8-33-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/9-28-scaled.jpg"
        ],
        "colors": [
            {
                "name": "Standart",
                "hex": "#D4C5B2"
            }
        ],
        "materials": [
            "Ahşap"
        ],
        "dimensions": {
            "width": 0,
            "height": 0,
            "depth": 0,
            "unit": "cm"
        },
        "stock": 10,
        "featured": false,
        "brand": "SelisHome"
    },
    {
        "id": "selis-2233",
        "name": "Virjin Oturma Grubu",
        "slug": "virjin-oturma-grubu",
        "description": "",
        "price": 0,
        "categoryId": "1",
        "categorySlug": "oturma-odasi",
        "images": [
            "https://selishome.com/wp-content/uploads/2025/05/1-39-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/2-40-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/3-39-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/4-39-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/5-38-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/6-37-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/7-33-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/8-32-scaled.jpg"
        ],
        "colors": [
            {
                "name": "Standart",
                "hex": "#D4C5B2"
            }
        ],
        "materials": [
            "Ahşap"
        ],
        "dimensions": {
            "width": 0,
            "height": 0,
            "depth": 0,
            "unit": "cm"
        },
        "stock": 10,
        "featured": false,
        "brand": "SelisHome"
    },
    {
        "id": "selis-2222",
        "name": "Venüs Oturma Grubu",
        "slug": "venus-oturma-grubu",
        "description": "",
        "price": 0,
        "categoryId": "1",
        "categorySlug": "oturma-odasi",
        "images": [
            "https://selishome.com/wp-content/uploads/2025/05/1-38.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/2-39.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/3-38.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/4-38.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/5-37.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/6-36.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/7-32.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/8-31.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/9-27.jpg"
        ],
        "colors": [
            {
                "name": "Standart",
                "hex": "#D4C5B2"
            }
        ],
        "materials": [
            "Ahşap"
        ],
        "dimensions": {
            "width": 0,
            "height": 0,
            "depth": 0,
            "unit": "cm"
        },
        "stock": 10,
        "featured": false,
        "brand": "SelisHome"
    },
    {
        "id": "selis-2214",
        "name": "Vega Köşe Koltuk Grubu",
        "slug": "vega-kose-koltuk-grubu",
        "description": "",
        "price": 0,
        "categoryId": "1",
        "categorySlug": "oturma-odasi",
        "images": [
            "https://selishome.com/wp-content/uploads/2025/05/1-37.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/2-38.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/3-37.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/4-37.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/5-36.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/6-35.jpg"
        ],
        "colors": [
            {
                "name": "Standart",
                "hex": "#D4C5B2"
            }
        ],
        "materials": [
            "Ahşap"
        ],
        "dimensions": {
            "width": 0,
            "height": 0,
            "depth": 0,
            "unit": "cm"
        },
        "stock": 10,
        "featured": false,
        "brand": "SelisHome"
    },
    {
        "id": "selis-2205",
        "name": "Troy Oturma Grubu",
        "slug": "troy-oturma-grubu",
        "description": "",
        "price": 0,
        "categoryId": "1",
        "categorySlug": "oturma-odasi",
        "images": [
            "https://selishome.com/wp-content/uploads/2025/05/1-36.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/2-37.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/3-36.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/4-36.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/5-35.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/6-34.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/7-31.jpg"
        ],
        "colors": [
            {
                "name": "Standart",
                "hex": "#D4C5B2"
            }
        ],
        "materials": [
            "Ahşap"
        ],
        "dimensions": {
            "width": 0,
            "height": 0,
            "depth": 0,
            "unit": "cm"
        },
        "stock": 10,
        "featured": false,
        "brand": "SelisHome"
    },
    {
        "id": "selis-2194",
        "name": "Togo Oturma Grubu",
        "slug": "togo-oturma-grubu",
        "description": "",
        "price": 0,
        "categoryId": "1",
        "categorySlug": "oturma-odasi",
        "images": [
            "https://selishome.com/wp-content/uploads/2025/05/1-35.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/2-36.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/3-35.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/4-35.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/5-34.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/6-33.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/7-30.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/8-30.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/9-26.jpg"
        ],
        "colors": [
            {
                "name": "Standart",
                "hex": "#D4C5B2"
            }
        ],
        "materials": [
            "Ahşap"
        ],
        "dimensions": {
            "width": 0,
            "height": 0,
            "depth": 0,
            "unit": "cm"
        },
        "stock": 10,
        "featured": false,
        "brand": "SelisHome"
    },
    {
        "id": "selis-2182",
        "name": "Seul Oturma Grubu",
        "slug": "seul-oturma-grubu",
        "description": "",
        "price": 0,
        "categoryId": "1",
        "categorySlug": "oturma-odasi",
        "images": [
            "https://selishome.com/wp-content/uploads/2025/05/1-34.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/2-35.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/3-34.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/4-34.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/5-33.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/6-32.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/7-29.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/8-29.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/9-25.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/10-23.jpg"
        ],
        "colors": [
            {
                "name": "Standart",
                "hex": "#D4C5B2"
            }
        ],
        "materials": [
            "Ahşap"
        ],
        "dimensions": {
            "width": 0,
            "height": 0,
            "depth": 0,
            "unit": "cm"
        },
        "stock": 10,
        "featured": false,
        "brand": "SelisHome"
    },
    {
        "id": "selis-2171",
        "name": "Rio Relax Köşe Koltuk Grubu",
        "slug": "rio-relax-kose-koltuk-grubu",
        "description": "",
        "price": 0,
        "categoryId": "1",
        "categorySlug": "oturma-odasi",
        "images": [
            "https://selishome.com/wp-content/uploads/2025/05/1-33.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/2-34.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/3-33.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/4-33.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/5-32.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/6-31.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/7-28.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/8-28.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/9-24.jpg"
        ],
        "colors": [
            {
                "name": "Standart",
                "hex": "#D4C5B2"
            }
        ],
        "materials": [
            "Ahşap"
        ],
        "dimensions": {
            "width": 0,
            "height": 0,
            "depth": 0,
            "unit": "cm"
        },
        "stock": 10,
        "featured": false,
        "brand": "SelisHome"
    },
    {
        "id": "selis-2164",
        "name": "Rio Relax Bohem Köşe Koltuk Grubu",
        "slug": "rio-relax-bohem-kose-koltuk-grubu",
        "description": "",
        "price": 0,
        "categoryId": "1",
        "categorySlug": "oturma-odasi",
        "images": [
            "https://selishome.com/wp-content/uploads/2025/05/1-32.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/2-33.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/3-32.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/4-32.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/5-31.jpg"
        ],
        "colors": [
            {
                "name": "Standart",
                "hex": "#D4C5B2"
            }
        ],
        "materials": [
            "Ahşap"
        ],
        "dimensions": {
            "width": 0,
            "height": 0,
            "depth": 0,
            "unit": "cm"
        },
        "stock": 10,
        "featured": false,
        "brand": "SelisHome"
    },
    {
        "id": "selis-2154",
        "name": "Rio Oturma Grubu",
        "slug": "rio-oturma-grubu",
        "description": "",
        "price": 0,
        "categoryId": "1",
        "categorySlug": "oturma-odasi",
        "images": [
            "https://selishome.com/wp-content/uploads/2025/05/1-31.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/2-32.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/3-31.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/4-31.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/5-30.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/6-30.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/7-27.jpg"
        ],
        "colors": [
            {
                "name": "Standart",
                "hex": "#D4C5B2"
            }
        ],
        "materials": [
            "Ahşap"
        ],
        "dimensions": {
            "width": 0,
            "height": 0,
            "depth": 0,
            "unit": "cm"
        },
        "stock": 10,
        "featured": false,
        "brand": "SelisHome"
    },
    {
        "id": "selis-2142",
        "name": "Rams Oturma Grubu",
        "slug": "rams-oturma-grubu",
        "description": "",
        "price": 0,
        "categoryId": "1",
        "categorySlug": "oturma-odasi",
        "images": [
            "https://selishome.com/wp-content/uploads/2025/05/1-2-1-scaled.jpeg",
            "https://selishome.com/wp-content/uploads/2025/05/2-5-scaled.jpeg",
            "https://selishome.com/wp-content/uploads/2025/05/3-5-scaled.jpeg",
            "https://selishome.com/wp-content/uploads/2025/05/4-5-scaled.jpeg",
            "https://selishome.com/wp-content/uploads/2025/05/5-5-scaled.jpeg",
            "https://selishome.com/wp-content/uploads/2025/05/6-4-scaled.jpeg",
            "https://selishome.com/wp-content/uploads/2025/05/7-4-scaled.jpeg",
            "https://selishome.com/wp-content/uploads/2025/05/8-4-scaled.jpeg",
            "https://selishome.com/wp-content/uploads/2025/05/9-3-scaled.jpeg",
            "https://selishome.com/wp-content/uploads/2025/05/10-2-scaled.jpeg"
        ],
        "colors": [
            {
                "name": "Standart",
                "hex": "#D4C5B2"
            }
        ],
        "materials": [
            "Ahşap"
        ],
        "dimensions": {
            "width": 0,
            "height": 0,
            "depth": 0,
            "unit": "cm"
        },
        "stock": 10,
        "featured": false,
        "brand": "SelisHome"
    },
    {
        "id": "selis-2133",
        "name": "Prada Oturma Grubu",
        "slug": "prada-oturma-grubu",
        "description": "",
        "price": 0,
        "categoryId": "1",
        "categorySlug": "oturma-odasi",
        "images": [
            "https://selishome.com/wp-content/uploads/2025/05/1-30.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/2-31.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/3-30.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/4-30.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/5-29.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/6-29.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/7-26.jpg"
        ],
        "colors": [
            {
                "name": "Standart",
                "hex": "#D4C5B2"
            }
        ],
        "materials": [
            "Ahşap"
        ],
        "dimensions": {
            "width": 0,
            "height": 0,
            "depth": 0,
            "unit": "cm"
        },
        "stock": 10,
        "featured": false,
        "brand": "SelisHome"
    },
    {
        "id": "selis-2125",
        "name": "Paulo Oturma Grubu",
        "slug": "paulo-oturma-grubu",
        "description": "",
        "price": 0,
        "categoryId": "1",
        "categorySlug": "oturma-odasi",
        "images": [
            "https://selishome.com/wp-content/uploads/2025/05/IMG-20240910-WA0108.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/IMG-20240910-WA0106.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/IMG-20240910-WA0114.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/IMG-20240910-WA0109.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/IMG-20240910-WA0105.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/IMG-20240910-WA0115.jpg"
        ],
        "colors": [
            {
                "name": "Standart",
                "hex": "#D4C5B2"
            }
        ],
        "materials": [
            "Ahşap"
        ],
        "dimensions": {
            "width": 0,
            "height": 0,
            "depth": 0,
            "unit": "cm"
        },
        "stock": 10,
        "featured": false,
        "brand": "SelisHome"
    },
    {
        "id": "selis-2117",
        "name": "Okyanus Oturma Grubu",
        "slug": "okyanus-oturma-grubu",
        "description": "",
        "price": 0,
        "categoryId": "1",
        "categorySlug": "oturma-odasi",
        "images": [
            "https://selishome.com/wp-content/uploads/2025/05/1-29.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/2-30.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/3-29.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/4-29.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/5-28.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/6-28.jpg"
        ],
        "colors": [
            {
                "name": "Standart",
                "hex": "#D4C5B2"
            }
        ],
        "materials": [
            "Ahşap"
        ],
        "dimensions": {
            "width": 0,
            "height": 0,
            "depth": 0,
            "unit": "cm"
        },
        "stock": 10,
        "featured": false,
        "brand": "SelisHome"
    },
    {
        "id": "selis-2103",
        "name": "Nirvana Oturma Grubu",
        "slug": "nirvana-oturma-grubu",
        "description": "",
        "price": 0,
        "categoryId": "1",
        "categorySlug": "oturma-odasi",
        "images": [
            "https://selishome.com/wp-content/uploads/2025/05/1-28.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/2-29.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/3-28-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/4-28.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/5-27-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/6-27-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/7-25-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/8-27.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/9-23.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/10-22.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/11-17-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/12-15-scaled.jpg"
        ],
        "colors": [
            {
                "name": "Standart",
                "hex": "#D4C5B2"
            }
        ],
        "materials": [
            "Ahşap"
        ],
        "dimensions": {
            "width": 0,
            "height": 0,
            "depth": 0,
            "unit": "cm"
        },
        "stock": 10,
        "featured": false,
        "brand": "SelisHome"
    },
    {
        "id": "selis-2086",
        "name": "Magnum Oturma Grubu",
        "slug": "magnum-oturma-grubu",
        "description": "",
        "price": 0,
        "categoryId": "1",
        "categorySlug": "oturma-odasi",
        "images": [
            "https://selishome.com/wp-content/uploads/2025/05/1-27.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/2-28.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/3-27.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/4-27.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/5-26.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/6-26.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/7-24.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/8-26.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/9-22.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/10-21.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/11-16.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/12-14.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/13-11.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/14-9.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/15-6.jpg"
        ],
        "colors": [
            {
                "name": "Standart",
                "hex": "#D4C5B2"
            }
        ],
        "materials": [
            "Ahşap"
        ],
        "dimensions": {
            "width": 0,
            "height": 0,
            "depth": 0,
            "unit": "cm"
        },
        "stock": 10,
        "featured": false,
        "brand": "SelisHome"
    },
    {
        "id": "selis-2070",
        "name": "Lima Oturma Grubu",
        "slug": "lima-oturma-grubu",
        "description": "",
        "price": 0,
        "categoryId": "1",
        "categorySlug": "oturma-odasi",
        "images": [
            "https://selishome.com/wp-content/uploads/2025/05/1-26.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/2-27.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/3-26.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/4-26.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/5-25.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/6-25.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/7-23.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/8-25.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/9-21.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/10-20.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/11-15.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/12-13.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/13-10.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/14-8.jpg"
        ],
        "colors": [
            {
                "name": "Standart",
                "hex": "#D4C5B2"
            }
        ],
        "materials": [
            "Ahşap"
        ],
        "dimensions": {
            "width": 0,
            "height": 0,
            "depth": 0,
            "unit": "cm"
        },
        "stock": 10,
        "featured": false,
        "brand": "SelisHome"
    },
    {
        "id": "selis-2059",
        "name": "Gabon Köşe Koltuk Grubu",
        "slug": "gabon-kose-koltuk-grubu",
        "description": "",
        "price": 0,
        "categoryId": "1",
        "categorySlug": "oturma-odasi",
        "images": [
            "https://selishome.com/wp-content/uploads/2025/05/1-4-scaled.jpeg",
            "https://selishome.com/wp-content/uploads/2025/05/2-4-scaled.jpeg",
            "https://selishome.com/wp-content/uploads/2025/05/3-4-scaled.jpeg",
            "https://selishome.com/wp-content/uploads/2025/05/4-4-scaled.jpeg",
            "https://selishome.com/wp-content/uploads/2025/05/5-4-scaled.jpeg",
            "https://selishome.com/wp-content/uploads/2025/05/6-3-scaled.jpeg",
            "https://selishome.com/wp-content/uploads/2025/05/7-3-scaled.jpeg",
            "https://selishome.com/wp-content/uploads/2025/05/8-3-scaled.jpeg",
            "https://selishome.com/wp-content/uploads/2025/05/9-2-scaled.jpeg"
        ],
        "colors": [
            {
                "name": "Standart",
                "hex": "#D4C5B2"
            }
        ],
        "materials": [
            "Ahşap"
        ],
        "dimensions": {
            "width": 0,
            "height": 0,
            "depth": 0,
            "unit": "cm"
        },
        "stock": 10,
        "featured": false,
        "brand": "SelisHome"
    },
    {
        "id": "selis-2046",
        "name": "Gabon Oturma Grubu",
        "slug": "gabon-oturma-grubu",
        "description": "",
        "price": 0,
        "categoryId": "1",
        "categorySlug": "oturma-odasi",
        "images": [
            "https://selishome.com/wp-content/uploads/2025/05/1-3-scaled.jpeg",
            "https://selishome.com/wp-content/uploads/2025/05/2-3-scaled.jpeg",
            "https://selishome.com/wp-content/uploads/2025/05/3-3-scaled.jpeg",
            "https://selishome.com/wp-content/uploads/2025/05/4-3-scaled.jpeg",
            "https://selishome.com/wp-content/uploads/2025/05/5-3-scaled.jpeg",
            "https://selishome.com/wp-content/uploads/2025/05/6-2-scaled.jpeg",
            "https://selishome.com/wp-content/uploads/2025/05/7-2-scaled.jpeg",
            "https://selishome.com/wp-content/uploads/2025/05/8-2-scaled.jpeg",
            "https://selishome.com/wp-content/uploads/2025/05/9-1-scaled.jpeg",
            "https://selishome.com/wp-content/uploads/2025/05/10-1-scaled.jpeg",
            "https://selishome.com/wp-content/uploads/2025/05/11-1-scaled.jpeg"
        ],
        "colors": [
            {
                "name": "Standart",
                "hex": "#D4C5B2"
            }
        ],
        "materials": [
            "Ahşap"
        ],
        "dimensions": {
            "width": 0,
            "height": 0,
            "depth": 0,
            "unit": "cm"
        },
        "stock": 10,
        "featured": false,
        "brand": "SelisHome"
    },
    {
        "id": "selis-2030",
        "name": "Derin Oturma Grubu",
        "slug": "derin-oturma-grubu",
        "description": "",
        "price": 0,
        "categoryId": "1",
        "categorySlug": "oturma-odasi",
        "images": [
            "https://selishome.com/wp-content/uploads/2025/05/1-25.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/2-26.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/3-25.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/4-25.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/5-24.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/6-24.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/7-22.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/8-24.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/9-20.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/10-19.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/11-14.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/12-12.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/13-9.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/14-7.jpg"
        ],
        "colors": [
            {
                "name": "Standart",
                "hex": "#D4C5B2"
            }
        ],
        "materials": [
            "Ahşap"
        ],
        "dimensions": {
            "width": 0,
            "height": 0,
            "depth": 0,
            "unit": "cm"
        },
        "stock": 10,
        "featured": false,
        "brand": "SelisHome"
    },
    {
        "id": "selis-2004",
        "name": "Besse Köşe Koltuk Grubu",
        "slug": "besse-kose-koltuk-grubu",
        "description": "",
        "price": 0,
        "categoryId": "1",
        "categorySlug": "oturma-odasi",
        "images": [
            "https://selishome.com/wp-content/uploads/2025/05/1-23.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/2-24.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/3-23.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/4-23.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/5-22.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/6-22.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/7-20.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/8-22.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/9-18.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/10-18.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/11-13.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/12-11.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/13-8.jpg"
        ],
        "colors": [
            {
                "name": "Standart",
                "hex": "#D4C5B2"
            }
        ],
        "materials": [
            "Ahşap"
        ],
        "dimensions": {
            "width": 0,
            "height": 0,
            "depth": 0,
            "unit": "cm"
        },
        "stock": 10,
        "featured": false,
        "brand": "SelisHome"
    },
    {
        "id": "selis-1990",
        "name": "Zen Yemek Odası Grubu",
        "slug": "zen-yemek-odasi-grubu",
        "description": "",
        "price": 0,
        "categoryId": "3",
        "categorySlug": "yemek-odasi",
        "images": [
            "https://selishome.com/wp-content/uploads/2025/05/1-22-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/2-23-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/3-22-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/4-22-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/5-21-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/6-21-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/7-19-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/8-21-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/9-17-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/10-17-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/11-12-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/12-10-scaled.jpg"
        ],
        "colors": [
            {
                "name": "Standart",
                "hex": "#D4C5B2"
            }
        ],
        "materials": [
            "Ahşap"
        ],
        "dimensions": {
            "width": 0,
            "height": 0,
            "depth": 0,
            "unit": "cm"
        },
        "stock": 10,
        "featured": false,
        "brand": "SelisHome"
    },
    {
        "id": "selis-1972",
        "name": "Virjin Yemek Odası Grubu",
        "slug": "virjin-yemek-odasi-grubu",
        "description": "",
        "price": 0,
        "categoryId": "3",
        "categorySlug": "yemek-odasi",
        "images": [
            "https://selishome.com/wp-content/uploads/2025/05/1-21-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/2-22-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/3-21-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/4-21-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/5-20-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/6-20-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/7-18-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/8-20-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/9-16-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/10-16-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/11-11-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/12-9-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/13-7-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/14-6-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/15-5-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/16-5-scaled.jpg"
        ],
        "colors": [
            {
                "name": "Standart",
                "hex": "#D4C5B2"
            }
        ],
        "materials": [
            "Ahşap"
        ],
        "dimensions": {
            "width": 0,
            "height": 0,
            "depth": 0,
            "unit": "cm"
        },
        "stock": 10,
        "featured": false,
        "brand": "SelisHome"
    },
    {
        "id": "selis-1962",
        "name": "Rams Yemek Odası Grubu",
        "slug": "rams-yemek-odasi-grubu",
        "description": "",
        "price": 0,
        "categoryId": "3",
        "categorySlug": "yemek-odasi",
        "images": [
            "https://selishome.com/wp-content/uploads/2025/05/1-2-scaled.jpeg",
            "https://selishome.com/wp-content/uploads/2025/05/2-2-scaled.jpeg",
            "https://selishome.com/wp-content/uploads/2025/05/3-2-scaled.jpeg",
            "https://selishome.com/wp-content/uploads/2025/05/4-2-scaled.jpeg",
            "https://selishome.com/wp-content/uploads/2025/05/5-2-scaled.jpeg",
            "https://selishome.com/wp-content/uploads/2025/05/6-1-scaled.jpeg",
            "https://selishome.com/wp-content/uploads/2025/05/7-1-scaled.jpeg",
            "https://selishome.com/wp-content/uploads/2025/05/8-1-scaled.jpeg"
        ],
        "colors": [
            {
                "name": "Standart",
                "hex": "#D4C5B2"
            }
        ],
        "materials": [
            "Ahşap"
        ],
        "dimensions": {
            "width": 0,
            "height": 0,
            "depth": 0,
            "unit": "cm"
        },
        "stock": 10,
        "featured": false,
        "brand": "SelisHome"
    },
    {
        "id": "selis-1956",
        "name": "Okyanus Yemek Odası Grubu",
        "slug": "okyanus-yemek-odasi-grubu",
        "description": "",
        "price": 0,
        "categoryId": "3",
        "categorySlug": "yemek-odasi",
        "images": [
            "https://selishome.com/wp-content/uploads/2025/05/1-20.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/2-21.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/3-20.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/4-20.jpg"
        ],
        "colors": [
            {
                "name": "Standart",
                "hex": "#D4C5B2"
            }
        ],
        "materials": [
            "Ahşap"
        ],
        "dimensions": {
            "width": 0,
            "height": 0,
            "depth": 0,
            "unit": "cm"
        },
        "stock": 10,
        "featured": false,
        "brand": "SelisHome"
    },
    {
        "id": "selis-1942",
        "name": "Nevada Yemek Odası Grubu",
        "slug": "nevada-yemek-odasi-grubu",
        "description": "",
        "price": 0,
        "categoryId": "3",
        "categorySlug": "yemek-odasi",
        "images": [
            "https://selishome.com/wp-content/uploads/2025/05/1-19.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/2-20.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/3-19.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/4-19.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/5-19.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/6-19.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/7-17.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/8-19.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/9-15.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/10-15.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/11-10.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/12-8.jpg"
        ],
        "colors": [
            {
                "name": "Standart",
                "hex": "#D4C5B2"
            }
        ],
        "materials": [
            "Ahşap"
        ],
        "dimensions": {
            "width": 0,
            "height": 0,
            "depth": 0,
            "unit": "cm"
        },
        "stock": 10,
        "featured": false,
        "brand": "SelisHome"
    },
    {
        "id": "selis-1934",
        "name": "Mona Yemek Odası Grubu",
        "slug": "mona-yemek-odasi-grubu",
        "description": "",
        "price": 0,
        "categoryId": "3",
        "categorySlug": "yemek-odasi",
        "images": [
            "https://selishome.com/wp-content/uploads/2025/05/1-18.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/2-19.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/3-18.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/4-18.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/5-18.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/6-18.jpg"
        ],
        "colors": [
            {
                "name": "Standart",
                "hex": "#D4C5B2"
            }
        ],
        "materials": [
            "Ahşap"
        ],
        "dimensions": {
            "width": 0,
            "height": 0,
            "depth": 0,
            "unit": "cm"
        },
        "stock": 10,
        "featured": false,
        "brand": "SelisHome"
    },
    {
        "id": "selis-1909",
        "name": "Machka Yemek Odası Grubu",
        "slug": "machka-yemek-odasi-grubu",
        "description": "",
        "price": 0,
        "categoryId": "3",
        "categorySlug": "yemek-odasi",
        "images": [
            "https://selishome.com/wp-content/uploads/2025/05/1-16-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/2-16-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/3-16-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/4-16-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/5-16-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/6-16-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/7-15-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/8-17-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/9-13-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/10-13-scaled.jpg"
        ],
        "colors": [
            {
                "name": "Standart",
                "hex": "#D4C5B2"
            }
        ],
        "materials": [
            "Ahşap"
        ],
        "dimensions": {
            "width": 0,
            "height": 0,
            "depth": 0,
            "unit": "cm"
        },
        "stock": 10,
        "featured": false,
        "brand": "SelisHome"
    },
    {
        "id": "selis-1881",
        "name": "Liza Yemek Odası Grubu",
        "slug": "liza-yemek-odasi",
        "description": "",
        "price": 0,
        "categoryId": "3",
        "categorySlug": "yemek-odasi",
        "images": [
            "https://selishome.com/wp-content/uploads/2025/05/1-15.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/2-15.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/3-15.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/4-15.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/5-15.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/6-15.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/7-14.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/8-16.jpg"
        ],
        "colors": [
            {
                "name": "Standart",
                "hex": "#D4C5B2"
            }
        ],
        "materials": [
            "Ahşap"
        ],
        "dimensions": {
            "width": 0,
            "height": 0,
            "depth": 0,
            "unit": "cm"
        },
        "stock": 10,
        "featured": false,
        "brand": "SelisHome"
    },
    {
        "id": "selis-1869",
        "name": "Katre Yemek Odası Grubu",
        "slug": "katre-yemek-odasi",
        "description": "",
        "price": 0,
        "categoryId": "3",
        "categorySlug": "yemek-odasi",
        "images": [
            "https://selishome.com/wp-content/uploads/2025/05/NEK-016599-copy-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/NEK-016600-copy-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/NEK-016601-copy-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/NEK-016602-copy-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/NEK-016603-copy-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/NEK-016604-copy-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/NEK-016607-copy-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/NEK-016608-copy-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/NEK-016609-copy-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/NEK-016612-copy-scaled.jpg"
        ],
        "colors": [
            {
                "name": "Standart",
                "hex": "#D4C5B2"
            }
        ],
        "materials": [
            "Ahşap"
        ],
        "dimensions": {
            "width": 0,
            "height": 0,
            "depth": 0,
            "unit": "cm"
        },
        "stock": 10,
        "featured": false,
        "brand": "SelisHome"
    },
    {
        "id": "selis-1855",
        "name": "Estela Yemek Odası Grubu",
        "slug": "estela-yemek-odasi",
        "description": "",
        "price": 0,
        "categoryId": "3",
        "categorySlug": "yemek-odasi",
        "images": [
            "https://selishome.com/wp-content/uploads/2025/05/1-14-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/2-14-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/3-14-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/4-14-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/5-14-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/6-14-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/7-13-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/8-15-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/9-12-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/10-12-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/11-9-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/12-7-scaled.jpg"
        ],
        "colors": [
            {
                "name": "Standart",
                "hex": "#D4C5B2"
            }
        ],
        "materials": [
            "Ahşap"
        ],
        "dimensions": {
            "width": 0,
            "height": 0,
            "depth": 0,
            "unit": "cm"
        },
        "stock": 10,
        "featured": false,
        "brand": "SelisHome"
    },
    {
        "id": "selis-1844",
        "name": "Elit Yemek Odası Grubu",
        "slug": "elit-yemek-odasi",
        "description": "",
        "price": 0,
        "categoryId": "3",
        "categorySlug": "yemek-odasi",
        "images": [
            "https://selishome.com/wp-content/uploads/2025/05/1-13.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/2-13.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/3-13.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/4-13.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/5-13.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/6-13.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/7-12.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/8-14.jpg"
        ],
        "colors": [
            {
                "name": "Standart",
                "hex": "#D4C5B2"
            }
        ],
        "materials": [
            "Ahşap"
        ],
        "dimensions": {
            "width": 0,
            "height": 0,
            "depth": 0,
            "unit": "cm"
        },
        "stock": 10,
        "featured": false,
        "brand": "SelisHome"
    },
    {
        "id": "selis-1826",
        "name": "Caprice Yemek Odası Grubu",
        "slug": "caprice-yemek-odasi",
        "description": "",
        "price": 0,
        "categoryId": "3",
        "categorySlug": "yemek-odasi",
        "images": [
            "https://selishome.com/wp-content/uploads/2025/05/1-12-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/2-12-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/3-12.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/4-12-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/5-12-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/6-12-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/7-11-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/8-13.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/9-11-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/10-11-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/11-8.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/12-6.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/13-6.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/14-5.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/15-4.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/16-4.jpg"
        ],
        "colors": [
            {
                "name": "Standart",
                "hex": "#D4C5B2"
            }
        ],
        "materials": [
            "Ahşap"
        ],
        "dimensions": {
            "width": 0,
            "height": 0,
            "depth": 0,
            "unit": "cm"
        },
        "stock": 10,
        "featured": false,
        "brand": "SelisHome"
    },
    {
        "id": "selis-1808",
        "name": "VİRJİN YATAK ODASI",
        "slug": "virjin-yatak-odasi",
        "description": "",
        "price": 0,
        "categoryId": "2",
        "categorySlug": "yatak-odasi",
        "images": [
            "https://selishome.com/wp-content/uploads/2025/05/1-11-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/2-11-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/3-11-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/4-11-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/5-11-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/6-11-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/7-10-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/8-12-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/9-10-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/10-10-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/11-7-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/12-5-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/13-5-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/14-4-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/15-3-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/16-3-scaled.jpg"
        ],
        "colors": [
            {
                "name": "Standart",
                "hex": "#D4C5B2"
            }
        ],
        "materials": [
            "Ahşap"
        ],
        "dimensions": {
            "width": 0,
            "height": 0,
            "depth": 0,
            "unit": "cm"
        },
        "stock": 10,
        "featured": false,
        "brand": "SelisHome"
    },
    {
        "id": "selis-1788",
        "name": "Viral Yatak Odası",
        "slug": "viral-yatak-odasi",
        "description": "",
        "price": 0,
        "categoryId": "7",
        "categorySlug": "genc-cocuk-odasi",
        "images": [
            "https://selishome.com/wp-content/uploads/2025/05/1-10-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/2-10-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/3-10-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/4-10-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/5-10-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/6-10-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/7-9-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/8-11-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/9-9-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/10-9-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/11-6-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/12-4-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/13-4-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/14-3-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/15-2-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/16-2-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/17-1-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/18-1-scaled.jpg"
        ],
        "colors": [
            {
                "name": "Standart",
                "hex": "#D4C5B2"
            }
        ],
        "materials": [
            "Ahşap"
        ],
        "dimensions": {
            "width": 0,
            "height": 0,
            "depth": 0,
            "unit": "cm"
        },
        "stock": 10,
        "featured": false,
        "brand": "SelisHome"
    },
    {
        "id": "selis-1770",
        "name": "Toscano Yatak Odası",
        "slug": "toscano-yatak-odasi",
        "description": "",
        "price": 0,
        "categoryId": "7",
        "categorySlug": "genc-cocuk-odasi",
        "images": [
            "https://selishome.com/wp-content/uploads/2025/05/1-9-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/2-9-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/3-9-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/4-9-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/5-9-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/6-9-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/7-8-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/8-10-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/9-8-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/10-8-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/11-5-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/12-3-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/13-3-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/14-2-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/15-1-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/16-1-scaled.jpg"
        ],
        "colors": [
            {
                "name": "Standart",
                "hex": "#D4C5B2"
            }
        ],
        "materials": [
            "Ahşap"
        ],
        "dimensions": {
            "width": 0,
            "height": 0,
            "depth": 0,
            "unit": "cm"
        },
        "stock": 10,
        "featured": false,
        "brand": "SelisHome"
    },
    {
        "id": "selis-1747",
        "name": "Rams Yatak Odası",
        "slug": "rams-yatak-odasi",
        "description": "",
        "price": 0,
        "categoryId": "7",
        "categorySlug": "genc-cocuk-odasi",
        "images": [
            "https://selishome.com/wp-content/uploads/2025/05/1-1-scaled.jpeg",
            "https://selishome.com/wp-content/uploads/2025/05/2-1-scaled.jpeg",
            "https://selishome.com/wp-content/uploads/2025/05/3-1-scaled.jpeg",
            "https://selishome.com/wp-content/uploads/2025/05/4-1-scaled.jpeg",
            "https://selishome.com/wp-content/uploads/2025/05/5-1-scaled.jpeg",
            "https://selishome.com/wp-content/uploads/2025/05/6-scaled.jpeg",
            "https://selishome.com/wp-content/uploads/2025/05/7-scaled.jpeg",
            "https://selishome.com/wp-content/uploads/2025/05/8-scaled.jpeg",
            "https://selishome.com/wp-content/uploads/2025/05/9-scaled.jpeg",
            "https://selishome.com/wp-content/uploads/2025/05/10-scaled.jpeg",
            "https://selishome.com/wp-content/uploads/2025/05/11-scaled.jpeg",
            "https://selishome.com/wp-content/uploads/2025/05/12-scaled.jpeg",
            "https://selishome.com/wp-content/uploads/2025/05/13-scaled.jpeg",
            "https://selishome.com/wp-content/uploads/2025/05/14-scaled.jpeg",
            "https://selishome.com/wp-content/uploads/2025/05/15-scaled.jpeg"
        ],
        "colors": [
            {
                "name": "Standart",
                "hex": "#D4C5B2"
            }
        ],
        "materials": [
            "Ahşap"
        ],
        "dimensions": {
            "width": 0,
            "height": 0,
            "depth": 0,
            "unit": "cm"
        },
        "stock": 10,
        "featured": false,
        "brand": "SelisHome"
    },
    {
        "id": "selis-1735",
        "name": "Mona Yatak Odası",
        "slug": "mona-yatak-odasi",
        "description": "",
        "price": 0,
        "categoryId": "7",
        "categorySlug": "genc-cocuk-odasi",
        "images": [
            "https://selishome.com/wp-content/uploads/2025/05/1-8.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/2-8.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/3-8.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/4-8.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/5-8.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/6-8.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/7-7.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/8-9.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/9-7.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/10-7.jpg"
        ],
        "colors": [
            {
                "name": "Standart",
                "hex": "#D4C5B2"
            }
        ],
        "materials": [
            "Ahşap"
        ],
        "dimensions": {
            "width": 0,
            "height": 0,
            "depth": 0,
            "unit": "cm"
        },
        "stock": 10,
        "featured": false,
        "brand": "SelisHome"
    },
    {
        "id": "selis-1709",
        "name": "Machka Yatak Odası",
        "slug": "machka-yatak-odasi",
        "description": "",
        "price": 0,
        "categoryId": "7",
        "categorySlug": "genc-cocuk-odasi",
        "images": [
            "https://selishome.com/wp-content/uploads/2025/05/1-6-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/2-6-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/3-6-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/4-6-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/5-6-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/6-6-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/7-5-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/8-7-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/9-6-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/10-6-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/11-4-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/12-1-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/13-1-scaled.jpg"
        ],
        "colors": [
            {
                "name": "Standart",
                "hex": "#D4C5B2"
            }
        ],
        "materials": [
            "Ahşap"
        ],
        "dimensions": {
            "width": 0,
            "height": 0,
            "depth": 0,
            "unit": "cm"
        },
        "stock": 10,
        "featured": false,
        "brand": "SelisHome"
    },
    {
        "id": "selis-1696",
        "name": "Liza Yatak Odası",
        "slug": "liza-yatak-odasi",
        "description": "",
        "price": 0,
        "categoryId": "7",
        "categorySlug": "genc-cocuk-odasi",
        "images": [
            "https://selishome.com/wp-content/uploads/2025/05/1-5.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/2-5.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/3-5.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/4-5.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/5-5.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/6-5.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/7-4.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/8-6.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/9-5.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/10-5.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/11-3.jpg"
        ],
        "colors": [
            {
                "name": "Standart",
                "hex": "#D4C5B2"
            }
        ],
        "materials": [
            "Ahşap"
        ],
        "dimensions": {
            "width": 0,
            "height": 0,
            "depth": 0,
            "unit": "cm"
        },
        "stock": 10,
        "featured": false,
        "brand": "SelisHome"
    },
    {
        "id": "selis-1680",
        "name": "LAGOM YATAK ODASI",
        "slug": "lagom-yatak-odasi",
        "description": "",
        "price": 0,
        "categoryId": "2",
        "categorySlug": "yatak-odasi",
        "images": [
            "https://selishome.com/wp-content/uploads/2025/05/1-4.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/2-4.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/3-4.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/4-4.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/5-4.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/6-4.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/7-3.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/8-5.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/9-4.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/10-4.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/11-1.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/12.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/13.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/14-1.jpg"
        ],
        "colors": [
            {
                "name": "Standart",
                "hex": "#D4C5B2"
            }
        ],
        "materials": [
            "Ahşap"
        ],
        "dimensions": {
            "width": 0,
            "height": 0,
            "depth": 0,
            "unit": "cm"
        },
        "stock": 10,
        "featured": false,
        "brand": "SelisHome"
    },
    {
        "id": "selis-1668",
        "name": "Katre Yatak Odası",
        "slug": "katre-yatak-odasi",
        "description": "",
        "price": 0,
        "categoryId": "7",
        "categorySlug": "genc-cocuk-odasi",
        "images": [
            "https://selishome.com/wp-content/uploads/2025/05/1-3-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/2-3-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/3-3-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/4-3-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/5-3-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/6-3-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/7-2-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/8-4-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/9-3-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/10-3-scaled.jpg"
        ],
        "colors": [
            {
                "name": "Standart",
                "hex": "#D4C5B2"
            }
        ],
        "materials": [
            "Ahşap"
        ],
        "dimensions": {
            "width": 0,
            "height": 0,
            "depth": 0,
            "unit": "cm"
        },
        "stock": 10,
        "featured": false,
        "brand": "SelisHome"
    },
    {
        "id": "selis-1655",
        "name": "Hazel Yatak Odası",
        "slug": "hazel-yatak-odasi",
        "description": "",
        "price": 0,
        "categoryId": "7",
        "categorySlug": "genc-cocuk-odasi",
        "images": [
            "https://selishome.com/wp-content/uploads/2025/05/1-2-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/2-2-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/3-2-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/4-2-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/5-2-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/6-2-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/7-1-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/8-3-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/9-2-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/10-2-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/11-scaled.jpg"
        ],
        "colors": [
            {
                "name": "Standart",
                "hex": "#D4C5B2"
            }
        ],
        "materials": [
            "Ahşap"
        ],
        "dimensions": {
            "width": 0,
            "height": 0,
            "depth": 0,
            "unit": "cm"
        },
        "stock": 10,
        "featured": false,
        "brand": "SelisHome"
    },
    {
        "id": "selis-1643",
        "name": "Estela Yatak Odası",
        "slug": "estela-yatak-odasi",
        "description": "",
        "price": 0,
        "categoryId": "7",
        "categorySlug": "genc-cocuk-odasi",
        "images": [
            "https://selishome.com/wp-content/uploads/2025/05/1-1-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/2-1-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/3-1-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/4-1-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/5-1-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/6-1-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/8-1-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/8-2-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/9-1-scaled.jpg",
            "https://selishome.com/wp-content/uploads/2025/05/10-1-scaled.jpg"
        ],
        "colors": [
            {
                "name": "Standart",
                "hex": "#D4C5B2"
            }
        ],
        "materials": [
            "Ahşap"
        ],
        "dimensions": {
            "width": 0,
            "height": 0,
            "depth": 0,
            "unit": "cm"
        },
        "stock": 10,
        "featured": false,
        "brand": "SelisHome"
    },
    {
        "id": "selis-1487",
        "name": "Empire Yatak",
        "slug": "empire-yatak",
        "description": "<p style=\"text-align: left\" data-start=\"0\" data-end=\"53\"><strong data-start=\"0\" data-end=\"51\">Empire Yatak: Krallara Layık Bir Uyku Deneyimi!</strong></p>\n<p style=\"text-align: left\" data-start=\"55\" data-end=\"369\">Güne enerjik başlamak, günün yorgunluğunu tamamen atmak ve kendini tam anlamıyla rahat hissetmek için ihtiyacın olan şey: <strong data-start=\"177\" data-end=\"194\">Empire Yatak!</strong> Sadece bir yatak değil, konforun en üst seviyeye taşındığı, vücudunu tam anlamıyla destekleyen ve her uyku anını bir lüks deneyimine dönüştüren <strong data-start=\"339\" data-end=\"366\">mükemmel bir uyku alanı</strong>.</p>\n<p style=\"text-align: left\" data-start=\"371\" data-end=\"544\">Eğer geceleri uykusuzluk çekiyorsan, sabahları yorgun kalkıyorsan veya yatağın rahat ama <strong data-start=\"460\" data-end=\"493\">“işte tam olarak aradığım bu”</strong> dedirtmiyorsa, Empire ile tanışmanın tam zamanı!</p>\n<p style=\"text-align: left\" data-start=\"371\" data-end=\"544\"><img class=\"alignleft wp-image-1489 \" src=\"https://selishome.com/wp-content/uploads/2025/02/KAPAK-27-1536x898-1-1024x599.png\" alt=\"\" width=\"567\" height=\"331\" /></p>\n<h3 style=\"text-align: left\" data-start=\"553\" data-end=\"582\"><strong data-start=\"557\" data-end=\"580\">Neden Empire Yatak?</strong></h3>\n<p style=\"text-align: left\" data-start=\"583\" data-end=\"772\"><strong data-start=\"583\" data-end=\"626\">Bir yatağın sadece rahat olması yetmez!</strong> Empire Yatak, rahatlığı <strong data-start=\"651\" data-end=\"711\">bilimsel destek, üstün malzeme kalitesi ve şık tasarımla</strong> birleştirerek sana <strong data-start=\"731\" data-end=\"761\">bambaşka bir uyku deneyimi</strong> sunuyor.</p>\n<p style=\"text-align: left\" data-start=\"774\" data-end=\"1195\">✔ <strong data-start=\"776\" data-end=\"817\">Omurganı destekleyen özel yay sistemi</strong> sayesinde sabahları ağrısız ve dinç uyanırsın.<br data-start=\"864\" data-end=\"867\" />✔ <strong data-start=\"869\" data-end=\"913\">Vücuda uyum sağlayan özel sünger dolgusu</strong>, her hareketine anında adapte olur.<br data-start=\"949\" data-end=\"952\" />✔ <strong data-start=\"954\" data-end=\"997\">Üstün hava geçirgenliği sağlayan kumaşı</strong>, terleme sorununu minimuma indirir.<br data-start=\"1033\" data-end=\"1036\" />✔ <strong data-start=\"1038\" data-end=\"1063\">Zarif ve şık tasarımı</strong>, yatak odana lüks bir dokunuş katar.<br data-start=\"1100\" data-end=\"1103\" />✔ <strong data-start=\"1105\" data-end=\"1148\">Dayanıklı ve uzun ömürlü malzeme yapısı</strong>, yıllarca ilk günkü konforu yaşamanı sağlar.</p>\n<p style=\"text-align: left\" data-start=\"1197\" data-end=\"1427\">Empire Yatak, <strong data-start=\"1211\" data-end=\"1259\">gün içinde seni en çok yoran şeyleri düşünüp</strong>, vücudunu en iyi şekilde destekleyecek şekilde tasarlandı. <strong data-start=\"1319\" data-end=\"1355\">Sabahları dinç, geceleri huzurlu</strong> olman için en iyi malzemeler ve en yenilikçi teknolojiler kullanıldı.</p>\n<h3 style=\"text-align: left\" data-start=\"1436\" data-end=\"1483\"><strong data-start=\"1440\" data-end=\"1481\">Tam Omurga Desteği ve Kesintisiz Uyku</strong></h3>\n<p style=\"text-align: left\" data-start=\"1484\" data-end=\"1720\">Uyku kalitenin en büyük düşmanı, <strong data-start=\"1517\" data-end=\"1560\">sabahları bel ve sırt ağrısıyla uyanmak</strong> değil mi? Empire Yatak, <strong data-start=\"1585\" data-end=\"1647\">omurganı mükemmel şekilde hizalayan özel destek katmanları</strong> sayesinde, uyurken bile vücudunun doğru pozisyonda kalmasını sağlıyor.</p>\n<p style=\"text-align: left\" data-start=\"1722\" data-end=\"1974\">💠 <strong data-start=\"1725\" data-end=\"1757\">Çift katmanlı destek süngeri</strong>, vücudunun ağırlığını dengeli dağıtır.<br data-start=\"1796\" data-end=\"1799\" />💠 <strong data-start=\"1802\" data-end=\"1827\">Ortopedik yay sistemi</strong>, her hareketinde yatağın sana uyum sağlamasını sağlar.<br data-start=\"1882\" data-end=\"1885\" />💠 <strong data-start=\"1888\" data-end=\"1919\">Kesintisiz uyku teknolojisi</strong>, uyku sırasında döndüğünde bile seni rahatsız etmez.</p>\n<p style=\"text-align: left\" data-start=\"1976\" data-end=\"2064\">Bu özel sistemler sayesinde <strong data-start=\"2004\" data-end=\"2062\">sabahları ağrısız ve yenilenmiş bir şekilde uyanırsın!</strong></p>\n<h3 data-start=\"2073\" data-end=\"2125\"><img class=\"wp-image-1490  alignleft\" src=\"https://selishome.com/wp-content/uploads/2025/02/1-28-1536x898-1-1024x599.png\" alt=\"\" width=\"564\" height=\"330\" /></h3>\n<h3 data-start=\"2073\" data-end=\"2125\"><strong data-start=\"2077\" data-end=\"2123\">Sıcak Yaz Günlerinde Terleme Sorununa Son!</strong></h3>\n<p data-start=\"2126\" data-end=\"2333\">Özellikle yaz aylarında, sıcaklar yüzünden <strong data-start=\"2169\" data-end=\"2183\">uyuyamamak</strong> tam bir işkence! Empire Yatak’ın özel hava sirkülasyonu sağlayan kumaşı, <strong data-start=\"2257\" data-end=\"2330\">ısıyı dengeler, hava akışını artırır ve serin bir uyku deneyimi sunar</strong>.</p>\n<p data-start=\"2335\" data-end=\"2570\">🌬️ <strong data-start=\"2339\" data-end=\"2375\">Nefes alabilen özel dokulu kumaş</strong>, gece boyunca terlemeyi önler.<br data-start=\"2406\" data-end=\"2409\" />🌬️ <strong data-start=\"2413\" data-end=\"2465\">Hava kanalları sayesinde serin kalma teknolojisi</strong>, ekstra konfor sunar.<br data-start=\"2487\" data-end=\"2490\" />🌬️ <strong data-start=\"2494\" data-end=\"2525\">Özel nem dengeleyici katman</strong>, cildinin her zaman kuru kalmasını sağlar.</p>\n<p data-start=\"2572\" data-end=\"2625\">Böylece <strong data-start=\"2580\" data-end=\"2623\">yazın bile rahat bir uyku çekebilirsin! </strong></p>\n<h3 data-start=\"2634\" data-end=\"2694\"><strong data-start=\"2638\" data-end=\"2692\">Çift Kişilik veya Tek Kişilik? Empire Herkes İçin!</strong></h3>\n<p data-start=\"2695\" data-end=\"2896\">Empire Yatak, hem <strong data-start=\"2713\" data-end=\"2728\">tek kişilik</strong> hem de <strong data-start=\"2736\" data-end=\"2752\">çift kişilik</strong> seçenekleriyle sunuluyor. Eğer <strong data-start=\"2784\" data-end=\"2836\">rahatına düşkünsen ve geniş bir yatak istiyorsan</strong>, <strong data-start=\"2838\" data-end=\"2879\">king size veya queen size seçenekleri</strong> tam sana göre!</p>\n<p data-start=\"2898\" data-end=\"3170\">👤 <strong data-start=\"2901\" data-end=\"2924\">Tek kişilik seçenek</strong>, genç odaları ve dar alanlar için mükemmel bir tercih.<br data-start=\"2979\" data-end=\"2982\" />👫 <strong data-start=\"2985\" data-end=\"3010\">Çift kişilik modeller</strong>, partnerinle birlikte <strong data-start=\"3033\" data-end=\"3061\">kesintisiz uyku deneyimi</strong> yaşaman için tasarlandı.<br data-start=\"3086\" data-end=\"3089\" />👑 <strong data-start=\"3092\" data-end=\"3122\">King &amp; Queen size yataklar</strong>, maksimum lüks ve geniş alan isteyenler için!</p>\n<p data-start=\"3172\" data-end=\"3255\">İster tek başına yat, ister biriyle paylaş, <strong data-start=\"3216\" data-end=\"3253\">Empire Yatak herkese uyum sağlar!</strong></p>",
        "price": 0,
        "categoryId": "7",
        "categorySlug": "genc-cocuk-odasi",
        "images": [
            "https://selishome.com/wp-content/uploads/2025/02/p10.png",
            "https://selishome.com/wp-content/uploads/2025/02/KAPAK-27-1536x898-1.png",
            "https://selishome.com/wp-content/uploads/2025/02/1-28-1536x898-1.png"
        ],
        "colors": [
            {
                "name": "Standart",
                "hex": "#D4C5B2"
            }
        ],
        "materials": [
            "Ahşap"
        ],
        "dimensions": {
            "width": 0,
            "height": 0,
            "depth": 0,
            "unit": "cm"
        },
        "stock": 10,
        "featured": false,
        "brand": "SelisHome"
    },
    {
        "id": "selis-1480",
        "name": "Titi Gamer Çocuk Odası",
        "slug": "titi-gamer-cocuk-odasi",
        "description": "<p data-start=\"0\" data-end=\"81\"><strong data-start=\"0\" data-end=\"79\">Titi Gamer Genç Odası: Oyuncular İçin Tasarlandı, Konfor ve Stil Bir Arada!</strong></p>\n<p data-start=\"83\" data-end=\"354\">Her oyuncunun hayalindeki oda burada! <strong data-start=\"121\" data-end=\"146\">Titi Gamer Genç Odası</strong>, oyun dünyasının heyecanını yaşam alanlarına taşıyan özel tasarımıyla fark yaratıyor. Eğer oyun tutkunuysan ve odanda hem konforu hem de havalı bir atmosferi bir arada istiyorsan, Titi Gamer tam sana göre!</p>\n<p data-start=\"356\" data-end=\"636\">Bu özel genç odası takımı, sadece oyun oynamak için değil, ders çalışırken, dinlenirken ve kendine özel bir alan oluştururken de maksimum rahatlık sunuyor. Ergonomik tasarımı, geniş depolama alanları ve <strong data-start=\"559\" data-end=\"590\">gaming temalı şık detayları</strong> ile tam bir oyuncu odası deneyimi sağlıyor.</p>\n<p><img class=\"wp-image-1485  alignleft\" src=\"https://selishome.com/wp-content/uploads/2025/02/IMG_6625-kopya-2048x1365-1-1024x683.jpg\" alt=\"\" width=\"689\" height=\"459\" /></p>\n<hr data-start=\"638\" data-end=\"643\" />\n<h3 data-start=\"645\" data-end=\"689\"><strong data-start=\"649\" data-end=\"687\">Gerçek Bir Gamer İçin Özel Tasarım</strong></h3>\n<p data-start=\"690\" data-end=\"935\">Gamer olmak sadece oyun oynamak değil, aynı zamanda bir yaşam tarzı! Titi Gamer Genç Odası, <strong data-start=\"782\" data-end=\"843\">dinamik tasarımı, LED ışık detayları ve keskin hatlarıyla</strong> modern bir görünüme sahip. Şık ve güçlü duruşu ile her köşesi oyun atmosferini yaşatıyor.</p>\n<p data-start=\"937\" data-end=\"1051\">Odanda hem oyun oynarken hem de dinlenirken rahat edebilmen için her detayı en ince ayrıntısına kadar düşünüldü.</p>\n<p data-start=\"1053\" data-end=\"1245\">🔥 <strong data-start=\"1056\" data-end=\"1089\">Gamer ruhunu yansıtan tasarım</strong><br data-start=\"1089\" data-end=\"1092\" />🔥 <strong data-start=\"1095\" data-end=\"1130\">Ergonomik çalışma ve oyun alanı</strong><br data-start=\"1130\" data-end=\"1133\" />🔥 <strong data-start=\"1136\" data-end=\"1164\">Geniş depolama çözümleri</strong><br data-start=\"1164\" data-end=\"1167\" />🔥 <strong data-start=\"1170\" data-end=\"1203\">Kaliteli ve dayanıklı malzeme</strong><br data-start=\"1203\" data-end=\"1206\" />🔥 <strong data-start=\"1209\" data-end=\"1243\">LED aydınlatmalı özel detaylar</strong></p>\n<hr data-start=\"1247\" data-end=\"1252\" />\n<h3 data-start=\"1254\" data-end=\"1312\"><strong data-start=\"1258\" data-end=\"1310\">Ergonomik Gamer Masası: Kazanmak İçin Tasarlandı</strong></h3>\n<p data-start=\"1313\" data-end=\"1618\">Titi Gamer Genç Odası&#8217;nın en dikkat çeken parçalarından biri, <strong data-start=\"1375\" data-end=\"1435\">oyuncular için özel tasarlanmış ergonomik çalışma masası</strong>. Oyuncuların uzun saatler boyunca rahat bir şekilde oyun oynayabilmesi ve çalışabilmesi için <strong data-start=\"1529\" data-end=\"1598\">geniş yüzey alanı, kablo yönetim sistemi ve sağlam iskelet yapısı</strong> ile desteklenmiş.</p>\n<p data-start=\"1620\" data-end=\"1887\">🎮 <strong data-start=\"1623\" data-end=\"1644\">Geniş masa yüzeyi</strong>, çoklu ekran kullanımına uygun<br data-start=\"1675\" data-end=\"1678\" />🎮 <strong data-start=\"1681\" data-end=\"1707\">Kablo yönetim yuvaları</strong>, düzenli ve temiz bir oyun alanı<br data-start=\"1740\" data-end=\"1743\" />🎮 <strong data-start=\"1746\" data-end=\"1773\">Özel LED ışık detayları</strong>, oyun atmosferini tamamlayan tasarım<br data-start=\"1810\" data-end=\"1813\" />🎮 <strong data-start=\"1816\" data-end=\"1863\">Dayanıklı ve çizilmeye karşı dirençli yüzey</strong>, uzun ömürlü kullanım</p>\n<p data-start=\"1889\" data-end=\"1973\">Bu masa, oyun oynarken sana tam anlamıyla <strong data-start=\"1931\" data-end=\"1960\">kontrolü ele alma hissini</strong> yaşatacak!</p>\n<hr data-start=\"1975\" data-end=\"1980\" />\n<h3 data-start=\"1982\" data-end=\"2022\"><strong data-start=\"1986\" data-end=\"2020\">Konforlu ve Havalı Gamer Yatak</strong></h3>\n<p data-start=\"2023\" data-end=\"2328\">Savaşlar biter ama uyku devam eder! Oyuncular için enerjiyi toplamak çok önemli. Titi Gamer Yatak, <strong data-start=\"2122\" data-end=\"2154\">geniş ve ergonomik yapısıyla</strong> kaliteli bir uyku deneyimi sunuyor. Uzun süre oyun oynadıktan sonra rahatça uzanabileceğin <strong data-start=\"2246\" data-end=\"2275\">dayanıklı ve şık tasarımı</strong>, odanın geri kalanıyla mükemmel bir uyum sağlıyor.</p>\n<p data-start=\"2330\" data-end=\"2600\">🛏️ <strong data-start=\"2334\" data-end=\"2359\">Sağlam iskelet yapısı</strong>, uzun yıllar dayanıklılık<br data-start=\"2385\" data-end=\"2388\" />🛏️ <strong data-start=\"2392\" data-end=\"2420\">Ergonomik yatak tasarımı</strong>, maksimum konfor<br data-start=\"2437\" data-end=\"2440\" />🛏️ <strong data-start=\"2444\" data-end=\"2475\">Gaming temalı yatak başlığı</strong>, odanın havasını tamamlayan estetik detay<br data-start=\"2517\" data-end=\"2520\" />🛏️ <strong data-start=\"2524\" data-end=\"2563\">Depolama alanı sunan bazalı seçenek</strong>, fazla eşyalar için mükemmel çözüm</p>\n<hr data-start=\"2602\" data-end=\"2607\" />\n<h3 data-start=\"2609\" data-end=\"2653\"><img class=\"wp-image-1484  alignleft\" src=\"https://selishome.com/wp-content/uploads/2025/02/IMG_6592-kopya-1365x2048-1-683x1024.jpg\" alt=\"\" width=\"433\" height=\"650\" /></h3>\n<h3 data-start=\"2609\" data-end=\"2653\"><strong data-start=\"2613\" data-end=\"2651\">Geniş ve Kullanışlı Gamer Gardırop</strong></h3>\n<p data-start=\"2654\" data-end=\"2874\">Bir oyuncunun sadece bilgisayarı değil, kıyafetleri ve ekipmanları da önemli! <strong data-start=\"2732\" data-end=\"2755\">Titi Gamer Gardırop</strong>, geniş iç hacmi sayesinde hem kıyafetlerini hem de oyun aksesuarlarını düzenli bir şekilde saklaman için tasarlandı.</p>\n<p data-start=\"2876\" data-end=\"3113\">🕹️ <strong data-start=\"2880\" data-end=\"2898\">Geniş iç hacim</strong>, maksimum depolama alanı<br data-start=\"2923\" data-end=\"2926\" />🕹️ <strong data-start=\"2930\" data-end=\"2953\">Özel raf sistemleri</strong>, ekipmanlarını düzenli tutman için ekstra alan<br data-start=\"3000\" data-end=\"3003\" />🕹️ <strong data-start=\"3007\" data-end=\"3038\">Gaming stili kapak tasarımı</strong>, şık ve modern görünüm<br data-start=\"3061\" data-end=\"3064\" />🕹️ <strong data-start=\"3068\" data-end=\"3089\">Dayanıklı malzeme</strong>, uzun ömürlü kullanım</p>\n<p data-start=\"3115\" data-end=\"3234\"><strong data-start=\"3115\" data-end=\"3154\">Minimalist ama fonksiyonel tasarımı</strong> ile tüm eşyalarını düzenli bir şekilde saklaman için ideal bir çözüm sunuyor!</p>\n<hr data-start=\"3236\" data-end=\"3241\" />\n<h3 data-start=\"3243\" data-end=\"3315\"><strong data-start=\"3247\" data-end=\"3313\">Şık ve Fonksiyonel Kitaplık: Bilgi ve Eğlenceyi Bir Arada Tut!</strong></h3>\n<p data-start=\"3316\" data-end=\"3557\">Eğer oyun dünyasında en iyi olmak istiyorsan, hem oyun bilgisini hem de akademik bilgini geliştirmek şart! Titi Gamer Kitaplık, kitaplarını, koleksiyon figürlerini ve oyun ekipmanlarını saklamak için <strong data-start=\"3516\" data-end=\"3540\">geniş raf sistemleri</strong> ile donatıldı.</p>\n<p data-start=\"3559\" data-end=\"3780\">📚 <strong data-start=\"3562\" data-end=\"3593\">Açık ve kapaklı raf sistemi</strong>, hem dekoratif hem işlevsel kullanım<br data-start=\"3630\" data-end=\"3633\" />📚 <strong data-start=\"3636\" data-end=\"3660\">Geniş depolama alanı</strong>, ekipmanlarını kolayca yerleştirme imkanı<br data-start=\"3702\" data-end=\"3705\" />📚 <strong data-start=\"3708\" data-end=\"3736\">Modern ve havalı tasarım</strong>, odanın genel stilini tamamlayan detaylar</p>\n<p data-start=\"3782\" data-end=\"3911\">Bu kitaplık sayesinde <strong data-start=\"3804\" data-end=\"3826\">bilgi ve eğlenceyi</strong> bir arada tutarak, en sevdiğin oyunların yanında kitaplarını da sergileyebilirsin!</p>\n<hr data-start=\"3913\" data-end=\"3918\" />\n<h3 data-start=\"3920\" data-end=\"3983\"><strong data-start=\"3924\" data-end=\"3981\">Gamer Odasında Olmazsa Olmaz LED Aydınlatma Detayları</strong></h3>\n<p data-start=\"3984\" data-end=\"4204\">Bir oyuncu odasının en dikkat çeken özelliklerinden biri, <strong data-start=\"4042\" data-end=\"4069\">ışıklandırma sistemidir</strong>! Titi Gamer Genç Odası’nda kullanılan <strong data-start=\"4108\" data-end=\"4135\">özel LED ışık detayları</strong>, odanın ambiyansını tam anlamıyla bir oyun arenasına dönüştürüyor.</p>\n<p data-start=\"4206\" data-end=\"4450\">🔹 <strong data-start=\"4209\" data-end=\"4228\">RGB LED ışıklar</strong>, istediğin renk tonunda odana özel bir hava katabilirsin<br data-start=\"4285\" data-end=\"4288\" />🔹 <strong data-start=\"4291\" data-end=\"4339\">Masada, yatakta ve kitaplıkta ışık detayları</strong>, her noktada şık bir aydınlatma<br data-start=\"4371\" data-end=\"4374\" />🔹 <strong data-start=\"4377\" data-end=\"4416\">Oyun atmosferini tamamlayan tasarım</strong>, odana bambaşka bir ruh katıyor</p>\n<p data-start=\"4452\" data-end=\"4564\">Bu ışıklandırmalar, gece oyun oynarken veya odanda dinlenirken <strong data-start=\"4515\" data-end=\"4540\">mükemmel bir atmosfer</strong> yaratmanı sağlayacak!</p>\n<hr data-start=\"4566\" data-end=\"4571\" />\n<h3 data-start=\"4573\" data-end=\"4611\"><strong data-start=\"4577\" data-end=\"4609\">Neden Titi Gamer Genç Odası?</strong></h3>\n<p data-start=\"4612\" data-end=\"4911\">✔ <strong data-start=\"4614\" data-end=\"4650\">Gerçek oyuncular için tasarlandı</strong><br data-start=\"4650\" data-end=\"4653\" />✔ <strong data-start=\"4655\" data-end=\"4701\">Dayanıklı ve uzun ömürlü malzeme kullanımı</strong><br data-start=\"4701\" data-end=\"4704\" />✔ <strong data-start=\"4706\" data-end=\"4740\">Geniş ve ergonomik oyun masası</strong><br data-start=\"4740\" data-end=\"4743\" />✔ <strong data-start=\"4745\" data-end=\"4792\">LED ışık detaylarıyla şık ve modern görünüm</strong><br data-start=\"4792\" data-end=\"4795\" />✔ <strong data-start=\"4797\" data-end=\"4857\">Maksimum depolama alanı sunan geniş gardırop ve kitaplık</strong><br data-start=\"4857\" data-end=\"4860\" />✔ <strong data-start=\"4862\" data-end=\"4909\">Rahat ve konforlu uyku deneyimi sunan yatak</strong></p>\n<p data-start=\"4913\" data-end=\"5001\">Bu oda, sadece bir yaşam alanı değil, aynı zamanda <strong data-start=\"4964\" data-end=\"4998\">oyun dünyasına açılan bir kapı</strong>!</p>\n<hr data-start=\"5003\" data-end=\"5006\" />\n<h3 data-start=\"5008\" data-end=\"5066\"><strong data-start=\"5012\" data-end=\"5064\">Sen de Gamer Ruhunu Yansıtan Bir Odaya Sahip Ol!</strong></h3>\n<p data-start=\"5067\" data-end=\"5286\">Titi Gamer Genç Odası, oyun tutkunu gençler için <strong data-start=\"5116\" data-end=\"5148\">mükemmel bir deneyim sunuyor</strong>. Maksimum konfor, modern tasarım ve fonksiyonelliği bir araya getiren bu özel koleksiyon, odanı gerçek bir oyun arenasına dönüştürecek!</p>\n<p data-start=\"5288\" data-end=\"5393\" data-is-last-node=\"\">🚀 <strong data-start=\"5291\" data-end=\"5388\">Selishome ayrıcalıklarıyla hemen keşfet ve Titi Gamer ile oyun dünyanı bir üst seviyeye taşı!</strong> 🎮🔥</p>",
        "price": 0,
        "categoryId": "7",
        "categorySlug": "genc-cocuk-odasi",
        "images": [
            "https://selishome.com/wp-content/uploads/2025/02/p9.png",
            "https://selishome.com/wp-content/uploads/2025/02/IMG_6603-kopya-2048x1415-1.jpg",
            "https://selishome.com/wp-content/uploads/2025/02/IMG_6608-kopya-scaled-1.jpg"
        ],
        "colors": [
            {
                "name": "Standart",
                "hex": "#D4C5B2"
            }
        ],
        "materials": [
            "Ahşap"
        ],
        "dimensions": {
            "width": 0,
            "height": 0,
            "depth": 0,
            "unit": "cm"
        },
        "stock": 10,
        "featured": false,
        "brand": "SelisHome"
    },
    {
        "id": "selis-1472",
        "name": "Still Genç Odası",
        "slug": "still-genc-odasi",
        "description": "<p data-start=\"0\" data-end=\"91\"><strong data-start=\"0\" data-end=\"89\">Still Genç Odası Grubu: Gençlerin Dinamik Dünyasına Modern ve Fonksiyonel Bir Dokunuş</strong></p>\n<p data-start=\"93\" data-end=\"490\">Gençlerin yaşam alanlarını hem konforlu hem de estetik açıdan mükemmel bir hale getirmek için tasarlanan <strong data-start=\"198\" data-end=\"224\">Still Genç Odası Grubu</strong>, modern tasarım anlayışı ve işlevsel detaylarıyla ön plana çıkıyor. Hem ders çalışmak hem de dinlenmek için ideal bir ortam sunan bu özel koleksiyon, geniş depolama alanları, sağlam malzeme kalitesi ve şık detaylarıyla gençlerin ihtiyaçlarını eksiksiz karşılıyor.</p>\n<h3 data-start=\"492\" data-end=\"528\"><strong data-start=\"496\" data-end=\"526\">Modern ve Zamansız Tasarım</strong></h3>\n<p data-start=\"529\" data-end=\"959\">Still Genç Odası Grubu, <strong data-start=\"553\" data-end=\"622\">çağdaş çizgileri, minimalist detayları ve fonksiyonel tasarımıyla</strong> her yaş grubundaki gençler için ideal bir tercih sunuyor. Kullanılan renk paleti ve malzeme kombinasyonu sayesinde, modern, klasik veya bohem dekorasyon stilleriyle uyum sağlıyor. <strong data-start=\"803\" data-end=\"835\">Sade ama etkileyici tasarımı</strong>, gençlerin kişisel tarzlarını özgürce yansıtmalarına olanak tanırken, odalarında düzenli ve ferah bir atmosfer yaratıyor.</p>\n<h3 data-start=\"961\" data-end=\"1009\"><strong data-start=\"965\" data-end=\"1007\">Üstün Malzeme Kalitesi ve Dayanıklılık</strong></h3>\n<p data-start=\"1010\" data-end=\"1145\">Still Genç Odası Grubu, <strong data-start=\"1034\" data-end=\"1064\">yüksek kaliteli malzemeler</strong> kullanılarak üretilmiştir ve uzun yıllar boyunca ilk günkü sağlamlığını korur.</p>\n<ul data-start=\"1147\" data-end=\"1420\">\n<li data-start=\"1147\" data-end=\"1226\"><strong data-start=\"1149\" data-end=\"1193\">Sağlam MDF ve yonga levha iskelet yapısı</strong>, darbelere karşı dayanıklıdır.</li>\n<li data-start=\"1227\" data-end=\"1341\"><strong data-start=\"1229\" data-end=\"1284\">Çevre dostu ve su bazlı boya ile kaplanmış yüzeyler</strong>, kimyasal içermediği için sağlıklı bir kullanım sunar.</li>\n<li data-start=\"1342\" data-end=\"1420\"><strong data-start=\"1344\" data-end=\"1377\">Kolay temizlenebilir yüzeyler</strong>, hijyenik ve pratik bir kullanım sağlar.</li>\n</ul>\n<p data-start=\"1422\" data-end=\"1571\">Bu özellikler sayesinde Still, gençlerin sağlığına zarar vermeden, yıllar boyunca güvenle kullanılabilecek bir genç odası grubu olarak öne çıkıyor.</p>\n<p data-start=\"1422\" data-end=\"1571\"><img class=\"wp-image-1476 alignleft\" src=\"https://selishome.com/wp-content/uploads/2025/02/1-23-1024x599.png\" alt=\"\" width=\"750\" height=\"439\" /></p>\n<h3 data-start=\"1573\" data-end=\"1621\"><strong data-start=\"1577\" data-end=\"1619\">Fonksiyonel ve Kullanıcı Dostu Tasarım</strong></h3>\n<p data-start=\"1622\" data-end=\"1765\">Gençlerin tüm ihtiyaçlarını göz önünde bulundurarak tasarlanan Still Genç Odası Grubu, <strong data-start=\"1709\" data-end=\"1747\">ergonomik ve işlevsel detaylarıyla</strong> dikkat çekiyor.</p>\n<h4 data-start=\"1767\" data-end=\"1804\"><strong data-start=\"1772\" data-end=\"1802\">1. Geniş ve Konforlu Yatak</strong></h4>\n<p data-start=\"1805\" data-end=\"1931\">Gençlerin rahat bir uyku deneyimi yaşaması için özel olarak tasarlanan yatak, hem estetik hem de ergonomik bir yapıya sahip.</p>\n<ul data-start=\"1933\" data-end=\"2185\">\n<li data-start=\"1933\" data-end=\"1991\"><strong data-start=\"1935\" data-end=\"1960\">Sağlam iskelet yapısı</strong>, uzun ömürlü kullanım sunar.</li>\n<li data-start=\"1992\" data-end=\"2074\"><strong data-start=\"1994\" data-end=\"2020\">Modern başlık tasarımı</strong>, odanın genel atmosferine sofistike bir hava katar.</li>\n<li data-start=\"2075\" data-end=\"2185\"><strong data-start=\"2077\" data-end=\"2121\">Bazalı veya alt çekmeceli yatak seçeneği</strong>, ekstra depolama alanı sunarak düzeni korumaya yardımcı olur.</li>\n</ul>\n<h4 data-start=\"2187\" data-end=\"2234\"><strong data-start=\"2192\" data-end=\"2232\">2. Ergonomik ve Geniş Çalışma Masası</strong></h4>\n<p data-start=\"2235\" data-end=\"2348\">Still Çalışma Masası, gençlerin verimli bir şekilde ders çalışabilmesi için ergonomik detaylarla donatılmıştır.</p>\n<ul data-start=\"2350\" data-end=\"2643\">\n<li data-start=\"2350\" data-end=\"2446\"><strong data-start=\"2352\" data-end=\"2373\">Geniş yüzey alanı</strong>, bilgisayar, defter ve kırtasiye malzemeleri için yeterli alan sağlar.</li>\n<li data-start=\"2447\" data-end=\"2559\"><strong data-start=\"2449\" data-end=\"2482\">Açık ve kapalı raf sistemleri</strong>, kitapları ve kişisel eşyaları düzenli bir şekilde saklamak için idealdir.</li>\n<li data-start=\"2560\" data-end=\"2643\"><strong data-start=\"2562\" data-end=\"2591\">Ergonomik masa yüksekliği</strong>, uzun saatler boyunca rahat çalışma imkanı sunar.</li>\n</ul>\n<h4 data-start=\"2645\" data-end=\"2687\"><strong data-start=\"2650\" data-end=\"2685\">3. Geniş ve Kullanışlı Gardırop</strong></h4>\n<p data-start=\"2688\" data-end=\"2841\">Still Gardırop, geniş iç hacmi ve akıllı depolama çözümleriyle gençlerin tüm kıyafet ve aksesuarlarını düzenli bir şekilde saklamalarına yardımcı olur.</p>\n<ul data-start=\"2843\" data-end=\"3125\">\n<li data-start=\"2843\" data-end=\"2950\"><strong data-start=\"2845\" data-end=\"2883\">Geniş askı alanı ve raf sistemleri</strong>, farklı kıyafet türleri için organize bir depolama imkanı sunar.</li>\n<li data-start=\"2951\" data-end=\"3041\"><strong data-start=\"2953\" data-end=\"2986\">Kapaklı ve çekmeceli bölmeler</strong>, küçük eşyaların kolay erişilebilir olmasını sağlar.</li>\n<li data-start=\"3042\" data-end=\"3125\"><strong data-start=\"3044\" data-end=\"3076\">Şık ve modern kapak tasarımı</strong>, odanın dekorasyonuna zarif bir dokunuş katar.</li>\n</ul>\n<h4 data-start=\"3127\" data-end=\"3168\"><strong data-start=\"3132\" data-end=\"3166\">4. Şık ve Fonksiyonel Kitaplık</strong></h4>\n<p data-start=\"3169\" data-end=\"3364\">Gençlerin hem kitaplarını hem de dekoratif objelerini düzenli bir şekilde yerleştirebileceği <strong data-start=\"3262\" data-end=\"3296\">modern tasarıma sahip kitaplık</strong>, odanın genel atmosferine uyum sağlayacak şekilde tasarlanmıştır.</p>\n<ul data-start=\"3366\" data-end=\"3591\">\n<li data-start=\"3366\" data-end=\"3448\"><strong data-start=\"3368\" data-end=\"3383\">Açık raflar</strong>, kitapları ve dekoratif aksesuarları sergilemek için idealdir.</li>\n<li data-start=\"3449\" data-end=\"3522\"><strong data-start=\"3451\" data-end=\"3471\">Kapaklı bölmeler</strong>, özel eşyaları saklamak için ekstra alan sağlar.</li>\n<li data-start=\"3523\" data-end=\"3591\"><strong data-start=\"3525\" data-end=\"3550\">Sağlam malzeme yapısı</strong>, uzun ömürlü kullanım garantisi sunar.</li>\n</ul>\n<h3 data-start=\"3593\" data-end=\"3652\"><strong data-start=\"3597\" data-end=\"3650\">Her Dekorasyona Uygun Renk ve Tasarım Seçenekleri</strong></h3>\n<p data-start=\"3653\" data-end=\"3768\">Still Genç Odası Grubu, <strong data-start=\"3677\" data-end=\"3723\">gençlerin enerjik ve dinamik tarzına uygun</strong> renk ve doku seçenekleriyle sunulmaktadır.</p>\n<ul data-start=\"3770\" data-end=\"4019\">\n<li data-start=\"3770\" data-end=\"3863\"><strong data-start=\"3772\" data-end=\"3861\">Minimalist ve modern dekorasyonlar için soft tonlar (beyaz, gri, açık ahşap dokuları)</strong></li>\n<li data-start=\"3864\" data-end=\"3942\"><strong data-start=\"3866\" data-end=\"3940\">Sıcak ve samimi bir atmosfer için koyu ahşap tonları ve pastel renkler</strong></li>\n<li data-start=\"3943\" data-end=\"4019\"><strong data-start=\"3945\" data-end=\"4017\">Gençlerin enerjisini yansıtacak cesur ve modern renk kombinasyonları</strong></li>\n</ul>\n<p data-start=\"4021\" data-end=\"4129\">Bu sayede her tarza ve mekana uyum sağlayan Still, gençlerin yaşam alanlarını daha keyifli hale getiriyor.</p>\n<h3 data-start=\"4131\" data-end=\"4171\"><strong data-start=\"4135\" data-end=\"4169\">Güçlü ve Estetik Ayak Tasarımı</strong></h3>\n<p data-start=\"4172\" data-end=\"4331\">Still Genç Odası Grubu’nun zarif tasarımını tamamlayan <strong data-start=\"4227\" data-end=\"4259\">yüksek ve sağlam ayak yapısı</strong>, modern duruşunun yanı sıra pratik bir kullanım avantajı da sağlıyor.</p>\n<ul data-start=\"4333\" data-end=\"4537\">\n<li data-start=\"4333\" data-end=\"4428\"><strong data-start=\"4335\" data-end=\"4359\">Yüksek ayak tasarımı</strong>, temizlik kolaylığı sunar ve odanın daha ferah görünmesini sağlar.</li>\n<li data-start=\"4429\" data-end=\"4537\"><strong data-start=\"4431\" data-end=\"4468\">Metal veya ahşap ayak seçenekleri</strong>, kişisel tercihlere göre farklı dekorasyon tarzlarına uyum sağlar.</li>\n</ul>\n<p><img class=\"alignnone wp-image-1475 size-full\" src=\"https://selishome.com/wp-content/uploads/2025/02/2-22-1536x898-1.png\" alt=\"\" width=\"1536\" height=\"898\" /></p>\n<h3 data-start=\"4539\" data-end=\"4578\"><strong data-start=\"4543\" data-end=\"4576\">Neden Still Genç Odası Grubu?</strong></h3>\n<p data-start=\"4579\" data-end=\"4893\">✔ <strong data-start=\"4581\" data-end=\"4608\">Modern ve zarif tasarım</strong><br data-start=\"4608\" data-end=\"4611\" />✔ <strong data-start=\"4613\" data-end=\"4663\">Yüksek kaliteli ve dayanıklı malzeme kullanımı</strong><br data-start=\"4663\" data-end=\"4666\" />✔ <strong data-start=\"4668\" data-end=\"4721\">Ergonomik ve konforlu yatak, masa ve oturma alanı</strong><br data-start=\"4721\" data-end=\"4724\" />✔ <strong data-start=\"4726\" data-end=\"4768\">Geniş ve kullanışlı depolama çözümleri</strong><br data-start=\"4768\" data-end=\"4771\" />✔ <strong data-start=\"4773\" data-end=\"4831\">Gençlerin sağlığını ön planda tutan çevre dostu üretim</strong><br data-start=\"4831\" data-end=\"4834\" />✔ <strong data-start=\"4836\" data-end=\"4891\">Her dekorasyon tarzına uygun geniş renk seçenekleri</strong></p>\n<h3 data-start=\"4895\" data-end=\"4962\"><strong data-start=\"4899\" data-end=\"4960\">Gençlerin Özgür ve Konforlu Alanlarını Still ile Yaratın!</strong></h3>\n<p data-start=\"4963\" data-end=\"5236\">Still Genç Odası Grubu, <strong data-start=\"4987\" data-end=\"5098\">hem fonksiyonelliği hem de estetik duruşu ile gençlerin konforunu en üst düzeye çıkaran özel bir koleksiyon</strong>. Yüksek kaliteli malzemeleri, geniş depolama alanları ve şık tasarımıyla genç odalarına zamansız bir şıklık ve maksimum konfor katıyor.</p>\n<p data-start=\"5238\" data-end=\"5365\" data-is-last-node=\"\"><strong data-start=\"5238\" data-end=\"5365\" data-is-last-node=\"\">Şimdi Selishome ayrıcalıklarıyla Still Genç Odası Grubu’nu keşfedin ve gençlerin yaşam alanlarına modern bir dokunuş katın!</strong></p>",
        "price": 0,
        "categoryId": "7",
        "categorySlug": "genc-cocuk-odasi",
        "images": [
            "https://selishome.com/wp-content/uploads/2025/02/p8.png",
            "https://selishome.com/wp-content/uploads/2025/02/3-18-1536x898-1.png",
            "https://selishome.com/wp-content/uploads/2025/02/2-22-1536x898-1.png",
            "https://selishome.com/wp-content/uploads/2025/02/1-23.png"
        ],
        "colors": [
            {
                "name": "Standart",
                "hex": "#D4C5B2"
            }
        ],
        "materials": [
            "Ahşap"
        ],
        "dimensions": {
            "width": 0,
            "height": 0,
            "depth": 0,
            "unit": "cm"
        },
        "stock": 10,
        "featured": false,
        "brand": "SelisHome"
    },
    {
        "id": "selis-1466",
        "name": "Bambu Genç Odası",
        "slug": "bambu-genc-odasi",
        "description": "<p data-start=\"0\" data-end=\"78\"><strong data-start=\"0\" data-end=\"76\">Bambu Genç Odası Grubu: Doğal Şıklık ve Fonksiyonelliğin Buluşma Noktası</strong></p>\n<p data-start=\"80\" data-end=\"468\">Genç odaları, bireysel tarzın ve konforun ön planda olduğu özel alanlardır. <strong data-start=\"156\" data-end=\"182\">Bambu Genç Odası Grubu</strong>, doğallığı, modern tasarımı ve fonksiyonelliği bir araya getirerek gençlerin yaşam alanlarını hem estetik hem de kullanışlı hale getiriyor. Ahşabın sıcak dokusunu ve bambunun zarif detaylarını taşıyan bu özel tasarım, sağlıklı, ergonomik ve uzun ömürlü bir genç odası çözümü sunuyor.</p>\n<h3 data-start=\"470\" data-end=\"502\"><strong data-start=\"474\" data-end=\"500\">Doğal ve Sıcak Tasarım</strong></h3>\n<p data-start=\"503\" data-end=\"858\">Bambu Genç Odası Grubu, <strong data-start=\"527\" data-end=\"561\">sade ama göz alıcı tasarımıyla</strong> gençlerin dinamik ve enerjik dünyasına uyum sağlıyor. Doğal ahşap tonlarıyla harmanlanmış bambu detayları, odaya sıcak ve huzurlu bir atmosfer kazandırıyor. Bu sayede gençler, kendi tarzlarını yansıtabilecekleri bir alan oluştururken, aynı zamanda doğallığın sunduğu rahatlığı da hissediyorlar.</p>\n<h3 data-start=\"860\" data-end=\"919\"><strong data-start=\"864\" data-end=\"917\">Tamamen Sağlıklı ve Çevre Dostu Malzeme Kullanımı</strong></h3>\n<p data-start=\"920\" data-end=\"1022\">Sağlıklı yaşam alanları oluşturmak, <strong data-start=\"956\" data-end=\"986\">Bambu Genç Odası Grubu’nun</strong> en büyük önceliklerinden biridir.</p>\n<ul data-start=\"1024\" data-end=\"1234\">\n<li data-start=\"1024\" data-end=\"1079\"><strong data-start=\"1026\" data-end=\"1077\">Doğal ve çevre dostu malzemelerle üretilmiştir.</strong></li>\n<li data-start=\"1080\" data-end=\"1156\"><strong data-start=\"1082\" data-end=\"1154\">Zararlı kimyasal içermeyen, su bazlı boya ve cilalar kullanılmıştır.</strong></li>\n<li data-start=\"1157\" data-end=\"1234\"><strong data-start=\"1159\" data-end=\"1232\">Dayanıklı ve uzun ömürlü MDF ve masif ahşap iskelet ile üretilmiştir.</strong></li>\n</ul>\n<p data-start=\"1236\" data-end=\"1375\">Bu özellikleri sayesinde hem çevreye duyarlı bir yaklaşım benimsenmiş hem de gençlerin sağlıklı bir ortamda vakit geçirmesi sağlanmıştır.</p>\n<h3 data-start=\"1377\" data-end=\"1433\"><strong data-start=\"1381\" data-end=\"1431\">Gençlerin İhtiyacına Göre Fonksiyonel Çözümler</strong></h3>\n<p data-start=\"1434\" data-end=\"1723\">Bir genç odasının sadece uyumak için değil, aynı zamanda ders çalışmak, dinlenmek ve kişisel hobilerini geliştirmek için de uygun olması gerekir. Bambu Genç Odası Grubu, <strong data-start=\"1604\" data-end=\"1683\">geniş depolama alanları, ergonomik tasarımı ve akıllı yerleşim çözümleriyle</strong> gençlerin tüm ihtiyaçlarını karşılar.</p>\n<p data-start=\"1434\" data-end=\"1723\"><img class=\"wp-image-1469  alignleft\" src=\"https://selishome.com/wp-content/uploads/2025/02/2-2-1536x898-1-1024x599.png\" alt=\"\" width=\"800\" height=\"468\" /></p>\n<h4 data-start=\"1725\" data-end=\"1765\"><strong data-start=\"1730\" data-end=\"1763\">1. Geniş ve Rahat Yatak Alanı</strong></h4>\n<p data-start=\"1766\" data-end=\"1930\">Gençlerin dinlenme ve rahat bir uyku deneyimi yaşaması için özel olarak tasarlanan yatak, geniş oturum alanı ve sağlam iskelet yapısıyla uzun yıllar konfor sunar.</p>\n<ul data-start=\"1932\" data-end=\"2140\">\n<li data-start=\"1932\" data-end=\"1995\"><strong data-start=\"1934\" data-end=\"1962\">Dayanıklı iskelet yapısı</strong> sayesinde uzun ömürlü kullanım</li>\n<li data-start=\"1996\" data-end=\"2082\"><strong data-start=\"1998\" data-end=\"2031\">Modern ve şık başlık tasarımı</strong>, dekorasyona uyum sağlayan doğal bambu detayları</li>\n<li data-start=\"2083\" data-end=\"2140\"><strong data-start=\"2085\" data-end=\"2138\">Ekstra depolama alanı sunan bazalı yatak seçeneği</strong></li>\n</ul>\n<h4 data-start=\"2142\" data-end=\"2189\"><strong data-start=\"2147\" data-end=\"2187\">2. Ergonomik ve Geniş Çalışma Masası</strong></h4>\n<p data-start=\"2190\" data-end=\"2347\">Gençlerin rahat bir şekilde ders çalışmasını sağlayan çalışma masası, <strong data-start=\"2260\" data-end=\"2325\">geniş yüzeyi, sağlam ayak yapısı ve pratik depolama çözümleri</strong> ile dikkat çekiyor.</p>\n<ul data-start=\"2349\" data-end=\"2553\">\n<li data-start=\"2349\" data-end=\"2400\"><strong data-start=\"2351\" data-end=\"2398\">Rahat çalışma alanı sunan geniş masa yüzeyi</strong></li>\n<li data-start=\"2401\" data-end=\"2488\"><strong data-start=\"2403\" data-end=\"2486\">Kitaplar, defterler ve kırtasiye malzemeleri için açık ve kapalı raf sistemleri</strong></li>\n<li data-start=\"2489\" data-end=\"2553\"><strong data-start=\"2491\" data-end=\"2551\">Şık ve kullanışlı çekmecelerle düzenli bir çalışma alanı</strong></li>\n</ul>\n<h4 data-start=\"2555\" data-end=\"2597\"><strong data-start=\"2560\" data-end=\"2595\">3. Geniş ve Kullanışlı Gardırop</strong></h4>\n<p data-start=\"2598\" data-end=\"2745\">Gençlerin giysi ve aksesuarlarını düzenli bir şekilde saklayabilmesi için <strong data-start=\"2672\" data-end=\"2727\">geniş iç hacme sahip, bölmeli ve çekmeceli gardırop</strong> tasarlanmıştır.</p>\n<ul data-start=\"2747\" data-end=\"3010\">\n<li data-start=\"2747\" data-end=\"2820\"><strong data-start=\"2749\" data-end=\"2781\">Bambu detaylı kapak tasarımı</strong>, doğallık ve şıklığı bir arada sunar</li>\n<li data-start=\"2821\" data-end=\"2913\"><strong data-start=\"2823\" data-end=\"2865\">Geniş askı bölmeleri ve raf sistemleri</strong>, tüm kıyafetlerin düzenli saklanmasını sağlar</li>\n<li data-start=\"2914\" data-end=\"3010\"><strong data-start=\"2916\" data-end=\"2937\">Ekstra çekmeceler</strong>, küçük eşyaların kolay erişilebilir şekilde saklanmasına yardımcı olur</li>\n</ul>\n<h4 data-start=\"3012\" data-end=\"3053\"><strong data-start=\"3017\" data-end=\"3051\">4. Şık ve Fonksiyonel Kitaplık</strong></h4>\n<p data-start=\"3054\" data-end=\"3175\">Kitap okumayı seven gençler için tasarlanan <strong data-start=\"3098\" data-end=\"3130\">bambu detaylı geniş kitaplık</strong>, dekoratif ve işlevsel bir alan oluşturur.</p>\n<ul data-start=\"3177\" data-end=\"3378\">\n<li data-start=\"3177\" data-end=\"3267\"><strong data-start=\"3179\" data-end=\"3202\">Açık raf sistemleri</strong>, kitapların ve dekoratif objelerin sergilenmesine olanak tanır</li>\n<li data-start=\"3268\" data-end=\"3328\"><strong data-start=\"3270\" data-end=\"3290\">Kapaklı bölmeler</strong>, özel eşyaların saklanmasını sağlar</li>\n<li data-start=\"3329\" data-end=\"3378\"><strong data-start=\"3331\" data-end=\"3348\">Sağlam yapısı</strong>, uzun süreli kullanım sunar</li>\n</ul>\n<h3 data-start=\"3380\" data-end=\"3439\"><strong data-start=\"3384\" data-end=\"3437\">Her Dekorasyona Uygun Renk ve Tasarım Seçenekleri</strong></h3>\n<p data-start=\"3440\" data-end=\"3564\">Bambu Genç Odası Grubu, <strong data-start=\"3464\" data-end=\"3499\">doğal ahşap ve bambu tonlarıyla</strong>, modern ve klasik dekorasyon tarzlarıyla mükemmel uyum sağlar.</p>\n<ul data-start=\"3566\" data-end=\"3815\">\n<li data-start=\"3566\" data-end=\"3648\"><strong data-start=\"3568\" data-end=\"3610\">Bej, açık kahve ve doğal ahşap tonları</strong>, sıcak ve samimi bir ortam yaratır.</li>\n<li data-start=\"3649\" data-end=\"3739\"><strong data-start=\"3651\" data-end=\"3681\">Soft pastel ve gri tonları</strong>, modern ve minimalist dekorasyon anlayışına hitap eder.</li>\n<li data-start=\"3740\" data-end=\"3815\"><strong data-start=\"3742\" data-end=\"3765\">Koyu ahşap detaylar</strong>, odada şık ve sofistike bir atmosfer oluşturur.</li>\n</ul>\n<p><img class=\"alignnone wp-image-1468 size-full\" src=\"https://selishome.com/wp-content/uploads/2025/02/1-2-1536x898-1.png\" alt=\"\" width=\"1536\" height=\"898\" /></p>\n<h3 data-start=\"3817\" data-end=\"3856\"><strong data-start=\"3821\" data-end=\"3854\">Neden Bambu Genç Odası Grubu?</strong></h3>\n<ol data-start=\"3857\" data-end=\"4157\">\n<li data-start=\"3857\" data-end=\"3901\"><strong data-start=\"3860\" data-end=\"3899\">Sağlıklı ve doğal malzeme kullanımı</strong></li>\n<li data-start=\"3902\" data-end=\"3961\"><strong data-start=\"3905\" data-end=\"3959\">Ergonomik ve gençlerin ihtiyaçlarına uygun tasarım</strong></li>\n<li data-start=\"3962\" data-end=\"4007\"><strong data-start=\"3965\" data-end=\"4005\">Şık, fonksiyonel ve uzun ömürlü yapı</strong></li>\n<li data-start=\"4008\" data-end=\"4069\"><strong data-start=\"4011\" data-end=\"4067\">Geniş depolama alanları ve akıllı yerleşim çözümleri</strong></li>\n<li data-start=\"4070\" data-end=\"4157\"><strong data-start=\"4073\" data-end=\"4155\">Çevre dostu üretim ve sağlığa zararlı kimyasallar içermeyen boya ve malzemeler</strong></li>\n</ol>\n<h3 data-start=\"4159\" data-end=\"4202\"><strong data-start=\"4163\" data-end=\"4200\">Evinize Doğallık ve Konfor Katın!</strong></h3>\n<p data-start=\"4203\" data-end=\"4502\">Bambu Genç Odası Grubu, <strong data-start=\"4227\" data-end=\"4278\">doğal şıklığı, fonksiyonelliği ve dayanıklılığı</strong> bir araya getirerek gençlerin yaşam alanlarını daha keyifli hale getiriyor. Kaliteli malzemesi, zamansız tasarımı ve ergonomik detaylarıyla gençlerin hem rahat hem de verimli bir ortamda zaman geçirmesine olanak sağlıyor.</p>\n<p data-start=\"4504\" data-end=\"4619\" data-is-last-node=\"\">Şimdi <strong data-start=\"4510\" data-end=\"4540\">Selishome ayrıcalıklarıyla</strong> Bambu Genç Odası Grubu’nu keşfedin ve genç odalarına doğanın huzurunu taşıyın!</p>",
        "price": 0,
        "categoryId": "7",
        "categorySlug": "genc-cocuk-odasi",
        "images": [
            "https://selishome.com/wp-content/uploads/2025/02/p7.png",
            "https://selishome.com/wp-content/uploads/2025/02/1-2-1536x898-1.png",
            "https://selishome.com/wp-content/uploads/2025/02/2-2-1536x898-1.png",
            "https://selishome.com/wp-content/uploads/2025/02/kapak-2-1536x898-1.png"
        ],
        "colors": [
            {
                "name": "Standart",
                "hex": "#D4C5B2"
            }
        ],
        "materials": [
            "Ahşap"
        ],
        "dimensions": {
            "width": 0,
            "height": 0,
            "depth": 0,
            "unit": "cm"
        },
        "stock": 10,
        "featured": false,
        "brand": "SelisHome"
    },
    {
        "id": "selis-1444",
        "name": "Machka Oturma Grubu",
        "slug": "machka-oturma-grubu",
        "description": "<p data-start=\"0\" data-end=\"64\"><strong data-start=\"0\" data-end=\"62\">Machka Köşe Koltuk Takımı: Zamansız Şıklık ve Üstün Konfor</strong></p>\n<p data-start=\"66\" data-end=\"402\">Ev dekorasyonunda şıklık, konfor ve fonksiyonelliği bir arada arayanlar için tasarlanan <strong data-start=\"154\" data-end=\"183\">Machka Köşe Koltuk Takımı</strong>, zarif detayları, geniş oturma alanı ve yüksek konforu ile öne çıkıyor. Estetik görünümüyle modern ve klasik dekorasyon stilleriyle mükemmel bir uyum sağlayan Machka, yaşam alanlarınıza sofistike bir dokunuş katıyor.</p>\n<h3 data-start=\"404\" data-end=\"437\"><strong data-start=\"408\" data-end=\"435\">Modern ve Zarif Tasarım</strong></h3>\n<p data-start=\"438\" data-end=\"746\">Machka Köşe Koltuk Takımı, <strong data-start=\"465\" data-end=\"499\">minimalist ve modern çizgileri</strong> ile evinizin havasını tamamen değiştiriyor. <strong data-start=\"544\" data-end=\"575\">İnce hatlara sahip tasarımı</strong>, ahşap veya metal ayak seçenekleri ve özenle seçilmiş döşeme kumaşı, onu sadece bir koltuk takımı olmaktan çıkarıp evinizin en dikkat çekici mobilyası haline getiriyor.</p>\n<h3 data-start=\"748\" data-end=\"780\"><strong data-start=\"752\" data-end=\"778\">Üstün Malzeme Kalitesi</strong></h3>\n<p data-start=\"781\" data-end=\"1177\">Kaliteyi konforla buluşturan Machka, <strong data-start=\"818\" data-end=\"882\">dayanıklı ahşap iskeleti ve yüksek yoğunluklu sünger dolgusu</strong> sayesinde uzun yıllar boyunca formunu koruyor. Özel seçilmiş döşeme kumaşı, hem yumuşak dokusu hem de leke tutmaz ve kolay temizlenebilir özelliği ile kullanım kolaylığı sağlıyor. Günlük kullanımda pratiklik sunarken, zarif yapısıyla da oturma alanlarınıza sofistike bir görünüm kazandırıyor.</p>\n<p data-start=\"781\" data-end=\"1177\"><img class=\"alignnone wp-image-1447 size-full\" src=\"https://selishome.com/wp-content/uploads/2025/02/3-1.jpg\" alt=\"\" width=\"1920\" height=\"1123\" /></p>\n<h3 data-start=\"1179\" data-end=\"1225\"><strong data-start=\"1183\" data-end=\"1223\">Maksimum Konfor Sunan Ergonomik Yapı</strong></h3>\n<p data-start=\"1226\" data-end=\"1521\">Machka Köşe Koltuk Takımı, sadece estetik bir ürün değil, aynı zamanda <strong data-start=\"1297\" data-end=\"1355\">maksimum konfor sağlayan ergonomik bir oturma deneyimi</strong> sunuyor. <strong data-start=\"1365\" data-end=\"1414\">Yumuşak sırt minderleri ve geniş oturum alanı</strong>, vücudu destekleyerek rahat bir oturma pozisyonu sağlarken, günün yorgunluğunu atmanıza yardımcı oluyor.</p>\n<ul data-start=\"1523\" data-end=\"1769\">\n<li data-start=\"1523\" data-end=\"1606\"><strong data-start=\"1525\" data-end=\"1561\">Yüksek yoğunluklu sünger dolgusu</strong>, çökme yapmaz ve uzun süreli konfor sunar.</li>\n<li data-start=\"1607\" data-end=\"1679\"><strong data-start=\"1609\" data-end=\"1645\">Ortopedik sırt destek minderleri</strong>, rahatlatıcı bir oturum sağlar.</li>\n<li data-start=\"1680\" data-end=\"1769\"><strong data-start=\"1682\" data-end=\"1704\">Geniş oturum alanı</strong>, rahatça uzanmanızı ve konforlu bir deneyim yaşamanızı sağlar.</li>\n</ul>\n<h3 data-start=\"1771\" data-end=\"1813\"><strong data-start=\"1775\" data-end=\"1811\">Geniş ve Kullanışlı Oturma Alanı</strong></h3>\n<p data-start=\"1814\" data-end=\"2153\">Machka, <strong data-start=\"1822\" data-end=\"1909\">büyük ve küçük yaşam alanlarına uyum sağlayabilecek farklı ölçülerde tasarlanmıştır</strong>. Geniş aileler için mükemmel bir tercih olan bu takım, misafirlerinizi ağırlamak için de oldukça idealdir. Geniş oturum alanı sayesinde <strong data-start=\"2046\" data-end=\"2121\">film izlemek, kitap okumak veya sevdiklerinizle keyifli sohbetler etmek</strong> için mükemmel bir alan sunar.</p>\n<h3 data-start=\"2155\" data-end=\"2203\"><strong data-start=\"2159\" data-end=\"2201\">Fonksiyonel ve Kullanıcı Dostu Tasarım</strong></h3>\n<p data-start=\"2204\" data-end=\"2318\">Machka Köşe Koltuk Takımı, sadece şık bir mobilya değil, aynı zamanda <strong data-start=\"2274\" data-end=\"2306\">kullanıcı dostu bir tasarıma</strong> sahiptir.</p>\n<ul data-start=\"2320\" data-end=\"2559\">\n<li data-start=\"2320\" data-end=\"2415\"><strong data-start=\"2322\" data-end=\"2340\">Modüler yapısı</strong>, salonun genişliğine ve dekorasyon stiline uygun şekilde düzenlenebilir.</li>\n<li data-start=\"2416\" data-end=\"2490\"><strong data-start=\"2418\" data-end=\"2449\">Kolay temizlenebilir kumaşı</strong>, hijyen ve uzun ömürlü kullanım sunar.</li>\n<li data-start=\"2491\" data-end=\"2559\"><strong data-start=\"2493\" data-end=\"2520\">Farklı renk seçenekleri</strong>, her dekorasyon tarzına uyum sağlar.</li>\n</ul>\n<p>&nbsp;</p>\n<p><img class=\"alignleft wp-image-1446 \" src=\"https://selishome.com/wp-content/uploads/2025/02/4-1-1024x599.jpg\" alt=\"\" width=\"780\" height=\"456\" /></p>\n<h3 data-start=\"2561\" data-end=\"2615\"><strong data-start=\"2565\" data-end=\"2613\">Her Dekorasyona Uygun Geniş Renk Seçenekleri</strong></h3>\n<p data-start=\"2616\" data-end=\"2723\">Machka Köşe Koltuk Takımı, <strong data-start=\"2643\" data-end=\"2667\">zamansız renk paleti</strong> ile her türlü dekorasyon tarzına kolayca uyum sağlar.</p>\n<ul data-start=\"2725\" data-end=\"2960\">\n<li data-start=\"2725\" data-end=\"2805\"><strong data-start=\"2727\" data-end=\"2803\">Modern ve minimalist evler için açık gri, bej, antrasit gibi soft tonlar</strong></li>\n<li data-start=\"2806\" data-end=\"2889\"><strong data-start=\"2808\" data-end=\"2887\">Daha klasik ve sıcak bir atmosfer isteyenler için kahverengi ve koyu tonlar</strong></li>\n<li data-start=\"2890\" data-end=\"2960\"><strong data-start=\"2892\" data-end=\"2958\">Canlı ve enerjik alanlar için pastel ve cesur renk seçenekleri</strong></li>\n</ul>\n<p data-start=\"2962\" data-end=\"3083\">Her bir renk, evinize farklı bir karakter katarken, Machka’nın zarif dokusuyla birleşerek göz alıcı bir etki yaratıyor.</p>\n<h3 data-start=\"3085\" data-end=\"3125\"><strong data-start=\"3089\" data-end=\"3123\">Güçlü ve Estetik Ayak Tasarımı</strong></h3>\n<p data-start=\"3126\" data-end=\"3251\">Machka Köşe Koltuk Takımı’nın estetiğini tamamlayan en önemli unsurlardan biri de <strong data-start=\"3208\" data-end=\"3248\">modern ve dayanıklı ayak tasarımıdır</strong>.</p>\n<ul data-start=\"3253\" data-end=\"3460\">\n<li data-start=\"3253\" data-end=\"3367\"><strong data-start=\"3255\" data-end=\"3279\">Yüksek ayak tasarımı</strong>, temizlik açısından kolaylık sağlarken, takıma hafif ve zarif bir görünüm kazandırır.</li>\n<li data-start=\"3368\" data-end=\"3460\"><strong data-start=\"3370\" data-end=\"3402\">Metal veya ahşap seçenekleri</strong>, kişisel zevkinize ve dekorasyon tarzınıza uyum sağlar.</li>\n</ul>\n<h3 data-start=\"3462\" data-end=\"3499\"><strong data-start=\"3466\" data-end=\"3497\">Evinizin En Konforlu Köşesi</strong></h3>\n<p data-start=\"3500\" data-end=\"3760\">Machka Köşe Koltuk Takımı, <strong data-start=\"3527\" data-end=\"3631\">hem konforlu hem de estetik açıdan şık bir oturma alanı yaratmak isteyenler için mükemmel bir tercih</strong>. Kullanıcı dostu yapısı, yüksek kaliteli malzemeleri ve fonksiyonelliği ile evinizin en çok tercih edilen noktası olmaya aday.</p>\n<p data-start=\"3762\" data-end=\"3907\" data-is-last-node=\"\">Şimdi <strong data-start=\"3768\" data-end=\"3798\">Selishome ayrıcalıklarıyla</strong> Machka Köşe Koltuk Takımı’nı keşfedin ve yaşam alanlarınıza <strong data-start=\"3859\" data-end=\"3900\">şık, konforlu ve zamansız bir dokunuş</strong> katın!</p>",
        "price": 0,
        "categoryId": "1",
        "categorySlug": "oturma-odasi",
        "images": [
            "https://selishome.com/wp-content/uploads/2025/02/p6.png",
            "https://selishome.com/wp-content/uploads/2025/02/4-1.jpg",
            "https://selishome.com/wp-content/uploads/2025/02/3-1.jpg",
            "https://selishome.com/wp-content/uploads/2025/02/2-1.jpg"
        ],
        "colors": [
            {
                "name": "Standart",
                "hex": "#D4C5B2"
            }
        ],
        "materials": [
            "Ahşap"
        ],
        "dimensions": {
            "width": 0,
            "height": 0,
            "depth": 0,
            "unit": "cm"
        },
        "stock": 10,
        "featured": false,
        "brand": "SelisHome"
    },
    {
        "id": "selis-1438",
        "name": "Boston Köşe Koltuk Grubu",
        "slug": "boston-kose-koltuk-grubu",
        "description": "<p data-start=\"0\" data-end=\"67\"><strong data-start=\"0\" data-end=\"65\">Boston Köşe Koltuk Takımı: Konfor ve Şıklığın Buluşma Noktası</strong></p>\n<p data-start=\"69\" data-end=\"440\">Modern yaşam alanlarına zarafet ve konforu bir arada sunan <strong data-start=\"128\" data-end=\"157\">Boston Köşe Koltuk Takımı</strong>, hem estetik tasarımıyla göz dolduruyor hem de ergonomik yapısıyla üst düzey rahatlık sağlıyor. Evinizin en özel köşesinde, ailenizle ve sevdiklerinizle keyifli anlar geçirmenizi sağlayacak bu özel takım, kaliteli malzemeleri ve işçiliğiyle uzun yıllar kullanım garantisi sunuyor.</p>\n<h3 data-start=\"442\" data-end=\"488\"><strong data-start=\"446\" data-end=\"486\">Modern Tasarım, Fonksiyonel Kullanım</strong></h3>\n<p data-start=\"489\" data-end=\"896\">Boston Köşe Koltuk Takımı, çağdaş çizgileri ve minimal detaylarıyla modern dekorasyon anlayışına kusursuz bir uyum sağlıyor. Geniş oturum alanı, konforlu sırt yastıkları ve zarif dikiş detayları, bu takımı sadece bir oturma alanı olmanın ötesine taşıyor. Oturma odalarınızda şık ve sıcak bir atmosfer yaratmak için özel olarak tasarlanan Boston, geniş renk ve kumaş seçenekleri ile her zevke hitap ediyor.</p>\n<p data-start=\"489\" data-end=\"896\"><img class=\"alignleft wp-image-1441 size-full\" src=\"https://selishome.com/wp-content/uploads/2025/02/3-10-1536x898-1.jpg\" alt=\"\" width=\"1536\" height=\"898\" /></p>\n<h3 data-start=\"898\" data-end=\"936\"></h3>\n<h3 data-start=\"898\" data-end=\"936\"></h3>\n<h3 data-start=\"898\" data-end=\"936\"></h3>\n<h3 data-start=\"898\" data-end=\"936\"><strong data-start=\"902\" data-end=\"934\">Üstün Kalite ve Dayanıklılık</strong></h3>\n<p data-start=\"937\" data-end=\"1336\">Boston Köşe Koltuk Takımı, <strong data-start=\"964\" data-end=\"998\">yüksek kaliteli iskelet yapısı</strong> ile uzun ömürlü kullanım sunuyor. Sağlam ahşap iskelet ve metal destekli ayaklar, takımın yıllar boyunca formunu korumasını sağlarken, kaliteli döşeme kumaşı aşınmalara karşı direnç gösteriyor. Günlük kullanıma uygun olarak tasarlanan bu takım, leke tutmayan ve kolay temizlenebilir kumaşı sayesinde zahmetsiz bir bakım imkanı sunuyor.</p>\n<h3 data-start=\"1338\" data-end=\"1390\"><strong data-start=\"1342\" data-end=\"1388\">Konforu Maksimum Seviyeye Taşıyan Detaylar</strong></h3>\n<p data-start=\"1391\" data-end=\"1725\">Boston Köşe Koltuk Takımı&#8217;nın en büyük artılarından biri <strong data-start=\"1448\" data-end=\"1484\">üstün konforlu oturum minderleri</strong>. Yüksek yoğunluklu sünger dolgusu, vücudunuzu tam olarak destekler ve uzun saatler boyunca konforlu bir oturma deneyimi sunar. Ayrıca geniş oturma alanı, film izlerken, kitap okurken veya misafirlerinizi ağırlarken ekstra rahatlık sağlar.</p>\n<h3 data-start=\"1727\" data-end=\"1769\"><strong data-start=\"1731\" data-end=\"1767\">Geniş ve Kullanışlı Oturum Alanı</strong></h3>\n<p data-start=\"1770\" data-end=\"2036\">Boston’un geniş oturum alanı sayesinde <strong data-start=\"1809\" data-end=\"1873\">hem oturmak hem de uzanmak için ideal bir alan yaratılmıştır</strong>. Modüler tasarımı, farklı yaşam alanlarına uyum sağlayacak şekilde tasarlanmış olup, hem büyük hem de orta büyüklükteki salonlar için mükemmel bir tercih sunar.</p>\n<h3 data-start=\"2038\" data-end=\"2099\"><strong data-start=\"2042\" data-end=\"2097\">Rahatlık ve Estetiği Bir Araya Getiren Şık Detaylar</strong></h3>\n<ul data-start=\"2100\" data-end=\"2372\">\n<li data-start=\"2100\" data-end=\"2192\"><strong data-start=\"2102\" data-end=\"2142\">Yumuşak ve ergonomik sırt minderleri</strong>, uzun süreli oturumlar için ideal destek sunar.</li>\n<li data-start=\"2193\" data-end=\"2304\"><strong data-start=\"2195\" data-end=\"2229\">Şık ve dayanıklı ayak tasarımı</strong>, takımın modern çizgilerini tamamlayarak dekoratif bir duruş kazandırır.</li>\n<li data-start=\"2305\" data-end=\"2372\"><strong data-start=\"2307\" data-end=\"2331\">Özel dikiş detayları</strong>, kaliteli işçiliği gözler önüne serer.</li>\n</ul>\n<h3 data-start=\"2374\" data-end=\"2422\"><strong data-start=\"2378\" data-end=\"2420\">Her Dekorasyona Uygun Renk Seçenekleri</strong></h3>\n<p data-start=\"2423\" data-end=\"2692\">Boston Köşe Koltuk Takımı, <strong data-start=\"2450\" data-end=\"2483\">göz alıcı renk seçenekleriyle</strong> her yaşam alanına uyum sağlar. Modern gri tonlarından sıcak bej ve kahve tonlarına kadar geniş bir renk yelpazesi sunan bu özel takım, evinizin dekorasyonuna uygun mükemmel bir seçim yapmanıza olanak tanır.</p>",
        "price": 0,
        "categoryId": "1",
        "categorySlug": "oturma-odasi",
        "images": [
            "https://selishome.com/wp-content/uploads/2025/02/p5.png",
            "https://selishome.com/wp-content/uploads/2025/02/4-9-1536x898-1.jpg",
            "https://selishome.com/wp-content/uploads/2025/02/3-10-1536x898-1.jpg",
            "https://selishome.com/wp-content/uploads/2025/02/2-10.jpg"
        ],
        "colors": [
            {
                "name": "Standart",
                "hex": "#D4C5B2"
            }
        ],
        "materials": [
            "Ahşap"
        ],
        "dimensions": {
            "width": 0,
            "height": 0,
            "depth": 0,
            "unit": "cm"
        },
        "stock": 10,
        "featured": false,
        "brand": "SelisHome"
    },
    {
        "id": "selis-1424",
        "name": "Viral Yemek Odası Grubu",
        "slug": "viral-yemek-odasi-grubu",
        "description": "<div class=\"flex max-w-full flex-col flex-grow\">\n<div class=\"min-h-8 text-message flex w-full flex-col items-end gap-2 whitespace-normal break-words text-start [.text-message+&amp;]:mt-5\" dir=\"auto\" data-message-author-role=\"assistant\" data-message-id=\"8ab911d2-4e00-424b-82af-529c7fe785ca\" data-message-model-slug=\"gpt-4o\">\n<div class=\"flex w-full flex-col gap-1 empty:hidden first:pt-[3px]\">\n<div class=\"markdown prose w-full break-words dark:prose-invert light\">Viral Yemek Odası Grubu, modern tasarımı ve şık detaylarıyla yaşam alanınıza sofistike bir hava katıyor. Estetik ve işlevselliği bir araya getiren bu özel koleksiyon, zarif çizgileri ve kaliteli işçiliğiyle fark yaratıyor.Takımın ana unsuru olan geniş yemek masası, hem günlük kullanıma hem de kalabalık davet sofralarına uygun yapısıyla pratiklik sunuyor. Masanın dayanıklı yüzeyi ve zarif ayak tasarımı, sağlamlık ile görsel şıklığı mükemmel bir dengede buluşturuyor. Takımı tamamlayan ergonomik sandalyeler ise rahat oturum alanı ve konforlu yapısıyla uzun süreli yemek keyifleri için ideal.Depolama ihtiyacınızı karşılamak için tasarlanan fonksiyonel konsol, geniş çekmece ve dolap bölmeleriyle hem estetik hem de kullanışlı bir çözüm sunuyor. Şık kulp detayları ve zarif çizgileri, yemek odanıza modern bir dokunuş kazandırırken, dekoratif aynalar ve özel tasarım yüzeyler mekanınıza derinlik ve ferahlık katıyor.Viral Yemek Odası Grubu, dayanıklı malzemeleri ve özenli işçiliğiyle uzun ömürlü bir kullanım sunarken, minimalist ve çağdaş tasarımı sayesinde her dekorasyon stiline kolayca uyum sağlıyor. Misafirlerinizi ağırlarken zarafetin ve konforun keyfini çıkarın, yemek saatlerini unutulmaz anlara dönüştürün!</div>\n</div>\n</div>\n</div>",
        "price": 0,
        "categoryId": "3",
        "categorySlug": "yemek-odasi",
        "images": [
            "https://selishome.com/wp-content/uploads/2025/02/p4.png",
            "https://selishome.com/wp-content/uploads/2025/02/10-8-2048x1365-1.jpg"
        ],
        "colors": [
            {
                "name": "Standart",
                "hex": "#D4C5B2"
            }
        ],
        "materials": [
            "Ahşap"
        ],
        "dimensions": {
            "width": 0,
            "height": 0,
            "depth": 0,
            "unit": "cm"
        },
        "stock": 10,
        "featured": false,
        "brand": "SelisHome"
    },
    {
        "id": "selis-1418",
        "name": "Aspendos Yemek Odası Grubu",
        "slug": "aspendos-yemek-odasi-grubu",
        "description": "<p>Aspendos Yemek Odası Grubu, zarafet ve fonksiyonelliği buluşturan tasarımıyla yemek alanınıza şıklık katıyor. Estetik detayları, kaliteli malzemeleri ve modern çizgileriyle dikkat çeken bu takım, konforlu ve keyifli sofralar için ideal bir atmosfer sunar. Geniş masa yüzeyi ve ergonomik sandalyeleriyle hem günlük kullanıma hem de özel davetlere uyum sağlar. Aspendos Yemek Odası Grubu ile yemek saatlerini daha keyifli hale getirin!</p>",
        "price": 0,
        "categoryId": "3",
        "categorySlug": "yemek-odasi",
        "images": [
            "https://selishome.com/wp-content/uploads/2025/02/p3.png",
            "https://selishome.com/wp-content/uploads/2025/02/1-4-1-1536x898-1.jpg",
            "https://selishome.com/wp-content/uploads/2025/02/1-3-1-1536x898-1.jpg",
            "https://selishome.com/wp-content/uploads/2025/02/1-2-1-1536x898-1.jpg"
        ],
        "colors": [
            {
                "name": "Standart",
                "hex": "#D4C5B2"
            }
        ],
        "materials": [
            "Ahşap"
        ],
        "dimensions": {
            "width": 0,
            "height": 0,
            "depth": 0,
            "unit": "cm"
        },
        "stock": 10,
        "featured": false,
        "brand": "SelisHome"
    },
    {
        "id": "selis-1409",
        "name": "Asya Yatak Odası Grubu",
        "slug": "asya-yatak-odasi",
        "description": "<p>Asya Yatak Odası Takımı, sade ve modern tasarımıyla huzurlu bir uyku alanı yaratır. Doğal ahşap dokular ve soft renk geçişleriyle sıcak ve davetkar bir atmosfer sunar. Geniş depolama alanları, ergonomik detayları ve dayanıklı yapısıyla hem şıklık hem de fonksiyonellik sağlar. Estetik ve konforu bir araya getiren Asya Yatak Odası Takımı, yatak odanıza zamansız bir dokunuş katıyor</p>",
        "price": 0,
        "categoryId": "7",
        "categorySlug": "genc-cocuk-odasi",
        "images": [
            "https://selishome.com/wp-content/uploads/2025/02/p2.png",
            "https://selishome.com/wp-content/uploads/2025/02/4-5-1200x901-1.jpg",
            "https://selishome.com/wp-content/uploads/2025/02/3-4-1200x901-1.jpg",
            "https://selishome.com/wp-content/uploads/2025/02/2-3-1200x901-1.jpg"
        ],
        "colors": [
            {
                "name": "Standart",
                "hex": "#D4C5B2"
            }
        ],
        "materials": [
            "Ahşap"
        ],
        "dimensions": {
            "width": 0,
            "height": 0,
            "depth": 0,
            "unit": "cm"
        },
        "stock": 10,
        "featured": false,
        "brand": "SelisHome"
    },
    {
        "id": "selis-1400",
        "name": "Agra Yatak Odası Grubu",
        "slug": "agra-yatak-odasi-grubu",
        "description": "<p><em>Agra Yatak Odası Takımı, modern ve zarif tasarımıyla yatak odanıza sofistike bir atmosfer kazandırır. Doğal dokular ve kaliteli malzemelerle üretilen bu takım, hem estetik hem de fonksiyonelliği ön planda tutar. Geniş depolama alanları ve ergonomik detayları sayesinde konforlu bir kullanım sunar. Şıklığı, dayanıklılığı ve rahatlığı bir araya getiren Agra Yatak Odası Takımı, huzurlu bir uyku deneyimi için mükemmel bir seçim!</em></p>",
        "price": 0,
        "categoryId": "7",
        "categorySlug": "genc-cocuk-odasi",
        "images": [
            "https://selishome.com/wp-content/uploads/2025/02/p1.png",
            "https://selishome.com/wp-content/uploads/2025/02/1-2-4.jpg",
            "https://selishome.com/wp-content/uploads/2025/02/1-1-4.jpg",
            "https://selishome.com/wp-content/uploads/2025/02/1-7-3.jpg"
        ],
        "colors": [
            {
                "name": "Standart",
                "hex": "#D4C5B2"
            }
        ],
        "materials": [
            "Ahşap"
        ],
        "dimensions": {
            "width": 0,
            "height": 0,
            "depth": 0,
            "unit": "cm"
        },
        "stock": 10,
        "featured": false,
        "brand": "SelisHome"
    }

];

export const getProductBySlug = (slug: string): Product | undefined => {
    return mockProducts.find(p => p.slug === slug);
};

export const getProductsByCategory = (categorySlug: string): Product[] => {
    return mockProducts.filter(p => p.categorySlug === categorySlug);
};

export const getFeaturedProducts = (): Product[] => {
    return mockProducts.filter(p => p.featured);
};

export const getNewProducts = (): Product[] => {
    return mockProducts.filter(p => p.isNew);
};