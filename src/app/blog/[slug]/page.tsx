import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { BLOG_POSTS, type LocalizedString } from '../page';
import { ShareBar, RelatedProducts, CoverImage } from './BlogDetailClient';
import { getDictionary } from '@/lib/i18n';

interface PageProps {
    params: Promise<{ slug: string }>;
}

const BLOG_CONTENTS: Record<string, LocalizedString> = {
    'kucuk-salona-mobilya-secimi-rehberi': {
        tr: `
Küçük salonlarda büyük mobilya seçmek, alanı daha da küçük gösterir. Ancak doğru boyut ve yerleşim planıyla 50m²'lik bir salon hem şık hem ferah olabilir.

## Neden Boyut Önemli?

Oturma grubu, genellikle salonun %60-65'ini kapsamalıdır. Bu oran altında oda boş durur, üzerinde ise mobilya odayı ezer. **Luna İkili Koltuk** gibi modüler modeller, ihtiyaca göre şekil alır.

## 5 Koltuk Önerisi

1. **Luna İkili** — 160cm genişlikte kompakt ama konforlu
2. **Aria Berjer** — Tek kişilik; köşe boşluklarını güzel değerlendirir
3. **Orbit Köşe** — L form; duvarı kullanır, orta alan açık kalır
4. **Sera Tekli** — Döner koltuk; 360° hareketle az yer kaplar
5. **Nova Futon** — İkili işlev: koltuk + misafir yatağı

## Renk Seçimi

Açık tonlar (krem, açık gri) mekanı büyük gösterir. Skoçya yeşili veya antrasit gibi koyu tonlar odaya derinlik katar ama tek parçayla sınırlı kalın.

## Sonuç

Ölçü alın, zemine bantla sınırı çizin, sonra sipariş verin. Her zaman boyuta göre karar, renge göre değil.
        `.trim(),
        en: `
Choosing large furniture in small living rooms makes the area look even smaller. However, with the right size and layout plan, a 50m² living room can be both stylish and spacious.

## Why is Size Important?

The seating group should usually cover 60-65% of the living room. Below this ratio, the room looks empty; above it, the furniture overwhelms the room. Modular models like the **Luna Double Sofa** take shape according to needs.

## 5 Sofa Suggestions

1. **Luna Double** — Compact but comfortable at 160cm wide
2. **Aria Bergere** — Single-seater; makes good use of corner spaces
3. **Orbit Corner** — L form; uses the wall, center area remains open
4. **Sera Single** — Swivel chair; takes up little space with 360° movement
5. **Nova Futon** — Dual function: sofa + guest bed

## Color Selection

Light tones (cream, light gray) make the space look larger. Dark tones like Scottish green or anthracite add depth to the room but stick to one piece.

## Conclusion

Take measurements, draw the boundary with tape on the floor, then order. Always decide by size, not by color.
        `.trim(),
        fr: `
Choisir de grands meubles dans de petits salons rend l'espace encore plus petit. Cependant, avec la bonne taille et le bon plan d'aménagement, un salon de 50 m² peut être à la fois élégant et spacieux.

## Pourquoi la taille est-elle importante ?

Le groupe de sièges doit généralement couvrir 60-65 % du salon. En dessous de ce rapport, la pièce semble vide ; au-dessus, les meubles écrasent la pièce. Les modèles modulaires comme le **Canapé Double Luna** prennent forme selon les besoins.

## 5 suggestions de canapés

1. **Luna Double** — Compact mais confortable avec 160 cm de large
2. **Aria Bergère** — Monoplace ; utilise bien les espaces d'angle
3. **Orbit Corner** — Forme en L ; utilise le mur, la zone centrale reste ouverte
4. **Sera Single** — Chaise pivotante ; prend peu de place avec un mouvement à 360°
5. **Nova Futon** — Double fonction : canapé + lit d'appoint

## Choix des couleurs

Les tons clairs (crème, gris clair) agrandissent l'espace. Les tons foncés comme le vert écossais ou l'anthracite ajoutent de la profondeur à la pièce, mais limitez-vous à une seule pièce.

## Conclusion

Prenez des mesures, tracez la limite avec du ruban adhésif sur le sol, puis commandez. Décidez toujours en fonction de la taille, pas de la couleur.
        `.trim(),
        ar: `
اختيار الأثاث الكبير في غرف المعيشة الصغيرة يجعل المساحة تبدو أصغر. ومع ذلك، مع الاختيار الصحيح للحجم ومخطط التوزيع، يمكن لغرفة معيشة بمساحة 50 مترًا مربعًا أن تكون أنيقة وفسيحة في نفس الوقت.

## لماذا الحجم مهم؟

يجب أن تغطي مجموعة الجلوس عادة 60-65% من غرفة المعيشة. تحت هذه النسبة، تبدو الغرفة فارغة؛ وفوقها، يطغى الأثاث على الغرفة. النماذج الوحداتية مثل **أريكة لونا الثنائية** تتشكل حسب الاحتياجات.

## 5 اقتراحات للأرائك

1. **لونا ثنائية** — مدمجة ومريحة بعرض 160 سم
2. **أريكة آريا** — مقعد واحد؛ تستغل زوايا الغرفة بشكل جيد
3. **ركنية أوربيت** — شكل حرف L؛ تستغل الجدار، وتبقى المساحة الوسطى مفتوحة
4. **سيرا مفردة** — كرسي دوار؛ يأخذ مساحة صغيرة مع حركة 360 درجة
5. **نوفا فوتون** — وظيفة مزدوجة: أريكة + سرير للضيوف

## اختيار الألوان

النغمات الفاتحة (كريمي، رمادي فاتح) تجعل المكان يبدو أكبر. النغمات الداكنة مثل الأخضر الاسكتلندي أو الأنثراسايت تضيف عمقًا للغرفة، لكن يفضل الالتزام بقطعة واحدة فقط.

## الخاتمة

خذ المقاسات، ارسم الحدود بشريط لاصق على الأرض، ثم اطلب. اتخذ القرار دائمًا بناءً على الحجم، وليس اللون.
        `.trim(),
        de: `
Die Wahl großer Möbel in kleinen Wohnzimmern lässt den Raum noch kleiner wirken. Mit der richtigen Größe und dem richtigen Grundriss kann ein 50 m² großes Wohnzimmer jedoch sowohl stilvoll als auch geräumig sein.

## Warum ist die Größe wichtig?

Die Sitzgruppe sollte normalerweise 60-65 % des Wohnzimmers abdecken. Unter diesem Verhältnis wirkt der Raum leer; darüber erdrücken die Möbel den Raum. Modulare Modelle wie das **Luna Zweier-Sofa** passen sich den Bedürfnissen an.

## 5 Sofa-Vorschläge

1. **Luna Zweier** — Kompakt, aber komfortabel mit 160 cm Breite
2. **Aria Berjer** — Einzelsitzer; nutzt Eckbereiche gut aus
3. **Orbit Ecksofa** — L-Form; nutzt die Wand, der mittlere Bereich bleibt offen
4. **Sera Einzelsessel** — Drehstuhl; nimmt mit 360°-Bewegung wenig Platz ein
5. **Nova Futon** — Doppelfunktion: Sofa + Gästebett

## Farbwahl

Helle Töne (Creme, Hellgrau) lassen den Raum größer wirken. Dunkle Töne wie Schottischgrün oder Anthrazit verleihen dem Raum Tiefe, sollten aber auf ein Möbelstück beschränkt bleiben.

## Fazit

Messen Sie aus, kleben Sie die Grenzen mit Klebeband auf den Boden und bestellen Sie dann. Entscheiden Sie immer nach der Größe, nicht nach der Farbe.
        `.trim(),
    },
};

function getContent(slug: string, lang: string): string {
    const content = BLOG_CONTENTS[slug];
    if (!content) return `Bu yazı yakında yayınlanacak. / This post will be published soon.`;
    return content[lang as keyof LocalizedString] || content.tr;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const post = BLOG_POSTS.find(p => p.slug === slug);
    if (!post) return { title: 'Yazı Bulunamadı | SELIS' };

    // Default to TR for metadata since we don't have lang in params here usually
    // In a full implementation, you'd use a language detector or param
    return {
        title: `${post.title.tr} | SELIS Blog`,
        description: post.excerpt.tr,
        authors: [{ name: post.author }],
        openGraph: {
            title: post.title.tr,
            description: post.excerpt.tr,
            type: 'article',
            publishedTime: post.date,
            authors: [post.author],
            images: [{ url: post.coverImage, width: 1200, height: 630, alt: post.title.tr }],
        },
    };
}

export function generateStaticParams() {
    return BLOG_POSTS.map(p => ({ slug: p.slug }));
}

function renderContent(text: string) {
    return text.split('\n\n').map((para, i) => {
        if (para.startsWith('## ')) {
            return (
                <h2 key={i}
                    className="text-xl font-bold text-[#1C1C1E] mt-8 mb-3 pl-3 border-l-4 border-[#C9A96E]"
                    style={{ fontFamily: 'var(--font-playfair), Playfair Display, serif' }}>
                    {para.replace('## ', '')}
                </h2>
            );
        }
        if (para.startsWith('> ')) {
            return (
                <blockquote key={i} className="border-l-4 border-[#C9A96E] pl-4 italic text-[#666] my-6">
                    {para.replace('> ', '')}
                </blockquote>
            );
        }
        if (para.trim().match(/^\d+\./m)) {
            const items = para.split('\n').filter(Boolean);
            return (
                <ol key={i} className="list-decimal list-inside space-y-2 my-4 text-[#444]">
                    {items.map((item, j) => (
                        <li key={j} className="text-[15px] leading-7">
                            {item.replace(/^\d+\.\s+/, '')}
                        </li>
                    ))}
                </ol>
            );
        }
        return <p key={i} className="text-[16px] leading-8 text-[#444] mb-4">{para}</p>;
    });
}

const RELATED_PRODUCTS = [
    { name: 'Luna İkili Koltuk', price: 54990, image: '/images/gallery-1.jpg', href: '/urun/luna-kose-koltuk' },
    { name: 'Orbit Sehpa', price: 12990, image: '/images/gallery-2.jpg', href: '/urun/orbit-sehpa' },
    { name: 'Arc Lambader', price: 8490, image: '/images/gallery-3.jpg', href: '/urun/arc-lambader' },
];

export default async function BlogDetailPage({ params }: PageProps) {
    const { slug } = await params;
    const post = BLOG_POSTS.find(p => p.slug === slug);
    if (!post) notFound();

    // Since this is a server component, we need a way to know the language.
    // Usually this comes from a locale param or cookie. 
    // Fallback to 'tr' if not detectable in this simple setup.
    const lang = 'tr'; // In real app, get from params or headers
    const t_data = getDictionary('TR') as any; // Cast to any for dynamic property access

    const content = getContent(slug, lang);
    const title = post.title[lang as keyof LocalizedString] || post.title.tr;
    const excerpt = post.excerpt[lang as keyof LocalizedString] || post.excerpt.tr;

    return (
        <main className="min-h-screen bg-white">
            <div className="max-w-4xl mx-auto px-4 py-10">
                {/* Breadcrumb */}
                <nav className="flex items-center gap-1.5 text-[11px] text-[#aaa] mb-8">
                    <Link href="/" className="hover:text-[#C9A96E] transition-colors">{t_data.nav_home || 'Ana Sayfa'}</Link>
                    <span>/</span>
                    <Link href="/blog" className="hover:text-[#C9A96E] transition-colors">Blog</Link>
                    <span>/</span>
                    <span className="text-[#666]">{title}</span>
                </nav>

                {/* Kategori */}
                <span className="inline-block px-3 py-1 rounded-full text-[11px] font-semibold text-white mb-4"
                    style={{ backgroundColor: post.categoryColor }}>
                    {post.category}
                </span>

                {/* Başlık */}
                <h1
                    className="text-3xl md:text-4xl font-bold text-[#1C1C1E] leading-tight mb-4"
                    style={{ fontFamily: 'var(--font-playfair), Playfair Display, serif' }}>
                    {title}
                </h1>

                {/* Yazar + Paylaşım */}
                <ShareBar
                    title={title}
                    slug={slug}
                    author={post.author}
                    date={post.date}
                    readingMinutes={post.readingMinutes}
                />

                <CoverImage src={post.coverImage} alt={title} />

                <article className="max-w-prose mx-auto">
                    {renderContent(content)}
                </article>

                {/* İlgili ürünler */}
                <div className="mt-14 pt-10 border-t border-[#E8E3DC]">
                    <h3 className="text-lg font-bold text-[#1C1C1E] mb-5"
                        style={{ fontFamily: 'var(--font-playfair), Playfair Display, serif' }}>
                        {t_data.blog_related_products || 'Bu Yazıda Bahsedilen Ürünler'}
                    </h3>
                    <RelatedProducts products={RELATED_PRODUCTS} />
                </div>

                {/* Geri */}
                <div className="mt-10">
                    <Link href="/blog" className="flex items-center gap-1.5 text-[12px] text-[#666] hover:text-[#1C1C1E] transition-colors">
                        <ArrowLeft className="w-3.5 h-3.5" /> {t_data.blog_back_to_all || 'Tüm Yazılara Dön'}
                    </Link>
                </div>
            </div>
        </main>
    );
}
