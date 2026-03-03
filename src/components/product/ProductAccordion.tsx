'use client';

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import { Product } from '@/types';

interface ProductAccordionProps {
    product: Product;
}

export function ProductAccordion({ product }: ProductAccordionProps) {
    return (
        <Accordion type="single" collapsible className="border-t border-border mt-8">
            <AccordionItem value="description" className="border-b border-border">
                <AccordionTrigger className="py-5 text-sm font-sans font-semibold uppercase tracking-widest text-charcoal hover:text-gold hover:no-underline">
                    Ürün Açıklaması
                </AccordionTrigger>
                <AccordionContent className="pb-5 text-sm font-sans text-warm-gray leading-relaxed">
                    {product.description}
                    <br /><br />
                    Üstün kaliteli malzemeler ve el işçiliği ile üretilmiştir. Her parça,
                    SELIS kalite standartlarına uygun olarak titizlikle kontrol edilir.
                </AccordionContent>
            </AccordionItem>

            <AccordionItem value="dimensions" className="border-b border-border">
                <AccordionTrigger className="py-5 text-sm font-sans font-semibold uppercase tracking-widest text-charcoal hover:text-gold hover:no-underline">
                    Ölçüler
                </AccordionTrigger>
                <AccordionContent className="pb-5">
                    <div className="grid grid-cols-3 gap-4">
                        <div className="text-center p-4 bg-sand rounded-xl">
                            <p className="text-xs font-sans text-warm-gray-light mb-1">Genişlik</p>
                            <p className="font-sans font-semibold">{product.dimensions.width} {product.dimensions.unit}</p>
                        </div>
                        <div className="text-center p-4 bg-sand rounded-xl">
                            <p className="text-xs font-sans text-warm-gray-light mb-1">Yükseklik</p>
                            <p className="font-sans font-semibold">{product.dimensions.height} {product.dimensions.unit}</p>
                        </div>
                        <div className="text-center p-4 bg-sand rounded-xl">
                            <p className="text-xs font-sans text-warm-gray-light mb-1">Derinlik</p>
                            <p className="font-sans font-semibold">{product.dimensions.depth} {product.dimensions.unit}</p>
                        </div>
                    </div>
                </AccordionContent>
            </AccordionItem>

            <AccordionItem value="materials" className="border-b border-border">
                <AccordionTrigger className="py-5 text-sm font-sans font-semibold uppercase tracking-widest text-charcoal hover:text-gold hover:no-underline">
                    Malzeme & Bakım
                </AccordionTrigger>
                <AccordionContent className="pb-5 text-sm font-sans text-warm-gray leading-relaxed">
                    <div className="space-y-3">
                        <div>
                            <p className="font-medium text-charcoal mb-1">Malzemeler</p>
                            <div className="flex flex-wrap gap-2">
                                {product.materials.map((material) => (
                                    <span
                                        key={material}
                                        className="px-3 py-1 bg-sand rounded-full text-xs font-sans"
                                    >
                                        {material}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div>
                            <p className="font-medium text-charcoal mb-1">Bakım</p>
                            <p>Profesyonel temizlik önerilir. Direkt güneş ışığından koruyunuz. Yumuşak bez ile silinebilir.</p>
                        </div>
                    </div>
                </AccordionContent>
            </AccordionItem>

            <AccordionItem value="shipping" className="border-b border-border">
                <AccordionTrigger className="py-5 text-sm font-sans font-semibold uppercase tracking-widest text-charcoal hover:text-gold hover:no-underline">
                    Teslimat & İade
                </AccordionTrigger>
                <AccordionContent className="pb-5 text-sm font-sans text-warm-gray leading-relaxed space-y-2">
                    <p>• ₺5.000 üzeri siparişlerde <span className="font-medium text-charcoal">ücretsiz kargo</span></p>
                    <p>• Tahmini teslimat süresi: <span className="font-medium text-charcoal">3-7 iş günü</span></p>
                    <p>• Oda içi teslim ve kurulum dahildir</p>
                    <p>• <span className="font-medium text-charcoal">30 gün koşulsuz iade</span> garantisi</p>
                    <p>• Tüm ürünlerde <span className="font-medium text-charcoal">5 yıl garanti</span></p>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
}
